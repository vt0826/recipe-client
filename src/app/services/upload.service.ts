import { Upload } from './upload';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

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
    this.uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);
    const result = await this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            console.log('File available at', downloadURL);
            upload.url = downloadURL;
          });
      }
    );
  }
}
