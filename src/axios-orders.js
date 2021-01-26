import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://shop-84327.firebaseio.com/'
});

export default instance;