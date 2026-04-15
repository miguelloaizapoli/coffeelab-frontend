import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../services/clienteService.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-cliente.component.html',
  styleUrl: './update-cliente.component.scss'
})
export class UpdateClienteComponent implements OnInit {

  updateClienteForm!: FormGroup;
  clienteId!: number;

  constructor(
    private clienteService: ClienteService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.updateClienteForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      telefono: new FormControl(''),
    });
    this.loadCliente();
  }

  loadCliente(): void {
    this.clienteService.getClienteById(this.clienteId).subscribe({
      next: (data: any) => {
        this.updateClienteForm.patchValue({
          nombre: data.nombre,
          telefono: data.telefono,
        });
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }

  onSubmit(): void {
    if (this.updateClienteForm.valid) {
      this.clienteService.updateCliente(this.clienteId, this.updateClienteForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado',
            text: 'Cliente actualizado exitosamente ',
            icon: 'success',
          }).then(() => this.location.back());
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al actualizar', 'error');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
