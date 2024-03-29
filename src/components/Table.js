import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { contactArrayState, resetTableSortState } from '../recoil';
import ContactForm from './ContactForm';
import DeleteConfirm from './DeleteConfirm';

const subHeaderCells = [
  {
    id: 'firstName',
    label: 'First'
  },
  {
    id: 'lastName',
    label: 'Last'
  },
  {
    id: 'street',
    label: 'Street'
  },
  {
    id: 'city',
    label: 'City'
  },
  {
    id: 'state',
    label: 'State'
  },
  {
    id: 'zip',
    label: 'Zip'
  },
];

const tableRowStyle = {
  '&:last-child td, &:last-child th': { border: 0 }, 
  '&:nth-of-type(odd)': { backgroundColor: '#eeeeee'}
}

const deleteModalStyle = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '100%', sm: 450},
  bgcolor: 'background.paper',
  border: '2px solid #e0e0e0',
  borderRadius: '4px',
  boxShadow: 24,
  padding: 2
};

const editModalStyle = {
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

export default function TableComponent() {
  const [contactArray, setContactArray] = useRecoilState(contactArrayState);
  const [resetTableSort, setResetTableSort] = useRecoilState(resetTableSortState);
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(true);
  const [modifyId, setModifyId] = useState('');

  useEffect(() => {
    if (resetTableSort) {
      setOrderBy('');
      setResetTableSort(false);
    }
  }, [resetTableSort, setResetTableSort]);

  const handleSortClick = (property) => {
    const isAsc = orderBy === property && order === 'asc' ? false : true;
    let sortedTableData = [...contactArray];

    // sort street by numerical address
    sortedTableData.sort((a, b) => {
      const propertyA = property === 'street' ? parseInt(a[property].split(' ')[0]) : a[property];
      const propertyB = property === 'street' ? parseInt(b[property].split(' ')[0]) : b[property];

      if(isAsc) {
        if (propertyA < propertyB) {
          return -1;
        }
        if (propertyA > propertyB) {
          return 1;
        }
        return 0;
      } else {
        // descending
        if (propertyB < propertyA) {
          return -1;
        }
        if (propertyB > propertyA) {
          return 1;
        }
        return 0;
      }
    });

    setContactArray(sortedTableData);
    setOrder(isAsc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeModal = () => {
    setModifyId('');
    setOpenModal(false);
  }

  const handleDeleteClick = (id) => {
    setModifyId(id);
    setIsModalDelete(true);
    setOpenModal(true);
  }

  const handleEditClick = (id) => {
    setModifyId(id);
    setIsModalDelete(false);
    setOpenModal(true);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="contact-table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">Name</TableCell>
              <TableCell colSpan={4} align="center">Address</TableCell>
              <TableCell 
                key="phone"
                rowSpan={2}
                align="center"
                style={{ minWidth: 140 }}
                sortDirection={orderBy === "phone" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : 'asc'}
                  onClick={e => handleSortClick("phone")}
                >
                  Phone
                </TableSortLabel>
              </TableCell>
              <TableCell 
                key="email"
                rowSpan={2}
                align="center"
                sortDirection={orderBy === "email" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : 'asc'}
                  onClick={e => handleSortClick("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell rowSpan={2} align="center">Actions</TableCell>
            </TableRow>
            <TableRow>
              {subHeaderCells.map( subHeader => (
                  <TableCell
                    key={subHeader.id}
                    align="center"
                    sortDirection={orderBy === subHeader.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === subHeader.id}
                      direction={orderBy === subHeader.id ? order : 'asc'}
                      onClick={e => handleSortClick(subHeader.id)}
                    >
                      {subHeader.label}
                    </TableSortLabel>
                  </TableCell>
              ))}
            </TableRow>
        </TableHead>
          <TableBody>
            {contactArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  aria-label={"table-row" + index}
                  key={index}
                  sx={tableRowStyle}
                >
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.street}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">{row.state}</TableCell>
                  <TableCell align="center">{row.zip}</TableCell>
                  <TableCell align="center">{'(' + row.phone.replace('-', ') ')}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row">
                      <IconButton aria-label={'edit-row' + index} onClick={() => handleEditClick(row.id)}>
                        <EditIcon color='success'/>
                      </IconButton>
                      <IconButton aria-label={'delete-row' + index} onClick={() => handleDeleteClick(row.id)}>
                        <DeleteIcon color='error'/>
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <TablePagination
          aria-label="table-pagination"
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={contactArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Modal
        open={openModal}
        onClose={() => closeModal()}
        closeAfterTransition
      >
        <Fade in={openModal}>
          {isModalDelete ?
            <Box sx={deleteModalStyle}>
              <DeleteConfirm
                closeModal={()=> closeModal()}
                modifyId={modifyId}
                tableData={contactArray}
              />
            </Box> : 
            <Box sx={editModalStyle}>
              <ContactForm
                closeModal={()=> closeModal()}
                isEdit={true}
                modifyId={modifyId}
                tableData={contactArray}
              />
            </Box>}
        </Fade>
      </Modal>
    </>
  );
}
