import { MaterialModules } from './../material';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    AuthModule,
    LoginModule,
    MaterialModules
  ]
})
export class ModulesModule { }
