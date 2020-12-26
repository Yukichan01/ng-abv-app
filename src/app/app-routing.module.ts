import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ContactDetailsComponent } from './contact-list/contact-details.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormComponent } from './contact-list/form/form.component';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/404-not-found', pathMatch: 'full'},
    {path: 'contact-list', component: ContactListComponent},
    {path: 'form', component:FormComponent},
    {path: '404-not-found', component: NotFoundComponent},
    {path: 'home', component: HomeComponent},
    {path: 'contact-list/:id', component: ContactDetailsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}
