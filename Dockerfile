# Build stage para frontend React
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage final: Node.js backend + React frontend
FROM node:18-alpine
WORKDIR /app

# Instalar dependencias del backend
COPY package*.json ./
RUN npm install --only=production

# Copiar backend
COPY api/ ./api/
COPY scripts/ ./scripts/

# Copiar frontend compilado
COPY --from=client-build /app/client/build ./client/build

# Exponer puerto
EXPOSE 5000

# Comando para iniciar
CMD ["node", "api/server.js"]
