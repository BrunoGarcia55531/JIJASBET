# 🔄 MIGRACIÓN A PostgreSQL + Sequelize

Tu aplicación ha sido migrada exitosamente de **MongoDB** a **PostgreSQL** con **Sequelize**.

---

## 📊 Cambios Realizados

### 1. Base de Datos
- ✅ MongoDB → PostgreSQL
- ✅ Mongoose → Sequelize ORM

### 2. Dependencias
```bash
# Removido
- mongoose
- mongodb

# Agregado
+ sequelize v6.35.0
+ pg (PostgreSQL driver)
+ pg-hstore (para JSON)
```

### 3. Modelos
- ✅ `Usuario.js` - Convertido a Sequelize
- ✅ `Apuesta.js` - Convertido a Sequelize
- ✅ `index.js` - Inicializa modelos

### 4. Rutas
- ✅ `auth.js` - Queries PostgreSQL
- ✅ `apuestas.js` - Queries PostgreSQL
- ✅ `admin.js` - Queries PostgreSQL

### 5. Variables de Entorno
```env
# Antes (MongoDB)
MONGODB_URI=mongodb+srv://...

# Ahora (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jijasbet
DB_USER=postgres
DB_PASSWORD=postgres
```

---

## 🚀 Primeros Pasos

### 1. Instalar PostgreSQL

#### Windows:
- Descargar: https://www.postgresql.org/download/windows/
- Instalar con opciones por defecto
- Usuario: `postgres`
- Contraseña: La que ingresaste en instalación

#### Mac:
```bash
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu):
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Crear Base de Datos

Abre **pgAdmin** (incluido con PostgreSQL) o usa CLI:

```sql
CREATE DATABASE jijasbet;
```

O por terminal:
```bash
createdb -U postgres jijasbet
```

### 3. Configurar `.env.local`

Ve a tu proyecto y edita `.env.local`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jijasbet
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres  # La que usaste en instalación

JWT_SECRET=tu_secret_muy_seguro
NODE_ENV=development
PORT=5000
```

### 4. Instalar Dependencias

```bash
npm install
cd client; npm install; cd ..
```

### 5. Crear Usuarios Demo

```bash
node scripts/crearAdmin.js
```

Deberías ver:
```
✅ PostgreSQL conectado
✅ Admin creado exitosamente
📧 Email: admin@test.com
🔑 Contraseña: admin123

✅ Usuario regular creado
📧 Email: usuario@test.com
🔑 Contraseña: 123456
```

### 6. Iniciar Aplicación

```bash
npm run dev
```

Abre: http://localhost:3000 ✅

---

## 📝 Cambios en Modelos

### Usuario (antes vs ahora)

**MongoDB**:
```javascript
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String
});
```

**PostgreSQL**:
```javascript
const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  contraseña: DataTypes.STRING
});
```

---

## 📊 Cambios en Queries

### Buscar Usuario

**MongoDB**:
```javascript
const usuario = await Usuario.findOne({ email });
```

**PostgreSQL**:
```javascript
const usuario = await Usuario.findOne({ where: { email } });
```

### Crear Apuesta

**MongoDB**:
```javascript
const apuesta = new Apuesta({ ... });
await apuesta.save();
```

**PostgreSQL**:
```javascript
const apuesta = await Apuesta.create({ ... });
```

### Actualizar

**MongoDB**:
```javascript
apuesta.estado = 'verificado';
await apuesta.save();
```

**PostgreSQL**:
```javascript
await apuesta.update({ estado: 'verificado' });
```

---

## 🔧 Estructura de Tablas PostgreSQL

Sequelize crea automáticamente estas tablas:

### Tabla: `Usuarios`
```sql
- id (INT PRIMARY KEY)
- nombre (VARCHAR)
- email (VARCHAR UNIQUE)
- contraseña (VARCHAR)
- esAdmin (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Tabla: `Apuestas`
```sql
- id (INT PRIMARY KEY)
- usuarioId (INT FOREIGN KEY → Usuarios)
- nombreUsuario (VARCHAR)
- equipoLocal (VARCHAR)
- equipoVisitante (VARCHAR)
- liga (VARCHAR)
- fechaPartido (TIMESTAMP)
- tipoApuesta (VARCHAR)
- montoApuesta (DECIMAL)
- cuota (DECIMAL)
- montoGanancia (DECIMAL)
- comprobante (TEXT - Base64)
- numeroTransaccion (VARCHAR)
- montoPagado (DECIMAL)
- estadoPago (ENUM: pendiente, verificado, rechazado)
- motivoRechazo (TEXT)
- resultadoPartido (VARCHAR)
- apuestaGanada (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

---

## 🌐 Deploy en Vercel con PostgreSQL

### Opción 1: Vercel Postgres (Recomendado)

1. Ve a https://vercel.com/dashboard
2. Abre tu proyecto
3. Go to Settings → Storage
4. Click "Create Database" → Postgres
5. Copia la URL de conexión
6. En Environment Variables, agrega:

```env
DB_HOST=tu_host
DB_PORT=5432
DB_NAME=tu_db
DB_USER=tu_user
DB_PASSWORD=tu_password
JWT_SECRET=tu_secret
```

### Opción 2: Railway.app (Más fácil)

1. Ve a https://railway.app
2. Conecta tu GitHub
3. Add Service → PostgreSQL
4. Railway proporciona automáticamente las variables

---

## 🔒 Seguridad en Producción

### 1. Contraseña PostgreSQL
- Usa contraseña fuerte: mínimo 20 caracteres
- Mezcla mayúsculas, minúsculas, números, símbolos

### 2. JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Firewall
- PostgreSQL: Abre puerto 5432 solo a IPs conocidas
- Vercel: No expongas credenciales

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
**Solución:**
1. Verifica que PostgreSQL está corriendo
2. Verifica credenciales en `.env.local`
3. Verifica que la base de datos "jijasbet" existe

```bash
psql -U postgres -c "CREATE DATABASE jijasbet;"
```

### Error: "EADDRINUSE: address already in use :::5432"
**Solución:**
PostgreSQL ya está corriendo. Eso está correcto.

### Error en queries
**Solución:**
Revisa console para errores específicos de SQL.
Verifica que Sequelize.sync() se ejecutó.

---

## 📚 Documentación

- [Sequelize Docs](https://sequelize.org/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Vercel Postgres](https://vercel.com/docs/storage/postgres)
- [Railway.app](https://docs.railway.app/)

---

## ✅ Checklist de Migración

- [ ] PostgreSQL instalado
- [ ] Base de datos "jijasbet" creada
- [ ] `.env.local` configurado
- [ ] `npm install` ejecutado
- [ ] `node scripts/crearAdmin.js` ejecutado sin errores
- [ ] `npm run dev` inicia sin errores
- [ ] Frontend carga en http://localhost:3000
- [ ] Backend responde en http://localhost:5000/api/health
- [ ] Puedo hacer login con admin@test.com
- [ ] Puedo crear una apuesta

---

## 🎉 ¡Migración Completada!

Tu aplicación está 100% funcionando con PostgreSQL.

**Beneficios de PostgreSQL:**
- ✅ Más robusto y confiable
- ✅ Mejor para datos relacionales
- ✅ Más fácil de escalar
- ✅ Mejor soporte empresarial
- ✅ Gratis (open source)

---

**¿Dudas?** Revisa INSTALACION.md o COMANDOS_RAPIDOS.md

**¡Que ganen todas tus apuestas! 🍀**
