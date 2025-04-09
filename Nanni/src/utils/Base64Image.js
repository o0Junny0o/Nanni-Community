import * as FileSystem from 'expo-file-system';

// Função para converter imagem para Base64
const convertImageToBase64 = async (uri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
    return null;
  }
};

const deconvertBase64ToImage = (base64) => {
  return { uri: base64 };
};

export { convertImageToBase64, deconvertBase64ToImage };
