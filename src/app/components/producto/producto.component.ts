import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  editForm: FormGroup;
  registerForm: FormGroup;
  idProduct: any;
  nombre: any;

  products : Product[];
  product: Product = { name: '', precio: 0, unidadMedida: ''};
  constructor(private service: ProductoService, private formBuilder: FormBuilder,private formBuilderEdit: FormBuilder
    ) {
    this.service.getProduct().subscribe( product => {
          this.products = product;
    });
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      precio: new FormControl( '', [Validators.required, Validators.pattern('^([0-9]{1,4})?(\.[0-9]{1,2})?$')]),
      unidadMedida: new FormControl('', [Validators.required]),
    });
    this.editForm = this.formBuilderEdit.group({
      name_: new FormControl({value: ''}, [Validators.required]),
      precio_: new FormControl( {value: ''}, [Validators.required, Validators.pattern('^([0-9]{1,4})?(\.[0-9]{1,2})?$')]),
      unidad_Medida: new FormControl({value: ''}, [Validators.required]),
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
    this.service.AddProduct({name: this.registerForm.value.name,
                            precio: this.registerForm.value.precio,
                            unidadMedida: this.registerForm.value.unidadMedida});
    this.f.name.clearValidators();
    this.f.precio.clearValidators();
    this.f.unidadMedida.clearValidators();
    this.f.name.reset();
    this.f.precio.reset();
    this.f.unidadMedida.reset();
  }


  eliminar(item){
    Swal.fire({
      title: 'Desea Eliminar el producto '+ item.name +'?',
     // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteProduct(item);
        Swal.fire(
          'Eliminado!',
          'El producto fue eliminado correctamete',
          'success'
        ); }
    });
   // this.service.deleteProduct(item);
  }
  editar(item) {
    //console.log('el product9o es '+item.id);
    this.idProduct = item.id;
    this.nombre = item.name;
    this.editForm.setValue({
      name_ : item.name,
      precio_ : item.precio,
      unidad_Medida : item.unidadMedida,
    });
  }

  OnSubmitEdit(){
    if (this.editForm.invalid) {
      return;
    }
    this.service.editProduct({ id: this.idProduct,
                               name: this.editForm.value.name_ ,
                               precio: this.editForm.value.precio_,
                               unidadMedida: this.editForm.value.unidad_Medida });
  }

}
