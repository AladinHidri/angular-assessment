import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./employee/components/employee-list/employee-list.component";
import { EmployeeAddComponent } from "./employee/components/employee-add/employee-add.component";
import { NotFoundComponent } from "./employee/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "employees",
    loadChildren: () =>
      import("../app/employee/employee.module").then((m) => m.EmployeeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
