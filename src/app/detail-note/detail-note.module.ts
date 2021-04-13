import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailNotePageRoutingModule } from './detail-note-routing.module';

import { DetailNotePage } from './detail-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailNotePageRoutingModule
  ],
  declarations: [DetailNotePage]
})
export class DetailNotePageModule {}
