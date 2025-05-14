import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ChartScreen from '../../components/graficos/ChartScreen';
import { useAuth } from '../../components/contexts/AuthContext';
import {
  calcularVendasPorJogo,
  getNumVendas,
} from '../../../service/firebase/analytics/vendasService';
import { getAvaAvg } from '../../../service/firebase/analytics/avaliacaoService';
import DoacaoModel from '../../../model/Doacao/DoacaoModel';
import { getViews } from '../../../service/firebase/analytics/viewsService';
import Toast from 'react-native-toast-message';
import styles from './style';

import { Timestamp } from 'firebase/firestore';
import { userRef } from '../../../utils/userRef';

export default function TESTE() {
  const [vendas, setVendas] = useState({});
  const { user } = useAuth();

  // Carregar dados ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const resultado = await calcularVendasPorJogo(user.uid, 2024); // Await dentro de uma função async
        setVendas(resultado);

        const vendasTotal = await getNumVendas(user.uid);
        const views = await getViews(user.uid);
        const media = await getAvaAvg(user.uid);

        const userRefGive = userRef(user.uid);
        const userRefTake = userRef(user.uid);

        const timestamp = Timestamp.now();
        const isoString = timestamp.toDate().toISOString();

        const novaDoacao = new DoacaoModel({
          userRefGive,
          userRefTake,
          data: isoString,
          valor: 100.0,
          metodoPag: 'PIX',
        });

        //await novaDoacao.save();

        const doacoesFeitas = await DoacaoModel.fetchByUserRefGive(userRefGive);

        // Exibindo as doações
        // doacoesFeitas.forEach((doacao) => {
        //   console.log(doacao);
        // });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: error,
        });
      }
    };

    loadData();
  }, [user.uid]);

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.safe}>
        <Text>Meu Gráfico:</Text>
        {vendas[1]?.data ? (
          <ChartScreen data={vendas[1].data} />
        ) : (
          <Text>Carregando dados...</Text>
        )}
      </SafeAreaView>
    </View>
  );
}
