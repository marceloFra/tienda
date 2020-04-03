import { Component, OnInit } from '@angular/core';
import { Deudas } from 'src/app/interfaces/deudas';
import { DeudasService } from 'src/app/services/deudas.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css']
})
export class DeudasComponent implements OnInit {
  deudas : Deudas[];
  idcliente:any;
  idDeuda: any;
  fecha: any;
   registerForm: FormGroup;
  editForm: FormGroup;


  constructor(private db: AngularFirestore,
              private service: DeudasService,
              private formBuilder: FormBuilder,
              private formBuilderEdit: FormBuilder,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      descripcion: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
       total: new FormControl( '', [Validators.required, Validators.pattern('^([0-9]{1,4})?(\.[0-9]{1,2})?$')]),
    });
    this.editForm = this.formBuilderEdit.group({
      descripcion: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
       total: new FormControl( '', [Validators.required, Validators.pattern('^([0-9]{1,4})?(\.[0-9]{1,2})?$')]),
    });
    this.idcliente = this.route.snapshot.paramMap.get('idcliente');
    this.service.getDeudas(this.idcliente).subscribe( deudas => {
      this.deudas = deudas;
    });
  }

  get f(): any {
    return this.registerForm.controls;
  }
  get g(): any {
    return this.editForm.controls;
  }

  onSubmit(){
    if (this.registerForm.invalid) {
      return;
    }
    //      property: firebase.firestore().doc(`/properties/${propertyId}`),

    this.service.AddDeuda({  cantidad: this.registerForm.value.cantidad,
                             cliente: this.db.doc('cliente/'+this.idcliente).ref,
                             descripcion: this.registerForm.value.descripcion,
                             fecha: new Date(),
                             total: this.registerForm.value.total});
    this.f.cantidad.clearValidators();
    this.f.descripcion.clearValidators();
    this.f.total.clearValidators();
    this.f.cantidad.reset();
    this.f.descripcion.reset();
    this.f.total.reset();
  }

  eliminar(item){
    Swal.fire({
      title: 'Desea Eliminar la deuda '+ item.name +'?',
     // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteDeudas(item);
        Swal.fire(
          'Eliminado!',
          'La deuda fue eliminado correctamete',
          'success'
        ); }
    });
   // this.service.deleteProduct(item);
  }

  editar(item) {

   this.idDeuda = item.id;
   this.fecha = item.fecha;
   this.editForm.setValue({
      descripcion: item.descripcion,
      cantidad: item.cantidad,
       total: item.total   });
  }

  OnSubmitEdit(){
    if (this.editForm.invalid) {
      return;
    }
    this.service.editDeudas({ id: this.idDeuda,
                               cantidad: this.editForm.value.cantidad ,
                               //cliente: 'cliente/'+this.idcliente;
                               descripcion: this.editForm.value.descripcion,
                              // fecha: this.fecha,
                               total: this.editForm.value.total });
    $("#exampleModal").modal("toggle");
   }

}
