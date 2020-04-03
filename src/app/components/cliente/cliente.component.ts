import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Client } from 'src/app/interfaces/client';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  idCliente: any;
  nombre: any;

  editForm: FormGroup;
  registerForm: FormGroup;
  clients : Client[];
  constructor(private service: ClientesService,
              private formBuilder: FormBuilder,
              private formBuilderEdit: FormBuilder,
              private router: Router) {
    this.service.getClient().subscribe( cliente => {
      this.clients = cliente;
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl( '', [Validators.required]),
     });
     this.editForm = this.formBuilderEdit.group({
      nombre: new FormControl({value: ''},  [Validators.required]),
      apellidos: new FormControl( {value: ''}, [Validators.required]),
     });
  }

  get f(): any {
    return this.registerForm.controls;
  }
  get e(): any {
    return this.editForm.controls;
  }

  onSubmit(){
    if (this.registerForm.invalid) {
      return;
    }
    this.service.AddClient({nombre: this.registerForm.value.nombre,
                            apellidos: this.registerForm.value.apellidos,
                             });
    this.f.nombre.clearValidators();
    this.f.apellidos.clearValidators();
    this.f.nombre.reset();
    this.f.apellidos.reset();
   }


   eliminar(item){
    Swal.fire({
      title: 'Desea Eliminar el cliente '+ item.nombre +'?',
     // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteClient(item);
        Swal.fire(
          'Eliminado!',
          'El cliente fue eliminado correctamente',
          'success'
        ); }
    });
   // this.service.deleteProduct(item);
  }

  editar(item) {
     console.log('el cliente es ');
     console.table(item);
    this.idCliente = item.id;
    this.nombre = item.nombre;
    this.editForm.setValue({
      nombre : item.nombre,
      apellidos : item.apellidos,
    });
   }

   OnSubmitEdit(){
    if (this.editForm.invalid) {
      return;
    }
    this.service.editClient({ id: this.idCliente,
                               nombre: this.editForm.value.nombre ,
                               apellidos: this.editForm.value.apellidos });
    $("#exampleModal").modal("toggle");
    }
   deudas(item){
    this.router.navigate(['/deudas/' + item]);
   }
}
