# Mainstack

Monorepo para una aplicación web moderna utilizando React (Vite) en el frontend y Hono.dev en el backend, todo escrito en TypeScript y gestionado con Bun.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
  - [Variables de entorno](#variables-de-entorno)
  - [Base de datos](#base-de-datos)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
  - [Modo Desarrollo](#modo-desarrollo)
  - [Modo Producción](#modo-producción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuciones](#contribuciones)
- [CI Pipeline](#ci-pipeline)
- [Despliegue](#despliegue)

## Requisitos Previos

- [Bun](https://bun.sh/) instalado globalmente.
- Node.js versión 18 o superior.
- Git.
- Sentry cli
- Docker
- [Act](https://github.com/nektos/act)
- Railway cli (opcional)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Felipeazs/mainstack.git
   cd mainstack
   ```

2. Instala las dependencias:

   ```bash
   bun install
   ```

3. opcional: Si ya está instalada la aplicación:

   ```bash
   bun run clean
   bun install
   ```

## Configuración

### Variables de entorno

1. Copia el archivo de ejemplo de variables de entorno:

   ```bash
   cp .env.example client/.env
   cp .env.example server/.env
   ```

2. Edita los archivos .env con las configuraciones específicas. Asegúrate de proporcionar las credenciales y URLs necesarias para los servicios externos:
   - [MongoDB](https://www.mongodb.com/docs/manual/reference/connection-string/)
   - [Sentry](https://docs.sentry.io/concepts/key-terms/dsn-explainer/)
   - [Posthog](https://posthog.com/docs/api)
   - [Cloudinary](https://support.cloudinary.com/hc/en-us/articles/202520942-Access-key-management-adding-and-removing-API-keys-and-secrets)
   - [Discord](https://discord.com/developers)
   - Redis: Variable disponible en Railway al crear un servicio de Redis

Todos estos servicios están linkeados a la cuenta de google o github

### Base de datos (UI)

1. Instala MongoDB Compass: https://www.mongodb.com/products/tools/compass
2. Copia el string de conexión de la base datos
3. Establece conexión a través de Compass

## Ejecución del Proyecto

### Modo Desarrollo

```bash
bun run build
bun run dev
```

La aplicación estará disponible en el puerto 5173 (frontend) y 3000 (backend)

### Modo Producción

```bash
bun run build
bun run start
```

La aplicación estará disponible en el puerto 3000

## Estructura del proyecto

```bash

|-- app # raíz
|   |-- client # frontend
|   |-- server # backend
|   |-- packages # utilidades compartidas
|-- .github # ci pipeline
|-- .env.example # ejemplo variables de entorno
|-- package.json # scripts
|-- tsconfig.json # configuración Typescript
|-- bun.lock # Lockfile de Bun
```

## Scripts Disponibles

| Comando           | Descripción                                  |
| ----------------- | -------------------------------------------- |
| bun install       | Instala todas las dependencias               |
| bun run dev       | Inicia cliente y servidor en modo desarrollo |
| bun run build     | Compila el proyecto para producción          |
| bun run start     | Arranca la app en modo producción            |
| bun run typecheck | Chequea tipos de variables                   |
| bun run lint      | Ejecuta ESLint                               |
| bun run lint:fix  | Corrige errores ESLint                       |
| bun run clean     | Elimina node_modules y el build              |

## Contribuciones

1. Crea una rama:

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Commit los cambios:

```bash
git commit -m "feat: X"
```

3. Enviar rama al repositorio remoto y abrir un Pull Request

# CI Pipeline

1. Crear un Auth token en Sentry
2. Agregar una nueva variable en github con el nombre de SENTRY_AUTH_TOKEN y pegar el auth token
3. Agregar variable en archivo .env
4. Testear en local con act:
   - act --list
   - act -j <job name>
5. Testear en github: git push origin main

# Despliegue

1. Ingresar a Railway (cuenta de Github)
2. Crear nuevo proyecto/servicio
3. Linkear repositorio al proyecto/servicio
4. Ingresar todas las variables de entorno -> deploy
5. Chequear Wait for CI -> deploy
6. Realizar un push para desplegar automáticamente los cambios al servidor

Alternativamente, se puede utilizar el [cli](https://docs.railway.com/guides/cli) de Railway para simplificar estos pasos
