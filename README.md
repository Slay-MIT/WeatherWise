# WeatherWise

WeatherWise is a weather chatbot built with Next.js that leverages the Weather API and Geolocation API to provide weather information for any location. It then uses the Gemini API to offer user-friendly weather insights and advice.

## Features

- 🌦️ **Real-time Weather Updates**: Get the latest weather information for any location.
- 📍 **Geolocation**: Automatically fetch weather data for your current location.
- 🤖 **Intelligent Advice**: Receive personalized advice based on the weather conditions.
- 💬 **Interactive Chatbot**: User-friendly chat interface to interact with the bot.
- 🚀 **Fast and Responsive**: Built with Next.js for optimal performance.

## Screenshots

### HomePage
![Home Page](https://github.com/user-attachments/assets/f302d4a4-ae1f-4d64-9388-e82b5e739e5d) <!-- Replace with your screenshot URL -->

### Chat Window
![Chat Window](https://github.com/user-attachments/assets/dccc3449-636d-495d-b390-aa124b1b0e21)

## Demo

- [WeatherWise Demo](https://weather-wise-wanderer.vercel.app/) <!-- Replace with your demo GIF URL -->

## Installation

1. **Clone the repository**

```sh
git clone https://github.com/Slay-MIT/WeatherWise.git
```

2. **Navigate to the project directory**

```sh
cd WeatherWise
```

3. **Install dependencies**

```sh
npm install next framer-motion @google/generative-ai axios lucide-react
```

4. **Create a `.env.local` file in the root directory and add your API keys**

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

5. **Run the development server**

```sh
npm run dev
```

6. **Open your browser**

```sh
http://localhost:3000
```

## Usage

1. **Start a conversation**: Type your message in the input box and press Enter or click the Send button.
2. **Get weather updates**: Ask for the weather in any location or use the geolocation feature to get weather information for your current location.
3. **Receive advice**: Get personalized advice based on the current weather conditions.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion, 
- **APIs**: Weather API, Geolocation API, Gemini API
- **Deployment**: Vercel

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgements

- [Weather API](https://openweathermap.org/api)
- [Geolocation API](https://openweathermap.org/api)
- [Gemini API](https://ai.google.dev/)
