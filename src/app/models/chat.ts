import { Message } from './message';
import {Maintenance} from './maintenance';

export interface Chat {
    id: number;
    message?: Message[];
    maintenance: Maintenance;
    maintenanceName: string;
    newMessage?: boolean;
}
