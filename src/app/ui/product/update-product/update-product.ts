import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/productService.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.html',
})
export class UpdateProduct implements OnInit {

  updateProductForm!: FormGroup;
  productId!: number;

  constructor(
    private productService: ProductService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  createForm(): void {
    this.updateProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data: any) => {
        this.updateProductForm.patchValue({
          name: data.name,
          price: data.price,
          stock: data.stock,
        });
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }

  onSubmit(): void {
    if (this.updateProductForm.valid) {
      const formData = { ...this.updateProductForm.value };

      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado',
            text: 'Producto actualizado exitosamente 🔥',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.goBack();
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error?.message || 'Error al actualizar producto',
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