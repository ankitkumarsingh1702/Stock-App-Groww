// app/services/alphaVantage.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'PE0OVG608AJ4FPOJ';
const BASE_URL = 'https://www.alphavantage.co/query';

const fetchFromApi = async (endpoint: string, params: any) => {
  const cacheKey = `${endpoint}_${JSON.stringify(params)}`;
  const cachedResponse = await AsyncStorage.getItem(cacheKey);


  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const response = await axios.get(BASE_URL, {
    params: { ...params, apikey: API_KEY },
  });

  if (response.status === 200) {
    await AsyncStorage.setItem(cacheKey, JSON.stringify(response.data));
  }

  return response.data;
};


export async function getCompOverview(symbol:string){
  const res=await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`);
  if (res.status === 200) {
    await AsyncStorage.setItem(symbol, JSON.stringify(res.data));
  }
  return res.data;
}

export const searchTicker = async (query: string) => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
  );
  return response.data;
};
export const getTopGainers = () => fetchFromApi('', { function: 'TOP_GAINERS_LOSERS'});
export const getTopLosers = () => fetchFromApi('TIME_SERIES_INTRADAY', { function: 'TIME_SERIES_INTRADAY', interval: '5min' });
export const getCompanyOverview = (symbol: string) => fetchFromApi('', { function: 'OVERVIEW', symbol});
// export const searchTicker = (query: string) => fetchFromApi('SYMBOL_SEARCH', { function: 'SYMBOL_SEARCH', keywords: query });

