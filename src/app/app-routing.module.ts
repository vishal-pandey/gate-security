import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VisitorListComponent } from './components/visitor-list/visitor-list.component';
import { VisitorCreateComponent } from './components/visitor-create/visitor-create.component';


const routes: Routes = [
	{
		path: "",
		component: HomeComponent
	},
	{
		path: "visitor-list",
		component: VisitorListComponent
	},
	{
		path: "visitor-create",
		component: VisitorCreateComponent
	}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
