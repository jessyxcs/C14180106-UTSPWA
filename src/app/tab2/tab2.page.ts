import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Notes, NotesService, Photo } from '../services/notes.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  isiData: Observable<Notes[]>;
  isiDataColl: AngularFirestoreCollection<Notes>;

  // urlImageStorage: string[] = [];

  constructor(
    public listNotesVar: NotesService,
    afs: AngularFirestore,
    private router: Router,
    public alertController: AlertController // private afStorage: AngularFireStorage
  ) {
    this.isiDataColl = afs.collection('NotesCollection');
    this.isiData = this.isiDataColl.valueChanges();
  }

  detailPage(index: number) {
    this.router.navigate(['/detail-note', index]);
  }

  async deleteNotes(judul: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      message: 'Are you sure you wanna delete this note?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.isiDataColl.doc(judul).delete();
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  // async ngOnInit() {
  //   await this.listNotesVar.loadFoto();
  // }

  // async ionViewDidEnter() {
  //   await this.listNotesVar.loadFoto();
  //   this.tampilkanData();
  // }

  // tampilkanData() {
  //   this.urlImageStorage = [];
  //   var refImage = this.afStorage.storage.ref('imgStorage');
  //   refImage
  //     .listAll()
  //     .then((res) => {
  //       res.items.forEach((itemRef) => {
  //         itemRef.getDownloadURL().then((url) => {
  //           this.urlImageStorage.unshift(url);
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(this.urlImageStorage[0]);
  // }
}
