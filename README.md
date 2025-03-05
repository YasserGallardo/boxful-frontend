# Instrucciones de Instalación y Uso

Este es un proyecto basado en Next.js. Sigue los siguientes pasos para instalar y configurar el entorno de desarrollo correctamente.

## 1. Instalación de dependencias

Primero, debes instalar las dependencias del proyecto. Ejecuta el siguiente comando en la raíz del proyecto:

npm install


## 2. Crear archivo .env
En la raíz del proyecto, crea un archivo llamado .env con el siguiente contenido:

NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1


## 3. Crear archivo .env.local
En la raíz del proyecto, crea un archivo llamado .env.local con el siguiente contenido:

NEXTAUTH_SECRET=tu_secreto_super_seguro


## 4. Desactivar las DevTools de Next.js (Opcional)
Si prefieres no ver las DevTools de Next.js en tu aplicación, puedes desactivarlas modificando el archivo next.config.js o next.config.ts. 



## 5. Ejecución del Proyecto
Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar el proyecto en modo desarrollo con el siguiente comando:

npm run dev
