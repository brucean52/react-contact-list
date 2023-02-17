import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import ContactForm from './ContactForm';

const modalStyle = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '100%', sm: 600},
  bgcolor: 'background.paper',
  border: '2px solid #e0e0e0',
  borderRadius: '4px',
  boxShadow: 24,
  padding: 2
};

export default function ModalComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" endIcon={<PersonIcon />}>
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <ContactForm
              closeModal={handleClose}
              isEdit={false}
              modifyId={""}
              tableData={[]}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  )
}