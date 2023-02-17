import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from './components/Table';
import Modal from './components/Modal';

function App() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2vh'}}>
      <Grid
        container
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{ marginBottom: '20px'}}
      >
        <Grid item xs={11}>
          <Typography variant="h3">My Contacts</Typography>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="flex-end">
            <Modal/>
          </Box>
        </Grid>
      </Grid>
      <Table/>
    </Container>
  );
}

export default App;
