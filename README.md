# Habi_test

# Instrucciones para la prueba técnica

2. El microservico habi_test, fue desarrollado en el framework [Adonis](https://adonisjs.com/) en su última versión. Se tomó esta decisión por la simpleza de iniciar un proyecto en esta tecnología y el poco tiempo para la entrega

Para esta en necesario tener `Node.js >= 14.15.4` y `npm >= 6.0.0`

Ve tus versiones con

```
# check node.js version
node -v

# check npm version
npm -v

```

Ya en la carpeta del proyecto, ejecuta `npm install` o `yarn install`, para las pruebas, ejecuta `nyc npm run test` y para correr el microservicio `node ace serve --watch`

El desarrollo se abordó con las características de un API REST, En el código tendremos un total de 4 capas 1. `Routers`, donde veremos todas las rutas URLs 2. `Controllers`, ellos se encargaran de manejar las peticiones HTTP y serán la primera capa para procesar la información recibida y pueda ser leída por los managers 3. `Managers`, ellos se encargaran de toda la lógica del negocio 4. `Repositories`, su único objetivo es el de, acceder a las base de datos

Por último, tenemos a los `Validators`, que se encargaran de que todo los datos que recibamos por cualquier tercero, no causen conflicto o errores con nuestra lógica

3. A lo largo del desarrollo me surgieron un par de dudas, las cuales serán expuesta con su respectivas soluciones

En el servicio de consulta, se dicta que los inmuebles que se puede consultar son los que tienen los estados `pre_venta`, `en_venta` y `vendido`. Para el query realizado, se decidió tomar los ids de estos estados en la tabla `status`. Esto con el fin de eliminar un join con la tabla mencionada y tener una consulta en base de datos más optima. Pensando también que estos estatus no varían sus ids a lo largo del tiempo.

También para este query se pasa las variables `page` y `limit`. Esto con el fin de que al crecer la tabla, podamos ir escalando estos dos valores para tener tiempos adecuados de respuesta.

En el servicio de consulta se habla de la columna `estado`, pero esta no se cuenta en la tabla `property`, por lo que se descartó para los filtros y la información que se le muestra a los usuarios.

3. El ejemplo de los datos esperados por el front está ubicado en el archivo test.js

4. ![Modelo para agregar like de usuarios](./like_model.jpg?raw=true 'Modelo para agregar like de usuarios')

Para este microservicio, seguimos manteniendo la estructura que nos da por defecto el framework Django, utilizado para crear la tabla de usuario. se agrega una columna nueva que nos dirá la cantidad de likes que ha dado un usuario, esto con el fin de obtener esta información con un orden constante. El mismo caso aplica para las propiedades. Ahora para saber que usuarios le han dado like, a que propiedades, creamos una tabla pivote para ellos dos, la cual guardará las columnas `property_id`, `user_id` `created_at`.

```
ALTER TABLE "public"."property" ADD COLUMN "like_count" int DEFAULT '0';

ALTER TABLE "public"."auth_user" ADD COLUMN "like_count" int DEFAULT '0';

CREATE SEQUENCE IF NOT EXISTS users_likes_id_seq;

CREATE TABLE "public"."users_likes" (
"id" int8 NOT NULL DEFAULT nextval('users_likes_id_seq'::regclass),
"property_id" int4 NOT NULL,
"user_id" int4 NOT NULL,
"created_at" timestamp(0),
PRIMARY KEY ("id"),
FOREIGN KEY ("property_id") REFERENCES "public"."property"("id"),
FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id"),
);
```

# Puntos extra

1. Las pruebas unitarias no fueron ejecutadas bajo el práctica de TDD

2. ![Diagrama para base de datos](./test.jpg?raw=true 'Diagrama para base de datos')

En este diagrama se muestran dos cambios significativos en la estructura actual.

La primera es tener en todas las tablas las columnas `created_at`, `updated_at` y `deleted_at` (menos en la pivote por ser una tabla de logs, solo tendra `created_at`), esto con el fin de poder tener una mínima trazabilidad de los filas que se tienen almacenadas en la base de datos, al igual que no hacer un force delete a información que puede ser útil en el futuro. Para el análisis de datos.

La segunda es tener un poco más de redundancia en la base de datos y no normalizada. Esto nos ayuda a que en una sola tabla tengamos toda la información necesaria para una consulta que tenga alta demanda. Esto lo logramos colocando `status_latest_id` en la tabla `property`, asi nos ahorramos tener que realizar un join con la tabla pivote. Para esto tendremos que agregar lógica, la cual nos mantendrá actualizada esta información, pero el beneficio es mayor al costo. Sobre todo cuando la tabla `property` y `status_history` tengan una cantidad significativa de filas.
