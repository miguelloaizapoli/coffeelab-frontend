import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

  user: any = null;
  dashboard: any = {
    productos: 0,
    clientes: 0,
    ventas: 0,
    totalVentas: 0
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadDashboard();
  }

  loadDashboard() {
    this.http.get('http://localhost:3000/api/dashboard').subscribe({
      next: (data: any) => {
        this.dashboard = data;
      },
      error: (err) => console.error('❌ Error:', err)
    });
  }
}
