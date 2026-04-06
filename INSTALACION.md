# 📋 GUÍA DE INSTALACIÓN Y USO - JIJASBET

## 🎯 Resumen Rápido

Esta es una **plataforma completa de apuestas deportivas** con:
- Usuarios que crean apuestas
- Pago via Yape (con comprobante)
- Panel de admin para verificar pagos
- Cálculo automático de ganancias

---

## ✅ PASO 1: Prerrequisitos

Necesitas tener instalado:

1. **Node.js** - [Descargar](https://nodejs.org)
   - Verifica: `node --version` (debe ser 16+)
   - Verifica: `npm --version`

2. **MongoDB Atlas** (Base de datos en la nube - GRATIS)
   - Crea cuenta en https://www.mongodb.com/cloud/atlas
   - Crea un cluster gratuito
   - Obtén tu URL de conexión

3. **Git** (opcional pero recomendado)

---

## 🚀 PASO 2: Descargar/Clonar el Proyecto

### Opción A: Si tienes Git
```bash
git clone https://github.com/tu-usuario/jijasbet.git
cd jijasbet
```

### Opción B: Si descargaste el ZIP
```bash
# Extrae el ZIP
cd jijasbet
```

---

## 🔐 PASO 3: Configurar Variables de Entorno

1. En la **carpeta raíz** (jijasbet), copia el archivo `.env.example`:
```bash
cp .env.example .env
```

2. Abre `.env` en tu editor y actualiza:
```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@cluster.mongodb.net/jijasbet
JWT_SECRET=una_clave_secreta_larga_y_aleatoria_12345
NODE_ENV=development
PORT=5000
```

### Cómo obtener MONGODB_URI:
1. Ve a MongoDB Atlas
2. Haz clic en "Connect"
3. Selecciona "Connect your application"
4. Copia la URL y reemplaza `usuario` y `contraseña`

### Generar JWT_SECRET seguro:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📦 PASO 4: Instalar Dependencias

En la **carpeta raíz**:
```bash
npm install
```

En la **carpeta client**:
```bash
cd client
npm install
cd ..
```

---

## 👨‍💼 PASO 5: Crear Usuario Admin

Ejecuta este script para crear un usuario admin de demo:
```bash
node scripts/crearAdmin.js
```

Deberías ver:
```
✅ Admin creado exitosamente
📧 Email: admin@test.com
🔑 Contraseña: admin123

✅ Usuario regular creado
📧 Email: usuario@test.com
🔑 Contraseña: 123456
```

---

## ▶️ PASO 6: Iniciar la Aplicación

En la **carpeta raíz**:
```bash
npm run dev
```

Deberías ver:
```
🚀 Servidor ejecutándose en puerto 5000
✅ MongoDB conectado
```

La aplicación se abrirá en:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## 🎮 PASO 7: Probar la Aplicación

### Como Usuario Regular:
1. Entra a http://localhost:3000
2. Haz clic en "Inicia sesión aquí"
3. Usa las credenciales demo:
   - Email: `usuario@test.com`
   - Contraseña: `123456`

4. Haz clic en "Nueva Apuesta"
5. Llena el formulario:
   - Equipo Local: Alianza Lima
   - Equipo Visitante: Universitario
   - Tipo: Ganador Local
   - Monto: 100
   - Cuota: 1.50

6. Sube un comprobante de Yape (puedes usar cualquier imagen para demo)

### Como Admin:
1. Abre una **pestaña incógnito/privada**
2. Ve a http://localhost:3000
3. Inicia sesión con admin:
   - Email: `admin@test.com`
   - Contraseña: `admin123`

4. Haz clic en "Panel Admin" (aparece en la barra superior)
5. Verás todas las apuestas pendientes
6. Haz clic en "✅ Verificar" para aprobar el pago
7. Luego en "📊 Establecer Resultado" para marcar ganador

---

## 🌐 PASO 8: Deploy en Vercel (Opcional)

### Preparar para Vercel:
1. Sube tu código a GitHub
2. Ve a https://vercel.com
3. Haz clic en "New Project"
4. Importa tu repositorio de GitHub
5. En "Environment Variables", agrega:
   - `MONGODB_URI`: tu URL de MongoDB Atlas
   - `JWT_SECRET`: tu clave secreta

6. Haz clic en "Deploy"

¡Listo! Tu app estará en vivo en:
```
https://tu-proyecto.vercel.app
```

---

## 📱 Diagramas de Flujo

### Flujo Usuario:
```
INICIO
  ↓
Registro/Login
  ↓
Dashboard (ver mis apuestas)
  ↓
Nueva Apuesta
  ├→ Seleccionar partido
  ├→ Definir monto y cuota
  └→ Confirmar
  ↓
Pagar con Yape
  ├→ Ver QR
  ├→ Enviar dinero
  ├→ Sacar comprobante
  └→ Subir comprobante + número
  ↓
Esperar aprobación del admin
  ↓
Ver resultado (ganó o perdió)
```

### Flujo Admin:
```
INICIO
  ↓
Login con admin
  ↓
Panel Admin
  ↓
Ver apuestas pendientes
  ├→ Ver captura de comprobante
  ├→ Verificar pago ✅ o Rechazar ❌
  └→ Guardar decisión
  ↓
Establecer resultado del partido
  ├→ Seleccionar ganador
  └→ Sistema calcula ganador/perdedor
  ↓
Ver estadísticas
```

---

## 🆘 Problemas Comunes

### ❌ "MongoDB connection error"
**Solución:**
- Verifica que MONGODB_URI sea correcto
- En MongoDB Atlas, agrega tu IP a whitelist
- Prueba: reinicia el servidor

### ❌ "Port 5000 already in use"
**Solución:**
```bash
npx kill-port 5000
npm run dev
```

### ❌ "Cannot find module 'express'"
**Solución:**
```bash
npm install
```

### ❌ "React app not loading"
**Solución:**
- Verifica que `npm run dev` está ejecutándose
- Abre en incógnito para limpiar caché
- Cierra el navegador y reabre

### ❌ "Admin panel no aparece"
**Solución:**
- Verifica que iniciaste sesión con cuenta admin
- Ejecuta: `node scripts/crearAdmin.js` de nuevo
- Recarga la página

---

## 📊 Estructura de Datos

### Usuario
```json
{
  "_id": "ObjectId",
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "contraseña": "hasheada",
  "telefono": "999999999",
  "esAdmin": false,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### Apuesta
```json
{
  "_id": "ObjectId",
  "usuarioId": "ObjectId",
  "nombreUsuario": "Juan Pérez",
  "partido": {
    "equipo1": "Alianza Lima",
    "equipo2": "Universitario",
    "liga": "Primera División",
    "fecha": "2024-02-15T20:00:00Z"
  },
  "tipoApuesta": "local",
  "montoApuesta": 100,
  "cuota": 1.50,
  "montoGanancia": 150,
  "pagoYape": {
    "comprobante": "base64_imagen",
    "numeroTransaccion": "TXN-ABC123",
    "montoPagado": 100,
    "estado": "verificado",
    "motivoRechazo": null
  },
  "resultadoPartido": "local",
  "apuestaGanada": true,
  "createdAt": "2024-02-10T12:00:00Z"
}
```

---

## 🔐 Seguridad

✅ **Implementado:**
- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración (30 días)
- Validación en servidor
- CORS configurado
- Router admin protegido

⚠️ **Para Producción:**
- Integrar API real de Yape
- Usar S3/Cloudinary para imágenes
- Implementar 2FA
- Agregar rate limiting
- Validar comprobantes automáticamente

---

## 💡 Tips

1. **Hacer pruebas rápido**: Usa emails diferentes para cada usuario
2. **Generar datos**: Crea múltiples apuestas para probar como admin
3. **Debugging**: Abre DevTools (F12) en navegador para ver errores
4. **Logs del backend**: Revisa la consola donde ejecutas `npm run dev`
5. **MongoDB**: Usa MongoDB Atlas UI para ver datos guardados

---

## 📖 Comandos Útiles

```bash
# Iniciar en desarrollo
npm run dev

# Solo backend
npm run server

# Solo frontend
npm run client

# Build para producción
npm run build

# Crear usuarios demo
node scripts/crearAdmin.js

# Matar puerto en uso
npx kill-port 5000
```

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado
- [ ] Proyecto descargado/clonado
- [ ] `.env` configurado con MongoDB URI
- [ ] `npm install` ejecutado (en raíz y en client/)
- [ ] `node scripts/crearAdmin.js` ejecutado
- [ ] `npm run dev` ejecutando sin errores
- [ ] Frontend cargando en http://localhost:3000
- [ ] Backend respondiendo en http://localhost:5000
- [ ] Puedes iniciar sesión con admin@test.com
- [ ] Puedes crear una apuesta de prueba

---

## 🎉 ¡Listo!

Tu plataforma de apuestas está funcionando. Ahora puedes:
- 🎲 Hacer apuestas
- 💳 Simular pagos Yape
- ✔️ Verificarlos como admin
- 📊 Ver resultados
- 💰 Calcular ganancias

**¡Que ganen todas tus apuestas! 🍀**

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los "Problemas Comunes" arriba
2. Verifica que todas las dependencias están instaladas
3. Revisa los logs en la consola
4. Contacta al desarrollador

---

Última actualización: 2024
