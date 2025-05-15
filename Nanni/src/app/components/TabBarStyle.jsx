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
  backGround: {
    flex: 1,
    backgroundColor: colors.p3,
    height: 100,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    textAlign: 'center',  //centraliza o texto
  },
  tabBarItemStyle: {
    justifyContent: 'center', //centraliza os ícones e texto no item
    alignItems: 'center',
  },
  tabBarStyle: {
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: colors.p3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})

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
