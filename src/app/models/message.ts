import { User } from './user';
import { Chat } from './chat';

export interface Message {
    id?: number;
    content?: string;
    date?: number;
    user?: User;
    chat?: Chat;
}
