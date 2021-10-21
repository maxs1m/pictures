import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
  headers: {
    "Authorization": "563492ad6f9170000100000114846f25a830412cba52a35816c606b0"
  }
})

export const picturesAPI = {
  getPictures():Promise<any> {
    // @ts-ignore
    return instance.get('curated?page=1&per_page=52').then(response => response.data.photos)
  }
}