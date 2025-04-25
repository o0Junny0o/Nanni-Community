// Em seu App.js ou onde desejar mostrar o gráfico:
import React from 'react';
import { SafeAreaView } from 'react-native';
import ChartScreen from '../../components/graficos/ChartScreen';

export default function TESTE() {
  const sampleData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 278 },
    { name: 'Jun', value: 189 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChartScreen data={sampleData} />
    </SafeAreaView>
  );
}
