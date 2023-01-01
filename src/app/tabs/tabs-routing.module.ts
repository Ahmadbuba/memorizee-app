import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'bookmark',
        loadChildren: () =>
          import('../bookmark/bookmark.module').then(
            (m) => m.BookmarkPageModule
          ),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('../gallery/gallery.module').then((m) => m.GalleryPageModule),
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/gallery',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
