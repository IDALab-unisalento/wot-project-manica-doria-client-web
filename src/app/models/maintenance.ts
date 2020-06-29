import {Machine} from './machine';

export interface Maintenance {

    id?: number;
    name?: string;
    description?: string;
    date?: Date;
    status?: string;
    type?: string;
    machine?: Machine;
}
