"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Helicopter from './helicopter/page';
import Airlines from './airline/page';
import Aircraft from './aircraft/page';
import Track from './trackflight/page';

function MainPage() {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Hover Menu */}
      <div className="flex flex-wrap justify-center space-x-8 mb-6 mt-5">
        {/* Search a Plane */}
        <div className="relative group mb-4 sm:mb-0">
          <button className="text-lg font-semibold">Search a Plane</button>
          <div className="absolute hidden group-hover:block bg-black border border-gray-700 p-2 rounded shadow-lg ">
            <ul>
              <li
                onClick={() => handleNavigation('/helicopter')}
                className="p-2 hover:underline hover:decoration-red-500 hover:decoration-4"
              >
                Helicopter
              </li>
              <li
                onClick={() => handleNavigation('/aircraft')}
                className="p-2 hover:underline hover:decoration-red-500 hover:decoration-4"
              >
                Aircraft
              </li>
            </ul>
          </div>
        </div>

        {/* Track a Flight */}
        <div className="relative group mb-4 sm:mb-0">
          <button className="text-lg font-semibold">Track a Flight</button>
          <div className="absolute hidden group-hover:block bg-black border border-gray-700 p-2 rounded shadow-lg ">
            <ul>
              <li
                onClick={() => handleNavigation('/track')}
                className="p-2 hover:underline hover:decoration-red-500 hover:decoration-4"
              >
                Track a Plane
              </li>
            </ul>
          </div>
        </div>

        {/* Search an Airline */}
        <div className="relative group mb-4 sm:mb-0">
          <button className="text-lg font-semibold">Search an Airline</button>
          <div className="absolute hidden group-hover:block bg-black-800 border border-gray-700 p-2 rounded shadow-lg ">
            <ul>
              <li
                onClick={() => handleNavigation('/airline')}
                className="p-2 hover:underline hover:decoration-red-500 hover:decoration-4"
              >
                Airlines
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal Line with Animation */}
      <div className="relative mb-6 w-full group">
        <div className="relative w-full h-[2px] bg-gray-700">
          {/* White animated line */}
          <span className="absolute top-0 left-0 w-0 h-full bg-white transition-all duration-500 ease-in-out group-hover:w-full"></span>
        </div>
      </div>

      {/* Description Box */}
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl font-bold mb-4">SkyTrack</h1>
        <p className="leading-7 mb-10">
          Welcome to the ultimate aviation hub. Explore aircraft specifications, track flights in real time, and stay updated with your favorite airlines. Our platform offers a seamless experience for aviation enthusiasts, professionals, and travelers alike. Whether you’re fascinated by helicopters, airplanes, or the logistics of airlines, we’ve got something for everyone. Soar to new heights with us and experience the world of aviation like never before!
        </p>

        <div className="relative bg-black p-6 rounded shadow-lg group overflow-hidden">
          <h2 className="text-2xl font-semibold mb-3 text-white">A Brief History of Aviation</h2>
          <p className="leading-7 text-gray-300">
          
  The history of aviation began with mankind&apos;s dream of flight. From the ancient myth of Icarus 
  to Leonardo da Vinci&apos;s sketches of flying machines, humans have always aspired to take to the skies. 
  The first successful powered flight by the Wright brothers in 1903 marked the beginning of modern aviation. 
  Since then, aviation has evolved dramatically, enabling global travel, commerce, and exploration. 
  Today, aviation stands as a testament to human ingenuity and the relentless pursuit of innovation.
</p>

          {/* Animated border effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/helicopter" element={<Helicopter />} />
        <Route path="/airline" element={<Airlines />} />
        <Route path="/aircraft" element={<Aircraft />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </BrowserRouter>
  );
}
