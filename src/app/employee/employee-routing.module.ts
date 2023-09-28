import { RouterModule, Routes } from "@angular/router";
import { EmployeeAddComponent } from "./components/employee-add/employee-add.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "create-employee", component: EmployeeAddComponent },
  { path: "employees-list", component: EmployeeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
