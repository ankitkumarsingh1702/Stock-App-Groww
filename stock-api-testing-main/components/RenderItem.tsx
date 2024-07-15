import ListItem from "./ListItem";

const renderItem = ({ item }: { item: any }) => {
    const data = searchResults.length > 0 ? {
      logo: item['logo'], // Adjust based on actual keys in search results
      ticker: item['1. symbol'], // Adjust based on actual keys in search results
      price: item['price'], // Adjust based on actual keys in search results
      change_percentage: item['change_percentage'], // Adjust based on actual keys in search results
      symbol: item['1. symbol'], // Ensure symbol is correct for both cases
    } : {
      logo: item.logo,
      ticker: item.ticker,
      price: item.price,
      change_percentage: item.change_percentage,
      symbol: item.symbol,
    };
  
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
  