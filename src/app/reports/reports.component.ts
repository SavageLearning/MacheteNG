import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import {SearchOptions } from './models/search-options';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';
import {Report} from './models/report';
import {Observable} from 'rxjs';
import {SearchInputs} from './models/search-inputs';
import {Column} from './models/column';
import { MySelectItem } from '../shared/models/my-select-item';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportsListComponent } from './reports-list/reports-list.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  viewData: SimpleAggregateRow[];
  selectedReportID: string;
  selectedReport: Report;
  title: string;
  name: string;
  description: string;
  o: SearchOptions;
  errorMessage: string;
  reportList: Report[];
  reportsDropDown: SelectItem[];
  displayDescription = false;
  cols: Column[];
  inputs: SearchInputs;
  sqlStringRowCount: number;
  showSqlSyntaxHelp = false;
  collapseSyntaxFeedback = true;
  ref: DynamicDialogRef;

  constructor(private reportsService: ReportsService,
    public dialogService: DialogService) {
    let now = new Date();
    let aYearAgo = new Date();
    aYearAgo.setFullYear(now.getFullYear() - 1);

    this.o = new SearchOptions();
    this.selectedReport = new Report();
    this.selectedReportID = 'DispatchesByJob';
    // this.title = 'loading';
    // this.description = 'loading...';
    this.o.endDate = now.toLocaleDateString();
    this.o.beginDate = aYearAgo.toLocaleDateString();
    this.reportsDropDown = [];
    this.reportsDropDown.push({label: 'Select Report', value: null});
    this.inputs = new SearchInputs();
  }

  // child component emits event
  onDoneWithSql(sql: string) {
    this.selectedReport.sqlquery = sql;
    // console.log(this.selectedReport, 'this.selectedReport.sqlquery');
  }

  showDescription() {
    this.updateDescription();
    this.displayDescription = true;
  }

  updateDescription() {
    if (this.reportList.length === 0) {
      return;
    }
    this.selectedReport = this.reportList.filter(x => x.name === this.selectedReportID)[0];
    this.description = this.selectedReport.description;
    this.title = this.selectedReport.title || this.selectedReport.commonName;
    this.name = this.selectedReport.name;
    this.cols = this.selectedReport.columns.filter(a => a.visible === true);
    this.inputs = this.selectedReport.inputs as SearchInputs;
    this.sqlStringRowCount = this.selectedReport.sqlquery.match(/^/gm).length; // count the number of line breaks in string
  }

  ngOnInit() {
    this.reportsService.getReportList()
      .subscribe(
      listData => {
        this.reportList = listData;
        this.reportsDropDown = listData.map(r => new MySelectItem(r.commonName, r.name) as SelectItem);
        this.getView();
      },
      error => this.errorMessage = error as any,
      () => console.log('ngOnInit onCompleted'));

  }
  getView() {
    this.reportsService.getReportData(this.selectedReportID.toString(), this.o)
      .subscribe(
        data => {
          this.viewData = data;
          this.updateDescription();
        },
        error => this.errorMessage = error as any,
        () => console.log('getView onCompleted'));
  }
  // getList() {
  //   this.reportsService.getReportList();
  //   console.log('getList called');
  // }

  getExport(dt: Table) {
    dt.exportFilename = this.name + '_' + this.o.beginDate.toString() + '_to_' + this.o.endDate.toString();
    dt.exportCSV();
  }

  save() {
    
    console.log(this.selectedReport);
  }

  onShowReportsList() {
    this.ref = this.dialogService.open(ReportsListComponent, {
      data: this.reportList,
      header: 'Choose a Report',
      width: '100%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });

    // called from the child component (reports-List) emits the selected
    // record on select
    this.ref.onClose.subscribe((report: Report) => {
      if (report) {
        this.selectedReportID = report.name;
        this.getView();
      }
    });
  }
}
