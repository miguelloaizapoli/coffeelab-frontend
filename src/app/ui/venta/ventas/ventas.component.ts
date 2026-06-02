import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VentaService } from '../services/ventaService.service';
import { ProductService } from '../../product/services/productService.service';
import Swal from 'sweetalert2';

const LOW_STOCK_THRESHOLD = 10;

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {

  ventas: any[] = [];

  constructor(
    private ventaService: VentaService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getVentas();
    this.checkLowStock();
  }

  checkLowStock() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        const lowStock = data.filter((p: any) => p.stock <= LOW_STOCK_THRESHOLD);
        if (lowStock.length === 0) return;

        const lista = lowStock
          .map((p: any) => `<li><strong>${p.name}</strong> — Stock: <span style="color:#e74c3c;font-weight:bold;">${p.stock}</span></li>`)
          .join('');

        Swal.fire({
          title: '⚠️ Stock bajo detectado',
          html: `<p>Los siguientes productos tienen stock igual o inferior a ${LOW_STOCK_THRESHOLD} unidades:</p><ul style="text-align:left;margin-top:0.5rem;">${lista}</ul>`,
          icon: 'warning',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#C8A24A'
        });
      },
      error: (err) => console.error('❌ Error al verificar stock:', err)
    });
  }

  getVentas() {
    this.ventaService.getVentas().subscribe({
      next: (data: any) => {
        this.ventas = data;
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }

  deleteVenta(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.deleteVenta(id).subscribe(() => {
          Swal.fire('Eliminada', 'Venta eliminada', 'success');
          this.getVentas();
        });
      }
    });
  }

}
