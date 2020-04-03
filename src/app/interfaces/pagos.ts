import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface Pagos {
  cliente: DocumentReference;
  deuda: number;
  pago: number;
}
