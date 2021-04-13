import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Notes, NotesService } from '../services/notes.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isiData: Observable<Notes[]>;
  isiDataColl: AngularFirestoreCollection<Notes>;

  urlImageStorage: string[] = [];

  constructor(
    public listNotesVar: NotesService,
    afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    public alertController: AlertController
  ) {
    this.isiDataColl = afs.collection('NotesCollection');
    this.isiData = this.isiDataColl.valueChanges();
  }

  inpJudul: string;
  inpIsi: string;
  inpTanggal: string;
  inpNilai: number;

  addNotes(
    inpJudul: string,
    inpIsi: string,
    inpTanggal: string,
    inpNilai: number
  ) {
    this.isiDataColl.doc(this.inpJudul).set({
      Judul: this.inpJudul,
      Isi: this.inpIsi,
      Tanggal: this.inpTanggal,
      Nilai: this.inpNilai,
    });
    this.uploadStorage();
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Notes Added Successfully',
      message: 'Check on "List Notes" tab',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  uploadGambar() {
    this.listNotesVar.tambahFoto();
  }

  uploadStorage() {
    this.urlImageStorage = [];
    for (var index in this.listNotesVar.dataFoto) {
      const imgFilePath = `imgStorage/${this.listNotesVar.dataFoto[index].filePath}`;
      this.afStorage
        .upload(imgFilePath, this.listNotesVar.dataFoto[index].dataImage)
        .then(() => {
          this.afStorage.storage
            .ref()
            .child(imgFilePath)
            .getDownloadURL()
            .then((url) => {
              this.urlImageStorage.unshift(url);
            });
        });
    }
  }
}
