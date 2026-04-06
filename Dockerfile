# -----------------------
# 1. BUILD FRONTEND
# -----------------------
FROM node:18 AS frontend-build

WORKDIR /app

# Copiamos solo package.json primero (cache)
COPY client/package*.json ./client/

WORKDIR /app/client
RUN npm install

# Copiamos el resto del frontend
COPY client/ .

# Build React
RUN npm run build


# -----------------------
# 2. BACKEND
# -----------------------
FROM node:18

WORKDIR /app

# Copiar package.json del backend
COPY package*.json ./
RUN npm install --omit=dev

# Copiar backend
COPY . .

# Copiar build del frontend al backend
COPY --from=frontend-build /app/client/build ./client/build

# Puerto (ajústalo si usas otro)
EXPOSE 3000

CMD ["npm", "start"]
