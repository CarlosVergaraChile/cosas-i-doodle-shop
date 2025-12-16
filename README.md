# Cosas I Doodle - Tienda de Ilustraciones Digitales

> Tienda electronica minimalista para vender ilustraciones digitales creadas en iPad por Monica Silva Ricci

## Caracteristicas

- Diseno Minimalista: Interfaz limpia que destaca las ilustraciones
- Galeria Responsiva: Visualizacion optima en desktop, tablet y movil
- Pagos Gratis: Integracion con Mercado Pago (sin costos iniciales)
- Descargas Instantaneas: Entrega automatica post-pago
- Confirmaciones Automaticas: EmailJS para notificaciones
- SEO Optimizado: Meta tags y estructura semantica
- Carrito de Compras: JavaScript vanilla, sin librerias pesadas

## Estructura del Proyecto

```
cosas-i-doodle-shop/
├── index.html          # Pagina principal
├── shop.html           # Tienda y galeria
├── cart.html           # Carrito de compras
├── css/
│  ├── styles.css       # Estilos principales
│  ├── responsive.css  # Media queries
│  └── animations.css  # Animaciones CSS3
├── js/
│  ├── main.js         # Logica principal
│  ├── cart.js         # Gestion carrito
│  ├── payment.js      # Integracion Mercado Pago
│  └── email.js        # EmailJS
├── img/
│  ├── hero/           # Imagenes hero
│  ├── illustrations/  # Ilustraciones para venta
│  └── icons/          # Iconos SVG
├── data/
│  └── illustrations.json  # Catalogo de ilustraciones
├── README.md
└── config.js          # Configuracion (no subir a Github)
```

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Pagos**: Mercado Pago API
- **Email**: EmailJS (gratis - 200 emails/mes)
- **Analytics**: Google Analytics 4
- **Almacenamiento**: localStorage para carrito
- **Hosting**: Hostinger

## Instalacion y Despliegue

### Requisitos
- Hosting con soporte HTML/CSS/JS (Hostinger, etc.)
- Cuenta Mercado Pago (gratis en mercadopago.com)
- Cuenta EmailJS (gratis en emailjs.com)

### Pasos de Instalacion

1. Crear carpeta en Hostinger: `/cosas-i-doodle/`
2. Subir todos los archivos HTML, CSS, JS
3. Configurar credenciales en `config.js`
4. Acceder a: `https://tudominio.com/cosas-i-doodle/`

## Estrategia de Marketing

### Canales Gratis
- **Instagram**: Portfolio visual + Stories de proceso
- **Pinterest**: Pins de cada ilustracion (alto SEO)
- **TikTok**: Videos cortos del proceso creativo iPad
- **Google My Business**: Ficha de negocio
- **SEO**: Palabras clave: "ilustraciones digitales iPad", "arte digital Chile"

### Estrategia de Precios

| Producto | Precio | Tipo |
|----------|--------|------|
| Ilustracion Individual | $8-15 USD | Personal |
| Pack 3 Ilustraciones | $20-35 USD | Personal |
| Licencia Comercial | $25-120 USD | Comercial |
| Colecciones Completas | Premium | Custom |

## Licencia

Ilustraciones © Monica Silva Ricci
Codigo © Carlos Vergara - MIT License

## 💳 Integración con Payment Gateway Standard (Código RED)

Este proyecto utiliza el framework standardizado `payment-gateway-standard` para procesamiento de pagos. Esto permite reutilizar la lógica de pagos en todos los proyectos de CarlosVergaraChile.

### Pasarelas Soportadas

- **Flow** (Recomendado para CLP - 1.49% comisión)
- **Global66** (Pagos internacionales - múltiples monedas)
- **Mercado Pago** (Opción actual - regional)
- **PayPal** (Fallback - alcance global)

### Configuración

Para cambiar entre pasarelas de pago, actualiza las credenciales en tu archivo `.env`:

```bash
PAYMENT_PROVIDER=flow          # o 'global66', 'paypal', 'mercadopago'
FLOW_MERCHANT_ID=tu_id
FLOW_API_KEY=tu_clave
```

Ver [payment-gateway-standard](https://github.com/CarlosVergaraChile/payment-gateway-standard) para documentación completa.

### Migración de Mercado Pago a Flow

Para mejorar márgenes (Flow cuesta 1.49% vs MP 2.5%+):

1. Crear cuenta en [flow.cl](https://www.flow.cl)
2. Actualizar credenciales en `.env`
3. Cambiar `PAYMENT_PROVIDER=flow`
4. Probar en ambiente sandbox antes de producción

### Código RED: Reutilizable, Escalable, Documentado

Este proyecto sigue el criterio de diseño RED:
- ✅ **Reutilizable**: Pasarela de pagos compartida con otros proyectos
- ✅ **Escalable**: Agrega nuevas pasarelas sin cambiar código
- ✅ **Documentado**: README, comments en código, guías de integración
