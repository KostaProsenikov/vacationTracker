export class UserModel {
    constructor(
        public _id     : string,
        public username: string,
        public daysLeft?: number
    ) {}
}