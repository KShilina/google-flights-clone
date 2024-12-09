import axios from 'axios';

const API_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1';
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
console.log('API Key:', process.env.REACT_APP_RAPIDAPI_KEY); // Debug

export const getPriceCalendar = async ({ originSkyId, destinationSkyId, fromDate, currency = 'USD' }) => {
  const options = {
    method: 'GET',
    url: `${API_URL}/flights/getPriceCalendar`,
    params: {
      originSkyId,
      destinationSkyId,
      fromDate,
      currency,
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Full API Response:", response.data);

    if (response.data?.data?.flights?.days) {
      const days = response.data.data.flights.days;
      return days.map(day => ({
        price: day.price,
        date: day.day,
        group: day.group || 'N/A',
        currency: response.data.data.flights.currency,
        type: fromDate === day.day ? 'departure' : 'return',
      }));
      
    }
    return [];
  } catch (error) {
    console.error('Error fetching flight price calendar:', error);
    throw error;
  }
};
