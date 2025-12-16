/**
 * CODIGO RED - Payment Module
 * Componente reutilizable para integracion Flow.cl
 * Funciona en: Cosas I Doodle, SAM v3.0, SENCE 2026
 * 
 * FLOW.CL: 2.89% + IVA = 3.44% (MAS BARATO QUE STRIPE)
 * Nativo Chile, soporte en espanol, 24h abono
 */

class FlowPayment {
  constructor(options = {}) {
    this.FLOW_API = 'https://www.flow.cl/api';
    this.merchantId = options.merchantId; // Tu merchant ID Flow
    this.apiKey = options.apiKey;         // Tu API Key Flow
    this.productType = options.type;      // 'doodle', 'course', 'training'
    this.successUrl = options.successUrl;
    this.failureUrl = options.failureUrl;
  }

  // Crear sesion de pago en Flow
  async createPaymentSession(product) {
    try {
      const response = await fetch(this.FLOW_API + '/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apiKey: this.apiKey,
          commerceOrder: product.orderId,
          subject: product.title,
          currency: 'CLP', // Flow soporta CLP, USD, MXN, PEN
          amount: Math.round(product.price * 100), // En centavos
          email: product.email,
          urlConfirmation: window.location.origin + '/api/flow-callback',
          urlReturn: this.successUrl,
          optional: product.productId
        })
      });

      const data = await response.json();
      
      if (data.flowOrder) {
        return {
          success: true,
          url: `https://www.flow.cl/pay?token=${data.token}`,
          token: data.token
        };
      } else {
        throw new Error(data.message || 'Error creando sesion');
      }
    } catch (error) {
      console.error('Flow Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Procesar callback de Flow (webhook)
  async verifyPayment(token) {
    try {
      const response = await fetch(this.FLOW_API + '/payment/getStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apiKey: this.apiKey,
          token: token
        })
      });

      const data = await response.json();
      
      return {
        success: data.status === 'PAID',
        status: data.status,
        amount: data.amount,
        orderId: data.commerceOrder,
        paymentDate: data.paymentDate
      };
    } catch (error) {
      console.error('Flow Verification Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Generar link de pago directo (sin redireccionar)
  generatePaymentLink(product) {
    const params = new URLSearchParams({
      commerceOrder: product.orderId,
      subject: product.title,
      amount: Math.round(product.price * 100),
      email: product.email,
    });

    return `https://www.flow.cl/pay?${params.toString()}`;
  }

  // Reembolso (devoluciones)
  async refundPayment(refundData) {
    try {
      const response = await fetch(this.FLOW_API + '/refund/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apiKey: this.apiKey,
          commerceOrder: refundData.orderId,
          amount: Math.round(refundData.amount * 100),
          reason: refundData.reason || 'Reembolso solicitado'
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Refund Error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ============= USO EN CADA PROYECTO =============

// COSAS I DOODLE - Comprar ilustracion
function buyIllustration(illustration) {
  const flow = new FlowPayment({
    merchantId: CONFIG.FLOW_MERCHANT_ID,
    apiKey: CONFIG.FLOW_API_KEY,
    type: 'doodle',
    successUrl: window.location.origin + '/success.html',
    failureUrl: window.location.origin + '/'
  });

  const product = {
    orderId: `DOODLE-${Date.now()}`,
    title: illustration.name,
    price: illustration.price / 100, // convertir de centavos
    email: prompt('Tu email:'),
    productId: illustration.id
  };

  flow.createPaymentSession(product).then(session => {
    if (session.success) {
      window.location.href = session.url;
    } else {
      alert('Error: ' + session.error);
    }
  });
}

// SAM V3.0 - Comprar curso
function enrollCourse(course) {
  const flow = new FlowPayment({
    merchantId: CONFIG.FLOW_MERCHANT_ID,
    apiKey: CONFIG.FLOW_API_KEY,
    type: 'course',
    successUrl: window.location.origin + '/enrolled.html',
    failureUrl: window.location.origin + '/courses'
  });

  const product = {
    orderId: `SAM-${Date.now()}`,
    title: course.name,
    price: course.price / 100,
    email: getCurrentUserEmail(),
    productId: course.id
  };

  flow.createPaymentSession(product).then(session => {
    if (session.success) {
      window.location.href = session.url;
    }
  });
}

// SENCE 2026 - Inscribirse a capacitacion
function enrollTraining(training) {
  const flow = new FlowPayment({
    merchantId: CONFIG.FLOW_MERCHANT_ID,
    apiKey: CONFIG.FLOW_API_KEY,
    type: 'training',
    successUrl: window.location.origin + '/registration-complete',
    failureUrl: window.location.origin + '/training'
  });

  const product = {
    orderId: `SENCE-${Date.now()}`,
    title: training.name,
    price: training.price / 100,
    email: getUserEmail(),
    productId: training.id
  };

  flow.createPaymentSession(product);
}

// Exportar para uso en modulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FlowPayment;
}
