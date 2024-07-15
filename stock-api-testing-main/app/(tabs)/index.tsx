import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getTopGainers, getCompOverview, searchTicker } from '@/data/alphavantage';
import ListItem from '@/components/List/ListItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import for theme icons
import gainer from '@/data/Gainer';

const TopGainersScreen = () => {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopGainers();
      console.log('Top Gainers Data:', data); // Debugging line
      setGainers(data.top_gainers);
      gainer.push(data.top_gainers);
      console.log('Gainer', gainer);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleItemPress = async (symbol: string) => {
    setLoading(true);
    try {
      const companyOverview = await getCompOverview(symbol);
      console.log('Company Overview:', companyOverview); // Log or handle companyOverview as needed
      // Navigate to another screen with companyOverview data if needed
    } catch (error) {
      console.error('Error fetching company overview:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    setLoading(true);
    try {
      const results = await searchTicker(searchQuery);
      console.log('Search Results:', results); // Debugging line
      const updatedResults = results.bestMatches.map((item: any) => {
        const matchedGainer = gainers.find(gainer => gainer.symbol === item['1. symbol']);
        return {
          ...item,
          price: matchedGainer ? matchedGainer.price : 'N/A',
          change_percentage: matchedGainer ? matchedGainer.change_percentage : 'N/A',
        };
      });
      setSearchResults(updatedResults);
      setRecentSearches((prevSearches) => {
        const newSearches = [searchQuery, ...prevSearches.filter(query => query !== searchQuery)];
        return newSearches.length > 5 ? newSearches.slice(0, 5) : newSearches;
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
    handleSearch();
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderItem = ({ item }: { item: any }) => {
    const data = searchResults.length > 0 ? {
      logo: item['logo'], // Adjust based on actual keys in search results
      ticker: item['1. symbol'], // Adjust based on actual keys in search results
      price: item.price,
      change_percentage: item.change_percentage,
      symbol: item['1. symbol'], // Ensure symbol is correct for both cases
    } : {
      logo: item.logo,
      ticker: item.ticker,
      price: item.price,
      change_percentage: item.change_percentage,
      symbol: item.symbol,
    };

    console.log('Rendered Item Data:', data); // Debugging line

    return (
      <ListItem
        logo={data.logo}
        ticker={data.ticker}
        price={data.price}
        change_percentage={data.change_percentage}
        onPress={() => handleItemPress(data.symbol)}
      />
    );
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.heading}>Top Gainers</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <MaterialCommunityIcons
            name={isDarkMode ? 'weather-sunny' : 'weather-night'}
            size={24}
            color="white"
            style={styles.themeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchbox}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Ticker..."
          placeholderTextColor={isDarkMode ? 'white' : 'gray'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {isFocused && recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <ScrollView style={styles.recentSearchesList} horizontal showsHorizontalScrollIndicator={false}>
            {recentSearches.map((query, index) => (
              <TouchableOpacity key={index} onPress={() => handleRecentSearchPress(query)} style={styles.recentSearchItem}>
                <Icon name="history" size={20} color={isDarkMode ? '#bbb' : '#555'} style={styles.recentSearchIcon} />
                <Text style={styles.recentSearchText}>{query}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleClearRecentSearches} style={[styles.clearButton, { borderColor: 'red', borderWidth: 1 }]}>
            <Icon name="close" size={20} color="red" />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={searchResults.length > 0 ? searchResults : gainers}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol || item['1. symbol']}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const commonStyles = {
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchbox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
    paddingLeft: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  searchButton: {
    marginLeft: 10,
    borderRadius: 20,
    padding: 8,
    backgroundColor: 'blue',
  },
  recentSearchesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  recentSearchesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  recentSearchIcon: {
    marginRight: 5,
  },
  recentSearchText: {
    color: '#333',
  },
  clearButton: {
    marginLeft: 'auto',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginTop: 24,
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  themeIcon: {
    borderRadius: 20,
    padding: 1,
  },
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchbox: {
    ...commonStyles.searchbox,
    backgroundColor: 'white',
  },
  searchButton: {
    ...commonStyles.searchButton,
    backgroundColor: 'blue',
  },
  recentSearchesContainer: {
    ...commonStyles.recentSearchesContainer,
    backgroundColor: 'white',
  },
  recentSearchItem: {
    ...commonStyles.recentSearchItem,
    backgroundColor: '#f0f0f0',
  },
  recentSearchText: {
    ...commonStyles.recentSearchText,
    color: '#333',
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#333',
  },
  searchbox: {
    ...commonStyles.searchbox,
    backgroundColor: '#555',
  },
  searchButton: {
    ...commonStyles.searchButton,
    backgroundColor: '#888',
  },
  recentSearchesContainer: {
    ...commonStyles.recentSearchesContainer,
    backgroundColor: '#444',
  },
  recentSearchItem: {
    ...commonStyles.recentSearchItem,
    backgroundColor: '#666',
  },
  recentSearchText: {
    ...commonStyles.recentSearchText,
    color: '#ccc',
  },
  heading: {
    ...commonStyles.heading,
    color: 'white',
  },
  searchBar: {
    ...commonStyles.searchBar,
    color: 'white',
  },
});

export default TopGainersScreen;
