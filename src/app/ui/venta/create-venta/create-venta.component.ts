import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { VentaService } from '../services/ventaService.service';
import { ClienteService } from '../../cliente/services/clienteService.service';
import { ProductService } from '../../product/services/productService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-venta.component.html',
  styleUrl: './create-venta.component.scss'
})
export class CreateVentaComponent {

  clientes: any[] = [];
  productos: any[] = [];
  clienteSeleccionado: any = null;
  productosSeleccionados: any[] = [];

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadClientes();
    this.loadProductos();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data: any) => this.clientes = data,
      error: (err) => console.error(err)
    });
  }

  loadProductos() {
    this.productService.getProducts().subscribe({
      next: (data: any) => this.productos = data,
      error: (err) => console.error(err)
    });
  }

  seleccionarCliente(event: any) {
    const id = Number(event.target.value);
    this.clienteSeleccionado = this.clientes.find(c => c.id === id);
  }

  agregarProducto(event: any) {
    const id = Number(event.target.value);
    const producto = this.productos.find(p => p.id === id);

    if (!producto) return;

    const existe = this.productosSeleccionados.find(p => p.producto_id === id);
    if (existe) {
      Swal.fire('Aviso', 'El producto ya fue agregado', 'info');
      return;
    }

    this.productosSeleccionados.push({
      producto_id: producto.id,
      nombre: producto.name,
      precio_unitario: producto.price,
      cantidad: 1,
      stock: producto.stock
    });
  }

  actualizarCantidad(index: number, event: any) {
    const cantidad = Number(event.target.value);
    if (cantidad > 0 && cantidad <= this.productosSeleccionados[index].stock) {
      this.productosSeleccionados[index].cantidad = cantidad;
    }
  }

  eliminarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
  }

  getTotal(): number {
    return this.productosSeleccionados.reduce((sum, p) => sum + (p.cantidad * p.precio_unitario), 0);
  }

  getPuntosGanados(): number {
    return Math.floor(this.getTotal() / 1000);
  }

  onSubmit() {
    if (!this.clienteSeleccionado) {
      Swal.fire('Error', 'Selecciona un cliente', 'error');
      return;
    }

    if (this.productosSeleccionados.length === 0) {
      Swal.fire('Error', 'Agrega al menos un producto', 'error');
      return;
    }

    const data = {
      cliente_id: this.clienteSeleccionado.id,
      productos: this.productosSeleccionados.map(p => ({
        producto_id: p.producto_id,
        cantidad: p.cantidad,
        precio_unitario: p.precio_unitario
      }))
    };

    this.ventaService.createVenta(data).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Venta registrada 🔥',
          text: `Total: $${this.getTotal()} — Puntos ganados: ${res.puntosGanados}`,
          icon: 'success'
        }).then(() => this.location.back());
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Error al registrar venta', 'error');
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
