import React, { useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import SearchForm from './components/search/SearchForm';
import FlightsList from './components/flights/FlightsList';
import { getPriceCalendar } from './api/skyScrapper';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch flights based on search parameters
  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const data = await getPriceCalendar(searchParams);

      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format from API');
      }

      // Filter flights for the departure date
      const filteredFlights = data.filter((flight) => flight.date === searchParams.fromDate);
      setFlights(filteredFlights);

      // If returnDate is provided, filter flights for the return date
      if (searchParams.returnDate) {
        const filteredReturnFlights = data.filter((flight) => flight.date === searchParams.returnDate);
        setReturnFlights(filteredReturnFlights);
      } else {
        setReturnFlights([]); // Clear return flights if no return date is provided
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
      alert('An error occurred while fetching flights.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Banner */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="images/plane1.png"
          alt="Flight Search Banner"
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Flight Search
      </Typography>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Loading State */}
      {loading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          {/* Flights for Departure Date */}
          {flights.length > 0 && (
            <Box sx={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#1976d2',
                  marginBottom: '10px',
                  textDecoration: 'underline',
                }}
              >
                Flights on {flights[0]?.date}:
              </Typography>
              <FlightsList flights={flights} />
            </Box>
          )}

          {/* Flights for Return Date */}
          {returnFlights.length > 0 && (
            <Box sx={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#d32f2f',
                  marginBottom: '10px',
                  textDecoration: 'underline',
                }}
              >
                Return Flights on {returnFlights[0]?.date}:
              </Typography>
              <FlightsList flights={returnFlights} />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default App;

