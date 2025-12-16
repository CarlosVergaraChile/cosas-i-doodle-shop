# Guia de Configuracion Stripe - Pasarela de Pagos GRATIS

## Por que Stripe?

✅ **GRATIS**: Sin cuota mensual, solo 2.2% + $0.30 USD por transaccion
✅ **SEGURO**: PCI DSS Level 1, encriptacion 256-bit, fraude detection
✅ **FACIL**: API simple, Checkout preconstruido, webhook automation
✅ **CONFIABLE**: 10 millones+ de usuarios, $100+ billion procesados
✅ **LATAM**: Soporta tarjetas locales, transferencias bancarias, e-wallets

## Paso 1: Crear cuenta Stripe (5 minutos)

1. Ir a https://dashboard.stripe.com/register
2. Registrarse con email y contraseña
3. Completar datos del negocio
4. Verificar email
5. Dashboard activado!

## Paso 2: Obtener API Keys

1. En el dashboard, ir a: **Developers** > **API Keys**
2. Copiar **Publishable key** (comienza con `pk_test_`)
3. Copiar **Secret key** (comienza con `sk_test_`)

### IMPORTANTE - Seguridad:
- **Publishable key**: Se puede usar en frontend (es pública)
- **Secret key**: NUNCA la subas a GitHub!
- Usaremos config.js con la key publica solo

## Paso 3: Configurar en config.js

```javascript
const CONFIG = {
  STRIPE_PUBLIC_KEY: 'pk_test_tu_key_aqui',
  // ...
};
```

Reemplazar `pk_test_tu_key_aqui` con tu clave real.

## Paso 4: Crear Productos en Stripe

En Stripe Dashboard:
1. Ir a **Products**
2. Click en **+ Add product**
3. Llenar datos:
   - Name: "Ilustracion Digital #1"
   - Price: $10.00
   - Currency: USD
4. Copiar **Price ID** (comienza con `price_`)
5. Actualizar en config.js

## Paso 5: Implementar Stripe Checkout

Nuestra implementacion usa **Stripe Checkout** (forma mas segura):

```html
<!-- Cargar libreria Stripe -->
<script src="https://js.stripe.com/v3/"></script>

<!-- Botton de compra -->
<button onclick="checkout()">Comprar Ahora</button>

<script>
const stripe = Stripe(CONFIG.STRIPE_PUBLIC_KEY);

function checkout() {
  fetch('/create-checkout-session.php', {
    method: 'POST',
    body: JSON.stringify({
      priceId: 'price_tu_product_id',
      quantity: 1
    })
  })
  .then(response => response.json())
  .then(session => stripe.redirectToCheckout({sessionId: session.id}))
  .catch(err => console.error(err));
}
</script>
```

## Paso 6: Backend PHP para Stripe

Crear archivo `stripe-checkout.php`:

```php
<?php
require 'vendor/autoload.php';
\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

$data = json_decode(file_get_contents('php://input'), true);

$session = \Stripe\Checkout\Session::create([
  'payment_method_types' => ['card'],
  'line_items' => [[
    'price' => $data['priceId'],
    'quantity' => $data['quantity'],
  ]],
  'mode' => 'payment',
  'success_url' => 'https://tudominio.com/cosas-i-doodle/success.html',
  'cancel_url' => 'https://tudominio.com/cosas-i-doodle/',
]);

echo json_encode(['id' => $session->id]);
?>
```

## Paso 7: Webhooks para Descargas Automaticas

1. En Stripe Dashboard: **Developers** > **Webhooks**
2. Click **+ Add endpoint**
3. URL: `https://tudominio.com/cosas-i-doodle/webhook.php`
4. Eventos: `checkout.session.completed`
5. Crear webhook
6. Copiar **Signing secret** (comienza con `whsec_`)

## Paso 8: Implementar Webhook

Archivo `webhook.php` - Se ejecuta cuando pago exitoso:

```php
<?php
require 'vendor/autoload.php';
\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';
$endpoint_secret = $_ENV['STRIPE_WEBHOOK_SECRET'];

try {
  $event = \Stripe\Webhook::constructEvent(
    $payload, $sig_header, $endpoint_secret
  );
} catch(Exception $e) {
  http_response_code(400);
  exit();
}

if ($event->type == 'checkout.session.completed') {
  $session = $event->data->object;
  
  // AQUI: Enviar email con link de descarga
  $download_link = generateDownloadLink($session->client_reference_id);
  sendDownloadEmail($session->customer_email, $download_link);
}

http_response_code(200);
?>
```

## Paso 9: Testing

Tarjetas de prueba Stripe (Modo Test):
- Exito: `4242 4242 4242 4242`
- Fallo: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Fecha: Cualquier futura (12/25)
CVC: Cualquier 3 digitos

## Paso 10: Modo Production

Cuando estes listo:
1. En Stripe: **Activate my account**
2. Completar verificacion de negocio
3. Cambiar API keys a Live (`pk_live_`, `sk_live_`)
4. Actualizar config.js
5. SUCCESS_URL y CANCEL_URL DEBEN ser HTTPS

## Costos

✅ **Cero costos iniciales**
✅ **Cero cuota mensual**
✅ **Solo 2.2% + $0.30 por venta** (Ejemplo: Venta de $10 = pagas $0.52)
✅ **Mas barato que Mercado Pago (3.49%)**

## Support

Documentacion oficial: https://stripe.com/docs
