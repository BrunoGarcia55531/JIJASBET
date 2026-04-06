# ✅ APLICACIÓN LISTA - PRÓXIMOS PASOS

Tu aplicación de apuestas deportivas JIJASBET está 100% lista para ser ejecutada. 

## Estado Actual ✓

- ✅ Backend Express completamente funcionable
- ✅ Frontend React con todos los componentes
- ✅ Base de datos PostgreSQL configurada (modelos listos)
- ✅ Autenticación JWT implementada
- ✅ Sistema de apuestas con Yape integrado
- ✅ Panel administrativo completo
- ✅ Frontend actualizado para PostgreSQL

## AHORA DEBES HACER ESTO:

### PASO 1: Instalar PostgreSQL
**Windows:**
1. Descarga de: https://www.postgresql.org/download/windows/
2. Ejecuta el instalador
3. En la instalación:
   - Usuario: `postgres`
   - Contraseña: **anota esta contraseña** (la necesitarás)
   - Puerto: `5432` (dejar por defecto)
4. Termina la instalación

**Mac:**
```bash
brew install postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
```

### PASO 2: Crear la Base de Datos

**Windows (usar PowerShell):**
```powershell
psql -U postgres
```

**Mac/Linux:**
```bash
psql -U postgres
```

Una vez dentro de psql, ejecuta:
```sql
CREATE DATABASE jijasbet;
\q
```

### PASO 3: Configurar el Archivo .env.local

En tu proyecto, abre `.env.local` y asegúrate de que tenga:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jijasbet
DB_USER=postgres
DB_PASSWORD=[contraseña que pusiste en PostgreSQL]
JWT_SECRET=tu_secret_key_muy_seguro
NODE_ENV=development
PORT=5000
```

### PASO 4: Instalar Dependencias

En PowerShell, dentro del directorio del proyecto:
```powershell
npm install
```

Espera a que se instalen todas las dependencias (esto puede tardar 1-2 minutos).

### PASO 5: Crear Usuarios Demo

```powershell
node scripts/crearAdmin.js
```

Este comando:
- ✅ Conecta a PostgreSQL
- ✅ Crea las tablas (Usuarios y Apuestas)
- ✅ Inserta 2 usuarios de prueba:
  - **Admin**: `admin@test.com` / `admin123`
  - **Usuario**: `usuario@test.com` / `123456`

### PASO 6: Iniciar la Aplicación

```powershell
npm run dev
```

Esto iniciará:
- 🖥️ Backend en: `http://localhost:5000`
- 💻 Frontend en: `http://localhost:3000` (se abrirá automáticamente)

## VERIFICACIÓN

Si todo está bien:
1. Se abrirá automáticamente `http://localhost:3000` en tu navegador
2. Verás la página de login
3. Prueba loguearte con: `usuario@test.com` / `123456`
4. Deberías ver el dashboard con tu información

## PARA ACCEDER AL PANEL ADMIN

1. Ingresa con: `admin@test.com` / `admin123`
2. Se mostrará un botón "⚙️ Panel Admin" en la navegación
3. Desde allí puedes:
   - Ver todas las apuestas pendientes
   - Verificar pagos
   - Establecer resultados de partidos
   - Ver estadísticas

## FLUJO DE LA APLICACIÓN

### Como Usuario Regular:
1. **Registrarse** → Email + Contraseña
2. **Iniciar Sesión**
3. **Crear Apuesta** → Seleccionar equipos, monto, cuota
4. **Pagar con Yape** → Subir captura de transacción
5. **Esperar verificación** del admin
6. **Ver resultados** en el dashboard

### Como Admin:
1. **Inicia sesión** con cuenta admin
2. **Panel Admin** → Ver apuestas pendientes
3. **Verificar Pago** → Confirmar transacción Yape
4. **Establecer Resultado** del partido
5. Automáticamente se calcula si el usuario ganó o perdió

## DATOS DE PRUEBA

Para probar el sistema sin usar Yape real:
- **Número Yape (demo)**: +51 999 999 999
- **Transacción (ejemplo)**: YAP-2024-001234
- Para comprobante: Sube cualquier imagen (el sistema la guarda)

## TROUBLESHOOTING

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
✗ PostgreSQL no está ejecutándose
✓ Solución: Inicia el servicio PostgreSQL

### Error: "database "jijasbet" does not exist"
✗ La base de datos no fue creada
✓ Solución: Ejecuta `CREATE DATABASE jijasbet;` en psql

### Error: "npm: command not found"
✗ Node.js no está instalado
✓ Solución: Descarga de https://nodejs.org/

### Puerto 5000 o 3000 en uso
✗ Otro programa está usando estos puertos
✓ Solución: 
```powershell
# Para cambiar puerto backend, edita .env.local:
PORT=5001

# Para cambiar puerto frontend, edita package.json scripts
```

## ARCHIVOS CLAVE DEL PROYECTO

```
JIJASBET-1/
├── api/
│   ├── server.js              (Servidor Express + conexión BD)
│   ├── models/
│   │   ├── Usuario.js         (Modelo de usuario)
│   │   ├── Apuesta.js         (Modelo de apuesta)
│   │   └── index.js           (Inicialización de modelos)
│   ├── routes/
│   │   ├── auth.js            (Login/Registro)
│   │   ├── apuestas.js        (Crear apuestas, ver historial)
│   │   └── admin.js           (Panel administrativo)
│   └── middleware/
├── client/
│   ├── src/
│   │   ├── App.js             (Router principal)
│   │   ├── pages/
│   │   │   ├── Login.js       (Página de login)
│   │   │   ├── Registro.js    (Registro de usuarios)
│   │   │   ├── Dashboard.js   (Historial de apuestas)
│   │   │   ├── NuevaApuesta.js (Crear apuesta + pagar)
│   │   │   └── AdminPanel.js  (Panel administrativo)
│   │   ├── App.css            (Estilos principales)
│   │   └── services/
│   └── public/
├── scripts/
│   └── crearAdmin.js          (Crear usuarios demo)
├── .env.local                 (Configuración desarrollo - EDITAR)
├── .env.example               (Plantilla de variables)
├── package.json               (Dependencias)
├── vercel.json                (Configuración de deploy)
└── README.md                  (Documentación completa)
```

## SIGUIENTE NIVEL: DEPLOYMENT

Una vez que funcione localmente, puedes desplegar a:

### Opción 1: Vercel (Frontend + Backend Serverless)
- Muy fácil, subes tu repo a GitHub
- Usa `vercel.json` que ya creamos

### Opción 2: Heroku
- App completo en la nube
- Maneja PostgreSQL automáticamente

### Opción 3: Railway.app
- Similar a Heroku pero más moderno
- Muy fácil de usar

Consulta `DEPLOYMENT.md` para más detalles.

## ¿PREGUNTAS?

Revisa estos archivos incluidos en el proyecto:
- `README.md` - Documentación completa
- `INSTALACION.md` - Guía de instalación detallada
- `POSTGRES_MIGRACION.md` - Información sobre PostgreSQL
- `YAPE_INTEGRACION.md` - Cómo integrar Yape en producción
- `REACT_FRONTEND_ACTUALIZADO.md` - Cambios en componentes React

---

**¡Tu aplicación está lista para volar! 🚀**

Ejecuta `npm run dev` y comienza a probar.
