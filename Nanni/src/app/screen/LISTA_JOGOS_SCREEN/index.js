import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style';

const jogosDisponiveis = ['Jogo 1', 'Jogo 2', 'Jogo 3'];

export default function ListaJogos() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownHeader, setDropdownHeader] = useState('...Jogos');
    const navigation = useNavigation();

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
    }, []);

    const handleSelecionarJogo = useCallback((jogo) => {
        setIsDropdownOpen(false);
        setDropdownHeader(jogo);
        navigation.navigate('TESTE', {
            jogoSelecionado: jogo
        });
    }, [navigation]);

    return (
        <View style={styles.view}>
            <SafeAreaView style={styles.safe}>
                <Text style={styles.title}>ANÁLISE DE DADOS</Text>

                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        style={styles.dropdownHeader}
                        onPress={toggleDropdown}
                    >
                        <Text style={styles.dropdownText}>{dropdownHeader}</Text>
                        <Icon
                            name={isDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>

                    {isDropdownOpen && (
                        <View style={styles.dropdownList}>
                            {jogosDisponiveis.map((jogo) => (
                                <TouchableOpacity
                                    key={jogo}
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelecionarJogo(jogo)}
                                >
                                    <Text style={styles.dropdownText}>{jogo}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

            </SafeAreaView>
        </View>
    );
}