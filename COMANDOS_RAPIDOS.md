# ⚡ Comandos Rápidos - JIJASBET

## 🚀 Empezar Rápido (Primero)

```bash
# 1. Instalar dependencias
npm install
cd client && npm install && cd ..

# 2. Configurar .env
cp .env.example .env
# Edita .env con tu MongoDB URI y JWT_SECRET

# 3. Crear usuarios demo
node scripts/crearAdmin.js

# 4. Iniciar desarrollo
npm run dev
```

Luego abre:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📝 Comandos del Proyecto

### Desarrollo
```bash
npm run dev              # Iniciar backend + frontend
npm run server           # Solo backend (puerto 5000)
npm run client           # Solo frontend (puerto 3000)
```

### Build
```bash
npm run build            # Build para producción
cd client && npm run build && cd ..  # Build solo React
```

### Utilidades
```bash
node scripts/crearAdmin.js       # Crear/resetear usuarios demo
npx kill-port 5000              # Liberar puerto 5000
npm test                        # Tests (si existen)
```

---

## 🔑 Usuarios Demostración

Después de ejecutar `node scripts/crearAdmin.js`:

### Admin (para verificar pagos)
```
Email: admin@test.com
Contraseña: admin123
Funciones: Verificar pagos, rechazar, establecer resultados
```

### Usuario Regular
```
Email: usuario@test.com
Contraseña: 123456
Funciones: Crear apuestas, ver dashboard, subir comprobantes
```

---

## 🌐 URLs Principales

### Desarrollo
```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
API Health: http://localhost:5000/api/health
```

### Producción (Vercel)
```
https://tu-proyecto.vercel.app
https://tu-proyecto.vercel.app/api/health
```

---

## 📱 Rutas Frontend

```
/login              - Página de login
/registro           - Página de registro
/dashboard          - Ver mis apuestas
/nueva-apuesta      - Crear nueva apuesta
/admin              - Panel administrativo (solo admin)
```

---

## 🔌 Endpoints API

### Autenticación
```bash
POST /api/auth/registro
POST /api/auth/login
GET /api/auth/me
```

### Apuestas
```bash
POST /api/apuestas              # Crear
GET /api/apuestas/mis-apuestas  # Ver mis apuestas
GET /api/apuestas/:id           # Ver detalle
POST /api/apuestas/:id/comprobante  # Subir comprobante
```

### Admin
```bash
GET /api/admin/apuestas-pendientes  # Pendientes
GET /api/admin/todas-apuestas       # Todas
PUT /api/admin/verificar/:id        # Aprobar
PUT /api/admin/rechazar/:id         # Rechazar
PUT /api/admin/resultado/:id        # Setear resultado
GET /api/admin/estadisticas         # Stats
```

---

## 🛠️ Problemas y Soluciones

### Puerto 5000 en uso
```bash
npx kill-port 5000
npm run dev
```

### Error de módulos no encontrados
```bash
rm -rf node_modules package-lock.json
npm install
rm -rf client/node_modules client/package-lock.json
cd client && npm install && cd ..
```

### MongoDB no conecta
```bash
# 1. Verifica .env
cat .env | grep MONGODB_URI

# 2. Verifica URL en MongoDB Atlas
#    (check credentials, whitelist IP)

# 3. Reinicia backend
npm run server
```

### React no carga
```bash
# Abre devtools (F12) y revisa errores
# Intenta con incógnito para limpiar caché
# Reinicia: npm run client
```

---

## 📊 Flujo de Prueba Completo

### Paso 1: Crear Apuesta
```
1. Login como usuario@test.com / 123456
2. Click "Nueva Apuesta"
3. Llenar formulario:
   - Équipo 1: Alianza Lima
   - Équipo 2: Universitario  
   - Monto: 100
   - Cuota: 1.50
4. Subir captura (cualquier imagen para demo)
5. Número transacción: TXN-TEST123
```

### Paso 2: Verificar (Admin)
```
1. Abre pestaña incógnito
2. Login como admin@test.com / admin123
3. Click "Panel Admin"
4. Este Click "✅ Verificar" en la apuesta
5. Verifica que estado cambió a "verificado"
```

### Paso 3: Establecer Resultado
```
1. En Panel Admin
2. Click "📊 Establecer Resultado"
3. Selecciona ganador
4. Usuario ve: "✅ GANADA: +S/. 50"
```

---

## 🐛 Debugging

### Ver logs del backend
```bash
# Ubicación: Terminal donde corre "npm run dev"
# Busca mensajes con 🚀, ✅, ❌
```

### Ver errores del frontend
```bash
# Abre DevTools: F12 o Ctrl+Shift+I
# Console tab para ver errores JavaScript
# Network tab para ver requests HTTP
```

### Consultar MongoDB
```bash
# MongoDB Atlas Dashboard
# Collections > Apuesta/Usuario
# Busca por ID o usuario
```

---

## 📦 Instalación en Vercel

### 1. Git
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/usuario/jijasbet.git
git push -u origin main
```

### 2. Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
# Configura variables de entorno
```

### 3. Variables de Entorno
En Vercel Dashboard:
```
MONGODB_URI = mongodb+srv://...
JWT_SECRET = tu_clave_segura
NODE_ENV = production
```

### 4. Deploy
```bash
vercel --prod
# Ya está en vivo!
```

---

## 🔄 Actualizar Base de Datos

### Agregar más equipos
Editar en `client/src/pages/NuevaApuesta.js`:
```javascript
const equiposSugeridos = [
  'Alianza Lima', 'Sporting Cristal', // agregar aquí
];
```

### Agregar más ligas
```javascript
const ligas = [
  'Primera División',
  'LaLiga',
  'Premier League',
  // agregar aquí
];
```

---

## 🔐 Cambiar Seguridad

### Generar nuevo JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copiar salida a .env
```

### Cambiar contraseña demo
Editar `scripts/crearAdmin.js`:
```javascript
contraseña: 'nueva_contraseña_aqui'
```

---

## 📈 Monitorar Performance

### Tiempo de respuesta API
```bash
curl -w '\nTiempo: %{time_total}s\n' http://localhost:5000/api/health
```

### Tamaño de base de datos
```bash
# En MongoDB Atlas
Metrics > Storage
```

---

## 🎯 Próximos Pasos

1. ✅ Funciona localmente
2. 🔄 Deploy en Vercel
3. 🔌 Integrar Yape real (ver YAPE_INTEGRACION.md)
4. 📸 Guardar imágenes en S3/Cloudinary
5. 📊 Agregar análisis/reportes
6. 📄 Tests automáticos
7. 🔔 Notificaciones email

---

## 📞 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| No tengo Node.js | Descargar de https://nodejs.org |
| No tengo MongoDB | Usar MongoDB Atlas (gratis) |
| Variables de entorno | Copiar .env.example a .env |
| npm install falla | Limpiar: rm -rf node_modules |
| Puerto en uso | npx kill-port 5000 |
| Admin no aparece | Ejecutar: node scripts/crearAdmin.js |
| Login no funciona | Verificar email/contraseña exactos |
| Apuesta no guarda | Revisar consola para errores |

---

## 🎉 Resumen de Archivos Importantes

```
jijasbet/
├── .env.example       ← Copiar a .env
├── package.json       ← Scripts
├── README.md          ← Resumen
├── INSTALACION.md     ← Guía completa
├── ARCHIVOS.md        ← Estructura
├── YAPE_INTEGRACION.md ← Yape API
├── api/               ← Backend
└── client/            ← Frontend
```

---

**Bookmark esta página para referencia rápida! 🚀**
