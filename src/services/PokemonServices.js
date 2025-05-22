import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemon = async () => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                limit: 300,
                offset: 0
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}