import { Upload } from './upload';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadUrl$: any;
  constructor(private af: AngularFireAuth) {}

  private basePath: string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  async pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    const fileName = '1@' + Date.now() + upload.file.name;
    this.uploadTask = storageRef
      .child(`${this.basePath}/${fileName}`)
      .put(upload.file);
    const result = await this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        this.uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            upload.url = downloadURL;
          });
      }
    );
  }
}
