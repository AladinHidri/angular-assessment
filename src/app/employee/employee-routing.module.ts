import { RouterModule, Routes } from "@angular/router";
import { EmployeeAddComponent } from "./components/employee-add/employee-add.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { EmployeeViewComponent } from "./components/employee-view/employee-view.component";

const routes: Routes = [
  { path: "", component: EmployeeListComponent },
  { path: "create-employee", component: EmployeeAddComponent },

  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
