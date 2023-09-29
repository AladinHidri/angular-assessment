import { Component } from "@angular/core";
import { EmployeeService } from "./employee/services/employee-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  addImage: any = "assets/images/add.png";

  ngOnInit() {
    this.loadEmployees();
  }

  constructor(public restApi: EmployeeService, private router: Router) {}

  loadEmployees() {
    this.restApi.loadEmployeeList();
  }
  GoToListEmployeePage() {
    this.router.navigate([""]);
  }
  GoToAddEmployeePage() {
    this.router.navigate(["create-employee"]);
  }
}
