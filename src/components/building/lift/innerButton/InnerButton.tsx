import { Circle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './InnerButton.module.scss';

type BuildingLiftInnerButton = {
  floorNumber: number;
  cabinPosition: number;
  moveCabinByInnerButton: (floorNumber: number) => void;
}

const BuildingLiftInnerButton = ({
  floorNumber, moveCabinByInnerButton, cabinPosition,
}: BuildingLiftInnerButton) => {
  const [isPressed, setIsPressed] = useState(false);

  const innerButtonClick = () => {
    if (floorNumber !== cabinPosition) {
      moveCabinByInnerButton(floorNumber);
      setIsPressed(true);
    }
  };

  useEffect(() => {
    if (cabinPosition === floorNumber) {
      const timeout = setTimeout(() => setIsPressed(false), 2000);
      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [isPressed, cabinPosition]);

  return (
    <IconButton
      disabled={isPressed}
      className={`${styles.button} ${isPressed ? styles.pressed : ''}`}
      onClick={innerButtonClick}
    >
      <span>{floorNumber}</span>
      <Circle fontSize="large" />
    </IconButton>
  );
};

export default BuildingLiftInnerButton;
