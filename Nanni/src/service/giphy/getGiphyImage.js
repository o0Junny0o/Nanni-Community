import { fetch } from 'expo/fetch';
import { giphy } from '../firebase/conexao';

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/';

async function getGiphy({ uri }) {
  if (!uri || typeof uri !== 'string' || uri.trim() === '') return;
  if (!giphy || typeof giphy !== 'string') {
    console.error(`Chave de API GIPHY inválida : ${typeof giphy}`);
    return;
  }

  const reference = `${GIPHY_URL}${uri.replace('[*]', giphy)}`;
  try {
    const resp = await fetch(reference, {
      headers: { Accept: 'application/json' },
    });

    if (!resp.ok) {
      throw new Error('Erro ao executar fetch() em getGiphy()');
    }

    const data = await resp.json();

    if (!Array.isArray(data.data)) {
      return [data.data];
    }

    return data.data;
  } catch (err) {
    console.error('ERROR in getGiphy : ' + err);
    return [];
  }
}

export default getGiphy;
