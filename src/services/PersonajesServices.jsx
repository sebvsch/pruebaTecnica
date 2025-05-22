import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = "2a7b6a5e8a51fdc877e2645b345096fe"
const PRIVATE_KEY = "688806fc07e4db052330087acfdb5a3851868cf6";

const generateAuthParams = () => {
    const timestamp = Date.now();
    const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);
    return {
        ts: timestamp,
        apikey: PUBLIC_KEY,
        hash: hash
    };
};

export const getPersonajes = async (limit = 20) => {
    try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
            params: {
                ...authParams,
                limit: limit
            }
        });
        return response.data.data.results;
    } catch (error) {
        console.error('Error fetching Marvel characters', error);
        throw error;
    }
}