// import React from 'react';
// import { Card, CardContent, Typography, Grid } from '@mui/material';

// const FlightsList = ({ flights }) => {
//   if (flights.length === 0) {
//     return <Typography variant="h6" align="center">No flights found.</Typography>;
//   }

//   return (
//     <Grid container spacing={3} justifyContent="center" alignItems="center">
//       {flights.map((flight, index) => (
//         <Grid  item xs={12} sm={6} md={4} key={index}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Flight Date: {flight.date}</Typography>
//               <Typography variant="h6">Price: {flight.currency} {flight.price}</Typography>
//               <Typography variant="h6">Price Group: {flight.group}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };


// export default FlightsList;

// import React from 'react';
// import { Card, CardContent, Typography, Grid } from '@mui/material';

// const FlightsList = ({ flights }) => {
//   if (flights.length === 0) {
//     return <Typography variant="h6" align="center">No flights found.</Typography>;
//   }

//   return (
//     <Grid container spacing={3} justifyContent="center" alignItems="center">
//       {flights.map((flight, index) => (
//   <Grid item xs={12} sm={6} md={4} key={index}>
//     <Card>
//       <CardContent>
//         <Typography variant="h6">
//           {flight.type === 'return' ? 'Return Flight' : 'Departure Flight'}
//         </Typography>
//         <Typography variant="h6">Flight Date: {flight.date}</Typography>
//         <Typography variant="h6">Price: {flight.currency} {flight.price}</Typography>
//         <Typography variant="h6">Price Group: {flight.group}</Typography>
//       </CardContent>
//     </Card>
//   </Grid>
// ))}

//     </Grid>
//   );
// };


// export default FlightsList;


import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const FlightsList = ({ flights }) => {
  if (flights.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No flights found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      {flights.map((flight, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: flight.type === 'return' ? '#f5f5f5' : '#e3f2fd',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  textAlign: 'center',
                  marginBottom: 2,
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: flight.type === 'return' ? '#efebe9' : '#bbdefb',
                  color: flight.type === 'return' ? '#6d4c41' : '#0d47a1',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {flight.type === 'return' ? 'Return Flight' : 'Departure Flight'}
                </Typography>
              </Box>

              <Typography variant="body1" gutterBottom>
                <strong>Flight Date:</strong> {flight.date}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> {flight.currency} {flight.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price Group:</strong> {flight.group}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FlightsList;







