import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';

// Converte uma imagem PNG (local ou remota) para base64
const convertImageToBase64 = async (uri) => {
  try {
    if (!isPngImage(uri)) {
      Toast.show({
        type: 'warning',
        text1: 'Formato inválido',
        text2: 'Apenas imagens PNG são permitidas.',
      });
      return null;
    }

    let localUri = uri;

    if (uri.startsWith('http')) {
      localUri = await downloadPngImage(uri);
    }

    const base64 = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro na conversão',
      text2: error.message || 'Erro inesperado.',
    });
    return null;
  }
};

// Faz o download de uma imagem PNG de uma URL
const downloadPngImage = async (uri) => {
  try {
    if (!isPngImage(uri)) {
      Toast.show({
        type: 'warning',
        text1: 'Download negado',
        text2: 'Apenas imagens PNG são permitidas para download.',
      });
      return null;
    }

    const fileUri = FileSystem.documentDirectory + 'image_temp.png';
    const downloadResumable = FileSystem.createDownloadResumable(uri, fileUri);
    const { uri: localUri } = await downloadResumable.downloadAsync();

    return localUri;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro no download',
      text2: error.message || 'Erro inesperado.',
    });
    return null;
  }
};

// Verifica se a URI representa uma imagem PNG
const isPngImage = (uri) => {
  return uri.toLowerCase().includes('.png');
};

// Converte base64 para objeto utilizável em <Image>
const deconvertBase64ToImage = (base64) => {
  return { uri: base64 };
};

export { convertImageToBase64, deconvertBase64ToImage };
