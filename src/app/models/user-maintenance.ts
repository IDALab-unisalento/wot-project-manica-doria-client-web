import {User} from './user';
import {Maintenance} from './maintenance';

export interface UserMaintenance {

    id?: number;
    user?: User;
    maintenance?: Maintenance;
    date?: string;
    status?: string;
}
