import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = 'http://localhost:3000/api/products';

    constructor(private http: HttpClient) { }

    // 📄 Obtener productos
    getProducts() {
        return this.http.get(this.apiUrl);
    }

    getProductById(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    // ➕ Crear producto
    createProduct(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    // ✏️ Actualizar producto
    updateProduct(id: number, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    // ❌ Eliminar producto
    deleteProduct(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}