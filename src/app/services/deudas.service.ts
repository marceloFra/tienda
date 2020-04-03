import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Deudas } from '../interfaces/deudas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DeudasService {
  private itemsCollection: AngularFirestoreCollection<Deudas>;
  private itemDoc: AngularFirestoreDocument<Deudas>;

  deudas: Observable<Deudas[]>;
  constructor(private afs: AngularFirestore) {
// https://stackoverflow.com/questions/54857939/how-to-query-firebase-items-with-specific-reference-type

   }

   getDeudas(id:any){
  /*   console.log('id CLIENTE');
     console.log(id); */
     const cliente = firebase.firestore().doc('cliente/'+ id);
     this.itemsCollection = this.afs.collection<Deudas>('deuda', ref => ref.where('cliente', '==', cliente ));
     this.deudas = this.itemsCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         console.table('');
         const data = a.payload.doc.data() as Deudas;
         const id = a.payload.doc.id;
         console.log('DEUDAS');
         console.table(data);

         return { id, ...data };

     })
       ));

     return this.deudas;
   }

   AddDeuda(item: Deudas) {
    this.itemsCollection.add(item);
  }
  deleteDeudas(deuda){
    this.itemDoc = this.afs.doc<Deudas>(`deuda/${deuda.id}`);
    this.itemDoc.delete();
  }

  editDeudas(deuda){
    this.itemDoc = this.afs.doc<Deudas>(`deuda/${deuda.id}`);
    this.itemDoc.update(deuda);
  }


}
