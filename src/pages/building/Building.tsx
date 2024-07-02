import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBuildingByIdQuery } from '../../api/buildingsApi';
import BuildingMonitor from '../../components/building/monitor/Monitor';
import BuildingSidebar from '../../components/building/sidebar/Sidebar';
import './Building.scss';

type BuildingParams = {
  buildingId: string;
}

const Building = () => {
  const { buildingId } = useParams() as BuildingParams;

  const isNotValidBuildingId = !Number.isInteger(+buildingId);

  const { data: building, isLoading, isError } = useGetBuildingByIdQuery(+buildingId, {
    skip: isNotValidBuildingId,
    pollingInterval: 500,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isError || isNotValidBuildingId) {
      navigate('/');
    }
  }, [isError, isNotValidBuildingId]);

  return (
    <>
      {
        !!building && (
          <section className="building">
            <BuildingSidebar
              address={building.address}
              floorCount={building.floorCount}
              liftCount={building.lifts.length}
            />
            <BuildingMonitor
              buildingId={building.id}
              lifts={building.lifts}
              floors={building.floors}
            />
          </section>
        )
      }
      <Backdrop
        open={isLoading}
        sx={{ color: '#fff', zIndex: 10 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Building;
