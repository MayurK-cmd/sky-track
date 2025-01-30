"use client";

import React, { useState } from "react";

// Define an interface for helicopter data structure
interface Helicopter {
  manufacturer: string;
  model: string;
  max_speed_sl_knots: number;
  cruise_speed_sl_knots: number;
  vne_speed_knots: number;
  range_nautical_miles: number;
  fuel_consumption_gallons_pr_hr: number;
  fuel_capacity_gallons: number;
  external_load_limit_lbs: number;
  main_rotor_diameter_ft: number;
  num_blades: number;
  blade_material: string;
  rotor_type: string;
  storage_width_ft: number;
  length_ft: number;
  height_ft: number;
}

export default function Helicopter() {
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [helicopterData, setHelicopterData] = useState<Helicopter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchHelicopters = async () => {
    if (!manufacturer && !model) {
      setError("Please enter at least one search term (manufacturer or model).");
      return;
    }

    setLoading(true);
    setError("");
    setHelicopterData([]);

    const apiKey = process.env.NEXT_PUBLIC_API;

    if (!apiKey) {
      setError("API key is missing or undefined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/helicopter?manufacturer=${manufacturer}&model=${model}`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch helicopter data");
      }

      const data: Helicopter[] = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No helicopter data found.");
      }

      setHelicopterData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }

      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-2xl bg-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Helicopter Search</h1>
        <div className="mb-6">
          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Manufacturer:</span>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Enter manufacturer"
              className="border border-gray-700 bg-black text-white p-2 rounded w-full input-hover-focus"
            />
          </label>

          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Model:</span>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Enter model"
              className="border border-gray-700 bg-black text-white p-2 rounded w-full input-hover-focus"
            />
          </label>

          <button
            onClick={fetchHelicopters}
            className="relative bg-black text-white px-4 py-2 rounded w-full font-semibold group overflow-hidden"
          >
            Search
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300"></div>
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {helicopterData.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Helicopter Details</h2>
            {helicopterData.map((helicopter, index) => (
              <div
                key={index}
                className="border border-gray-700 bg-black rounded p-4 mb-4 shadow"
              >
                <p><strong>Manufacturer:</strong> {helicopter.manufacturer}</p>
                <p><strong>Model:</strong> {helicopter.model}</p>
                <p><strong>Max Speed (Knots):</strong> {helicopter.max_speed_sl_knots}</p>
                <p><strong>Cruise Speed (Knots):</strong> {helicopter.cruise_speed_sl_knots}</p>
                <p><strong>VNE Speed (Knots):</strong> {helicopter.vne_speed_knots}</p>
                <p><strong>Range (Nautical Miles):</strong> {helicopter.range_nautical_miles}</p>
                <p><strong>Fuel Consumption (Gallons/Hour):</strong> {helicopter.fuel_consumption_gallons_pr_hr}</p>
                <p><strong>Fuel Capacity (Gallons):</strong> {helicopter.fuel_capacity_gallons}</p>
                <p><strong>External Load Limit (lbs):</strong> {helicopter.external_load_limit_lbs}</p>
                <p><strong>Main Rotor Diameter (ft):</strong> {helicopter.main_rotor_diameter_ft}</p>
                <p><strong>Number of Blades:</strong> {helicopter.num_blades}</p>
                <p><strong>Blade Material:</strong> {helicopter.blade_material}</p>
                <p><strong>Rotor Type:</strong> {helicopter.rotor_type}</p>
                <p><strong>Storage Width (ft):</strong> {helicopter.storage_width_ft}</p>
                <p><strong>Length (ft):</strong> {helicopter.length_ft}</p>
                <p><strong>Height (ft):</strong> {helicopter.height_ft}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center">No helicopter data found</p>
        )}
      </div>
    </div>
  );
}
