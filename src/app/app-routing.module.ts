import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnitconversionComponent} from './unitconversion/unitconversion.component';

const routes: Routes = [
  {path: '', redirectTo: 'default', pathMatch: 'full'},
  {path: 'default', component: UnitconversionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
