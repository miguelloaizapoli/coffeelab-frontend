import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../services/clienteService.service';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.scss'
})
export class CreateClienteComponent {

  createClienteForm!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.createClienteForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      telefono: new FormControl(''),
    });
  }

  onSubmit(): void {
    if (this.createClienteForm.valid) {
      this.clienteService.createCliente(this.createClienteForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Creado',
            text: 'Cliente creado exitosamente 🔥',
            icon: 'success',
          }).then(() => this.location.back());
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al crear cliente', 'error');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
