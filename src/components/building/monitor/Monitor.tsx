import React, { useEffect, useRef } from 'react';
import { Floor, Lift } from '../../../types';
import BuildingFloor from '../floor/Floor';
import BuildingLift from '../lift/Lift';
import styles from './Monitor.module.scss';

type BuildingMonitorProps = {
  buildingId: number;
  lifts: Lift[];
  floors: Floor[];
}

const BuildingMonitor = ({ floors, lifts, buildingId }: BuildingMonitorProps) => {
  const monitorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (monitorScrollRef?.current) {
      const monitorScroll = monitorScrollRef.current;
      monitorScroll.scrollTop = monitorScroll.scrollHeight;
    }
  }, [monitorScrollRef?.current]);

  const sortedFloors = [...floors].sort((a, b) => (a.number > b.number ? 1 : -1)).reverse();

  return (
    <div className={styles.monitor}>
      <div className={styles.scroll} ref={monitorScrollRef}>
        <div
          className={styles.inner}
          style={
            {
              '--floor-height': '150px',
              '--cabin-width': '120px',
              '--lift-gap': '40px',
              '--lift-count': lifts.length,
            } as React.CSSProperties
          }
        >
          <div className={styles.floorsInner}>
            {sortedFloors.map((floor) => (
              <BuildingFloor
                lifts={lifts}
                buildingId={buildingId}
                number={floor.number}
                key={floor.id}
              />
            ))}
          </div>
          <div className={styles.liftsInner}>
            {lifts.map((lift) => (
              <BuildingLift
                liftId={lift.id}
                key={lift.id}
                isDoorOpen={lift.cabin.door.doorStatus === 'OPEN'}
                cabinPosition={lift.cabinPosition}
                floors={sortedFloors}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingMonitor;
