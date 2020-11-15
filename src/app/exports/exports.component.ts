import { Component, OnInit } from '@angular/core';
import {ExportsService} from './exports.service';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
import {HttpResponse} from '@angular/common/http';
import { saveAs } from 'file-saver';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import * as contentDisposition from 'content-disposition';
import { MySelectItem } from '../shared/models/my-select-item';
@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
  providers: [ExportsService]
})
export class ExportsComponent implements OnInit {
  exports: Export[];
  dateFilterDropDown: MySelectItem[];
  exportsDropDown: MySelectItem[];
  errorMessage: string;
  selectedColumns: ExportColumn[];
  selectedExportName: MySelectItem;
  selectedDateFilter: string;
  selectedStartDate: string;
  selectedEndDate: string;
  form: FormGroup;

  constructor(private exportsService: ExportsService, private _fb: FormBuilder) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.exportsService.getExportsList()
      .subscribe(
      listData => {
        this.exports = listData;
        this.exportsDropDown = listData.map(r =>
          new MySelectItem(r.name, r.name));
      },
      error => this.errorMessage = <any>error,
      () => console.log('ngOnInit onCompleted'));
  }

  getColumns() {
    console.log(this.selectedColumns);
    this.exportsService.getColumns(this.selectedExportName.value)
      .subscribe(
        data => {
          this.selectedColumns = data;
          this.dateFilterDropDown = data.filter(f => f.system_type_name === 'datetime')
            .map(r =>
              new MySelectItem(r.name, r.name));
          const group: any = {};
          data.forEach(col => {
            group[col.name] = new FormControl(true);
          });
          this.form = new FormGroup(group);
        },
        error => this.errorMessage = <any>error,
        () => console.log('getColumns completed')
      );
  }

  onSubmit() {
    let data = Object.assign( {
      beginDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      filterField: this.selectedDateFilter
    }, this.form.value);
    console.log(this.form.value);
    this.exportsService.getExport(this.selectedExportName.value, data)
      .subscribe(
        (res: Blob) => {
            saveAs(res, this.selectedExportName.value + '.xlsx')
        },
        error => {
          this.errorMessage = <any>error;
        },
      () => console.log('onSubmit.getExport completed'));
  }

  downloadFile(data: any, fileName: string, ttype: string) {
    const blob = new Blob([data], {type: ttype});
    saveAs(blob, fileName);
  }

  getFilename(content: string): string {
    return contentDisposition.parse(content).parameters['filename'];
  }
}
