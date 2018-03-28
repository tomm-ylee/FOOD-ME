FOOD2FOOK_DOMAIN = "http://food2fork.com/api/"
API_KEY = a6c0a0d863187bd15f40a0f7ecf370b0;

const Recipe = {
  search() {
    return fetch(
      `${FOOD2FOOK_DOMAIN}/search?key=${API_KEY}&q=chicken`,
      {
        // headers: {
        //   'Authorization': getJWT()
        // }
      }
    )
      .then(res => res.json());
  },
  get(id) {
    return fetch(
      `${DOMAIN}/get/${id}`,
      {
        // headers: {
        //   'Authorization': getJWT()
        // }
      }
    )
      .then(res => res.json());
  },

  export { Recipe }
