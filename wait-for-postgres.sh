#!/bin/bash
# Script para esperar a que PostgreSQL esté listo

HOST=${DB_HOST:-localhost}
PORT=${DB_PORT:-5432}
USER=${DB_USER:-postgres}
PASSWORD=${DB_PASSWORD:-postgres}
DB=${DB_NAME:-jijasbet}

echo "⏳ Esperando a que PostgreSQL esté listo..."
echo "   Host: $HOST:$PORT"

# Intentar conectar cada segundo, máximo 30 intentos
for i in {1..30}; do
  echo -n "."
  
  # Usando pg_isready si está disponible, si no usar nc
  if pg_isready -h "$HOST" -p "$PORT" -U "$USER" 2>/dev/null; then
    echo ""
    echo "✅ PostgreSQL está listo!"
    exit 0
  fi
  
  sleep 1
done

echo ""
echo "❌ Timeout: PostgreSQL no respondió en 30 segundos"
exit 1
