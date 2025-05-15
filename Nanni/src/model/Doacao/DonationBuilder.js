import { Timestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

class DonationBuilder {
  constructor() {
    this.userRefGive = null; // Referência ao doador (DocumentReference)
    this.userRefTake = null; // Referência ao receptor (DocumentReference)
    this.data = null; // Data (Date)
    this.valor = null; // Valor numérico
    this.metodoPag = null; // Método de pagamento (string)
  }

  // Define a referência do doador
  withUserRefGive(userRef) {
    this.userRefGive = userRef;
    return this;
  }

  // Define a referência do receptor
  withUserRefTake(userRef) {
    this.userRefTake = userRef;
    return this;
  }

  // Define a data (aceita Date ou Timestamp)
  withData(data) {
    try {
      if (data instanceof Date) {
        this.data = Timestamp.fromDate(data);
      } else if (data instanceof Timestamp) {
        this.data = data;
      } else if (typeof data === 'string') {
        const date = new Date(data);
        if (!isNaN(date)) {
          this.data = Timestamp.fromDate(date);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'String de data inválida.',
          });
          throw new Error('String de data inválida.');
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Data deve ser um Date, Timestamp ou string ISO.',
        });
        throw new Error('Data deve ser um Date, Timestamp ou string ISO.');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Erro ao definir data.',
      });
      throw error;
    }
    return this;
  }

  // Define o valor
  withValor(valor) {
    if (typeof valor !== 'number' || valor <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Valor deve ser um número positivo.',
      });
      throw new Error('Valor deve ser um número positivo.');
    }
    this.valor = valor;
    return this;
  }

  // Define o método de pagamento
  withMetodoPag(metodo) {
    const metodosValidos = ['pix', 'cartao', 'boleto'];
    if (!metodosValidos.includes(metodo)) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Método de pagamento inválido.',
      });
      throw new Error('Método de pagamento inválido.');
    }
    this.metodoPag = metodo;
    return this;
  }

  // Constrói o objeto Donation com validação
  build() {
    if (
      !this.userRefGive ||
      !this.userRefTake ||
      !this.data ||
      !this.valor ||
      !this.metodoPag
    ) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Todos os campos obrigatórios devem ser preenchidos.',
      });
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    return {
      userRefGive: this.userRefGive,
      userRefTake: this.userRefTake,
      data: this.data,
      valor: this.valor,
      metodoPag: this.metodoPag,
    };
  }
}

export default DonationBuilder;
