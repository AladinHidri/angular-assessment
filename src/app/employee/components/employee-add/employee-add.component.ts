import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "../../services/employee-service";
import { IEmployee } from "../../models/employee";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.scss"],
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;

  constructor(
    public restApi: EmployeeService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contactNumber: ["", Validators.required],
      dob: ["", Validators.required],
      salary: ["", Validators.required],
      address: ["", Validators.required],
    });
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  }

  createEmployee(newEmployee: IEmployee) {
    this.restApi.createEmployee(newEmployee);
    this.router.navigate(["/employees-list"]);
  }
}
