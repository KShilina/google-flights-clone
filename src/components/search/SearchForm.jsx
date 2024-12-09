import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchForm = ({ onSearch, reset }) => {
  const [originSkyId, setOriginSkyId] = useState('');
  const [destinationSkyId, setDestinationSkyId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

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
    if (!originSkyId || !destinationSkyId || !fromDate) {
      alert('Please fill out all fields.');
      return;
    }

    onSearch({ originSkyId, destinationSkyId, fromDate, returnDate });
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
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="To"
            fullWidth
            value={destinationSkyId}
            onChange={(e) => setDestinationSkyId(e.target.value)}
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
