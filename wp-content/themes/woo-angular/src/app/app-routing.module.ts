import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { WpPageComponent } from './wp-page/wp-page.component'
import { WpPostComponent } from './wp-page/wp-post/wp-post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: ':slug',
    component: WpPageComponent
  },
  {
    path: 'portfolio/:slug',
    component: WpPostComponent
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
