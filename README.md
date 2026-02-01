React Native (Proyecto Final)

Aplicación móvil desarrollada con React Native + Expo que implementa persistencia de datos, sincronización offline y conexión con Firebase, cumpliendo con las consignas del proyecto final.

La temática base es un sistema de gestión de turnos, aplicando los mismos conceptos que un ecommerce (listado, reserva/compra, estado, sincronización).


Consignas cumplidas

- Aplicación móvil con persistencia de datos
- Sincronización offline
- Manejo de estado con Redux Toolkit
- Navegación entre pantallas
- Uso de SQLite
- Documentación del proyecto


Arquitectura del proyecto

La aplicación utiliza una arquitectura, donde los datos se gestionan localmente y luego se sincronizan.

Los datos se almacenan localmente utilizando SQLite.

Cada registro posee un estado de sincronización:

- `pending`: pendiente de sincronizar
- `synced`: sincronizado con Firebase


1. El usuario crea o reserva un turno
2. Se guarda localmente en SQLite
3. Redux carga el estado desde SQLite
4. Cuando hay conexión, RTK Query sincroniza con Firebase

Tabla `turnos`:

- id
- dia
- hora
- tratamiento
- reservado
- reservadoPor
- syncStatus

La base se inicializa al iniciar la aplicación.

El manejo de estado global se realiza con Redux Toolkit, utilizando:

- store
- slices
- RTK Query para sincronización

Esto permite una separación clara entre:
- lógica de negocio
- persistencia
- UI

Componentes reutilizables

- Tarjetas de turnos
- Botones personalizados
- Formularios reutilizables


Este proyecto fue desarrollado con fines educativos, aplicando los conceptos vistos en clase:
- arquitectura
- manejo de estado
- persistencia
- sincronización offline
- documentación
- alguna ayuda de chat gpt como en este resumen, gracias por su tiempo.