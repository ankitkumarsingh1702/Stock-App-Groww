import { Link } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BDRX, CINGW, CLNNW, CYN, DFLIW, GTACW, HTOOW, JFBRW, JOBY, KZIA, LCFY, MACAW, MEI, NBSTW, NEXI, SRZNW, SVMHW, TRONW } from "@/assets/stocksIcon/index";

const images = [
  BDRX, CINGW, CLNNW, CYN, DFLIW, GTACW, HTOOW, JFBRW, JOBY, KZIA, LCFY, MACAW, MEI, NBSTW, NEXI, SRZNW, SVMHW, TRONW
  // Add more image URLs here
];

// Global variable to keep track of the last used image index
let lastUsedIndex = 0;

const getNextImage = () => {
  const image = images[lastUsedIndex];
  lastUsedIndex = (lastUsedIndex + 1) % images.length;
  return image;
};

const LoserListItem = ({ ticker, price, change_percentage }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(getNextImage());
  }, []);

  return (
    <View style={styles.gridItem}>
      {image && <Image source={image} style={styles.logo} />}
      <View style={styles.infoContainer}>
        <Link to={`/${ticker}`}>
          <Text style={styles.name}>{ticker}</Text>
        </Link>
        <Text style={styles.price}>$ {price}</Text>
        <View style={styles.changeContainer}>
          <Text style={styles.changePercent}>{change_percentage}</Text>
          <Icon name="arrow-downward" size={16} color="red" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop:24,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  infoContainer: {},
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    marginTop: 7,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  changePercent: {
    fontSize: 12,
    color: 'red',
  },
});

export default LoserListItem;
