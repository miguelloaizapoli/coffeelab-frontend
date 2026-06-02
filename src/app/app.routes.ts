import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // home route
    {
        path: 'home',
        loadComponent: () => import('./ui/home/home').then(m => m.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./ui/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./ui/register/register').then(m => m.Register)
    },

    // Inventario routes
    {
        path: 'products',
        loadComponent: () => import('./ui/product/products/products').then(m => m.Products)
    },
    {
        path: 'products/create',
        loadComponent: () => import('./ui/product/create-product/create-product').then(m => m.CreateProduct)
    },
    {
        path: 'products/update/:id',
        loadComponent: () => import('./ui/product/update-product/update-product').then(m => m.UpdateProduct)
    },

    // Clientes
    {
        path: 'clientes',
        loadComponent: () => import('./ui/cliente/clientes/clientes.component').then(m => m.ClientesComponent)
    },
    {
        path: 'clientes/create',
        loadComponent: () => import('./ui/cliente/create-cliente/create-cliente.component').then(m => m.CreateClienteComponent)
    },
    {
        path: 'clientes/update/:id',
        loadComponent: () => import('./ui/cliente/update-cliente/update-cliente.component').then(m => m.UpdateClienteComponent)
    },

    // Ventas
    {
        path: 'ventas',
        loadComponent: () => import('./ui/venta/ventas/ventas.component').then(m => m.VentasComponent)
    },
    {
        path: 'ventas/create',
        loadComponent: () => import('./ui/venta/create-venta/create-venta.component').then(m => m.CreateVentaComponent)
    },
    {
        path: 'ventas/historial',
        loadComponent: () => import('./ui/venta/historial-usuario/historial-usuario.component').then(m => m.HistorialUsuarioComponent)
    },

    // Usuarios
    {
        path: 'users',
        loadComponent: () => import('./ui/user/users/users.component').then(m => m.Users)
    },
    {
        path: 'users/update/:id',
        loadComponent: () => import('./ui/user/update-user/update-user.component').then(m => m.UpdateUser)
    },
];