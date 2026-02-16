
# ✈️ Skytrack

**Skytrack** is a high-performance aviation intelligence platform built with Next.js. Whether you are an avgeek, a traveler, or a researcher, Skytrack allows you to monitor the skies in real-time and dive deep into a comprehensive database of aircraft and manufacturers.

---

## 🚀 Features

* **Real-Time Flight Tracking**: Monitor live flights across the globe with precise mapping and status updates.
* **Aircraft Search**: Search for specific planes or helicopters by name, model, or registration.
* **Manufacturer Database**: Explore detailed insights and fleets from major aerospace manufacturers.
* **Aviation Intelligence**: Access technical specifications and history for a wide variety of aircraft.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **API Integration** | Aviation Stack / FlightAware API / ADS-B Exchange |
| **Icons** | Lucide React / FontAwesome |
| **State Management** | React Hooks / SWR |

---

## 📦 Getting Started

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** / **yarn** / **pnpm**
* An **Aviation API Key** (e.g., AviationStack or FlightRadar24 API)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/MayurK-cmd/sky-track.git](https://github.com/MayurK-cmd/sky-track.git)
   cd skytrack

```

2. **Install dependencies:**
```bash
npm install

```


3. **Set up Environment Variables:**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_AVIATION_API_KEY=your_api_key_here

```


4. **Run the development server:**
```bash
npm run dev

```


Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.

---

## 🧭 Navigation & Usage

* **/track**: Enter a flight number (e.g., AI101) to see live coordinates and ETA.
* **/search**: Toggle between "Planes", "Helicopters", and "Manufacturers" to filter results.
* **/fleet**: Browse aircraft by specific manufacturing giants like Boeing, Airbus, or Bell.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

