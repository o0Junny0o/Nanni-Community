import { useState } from 'react';
import { styles } from './style';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For the dropdown
import { useSafeAreaInsets } from 'react-native-safe-area-context'; //to handle notch and status bar
import { userRef } from '../../../utils/userRef';
import DoacaoModel from '../../../model/Doacao/DoacaoModel';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../components/contexts/AuthContext';
import PropTypes from 'prop-types';

function DoacaoScreen({ route }) {
  const { userRecebe } = route.params;
  const [userT, setUserT] = useState(userRecebe);
  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState('pix'); // Default value
  const insets = useSafeAreaInsets();

  const handleDoacao = async () => {
    const { user } = useAuth();
    await doacao(user, userT, valor, metodo);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Faça sua Doação</Text>
        <Text style={styles.description}>
          Preencha os campos abaixo para contribuir com o projeto.
        </Text>
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
}

async function doacao(userG, userT, valor, metodo) {
  const userRefGive = userRef(userG.uid);
  const userRefTake = userRef(userT.uid);

  const timestamp = Timestamp.now();
  const isoString = timestamp.toDate().toISOString();

  const novaDoacao = new DoacaoModel({
    userRefGive,
    userRefTake,
    data: isoString,
    valor: valor,
    metodoPag: metodo,
  });

  await novaDoacao.save();
}

DoacaoScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userRecebe: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DoacaoScreen;
