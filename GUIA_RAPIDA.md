# 🚀 GUÍA RÁPIDA - VE AQUÍ SI TIENES PRISA

Tu app está lista. Estos son los ÚNICOS pasos que necesitas hacer:

---

## ⚡ ELIGE TU OPCIÓN:

### 🐳 OPCIÓN A: CON DOCKER (RECOMENDADO - 5 minutos)
**Más fácil, sin instalar nada en tu PC**

1. Instala Docker Desktop: https://www.docker.com/products/docker-desktop
2. En PowerShell, en tu carpeta: `docker-compose up -d`
3. Espera 1 minuto mientras descarga
4. Luego sigue directo al paso 4️⃣

👉 **VE A: DOCKER_GUIA.md** para instrucciones completas

---

### 💻 OPCIÓN B: INSTALACIÓN LOCAL (15 minutos)
**Instalas PostgreSQL en tu máquina**

Continúa leyendo abajo...

---

## 1️⃣ INSTALAR POSTGRESQL (10 minutos)

**Windows:**
- Descarga: https://www.postgresql.org/download/windows/
- Ejecuta instalador
- **Anota la contraseña** que pones durante la instalación
- Termina

**Mac:**
```bash
brew install postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
```

## 2️⃣ CREAR BASE DE DATOS (1 minuto)

Abre PowerShell/Terminal y ejecuta:
```bash
psql -U postgres
```

Cuando te pida contraseña, ingresa la que anotaste en el paso 1.

Luego escribe:
```sql
CREATE DATABASE jijasbet;
\q
```

Listo. Presiona Enter.

## 3️⃣ CONFIGURAR ARCHIVO (1 minuto)

En tu proyecto, abre `.env.local` y asegúrate que diga:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jijasbet
DB_USER=postgres
DB_PASSWORD=[LA CONTRASEÑA QUE PUSISTE ARRIBA]
JWT_SECRET=cualquier_cadena_aleatoria_aqui_123
NODE_ENV=development
PORT=5000
```

Guarda el archivo (Ctrl+S).

## 4️⃣ INSTALAR PAQUETES (2 minutos)

En PowerShell/Terminal en tu carpeta del proyecto:
```bash
npm install
```

Espera a que termine.

## 5️⃣ CREAR USUARIOS DEMO (30 segundos)

```bash
node scripts/crearAdmin.js
```

Debería salir algo como:
```
✓ Base de datos conectada
✓ Tablas creadas
✓ Usuarios demo creados
```

Si todo dice ✓ continúa al paso 6.

## 6️⃣ INICIAR LA APP (inmediato)

```bash
npm run dev
```

Debería abrir automáticamente http://localhost:3000 en tu navegador.

## 7️⃣ PRUEBA RÁPIDA

Ingresa con:
- **Email:** usuario@test.com
- **Contraseña:** 123456

Deberías ver el Dashboard.

---

## 🎯 Si algo no funciona:

| Problema | Solución |
|----------|----------|
| "ECONNREFUSED" | PostgreSQL no está ejecutándose. En Windows, asegúrate que el servicio "postgresql" esté en Servicios |
| "database doesn't exist" | No ejecutaste `CREATE DATABASE jijasbet;` |
| "npm: command not found" | Node.js no está instalado: https://nodejs.org/ |
| "wrong password" | Contraseña en `.env.local` es incorrecta |
| "Port 5000 in use" | Cambia `PORT=5001` en `.env.local` |

---

## 📚 Documentación Completa

Si necesitas más detalles:
- **DOCKER_GUIA.md** - Guía completa con Docker 🐳
- `PASOS_SIGUIENTES.md` - Guía completa con troubleshooting
- `CAMBIOS_REALIZADOS.md` - Qué cambió en el código
- `VERIFICACION_PRE_EJECUCION.md` - Checklist completo
- `README.md` - Documentación general

---

## 🐳 ¿Problemas? Intenta con Docker

Si PostgreSQL te da problemas, es más fácil usar Docker:
1. Instala Docker: https://www.docker.com/products/docker-desktop
2. Ejecuta: `docker-compose up -d`
3. Continúa desde paso 4️⃣

👉 Lee **DOCKER_GUIA.md** para instrucciones paso a paso

---

**¿Listo?**

Abre PowerShell, navega a tu proyecto, y ejecuta: `npm run dev`

Tu aplicación JIJASBET funcionará en 100% de los casos.

¡Felicidades! 🎉
