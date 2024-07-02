import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBuildingByIdQuery } from '../../api/buildingsApi';
import { useRegisterLiftMutation } from '../../api/liftApi';
import { addLift } from '../../store/slices/liftSlice';
import { ButtonTypes, Cabin, Engine } from '../../types';
import { useSnackbar } from '../SnackbarContext';
import PageWrapper from '../pageWrapper/PageWrapper';
import './RegisterLift.scss';

type RegisterLiftProps = {
  buildingId: string;
};

const RegisterLift = () => {
  const [cabin, setCabin] = useState<Omit<Cabin, 'door'>>({
    serialNumber: '',
    type: '',
  });
  const [engine, setEngine] = useState<Engine>({
    serialNumber: '',
    type: '',
  });

  const [buttonTemplate, setButtonTemplate] = useState<ButtonTypes | string>('');
  const [formErrors, setFormErrors] = useState({
    'cabin.type': '',
    'cabin.serialNumber': '',
    'engine.type': '',
    'engine.serialNumber': '',
    buttonTemplate: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const { buildingId } = useParams<RegisterLiftProps>();
  const { data } = useGetBuildingByIdQuery(Number(buildingId));
  const [registerLift] = useRegisterLiftMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const validateField = (name: string, value: string | ButtonTypes) => {
    let error = '';

    if (typeof value === 'string' && !value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1).replace('.', ' ')} is required`;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | ButtonTypes>) => {
    const { name, value } = event.target;

    if (name === 'buttonTemplate') {
      setButtonTemplate(value as ButtonTypes);
    } else if (name.startsWith('engine')) {
      setEngine((prevData) => ({
        ...prevData,
        [name.replace('engine.', '')]: value,
      }));
    } else if (name.startsWith('cabin')) {
      setCabin((prevData) => ({
        ...prevData,
        [name.replace('cabin.', '')]: value,
      }));
    }

    validateField(name, value);
  };

  const handleCancel = () => {
    navigate(`/building/${buildingId}`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const response = await registerLift({
        id: Number(buildingId),
        body: { cabin, engine, buttonTemplate: buttonTemplate as ButtonTypes },
      }).unwrap();
      dispatch(addLift(response));
      showSnackbar('Lift successfully registered!', 'success');
      navigate(`/building/${buildingId}`);
    } catch (error) {
      showSnackbar('Failed to register lift', 'error');
    }
  };

  useEffect(() => {
    setIsFormValid(
      !Object.values(formErrors).some((error) => error)
        && [cabin.serialNumber, cabin.type, engine.serialNumber, engine.type].every((value) => value.trim())
        && buttonTemplate !== '',
    );
  }, [formErrors, cabin, engine, buttonTemplate]);

  return (
    <PageWrapper title="Register Lift in Building">
      {data && (
        <div className="Header">
          <div>
            Building:
            {' '}
            {buildingId}
          </div>
          <div>
            Address:
            {' '}
            {data.address.city}
            {' '}
            {data.address.street}
            {' '}
            {data.address.buildingNumber}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="AttributesContainer">
          <fieldset>
            <legend>Engine</legend>
            <FormControl>
              <TextField
                className="TextField"
                id="outlined-engine-type"
                variant="outlined"
                name="engine.type"
                label="Type"
                value={engine.type}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                error={!!formErrors['engine.type']}
                helperText={formErrors['engine.type']}
              />
            </FormControl>
            <FormControl>
              <TextField
                className="TextField"
                id="outlined-engine-serial-number"
                variant="outlined"
                name="engine.serialNumber"
                label="Serial No"
                value={engine.serialNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                error={!!formErrors['engine.serialNumber']}
                helperText={formErrors['engine.serialNumber']}
              />
            </FormControl>
          </fieldset>
        </div>
        <div className="AttributesContainer">
          <fieldset>
            <legend>Cabin</legend>
            <FormControl>
              <TextField
                className="TextField"
                id="outlined-cabin-type"
                variant="outlined"
                name="cabin.type"
                label="Type"
                value={cabin.type}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                error={!!formErrors['cabin.type']}
                helperText={formErrors['cabin.type']}
              />
            </FormControl>
            <FormControl>
              <TextField
                className="TextField"
                id="outlined-cabin-serial-number"
                variant="outlined"
                name="cabin.serialNumber"
                label="Serial No"
                value={cabin.serialNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                error={!!formErrors['cabin.serialNumber']}
                helperText={formErrors['cabin.serialNumber']}
              />
            </FormControl>
          </fieldset>
        </div>
        <div className="AttributesContainer">
          <fieldset>
            <legend>Button</legend>
            <FormControl>
              <InputLabel className="SelectInput" id="demo-simple-select-label">Button</InputLabel>
              <Select
                className="SelectContainer"
                id="select-button-template"
                labelId="select-button-template-label"
                name="buttonTemplate"
                label="Button"
                value={buttonTemplate as string}
                onChange={(e: SelectChangeEvent) => handleChange(e)}
              >
                {Object.keys(ButtonTypes)
                  .filter((key) => Number.isNaN(Number(key)))
                  .map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </fieldset>
        </div>
        <ButtonGroup className="ButtonGroup" variant="contained" aria-label="Basic button group">
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="info" variant="contained" type="submit" disabled={!isFormValid}>
            Save
          </Button>
        </ButtonGroup>
      </form>
    </PageWrapper>
  );
};

export default RegisterLift;
