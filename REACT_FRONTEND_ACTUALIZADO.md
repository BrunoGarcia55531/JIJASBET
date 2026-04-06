# Frontend React Actualizado para PostgreSQL

## Cambios Realizados

### 1. **Componentes Actualizados**

#### Dashboard.js
- Cambio de `apuesta._id` → `apuesta.id`
- Cambio de `apuesta.pagoYape?.estado` → `apuesta.estadoPago`
- Cambio de `apuesta.motivoRechazo` (acceso directo, era anidado)
- Cambio de `apuesta.partido.equipo1` → `apuesta.equipoLocal`
- Cambio de `apuesta.partido.equipo2` → `apuesta.equipoVisitante`

#### NuevaApuesta.js
- Actualización de la estructura de envío de datos:
  - **Antes**: `{ partido: { equipo1, equipo2, liga, fecha }, ... }`
  - **Ahora**: `{ equipoLocal, equipoVisitante, liga, fechaPartido, ... }`
- Cambio de `apuestaCreada._id` → `apuestaCreada.id`
- Actualización de rutas de API para usar IDs planos

#### AdminPanel.js
- Cambio de todos los `_id` a `id`
- Cambio de `a.pagoYape?.estado` → `a.estadoPago`
- Cambio de `apuesta.pagoYape?.comprobante` → `apuesta.comprobante`
- Cambio de `apuesta.partido.equipo1` → `apuesta.equipoLocal`
- Cambio de `apuesta.partido.equipo2` → `apuesta.equipoVisitante`
- Actualización de referencias en modales (verificar, rechazar, resultado)

### 2. **Backend Actualizado**

#### api/routes/apuestas.js
- Actualización de la ruta POST `/` para recibir datos planos:
  ```javascript
  // Recibe: equipoLocal, equipoVisitante, liga, fechaPartido, tipoApuesta, montoApuesta, cuota
  // En lugar de: partido: { equipo1, equipo2, liga, fecha }
  ```

### 3. **Estructura de Datos PostgreSQL**

**Tabla: Apuestas**
```
- id (INTEGER, PRIMARY KEY)
- usuarioId (INTEGER, FOREIGN KEY)
- nombreUsuario (STRING)
- equipoLocal (STRING)          ← antes partido.equipo1
- equipoVisitante (STRING)      ← antes partido.equipo2
- liga (STRING)                 ← antes partido.liga
- fechaPartido (DATE)           ← antes partido.fecha
- tipoApuesta (STRING)
- montoApuesta (FLOAT)
- cuota (FLOAT)
- montoGanancia (FLOAT)
- comprobante (TEXT)            ← antes pagoYape.comprobante
- numeroTransaccion (STRING)    ← antes pagoYape.numeroTransaccion
- montoPagado (FLOAT)           ← antes pagoYape.montoPagado
- estadoPago (ENUM)             ← antes pagoYape.estado
- motivoRechazo (TEXT)          ← antes pagoYape.motivoRechazo
- resultadoPartido (STRING)
- apuestaGanada (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## Verificación de Compatibilidad

✅ **Frontend:** Los componentes React ahora enviaban y reciben datos con la estructura plana de PostgreSQL
✅ **Backend:** Las rutas API fueron actualizadas para procesador correctamente los datos
✅ **Base de Datos:** El esquema de Sequelize define todos los campos necesarios

## Próximos Pasos

1. **Instalar PostgreSQL**
2. **Crear base de datos**: `jijasbet`
3. **Configurar `.env.local`** con credenciales PostgreSQL
4. **Instalar dependencias**: `npm install` (en root)
5. **Crear usuarios demo**: `node scripts/crearAdmin.js`
6. **Iniciar aplicación**: `npm run dev`

## Testing Manual Recomendado

1. **Registro de usuario**: Verifica que se cree un nuevo usuario en la tabla `Usuarios`
2. **Crear apuesta**: Verifica estructura de datos en tabla `Apuestas`
3. **Subir comprobante**: Verifica que se guarde correctamente en `comprobante` (base64)
4. **Panel admin**: Verifica que se muestren todas las apuestas correctamente
5. **Verificar pago**: Verifica cambio de `estadoPago` a 'verificado'
6. **Establecer resultado**: Verifica cálculo correcto de ganancia/pérdida

## Notas Importantes

- **IDs**: PostgreSQL usa INT, no ObjectId como MongoDB
- **Campos**: Ahora son planos en lugar de anidados (mejor para relaciones SQL)
- **Enums**: `estadoPago` tiene valores: 'pendiente', 'verificado', 'rechazado'
- **Imágenes**: Se guardan como base64 en el campo `comprobante` (TEXT)

## Archivos Modificados

- ✅ `client/src/pages/Dashboard.js`
- ✅ `client/src/pages/NuevaApuesta.js`
- ✅ `client/src/pages/AdminPanel.js`
- ✅ `api/routes/apuestas.js`

Todos los cambios han sido completados y están listos para pruebas con PostgreSQL.
