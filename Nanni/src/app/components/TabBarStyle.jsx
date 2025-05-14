import { StyleSheet, View } from 'react-native';

const colors = {
  p1: '#5D90D6',
  // p2: '#163690',
  p3: '#071934',
  // p5: "#B88CB4",
  p6: '#F2F2F2',
  // text: '#000000',
  // background: '#FFFFFF',
  // overlayBackground: 'rgba(200, 200, 200, 0.4)',
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  backGround: {
    flex: 1,
    backgroundColor: colors.p3,
  },
});

const tabBarBackgroundStyle = () => <View style={styles.backGround} />;

const customTabBarStyle = {
  headerShown: false,
  tabBarLabelStyle: styles.label,
  tabBarActiveTintColor: colors.p1,
  tabBarInactiveTintColor: colors.p6,
  tabBarStyle: { padding: 20 },
  tabBarBackground: tabBarBackgroundStyle,
};

export default customTabBarStyle;
