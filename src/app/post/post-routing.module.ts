import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdbLazyLoadingModule } from 'mdb-angular-ui-kit/lazy-loading';
import { PostListComponent } from './post-list/post-list.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'search/:keyword/:tag', component: SearchResultComponent },
  {
    path: 'chu-de/:title', component: PostListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MdbLazyLoadingModule,
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
