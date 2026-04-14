import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VentaService } from '../services/ventaService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {

  ventas: any[] = [];

  constructor(private ventaService: VentaService) {}

  ngOnInit() {
    this.getVentas();
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
