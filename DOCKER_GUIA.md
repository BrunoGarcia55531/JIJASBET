# 🐳 JIJASBET con Docker - Guía Rápida

## ¿Por qué Docker?
✅ **Sin instalar PostgreSQL** en tu PC
✅ **Más fácil** - 3 comandos
✅ **Reproducible** - Funciona igual en cualquier máquina
✅ **Limpio** - Todo en contenedores, nada instalado localmente
✅ **Rápido** - Listo en 2 minutos

---

## PASO 1: Instalar Docker

### Windows
Descarga e instala: https://www.docker.com/products/docker-desktop

**Después de instalar:**
- Reinicia tu PC
- Abre PowerShell
- Verifica: `docker --version`

### Mac
```bash
brew install docker
# O descargar Docker Desktop desde https://www.docker.com/products/docker-desktop
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
# Reinicia la terminal
```

---

## PASO 2: Iniciar PostgreSQL con Docker

En PowerShell, dentro del directorio del proyecto:

```powershell
docker-compose up -d
```

**¿Qué hace?**
- Descarga imagen PostgreSQL (primera vez ~500MB)
- Crea contenedor `jijasbet-postgres`
- Inicia la BD en el puerto 5432
- Crea base de datos "jijasbet" automáticamente

**Verifica que funcionó:**
```powershell
docker ps
```

Deberías ver algo como:
```
CONTAINER ID   IMAGE               STATUS
abc123def456   postgres:15-alpine  Up 2 minutes
```

---

## PASO 3: Configurar .env.local

Abre `.env.local` y asegúrate de que tenga:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jijasbet
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=tu_secret_key_muy_seguro
NODE_ENV=development
PORT=5000
```

✨ **La contraseña es "postgres"** (definida en docker-compose.yml)

---

## PASO 4: Instalar Dependencias

```powershell
npm install
```

---

## PASO 5: Crear Usuarios Demo

```powershell
node scripts/crearAdmin.js
```

---

## PASO 6: Iniciar la Aplicación

```powershell
npm run dev
```

✨ Se abrirá automáticamente: `http://localhost:3000`

---

## 🔐 Credenciales de Prueba

```
USUARIO: usuario@test.com
CONTRASEÑA: 123456

ADMIN: admin@test.com
CONTRASEÑA: admin123
```

---

## 📋 Comandos Docker Útiles

### Ver estado de PostgreSQL
```powershell
docker ps
```

### Ver logs de PostgreSQL
```powershell
docker logs jijasbet-postgres
```

### Detener PostgreSQL
```powershell
docker-compose down
```

### Reiniciar PostgreSQL
```powershell
docker-compose restart
```

### Ver datos guardados (después de down)
```powershell
docker volume ls
# Volumen: jijasbet-1_postgres_data
```

### Borrar TODO incluidos datos
```powershell
docker-compose down -v
# -v = borrar volúmenes también
```

---

## 🔧 Troubleshooting Docker

### "docker: command not found"
✗ Docker no está instalado
✓ Solución: Instala Docker Desktop

### "Cannot connect to Docker daemon"
✗ Docker no está ejecutándose
✓ Solución: Abre Docker Desktop

### "Port 5432 already in use"
✗ Otro contenedor o PostgreSQL local usa puerto 5432
✓ Soluciones:
```powershell
# Opción 1: Detener otro contenedor
docker-compose down

# Opción 2: Cambiar puerto en docker-compose.yml
# Línea: ports: - "5433:5432"
# Luego en .env.local: DB_PORT=5433
```

### "Error response from daemon: driver failed programming external connectivity"
✗ Problema con Docker networking
✓ Solución: Reinicia Docker Desktop

### Container se apaga solo
```powershell
docker logs jijasbet-postgres
# Ver qué error tiene
```

---

## 📊 Archivos Docker Creados

```
docker-compose.yml   ← Define PostgreSQL con imagen oficial
Dockerfile          ← Define imagen del app (opcional)
.dockerignore        ← Archivos a ignorar al buildear
```

---

## 🚀 Flujo Completo (Primera Vez)

```bash
1. docker-compose up -d           # Encender PostgreSQL
2. npm install                     # Instalar dependencias
3. node scripts/crearAdmin.js     # Crear BD + usuarios
4. npm run dev                    # Iniciar app
```

**Resultado: ✅ App funcionando en 5 minutos**

---

## 🌳 Flujo Completo (Días Posteriores)

Mañana, cuando quieras volver a trabajar:

```bash
1. docker-compose up -d           # Encender PostgreSQL
2. npm run dev                    # Iniciar app
```

**¡Eso es todo!** Los datos persisten.

---

## 🧹 Limpiar Todo (Opcional)

Si quieres empezar de cero:

```powershell
# Detener containers y borrar volúmenes
docker-compose down -v

# Luego:
docker-compose up -d
node scripts/crearAdmin.js
npm run dev
```

---

## ✨ Ventajas vs Instalación Local

| Aspecto | Local | Docker |
|--------|-------|--------|
| Instalación | 10+ minutos | 2 minutos |
| Configuración | Compleja | Simple (docker-compose.yml) |
| Limpieza | Difícil (archivos esparcidos) | Fácil (docker-compose down) |
| Reproducibilidad | Variable | Garantizado |
| Múltiples proyectos | Conflictos posibles | Sin conflictos |
| Recursos | Permanente en PC | Solo cuando lo necesitas |

---

## 🎯 Recomendación

**Para desarrollo: USA DOCKER** ✅
- Más fácil
- Más limpio
- Más profesional
- Mismo setup en todo el equipo

---

## 🆘 Necesitas Ayuda?

1. ¿Docker no inicia? → Abre Docker Desktop
2. ¿Puerto ocupado? → `docker-compose down` primero
3. ¿No conecta a BD? → Verifica `.env.local`
4. ¿Otros errores? → `docker logs jijasbet-postgres`

---

**¡Ahora ejecuta `docker-compose up -d` y olvídate de instalar PostgreSQL! 🎉**
