const prodUrl = "https://ecommwebonnext.netlify.app/";
const baseUrl = process.env.NODE_ENV === 'production' ?   prodUrl : 'http://localhost:3000'
export default baseUrl