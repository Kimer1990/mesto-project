const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-10',
  headers: {
    authorization: '5e2cb3f4-6b9a-4036-8130-d1685fe9cd93',
    'Content-Type': 'application/json'
  }
}

export const request = (link, metod, body) => {
  return fetch(`${config.baseUrl}/${link}`, {method: metod, headers: config.headers, body: body})
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}
