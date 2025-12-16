# Guia de Instalacion y Despliegue - Cosas I Doodle

## Paso 1: Preparar los archivos en Hostinger

### 1.1 Acceder a Hostinger
1. Ingresa a https://hpanel.hostinger.com
2. Busca la seccion "Websites" en el menu lateral
3. Selecciona tu sitio

### 1.2 Crear la carpeta cosas-i-doodle
1. Abre "File Manager"
2. Navega a la carpeta `public_html`
3. Crea una nueva carpeta llamada `cosas-i-doodle`
4. Dentro de esta carpeta, crea tres carpetas:
   - `css/`
   - `js/`
   - `img/`

### 1.3 Subir archivos
1. Descarga el repositorio: git clone https://github.com/CarlosVergaraChile/cosas-i-doodle-shop
2. Sube los archivos a la carpeta correspondiente:
   - index.html a /cosas-i-doodle/
   - css/styles.css a /cosas-i-doodle/css/
   - js/main.js a /cosas-i-doodle/js/

## Paso 2: Configurar Mercado Pago (GRATIS)

1. Crear cuenta en https://www.mercadopago.com
2. Ir a "Credenciales" o "Aplicaciones"
3. Copiar tu `Public Key`
4. En el archivo `js/payment.js`, reemplazar:
   ```javascript
   const MERCADO_PAGO_KEY = 'TU_PUBLIC_KEY_AQUI';
   ```
5. Descargar SDK de Mercado Pago:
   ```html
   <script src="https://secure.mlstatic.com/sdk/javascript/v2/mercadopago.js"></script>
   ```

## Paso 3: Configurar EmailJS (GRATIS - 200 emails/mes)

1. Registrarse en https://emailjs.com
2. Crear un servicio de email (Gmail recomendado)
3. Crear una plantilla de email
4. Copiar credenciales en `js/email.js`:
   ```javascript
   emailjs.init('TU_PUBLIC_KEY');
   ```

## Paso 4: Agregar ilustraciones

1. Crear carpeta `img/illustrations/`
2. Subir archivos PNG o JPG de Monica Silva Ricci
3. Actualizar `js/main.js` con los datos de las ilustraciones:
   ```javascript
   const illustrations = [
     {
       id: 1,
       title: 'Nombre Ilustracion',
       price: 10,
       image: 'img/illustrations/nombre.png',
       description: 'Descripcion'
     }
   ];
   ```

## Paso 5: Testing

1. Acceder a https://tudominio.com/cosas-i-doodle/
2. Verificar que carga correctamente
3. Probar agregar productos al carrito
4. Probar flujo de pago con Mercado Pago
5. Verificar que llegan emails de confirmacion

## Proximos pasos

- [ ] Crear pagina de tienda completa (shop.html)
- [ ] Integrar sistema de descargas
- [ ] Agregar dashboard de administrador
- [ ] Conectar con Google Analytics
- [ ] Hacer marketing en redes sociales
