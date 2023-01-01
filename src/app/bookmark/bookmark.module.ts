import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookmarkPage } from './bookmark.page';

import { BookmarkPageRoutingModule } from './bookmark-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, BookmarkPageRoutingModule],
  declarations: [BookmarkPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookmarkPageModule {}
