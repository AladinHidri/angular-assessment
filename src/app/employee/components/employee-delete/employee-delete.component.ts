import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmployeeService } from "../../services/employee-service";
@Component({
  selector: "app-employee-delete",
  templateUrl: "./employee-delete.component.html",
  styleUrls: ["./employee-delete.component.scss"],
})
export class EmployeeDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}
  confirmDelete() {
    this.employeeService.deleteEmployee(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    });
  }
}
