import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈
import { ProductService } from '../services/productService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // 👈
  templateUrl: './products.html'
})
export class Products implements OnInit {

  products: any[] = [];
  productosFiltrados: any[] = [];
  busqueda: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.productosFiltrados = data; // 👈
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }

  filtrar() {
    const texto = this.busqueda.toLowerCase();
    this.productosFiltrados = this.products.filter(p =>
      p.name.toLowerCase().includes(texto) ||
      p.price.toString().includes(texto) ||
      p.stock.toString().includes(texto)
    );
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire('Eliminado', 'Producto eliminado', 'success');
          this.getProducts();
        });
      }
    });
  }
}