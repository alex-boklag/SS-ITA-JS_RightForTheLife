import { BE_URL } from '../../rootConstants';

export class CUDService {
  static POST(url, data) {
    return fetch(`${BE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => {
        throw new Error(error);
      });
  }

  static PUT(url, data) {
    return fetch(`${BE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => {
        throw new Error(error);
      });
  }

  static DELETE(url) {
    return fetch(`${BE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    })
      .then(response => response)
      .catch(error => {
        throw new Error(error);
      });
  }
}
