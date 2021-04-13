import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Notes, NotesService, Photo } from '../services/notes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  isiData: Observable<Notes[]>;
  isiDataColl: AngularFirestoreCollection<Notes>;

  constructor(public listNotesVar: NotesService, afs: AngularFirestore) {
    this.isiDataColl = afs.collection('NotesCollection');
    this.isiData = this.isiDataColl.valueChanges();
  }
}
