# 🔄 Integración Real de Yape (Futuro)

Esta documentación explica cómo integrar la **API real de Yape** cuando estés listo para producción.

## Estado Actual

Actualmente, la plataforma:
- ✅ Permite usuarios subir comprobantes manualmente
- ✅ El admin verifica visualmente
- ✅ Sistema funcional de demostración

## Integración Real de Yape

### Opción 1: API Oficial de Yape (Recomendado)

#### Pasos:

1. **Contactar a Yape**
   - Enviar correo a: developers@yape.com.pe
   - Solicitar acceso al programa para comerciantes
   - Esperar aprobación y credenciales

2. **Obtener Credenciales**
   - `MERCHANT_ID`: Tu ID como comerciante
   - `MERCHANT_KEY`: Clave secreta
   - `API_URL`: URL de Yape API

3. **Implementar en Backend**

```javascript
// api/services/yapeService.js
const axios = require('axios');

const yapeAPI = axios.create({
  baseURL: process.env.YAPE_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.YAPE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Generar QR de pago
async function generarQRPago(monto, referencia) {
  try {
    const response = await yapeAPI.post('/createQR', {
      amount: monto,
      reference: referencia,
      description: 'Apuesta Deportiva - JIJASBET'
    });
    return response.data;
  } catch (error) {
    console.error('Error generando QR:', error);
    throw error;
  }
}

// Verificar transacción
async function verificarTransaccion(numeroTransaccion) {
  try {
    const response = await yapeAPI.get(`/transaction/${numeroTransaccion}`);
    return response.data;
  } catch (error) {
    console.error('Error verificando transacción:', error);
    throw error;
  }
}

// Webhook para confirmar transacción automáticamente
async function procesarWebhookYape(payload) {
  try {
    const { id, status, amount, reference } = payload;
    
    // Verificar firma
    if (!verificarFirmaYape(payload)) {
      throw new Error('Firma inválida');
    }
    
    // Actualizar apuesta
    const apuesta = await Apuesta.findById(reference);
    if (!apuesta) throw new Error('Apuesta no encontrada');
    
    if (status === 'COMPLETED') {
      apuesta.pagoYape.estado = 'verificado';
      apuesta.pagoYape.numeroTransaccion = id;
      apuesta.pagoYape.montoPagado = amount;
      await apuesta.save();
    } else if (status === 'FAILED') {
      apuesta.pagoYape.estado = 'rechazado';
      apuesta.pagoYape.motivoRechazo = 'Transacción fallida en Yape';
      await apuesta.save();
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error en webhook:', error);
    throw error;
  }
}

module.exports = {
  generarQRPago,
  verificarTransaccion,
  procesarWebhookYape
};
```

4. **Actualizar Ruta de Apuestas**

```javascript
// api/routes/apuestas.js
const yapeService = require('../services/yapeService');

// Generar QR de pago
router.post('/:id/generar-qr', verificarToken, async (req, res) => {
  try {
    const apuesta = await Apuesta.findById(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    const qr = await yapeService.generarQRPago(
      apuesta.montoApuesta,
      apuesta._id.toString()
    );
    
    apuesta.pagoYape.qrData = qr;
    await apuesta.save();
    
    res.json({ qr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook de Yape
router.post('/webhook/yape', async (req, res) => {
  try {
    await yapeService.procesarWebhookYape(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verificar transacción manualmente
router.post('/:id/verificar-transaccion', verificarToken, async (req, res) => {
  try {
    const { numeroTransaccion } = req.body;
    const transaccion = await yapeService.verificarTransaccion(numeroTransaccion);
    
    if (transaccion.status === 'COMPLETED') {
      await yapeService.procesarWebhookYape(transaccion);
      res.json({ success: true, transaccion });
    } else {
      res.status(400).json({ error: 'Transacción no completada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

5. **Actualizar Frontend**

```javascript
// client/src/pages/NuevaApuesta.js - Paso 2 modificado
const [qrData, setQrData] = useState(null);

const generarQR = async () => {
  try {
    const response = await axios.post(
      `/api/apuestas/${apuestaCreada._id}/generar-qr`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setQrData(response.data.qr);
  } catch (error) {
    setError(error.response?.data?.error || 'Error generando QR');
  }
};

// Mostrar QR real en lugar de simulado
{qrData && (
  <div style={{ textAlign: 'center' }}>
    <img 
      src={qrData.image} 
      alt="Código QR Yape"
      style={{ width: '200px', height: '200px' }}
    />
    <p>Número celular: {qrData.phoneNumber}</p>
  </div>
)}
```

### Opción 2: Integrador de Pagos (Más Fácil)

Usar un servicio como:
- **Stripe** (¿tiene Yape?)
- **Wompi** (procesador de pagos Latam)
- **Culqi** (pagos en Perú)

### Opción 3: Verificación Semi-Automática

Permitir que el sistema verifique transacciones consultando la API de Yape:

```javascript
const verificarPagoYape = async (numeroTransaccion, monto) => {
  // Consultar API de Yape directamente
  const resultado = await consultarYape(numeroTransaccion);
  
  return {
    valido: resultado.status === 'completed' && resultado.amount === monto,
    timestamp: resultado.timestamp,
    referencia: resultado.refNumber
  };
};
```

---

## Variables de Entorno Necesarias

Agregar a `.env` cuando integres Yape real:

```env
# Yape API
YAPE_API_URL=https://api.yape.com.pe/v1
YAPE_API_KEY=sk_live_tu_clave_secreta
YAPE_MERCHANT_ID=merchant_123456
YAPE_WEBHOOK_SECRET=webhook_secret_123

# Seguridad
YAPE_VERIFY_SSL=true
```

---

## Flujo Automático vs Manual

### Actual (Manual) ✅
```
1. Usuario crea apuesta
2. Sistema genera QR simulado
3. Usuario escanea y paga
4. Usuario sube comprobante
5. ADMIN revisa visualmente
6. ADMIN aprueba/rechaza
```

### Con Yape Real (Semi-Automático) 🚀
```
1. Usuario crea apuesta
2. Sistema genera QR real de Yape
3. Usuario escanea y paga
4. Webhook de Yape notifica automáticamente
5. Sistema verifica pago automáticamente
6. Apuesta se marca como verificada
7. ADMIN solo revisa fallidos
```

---

## Webhooks

Configurar en Yape Dashboard:

```
Webhook URL: https://tudominio.com/api/apuestas/webhook/yape
Eventos: transaction.completed, transaction.failed
```

---

## Seguridad Extra (Recomendado)

```javascript
// Verificar firma de Yape
const verificarFirmaYape = (payload) => {
  const hmac = require('crypto').createHmac('sha256', process.env.YAPE_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(payload.data));
  return hmac.digest('hex') === payload.signature;
};

// Verificar monto coincida
const verificarMonto = (apuesta, transaccion) => {
  if (apuesta.montoApuesta !== transaccion.amount) {
    throw new Error('Monto no coincide');
  }
};

// Rate limiting en verificación
const verificacionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiadas intentos de verificación'
});
```

---

## Testing con Yape

Yape proporciona números de teléfono de prueba:

```
Números de prueba: +51 9XX XXX XXX (según región)
Monto de prueba: Cualquier cantidad
```

---

## Roadmap Sugerido

1. **Fase 1 (Actual)**: Sistema manual funcionando ✅
2. **Fase 2**: Integrar API de Yape para generar QR reales
3. **Fase 3**: Implementar webhooks para verificación automática
4. **Fase 4**: Agregar validación de monto automática
5. **Fase 5**: Reducir rol de admin a solo auditoría

---

## Contactos Importantes

- **Yape Desarrolladores**: developers@yape.com.pe
- **Soporte Técnico**: support@yape.com.pe
- **Documentación**: https://developers.yape.com.pe

---

## Costo

- Yape cobra comisión por transacción (varía)
- Típicamente: 2.9% + S/. 0.50 por transacción
- Negociable según volumen

---

**Este sistema está listo para pasar a producción con Yape Real cuando sea necesario.**
