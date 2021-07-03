# Habi_test

# Instrucciones para la prueba tecnica

2. El microservico habi_test, fue desarrollado en el framework [Adonis](https://adonisjs.com/) en su ultima version. Se tomo esta decesion por la simpleza de iniciar un proyecto en esta tecnologia y el poco tiempo para la entrega

Para esta en necesario tener `Node.js >= 14.15.4` y `npm >= 6.0.0`

Chequea tus versiones con

```
# check node.js version
node -v

# check npm version
npm -v

```

El desarrollo se abordo con las caracteristicas de un API REST, En el codigo tendremos un total de 4 capas 1. `Routers`, donde veremos todas las rutas URLs 2. `Controllers`, ellos se encargaran de manejar las peticiones HTTP y seran la primera capa para procesar la informacion recibi y pueda ser leida por los managers 3. `Managers`, ellos se encargaran de toda la logica del negocio 4. `Repositories`, su unico objectivo es el de, acceder a las base de datos

Por ultimo, tenemos a los `Validators`, que se encargaran de que todo los datos que recibamos por cualquier tercero, no causen conflicto con nuestra logica

3. A lo largo del desarrollo me surgieron un par de dudas, las cuales seran expuesta con su respectivas soluciones

   1. En el servicio de consulta, se dicta que los inmuebles que se puede consultar son los que tienen los estados `pre_venta`, `en_venta` y `vendido`. Para el query realizado, se decidio tomar los ids de estos estados en la tabla `status`. Esto con el fin de ahorranos un join con la tabla mencionada y tener una consulta en base de datos mas optima. Pensando tambien que estos estatus varian muy poco a lo largo del tiempo.

   Tambien para este query se pasa las variables `page` y `limit`. Esto con el fin de que al crecer la tabla, podemos ir escalando estos dos valores para tener tiempos adecuados de repuesta.

   2. En el servicio de consulta se habla de la columna `estado`, pero esta no se cuenta en la tabla `property`, por lo que se descarto para los filtro y la informacion que se le muestra a los usuarios.

4. El ejemplo de los datos esperados por el front esta ubicado en el archivo test.js
