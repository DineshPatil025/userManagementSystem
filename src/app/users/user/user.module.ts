import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [ 
  {
    path:"",
    component:UserDashboardComponent
  }
]

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserUpsertComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
