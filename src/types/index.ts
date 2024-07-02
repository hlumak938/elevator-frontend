import { ReactElement } from 'react';

export type PageConfig = {
    path: string;
    title?: string;
    component: () => ReactElement;
}

export type BuildingsData = Building[];

export type Building = {
    id: number;
    address: Address;
    floorCount: number;
    floors: Floor[];
    lifts: Lift[];
}

export type Address = {
    city: string;
    street: string;
    buildingNumber: number;
}

export type Floor = {
    id: number
    number: number
}

export type Lift = {
    id: number
    cabinPosition: number
    status: string
    cabin: Cabin
    engine: Engine
    buttonTemplate: ButtonTypes
    floorNumbers: any[]
    liftListenerList: any[]
    buildingId: number
}

export type Cabin = {
    serialNumber: string
    door: Door
    type: string
}

export type Door = {
    id: string
    doorStatus?: string
}

export type Engine = {
    serialNumber: string
    type: string
    status?: string
}

export enum ButtonTypes {
    UP_DOWN,
    ONE,
    COMBINED,
}
