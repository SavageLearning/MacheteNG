import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReportsComponent } from "../reports.component";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  editorOptions = { theme: "vs-dark", language: "sql" };
  code : string = 'Loading';
  editing: boolean = false;

  @Input() sql: string = "";
  @Output() editedSql = new EventEmitter<string>();

  constructor() {}

  doneWithSql(sql: string) {
    this.editing = false;
    this.editedSql.emit(sql);
  }

  setEditMode() {
    this.editing = true;
  }

  ngOnChanges(changes: ReportsComponent) {
    this.code = this.sql;
  }

  ngOnInit(): void {}
}
