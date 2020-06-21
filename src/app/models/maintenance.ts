import {Machine} from './machine';
import {User} from './user';

export interface Maintenance {

    id?: number;
    name: string;
    description: string;
    date?: Date;
    status?: string;
    type?: string;
    machine: Machine;
    // per il save
    user: User;

}
