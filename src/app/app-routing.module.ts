import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts/contracts.component';
import { LoginComponent } from './login/login.component';
import { ContractComponent } from './contracts/contract/contract.component';

const routes: Routes = [
    {
        component: ContractsComponent,
        path: 'contracts'
    },
    {
        component: LoginComponent,
        path: ''
    },
    {
        component: ContractComponent,
        path: 'contract/:uid'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
