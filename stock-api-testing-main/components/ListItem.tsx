// ListItem.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ListItem = ({ logo, ticker, price, change_percentage, onPress }:any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {logo && <Image source={{ uri: logo }} style={styles.logo} />}
      <Text style={styles.ticker}>{ticker}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.change}>{change_percentage}%</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  ticker: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  change: {
    fontSize: 12,
    color: 'red',
  },
});

export default ListItem;
