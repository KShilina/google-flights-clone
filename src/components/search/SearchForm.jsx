import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchForm = ({ onSearch }) => {
  const [originSkyId, setOriginSkyId] = useState('');
  const [destinationSkyId, setDestinationSkyId] = useState('');
  const [fromDate, setFromDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originSkyId || !destinationSkyId || !fromDate) {
      alert('Please fill out all fields.');
      return;
    }
    
    onSearch({ originSkyId, destinationSkyId, fromDate });
  };



  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="from"
            fullWidth
            value={originSkyId}
            onChange={(e) => setOriginSkyId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="to"
            fullWidth
            value={destinationSkyId}
            onChange={(e) => setDestinationSkyId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="From Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
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
