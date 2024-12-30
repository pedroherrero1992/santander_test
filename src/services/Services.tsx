import axios from 'axios';
import rates from './rates.json'
import vehicles from './vehicles.json'
import { RatesI, Vehicles } from '@/auxiliar/interfaces';

const VEHICLES_API = 'https://ayh64y9vmf.execute-api.us-east-1.amazonaws.com/dev/vehicles';
const RATES_API = 'https://ayh64y9vmf.execute-api.us-east-1.amazonaws.com/dev/rates';
const API_KEY = 'EzXngq4zni1WRxdOUOo1E2DdXkOqAG6X7O4GXR9i';

//se puede agregar los archivos desde .env en caso de utilizarlo asi quedaria de la siguiente manera,

// const VEHICLES_API = process.env.REACT_APP_VEHICLES_API;
// const RATES_API = process.env.REACT_APP_RATES_API;
// const API_KEY = process.env.REACT_APP_API_KEY;

// lo que si tendriamos que agregar una validacion donde se utilizen las variables para que no de un error de TS 


const headers = {
  'X-API-Key': API_KEY,
};


//const isLocalhost = () => window.location.hostname === 'localhost';
const isLocalhost = () => true

// Función para obtener los vehículos
export const getVehicles = async (): Promise<Vehicles> => {
  try {
    if (isLocalhost()) {
      console.log('Fetching mock vehicles data...');
      return vehicles; // Cargar datos simulados desde el archivo JSON
    }
    const response = await axios.get(VEHICLES_API, { headers });
    return response.data; // Realiza la solicitud a la API real si no estamos en localhost
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

// Función para obtener las tasas
export const getRates = async (): Promise<RatesI> => {
  try {
    if (isLocalhost()) {
      console.log('Fetching mock rates data...');
      return rates; // Cargar datos simulados desde el archivo JSON
    }
    const response = await axios.get(RATES_API, { headers });
    return response.data; // Realiza la solicitud a la API real si no estamos en localhost
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
};