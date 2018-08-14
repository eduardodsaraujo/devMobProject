import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(private db: AngularFireDatabase) {
  }

  getAll(path: string) {
    return this.db.list(path, ref => ref)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  getAllCount(path: string) {
    return this.db.list(path, ref => ref)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(objects => (objects as any[]).length);
  }


  get(path: string, key: string) {
    return this.db.object(path + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(path: string, contact: any, key?: string) {
    return new Promise((resolve, reject) => {
      if (key) {
        this.db.list(path)
          .set(key, contact)
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(path)
          .push(contact)
          .then(() => resolve());
      }
    })
  }

  remove(path: string, key: string) {
    return this.db.list(path).remove(key);
  }
}