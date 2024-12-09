import React, { useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import SearchForm from './components/search/SearchForm';
import FlightsList from './components/flights/FlightsList';
import { getPriceCalendar } from './api/skyScrapper';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false); // State to trigger form reset

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

      // If returnDate is provided, filter flights for the return date
      let filteredReturnFlights = [];
      if (searchParams.returnDate) {
        filteredReturnFlights = data.filter((flight) => flight.date === searchParams.returnDate);
      }

      setFlights(filteredFlights);
      setReturnFlights(filteredReturnFlights);
    } catch (error) {
      console.error('Error in handleSearch:', error);
      alert('An error occurred while fetching flights.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh button logic
  const handleRefresh = () => {
    setFlights([]);
    setReturnFlights([]);
    setResetForm(true); // Trigger form reset
    setTimeout(() => setResetForm(false), 0); // Reset the trigger back
  };

  const hasResults = flights.length > 0 || returnFlights.length > 0;

  return (
    <Container>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="images/plane1.png"
          alt="Flight Search Banner"
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>
      <Typography variant="h4" align="center" gutterBottom>
        Flight Search
      </Typography>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} reset={resetForm} />

      {/* Conditional Refresh Button */}
      {hasResults && (
        <Grid container justifyContent="center" style={{ margin: '20px 0' }}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRefresh}
              disabled={loading}
            >
              New Search
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Loading State */}
      {loading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          {/* Flights for Departure Date */}
          {flights.length > 0 && (
            <>
              <Typography variant="h5" align="center" gutterBottom>
                Flights on {flights[0]?.date}:
              </Typography>
              <FlightsList flights={flights} />
            </>
          )}

          {/* Flights for Return Date */}
          {returnFlights.length > 0 && (
            <>
              <Typography variant="h5" align="center" gutterBottom>
                Return Flights on {returnFlights[0]?.date}:
              </Typography>
              <FlightsList flights={returnFlights} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
