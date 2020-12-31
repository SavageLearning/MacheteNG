import { Record } from './record';

export class Skill extends Record<Skill> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    text_EN: string;
    subcategory: string;
    speciality: boolean;
    ltrCode: string;
    skillDescriptionEn?: null;
    active: boolean;
}
