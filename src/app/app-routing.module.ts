import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { HomeComponent } from './home/home.component'; // We’ll create this next

const routes: Routes = [
  { path: '', component: HomeComponent },           // Show welcome message on root
  { path: 'manage', component: ManageComponent },   // Navigate here on click
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
