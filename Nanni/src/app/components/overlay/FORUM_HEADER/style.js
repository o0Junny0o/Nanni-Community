import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons from Expo

const CollapsibleHeader = ({ title, children, expandedHeight = 150, animationDuration = 300 }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const animationValue = useRef(new Animated.Value(1)).current;
  const headerHeight = useRef(new Animated.Value(50)).current; 
  const contentOpacity = useRef(new Animated.Value(1)).current; 

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);

    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: isCollapsed ? 1 : 0,
        duration: animationDuration,
        easing: Easing.easeInOut,
        useNativeDriver: false, 
      }),
      Animated.timing(headerHeight, {
        toValue: isCollapsed ? 50 : expandedHeight,
        duration: animationDuration,
        easing: Easing.easeInOut,
        useNativeDriver: false,
      }),
      Animated.timing(contentOpacity, {
        toValue: isCollapsed ? 1 : 0,
        duration: animationDuration * 0.6, 
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const arrowRotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <Ionicons name="chevron-down-outline" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={{ height: headerHeight, opacity: contentOpacity, overflow: 'hidden' }}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
    backgroundColor: 'white',
  },
});

export default CollapsibleHeader;