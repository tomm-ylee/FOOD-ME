const DOMAIN = 'http://localhost:9000';

// function getJWT() {
//   return localStorage.getItem('jwt');
// }

const Ingredient = {
  all() {
    return fetch(
      `${DOMAIN}/ingredients`, {}
    )
      .then(res => res.json())
  }
}
const Ownage = {
  all(user_id) {
    return fetch(
      `${DOMAIN}/users/${user_id}/ownages`,
      {
        // headers: { 'Authorization': getJWT() }
      }
    )
      .then(res => res.json())
  },
  create(params, user_id) {
    return fetch(
      `${DOMAIN}/users/${user_id}/ownages`,
      {
        headers: {
          // 'Authorization': getJWT(),
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  },
  destroy(user_id, id) {
    return fetch(
      `${DOMAIN}/users/${user_id}/ownages/${id}`,
      {
        method: 'DELETE',
      }
    )
      .then(res => res.json())
  }
}

const Recipe = {
  all(user_id, page) {
    return fetch(
      `${DOMAIN}/recipes/${user_id}/${page}`,
      { }
    )
      .then(res => res.json())
  },
  one(id) {
    return fetch(
      `${DOMAIN}/recipes/${id}`,
      {}
    )
      .then(res => res.json());
  },
  search(searchPhrase, page, diet) {
    return fetch(
      `${DOMAIN}/recipes/search/${searchPhrase}/${page}/${diet}`,
      {}
    )
      .then(res => res.json())
  }
}

const User = {
  all() {
    return fetch(
      `${DOMAIN}/users`
    ).then(res => res.json())
  },
  one(id) {
    return fetch(
      `${DOMAIN}/users/${id}`,
      {}
    )
      .then(res => res.json())
  },
  create(params) {
    return fetch(
      `${DOMAIN}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(res => res.json())
  },
  update(params, id) {
    return fetch(
      `${DOMAIN}/users/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(res => res.json())
  }
}

const Token = {
  create(params) {
    return fetch(
      `${DOMAIN}/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(res => res.json())
  }
}


export { Recipe, User, Token, Ingredient, Ownage };
