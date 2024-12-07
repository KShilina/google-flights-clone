// import React, { useState } from 'react';
// import { Container, Typography, Button, Grid } from '@mui/material';
// import SearchForm from './components/search/SearchForm';
// import FlightsList from './components/flights/FlightsList';
// import { getPriceCalendar } from './api/skyScrapper';

// const App = () => {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch flights based on search parameters
//   const handleSearch = async (searchParams) => {
//     setLoading(true);
//     try {
//       const data = await getPriceCalendar(searchParams);
//       setFlights(data);
//     } catch (error) {
//       console.error('Error fetching flights:', error);
//       alert('Failed to fetch flights. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter flights by maximum price
//   const filterByPrice = (maxPrice) => {
//     const filteredFlights = flights.filter((flight) => flight.price <= maxPrice);
//     setFlights(filteredFlights);
//   };

//   // Sort flights by price in ascending order
//   const sortByPrice = () => {
//     const sortedFlights = [...flights].sort((a, b) => a.price - b.price);
//     setFlights(sortedFlights);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Flight Search
//       </Typography>

//       {/* Search Form */}
//       <SearchForm onSearch={handleSearch} />

//       {/* Filter and Sort Buttons */}
//       <Grid container justifyContent="center" spacing={2} style={{ margin: '20px 0' }}>
//         <Grid item>
//           <Button variant="outlined" color="primary" onClick={() => filterByPrice(200)}>
//             Filter by Price &lt; $200
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant="outlined" color="secondary" onClick={sortByPrice}>
//             Sort by Price
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Loading State or Flights List */}
//       {loading ? (
//         <Typography variant="h6" align="center">
//           Loading...
//         </Typography>
//       ) : (
//         <FlightsList flights={flights} />
//       )}
//     </Container>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import SearchForm from './components/search/SearchForm';
import FlightsList from './components/flights/FlightsList';
import { getPriceCalendar } from './api/skyScrapper';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch flights based on search parameters
  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const data = await getPriceCalendar(searchParams);

      // Safely process API response
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format from API');
      }

      const filteredFlights = data.filter((flight) => {
        if (!flight.date) {
          console.warn('Missing date:', flight);
          return false;
        }
        return flight.date === searchParams.fromDate; // Compare with the provided date
      });

      setFlights(filteredFlights);
    } catch (error) {
      console.error('Error in handleSearch:', error);
      alert('An error occurred while fetching flights.');
    } finally {
      setLoading(false);
    }
  };

  // Filter flights by maximum price
  const filterByPrice = (maxPrice) => {
    const filteredFlights = flights.filter((flight) => flight.price <= maxPrice);
    setFlights(filteredFlights);
  };

  // Sort flights by price in ascending order
  const sortByPrice = () => {
    const sortedFlights = [...flights].sort((a, b) => a.price - b.price);
    setFlights(sortedFlights);
  };

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
      <SearchForm onSearch={handleSearch} />

      {/* Filter and Sort Buttons */}
      <Grid container justifyContent="center" spacing={2} style={{ margin: '20px 0' }}>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={() => filterByPrice(200)}>
            Filter by Price &lt; $400
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={sortByPrice}>
            Sort by Price
          </Button>
        </Grid>
      </Grid>

      {/* Loading State or Flights List */}
      {loading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <FlightsList flights={flights} />
      )}
    </Container>
  );
};

export default App;
