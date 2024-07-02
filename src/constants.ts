import Building from './pages/building/Building';
import Buildings from './pages/buildings/Buildings';
import RegisterBuilding from './pages/registerBuilding/RegisterBuilding';
import { PageConfig } from './types';
import RegisterLift from './pages/registerLift/RegisterLift';

const pages: PageConfig[] = [
  {
    path: '/',
    title: 'Buildings page',
    component: Buildings,
  },
  {
    path: '/registerBuilding',
    title: 'Register building',
    component: RegisterBuilding,
  },
  {
    path: '/building/:buildingId',
    component: Building,
  },
  {
    path: '/building/:buildingId/registerLift/',
    title: 'Register Lift in Building',
    component: RegisterLift,
  },
];

export default pages;
