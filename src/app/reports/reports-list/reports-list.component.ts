import { Component, OnInit } from "@angular/core";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { Report } from "../models/report";

@Component({
  selector: "app-reports-list",
  templateUrl: "./reports-list.component.html",
  styleUrls: ["./reports-list.component.css"],
})
export class ReportsListComponent implements OnInit {
  selectedReport: Report;
  reports: Report[];

  constructor(
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.reports = this.config.data;
  }

  onRowSelect(event) {
    this.ref.close(event.data);
  }
}
