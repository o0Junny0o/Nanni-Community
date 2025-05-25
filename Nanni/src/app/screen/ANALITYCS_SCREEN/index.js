import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../components/contexts/AuthContext';
import {
  calcularVendasPorJogo,
  getJogosDoUsuario,
  getDataJogosVenda,
  getNumVendas,
} from '../../../service/firebase/analytics/vendasService';
import { getViews } from '../../../service/firebase/analytics/viewsService';
import { getAvaAvg } from '../../../service/firebase/analytics/avaliacaoService';
import { LineChartScreen } from '../../components/graficos/ChartScreen';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style';

export default function AnalyticsScreen() {
  const { user } = useAuth();
  const [selectedAno, setSelectedAno] = useState(
    new Date().getFullYear().toString(),
  );
  const [selectedJogo, setSelectedJogo] = useState(null);
  const [jogos, setJogos] = useState([]);
  const [vendasPorMes, setVendasPorMes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar dados dos jogos e métricas
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const jogosList = await getJogosDoUsuario(user?.uid);

        // Buscar dados em paralelo
        const [anosData, numVendas, viewsData, mediaAvaliacao] =
          await Promise.all([
            getDataJogosVenda(jogosList),
            getNumVendas(jogosList),
            getViews(jogosList),
            getAvaAvg(jogosList),
          ]);

        // Combinar resultados
        const resultadoFinal = jogosList.map((jogo) => ({
          ...jogo,
          anos: anosData[jogo.caminho]?.anos || [],
          vendas: numVendas[jogo.caminho] || 0,
          views: viewsData[jogo.caminho] || 0,
          avaliacao: mediaAvaliacao[jogo.caminho] || 0,
        }));

        setJogos(resultadoFinal);
        if (resultadoFinal.length > 0) {
          setSelectedJogo(resultadoFinal[0].caminho);
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar dados',
          text2: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) fetchData();
  }, [user?.uid]);

  // Buscar vendas por mês quando ano/jogo mudar
  useEffect(() => {
    const fetchVendas = async () => {
      if (!selectedJogo) return;

      try {
        setLoading(true);
        const jogo = jogos.find((j) => j.caminho === selectedJogo);
        const data = await calcularVendasPorJogo([jogo], Number(selectedAno));
        setVendasPorMes(data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar vendas',
          text2: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, [selectedAno, selectedJogo]);

  // Dados para métricas
  const metricas = useMemo(() => {
    const jogo = jogos.find((j) => j.caminho === selectedJogo);
    return jogo
      ? {
          Vendas: jogo.vendas,
          Visualizações: jogo.views,
          Avaliação: jogo.avaliacao.toFixed(1),
        }
      : {};
  }, [selectedJogo, jogos]);

  // Anos disponíveis
  const anos = useMemo(() => {
    const jogo = jogos.find((j) => j.caminho === selectedJogo);
    return jogo?.anos?.length > 0
      ? jogo.anos.sort((a, b) => b - a)
      : [new Date().getFullYear()];
  }, [selectedJogo, jogos]);

  // Dados para gráfico
  const chartData = useMemo(() => {
    return vendasPorMes.length > 0
      ? vendasPorMes[0].data.map((mes) => ({
          name: mes.name,
          value: mes.value,
        }))
      : [];
  }, [vendasPorMes]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Análise de Dados</Text>

          {/* Seletor de Jogo */}
          <View style={styles.pickerContainer}>
            <Icon name="sports-esports" size={20} color="#666" />
            <Picker
              style={styles.picker}
              selectedValue={selectedJogo}
              onValueChange={setSelectedJogo}
              dropdownIconColor="#666"
            >
              {jogos.map((jogo) => (
                <Picker.Item
                  key={jogo.caminho}
                  label={jogo.nome}
                  value={jogo.caminho}
                />
              ))}
            </Picker>
          </View>

          {/* Métricas */}
          <View style={styles.metricContainer}>
            {Object.entries(metricas).map(([key, value]) => (
              <View key={key} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{key}</Text>
                <Text style={styles.metricValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Seletor de Ano */}
          <View style={styles.pickerContainer}>
            <Icon name="calendar-today" size={18} color="#666" />
            <Picker
              style={styles.picker}
              selectedValue={selectedAno}
              onValueChange={setSelectedAno}
              dropdownIconColor="#666"
            >
              {anos.map((ano) => (
                <Picker.Item
                  key={`ano-${ano}`}
                  label={String(ano)}
                  value={String(ano)}
                />
              ))}
            </Picker>
          </View>

          {/* Gráfico */}
          {chartData.length > 0 ? (
            <LineChartScreen data={chartData} />
          ) : (
            <Text style={styles.infoText}>
              Nenhum dado disponível para o período
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
