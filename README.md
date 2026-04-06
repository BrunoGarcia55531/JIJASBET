# 🎯 JIJASBET - Plataforma de Apuestas Deportivas

Una plataforma funcional completa para apuestas deportivas con pago por **Yape** (aplicación de pagos peruana).

## ✨ Características

- ✅ **Registro y Login** de usuarios con autenticación JWT
- 🎲 **Sistema de Apuestas** - Crea apuestas deportivas en tiempo real
- 📸 **Pago por Yape** - Sube comprobante de transacción
- ✔️ **Panel Admin** - Verifica y aprueba pagos
- 📊 **Dashboard** - Visualiza todas tus apuestas
- 🎯 **Resultados** - Establece resultados de partidos
- 💰 **Ganancias** - Calcula automáticamente ganancias potenciales

## 🛠️ Stack Tecnológico

- **Frontend**: React + CSS
- **Backend**: Node.js + Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Deploy**: Vercel

## 📋 Requisitos Previos

- Node.js v16+
- npm o yarn
- MongoDB (local o Atlas)
- Cuenta en Vercel (para deploy)

## 🚀 Instalación Local

### 1. Configurar variables de entorno
```bash
cp .env.example .env
```

Edita `.env`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jijasbet
JWT_SECRET=tu_secret_key
NODE_ENV=development
PORT=5000
```

### 2. Instalar dependencias
```bash
npm install
cd client && npm install && cd ..
```

### 3. Iniciar en desarrollo
```bash
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## 📚 Flujo de la Aplicación

✅ **Registro** → 🎲 **Nueva Apuesta** → 📸 **Pago Yape** → ✔️ **Verificación Admin** → 📊 **Resultado**

## 🚀 Deploy Vercel

```bash
git push && vercel --prod
```

Configura en Vercel:
- `MONGODB_URI`
- `JWT_SECRET`

## 📞 API Endpoints

**Auth**: `/api/auth/registro`, `/api/auth/login`
**Apuestas**: `/api/apuestas`, `/api/apuestas/mis-apuestas`, `/api/apuestas/:id/comprobante`
**Admin**: `/api/admin/apuestas-pendientes`, `/api/admin/verificar/:id`, `/api/admin/resultado/:id`

## 🔐 Seguridad

- Contraseñas hasheadas (bcryptjs)
- JWT con expiración
- CORS configurado
- Variables en `.env`

---

**¡Que ganen todas tus apuestas! 🍀**