import * as ImagePicker from 'expo-image-picker';

export default async function anexoPicker() {
  try {
    let anexo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!anexo.canceled) {
      const k = anexo.assets[0].fileName;
      const v = anexo.assets[0].uri;

      return [
        {
          name: k,
          uri: v,
        }
      ]
    }
  } catch (err) {
    alert('Erro ao tentar anexar imagem');
    console.error(err);
    return;
  }
}