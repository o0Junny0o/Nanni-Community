import * as ImagePicker from 'expo-image-picker';
import { convertImageToBase64 } from '../../../utils/Base64Image'

export default async function anexoPicker() {
  try {
    let anexo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!anexo.canceled) {
      const img = anexo.assets[0];
      const name = img.fileName;
      const uri = await convertImageToBase64(img.uri);
      const aspectRatio = (img.width/img.height)

      return [
        {
          name,
          uri,
          aspectRatio,
        },
      ];
    }
  } catch (err) {
    alert('Erro ao tentar anexar imagem');
    console.error(err);
    return;
  }
}
