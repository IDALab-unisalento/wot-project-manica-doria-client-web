import { Message } from './message';

export interface Chat {
    id: number;
    message?: Message[];
    maintenance: string;
    newMessage?: boolean;
}
