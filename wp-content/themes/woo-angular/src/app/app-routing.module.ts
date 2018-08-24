import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { WpPageComponent } from './wp-page/wp-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },
  {
    path: ':slug',
    component: WpPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
