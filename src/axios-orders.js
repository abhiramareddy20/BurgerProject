import axios from 'axios';

const instance =axios.create ({
    baseURL: 'https://react-my-burger-c6368.firebaseio.com/'
});

export default instance;