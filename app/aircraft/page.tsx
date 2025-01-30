"use client";

import React, { useState } from "react";

interface Aircraft {
  manufacturer: string;
  model: string;
  engine_type: string;
  engine_thrust_lb_ft: number;
  max_speed_knots: number;
  cruise_speed_knots: number;
  ceiling_ft: number;
  takeoff_ground_run_ft: number;
  landing_ground_roll_ft: number;
  gross_weight_lbs: number;
  empty_weight_lbs: number;
  length_ft: number;
  height_ft: number;
  wing_span_ft: number;
  range_nautical_miles: number;
}

export default function AircraftSearch() {
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [aircraftData, setAircraftData] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchAircrafts = async () => {
    setLoading(true);
    setError("");
    setAircraftData([]);

    const apiKey = process.env.NEXT_PUBLIC_API;

    if (!apiKey) {
      setError("API key is missing or undefined.");
      setLoading(false);
      return;
    }

    if (!manufacturer.trim() && !model.trim()) {
      setError("Please enter at least a manufacturer or model.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/aircraft?manufacturer=${manufacturer}&model=${model}`,
        {
          headers: { "X-Api-Key": apiKey },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch aircraft data. Status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No aircraft data found.");
      }

      setAircraftData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-2xl bg-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Aircraft Search</h1>
        <div className="mb-6">
          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Manufacturer:</span>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Enter manufacturer"
              className="border border-gray-700 bg-black text-white p-2 rounded w-full"
            />
          </label>
          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Model:</span>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Enter model"
              className="border border-gray-700 bg-black text-white p-2 rounded w-full"
            />
          </label>
          <button
            onClick={fetchAircrafts}
            disabled={loading || (!manufacturer.trim() && !model.trim())}
            className={`relative bg-black text-white px-4 py-2 rounded w-full font-semibold group overflow-hidden ${
              loading || (!manufacturer.trim() && !model.trim()) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Searching..." : "Search"}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300"></div>
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {aircraftData.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Aircraft Details</h2>
            {aircraftData.map((aircraft, index) => (
              <div
                key={index}
                className="border border-gray-700 bg-black rounded p-4 mb-4 shadow"
              >
                <p><strong>Manufacturer:</strong> {aircraft.manufacturer || "N/A"}</p>
                <p><strong>Model:</strong> {aircraft.model || "N/A"}</p>
                <p><strong>Engine Type:</strong> {aircraft.engine_type || "N/A"}</p>
                <p><strong>Engine Thrust (lb/ft):</strong> {aircraft.engine_thrust_lb_ft || "N/A"}</p>
                <p><strong>Max Speed (knots):</strong> {aircraft.max_speed_knots || "N/A"}</p>
                <p><strong>Cruise Speed (knots):</strong> {aircraft.cruise_speed_knots || "N/A"}</p>
                <p><strong>Ceiling (ft):</strong> {aircraft.ceiling_ft || "N/A"}</p>
                <p><strong>Takeoff Ground Run (ft):</strong> {aircraft.takeoff_ground_run_ft || "N/A"}</p>
                <p><strong>Landing Ground Roll (ft):</strong> {aircraft.landing_ground_roll_ft || "N/A"}</p>
                <p><strong>Gross Weight (lbs):</strong> {aircraft.gross_weight_lbs || "N/A"}</p>
                <p><strong>Empty Weight (lbs):</strong> {aircraft.empty_weight_lbs || "N/A"}</p>
                <p><strong>Length (ft):</strong> {aircraft.length_ft || "N/A"}</p>
                <p><strong>Height (ft):</strong> {aircraft.height_ft || "N/A"}</p>
                <p><strong>Wing Span (ft):</strong> {aircraft.wing_span_ft || "N/A"}</p>
                <p><strong>Range (nautical miles):</strong> {aircraft.range_nautical_miles || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
