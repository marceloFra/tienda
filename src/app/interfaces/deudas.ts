import { DocumentReference } from '@angular/fire/firestore';

export interface Deudas {
  cantidad: string;
  cliente: DocumentReference;
  descripcion: string;
  fecha: Date;
  total: number;
}
