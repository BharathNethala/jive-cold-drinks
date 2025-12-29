import React from 'react';

export interface DrinkItem {
  id: string;
  name: string;
  description: string;
  price: string;
  priceValue: number; // Added for calculations
  category: 'Special' | 'Juice' | 'Shake' | 'Soda';
  imageUrl: string;
  popular?: boolean;
}

export interface CartItem extends DrinkItem {
  quantity: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}