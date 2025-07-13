import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageComponent } from './manage/manage.component';
import { HomeComponent } from './home/home.component';
import { ProcessorComponent } from './manage/processor/processor.component';
import { RamComponent } from './manage/ram/ram.component';
import { StorageComponent } from './manage/storage/storage.component';
import { GpuComponent } from './manage/gpu/gpu.component';
import { PsuComponent } from './manage/psu/psu.component';
import { CoolerComponent } from './manage/cooler/cooler.component';
import { CasingComponent } from './manage/casing/casing.component';
import { MotherboardComponent } from './manage/motherboard/motherboard.component';

@NgModule({
  declarations: [
    AppComponent,
    
    // RamComponent,
    // StorageComponent,
    // GpuComponent,
    // PsuComponent,
    // CoolerComponent,
    // CasingComponent,
    // MotherboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ManageComponent,
    HomeComponent,
    ProcessorComponent
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
