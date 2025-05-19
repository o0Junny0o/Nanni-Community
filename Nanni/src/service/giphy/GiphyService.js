import IAPIServices from '../IAPIServices';
import { giphy } from '../firebase/conexao';

export default class GiphyService extends IAPIServices {
  constructor() {
    super(`api_key=${giphy}`, "https://api.giphy.com/v1/gifs/")

    this.rating = 'g';
    this.extra_uri = `rating=${this.rating}`;    
  }


  setRating({ rating = 'g' }) {
    if(this.rating === rating) {
      return;
    }

    if (['g', 'pg', 'pg-13', 'r'].indexOf(rating) !== -1) {
      this.rating = rating;
      this.setExtraURI();
    }
  }

  setExtraURI() {
    this.extra_uri = `&rating=${this.rating}`;
  }

  getByID(id) {
    const uri = `${id}?${this.extra_uri}`;
    return this.fetch(uri)
  }

  search({ q, limit = 6, pos = 0 }) {
    const uri = `search?q=${encodeURIComponent(q)}&limit=${limit}&bundle=messaging_non_clips&offset=${pos}&${this.extra_uri}`;
    return this.fetch(uri)
  }

  getLogo() {
    return require('../../assets/giphy/PoweredBy_200px-Black_HorizText.png')
  }

  toSource(data, type = "webp") {
    const media = data.images.original
    const id = data.id
    if(!media && !id) return;

    return { id, uri: media[type] }
  }

  toSourceSingular(data, type = "webp") {
    const item = this.openResp(data);
    if(item) {
      return this.toSource(item, type)
    }
  }

  openResp(data) {
    return data?.data
  }
}
