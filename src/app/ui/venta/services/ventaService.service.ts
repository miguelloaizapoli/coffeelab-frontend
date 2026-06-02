import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:3000/api/ventas';

  constructor(private http: HttpClient) {}

  getVentas() {
    return this.http.get(this.apiUrl);
  }

  getVentaById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createVenta(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteVenta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getVentasByUser(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}