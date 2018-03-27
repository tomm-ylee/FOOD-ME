const DOMAIN = 'http://localhost:9000';

function getJWT() {
  return localStorage.getItem('jwt');
}

const Recipe = {
  all () {
    return fetch(
      `${DOMAIN}/recipes`,
      {
        // headers: {
        //   'Authorization': getJWT()
        // }
      }
    )
      .then(res => res.json());
  },
  one (id) {
    return fetch(
      `${DOMAIN}/recipes/${id}`,
      {
        // headers: {
        //   'Authorization': getJWT()
        // }
      }
    )
      .then(res => res.json());
  },
  create (params) {
    return fetch(
      `${DOMAIN}/recipes`,
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
  }
}

const User = {
  all() {
    return fetch(
      `${DOMAIN}/users`
    ).then(res => res.json())
  }
}

const Token = {
  create (params) {
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

export { Recipe, User, Token };
