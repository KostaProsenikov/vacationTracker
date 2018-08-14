export class ApprovalModel {
    constructor(
        public _id       : number,
        public vacationId: string,
        public status    : string,
        public updatedBy : string,
    ) {}
}