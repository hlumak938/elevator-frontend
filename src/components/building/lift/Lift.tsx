import React from 'react';
import { useMoveCabinByInnerButtonMutation } from '../../../api/liftApi';
import { Floor } from '../../../types';
import styles from './Lift.module.scss';
import BuildingLiftInnerButton from './innerButton/InnerButton';

type BuildingLiftProps = {
  liftId: number;
  cabinPosition: number;
  isDoorOpen: boolean;
  floors: Floor[];
}

const BuildingLift = ({
  liftId, cabinPosition, isDoorOpen, floors,
}: BuildingLiftProps) => {
  const [moveCabinByInnerButtonMutation] = useMoveCabinByInnerButtonMutation();

  const moveCabinByInnerButton = (floorNumber: number) => {
    moveCabinByInnerButtonMutation({
      liftId,
      floorNumber,
    });
  };

  return (
    <div
      className={styles.lift}
      style={
        {
          '--cabin-position': cabinPosition,
        } as React.CSSProperties
      }
    >
      <div className={styles.cabin}>
        <div className={`${styles.door} ${isDoorOpen ? styles.open : ''}`}>
          <span className={styles.left} />
          <span className={styles.right} />
        </div>
        <div className={styles.buttons}>
          {floors.map(({ id, number }) => (
            <BuildingLiftInnerButton
              key={id}
              floorNumber={number}
              moveCabinByInnerButton={moveCabinByInnerButton}
              cabinPosition={cabinPosition}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildingLift;
