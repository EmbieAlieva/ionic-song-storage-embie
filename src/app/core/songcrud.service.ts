import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SongcrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_Song(record) {
    return this.firestore.collection('Song').add(record);
  }
  read_Song() {
    return this.firestore.collection('Song').snapshotChanges();
  }

  update_Song(recordID, record) {
  this.firestore.doc('Song/' + recordID).update(record);
  }

  delete_Song(record_id) {
  this.firestore.doc('Song/' + record_id).delete();
  }
}
