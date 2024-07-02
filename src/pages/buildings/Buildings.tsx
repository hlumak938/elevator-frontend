import { AddCircleRounded, InfoRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetBuildingsQuery } from '../../api/buildingsApi';
import useAppSelector from '../../store/hooks';
import { setBuildings } from '../../store/slices/buildings';
import PageWrapper from '../pageWrapper/PageWrapper';

const Buildings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: buildingsData, refetch } = useGetBuildingsQuery();
  const buildings = useAppSelector((state) => state.buildings);

  useEffect(() => {
    if (buildingsData) {
      dispatch(setBuildings(buildingsData));
    }
  }, [buildingsData, dispatch]);

  useEffect(() => {
    refetch();
  }, [navigate, refetch]);

  const columns: GridColDef[] = [
    {
      field: 'address', headerName: 'Address', flex: 880,
    },
    {
      field: 'floors', headerName: 'Floors', type: 'number', flex: 150,
    },
    {
      field: 'lifts', headerName: 'Lifts', type: 'number', flex: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 150,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<InfoRounded sx={{ fontSize: 28 }} />}
          label="Building details"
          onClick={() => navigate(`/building/${params.id}`)}
        />,
      ],
    },
  ];

  const rows = buildings.map((building) => ({
    id: building.id,
    address: `${building.address.city}, ${building.address.street} ${building.address.buildingNumber}`,
    floors: building.floorCount,
    lifts: building.lifts.length,
  }));

  return (
    <PageWrapper
      title="List of registered buildings"
      button={(
        <IconButton onClick={() => navigate('/registerBuilding')}>
          <AddCircleRounded fontSize="large" />
        </IconButton>
    )}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </PageWrapper>
  );
};

export default Buildings;
