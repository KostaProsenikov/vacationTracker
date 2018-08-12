export class VacationModel {
    constructor(
        public startDate   : string,
        public endDate     : string,
        public daysTaken   : number,
        public isApproved ?: boolean,
        public isCancelled?: boolean,
        public approvedBy ?: string,
        public reason     ?: string
    ) {}
}