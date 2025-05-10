import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useAuth } from '../../components/contexts/AuthContext';
import { calcularVendasPorJogo } from '../../../service/firebase/analytics/vendasService';
import ChartScreen from '../../components/graficos/ChartScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style';

export default function TESTE() {
    const [selectedJogo, setSelectedJogo] = useState('Jogo 1');
    const [selectedAno, setSelectedAno] = useState('2024');
    const [vendas, setVendas] = useState({});
    const [isJogoDropdownOpen, setIsJogoDropdownOpen] = useState(false);
    const [isAnoDropdownOpen, setIsAnoDropdownOpen] = useState(false);
    const [dropdownAnimation] = useState(new Animated.Value(0));
    const [anoDropdownAnimation] = useState(new Animated.Value(0));
    const { user } = useAuth();

    const jogos = ['Jogo 1', 'Jogo 2', 'Jogo 3'];
    const anos = ['2023', '2024', '2025'];

    useEffect(() => {
        const carregarVendas = async () => {
            try {
                const resultado = await calcularVendasPorJogo(user.uid, selectedAno);
                setVendas(resultado);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            }
        };

        carregarVendas();
    }, [user.uid, selectedAno]);

      const toggleJogoDropdown = useCallback(() => {
        setIsJogoDropdownOpen(prev => !prev);
        Animated.timing(dropdownAnimation, {
            toValue: isJogoDropdownOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isJogoDropdownOpen, dropdownAnimation]);

    const toggleAnoDropdown = useCallback(() => {
        setIsAnoDropdownOpen(prev => !prev);
        Animated.timing(anoDropdownAnimation, {
            toValue: isAnoDropdownOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isAnoDropdownOpen, anoDropdownAnimation]);

    const dropdownHeight = dropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, jogos.length * 40],
    });

    const anoDropdownHeight = anoDropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, anos.length * 40],
    });

    const getChartData = () => {
        if (!vendas[selectedJogo] || !vendas[selectedJogo][selectedAno]) {
            return [];
        }
        const dadosDoAno = vendas[selectedJogo][selectedAno];
        return dadosDoAno.map(item => ({
            name: item.mes,
            value: item.vendas,
        }));
    };

    const chartData = getChartData();

    const acessos = vendas[selectedJogo]?.acessos || 0;
    const downloads = vendas[selectedJogo]?.downloads || 0;
    const compras = vendas[selectedJogo]?.compras || 0;

    return (
        <View style={styles.view}>
            <SafeAreaView style={styles.safe}>
                <Text style={styles.title}>ANÁLISE DE DADOS</Text>

                <View style={styles.jogoSelectContainer}>
                    <TouchableOpacity
                        style={styles.jogoSelectHeader}
                        onPress={toggleJogoDropdown}
                    >
                        <Text style={styles.jogoSelectText}>{selectedJogo}</Text>
                        <Icon
                            name={isJogoDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                    <Animated.View style={{ height: dropdownHeight, overflow: 'hidden' }}>
                        {isJogoDropdownOpen && (
                            <View style={styles.jogoSelectList}>
                                {jogos.map((jogo) => (
                                    <TouchableOpacity
                                        key={jogo}
                                        style={styles.jogoSelectItem}
                                         onPress={() => {
                                            setSelectedJogo(jogo);
                                            setIsJogoDropdownOpen(false);
                                        }}
                                    >
                                        <Text style={styles.jogoSelectText}>{jogo}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </Animated.View>
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
                    <ChartScreen data={chartData} />
                ) : (
                    <Text style={styles.loadingText}>Nenhum dado disponível para o gráfico.</Text>
                )}

            </SafeAreaView>
        </View>
    );
}