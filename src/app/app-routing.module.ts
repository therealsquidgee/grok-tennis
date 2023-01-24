import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TennisComponent } from './tennis/tennis.component';

const routes: Routes = [
  {
    path: '',
    component: TennisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
