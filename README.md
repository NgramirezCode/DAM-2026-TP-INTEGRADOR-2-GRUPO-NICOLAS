# Travel

## Objetivo de la aplicación

Travel es una aplicación móvil diseñada para ayudar a los viajeros a organizar, registrar y descubrir lugares. Resuelve la necesidad de mantener un seguimiento claro de los destinos pendientes, acceder a un historial de lugares ya visitados, visualizarlos geográficamente y explorar recomendaciones de otros usuarios de la comunidad.

## Principales Funcionalidades

- **Autenticación Segura:** Registro e inicio de sesión integrados con Firebase Authentication. Los perfiles guardan nombre, edad y nacionalidad.
- **CRUD de Destinos:** Creación, lectura, actualización (marcar como visitado/favorito) y eliminación de lugares.
- **Mapa Interactivo:** Visualización de destinos mediante marcadores en el mapa usando coordenadas obtenidas por GPS (`expo-location` y `react-native-maps`). Permite guardar nuevos destinos presionando sobre el mapa.
- **Historial de Viajes:** Listado exclusivo de lugares completados/visitados.
- **Comunidad y Favoritos:** Exploración de destinos marcados como favoritos por otros usuarios, con la opción de adoptarlos a la lista personal de tareas pendientes.

## Tecnologías Utilizadas

- **Frontend:** React Native, Expo, React Navigation (Native Stack).
- **Backend / Persistencia Remota:** Firebase Authentication, Cloud Firestore.
- **Geolocalización:** expo-location, react-native-maps.

## Cómo instalarla y ejecutarla

1. Clonar este repositorio:
   ```bash
   git clone [https://github.com/NgramirezCode/DAM-2026-TP-INTEGRADOR-2-GRUPO-NICOLAS.git]
   cd TravelApp
   ```
2. Instalar las dependencias del proyecto:

```bash
npm install
```

3. Configurar variables de entorno (Firebase):

- Crear el archivo src/firebase/config.js basándose en la estructura provista en src/firebase/config.example.js.

- Ingresar las credenciales proporcionadas por la consola de Firebase.

4. Escanear el código QR con la aplicación Expo Go (Android/iOS) o presionar "a" para abrir en emulador de Android.

## Integrantes del Grupo

- Nicolás Gabriel Ramírez

## Limitaciones conocidas

- La aplicación actualmente no soporta el guardado de imágenes en la nube (Firebase Storage), limitándose a texto y coordenadas geográficas.

- El mapa requiere que el usuario acepte manualmente los permisos de GPS al ingresar por primera vez a la pantalla.
