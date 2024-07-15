![048c4855-8406-4f20-8909-7755cb170a48](https://github.com/user-attachments/assets/40101cd1-67b4-4033-8002-0c44cb627f66)

# Groww Stock App

## Overview

The Groww Edge Stock App is an Android application developed as part of an assignment for an App SDE Internship. It enables users to explore and track stocks and ETFs, providing comprehensive information and historical price trends.

## Key Features

- 📈 **Explore Screen**: Tabs for Top Gainers and Losers, displaying stock/ETF information in a grid of cards.
- 📊 **Product Screen**: Detailed view of stocks/ETFs including basic information and historical price trends using a line graph.
- 🌐 **API Integration**: Utilizes Alpha Vantage APIs (AlphaIntelligence, FundamentalData, CoreStocksAPI) for robust data retrieval.
- 🛠️ **Error Handling**: Ensures smooth handling of loading, error, and empty states for a seamless user experience.
- 🔄 **Caching**: Implements API response caching with expiration for enhanced performance.
- 🎨 **UI Enhancements**: Incorporates a third-party library for interactive line graphs; supports dynamic theming (Light / Dark Mode).
- 📡 **Network Optimization**: Optimizes bandwidth using lazy loading techniques for images.

## Usage

1. **Explore Screen**: Navigate through tabs to explore Top Gainers and Losers in the stock market.
2. **Product Screen**: Select a specific stock/ETF to delve into detailed information and view historical price trends.

## Screenshot 
![9ed37ddd-7fe6-461a-93d9-7259d78201ed](https://github.com/user-attachments/assets/6ef7de0f-9975-4b7c-8413-93071b4866e3)
![d1e6cd23-fa05-496b-9328-b5fe3d29dabe](https://github.com/user-attachments/assets/08f9e130-7a58-45b5-9592-ba596d7e877f)
![07351750-ab9b-4e41-b665-f720bcd8d711](https://github.com/user-attachments/assets/b2b33057-6295-4b58-ae41-e117ab30c9ef)
![285b4d87-3f35-49c1-b8a3-b2b9733bbcc3](https://github.com/user-attachments/assets/5b2061dd-f0a7-4c39-9492-de941103a279)
![289fd900-035a-4e39-90df-91b2ec983d83](https://github.com/user-attachments/assets/144f7c83-bf47-4d87-a5ce-1f7ebf6d6f7c)
![048c4855-8406-4f20-8909-7755cb170a48](https://github.com/user-attachments/assets/8b36b477-9689-4102-8aa8-f6ffeb6033f2)


## Demos
- [YouTube Demo](https://www.youtube.com/watch?v=WZzIhNmGfug)
- [Presentation Demo](https://drive.google.com/file/d/1Amfb4ULktImNenVawxu3F8CJCSXDxxAg/view)
- [Prototype Demo](https://drive.google.com/file/d/1j4vinIKZxyiNReVkm4Wx96GogKdJI6pe/view?usp=sharing)
- [Complete Demo](https://new.express.adobe.com/id/urn:aaid:sc:AP:e5f7b802-24d4-46ad-872d-9de8becc3849?invite=true&promoid=Z2G1FQKR&mv=other)

## Installation and Setup


Clone the repository to your local machine using Git:

```bash
git clone <repository-url>
```

### Installing Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

### Starting the App

To start the app locally, run the following command:

```bash
npx expo start
```

### Opening the App

Follow the prompts in the terminal to open the app in a development build on your preferred platform:

- Android emulator
- iOS simulator
- Expo Go (limited sandbox for testing)

## Development Notes

If you need to start a fresh project setup, use the following command:

```bash
npm run reset-project
```


