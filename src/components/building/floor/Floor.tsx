import { RadioButtonCheckedRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCallCabinMutation } from '../../../api/buildingsApi';
import { Lift } from '../../../types';
import styles from './Floor.module.scss';

type BuildingFloorProps = {
  buildingId: number;
  number: number;
  lifts: Lift[];
}

const BuildingFloor = ({ buildingId, number, lifts }: BuildingFloorProps) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [callCabin] = useCallCabinMutation();

  useEffect(() => {
    if (isButtonPressed) {
      if (lifts.find((lift) => lift.cabinPosition === number && lift.cabin.door.doorStatus === 'OPEN')) {
        setIsButtonPressed(false);
      }
    }
  }, [lifts, isButtonPressed]);

  const callButtonHandler = () => {
    setIsButtonPressed(true);
    callCabin({ buildingId, floorNumber: number });
  };

  return (
    <div className={styles.floor}>
      <div className={styles.floorInfo}>
        <span className={styles.number}>{number}</span>
        <div className={styles.floorButtons}>
          <IconButton
            disabled={isButtonPressed}
            className={`${styles.floorButton} ${isButtonPressed ? styles.pressed : ''}`}
            onClick={callButtonHandler}
          >
            <RadioButtonCheckedRounded fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default BuildingFloor;
