// models/User.ts
import { db } from '../../service/firebase/conexao';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import { DOACOES_COLLECTION } from '../refsCollection';

class DoacaoModel {
  constructor(data) {
    this.id = data.id ?? null; // ID será gerado pelo Firestore
    this.userRefGive = data.userRefGive; // Deve ser uma DocumentReference
    this.userRefTake = data.userRefTake; // Deve ser uma DocumentReference
    this.data = data.data; // Timestamp do Firestore
    this.valor = data.valor;
    this.metodoPag = data.metodoPag;
  }

  // Método para salvar no Firestore
  async save() {
    try {
      // Objeto estruturado para o Firestore
      const donationData = {
        userRefGive: this.userRefGive, // Referência ao documento do doador
        userRefTake: this.userRefTake, // Referência ao documento do receptor
        data: this.data, // Já é um Timestamp (criado via DonationBuilder)
        valor: this.valor,
        metodoPag: this.metodoPag,
      };

      // Salva na coleção "Doacao"
      const docRef = await addDoc(
        collection(db, DOACOES_COLLECTION),
        donationData,
      );
      this.id = docRef.id; // Atualiza o ID após salvar

      Toast.show({
        type: 'success',
        text1: 'Doação Enviada!',
        text2: `Sua doação foi enviada para ${this.userRefTake}`,
      });

      // Notificação push ao invés de console.log
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Doação Enviada!',
          body: `Sua doação foi enviada para ${this.userRefTake}`, 
        },
        trigger: { seconds: 2 },
      });

      // eslint-disable-next-line
      console.log('Doação salva com ID:', this.id);
      return this.id;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao enviar a doação',
      });

      // eslint-disable-next-line
      console.error('Erro ao salvar doação:', error);
      throw error;
    }
  }

  // Método para busca todas as doações feitas por essa referência ao usuário
  static async fetchByUserRefGive(userRef) {
    try {
      const q = query(
        collection(db, DOACOES_COLLECTION),
        where('userRefGive', '==', userRef),
      );

      const querySnapshot = await getDocs(q);
      const donations = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        donations.push(
          new DoacaoModel({
            ...data,
            id: doc.id,
            data: data.data,
          }),
        );
      });

      return donations;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao buscar doações',
      });
      // eslint-disable-next-line
      console.error('Erro ao buscar doações:', error);
      throw error;
    }
  }
}

export default DoacaoModel;
