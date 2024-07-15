

```markdown
# Groww  Stock App

## Overview

Groww Edge Stock App is an Android application developed as part of an assignment for an App SDE Internship. It allows users to explore and track stocks and ETFs, offering comprehensive information and historical price trends.

## Key Features

- **Explore Screen**: Tabs for Top Gainers and Losers, displaying stock/ETF information in a grid of cards.
- **Product Screen**: Detailed view of stocks/ETFs including basic information and historical price trends using a line graph.
- **API Integration**: Utilizes Alpha Vantage APIs (AlphaIntelligence, FundamentalData, CoreStocksAPI) for robust data retrieval.
- **Error Handling**: Smooth handling of loading, error, and empty states for a seamless user experience.
- **Caching**: Implements API response caching with expiration for enhanced performance.
- **UI Enhancements**: Incorporates a third-party library for interactive line graphs; supports dynamic theming (Light / Dark Mode).
- **Network Optimization**: Optimizes bandwidth using lazy loading techniques for images.

## Usage

1. **Explore Screen**: Navigate through tabs to explore Top Gainers and Losers in the stock market.
2. **Product Screen**: Select a specific stock/ETF to delve into detailed information and view historical price trends.

## Demos

- [Presentation Demo](https://drive.google.com/file/d/1Amfb4ULktImNenVawxu3F8CJCSXDxxAg/view)
- [Prototype Demo](https://drive.google.com/file/d/1j4vinIKZxyiNReVkm4Wx96GogKdJI6pe/view?usp=sharing)
- [Complete Demo](https://new.express.adobe.com/id/urn:aaid:sc:AP:e5f7b802-24d4-46ad-872d-9de8becc3849?invite=true&promoid=Z2G1FQKR&mv=other)

## Installation and Setup

### Cloning the Repository

Clone the repository to your local machine using Git:

```bash
git clone <repository-url>
cd groww-edge-stock-app
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


