import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { EmployeeService } from "../../services/employee-service";
import { IEmployee } from "../../models/employee";
import { Subscription } from "rxjs";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "employeeId",
    "name",
    "email",
    "phone",
    "age",
    "dob",
    "salary",
    "address",
    "action",
  ];

  dataSource!: MatTableDataSource<IEmployee>;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading: Boolean = true;
  employeeList: IEmployee[] = [];
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  firstNameFilter: string = "";
  lastNameFilter: string = "";
  emailFilter: string = "";
  phoneFilter: string = "";
  salaryFilter: string = "";
  addressFilter: string = "";

  private employeesSubscription: Subscription = new Subscription();

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService
      .getEmployeesListener()
      .subscribe((employees: IEmployee[]) => {
        this.employeeList = employees;
        this.updateDataSource();
      });
    this.employeeService.getEmployeeList();
    this.isLoading = false;
  }

  applyFilters() {
    this.dataSource.filterPredicate = (data: IEmployee, filter: string) => {
      const filterObject = JSON.parse(filter);

      const firstNameMatch = data.firstName
        .toLowerCase()
        .includes(filterObject.firstName?.toLowerCase());
      const lastNameMatch = data.lastName
        .toLowerCase()
        .includes(filterObject.lastName?.toLowerCase());
      const emailMatch = data.email
        .toLowerCase()
        .includes(filterObject.email?.toLowerCase());
      const phoneMatch = data.contactNumber.includes(filterObject.phone);
      const salaryMatch = filterObject.salary
        ? data.salary.toString().includes(filterObject.salary.toString())
        : true;
      const addressMatch = data.address
        .toLowerCase()
        .includes(filterObject.address?.toLowerCase());

      return (
        firstNameMatch &&
        lastNameMatch &&
        emailMatch &&
        phoneMatch &&
        salaryMatch &&
        addressMatch
      );
    };

    this.dataSource.filter = JSON.stringify({
      firstName: this.firstNameFilter,
      lastName: this.lastNameFilter,
      email: this.emailFilter,
      phone: this.phoneFilter,
      salary: this.salaryFilter,
      address: this.addressFilter,
    });
  }

  ngAfterViewInit() {
    this.updateDataSource();
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe((sortEvent: Sort) => {
      if (sortEvent.active === "name") {
        this.dataSource.data = this.dataSource.data.sort((a, b) => {
          const nameA = a.firstName + " " + a.lastName;
          const nameB = b.firstName + " " + b.lastName;
          return sortEvent.direction === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
      }
      if (sortEvent.active === "phone") {
        this.dataSource.data = this.dataSource.data.sort((a, b) => {
          const phoneA = parseInt(a.contactNumber);
          const phoneB = parseInt(b.contactNumber);
          return sortEvent.direction === "asc"
            ? phoneA > phoneB
              ? 1
              : phoneA == phoneB
              ? 0
              : -1
            : phoneB > phoneA
            ? 1
            : phoneA == phoneB
            ? 0
            : -1;
        });
      }
      if (sortEvent.active === "employeeId") {
        this.dataSource.data = this.dataSource.data.sort((a, b) => {
          const IdA = parseInt(a.id);
          const IdB = parseInt(b.id);
          return sortEvent.direction === "asc"
            ? IdA > IdB
              ? 1
              : IdA == IdB
              ? 0
              : -1
            : IdB > IdA
            ? 1
            : IdA == IdB
            ? 0
            : -1;
        });
      }
      if (sortEvent.active === "dob") {
        this.dataSource.data = this.dataSource.data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.dob.split("/");
          const [dayB, monthB, yearB] = b.dob.split("/");

          const dateA = yearA + monthA + dayA;
          const dateB = yearB + monthB + dayB;
          return sortEvent.direction === "asc"
            ? dateA.localeCompare(dateB)
            : dateB.localeCompare(dateA);
        });
      }
    });
  }

  updateDataSource() {
    this.dataSource = new MatTableDataSource<IEmployee>(this.employeeList);
    this.dataSource.paginator = this.paginator;

    this.paginator.length = this.employeeList.length;

    this.paginator.pageIndex = this.pageIndex;
    this.paginator.pageSize = this.pageSize;
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }

  deleteEmployee(id: any) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.employeeService.deleteEmployee(id);
    }
  }
}
