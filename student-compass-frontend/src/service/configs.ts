
const productionUrl= 'https://student-compass-backend.herokuapp.com';
const developmentUrl= 'http://localhost:4000';

const baseUrl=(process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl);
export default baseUrl