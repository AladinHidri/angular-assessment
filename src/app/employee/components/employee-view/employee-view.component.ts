import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee-service";
import { IEmployee } from "../../models/employee";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-employee-view",
  templateUrl: "./employee-view.component.html",
  styleUrls: ["./employee-view.component.scss"],
})
export class EmployeeViewComponent implements OnInit {
  employee: any;
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeViewComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log("this.data", this.data.id);
    this.employeeService
      .getEmployeeById(this.data.id)
      .subscribe((employee: IEmployee[]) => {
        this.employee = employee[0];
      });
  }
}
