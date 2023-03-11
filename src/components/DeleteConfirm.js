import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { AppContext } from '../AppContext'; 

export default function DeleteConfirmComponent(props) {
  const { deleteContact } = useContext(AppContext);
  const [deleteName, setDeleteName] = useState('');

  useEffect(() => {
    if (props.modifyId) {
      const deleteIndex = props.tableData.findIndex( contact => contact.id === props.modifyId)
      const deleteContactObject = props.tableData[deleteIndex];
      setDeleteName(deleteContactObject.firstName + ' ' + deleteContactObject.lastName);
    }
  }, [props.modifyId, props.tableData])

  const handleDelete = () => {
    if (props.modifyId) {
      deleteContact(props.tableData, props.modifyId);
      props.closeModal();
    }
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Typography variant="h5">Delete Contact</Typography>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container justifyContent="center" >
        <Grid item xs={11} sx={{ marginTop: 3, marginBottom: 3}}>
          <Typography variant="p" aria-label="delete-message">Are you sure you want to delete {deleteName}?</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 1 }} />
      <Grid container justifyContent="flex-end">
        <Grid item xs={3}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained"  color="grey" onClick={() => props.closeModal()}>Cancel</Button>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained" color="error" onClick={() => handleDelete()}>Delete</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}