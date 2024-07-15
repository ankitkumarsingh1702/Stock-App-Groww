import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getTopGainers, getTopLosers, searchTicker } from '@/data/alphavantage';
import LoserListItem from '@/components/List/LoserListItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import gainer from '@/data/Gainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ExploreScreen = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const GainerLoser = await getTopGainers();
      console.log("gainer-loser",GainerLoser);
      const topGainers = GainerLoser.top_gainers;
      console.log("top-gainer",topGainers);
      const topLosers = GainerLoser.top_losers;
      console.log("top-loser",topLosers);
      setGainers(topGainers);
      setLosers(topLosers);
      gainer.push(topLosers);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleItemPress = async (symbol: string) => {
    // Handle navigation or other actions on item press
    console.log('Pressed item with symbol:', symbol);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    setLoading(true);
    try {
      const results = await searchTicker(searchQuery);
      console.log('Search Results:', results); // Debugging line
      setSearchResults(results.bestMatches);
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

  const renderItem = ({ item }: { item: any }) => (
    <LoserListItem
      logo={item.logo}
      ticker={item.ticker}
      price={item.price}
      change_percentage={item.change_percentage}
      onPress={() => handleItemPress(item.symbol)}
    />
  );

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.heading}>Top Losers</Text>
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
        data={losers}
        renderItem={renderItem}
        keyExtractor={(item) => item.ticker}
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
  searchbox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    paddingLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
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
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    ...commonStyles.heading,
    color: 'black',
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#333',
  },
  heading: {
    ...commonStyles.heading,
    color: 'white',
  },
});

export default ExploreScreen;
