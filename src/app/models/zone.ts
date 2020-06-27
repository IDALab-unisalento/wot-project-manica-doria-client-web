import {Beacon} from './beacon';
import {Machine} from './machine';

export interface Zone {
    id?: number;
    name: string;
    beacon: Beacon;
    machine: Machine;
}
