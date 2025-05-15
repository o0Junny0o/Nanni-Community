import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../components/contexts/AuthContext';
import { calcularVendasPorJogo } from '../../../service/firebase/analytics/vendasService';
import { LineChartScreen } from '../../components/graficos/ChartScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { styles } from './style';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase/conexao';
import { Picker } from '@react-native-picker/picker';

// Componente principal de visualização de análise de dados
export default function TESTE() {
  // Estado para o ano selecionado no dropdown
  const [selectedAno, setSelectedAno] = useState('2024');
  // Estado para armazenar os dados de vendas retornados do serviço
  const [vendas, setVendas] = useState({});
  // Dados de dropdown de jogos
  const [jogos, setJogos] = useState(["JOGO 1", "JOGO 2", "JOGO 3"])
  // Valor animado para controlar a altura do dropdown
  const [anoDropdownAnimation] = useState(new Animated.Value(0));
  // Contexto de autenticação para obter dados do usuário

  const { user } = useAuth(); // REMOVIDO PARA TESTES
  // const user = { uid: 'T0EYcPo4RHUnUlHJ3SJcWgepzPJ2'}

  // Lista de anos disponíveis para seleção
  const anos = ['2023', '2024', '2025'];
  // Nome fixo do jogo para demonstração (poderia vir de props ou rota)
  const jogoNavegado = 'Jogo Exemplo';
  // Dados prontos para o gráfico
  const chartData = useState([]);
  
  // Efeito para recarregar dados sempre que o usuário ou ano selecionado mudarem
  useEffect(() => {
    // Prepara os dados no formato esperado pelo componente de gráfico
    const getChartData = () => {
      // Verifica se há dados para o jogo e ano selecionado
      if (!vendas[jogoNavegado] || !vendas[selectedAno]) {
        return []; // Sem dados, retorna array vazio
      }
      const dadosDoAno = vendas[jogoNavegado][selectedAno];
      // Mapeia cada item para { name: mes, value: vendas }
      
      return dadosDoAno.map((item) => ({
        name: item.mes,
        value: item.vendas,
      }));
    };

    
    const carregarVendas = async () => {
      // Confirma que temos usuário autenticado e um ano válido
      if (user?.uid && selectedAno) {
        try {
          // Chama o serviço que retorna vendas por jogo para o UID e ano
          const resultado = await calcularVendasPorJogo(user.uid, selectedAno);
          // Atualiza o estado com os dados recebidos
          setVendas(resultado);
          getChartData();
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
  }, [user?.uid, selectedAno, chartData]); // Dependências: refaz ao mudar UID ou ano

  // Interpolação da altura do dropdown conforme valor animado (0 a 1)
  const anoDropdownHeight = anoDropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, anos.length * 40], // altura total baseada em número de itens
  });

  

  

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
    <SafeAreaView style={styles.safe}>
      <View style={styles.view}>
      
        {/* Título da tela */}
        <Text style={styles.title}>ANÁLISE DE DADOS</Text>

        {/* Exibe o nome do jogo */}
        <View style={styles.jogoDisplayContainer}>
          <Text style={styles.jogoDisplayTextTitle}>Jogo: </Text>
          {jogos && jogos.length > 0 && (
            <Picker
              style={{ width: "50%"}}
              mode='dropdown'
              selectedValue={jogos[0]}
              enabled={true}
              onValueChange={(item, index) => Alert.alert(`Selecionado : ${index}`)}
              >
                {jogos.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))} 
            </Picker>
          )}
        </View>

        {/* Dropdown para seleção de ano */}
        {/* <View style={styles.anoContainer}>
          <TouchableOpacity
            style={styles.jogoSelectHeader}
            onPress={toggleAnoDropdown}
          >
            <Text style={styles.jogoSelectText}>Ano: {selectedAno}</Text> */}
            {/* Ícone muda conforme dropdown aberto/fechado */}
            {/* <Icon
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
        </View> */}

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
        
        <View style={[styles.jogoDisplayContainer, {justifyContent: 'flex-start', height: 50}]}>
          <Picker 
            selectedValue={anos[0]}
            mode={'dropdown'}
            style={{ width: "40%"}}>
              {anos.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
          </Picker>
        </View>

        {/* {chartData && chartData.length > 0 ? (
          // <LineChartScreen data={chartData} />
          <Text>chartData</Text>
        ) : ( */}
          <Text style={styles.loadingText}>
            Nenhum dado disponível para o gráfico.
          </Text>
        {/* )} */}
      
      </View>
    </SafeAreaView>
  );
}