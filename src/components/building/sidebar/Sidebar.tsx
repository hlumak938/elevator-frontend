import { AddCircleRounded, ArrowBackIosNew } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Address } from '../../../types';
import styles from './Sidebar.module.scss';

type BuildingSidebarProps = {
    address: Address;
    floorCount: number;
    liftCount: number;
}

const BuildingSidebar = ({ address, floorCount, liftCount }: BuildingSidebarProps) => {
  const navigate = useNavigate();
  const { city, street, buildingNumber } = address;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.topInfo}>
          <span className={styles.topInfoBuilding}>
            Building #
            {buildingNumber}
          </span>
          <span className={styles.topInfoAddress}>{`${city}, ${street}`}</span>
        </div>
        <IconButton className={styles.backBtn} onClick={() => navigate('/')}>
          <ArrowBackIosNew htmlColor="#000" fontSize="large" />
        </IconButton>
      </div>
      <div className={styles.inner}>
        <div className={styles.innerItem}>
          <span>Floors:</span>
          <span>{floorCount}</span>
        </div>
        <div className={styles.liftsInner}>
          <div className={styles.innerItem}>
            <span>Lifts:</span>
            <span>{liftCount}</span>
          </div>
          <IconButton onClick={() => navigate('registerLift')}>
            <AddCircleRounded htmlColor="#000" fontSize="large" />
          </IconButton>
        </div>
      </div>
    </aside>
  );
};

export default BuildingSidebar;
