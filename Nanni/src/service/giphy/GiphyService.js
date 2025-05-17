import IAPIServices from '../IAPIServices';
import { giphy } from '../firebase/conexao';

export default class GiphyService extends IAPIServices {
  constructor() {
    super(`api_key=${giphy}`, "https://api.giphy.com/v1/gifs/")

    this.rating = 'g';
    this.extra_uri = `&rating=${this.rating}`;    
  }

  getByID({ idGif }) {
    const uri = `${idGif}?${this.apiKey}${this.extra_uri}`;
    return this.fetch(uri)?.data
  }

  getSearch({ q, limit, offset }) {
    const uri = `search?${this.apiKey}&q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}&bundle=messaging_non_clips${this.extra_uri}`;
    return this.fetch(uri)?.data
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


  getLogo() {
    return require('../../assets/giphy/PoweredBy_200px-Black_HorizText.png')
  }

  getSource(data) {
    return data.images.original.webp
  }
}
