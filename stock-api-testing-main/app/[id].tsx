import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image } from 'react-native';
import { getCompOverview } from '@/data/alphavantage';
import { useLocalSearchParams } from 'expo-router';
import { Card, Icon } from 'react-native-elements';
import gainer, { Gainer } from '@/data/Gainer';
import { Negative1, Negative2, Positive1, Positive2 } from '@/assets/graph';

const { width } = Dimensions.get('window');

type CompanyOverview = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  AnalystRatingStrongBuy: string;
  AnalystRatingBuy: string;
  AnalystRatingHold: string;
  AnalystRatingSell: string;
  AnalystRatingStrongSell: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  '52WeekHigh': string;
  '52WeekLow': string;
  '50DayMovingAverage': string;
  '200DayMovingAverage': string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
  CurrentPrice?: number;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [comp, setComp] = useState<CompanyOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState<number[]>([]);
  const [data, setData] = useState<Gainer | null>(null);

  let sym = '';
  if (typeof id === 'string') {
    sym = id;
  } else if (Array.isArray(id)) {
    sym = id[0];
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!sym) return;
      try {
        const compover = await getCompOverview(sym);
        console.log("company-overview",compover);
        setGraphData([177, 178, 175, 176, 179, 180, 177]); // Example graph data
        setComp({ ...compover, CurrentPrice: 177.15 }); // Example current price
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company overview:', error);
        setLoading(false);
      }
    };

    fetchData();

    let gainerData = gainer[0].find(item => item.ticker === sym);
    if (!gainerData) {
      gainerData = gainer[1]?.find(item => item.ticker === sym) || null;
    }
    setData(gainerData);
  }, [sym]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!comp) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Failed to load company details.</Text>
      </View>
    );
  }

  // Parse change_percentage to a number
  const changePercentage = data ? parseFloat(data.change_percentage) : parseFloat(comp.PERatio);

  // Determine which graph to display based on change_percentage
  let graphSource = null;
  if (changePercentage < 0) {
    graphSource = Math.random() < 0.5 ? Negative1 : Negative2;
  } else {
    graphSource = Math.random() < 0.5 ? Positive1 : Positive2;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon name="apple" type="font-awesome" size={40} color="#000" />
        <View style={styles.headerText}>
          <Text style={styles.title}>{comp.Name}</Text>
          <Text style={styles.subtitle}>{comp.AssetType} - {comp.Exchange}</Text>
        </View>
        <View style={styles.topheader}>
          <Text style={styles.price}>${data ? data.price : comp.CurrentPrice} </Text>
          <Text style={[styles.priceChange, changePercentage < 0 ? styles.negativeChange : styles.positiveChange]}>
            {data ? data.change_percentage : comp.PERatio}
          </Text>
        </View>
      </View>
      <Image source={graphSource} style={styles.chart} />

      <Card.Divider />
      <Text style={styles.aboutTitle}>About {comp.Name}</Text>
      <Text style={styles.aboutText}>{comp.Description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Industry</Text>
          <Text style={styles.infoValue}>{comp.Industry}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sector</Text>
          <Text style={styles.infoValue}>{comp.Sector}</Text>
        </View>
      </View>
      <Card.Divider />
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>52-Week Low</Text>
          <Text style={styles.statValue}>${comp['52WeekLow']}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current Price</Text>
          <Text style={styles.statValue}>${comp.CurrentPrice}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>52-Week High</Text>
          <Text style={styles.statValue}>${comp['52WeekHigh']}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text style={styles.statValue}>${(parseFloat(comp.MarketCapitalization) / 1e12).toFixed(2)}T</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>P/E Ratio</Text>
          <Text style={styles.statValue}>{comp.PERatio}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Beta</Text>
          <Text style={styles.statValue}>{comp.Beta}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Dividend Yield</Text>
          <Text style={styles.statValue}>{comp.DividendYield}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Profit Margin</Text>
          <Text style={styles.statValue}>{comp.ProfitMargin}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  topheader: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 12,
    marginLeft: 5,
  },
  negativeChange: {
    color: 'red',
  },
  positiveChange: {
    color: '#4caf50',
  },
  chart: {
    height: 200,
 
    width: '100%',
    resizeMode:'contain'
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#EBD2C3',
    padding: 6,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 10,
    color: '#AF6E4B',
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 10,
    color: '#AF6E4B',
    fontWeight: 'bold',
    textTransform: 'lowercase',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  statItem: {
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
