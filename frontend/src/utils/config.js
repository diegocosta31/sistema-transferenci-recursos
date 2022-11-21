export const api = "http://localhost:4000";

export const requestConfig = (method, data, token = null) => {
  let config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
