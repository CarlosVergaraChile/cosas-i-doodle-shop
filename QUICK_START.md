# INICIO RAPIDO - Cosas I Doodle (5 PASOS FACILES)

## PASO 1: Registrarse en Stripe (5 min) - GRATIS

1. Ir a: https://dashboard.stripe.com/register
2. Email, contrasena, datos del negocio
3. Verificar email
4. **Copiar Publishable Key** (pk_test_...)
5. Guardar en un lugar seguro

Costos: $0 USD

## PASO 2: Actualizar config.js con tu key (2 min)

1. Abrir `config.js`
2. Reemplazar: `pk_test_sua_clave_publica_aqui`
3. Con tu verdadera key de Stripe
4. Guardar

## PASO 3: Subir archivos a Hostinger (5 min)

1. Ir a Hostinger Panel: https://hpanel.hostinger.com
2. File Manager
3. Crear carpeta: `public_html/cosas-i-doodle/`
4. Subir:
   - `index.html`
   - `config.js`
   - Carpeta `css/`
   - Carpeta `js/`
   - Tus ilustraciones en `img/`

## PASO 4: Agregar tus ilustraciones (10 min)

1. Crear carpeta: `img/illustrations/`
2. Subir PNG/JPG de Monica Silva Ricci
3. Actualizar `config.js` con datos:
   ```javascript
   {
     id: 'ilustracion_1',
     name: 'Tu Ilustracion',
     price: 1000, // en centavos ($10)
     image: 'img/illustrations/nombre.jpg',
     downloadUrl: 'downloads/ilustracion_1.zip'
   }
   ```

## PASO 5: LIVE! Probar tienda (5 min)

1. Acceder: `https://tudominio.com/cosas-i-doodle/`
2. Ver ilustraciones
3. Click "Comprar"
4. MODO TEST (no cobran): Usar tarjeta `4242 4242 4242 4242`
5. Cualquier fecha futura
6. Cualquier CVC
7. Click comprar!

## LISTO!

Tu tienda esta VIVA. Cada venta te da dinero directo.

Proximo paso: Leer STRIPE_SETUP.md para detalles sobre:
- Webhooks (descargas automaticas)
- Modo Production (cobrar de verdad)
- Tarjetas reales vs prueba

## Soporte

- README.md - Documentacion general
- STRIPE_SETUP.md - Guia Stripe completa
- DEPLOYMENT.md - Deployment en Hostinger
- config.js - Configuracion de productos

Todo GRATIS. Todo SEGURO. Listo para usar.
