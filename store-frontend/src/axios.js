import axios from 'axios';

const GetToken = () => {
  const store = JSON.parse(localStorage.getItem('store'))
  if(store) {
    return store.token;
  }
  
  return null
}

const axiosClient = axios.create({
  baseURL: `http://localhost:4000/api`
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${GetToken()}`
  return config
})

export default axiosClient
