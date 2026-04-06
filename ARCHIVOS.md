# 🎯 JIJASBET - Resumen de Archivos

## 📁 Estructura Completa del Proyecto

```
jijasbet/
│
├── 📂 api/
│   ├── 📂 models/
│   │   ├── Usuario.js          # Modelo de usuario (email, contraseña, esAdmin)
│   │   └── Apuesta.js          # Modelo de apuesta (detalles, pago, resultado)
│   │
│   ├── 📂 routes/
│   │   ├── auth.js             # Registro, login, verificación
│   │   ├── apuestas.js         # Crear apuesta, subir comprobante
│   │   └── admin.js            # Verificar pagos, establecer resultados
│   │
│   └── server.js               # Servidor Express principal
│
├── 📂 client/
│   ├── 📂 src/
│   │   ├── 📂 pages/
│   │   │   ├── Login.js              # Página de inicio de sesión
│   │   │   ├── Registro.js           # Página de registro
│   │   │   ├── Dashboard.js          # Ver mis apuestas
│   │   │   ├── NuevaApuesta.js       # Crear apuesta + pago Yape
│   │   │   └── AdminPanel.js         # Panel administrativo
│   │   │
│   │   ├── App.js              # Componente raíz (rutas)
│   │   ├── App.css             # Estilos principales
│   │   └── index.js            # Entrada de React
│   │
│   ├── 📂 public/
│   │   └── index.html          # HTML principal
│   │
│   └── package.json            # Dependencias React
│
├── 📂 scripts/
│   └── crearAdmin.js           # Script para crear usuarios demo
│
├── 📋 Archivos Configuración
│   ├── package.json            # Dependencias Node
│   ├── .env.example            # Variables de entorno (plantilla)
│   ├── .env.local              # Variables de entorno (desarrollo)
│   ├── .env.production         # Variables de entorno (producción)
│   ├── .gitignore              # Archivos a ignorar en Git
│   └── vercel.json             # Configuración para Vercel
│
└── 📖 Documentación
    ├── README.md               # Resumen general
    ├── INSTALACION.md          # Guía paso a paso
    ├── YAPE_INTEGRACION.md     # Cómo integrar Yape real
    └── ARCHIVOS.md             # Este archivo
```

---

## 📄 Archivos Clave Explicados

### Backend (API)

| Archivo | Función |
|---------|---------|
| `api/server.js` | Inicia Express, conecta MongoDB, configura rutas |
| `api/models/Usuario.js` | Define estructura: nombre, email, contraseña, rol |
| `api/models/Apuesta.js` | Define estructura: partido, apuesta, pago, resultado |
| `api/routes/auth.js` | Registro, login, validación de token |
| `api/routes/apuestas.js` | Crear apuesta, subir comprobante Yape |
| `api/routes/admin.js` | Verificar pagos, rechazar, establecer resultado |

### Frontend (React)

| Archivo | Función |
|---------|---------|
| `client/src/App.js` | Rutas principales, navbar, control de sesión |
| `client/src/App.css` | Estilos globales (colores, botones, tablas) |
| `client/src/pages/Login.js` | Formulario de inicio de sesión |
| `client/src/pages/Registro.js` | Formulario de nuevo usuario |
| `client/src/pages/Dashboard.js` | Tabla de mis apuestas con filtros |
| `client/src/pages/NuevaApuesta.js` | Crear apuesta (paso 1) + Pago Yape (paso 2) |
| `client/src/pages/AdminPanel.js` | Vista admin: verificar pagos, resultados |

### Configuración

| Archivo | Función |
|---------|---------|
| `package.json` | Scripts y dependencias Node (Express, MongoDB, etc) |
| `client/package.json` | Scripts y dependencias React |
| `.env.example` | Plantilla de variables de entorno |
| `.env.local` | Configuración para desarrollo |
| `.env.production` | Configuración para producción |
| `vercel.json` | Cómo desplegar en Vercel |
| `.gitignore` | Qué no subir a Git |

### Documentación

| Archivo | Función |
|---------|---------|
| `README.md` | Resumen rápido del proyecto |
| `INSTALACION.md` | Guía completa de instalación y uso |
| `YAPE_INTEGRACION.md` | Cómo integrar API real de Yape |
| `ARCHIVOS.md` | Este archivo |

---

## 🚀 Flujo de Archivos en Acción

### 1. Usuario se Registra
```
FRONTEND: Registro.js
    ↓ (POST /api/auth/registro)
BACKEND: api/routes/auth.js
    ↓ 
BACKEND: api/models/Usuario.js (guarda en MongoDB)
    ↓ (retorna token JWT)
FRONTEND: almacena en localStorage
    ↓
FRONTEND: redirige a Dashboard.js
```

### 2. Usuario Crea Apuesta
```
FRONTEND: NuevaApuesta.js (paso 1)
    ↓ (POST /api/apuestas)
BACKEND: api/routes/apuestas.js
    ↓
BACKEND: api/models/Apuesta.js (guarda en MongoDB)
    ↓ (retorna ID de apuesta)
FRONTEND: NuevaApuesta.js (paso 2, pide QR de Yape)
    ↓
Usuario sube comprobante
    ↓ (POST /api/apuestas/:id/comprobante)
BACKEND: guarda comprobante e imagen en MongoDB
    ↓
Estado cambia a "pendiente"
```

### 3. Admin Verifica Pago
```
FRONTEND: AdminPanel.js
    ↓ (GET /api/admin/apuestas-pendientes)
BACKEND: api/routes/admin.js
    ↓
BACKEND: query MongoDB de apuestas pendientes
    ↓ (retorna lista)
FRONTEND: muestra lista + botones
    ↓
Admin hace clic en "Verificar"
    ↓ (PUT /api/admin/verificar/:id)
BACKEND: actualiza estado a "verificado"
    ↓
FRONTEND: actualiza tabla automáticamente
```

### 4. Admin Establece Resultado
```
Admin verifica comprobante
    ↓
Hace clic en "Establecer Resultado"
    ↓ (PUT /api/admin/resultado/:id)
BACKEND: calcula si apuesta ganó o perdió
    ↓
BACKEND: guarda en MongoDB
    ↓
Dashboard de usuario actualiza
    ↓
Usuario ve: "✅ GANADA: +S/. 50"
```

---

## 🔌 Integración de Componentes

### Frontend ↔ Backend
```javascript
// Llamadas HTTP (axios)
axios.post('/api/auth/login', { email, contraseña })
axios.get('/api/apuestas/mis-apuestas', { headers: { Authorization } })
axios.put('/api/admin/verificar/:id', {})
```

### Backend ↔ Base de Datos
```javascript
// Mongoose queries
Usuario.findOne({ email })
Apuesta.find({ usuarioId })
Apuesta.updateOne({ _id }, { pagoYape: {...} })
```

### Autenticación
```javascript
// JWT Token
localStorage.setItem('token', token)
Authorization: `Bearer ${token}`
jwt.verify(token, SECRET)
```

---

## 📊 Modelos de Datos (MongoDB)

### Colección: usuarios
```json
{
  "_id": ObjectId,
  "nombre": "Juan",
  "email": "juan@email.com",
  "contraseña": "$2a$10$...", // hasheada
  "esAdmin": false,
  "createdAt": ISODate
}
```

### Colección: apuestas
```json
{
  "_id": ObjectId,
  "usuarioId": ObjectId,
  "nombreUsuario": "Juan",
  "partido": {
    "equipo1": "Alianza",
    "equipo2": "Universitario",
    "liga": "Primera",
    "fecha": ISODate
  },
  "tipoApuesta": "local",
  "montoApuesta": 100,
  "cuota": 1.5,
  "montoGanancia": 150,
  "pagoYape": {
    "comprobante": "data:image/...",
    "numeroTransaccion": "TXN-123",
    "montoPagado": 100,
    "estado": "verificado",
    "motivoRechazo": null
  },
  "resultadoPartido": "local",
  "apuestaGanada": true,
  "createdAt": ISODate
}
```

---

## 🔧 Dependencias Principales

### Backend
- **express**: Servidor web
- **mongoose**: ORM para MongoDB
- **jsonwebtoken**: Autenticación
- **bcryptjs**: Encriptación de contraseñas
- **cors**: Permitir requests cross-origin
- **dotenv**: Variables de entorno
- **nodemon**: Auto-reload en desarrollo

### Frontend
- **react**: Framework UI
- **react-router-dom**: Navegación
- **axios**: Llamadas HTTP

---

## 🚀 Scripts Disponibles

```bash
# En raíz (jijasbet/)
npm run dev              # Iniciar dev completo
npm run server           # Solo backend
npm run client           # Solo frontend
npm run build            # Build de producción
node scripts/crearAdmin.js  # Crear usuarios demo

# En client/
npm start                # Iniciar React dev
npm run build            # Build React
npm test                 # Tests
```

---

## 📱 Responsive Design

Todos los componentes son **mobile-friendly**:
- ✅ Navbar colapsable
- ✅ Tablas adaptables
- ✅ Modales responsivos
- ✅ Formularios en móvil
- ✅ CSS Grid/Flexbox

---

## 🔒 Seguridad por Archivo

| Archivo | Medidas |
|---------|---------|
| `api/routes/auth.js` | Hash de contraseña, JWT con exp |
| `api/routes/apuestas.js` | Verificación de token, validación |
| `api/routes/admin.js` | Solo acceso admin, validación |
| `api/models/Usuario.js` | Pre-save hash de contraseña |
| `server.js` | CORS configurado |
| `.env` | No comitear, usar variables |

---

## 📈 Escalabilidad Futura

### Para Producción:
1. Agregar **tests** (Jest, Mocha)
2. Implementar **cache** (Redis)
3. Agregar **logging** (Winston, Morgan)
4. Base de datos **replicada** (MongoDB Atlas)
5. **Rate limiting** en rutas
6. **Validación** más estricta
7. Integración **Yape real**
8. Almacenamiento de imágenes en **S3/Cloudinary**

---

## 📂 Cómo Agregar Nueva Funcionalidad

### Ejemplo: Historial de Apuestas por Mes

1. **Backend**:
   - Agregar método en `api/routes/apuestas.js`
   - Query `Apuesta.find({ usuarioId, createdAt: { $gte: inicio } })`

2. **Frontend**:
   - Crear `client/src/pages/Historial.js`
   - Agregar ruta en `App.js`
   - Llamar nuevo endpoint

3. **Database**:
   - Agregar índice si es necesario

---

## 🎨 Personalización

### Cambiar Colores:
Editar `client/src/App.css`:
```css
/* Cambiar color primario */
.btn-primary { background: #667eea; }

/* Cambiar gradiente */
body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
```

### Cambiar Nombre:
```bash
# Reemplazar "JIJASBET" en:
client/src/App.js
client/src/pages/Login.js
client/public/index.html
README.md
```

---

## 📞 Archivos para Contacto/Soporte

Agregar en futuro:
- `CONTACTO.md` - Información de soporte
- `CHANGELOG.md` - Historial de cambios
- `CONTRIBUIR.md` - Guía para contribuidores

---

## ✅ Checklist de Completitud

- ✅ Backend completamente funcional
- ✅ Frontend completamente funcional
- ✅ Autenticación implementada
- ✅ Panel admin implementado
- ✅ Validaciones en cliente y servidor
- ✅ Estilos CSS responsive
- ✅ Documentación completa
- ✅ Scripts de utilidad
- ✅ Configuración para múltiples entornos
- ✅ Listo para deploy en Vercel

---

**¡El proyecto está 100% completo y funcional! 🎉**
