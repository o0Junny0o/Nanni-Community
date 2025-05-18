import { fetch } from 'expo/fetch';


async function fetchAPI(req) {
  if(!req) {
    console.error("Requisição indefinida")
    return;
  }

  try {
    const resp = await fetch(req, {
      headers: { Accept: 'application/json' },
    });

    if (!resp.ok) {
      throw new Error('Erro ao executar fetch() em getGiphy()');
    }

    const data = await resp.json();
    
    return data;
  } catch (err) {
    console.error('ERROR in getGiphy : ' + err);
    return [];
  }
}

export default fetchAPI;
