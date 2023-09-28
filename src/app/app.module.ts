import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { EmloyeeModuleModule } from "./employee/employee.module";
import { MatIconModule } from "@angular/material/icon";
import { NotFoundComponent } from "./employee/components/not-found/not-found.component";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    EmloyeeModuleModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
