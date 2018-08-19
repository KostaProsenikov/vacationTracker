import { EventColor } from 'calendar-utils';

export class UserModel {
    constructor(
        public _id:  string,
        public username:  string,
        public email:  string,
        public age:  number,
        public firstName?:  string,
        public lastName?:  string,
        public daysLeft?:  number,
        public color   ?:  EventColor
    ) {}
}
