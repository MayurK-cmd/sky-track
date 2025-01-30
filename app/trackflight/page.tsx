/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */


"use client";

import React, { useState } from "react";

interface Flight {
  flight: { iata: string };
  departure: { airport: string; estimated: string };
  arrival: { airport: string; estimated: string };
  aircraft: { model: string };
  flight_status: string;
}

interface FlightDataResponse {
  data: Flight[];
}

export default function FlightSearch() {
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [flightData, setFlightData] = useState<FlightDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFlightData = async () => {
    setLoading(true);
    setError("");
    setFlightData(null);

    const apiKey = process.env.NEXT_PUBLIC_FLIGHT_TRACK_API;

    if (!apiKey) {
      setError("API key is missing or undefined.");
      setLoading(false);
      return;
    }

    if (!flightNumber) {
      setError("Please enter a flight number.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }

      const data: FlightDataResponse = await response.json();

      // Check if the response contains flight data
      if (!data || !data.data || data.data.length === 0) {
        setError("No flight data found for this flight number.");
      } else {
        setFlightData(data);
      }
    } catch (err: unknown) {
      // Log error to the console for debugging
      console.error("Error fetching flight data:", err);
      setError("Error: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-2xl bg-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Flight Search</h1>
        <div className="mb-6">
          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Flight Number (IATA Code):</span>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="Enter flight number (e.g., DL8696)"
              className="border border-gray-700 bg-black text-white p-2 rounded w-full"
            />
          </label>
          <button
            onClick={fetchFlightData}
            className="relative bg-black text-white px-4 py-2 rounded w-full font-semibold group overflow-hidden"
          >
            Search
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300"></div>
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {flightData && flightData.data.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Flight Details</h2>
            {flightData.data.map((flight, index) => (
              <div key={index} className="border border-gray-700 bg-black rounded p-4 mb-4 shadow">
                <p><strong>Flight Number:</strong> {flight.flight.iata}</p>
                <p><strong>Departure Airport:</strong> {flight.departure.airport}</p>
                <p><strong>Arrival Airport:</strong> {flight.arrival.airport}</p>
                <p><strong>Departure Time:</strong> {flight.departure.estimated}</p>
                <p><strong>Arrival Time:</strong> {flight.arrival.estimated}</p>
                <p><strong>Aircraft Type:</strong> {flight.aircraft.model}</p>
                <p><strong>Flight Status:</strong> {flight.flight_status}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center">No flight data found</p>
        )}
      </div>
    </div>
  );
}
