🚧 Proyecto en construcción 🚧 

# ExperienciasDiferentes

Proyecto integrador para la boost academy de Hackaboss.

"Experiencias Diferentes" es una plataforma web que ofrece una variedad de experiencias grupales para usuarios interesados en actividades como surf, barranquismo, masajes, buceo, excursiones en velero, y más. Los usuarios pueden registrarse en la plataforma, buscar y reservar experiencias, gestionar su perfil y dejar valoraciones sobre las experiencias que hayan disfrutado. Habrá un usuario administrador que es el encargado de añadir las experiencias y configurarlas.

Detallamos ahora qué puede hacer cada tipo de usuario:

USUARIO NO REGISTRADO
● Visualizar la landing con el listado de experiencias
● Búsqueda / filtro por:
○ palabra (en título, descripción o localidad)
○ activa/inactiva
○ rango de precio
○ rango de fechas
● Ordenación experiencias (fecha, rating, precio, …)
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
○ biografía
○ avatar
● Reservar la experiencia y ver los demás inscritos
● Listado experiencias reservadas
● Cancelar una reserva hasta el día anterior
● Rating de la experiencia después de disfrutarla (1-5)

USUARIO ADMINISTRADOR
● Visualizar la landing con el listado de experiencias
● Búsqueda, filtro y ordenación como un usuario no registrado
● Acceder a la ficha de una experiencia con todos los detalles

Tecnologías Utilizadas

    Backend: Node.js, Express.js, MySQL para la base de datos.
    Frontend: HTML, CSS, JavaScript, (*)
    Autenticación y Seguridad: (*)
    Gestión de Base de Datos: MySQL2
    Envío de Emails: (*)
    Otros: Git para control de versiones, GitHub para el repositorio del proyecto.

Instalación y Uso

1- Clona el repositorio desde GitHub
git clone git@github.com:DavidFuertes/ExperienciasDiferentes.git

2- Instala las dependencias del servidor y del cliente:
cd ExperienciasDiferentes
npm install

3- Configura las variables de entorno

- Crea un archivo `.env`en la raíz del proyecto y añade las siguientes variables:
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASS=123456
MYSQL_DB=experiencias_db
PORT=3000
SECRET=123456
UPLOADS_DIR=uploads
SMTP_HOST=el tuyo
SMTP_PORT=587
SMTP_USER=el tuyo
SMTP_PASS=el tuyo


VALIDATE_USER_URL=http://localhost:5173/validate/
RECOVERPASS_URL=http://localhost:5173/recover_password/


4- Inicia el servidor y el cliente:
npm run initDb (para arrancar la base de datos)
npm run dev

5- Accede a la app desde el navegador:
http://localhost:5173/

Autores

Developers:
Daniel Moreno Acedo
David Fuertes Rojas
Daniel Eireos Fernández
David Molinero Muñoz
Jorge Ortega Guedes
Xevi Arenas Rafael
Pol Gil Soto
