import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterBuildingMutation } from '../../api/buildingsApi';
import PageWrapper from '../pageWrapper/PageWrapper';
import './RegisterBuilding.scss';
import { useSnackbar } from '../SnackbarContext';

const RegisterBuilding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: '',
    street: '',
    buildingNumber: '',
    floorCount: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    city: '',
    street: '',
    buildingNumber: '',
    floorCount: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [registerBuilding] = useRegisterBuildingMutation();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let error = '';

    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if ((name === 'buildingNumber' || name === 'floorCount') && (!/^\d+$/.test(value) || parseInt(value, 10) <= 0)) {
      error = `Invalid ${name}`;
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const buildingData = {
      address: {
        city: formData.city,
        street: formData.street,
        buildingNumber: parseInt(formData.buildingNumber, 10),
      },
      floorCount: parseInt(formData.floorCount, 10),
    };

    try {
      await registerBuilding(buildingData).unwrap();
      setFormData({
        city: '',
        street: '',
        buildingNumber: '',
        floorCount: '',
      });
      navigate('/');
      showSnackbar('Building successfully registered!', 'success');
    } catch (error) {
      showSnackbar('Failed to register building', 'error');
    }
  };

  useEffect(() => {
    setIsFormValid(
      !Object.values(fieldErrors).some((error) => error) && Object.values(formData).every((value) => value.trim()),
    );
  }, [fieldErrors, formData]);

  return (
    <PageWrapper title="Register a new building">
      <form onSubmit={handleSubmit}>
        <div className="TextFieldFloorsContainer">
          <TextField
            id="floorCount"
            name="floorCount"
            label="Floors:"
            variant="standard"
            type="number"
            value={formData.floorCount}
            onChange={handleChange}
            inputProps={{ min: 1 }}
            error={!!fieldErrors.floorCount}
            helperText={fieldErrors.floorCount}
            required
          />
        </div>
        <div className="AddressContainer">
          <fieldset>
            <legend>Address</legend>
            <div className="FieldSetContainer">
              <div className="TextFieldContainer">
                <TextField
                  id="city"
                  name="city"
                  label="City:"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!fieldErrors.city}
                  helperText={fieldErrors.city}
                  required
                />
              </div>
              <div className="TextFieldContainer">
                <TextField
                  id="street"
                  name="street"
                  label="Street:"
                  value={formData.street}
                  onChange={handleChange}
                  error={!!fieldErrors.street}
                  helperText={fieldErrors.street}
                  required
                />
              </div>
              <div className="TextFieldContainer">
                <TextField
                  id="buildingNumber"
                  name="buildingNumber"
                  label="Building No:"
                  type="number"
                  value={formData.buildingNumber}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                  error={!!fieldErrors.buildingNumber}
                  helperText={fieldErrors.buildingNumber}
                  required
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="ButtonGroupContainer">
          <ButtonGroup>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            <Button color="info" variant="contained" type="submit" disabled={!isFormValid}>Save</Button>
          </ButtonGroup>
        </div>
      </form>
    </PageWrapper>
  );
};

export default RegisterBuilding;
