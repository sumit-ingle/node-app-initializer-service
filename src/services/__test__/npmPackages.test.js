const axios = require('axios');

const npmRegistryUrl = 'https://registry.npmjs.org/';
axios.get(`${npmRegistryUrl}\\jest`).then(res => console.log(res))
