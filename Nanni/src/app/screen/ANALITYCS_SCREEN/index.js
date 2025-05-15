import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useAuth } from '../../components/contexts/AuthContext';
import { calcularVendasPorJogo } from '../../../service/firebase/analytics/vendasService';
import { LineChartScreen } from '../../components/graficos/ChartScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { styles } from './style';

// Componente principal de visualização de análise de dados
export default function TESTE() {
  // Estado para o ano selecionado no dropdown
  const [selectedAno, setSelectedAno] = useState('2024');
  // Estado para armazenar os dados de vendas retornados do serviço
  const [vendas, setVendas] = useState({});
  // Estado que controla se o dropdown de seleção de ano está aberto
  const [isAnoDropdownOpen, setIsAnoDropdownOpen] = useState(false);
  // Valor animado para controlar a altura do dropdown
  const [anoDropdownAnimation] = useState(new Animated.Value(0));
  // Contexto de autenticação para obter dados do usuário
  const { user } = useAuth();

  // Lista de anos disponíveis para seleção
  const anos = ['2023', '2024', '2025'];
  // Nome fixo do jogo para demonstração (poderia vir de props ou rota)
  const jogoNavegado = 'Jogo Exemplo';

  // Efeito para recarregar dados sempre que o usuário ou ano selecionado mudarem
  useEffect(() => {
    const carregarVendas = async () => {
      // Confirma que temos usuário autenticado e um ano válido
      if (user?.uid && selectedAno) {
        try {
          // Chama o serviço que retorna vendas por jogo para o UID e ano
          const resultado = await calcularVendasPorJogo(user.uid, selectedAno);
          console.log(JSON.stringify(resultado, null, 2));
          // Atualiza o estado com os dados recebidos
          setVendas(resultado);
        } catch (error) {
          // Exibe uma mensagem de erro caso a chamada falhe
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: error.message || error,
          });
          console.error('Erro ao buscar vendas:', error);
          // Reseta dados de vendas para um objeto vazio
          setVendas({});
        }
      }
    };

    carregarVendas();
  }, [user?.uid, selectedAno]); // Dependências: refaz ao mudar UID ou ano

  // Função para abrir/fechar o dropdown de ano com animação
  const toggleAnoDropdown = useCallback(() => {
    setIsAnoDropdownOpen((prev) => !prev);
    Animated.timing(anoDropdownAnimation, {
      toValue: isAnoDropdownOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isAnoDropdownOpen, anoDropdownAnimation]);

  // Interpolação da altura do dropdown conforme valor animado (0 a 1)
  const anoDropdownHeight = anoDropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, anos.length * 40], // altura total baseada em número de itens
  });

  // Prepara os dados no formato esperado pelo componente de gráfico
  const getChartData = () => {
    // Verifica se há dados para o jogo e ano selecionado
    if (!vendas[jogoNavegado] || !vendas[jogoNavegado][selectedAno]) {
      return []; // Sem dados, retorna array vazio
    }
    const dadosDoAno = vendas[jogoNavegado][selectedAno];
    // Mapeia cada item para { name: mes, value: vendas }
    return dadosDoAno.map((item) => ({
      name: item.mes,
      value: item.vendas,
    }));
  };

  // Dados prontos para o gráfico
  const chartData = getChartData();

  // Extrai métricas adicionais de acessos, downloads e compras
  const acessos = vendas[jogoNavegado]?.acessos || 0;
  const downloads = vendas[jogoNavegado]?.downloads || 0;
  const compras = vendas[jogoNavegado]?.compras || 0;

  // Caso não haja usuário autenticado, mostra mensagem e sai
  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.view}>
          <Text style={styles.loadingText}>Usuário não autenticado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Renderização principal da tela de análise
  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.safe}>
        {/* Título da tela */}
        <Text style={styles.title}>ANÁLISE DE DADOS</Text>

        {/* Exibe o nome do jogo */}
        <View style={styles.jogoDisplayContainer}>
          <Text style={styles.jogoDisplayTextTitle}>Jogo: </Text>
          <Text style={styles.jogoDisplayText}>{jogoNavegado}</Text>
        </View>

        {/* Dropdown para seleção de ano */}
        <View style={styles.anoContainer}>
          <TouchableOpacity
            style={styles.jogoSelectHeader}
            onPress={toggleAnoDropdown}
          >
            <Text style={styles.jogoSelectText}>Ano: {selectedAno}</Text>
            {/* Ícone muda conforme dropdown aberto/fechado */}
            <Icon
              name={isAnoDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          <Animated.View
            style={{ height: anoDropdownHeight, overflow: 'hidden' }}
          >
            {isAnoDropdownOpen && (
              <View style={styles.jogoSelectList}>
                {anos.map((ano) => (
                  <TouchableOpacity
                    key={ano}
                    style={styles.jogoSelectItem}
                    onPress={() => {
                      // Atualiza o ano selecionado e fecha dropdown
                      setSelectedAno(ano);
                      setIsAnoDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.jogoSelectText}>{ano}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        </View>

        {/* Mostra métricas de acessos, downloads e compras */}
        <View style={styles.dataInfoContainer}>
          <View style={styles.dataItem}>
            <Text style={styles.dataTitle}>Acessos</Text>
            <Text style={styles.dataValue}>{acessos}</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataTitle}>Downloads</Text>
            <Text style={styles.dataValue}>{downloads}</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataTitle}>Compras</Text>
            <Text style={styles.dataValue}>{compras}</Text>
          </View>
        </View>

        {/* Exibe gráfico de vendas ou mensagem de ausência de dados */}
        {chartData.length > 0 ? (
          <LineChartScreen data={chartData} />
        ) : (
          <Text style={styles.loadingText}>
            Nenhum dado disponível para o gráfico.
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
}