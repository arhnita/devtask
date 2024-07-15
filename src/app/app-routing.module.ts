import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogPostDetailsComponent } from './pages/blog-post-details/blog-post-details.component';

const routes: Routes = [
  { path: '', component: BlogCardComponent },
  { path: 'post/:id', component: BlogPostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
