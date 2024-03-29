import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../pages/home/home.component";
import { LoginGuard } from "../_guard/login.guard";
import { ConfirmAccountComponent } from "./register/confirm-account/confirm-account.component";
import { NonActivatedAccountComponent } from "./register/non-activated-account/non-activated-account.component";
import { RegisterFormComponent } from './register/register-form/register-form.component';
import { ChangePassComponent } from './signin/change-pass/change-pass.component';
import { RecoverPassFormComponent } from './signin/recover-pass-form/recover-pass-form.component';
import { SigninFormComponent } from './signin/signin-form/signin-form.component';

const routes: Routes = [
  {path: 'register', component: RegisterFormComponent, canActivate: [LoginGuard]},
  {path: 'signin', component: SigninFormComponent, canActivate: [LoginGuard]},
  {path: 'recovery-password', component: RecoverPassFormComponent, canActivate: [LoginGuard]},
  {path: 'change-password', component: ChangePassComponent},
  {path: 'confirm-register', component: ConfirmAccountComponent, canActivate: [LoginGuard]},
  {path: 'non-active/:email', component: NonActivatedAccountComponent, canActivate: [LoginGuard]},
  {path: 'non-active', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
