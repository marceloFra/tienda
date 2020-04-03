import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagos } from '../interfaces/pagos';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private itemsCollection: AngularFirestoreCollection<Client>;
  private itemsCollectionPagos: AngularFirestoreCollection<Pagos>;
client:any;
  cliente: Observable<Client[]>;
  private itemDoc: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollectionPagos = afs.collection<Pagos>('pagos');

    this.itemsCollection = afs.collection<Client>('cliente');
    this.cliente = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };

    })
      ));

   }

   getClient() {
    return this.cliente;
   }
   AddClient(item: Client) {
    this.itemsCollection.add(item);
    this.itemsCollection = this.afs.collection<Client>('cliente', ref => ref.where('apellidos','==',item.apellidos)
    .where('nombre','==',item.nombre));

    console.log('cliente recien creado')
    console.log(this.client);


  }

  deleteClient(cli){
    this.itemDoc = this.afs.doc<Client>(`cliente/${cli.id}`);
    this.itemDoc.delete();
  }
  editClient(cli){
    this.itemDoc = this.afs.doc<Client>(`cliente/${cli.id}`);
    this.itemDoc.update(cli);
  }
}
