
<<<<<<< HEAD
# API RESTful - Observaciones Astronómicas


*Prueba técnica*
=======

# API RESTful para Observaciones Astronómicas
>>>>>>> a9cef2c6dd294e3872b9b6ad4395f7b0a913ca16

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

### 5. **Crear una Observación**

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

### 6. **Obtener Todas las Observaciones del Usuario**

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

### 7. **Actualizar una Observación**

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

### 8. **Eliminar una Observación (Solo Administradores)**

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
<<<<<<< HEAD
=======

>>>>>>> a9cef2c6dd294e3872b9b6ad4395f7b0a913ca16
