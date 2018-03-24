const DOMAIN = 'http://localhost:9000';

const User = {
  all() {
    return fetch(
      `${DOMAIN}/users`
    ).then(res => res.json())
  }
}

export { User };
