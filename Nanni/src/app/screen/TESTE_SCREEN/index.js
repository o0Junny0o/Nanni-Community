import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useAuth } from '../../components/contexts/AuthContext';
import { calcularVendasPorJogo } from '../../../service/firebase/analytics/vendasService';
import { LineChartScreen } from '../../components/graficos/ChartScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { styles } from './style';

export default function TESTE() {
    const { jogoSelecionado: jogoNavegado } = route.params;

    const [selectedAno, setSelectedAno] = useState('2024');
    const [vendas, setVendas] = useState({});

    const [isAnoDropdownOpen, setIsAnoDropdownOpen] = useState(false);
    const [anoDropdownAnimation] = useState(new Animated.Value(0));
    const { user } = useAuth();

    const anos = ['2023', '2024', '2025'];

    useEffect(() => {
        const carregarVendas = async () => {
            if (user?.uid && jogoNavegado && selectedAno) {
                try {
                    const resultado = await calcularVendasPorJogo(user.uid, selectedAno);
                    setVendas(resultado);
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erro',
                        text2: error,
                    });
                    console.error('Erro ao buscar vendas:', error);
                    setVendas({});
                }
            }
        };

        carregarVendas();
    }, [user?.uid, jogoNavegado, selectedAno]);

    const toggleAnoDropdown = useCallback(() => {
        setIsAnoDropdownOpen(prev => !prev);
        Animated.timing(anoDropdownAnimation, {
            toValue: isAnoDropdownOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isAnoDropdownOpen, anoDropdownAnimation]);

    const anoDropdownHeight = anoDropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, anos.length * 40],
    });

    const getChartData = () => {
        if (!vendas[jogoNavegado] || !vendas[jogoNavegado][selectedAno]) {
            return [];
        }
        const dadosDoAno = vendas[jogoNavegado][selectedAno];
        return dadosDoAno.map(item => ({
            name: item.mes,
            value: item.vendas,
        }));
    };

    const chartData = getChartData();

    const acessos = vendas[jogoNavegado]?.acessos || 0;
    const downloads = vendas[jogoNavegado]?.downloads || 0;
    const compras = vendas[jogoNavegado]?.compras || 0;

    if (!user) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.view}>
                    <Text style={styles.loadingText}>Usuário não autenticado.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.view}>
            <SafeAreaView style={styles.safe}>
                <Text style={styles.title}>ANÁLISE DE DADOS</Text>


                <View style={styles.jogoDisplayContainer}>
                    <Text style={styles.jogoDisplayTextTitle}>Jogo: </Text>
                    <Text style={styles.jogoDisplayText}>{jogoNavegado}</Text>
                </View>

                <View style={styles.anoContainer}>
                    <TouchableOpacity
                        style={styles.jogoSelectHeader}
                        onPress={toggleAnoDropdown}
                    >
                        <Text style={styles.jogoSelectText}>Ano: {selectedAno}</Text>
                        <Icon
                            name={isAnoDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                    <Animated.View style={{ height: anoDropdownHeight, overflow: 'hidden' }}>
                        {isAnoDropdownOpen && (
                            <View style={styles.jogoSelectList}>
                                {anos.map((ano) => (
                                    <TouchableOpacity
                                        key={ano}
                                        style={styles.jogoSelectItem}
                                        onPress={() => {
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

                {chartData.length > 0 ? (
                    <LineChartScreen data={chartData} />
                ) : (
                    <Text style={styles.loadingText}>Nenhum dado disponível para o gráfico.</Text>
                )}

            </SafeAreaView>
        </View>
    );
}
