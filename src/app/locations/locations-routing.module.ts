import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsPage } from './locations.page';

const routes: Routes = [
  {
    path: '',
    component: LocationsPage,
  },
  {
    path: 'location-detail/:name/:lat/:lang',
    loadChildren: () =>
      import('./location-detail/location-detail.module').then(
        (m) => m.LocationDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsPageRoutingModule {}
