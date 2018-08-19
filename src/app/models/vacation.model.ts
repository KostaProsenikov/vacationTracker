export class VacationModel {
    constructor(
        public _id: string,
        public startDate: string,
        public endDate: string,
        public daysTaken: number,
        public reason     ?: string,
        public isApproved ?: boolean,
        public isCancelled?: boolean,
        public approvedBy ?: string,
        public createdBy  ?: string,
        public fullName   ?: string
    ) {}
}
