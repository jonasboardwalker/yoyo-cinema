import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from "./components/loader/loader.component";
import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule],
  exports: [LoaderComponent]
})
export class SharedModule {}
