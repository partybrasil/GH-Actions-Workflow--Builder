# 🎛️ GH-Actions-Workflow-Builder

<div align="center">

**Constructor Visual Interactivo de Workflows para GitHub Actions**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-32B8C6?style=for-the-badge)](https://partybrasil.github.io/GH-Actions-Workflow-Builder/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Ready-success?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![No Backend](https://img.shields.io/badge/Backend-None-blue?style=for-the-badge)](https://github.com)
[![Templates](https://img.shields.io/badge/Templates-210+-orange?style=for-the-badge)](data/templates.json)

**[✨ Demo Online](#-demo-online) • [🚀 Características](#-características-destacadas) • [📖 Uso](#-uso-básico) • [🤝 Contribuir](#-contribuir)**

</div>

---

## 🌟 ¿Qué es GH-Actions-Workflow-Builder?

**GH-Actions-Workflow-Builder** es una aplicación web **100% client-side** (sin backend) que permite crear workflows de GitHub Actions de forma visual e interactiva. Con más de **210 templates predefinidos** organizados en categorías, puedes explorar, personalizar y exportar workflows listos para usar en tus proyectos.

### ✨ Características Destacadas

🎯 **Interfaz Visual Interactiva** para explorar y seleccionar templates  
📦 **210+ Templates** predefinidos listos para usar  
🎨 **6 Categorías** organizadas: CI/CD, Deploy, Testing, Release, Notify, Custom  
🔍 **Búsqueda Inteligente** por nombre, descripción o tags  
🖱️ **Playground Interactivo** para visualizar y editar workflows  
🌈 **Vista Previa en Tiempo Real** del YAML generado  
⚡ **Export Instantáneo** descarga el .yml o copia al portapapeles  
📋 **Validación Básica** del workflow antes de exportar  
💾 **Funciona Offline** tras la primera carga (PWA-ready)  
🌐 **GitHub Pages** alojamiento gratuito y sin configuración  
📱 **Responsive Design** funciona en móvil, tablet y desktop  
🎭 **Tema GitHub Dark** interfaz familiar para desarrolladores

---

## 🚀 Demo Online

👉 **[https://partybrasil.github.io/GH-Actions-Workflow-Builder/](https://partybrasil.github.io/GH-Actions-Workflow-Builder/)**

---

## 📦 Instalación y Uso

### Opción 1: Usar Online (Recomendado)

Simplemente visita el demo online arriba. No requiere instalación.

### Opción 2: Clonar y Ejecutar Localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/partybrasil/GH-Actions-Workflow-Builder.git
cd GH-Actions-Workflow-Builder

# 2. Iniciar servidor HTTP local (elige una opción)

# Opción Python 3:
python -m http.server 8000

# Opción Python 2:
python -m SimpleHTTPServer 8000

# Opción Node.js:
npx http-server -p 8000

# Opción PHP:
php -S localhost:8000

# 3. Abrir en navegador
# http://localhost:8000/docs/
```

### Opción 3: Desplegar en Tu GitHub Pages

```bash
# 1. Haz Fork de este repositorio en GitHub

# 2. Ve a Settings > Pages
# Source: Deploy from branch
# Branch: main
# Folder: /docs
# Save

# 3. Espera unos minutos
# Tu app estará en: https://TU-USUARIO.github.io/GH-Actions-Workflow-Builder/
```

---

## 💡 Uso Básico

### 1️⃣ Explorar Templates

1. **Navega por categorías** en el sidebar izquierdo:
   - 🔄 CI/CD (50+ templates)
   - 🚀 Deploy (40+ templates)
   - 🧪 Testing (35+ templates)
   - 📦 Release (25+ templates)
   - 📢 Notify (20+ templates)
   - ⚙️ Custom (40+ templates)

2. **Busca templates** usando el campo de búsqueda global

3. **Haz click en una card** para cargar el template en el playground

### 2️⃣ Visualizar y Personalizar

Una vez cargado el template:
- **Visualiza la estructura** del workflow con jobs y steps
- **Lee la vista previa YAML** en tiempo real
- **Explora el Actions Marketplace** en el sidebar derecho

### 3️⃣ Exportar

- **📥 Export YAML**: Descarga el archivo `.yml` listo para usar
- **📋 Copy**: Copia el YAML al portapapeles
- **✅ Validate**: Valida la estructura básica del workflow

### 4️⃣ Usar en tu Proyecto

```bash
# 1. Crea la carpeta de workflows en tu proyecto
mkdir -p .github/workflows

# 2. Guarda el archivo exportado
# Ejemplo: .github/workflows/ci.yml

# 3. Commit y push
git add .github/workflows/ci.yml
git commit -m "feat: add GitHub Actions workflow"
git push

# ¡Listo! El workflow se ejecutará automáticamente
```

---

## 🎨 Categorías de Templates

| Categoría        | Cantidad | Ejemplos                                           |
|------------------|----------|----------------------------------------------------|
| 🔄 CI/CD         | 50+      | Node.js CI, Python CI, Docker Build, Maven, etc.   |
| 🚀 Deploy        | 40+      | GitHub Pages, Vercel, AWS, Azure, Firebase, etc.   |
| 🧪 Testing       | 35+      | Jest, Pytest, Cypress, Playwright, CodeQL, etc.    |
| 📦 Release       | 25+      | Semantic Release, GitHub Release, npm Publish, etc.|
| 📢 Notify        | 20+      | Slack, Discord, Email, Telegram, MS Teams, etc.    |
| ⚙️ Custom        | 40+      | Auto PR labeler, Stale issues, Dependabot, etc.    |

**Total: 210+ templates**

---

## 🔧 Características Técnicas

### 🌐 Stack Tecnológico

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Grid, Flexbox, diseño responsive mobile-first
- **JavaScript ES6+**: Vanilla JS sin frameworks, módulos nativos
- **Sin Backend**: 100% client-side, sin servidor necesario
- **Sin Base de Datos**: LocalStorage para persistencia local
- **GitHub Pages**: Hosting gratuito y automático

### 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**:
  - Mobile: < 768px (1 columna, menú hamburguesa)
  - Tablet: 768px - 1024px (2 columnas)
  - Desktop: > 1024px (3 columnas, sidebar fijo)

---

## 📂 Estructura del Proyecto

```text
GH-Actions-Workflow-Builder/
├── docs/                      # GitHub Pages root
│   ├── index.html             # Aplicación principal
│   ├── data/
│   │   └── templates.json     # 210+ workflow templates
│   └── assets/
│       ├── css/
│       │   └── styles.css     # Estilos responsive
│       └── js/
│           └── app.js         # Lógica de la aplicación
├── .gitignore
├── LICENSE (MIT)
└── README.md
```

---

## ✨ Mejoras Recientes y Calidad del Código

### 🔍 Mejoras de Experiencia de Usuario

**Error Handling Mejorado**
- Mensajes de error más específicos al cargar templates
- Notificaciones detalladas cuando falla la carga de recursos
- Sistema de reintentos para fallos de red

**Validación de Workflows**
- Mensajes de validación con formato HTML mejorado
- Uso de `<br>` tags para mejor legibilidad en toast notifications
- Lista de problemas con viñetas para fácil lectura

**Documentación del Código**
- Parser YAML documentado con limitaciones claras
- Comentarios explicativos sobre funciones complejas
- Advertencias sobre uso correcto de funcionalidades

### 🎯 Mejoras de UX/UI

**Actions Marketplace**
- Removido atributo `draggable` innecesario de items
- Cursor cambiado a `pointer` para indicar clickeabilidad
- Mejor feedback visual en hover

**Comentarios HTML**
- Sintaxis HTML correcta en todos los comentarios
- Eliminados comentarios JavaScript-style en archivos HTML
- Mejor mantenibilidad del código

### 🔧 Parser YAML Simple

El parser YAML incluido tiene las siguientes características y limitaciones:

**Características:**
- Extrae estructura básica: name, on, jobs, steps
- Visualización de jobs y steps para templates
- Rápido y sin dependencias externas

**Limitaciones documentadas:**
- No maneja estructuras YAML complejas
- No soporta anchors, references o multi-line strings
- Solo para propósitos de visualización
- No usar para generación o validación de YAML

### 🛡️ Mejores Prácticas

- **Sin dependencias externas**: Todo el código es vanilla JS
- **Seguridad**: No se ejecuta código externo
- **Performance**: Carga instantánea, <1s tiempo de respuesta
- **Accesibilidad**: ARIA labels, navegación por teclado
- **Mantenibilidad**: Código limpio y bien documentado

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 🎉

### Cómo Contribuir

1. **Fork** el repositorio
2. Crea una rama: `git checkout -b feature/nuevo-template`
3. Añade tu template a `data/templates.json`
4. Commit: `git commit -m 'feat: add nuevo-template'`
5. Push: `git push origin feature/nuevo-template`
6. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- **[GitHub Actions](https://github.com/features/actions)** - La plataforma de CI/CD
- **[GitHub Pages](https://pages.github.com)** - Hosting gratuito
- **[GitHub Starter Workflows](https://github.com/actions/starter-workflows)** - Inspiración para templates
- Comunidad open source por templates y feedback

---

<div align="center">

### 🚀 Desplegado con GitHub Pages

**[Ver Demo Online →](https://partybrasil.github.io/GH-Actions-Workflow-Builder/)**

---

Hecho con ❤️ para la comunidad de GitHub Actions

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-orange?style=for-the-badge)

</div>
