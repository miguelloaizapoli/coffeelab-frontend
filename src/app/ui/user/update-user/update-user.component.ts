import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/userService.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUser implements OnInit {

  updateUserForm!: FormGroup;
  userId!: number;

  constructor(
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.updateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
    });
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data: any) => {
        this.updateUserForm.patchValue({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }

  onSubmit(): void {
    if (this.updateUserForm.valid) {
      this.userService.updateUser(this.userId, this.updateUserForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado',
            text: 'Usuario actualizado exitosamente ',
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