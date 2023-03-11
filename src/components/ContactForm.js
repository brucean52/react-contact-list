import React, { useState, useContext, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { IMaskInput } from 'react-imask';
import { AppContext } from '../AppContext'; 
import { statesDropdown } from '../util';

const REGEX_NAME = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
const REGEX_CITY = /^[a-zA-Z]+[a-zA-Z',.\s-]{1,25}$/;
// numbers followed by street name only
const REGEX_STREET = /^\d{0,5} [a-zA-Z',.\s-]{1,25}$/;
const REGEX_ZIP = /^\d{5}(-\d{4})?$/;
const REGEX_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const PhoneMaskCustom = React.forwardRef(function PhoneMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function ContactFormComponent(props) {
  const { addContact, editContact } = useContext(AppContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [zipError, setZipError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (props.isEdit && props.modifyId) {
      const editIndex = props.tableData.findIndex( contact => contact.id === props.modifyId)
      const editContactObject = props.tableData[editIndex];
      setFirstName(editContactObject.firstName);
      setLastName(editContactObject.lastName);
      setStreet(editContactObject.street);
      setCity(editContactObject.city);
      setState(editContactObject.state);
      setZip(editContactObject.zip);
      setPhone(editContactObject.phone);
      setEmail(editContactObject.email);
    } else {
      setFirstName('');
      setLastName('');
      setStreet('');
      setCity('');
      setState('');
      setZip('');
      setPhone('');
      setEmail('');
    }

  },[props.isEdit, props.tableData, props.modifyId])

  const validateFirstName = () => {
    if (!REGEX_NAME.test(firstName)) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
  }

  const validateLastName = () => {
    if (!REGEX_NAME.test(lastName)) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
  }

  const validateStreet = () => {
    if (!REGEX_STREET.test(street)) {
      setStreetError(true);
    } else {
      setStreetError(false);
    }
  }

  const validateCity = () => {
    if (!REGEX_CITY.test(city)) {
      setCityError(true);
    } else {
      setCityError(false);
    }
  }

  const validateZip = () => {
    if (!REGEX_ZIP.test(zip)) {
      setZipError(true);
    } else {
      setZipError(false);
    }
  }

  const validatePhone = () => {
    if (phone.length < 14) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }

  const validateEmail = () => {
    if (!REGEX_EMAIL.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  const handleSubmit = () => {
    const validFirstName = !firstNameError && firstName !== '';
    const validLastName = !lastNameError && lastName !== '';
    const validStreet = !streetError && street !== '';
    const validCity = !cityError && city !== '';
    const validZip = !zipError && zip !== '';
    const validPhone = !phoneError && phone !== '';
    const validateEmail = !emailError && email !== '';
    const noError = validFirstName && validLastName && validStreet && validCity && state !== '' && validZip && validPhone && validateEmail;

    if (firstName === '') {
      setFirstNameError(true);
    }
    if (lastName === '') {
      setLastNameError(true);
    }
    if (street === '') {
      setStreetError(true);
    }
    if (city === '') {
      setCityError(true);
    }
    if (state === '') {
      setStateError(true);
    } else {
      setStateError(false)
    }
    if (zip === '') {
      setZipError(true);
    }
    if (phone === '') {
      setPhoneError(true);
    }
    if (email === '') {
      setEmailError(true);
    }

    if (noError) {
      //capitalizing is done to ensure table sorting works
      const capitalizeFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const capitalizeLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      const capitalizeCity = city.charAt(0).toUpperCase() + city.slice(1);
      const parsePhone = phone.replace('(', '').replace(')', '').replace(' ', '-');

      if (props.isEdit) {
        editContact(
          props.tableData,
          {
            id: props.modifyId,
            firstName: capitalizeFirstName,
            lastName: capitalizeLastName,
            street,
            city: capitalizeCity,
            state,
            zip,
            phone: parsePhone,
            email
          }
        );
      } else {
        addContact({
          id: uuidv4(),
          firstName: capitalizeFirstName,
          lastName: capitalizeLastName,
          street,
          city: capitalizeCity,
          state,
          zip,
          phone: parsePhone,
          email
        });
      }
      props.closeModal();
    }
  }

  return (
    <>
      <Grid container justifyContent="center" columns={{xs: 8, sm: 12}}>
        <Grid item xs={3}>
          <Typography variant="h5">{props.isEdit ? 'Edit' : 'Add' } Contact</Typography>
        </Grid>
      </Grid>
      <Divider sx={{marginBottom: 3}}/>
      <Box component="form" sx={{margin: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl>
              <TextField 
                id="first-name"
                label="First Name"
                aria-label="first-name-input"
                variant="standard"
                size="small"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                onBlur={() => validateFirstName()}
                error={firstNameError}
                helperText={firstNameError && "Please enter a valid first name"}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <TextField
                id="last-name"
                label="Last Name"
                aria-label="last-name-input"
                variant="standard"
                size="small"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                onBlur={() => validateLastName()}
                error={lastNameError}
                helperText={lastNameError && "Please enter a valid last name"}
              />
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField 
                id="street"
                label="Street"
                aria-label="street-input"
                variant="standard"
                size="small"
                value={street}
                onChange={e => setStreet(e.target.value)}
                onBlur={() => validateStreet()}
                error={streetError}
                helperText={streetError && "Please enter a valid street (numbers followed by street name)"}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl>
              <TextField 
                id="city"
                label="City"
                aria-label="city-input"
                variant="standard"
                size="small"
                value={city}
                onChange={e => setCity(e.target.value)}
                onBlur={() => validateCity()}
                error={cityError}
                helperText={cityError && "Please enter a valid city"}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="standard" sx={{width: 80}} error={stateError}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                id="state"
                aria-label="state-input"
                MenuProps={{style: {maxHeight: "400px"}}}
                value={state}
                onChange={e => setState(e.target.value)}
              >
                {statesDropdown.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {stateError && <FormHelperText>Select a State</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <TextField 
                id="zip"
                label="Zip"
                aria-label="zip-input"
                variant="standard"
                size="small"
                value={zip}
                onChange={e => setZip(e.target.value)}
                onBlur={() => validateZip()}
                error={zipError}
                helperText={zipError && "Please enter a 5 digit zip code"}
              />
              
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel
                id="phone"
                sx={{ "&.MuiInputLabel-root": {transform: "translate(0px, 16px) scale(1)"},
                  "&.MuiInputLabel-shrink": {transform: "translate(0px, -9px) scale(0.75)"}
                }}
              >
                Phone
              </InputLabel>
              <Input
                id="phone"
                aria-label="phone-input"
                variant="standard"
                size="small"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onBlur={() => validatePhone()}  
                error={phoneError}
                inputComponent={PhoneMaskCustom}
              />
              {phoneError && <FormHelperText error sx={{marginLeft: 0}}>Please enter a valid phone number</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField 
                id="email"
                label="Email"
                aria-label="email-input"
                variant="standard"
                size="small"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => validateEmail()}
                error={emailError}
                helperText={emailError && "Please enter a valid email"}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormHelperText sx={{ marginTop: 4 }}>*All fields are required</FormHelperText>
      </Box>
      <Divider sx={{ marginBottom: 1 }} />
      <Grid container justifyContent="flex-end" columns={{xs: 8, sm: 12}}>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained"  color="grey" onClick={() => props.closeModal()}>Cancel</Button>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained" onClick={() => handleSubmit()}>Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}