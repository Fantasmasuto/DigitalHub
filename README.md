# DigitalHub - Marketplace de Servicios Digitales

Marketplace profesional para venta de plataformas de streaming, videojuegos, recargas y servicios digitales.

## Stack Tecnológico

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Payments**: Stripe + transferencias manuales + QR
- **State**: Zustand (cart)
- **Charts**: Recharts
- **Deployment**: Vercel-compatible

## Funcionalidades

### Sitio Público
- Landing page con hero, categorías y productos destacados
- 6 categorías: Streaming, Música, Gaming, Recargas, Gift Cards, Otros
- Búsqueda de productos
- Detalle de producto con galería, descripción, FAQ, reseñas
- Carrito lateral (sidebar) con persistencia local
- Modo oscuro / claro

### Autenticación (Supabase Auth)
- Email/password
- Google OAuth
- Recuperación de contraseña
- Middleware para protección de rutas

### Cuenta de Usuario
- Perfil editable (nombre, avatar, teléfono)
- Historial de pedidos
- Favoritos

### Checkout
- 3 métodos de pago: Stripe, Transferencia bancaria, QR
- Sistema de cupones (WELCOME10, SAVE5)
- Subir comprobante de pago (transferencias)
- Pedido pendiente de validación para pagos manuales

### Panel Admin (`/admin`)
- **Dashboard**: ventas totales, pedidos hoy, usuarios, ticket promedio, gráficas mensuales, pie chart por categoría, top productos, pedidos recientes
- **Productos**: CRUD completo, categorías, tipos, stock, precios, estado, búsqueda
- **Pedidos**: gestión de estados, aprobar transferencias, entregar credenciales manualmente
- **Clientes**: base de clientes, valor por cliente, historial
- **Reportes**: ventas diarias/mensuales, revenue por categoría, exportar CSV/PDF
- **Cupones**: CRUD, códigos, tipos descuento, usos, expiración

## Estructura del Proyecto

```
src/
├── app/
│   ├── (storefront)/          # Rutas públicas con Header/Footer
│   │   ├── page.tsx           # Home/Landing
│   │   ├── product/[slug]/    # Detalle producto
│   │   ├── checkout/          # Checkout
│   │   └── account/           # Mi Cuenta
│   ├── admin/                 # Panel Admin
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── clients/
│   │   ├── reports/
│   │   └── coupons/
│   ├── auth/                  # Autenticación
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── callback/
│   └── api/                   # API Routes
│       └── webhooks/stripe/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer
│   ├── products/              # ProductCard, ProductDetail
│   ├── cart/                  # CartSidebar
│   ├── home/                  # HomeContent
│   └── shared/                # Skeletons, shared components
├── lib/
│   ├── supabase/              # Client, Server, Middleware
│   ├── stripe.ts
│   ├── constants.ts
│   ├── demo-data.ts
│   └── utils.ts
├── store/
│   └── cart-store.ts          # Zustand cart store
├── types/
│   └── index.ts               # TypeScript types
└── middleware.ts               # Auth middleware
```

## Base de Datos

El esquema incluye:
- `categories`, `products`, `product_variants`
- `profiles` (extends auth.users)
- `orders`, `order_items`, `payments`
- `manual_payment_receipts`
- `cart_items`, `favorites`
- `reviews`, `notifications`
- `coupons`, `inventory`
- `sales_analytics`, `admin_logs`

Con:
- Row Level Security (RLS) policies
- Triggers para auto-crear perfiles, actualizar timestamps, generar números de pedido, actualizar analytics
- Índices optimizados

## Setup

### Requisitos previos
- Node.js 20+
- Cuenta Supabase
- Cuenta Stripe (para pagos)

### Instalación

```bash
# Clonar e instalar
git clone <repo-url>
cd digitalhub
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

### Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a SQL Editor y ejecutar `supabase/schema.sql`
3. Ejecutar `supabase/seed.sql` para datos demo
4. Copiar las credenciales a `.env.local`
5. Habilitar Google OAuth en Authentication > Providers (opcional)

### Configurar Stripe

1. Obtener API keys de [dashboard.stripe.com](https://dashboard.stripe.com)
2. Configurar webhook endpoint: `https://tu-dominio.com/api/webhooks/stripe`
3. Agregar keys a `.env.local`

## Deployment (Vercel)

```bash
# Build de producción
npm run build

# O deploy directo a Vercel
vercel --prod
```

Variables de entorno necesarias en Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## Cupones Demo

| Código | Descuento | Mínimo |
|--------|-----------|--------|
| WELCOME10 | 10% | $0 |
| SAVE5 | $5 fijo | $10 |

## Licencia

MIT
