import { AuthComponent } from './modules/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
	{ path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
	{
		path: '', component: AuthComponent, children: [
			{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
			{ path: '**', loadChildren: () => import('./modules/no-page/noPage.Module').then(m => m.NoPageModule) }
		]
	}

	// { path: 'login', component: LoginComponent }
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
