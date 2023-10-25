import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, { method: 'GET', headers: options?.headers, signal: options?.signal });
  }

  post(path, options) {
    return this.makeRequest(path, { method: 'POST', body: options?.body, headers: options?.headers });
  }

  put(path, options) {
    return this.makeRequest(path, { method: 'PUT', body: options?.body, headers: options?.headers });
  }

  delete(path, options) {
    return this.makeRequest(path, { method: 'DELETE', headers: options?.headers });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }
    if (options.headers) {
      //   Object.keys(options.headers).forEach((key) => {
      //     headers.append(key, options.headers[key]);
      //   });
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }
    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
      signal: options.signal,
    });

    const contentType = response.headers.get('Content-Type');
    let responseBody = null;
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
