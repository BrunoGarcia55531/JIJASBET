# -----------------------
# BUILD FRONTEND
# -----------------------
FROM node:18 AS build

WORKDIR /app

COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm install

COPY client/ .
RUN npm run build


# -----------------------
# BACKEND
# -----------------------
FROM node:18

WORKDIR /app

# instalar backend
COPY package*.json ./
RUN npm install --omit=dev

# copiar backend
COPY . .

# copiar frontend build al final (IMPORTANTE)
COPY --from=build /app/client/build ./client/build

EXPOSE 3000
CMD ["npm", "start"]