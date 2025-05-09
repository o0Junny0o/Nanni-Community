require('dotenv').config();

module.exports = {
  expo: {
    name: 'Nanni',
    slug: 'Nanni',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    owner: '',
    splash: {
      image: './src/assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.nanni.community',
      adaptiveIcon: {
        foregroundImage: './src/assets/ic_logo.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    plugins: [
      [
        'expo-notifications',
        {
          icon: './src/assets/ic_logo.png',
          color: '#ffffff',
          androidMode: 'collapse', // Modo recomendado
          androidCollapsedTitle: 'Nanni', // Título quando recolhido
        },
      ],
    ],
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      GIPHY_API_KEY: process.env.GIPHY_API_KEY,
      eas: {
        projectId: 'c6739a76-5728-42c5-a305-ee1ca98c1604',
      },
    },
  },
};
