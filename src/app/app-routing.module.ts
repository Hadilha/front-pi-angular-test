import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; 

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { 
    path: 'front-office', 
    loadChildren: () => import('./front-office/front-office.module').then(m => m.FrontOfficeModule)

  },
  {
    path: 'back-office',
    loadChildren: () =>
      import('./back-office/back-office.module').then((m) => m.BackOfficeModule),
  },
  { path: '', redirectTo: '/front-office', pathMatch: 'full' },
  { path: '**', redirectTo: '/front-office' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }