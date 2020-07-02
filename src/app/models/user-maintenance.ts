import {User} from './user';
import {Maintenance} from './maintenance';

export interface UserMaintenance {

    id?: number;
    user?: User;
    maintenance?: Maintenance;
    data?: Date;
    status?: string;
}
