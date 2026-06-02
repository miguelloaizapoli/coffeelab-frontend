import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VentaService } from '../services/ventaService.service';
import { UserService } from '../../user/services/userService.service';

@Component({
  selector: 'app-historial-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './historial-usuario.component.html',
  styleUrl: './historial-usuario.component.scss'
})
export class HistorialUsuarioComponent implements OnInit {

  ventas: any[] = [];
  user: any = null;
  loading = true;

  // Solo para admin
  empleados: any[] = [];
  empleadoSeleccionadoId: number | null = null;
  empleadoSeleccionado: any = null;

  get esAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  constructor(
    private ventaService: VentaService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.esAdmin) {
      this.userService.getUsers().subscribe({
        next: (data: any) => {
          this.empleados = data.filter((u: any) => u.role === 'empleado');
          this.loading = false;
        },
        error: (err) => {
          console.error('❌ Error al cargar empleados:', err);
          this.loading = false;
        }
      });
    } else {
      this.cargarHistorial(this.user.id);
    }
  }

  onEmpleadoChange() {
    if (!this.empleadoSeleccionadoId) {
      this.ventas = [];
      this.empleadoSeleccionado = null;
      return;
    }
    this.empleadoSeleccionado = this.empleados.find(e => e.id === Number(this.empleadoSeleccionadoId));
    this.loading = true;
    this.cargarHistorial(Number(this.empleadoSeleccionadoId));
  }

  cargarHistorial(userId: number) {
    this.ventaService.getVentasByUser(userId).subscribe({
      next: (data: any) => {
        this.ventas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar historial:', err);
        this.loading = false;
      }
    });
  }

  getTotalGeneral(): number {
    return this.ventas.reduce((acc, v) => acc + Number(v.total), 0);
  }
}
