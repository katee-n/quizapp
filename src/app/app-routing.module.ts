import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'question/:id',
    loadChildren: () => import('./pages/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'question-list',
    loadChildren: () => import('./pages/question-list/question-list.module').then( m => m.QuestionListPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
