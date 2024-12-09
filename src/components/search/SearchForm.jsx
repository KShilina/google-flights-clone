import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchForm = ({ onSearch, reset }) => {
  const [originSkyId, setOriginSkyId] = useState('');
  const [destinationSkyId, setDestinationSkyId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const isValidIATAFormat = (input) => /^[A-Z]{3}$/i.test(input);


  // Reset form fields when `reset` prop changes
  useEffect(() => {
    if (reset) {
      setOriginSkyId('');
      setDestinationSkyId('');
      setFromDate('');
      setReturnDate('');
    }
  }, [reset]);

   const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    // Check input format for IATA code (three letters)
    if (!isValidIATAFormat(originSkyId)) {
      setError('Please enter a valid IATA airport code for Origin (e.g., LAX, JFK).');
      return;
    }

    if (!isValidIATAFormat(destinationSkyId)) {
      setError('Please enter a valid IATA airport code for Destination (e.g., LAX, JFK).');
      return;
    }

    if (!fromDate) {
      setError('Please select a departure date.');
      return;
    }

    // Call the onSearch handler if validation passes
    onSearch({ originSkyId: originSkyId.toUpperCase(), destinationSkyId: destinationSkyId.toUpperCase(), fromDate, returnDate });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="From"
            fullWidth
            value={originSkyId}
            onChange={(e) => setOriginSkyId(e.target.value)}
            error={!!error && error.includes('Origin')}
            helperText={
              !!error && error.includes('Origin')
                ? error
                : 'Example: LAX, JFK, SFO'
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="To"
            fullWidth
            value={destinationSkyId}
            onChange={(e) => setDestinationSkyId(e.target.value)}
            error={!!error && error.includes('Destination')}
            helperText={
              !!error && error.includes('Destination')
                ? error
                : 'Example: LAX, JFK, SFO'
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Departure Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Return Date (Optional)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Search Flights
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
