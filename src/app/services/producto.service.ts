import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private itemsCollection: AngularFirestoreCollection<Product>;
  product: Observable<Product[]>;
  private itemDoc: AngularFirestoreDocument<Product>;


  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Product>('producto');
    this.product = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };

    })
      ));
  }

  getProduct() {
    return this.product;
   }


   AddProduct(item: Product) {
    this.itemsCollection.add(item);
  }

  deleteProduct(prod){
    this.itemDoc = this.afs.doc<Product>(`producto/${prod.id}`);
    this.itemDoc.delete();
  }

  editProduct(prod){
    console.log('producto que llega al serveicio ' )
    console.table(prod)
    this.itemDoc = this.afs.doc<Product>(`producto/${prod.id}`);
    this.itemDoc.update(prod);
  }

}
