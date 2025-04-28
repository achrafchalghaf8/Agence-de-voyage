import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

export const signup = async (user) => {
  return await axios.post(`${API_URL}/register`, user);
};

export const signin = async (user) => {
  return await axios.post(`${API_URL}/login`, user);
};

export const logout = async () => {
  return await axios.post(`${API_URL}/logout`);
};

export const profile = async () => {
  return await axios.get(`${API_URL}/user-profile`);
};
axios.interceptors.request.use(

    config => {
    const token=localStorage.getItem("CC_Token");
    if (token) { console.log(localStorage.getItem("CC_Token"))
    config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
    },
    error => {
    Promise.reject(error)
    });
    
    //Response interceptor
    axios.interceptors.response.use((response) => {
    console.log(response)
    return response
    },
    function (error) {
    const originalRequest = error.config;
    console.log(error.response)
    if (error.response.status === 401 && !originalRequest._retry) {
    
    originalRequest._retry = true;
    return axios
    .post(axios.defaults.baseURL+'users/refreshToken/')
    .then(res => { console.log(res)
    if (res.status === 200) {
    // 1) put tokens to LocalStorage
    localStorage.setItem('CC_Token', res.data.access_token);
    
    // 2) Change Authorization header
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' +
    
    localStorage.getItem('CC_Token');
    
    // 3) return originalRequest object with Axios.
    return axios(originalRequest);
    }
    })
    }
    }
    
    );