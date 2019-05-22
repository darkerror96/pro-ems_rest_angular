import { address } from './address';
import { GENDER } from './GENDER';
import { JOBTITLE } from './JOBTITLE';
import { DEPARTMENT } from './DEPARTMENT';

export class employee {
    constructor(
        public eId: number,

        public name: string,
        public age: number,
        public gender: GENDER,
        public contactNo: number,
        public aHome: address,
        public aWork: address,

        public ssn: number,
        public email: string,
        public jobTitle: JOBTITLE,
        public dept: DEPARTMENT,
        public salary: number,
        public reportTo: number,
        public isManager: number
    ) { }
}