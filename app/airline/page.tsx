"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Fleet {
  total: number;
  [key: string]: number;
}

interface Airline {
  name: string;
  iata: string;
  icao: string;
  fleet: Fleet;
  logo_url: string;
}

export default function Airlines() {
  const [name, setName] = useState<string>("");
  const [airlineData, setAirlineData] = useState<Airline[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchAirlines = async () => {
    setLoading(true);
    setError("");
    setAirlineData([]);

    const apiKey = process.env.NEXT_PUBLIC_API;

    if (!apiKey) {
      setError("API key is missing or undefined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/airlines?name=${name}`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch airline data");
      }

      const data: Airline[] = await response.json();
      setAirlineData(data);
    } catch(err){
      setError(err instanceof Error ? err.message: "An unknown error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-2xl bg-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Airline Search</h1>
        <div className="mb-6">
          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Airline Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter airline name"
              className="border border-gray-700 bg-black text-white p-2 rounded w-full"
            />
          </label>
          <button
            onClick={fetchAirlines}
            className="relative bg-black text-white px-4 py-2 rounded w-full font-semibold group overflow-hidden"
          >
            Search
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300"></div>
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {airlineData.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Airline Details</h2>
            {airlineData.map((airline, index) => (
              <div
                key={index}
                className="border border-gray-700 bg-black rounded p-4 mb-4 shadow"
              >
                {/* Image optimization might fail if the logo_url is not a valid optimized URL */}
                <Image
                  src={airline.logo_url}
                  alt={`${airline.name} logo`}
                  width={200}
                  height={100}
                  className="w-32 h-auto mb-4"
                  unoptimized={true} // You can disable image optimization if necessary
                />
                <p><strong>Name:</strong> {airline.name}</p>
                <p><strong>IATA Code:</strong> {airline.iata}</p>
                <p><strong>ICAO Code:</strong> {airline.icao}</p>
                <p><strong>Total Fleet:</strong> {airline.fleet.total}</p>
                <p><strong>Fleet Details:</strong></p>
                <ul className="list-disc ml-6">
                  {Object.entries(airline.fleet).map(([key, value]) => (
                    key !== "total" && (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center">No airline data found</p>
        )}
      </div>
    </div>
  );
}
