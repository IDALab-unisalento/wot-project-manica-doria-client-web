import { Attachment } from './attachment';
import { Zone } from './zone';
import {Maintenance} from './maintenance';

export interface Step {

    id?: number;
    name: string;
    numbered?: number,
    description?: string;
    description_visible?: boolean;
    duration?: number;
    estimateDuration?: number;
    status?: string;
    attachmentList?: Attachment[];
    zone?: Zone;
    maintenance?: Maintenance;
}
