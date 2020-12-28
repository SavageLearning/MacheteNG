/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Created by jcii on 6/2/17.
 */

export class Record<T> {
  idString: string;
  id: number;
  datecreated: Date;
  dateupdated: Date;
  createdby: string;
  updatedby: string;
  idPrefix: string;
  public constructor(init?: Partial<T>) {
    Object.assign(this, init);
  }
}
export class Lookup extends Record<Lookup> {
  idString = 'Lookup';
  category: string;
  text_EN: string;
  text_ES: string;
  selected: boolean;
  subcategory: string;          // deprecated, moving to skill-rule
  level: number;                // deprecated, moving to skill-rule
  wage: number;                 // deprecated, moving to skill-rule
  minHour: number;              // deprecated, moving to skill-rule
  fixedJob?: boolean;           // deprecated, moving to skill-rule
  sortorder: number;
  typeOfWorkID: number;         // deprecated, moving to skill-rule
  speciality: boolean;          // deprecated, moving to skill-rule
  ltrCode: string;              // deprecated, moving to skill-rule
  emailTemplate: string;
  skillDescriptionEn: string;   // deprecated, moving to skill-rule
  skillDescriptionEs: string;   // deprecated, moving to skill-rule
  minimumCost?: number;         // never used?
  key: string;
  active: boolean;
  clientRules: string;

}

export enum LCategory {
  SKILL = 'skill',
  TRANSPORT = 'transportmethod'
}
