import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get(this.apiUrl);
  }

  getClienteById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCliente(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateCliente(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}