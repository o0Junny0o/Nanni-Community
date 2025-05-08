import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ChartScreen from '../../components/graficos/ChartScreen';
import { useAuth } from '../../components/contexts/AuthContext';
import { calcularVendasPorJogo } from '../../../service/firebase/vendasService';
import styles from './style';

export default function TESTE() {
  const [vendas, setVendas] = useState({});
  const { user } = useAuth();

  // Carregar dados ao montar o componente
  useEffect(() => {
    const carregarVendas = async () => {
      try {
        const resultado = await calcularVendasPorJogo(user.uid); // Await dentro de uma função async
        setVendas(resultado);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    carregarVendas();
  }, [user.uid]);

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.safe}>
        <Text>Meu Gráfico:</Text>
        {vendas['1']?.data ? (
          <ChartScreen data={vendas['1'].data} />
        ) : (
          <Text>Carregando dados...</Text>
        )}
      </SafeAreaView>
    </View>
  );
}
