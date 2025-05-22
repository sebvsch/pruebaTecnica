import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { createHash } from 'crypto';

const Personajes = () => {

    const PUBLIC_KEY = "2a7b6a5e8a51fdc877e2645b345096fe";
    const PRIVATE_KEY = "688806fc07e4db052330087acfdb5a3851868cf6";

    const generateAuthParams = () => {
        const timestamp = new Date().getTime().toString();
        const raw = `${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`;
        const hash = createHash('md5').update(raw).digest('base64');

        console.log("timestamp:", timestamp);
        console.log("hash (base64):", hash);

        return {
            ts: timestamp,
            apikey: PUBLIC_KEY,
            hash: hash
        };
    };

    const getPersonajes = async (limit = 10) => {
        try {
            const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
                params: {
                    ...generateAuthParams(),
                    limit: limit
                }
            });
            console.log("Personajes:", response.data.data.results);
        } catch (error) {
            console.error('Error fetching Marvel characters', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getPersonajes()
    }, []);

    return (
        <div>

        </div>
    );
};

export { Personajes };
