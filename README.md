# 🚀 Rick and Morty Character Explorer

Una aplicación web moderna construida con **Next.js 15**, **TypeScript** y **Tailwind CSS** que permite explorar personajes del universo de Rick and Morty y analizar sus episodios compartidos.

## 🌟 Demo en Vivo

**[🔗 Ver Aplicación en Vivo](https://ricky-and-morty-app-seven.vercel.app/)**

## ✨ Características Principales

- 🎭 **Exploración de Personajes**: Navegación intuitiva por todos los personajes de Rick and Morty
- 🔍 **Búsqueda y Filtros**: Filtrado por nombre y estado (vivo, muerto, desconocido)
- 📊 **Análisis de Episodios**: Compare dos personajes y descubra sus episodios compartidos
- 🎬 **Visualización de Episodios**: Explore episodios únicos y compartidos entre personajes
- 📱 **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- ⚡ **Alto Rendimiento**: Paginación optimizada y lazy loading
- 🎨 **Tema Rick and Morty**: Diseño inspirado en la serie con colores característicos
- 🔄 **Auto-scroll**: Navegación automática al seleccionar personajes
- ✨ **Animaciones Suaves**: Transiciones y efectos visuales atractivos

## 🛠️ Stack Tecnológico

### Framework y Lenguajes
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React 19** - Biblioteca de UI

### Styling y UI
- **Tailwind CSS** - Framework de CSS utilitario
- **React Icons** - Icons vectoriales
- **IBM Plex Mono** - Tipografía monoespaciada

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Testing utilities para React
- **@testing-library/user-event** - Simulación de eventos de usuario

### Calidad de Código
- **ESLint** - Linter de JavaScript/TypeScript
- **Prettier** - Code formatter
- **Husky** - Git hooks
- **Commitlint** - Conventional commits

### HTTP Client y Manejo de Errores
- **Axios** - Cliente HTTP para API requests
- **Sistema de Reintentos** - Mecanismo de retry con backoff exponencial
- **Manejo Inteligente de Errores** - Diferenciación entre errores de cliente (4xx) y servidor (5xx)

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- npm, yarn o pnpm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd next-test-ricky
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

4. **Editar variables de entorno** (`.env.local`)
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://rickandmortyapi.com/api
   NEXT_PUBLIC_ITEMS_PER_PAGE=12
   ```

5. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecuta la aplicación en modo desarrollo con Turbopack

# Construcción
npm run build        # Construye la aplicación para producción
npm run start        # Ejecuta la aplicación en modo producción

# Testing
npm run test         # Ejecuta todos los tests
npm run test:watch   # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con reporte de cobertura

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run prepare      # Configura Husky (se ejecuta automáticamente)
```

## ⚙️ Configuración del Proyecto

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API de Rick and Morty | `https://rickandmortyapi.com/api` |
| `NEXT_PUBLIC_ITEMS_PER_PAGE` | Número de elementos por página | `12` |

### Configuración de Tailwind CSS

El proyecto usa un tema personalizado con colores inspirados en Rick and Morty:

```javascript
colors: {
  'rick-green': '#87F54E',    // Verde característico de Rick
  'space-dark': '#0A0B0D',    // Fondo oscuro del espacio
  'portal-blue': '#00C6FB',   // Azul de los portales
  'morty-yellow': '#FFF200',  // Amarillo de Morty
}
```

### Testing

- **Cobertura de tests**: 95%+ en líneas, statements y funciones
- **Mocks configurados**: API calls, localStorage, DOM APIs
- **Tests integrados**: Flujos completos de usuario
- **Jest DOM**: Matchers personalizados para testing de componentes

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página de inicio
│   └── not-found.tsx   # Página 404
├── components/          # Componentes React
│   ├── ui/             # Componentes base reutilizables
│   └── [features]/     # Componentes específicos por funcionalidad
├── hooks/              # Custom React hooks
├── services/           # Servicios externos (API)
├── types/              # Definiciones de TypeScript
├── utils/              # Funciones utilitarias
├── styles/             # Estilos globales
└── __tests__/          # Tests organizados por estructura
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
```

### Cobertura Actual

- **Statements**: 95%+
- **Branches**: 80%+
- **Functions**: 90%+
- **Lines**: 95%+

### Tipos de Tests

- **Unit Tests**: Componentes individuales y hooks
- **Integration Tests**: Flujos completos de usuario
- **API Tests**: Servicios y manejo de errores

## 🎨 Características de UI/UX

### Diseño Responsivo
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Adaptativo**: Layout que se ajusta según el tamaño de pantalla

### Animaciones y Transiciones
- **Fade In/Out**: Transiciones suaves entre estados
- **Hover Effects**: Efectos interactivos en tarjetas y botones
- **Loading States**: Skeletons y spinners durante la carga
- **Auto-scroll**: Navegación automática al seleccionar personajes

### Accesibilidad
- **Semantic HTML**: Estructura semántica correcta
- **ARIA Labels**: Etiquetas para screen readers
- **Keyboard Navigation**: Navegación completa por teclado
- **Color Contrast**: Contraste adecuado para legibilidad

## 🔧 Herramientas de Desarrollo

### Git Hooks (Husky)
- **Pre-commit**: Ejecuta lint y tests antes de commit
- **Commit-msg**: Valida formato de commits convencionales

### ESLint y Prettier
- **Configuración personalizada** para Next.js y TypeScript
- **Auto-formatting** en save
- **Rules específicas** para Tailwind CSS

### Commitlint
Formato de commits convencionales:
```
type(scope): description

# Ejemplos:
feat: add character comparison feature
fix: resolve pagination bug
docs: update README
test: add unit tests for hooks
```

## 🚀 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otros Providers
La aplicación es compatible con:
- **Netlify**
- **AWS Amplify**
- **Google Cloud Platform**
- **Heroku**

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'feat: add AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Guía de Contribución
- Sigue las convenciones de commits
- Mantén la cobertura de tests al 90%+
- Documenta nuevas funcionalidades
- Asegúrate de que todos los tests pasen

## 📝 API Reference

La aplicación utiliza la [Rick and Morty API](https://rickandmortyapi.com/):

- **Characters**: `/character` - Lista de personajes con paginación
- **Episodes**: `/episode` - Información de episodios
- **Filters**: Soporte para filtros por nombre y estado

## 🛡️ Sistema de Manejo de Errores

La aplicación implementa un robusto sistema de manejo de errores HTTP con las siguientes características:

### 🔄 Mecanismo de Reintentos Inteligente

```typescript
// Configuración por defecto
{
  retries: 3,           // Número máximo de reintentos
  retryDelay: 1000,     // Delay inicial en ms
  timeout: 10000        // Timeout por request
}
```

### 📊 Estrategia de Backoff Exponencial

- **Intento 1**: Falla → Espera 1000ms
- **Intento 2**: Falla → Espera 2000ms  
- **Intento 3**: Falla → Espera 4000ms
- **Máximo**: Lanza error final

### ⚡ Lógica de Reintentos por Tipo de Error

| Código de Estado | Comportamiento | Razón |
|------------------|---------------|-------|
| **2xx** | ✅ Éxito | Request exitoso |
| **4xx** | ❌ No reintenta | Error de cliente (datos inválidos, no autorizado) |
| **5xx** | 🔄 Reintenta | Error de servidor (temporal, puede resolverse) |
| **Red/Timeout** | 🔄 Reintenta | Problemas de conectividad |

### 🔧 Funcionalidades Avanzadas

- **Interceptores de Request/Response**: Logging automático de todas las peticiones
- **Manejo de Headers**: Configuración dinámica de headers de autenticación
- **Patrón Singleton**: Instancia única del cliente HTTP en toda la aplicación
- **TypeScript**: Tipado estricto para mayor seguridad y mejor DX

### 📝 Ejemplo de Uso

```typescript
// Configuración personalizada con reintentos
const result = await httpClient.get('/character', {
  retries: 5,         // Máximo 5 reintentos
  retryDelay: 2000,   // Espera inicial de 2 segundos
  headers: {
    'Custom-Header': 'value'
  }
});

// Headers dinámicos
httpClient.setHeader('Authorization', 'Bearer token');
httpClient.removeHeader('X-Old-Header');
```

### 🧪 Cobertura de Tests

El sistema de manejo de errores tiene **97.91% de cobertura** con tests que cubren:

- ✅ Reintentos en errores de servidor (5xx)
- ✅ No reintentos en errores de cliente (4xx)  
- ✅ Backoff exponencial correcto
- ✅ Manejo de timeouts y errores de red
- ✅ Interceptores de request/response
- ✅ Gestión de headers dinámicos
- ✅ Patrón singleton

## 🐛 Problemas Conocidos

- Los filtros se resetean al cambiar de página (comportamiento intencional)
- El auto-scroll solo funciona en la primera selección de personaje

## 📄 Licencia

Este proyecto es de uso educativo y demostración. 

## 👨‍💻 Autor

Desarrollado con ❤️ usando la Rick and Morty API

---

**¿Te gusta el proyecto?** ⭐ ¡Dale una estrella en GitHub!