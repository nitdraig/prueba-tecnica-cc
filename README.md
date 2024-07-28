
# API RESTful - Observaciones Astronómicas


## *Prueba técnica*
## Enunciado
### 1) Se deberá crear una API RestFull, de observaciones astronómicas que permita a los usuarios crear observaciones y hacer consultas de éstas.
- La base de datos En PostgreSQL deberá tener 3 tablas (user, celestialBodies, observations).
**Relaciones de la base de datos:**
  Usuarios -   Observaciones: Un usuario puede tener múltiples observaciones.
  Cuerpos celestes  - Observaciones: Un cuerpo celeste puede ser observado en múltiples ocasiones.

--> El objetivo es que mediante el desarrollo del código un usuario se pueda registrar y loguear.
--> Se debe poder crear una observación, obtenerla, modificarla y para eliminarla solo lo podrá hacer un usuario que tenga el rol de Administrador.
--> Se deben implementar middlewares de manejo de errores, validaciones, y autenticaciones de roles.


### 2) La estructura del código es algo importante para trabajar de manera ordenada y eficiente; por eso mismo el formato
de carpetas que debera presentarse es el siguiente:
/index.js: en este archivo va lo relacionado con el servidor. Crearlo y levantarlo.
/middlewares: una carpeta con los middlewares a utilizar. Cada función middleware debe estar con un archivo propio.
/routes: carpeta con los endpoints.
/controllers: carpeta con la lógica de cada endpoint. Es decir el código para manejar las rutas de las peticiones.
.env: archivo con las variables de entorno que no se deben mostrar.

## Uso
### Clonar repositorio

```git
git clone https://github.com/nitdraig/prueba-tecnica-cc.git
```

### Ingresar en carpeta clonada
```npm
cd prueba-tecnica-cc
```

### Instalar dependencias 

```npm
npm i
```
### Iniciar el proyecto

```npm
npm run start
```
## Endpoints
### 1. **Registrar Usuario**

- **Método:** `POST`
- **URL:** `/api/users/register`
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Cuerpo (Body):**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password",
    "role": "user"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
  ```

### 2. **Iniciar Sesión**

- **Método:** `POST`
- **URL:** `/api/users/login`
- **Descripción:** Inicia sesión con un usuario existente y devuelve un token JWT.
- **Cuerpo (Body):**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Respuesta:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### 3. **Crear un Cuerpo Celeste**

- **Método:** `POST`
- **URL:** `/api/celestialBodies`
- **Descripción:** Crea un nuevo cuerpo celeste en el sistema.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "name": "Mars"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "celestial_body_id",
    "name": "Mars"
  }
  ```

### 4. **Obtener Todos los Cuerpos Celestes**

- **Método:** `GET`
- **URL:** `/api/celestialBodies`
- **Descripción:** Obtiene todos los cuerpos celestes registrados en el sistema.
- **Respuesta:**
  ```json
  [
    {
      "id": "celestial_body_id",
      "name": "Mars"
    },
    {
      "id": "another_celestial_body_id",
      "name": "Jupiter"
    }
  ]
  ```

  ### 5. **Modificar los Cuerpos Celestes**

- **Método:** `PUT`
- **URL:** `/api/celestialBodies/:id`
- **Descripción:** Actualiza un cuerpo celeste registrados en el sistema por ID. Solo accesible para administradores.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  [
    {
      "id": "celestial_body_id",
      "name": "Mars"
    }
  ]
  ```

  
### 6. **Eliminar una Observación (Solo Administradores)**

- **Método:** `DELETE`
- **URL:** `/api/celestialBodies/:id`
- **Descripción:** Elimina un cuerpo celeste existente. Solo accesible para administradores.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  {
      "message": "Celestial body deleted successfully"
  }
  ```


### 7. **Crear una Observación**

- **Método:** `POST`
- **URL:** `/api/observations`
- **Descripción:** Crea una nueva observación astronómica para el usuario autenticado.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "date": "2024-07-28T00:00:00Z",
    "description": "Observation of Mars",
    "celestialBodyId": "id_of_the_celestial_body"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "observation_id",
    "date": "2024-07-28T00:00:00Z",
    "description": "Observation of Mars",
    "celestialBodyId": "id_of_the_celestial_body",
    "userId": "user_id"
  }
  ```

### 8. **Obtener Todas las Observaciones del Usuario**

- **Método:** `GET`
- **URL:** `/api/observations`
- **Descripción:** Obtiene todas las observaciones realizadas por el usuario autenticado.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  [
    {
      "id": "observation_id",
      "date": "2024-07-28T00:00:00Z",
      "description": "Observation of Mars",
      "celestialBodyId": "id_of_the_celestial_body",
      "userId": "user_id"
    }
  ]
  ```

### 9. **Actualizar una Observación**

- **Método:** `PUT`
- **URL:** `/api/observations/:id`
- **Descripción:** Actualiza una observación existente del usuario autenticado.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "date": "2024-07-29T00:00:00Z",
    "description": "Updated observation description",
    "celestialBodyId": "id_of_the_celestial_body"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "observation_id",
    "date": "2024-07-29T00:00:00Z",
    "description": "Updated observation description",
    "celestialBodyId": "id_of_the_celestial_body",
    "userId": "user_id"
  }
  ```

### 10. **Eliminar una Observación (Solo Administradores)**

- **Método:** `DELETE`
- **URL:** `/api/observations/:id`
- **Descripción:** Elimina una observación existente. Solo accesible para administradores.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  {
    "id": "observation_id",
    "message": "Observation deleted successfully"
  }
  ```
