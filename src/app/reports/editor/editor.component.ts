import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReportsComponent } from "../reports.component";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  editorOptions = { theme: "visual-studio", language: "sql" };
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

  ngOnInit(): void {}
}
