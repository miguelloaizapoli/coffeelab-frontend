import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/productService.service';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
})
export class CreateProduct {

  createProductForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.createProductForm.valid) {
      const formData = { ...this.createProductForm.value };

      this.productService.createProduct(formData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Creado',
            text: 'Producto creado exitosamente ',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.goBack();
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: 'Error',
            text: err.error?.message || 'Error al crear producto',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}