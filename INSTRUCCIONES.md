# Catálogo de Laptops - Instrucciones de Instalación y Despliegue

## Requisitos Previos

- Node.js 18+ instalado
- npm o pnpm instalado
- Git instalado (para despliegue en Netlify)

## Instalación Local

### 1. Descomprimir el archivo ZIP

```bash
unzip laptops-catalog.zip
cd laptops-catalog
```

### 2. Instalar dependencias

```bash
pnpm install
```

O si usas npm:

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
pnpm dev
```

O con npm:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173` (o el puerto que indique la consola).

### 4. Compilar para producción

```bash
pnpm build
```

O con npm:

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados para producción.

## Estructura del Proyecto

```
laptops-catalog/
├── client/
│   ├── public/
│   │   ├── data/              # Archivos JSON con índices de categorías
│   │   └── laptops_markdown/  # Archivos Markdown de cada laptop
│   ├── src/
│   │   ├── pages/             # Páginas principales
│   │   ├── components/        # Componentes reutilizables
│   │   ├── App.tsx            # Configuración de rutas
│   │   └── main.tsx           # Punto de entrada
│   └── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Despliegue en Netlify

### Opción 1: Desde Git (Recomendado)

1. **Crear un repositorio en GitHub**
   - Ve a https://github.com/new
   - Crea un nuevo repositorio llamado `laptops-catalog`
   - No inicialices con README

2. **Subir el código a GitHub**
   ```bash
   cd laptops-catalog
   git init
   git add .
   git commit -m "Initial commit: Catálogo de laptops"
   git branch -M main
   git remote add origin https://github.com/CaldeIsa/laptops-catalog.git
   git push -u origin main
   ```

3. **Conectar a Netlify**
   - Ve a https://app.netlify.com
   - Haz clic en "New site from Git"
   - Selecciona GitHub y autoriza
   - Elige el repositorio `laptops-catalog`
   - Configura:
     - **Build command:** `pnpm build`
     - **Publish directory:** `dist`
   - Haz clic en "Deploy site"

### Opción 2: Despliegue Manual

1. **Compilar el proyecto**
   ```bash
   pnpm build
   ```

2. **Descargar la carpeta `dist/`**

3. **En Netlify**
   - Ve a https://app.netlify.com
   - Haz clic en "Sites"
   - Arrastra y suelta la carpeta `dist/` en el área de carga
   - ¡Listo! Tu sitio estará en línea en segundos

## Características del Sitio

✅ **Navegación por 4 categorías:**
- Por Marca (20+ marcas)
- Por Sistema Operativo (5+ sistemas)
- Por Tamaño de Pantalla (múltiples tamaños)
- Por Procesador (30+ procesadores)

✅ **837+ laptops** en el catálogo

✅ **Interfaz responsiva** que funciona en móvil, tablet y desktop

✅ **Búsqueda rápida** con filtrado por categoría

✅ **Información detallada** de cada laptop:
- Marca y modelo
- Procesador
- Sistema operativo
- RAM
- Almacenamiento
- Tamaño de pantalla
- Pantalla táctil
- Precio

## Solución de Problemas

### El sitio no carga correctamente

1. Asegúrate de que los archivos JSON están en `client/public/data/`
2. Verifica que los archivos Markdown están en `client/public/laptops_markdown/`
3. Limpia la caché del navegador (Ctrl+Shift+Delete)

### Error al instalar dependencias

```bash
# Limpia la caché de pnpm
pnpm store prune

# Intenta instalar de nuevo
pnpm install
```

### El servidor de desarrollo no inicia

```bash
# Verifica que el puerto 5173 está disponible
# Si no, puedes especificar otro puerto:
pnpm dev -- --port 3000
```

## Datos Utilizados

- **Archivo original:** `Laptops(1).csv` (837 laptops)
- **Archivos generados:**
  - `brands.json` - Índice de marcas
  - `operating-systems.json` - Índice de sistemas operativos
  - `screen-sizes.json` - Índice de tamaños de pantalla
  - `processors.json` - Índice de procesadores
  - `all-laptops.json` - Base de datos completa
  - 837 archivos Markdown individuales

## Contacto y Soporte

Si tienes problemas, verifica:
1. La consola del navegador (F12) para errores
2. La consola del servidor de desarrollo
3. Que todos los archivos de datos estén presentes

---

¡Disfruta tu catálogo de laptops! 🚀
