import { Column } from './column';
import {SearchInputs} from './search-inputs';
/**
 * Created by jcarter on 3/9/17.
 */
export class Report {
  name: string;
  commonName: string;
  title: string;
  description: string;
  sqlquery: string;
  category: string;
  subcategory: string;
  idString: string;
  id: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Object;
  datecreated: Date;
  dateupdated: Date;
  createdby: string;
  updatedby: string;
  idPrefix: string;
  columns: Column[];
  inputs: SearchInputs;

}
