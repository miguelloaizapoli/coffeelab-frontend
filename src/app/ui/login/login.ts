import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = { ...this.loginForm.value };

      this.authService.login(formData).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Bienvenido',
            text: 'Login exitoso ',
            icon: 'success',
            confirmButtonText: 'Continuar'
          }).then(() => {
            // guardar usuario
            localStorage.setItem('user', JSON.stringify(res.user));

            // redirigir
            this.router.navigate(['/home']);
          });
        },
        error: (err) => {
          console.error(err);

          Swal.fire({
            title: 'Error',
            text: err.error?.message || 'Credenciales incorrectas',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}