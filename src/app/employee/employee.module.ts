import { NgModule } from "@angular/core";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeAddComponent } from "./components/employee-add/employee-add.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeService } from "./services/employee-service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeDeleteComponent } from "./components/employee-delete/employee-delete.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { EmployeeViewComponent } from "./components/employee-view/employee-view.component";
@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeDeleteComponent,
    EmployeeViewComponent,
  ],
  imports: [
    EmployeeRoutingModule,

    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [EmployeeService],
  bootstrap: [],
})
export class EmployeeModule {}
