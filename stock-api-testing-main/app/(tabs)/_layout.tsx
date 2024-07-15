import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: () => null,
        tabBarLabelStyle: { fontSize: 16, fontWeight:500  },
        tabBarStyle: {
          paddingBottom: 12, // Add padding at the bottom
          paddingTop: 12,  
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'TOP GAINERS',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'TOP LOSERS',
        }}
      />
    </Tabs>
  );
}
