export class Column {
  constructor(field: string, header: string, dateFormat: string) {
    this.field = field;
    this.header = header;
    this.dateFormat = dateFormat;
  }
  field: string;
  header: string;
  dateFormat: string;
}
