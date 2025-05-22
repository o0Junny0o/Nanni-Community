import fetchAPI from './giphy/fetchAPI';

export default class IAPIServices {
  constructor(apiKey, url) {
    if (!apiKey || !url) {
      throw new Error('Classe de [APIService] precisa de uma apiKey');
    }

    this.apiKey = apiKey;
    this.url = url;
  }

  getLogo() {
    throw new Error('Método [getLogo] não foi implementado.');
  }

  getSearchPlaceholder() {
    return 'Gatos de Chapéu';
  }

  getByID(id) {
    throw new Error('Método [getByID] não foi implementado.');
  }

  search({ q, limit = 6, pos = 0 }) {
    throw new Error('Método [search] não foi implementado.');
  }

  fetch(uri) {
    const req = `${this.url}${uri}&${this.apiKey}`;
    return fetchAPI(req);
  }

  toSource(data, type) {
    throw new Error('Método [getSource] não foi implementado');
  }

  toSourceSingular(data, type) {
    throw new Error('Método [getSource] não foi implementado');
  }

  openResp(data) {
    throw new Error('Método [openResp] não foi implementado');
  }
}
