import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const FlightsList = ({ flights }) => {
  if (flights.length === 0) {
    return <Typography variant="h6" align="center">No flights found.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {flights.map((flight, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">Flight Date: {flight.date}</Typography>
              <Typography>Price: {flight.currency} {flight.price}</Typography>
              <Typography>Group: {flight.group}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};


export default FlightsList;



