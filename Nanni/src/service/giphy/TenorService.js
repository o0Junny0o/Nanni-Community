import { tenor } from '../firebase/conexao';
import IAPIServices from '../IAPIServices';

export default class TenorService extends IAPIServices {
  constructor() {
    super(`key=${tenor}`, 'https://g.tenor.com/v1/');

    this.uriExtras = 'locale=pt-BR&media_filter=webp';
  }

  getByID(id) {
    const uri = `gifs?ids=${id}`;
    return this.fetch(uri);
  }

  search({ q, limit = 6, pos = 0 }) {
    const uri = `search?q=${encodeURIComponent(q)}&limit=${limit}&pos=${pos}`;
    return this.fetch(uri);
  }

  toSource(data, type = 'webp') {
    const media = data?.media?.[0];
    if (data?.id && media && media[type]?.url) {
      return { id: data.id, uri: media[type].url };
    }

    return;
  }

  toSourceSingular(data, type = 'webp') {
    const item = this.openResp(data);
    if (item) {
      return this.toSource(item[0], type);
    }
    return;
  }

  getSearchPlaceholder() {
    return 'Search Tenor';
  }

  getLogo() {
    return require('../../assets/tenor/PB_tenor_logo_white_horizontal.png');
  }

  openResp(data) {
    return data?.results;
  }
}
