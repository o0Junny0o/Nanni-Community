import React, { useState } from 'react';
import styles from './style';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For the dropdown
import { useSafeAreaInsets } from 'react-native-safe-area-context'; //to handle notch and status bar

const DoacaoScreen = () => {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [metodo, setMetodo] = useState('pix'); // Default value
    const insets = useSafeAreaInsets();

    const handleDoacao = () => {
        // Implement your donation logic here
        console.log('Nome:', nome);
        console.log('Valor:', valor);
        console.log('Método:', metodo);
        alert(`Doação de R$${valor} realizada com sucesso via ${metodo}!`); //simple feedback
    };

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.content}>
                <Text style={styles.title}>Faça sua Doação</Text>
                <Text style={styles.description}>
                    Preencha os campos abaixo para contribuir com o projeto.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome Completo"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor (R$)"
                    value={valor}
                    onChangeText={setValor}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Método de Pagamento</Text>
                <Picker
                    selectedValue={metodo}
                    onValueChange={(itemValue, itemIndex) => setMetodo(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Pix" value="pix" />
                    <Picker.Item label="Cartão de Crédito" value="credito" />
                    <Picker.Item label="Boleto Bancário" value="boleto" />
                </Picker>

                <TouchableOpacity style={styles.doarButton} onPress={handleDoacao}>
                    <Text style={styles.doarButtonText}>Doar Agora</Text>
                </TouchableOpacity>
                 <Text style={styles.disclaimer}>
                    Ao doar, você concorda com os termos e condições de doação.
                </Text>
            </View>
        </ScrollView>
    );
};



export default DoacaoScreen;
