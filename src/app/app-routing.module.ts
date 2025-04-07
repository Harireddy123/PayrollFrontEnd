import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmpComponent } from './Component/add-emp/add-emp.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'add', component: AddEmpComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
