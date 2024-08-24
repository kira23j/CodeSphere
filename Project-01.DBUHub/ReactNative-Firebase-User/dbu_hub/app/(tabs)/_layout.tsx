import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#90F9FF',
          borderTopColor: '#0A5252',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '900',
          color: '#0A4549',
        },
        tabBarActiveTintColor: '#B00000',
        tabBarInactiveTintColor: '#003935',
        tabBarIconStyle: {
          marginBottom: 0,
        },
    
      }}
    >
      <Tabs.Screen
        name='Home'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Navigate'
        options={{
          tabBarLabel: 'Navigate',
          tabBarIcon: ({ color }) => <FontAwesome5 name="map-marker-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='Services'
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({ color }) => <FontAwesome5 name="servicestack" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
