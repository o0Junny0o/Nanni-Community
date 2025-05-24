import { StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: colors.p3,
    height: 100,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    textAlign: 'center', //centraliza o texto
  },
  tabBarItemStyle: {
    justifyContent: 'center', //centraliza os ícones e texto no item
    alignItems: 'center',
  },
  tabBarStyle: {
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.p3,
  },
});

const tabBarBackgroundStyle = () => <View style={styles.backGround} />;

const customTabBarStyle = {
  headerShown: false,
  tabBarActiveTintColor: colors.p1,
  tabBarInactiveTintColor: colors.p6,
  tabBarLabelStyle: styles.tabBarLabelStyle,
  tabBarItemStyle: styles.tabBarItemStyle,
  tabBarStyle: styles.tabBarStyle,
  tabBarBackground: tabBarBackgroundStyle,
};

export default customTabBarStyle;
