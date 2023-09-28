import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./employee/components/employee-list/employee-list.component";
import { EmployeeAddComponent } from "./employee/components/employee-add/employee-add.component";
import { NotFoundComponent } from "./employee/components/not-found/not-found.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "employees-list" },
  { path: "create-employee", component: EmployeeAddComponent },
  { path: "employees-list", component: EmployeeListComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
