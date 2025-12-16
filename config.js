// CONFIG - STRIPE INTEGRATION
// DECISION: Stripe Checkout es GRATIS, SEGURO y FACIL
// - Sin cuota mensual, solo 2.2% + $0.30 por transaccion
// - PCI DSS Level 1 (maximo nivel de seguridad)
// - Manejo automatico de impuestos y fraude
// - Webhooks para descargas automaticas

const CONFIG = {
  // Stripe Public Key (REEMPLAZAR CON TU KEY)
  STRIPE_PUBLIC_KEY: 'pk_test_sua_clave_publica_aqui',
  
  // Base URL para webhooks
  API_BASE: 'https://api.stripe.com/v1',
  
  // Email para confirmaciones
  BUSINESS_EMAIL: 'monica@cosasidoodle.com',
  
  // Configuracion de productos
  PRODUCTS: [
    {
      id: 'ilustracion_1',
      name: 'Ilustracion Digital #1',
      price: 1000, // en centavos USD ($10)
      currency: 'usd',
      image: 'img/illustrations/thumb1.jpg',
      downloadUrl: 'downloads/ilustracion_1.zip',
      description: 'Ilustracion original creada en iPad'
    },
    {
      id: 'pack_3',
      name: 'Pack 3 Ilustraciones',
      price: 2500, // en centavos USD ($25)
      currency: 'usd',
      image: 'img/illustrations/pack3.jpg',
      downloadUrl: 'downloads/pack_3.zip',
      description: 'Pack de 3 ilustraciones exclusivas'
    },
    {
      id: 'coleccion',
      name: 'Coleccion Completa',
      price: 5000, // en centavos USD ($50)
      currency: 'usd',
      image: 'img/illustrations/coleccion.jpg',
      downloadUrl: 'downloads/coleccion_completa.zip',
      description: 'Coleccion completa (15+ ilustraciones)'
    }
  ],
  
  // URLs importantes
  SUCCESS_URL: 'https://tudominio.com/cosas-i-doodle/success.html',
  CANCEL_URL: 'https://tudominio.com/cosas-i-doodle/index.html'
};

// Exportar config si se usa en modulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
