import { Record } from './record';

export class Worker extends Record<Worker> {
    firstname1: string;
    firstname2?: null;
    lastname1: string;
    lastname2?: null;
    dwccardnum: number;
    memberexpirationdate: string;
    memberStatusEN: string;
    driverslicense: boolean;
    carinsurance: boolean;
    insuranceexpiration?: null;
    dateupdated: string;
    memberStatusID: number;
    skillCodes: string;
    zipCode: string;
}
