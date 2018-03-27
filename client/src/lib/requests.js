const DOMAIN = 'http://localhost:9000';

function getJWT() {
  return localStorage.getItem('jwt');
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

export { User, Token };
