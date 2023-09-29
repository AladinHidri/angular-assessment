import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IEmployee } from "../models/employee";
import { EMPTY, Observable, Subject, of } from "rxjs";
import { maxBy } from "lodash";
import { environment } from "src/environment.staging";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  employeeUrl = environment.employeeUrl;

  private employees: IEmployee[] = [];
  private employees$: Subject<IEmployee[]> = new Subject<IEmployee[]>();

  getEmployeeList(): void {
    this.employees$.next([...this.employees]);
  }

  getEmployeesListener(): Observable<IEmployee[]> {
    return this.employees$.asObservable();
  }

  loadEmployeeList() {
    this.http
      .get<IEmployee[]>(
        `${this.employeeUrl}/employee?noofRecords=100&idStarts=1`
      )
      .subscribe((data: IEmployee[]) => {
        this.employees = data;
        this.employees$.next([...this.employees]);
      });
  }

  calculateId(): string {
    const numericIds = this.employees.map((employee) => parseInt(employee.id));
    let maxId = maxBy(numericIds) || 0;
    const newId = maxId + 1;
    return newId.toString();
  }
  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  createEmployee(employee: IEmployee) {
    employee.age = this.calculateAge(new Date(employee.dob));
    employee.id = this.calculateId();
    employee.dob = this.formatDate(new Date(employee.dob));
    employee.imageUrl =
      `${this.employeeUrl}/Image?text=` +
      `${employee.firstName.charAt(0)}${employee.lastName.charAt(
        0
      )}`.toUpperCase() +
      "&height=120&width=120";
    this.employees = [employee, ...this.employees];
    this.employees$.next([...this.employees]);
  }

  deleteEmployee(id: string): Observable<string> {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    this.employees$.next([...this.employees]);
    return of("Employee deleted successfully");
  }
  getEmployeeById(id: string | null): Observable<IEmployee[]> {
    let employeeFound = this.employees.filter((employee) => employee.id === id);
    return of(employeeFound);
  }
}
