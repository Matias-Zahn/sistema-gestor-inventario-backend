# 📦 Sistema Gestor de Inventario (RESTful API)

> **Backend profesional** diseñado para la gestión de inventarios en tiempo real, con foco en la escalabilidad, integridad de datos y arquitectura de software.

Este proyecto implementa una API RESTful robusta utilizando **Node.js** y **TypeScript**, estructurada bajo los principios de **Clean Architecture**. No solo gestiona productos, sino que resuelve problemas complejos de backend como la concurrencia en ventas y la comunicación orientada a eventos mediante Webhooks.

## 🚀 Características Clave

### 🏗️ Arquitectura & Diseño
* **Clean Architecture:** Estricta separación de responsabilidades (Domain, Infrastructure, Presentation). La lógica de negocio no depende de frameworks ni bases de datos.
* **Patrón Repository:** Abstracción de la capa de datos para facilitar el testing y la mantenibilidad.
* **DTOs (Data Transfer Objects):** Validación estricta y sanitización de datos de entrada antes de procesar cualquier regla de negocio.

### ⚙️ Ingeniería de Backend
* **Gestión de Stock Atómica:** Uso de operaciones atómicas (`$inc`) en MongoDB para evitar **Condiciones de Carrera (Race Conditions)**. Garantiza que el stock nunca se corrompa, incluso si múltiples ventas ocurren simultáneamente.
* **Sistema de Notificaciones (Webhooks):** Integración con **Discord** para alertar en tiempo real sobre eventos críticos del negocio (Ej: *Stock por debajo del mínimo permitidio*, *Nuevos productos creados*).
* **Manejo de Errores Centralizado:** Implementación de `CustomErrors` para respuestas HTTP consistentes y predecibles.

## 🛠️ Tech Stack

* **Core:** Node.js, Express.js
* **Lenguaje:** TypeScript (Strict Mode)
* **Base de Datos:** MongoDB & Mongoose
* **Validaciones:** Validaciones personalizadas en DTOs
* **Entorno:** Docker & Docker Compose

## 📂 Estructura del Proyecto

El código sigue una estructura modular agnóstica a la infraestructura:

```text
src/
├── domain/           # Reglas de Negocio, Entidades, Interfaces (Repositorios/Servicios)
├── infrastructure/   # Implementación de DB, Webhooks y Mappers
├── presentation/     # Servidor Express, Controllers y Rutas
├── data/             # Conexión a Base de Datos (Mongo)
└── config/           # Variables de entorno y adaptadores
