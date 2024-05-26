🚧 Proyecto en construcción 🚧

# ExperienciasDiferentes

Proyecto integrador para la boost academy de Hackaboss.

"Experiencias Diferentes" es una plataforma web que ofrece una variedad de experiencias grupales para usuarios interesados en actividades como surf, barranquismo, masajes, buceo, excursiones en velero, y más. Los usuarios pueden registrarse en la plataforma, buscar y reservar experiencias, gestionar su perfil y dejar valoraciones sobre las experiencias que hayan disfrutado. Habrá un usuario administrador que es el encargado de añadir las experiencias y configurarlas.

Detallamos ahora qué puede hacer cada tipo de usuario:

USUARIO NO REGISTRADO
● Visualizar la landing con el listado de experiencias
● Búsqueda / filtro por:
    ○ palabra (en título, descripción o localidad)
    ○ rango de precio
    ○ rango de fechas
● Ordenación experiencias (fecha, rating, precio, número de plazas)
● Registro (con envío e-mail de validación)
    ○ e-mail
    ○ username
    ○ Contraseña
● Login con enlace de recuperación contraseña

USUARIO REGISTRADO / CLIENTE
● Visualizar la landing con el listado de experiencias
● Búsqueda, filtro y ordenación como un usuario no registrado
● Acceder a la ficha de una experiencia con todos los detalles
● Gestión del perfil (edición de datos)

    ○ e-mail
    ○ username
    ○ contraseña
    ○ nombre y apellidos
    ○ ciudad de residencia
    ○ lenguajes hablados
    ○ avatar

● Reservar experiencias.
● Listado de experiencias reservadas, divididas entre pendientes y ya disfrutadas.
● Cancelar una reserva hasta el día anterior.
● Rating de la experiencia después de disfrutarla (1-5).
● Añadir comentarios a una experiencia ya disfrutada o no.

USUARIO ADMINISTRADOR
● Visualizar la landing con el listado de experiencias
● Búsqueda, filtro y ordenación como un usuario no registrado
● Acceder a la ficha de una experiencia con todos los detalles
● Gestionar una experiencia, puediendo modificar:
    ○ Datos de la experiencia
    ○ Moderar los comentarios de la experiencia
    ○ Cancelar una experiencia
● Crear una nueva experiencia desde cero.
● Duplicar una experiencia, modificando información de la misma.
● Gestión de usuarios de la base de datos, pudiendo eliminarlos.

Tecnologías Utilizadas

    Backend: Node.js, Express.js, cloudinary.
    Frontend: HTML, CSS, JavaScript, React.
    Autenticación y Seguridad: Crypto, Joi, Jwebtoken, uuid, randomString.
    Gestión de Base de Datos: MySQL2
    Envío de Emails: mailtrap, nodemailer.
    Otros: Git para control de versiones, GitHub para el repositorio del proyecto.

Instalación y Uso

1- Clona el repositorio desde GitHub
git clone git@github.com:DavidFuertes/ExperienciasDiferentes.git

2- Instala las dependencias del servidor tanto en el backend como en el frontend:
cd Backend
npm install
cd ../frontend
npm install

3- Configura las variables de entorno

- Crea un archivo `.env`en el backend y añade las siguientes variables:
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=user
  MYSQL_PASS=pass
  MYSQL_DB=experiencias_db
  PORT=3000
  SECRET=
  UPLOADS_DIR=uploads
  SMTP_HOST=host
  SMTP_PORT=port
  SMTP_USER=user
  SMTP_PASS=pass
  VALIDATE_USER_URL=http://localhost:5173/validate/
  RECOVERPASS_URL=http://localhost:5173/recover_password/
  CLOUDINARY_NAME=user
  CLOUDINARY_API_KEY=pass
  CLOUDINARY_API_SECRET=pass
  DEAFULT_AVATAR_URL=https://res.cloudinary.com/dgokuinpf/image/upload/v1716326293/xpysvk4rojtzoejtawjg.png
  DEFAULT_RELAJADO_URL=https://res.cloudinary.com/dgokuinpf/image/upload/v1716327208/cacitbknylfaq7d7ylaw.jpg
  DEFAULT_MEDIO_URL=https://res.cloudinary.com/dgokuinpf/image/upload/v1716327208/m9ktxaxugoinupjicahc.jpg
  DEFAULT_ADRENALINA_URL=https://res.cloudinary.com/dgokuinpf/image/upload/v1716327208/xtqfpzw8wvk1sayghqqp.jpg

- Crea un archivo `.env`en el frontend y añade la siguiente variable:

VITE_BACKEND_URL=http://localhost:8080

4- Inicia el servidor y el cliente:
-En el backend:
npm run initDb (para arrancar la base de datos)
npm run dev
-En el frontend:
npm run dev

5- Accede a la app desde el navegador:
http://localhost:5173/

Autores

Developers:
David Fuertes Rojas
Daniel Eireos Fernández
David Molinero Muñoz
Jorge Ortega Guedes
Xevi Arenas Rafael
