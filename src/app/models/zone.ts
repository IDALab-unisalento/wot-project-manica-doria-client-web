import {Beacon} from './beacon';

export interface Zone {
    id?: number;
    name: string;
    beacon: Beacon;
}
