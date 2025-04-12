import getGiphy from './getGiphyImage';

class GiphyService {
  rating;
  extra_uri;

  constructor() {
    this.rating = 'g';
    this.extra_uri = `&rating=${this.rating}`;
  }

  getByID({ idGif }) {
    const giphyReference = `${idGif}?api_key=[*]${this.extra_uri}`;
    return getGiphy({ uri: giphyReference });
  }

  getRandom() {
    const giphyReference = `random?api_key=[*]${this.extra_uri}`;
    return getGiphy({ uri: giphyReference });
  }

  getTrending({ limit = '4', offset = '0' }) {
    const giphyReference = `trending?api_key=[*]&offset=${offset}&bundle=messaging_non_clips&limit=${limit}${this.extra_uri}`;
    return getGiphy({ uri: giphyReference });
  }

  setRating({ rating = 'g' }) {
    if (['g', 'pg', 'pg-13', 'r'].indexOf(rating) !== -1) {
      this.rating = rating;
      this.setExtraURI();
    }
  }

  setExtraURI() {
    this.extra_uri = `&rating=${this.rating}&country_code=${this.country_code}`;
  }
}
