# Flow.cl Integration Guide

> Pasarela de Pagos Oficial para **Cosas I Doodle**, **SAM v3.0**, y **Proyecto SENCE 2026**

## 🎪 Intro

Flow.cl es la pasarela de pagos recomendada para todos nuestros proyectos en Chile y Latinoamérica porque:

- ✅ **Local**: Optimizada para Chile (soporte, fiscalidad, moneda)
- ✅ **Barato**: 2.89% + IVA (más barato que Stripe en Latam)
- ✅ **Fácil**: Integración simple con webhook
- ✅ **Seguro**: Certificado SSL/TLS, PCI DSS
- ✅ **Grátis**: Sin costo setup, solo comisión por transacción

## 🛠️ Setup Inicial

### Paso 1: Registrarse en Flow.cl

1. Ir a https://www.flow.cl/account/register
2. Rellenar formulario (email, nombre, empresa)
3. Verificar email
4. Completar KYC (datos bancarios, RFC/RUT)
5. Esperar aprobación (24-48 horas)

### Paso 2: Obtener Credenciales

En el dashboard de Flow.cl:

1. Ir a **Mi Cuenta → Configuración**
2. Copiar:
   - **API Key** (Clave de Integración)
   - **API Secret** (Clave Secreta)
   - **Merchant ID** (Código de Comerciante)

**NUNCA** commitear estas credenciales. Usar variables de ambiente.

### Paso 3: Guardar en GitHub Secrets

```bash
# En GitHub Settings → Secrets and variables → Actions

FLOW_API_KEY=xxx
FLOW_API_SECRET=yyy
FLOW_MERCHANT_ID=zzz
```

## 💫 Integración en Frontend

### 1. Cargar Script de Flow

```html
<!-- En index.html -->
<script src="https://www.flow.cl/merchant.js"></script>
<script src="./js/payment.js"></script> <!-- FlowPayment module -->
```

### 2. Crear Orden de Pago

```javascript
// js/payment.js - Módulo Reutilizable

class FlowPayment {
  constructor(merchantId, apiKey) {
    this.merchantId = merchantId;
    this.apiKey = apiKey;
  }

  async createOrder(amount, description, email) {
    // 1. Hacer POST a /api/createOrder
    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        description,
        email,
        merchantId: this.merchantId
      })
    });

    const { flowUrl } = await response.json();
    
    // 2. Redirigir a Flow para completar pago
    window.location.href = flowUrl;
  }
}

const payment = new FlowPayment(
  import.meta.env.VITE_FLOW_MERCHANT_ID,
  import.meta.env.VITE_FLOW_API_KEY
);
```

### 3. Llamar en Carrito

```javascript
// En main.js - Cart checkout

document.getElementById('btn-checkout').addEventListener('click', async () => {
  const { total, items, userEmail } = cart.getState();
  
  await payment.createOrder(
    total,
    `Compra Cosas I Doodle: ${items.length} items`,
    userEmail
  );
});
```

## 💪 Backend (Node.js)

### 1. Instalar SDK Flow

```bash
npm install flow-merchant
```

### 2. Crear Endpoint /api/createOrder

```javascript
const FlowMerchant = require('flow-merchant');

const flow = new FlowMerchant(
  process.env.FLOW_API_KEY,
  process.env.FLOW_API_SECRET,
  process.env.FLOW_MERCHANT_ID
);

app.post('/api/createOrder', async (req, res) => {
  const { amount, description, email } = req.body;

  try {
    const order = await flow.createOrder({
      commerceOrder: Date.now(), // ID único
      subject: description,
      amount,
      email,
      paymentMethod: 1, // 1=Tarjeta, 2=Transferencia
      returnUrl: 'https://tudominio.com/success',
      notificationUrl: 'https://tudominio.com/webhook'
    });

    res.json({ flowUrl: order.flowUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### 3. Webhook para Confirmar Pago

```javascript
app.post('/webhook', express.text(), async (req, res) => {
  const { token } = req.body;

  try {
    const payment = await flow.getPaymentStatus(token);
    
    if (payment.status === 'PAID') {
      // 🎉 Pago confirmado
      // 1. Guardar en base de datos
      // 2. Enviar email de confirmación
      // 3. Generar downloadlink para producto digital
      
      console.log(`Pago confirmado: $${payment.amount}`);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

## 💳 Pruebas

### Modo Sandbox

Flow.cl ofrece entorno de prueba:

```
URL Sandbox: https://sandbox.flow.cl
Usuario Test: test@flow.cl
Password: 123456
```

### Tarjetas de Prueba

| Tipo | Número | Exp | CVV | Estado |
|---|---|---|---|---|
| Visa | 4111111111111111 | 12/25 | 123 | APROBADO |
| Mastercard | 5555555555554444 | 12/25 | 123 | RECHAZADO |

## 🗐️ Configuración de Variables de Ambiente

### `.env.example` (Committear este file)

```bash
# Flow.cl - Credenciales
VITE_FLOW_MERCHANT_ID=tu_merchant_id
VITE_FLOW_API_KEY=tu_api_key_publica
VITE_FLOW_API_SECRET=tu_api_secret_privada

# URLs
VITE_FLOW_RETURN_URL=https://tudominio.com/success
VITE_FLOW_WEBHOOK_URL=https://tudominio.com/api/webhook
```

### `.env.local` (NO committear)

```bash
# Copiar .env.example a .env.local y reemplazar valores reales
```

### `.gitignore` (Asegurar)

```
.env.local
.env.production.local
config.local.js
node_modules/
```

## 📇 Documentación Oficial

- **API Docs**: https://www.flow.cl/api
- **SDK Node**: https://github.com/flujodevapor/flow-merchant-js
- **Comisiones**: https://www.flow.cl/tariffas
- **Soporte**: soporte@flow.cl

## ✅ Checklist de Deployment

- [ ] Registrarse en Flow.cl
- [ ] Completar KYC
- [ ] Obtener credenciales (API Key, Secret, Merchant ID)
- [ ] Guardar en GitHub Secrets
- [ ] Implementar FlowPayment class
- [ ] Crear endpoint /api/createOrder
- [ ] Crear webhook /api/webhook
- [ ] Probar en Sandbox
- [ ] Cambiar a Producción en Flow.cl
- [ ] Verificar que webhook funciona
- [ ] Añadir emails transaccionales

---

**Método de Pago Oficial**: Flow.cl (Reutilizable en todos los proyectos)

**Código Red Reutilizable**: `/js/payment.js` (compartido entre Cosas I Doodle, SAM, SENCE)
