#!/bin/bash

# Script de build específico para Netlify
echo "🚀 Iniciando build para Netlify..."

# Instalar dependencias con legacy-peer-deps
echo "📦 Instalando dependencias..."
npm ci --legacy-peer-deps

# Build del proyecto Angular
echo "🔨 Construyendo proyecto Angular..."
npm run build:netlify

echo "✅ Build completado exitosamente!"
