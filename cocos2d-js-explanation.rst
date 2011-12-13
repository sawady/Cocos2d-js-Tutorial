*******************
Cocos2d-js Tutorial
*******************

Introducción
^^^^^^^^^^^^^^^^^^^^^

Cocos2d-javascript (Cocos2d-js) es un game engine 2d basado en la familia de frameworks Cocos2d.
Utiliza HTML 5 y no requiere de plugins adicionales en el navegador (mucho menos Adobe Flash).

La documentación oficial de la API se encuentra en `cocos2d-api <http://cocos2d-javascript.org/documentation>`_

Cocos2d-js simplifica la creación de juegos a través de diversos elementos (no todos implementados actualmente):
 - Sprites
 - Acciones
 - Efectos
 - Sistema de partículas
 - Tiled maps
 - Detección de colisiones
 - Escenas y Transiciones entre ellas
 - Control del flujo del juego
 - Menus y Textos
 - Sistema de física

Instalación
^^^^^^^^^^^^^^^^^^^^^

En windows: descargar el último .msi de la página oficial
En linux: bajar la versión 0.38 de Node js (las más recientes no funcionan actualmente 1/12/2011) e instalar cocos2d-js desde los sources más recientes.

Administración de proyectos Cocos2d-js
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Luego de instalado Cocos2d-js, es posible usar el comando ``cocos`` para poder administrar proyectos.

Los parámetros disponibles son:
- cocos help: Muestra la lista de comandos disponibles
- cocos new:  Crea un nuevo proyecto cocos de un nombre dado.
- cocos server: Estando en el directorio de un proyecto levanta un servidor en el puerto 4000 para testear la aplicación
- cocos make:  Genera un compilado de los archivos .js de nuestro proyecto llevandolo a un único archivo que puede ser utilizado en cualquier página web


Nodos
^^^^^^^^^^^^^^^^^^^^^

En los frameworks cocos2d en general, existe la idea de ``Node`` (nodo en inglés), que representa a los elementos que podemos combinar al crear juegos, que van a realizar acciones, contener otros nodos o simplemente escuchar eventos.

Acciones
^^^^^^^^^^^^^^^^^^^^^

Un objeto ``Action`` representa algo que un nodo puede realizar al pedirle que ejecute dicha acción. El framework provee `muchas acciones <http://cocos2d-javascript.org/documentation/cocos2d-javascript/edge/cocos.actions>`_ y es uno de los fuertes del mismo.

Ejemplo:

``var player = Player.create();``

``player.runAction( MoveTo.create({x: 10, y: 50}) );``

Eso moverá sprite a la posición indicada. Las acciones nos permiten reificar acciones que pueden ser reutilizadas por varios nodos. Esto nos permite desacoplar la definición de los sprites de aquellas acciones que pueden realizar durante su vida.

Las acciones se dividen en ``ActionInstant`` y ``ActionInterval``. Las primeras son acciones que duran sólo un instante (``MoveTo``, ``ScaleTo``, etc) y las segundas son acciones que duran un intervalo de tiempo (``MoveBy``, ``ScaleBy``, etc).

En conclusión cualquier nodo (Sprites, Layers, Scenes) pueden ejecutar una acción.

Combinación de acciones
^^^^^^^^^^^^^^^^^^^^^^^

Las acciones pueden ser combinadas (realizadas al mismo tiempo) o secuenciadas (una despues de otra). La combinación de acciones genera una nueva acción que puede ser pasada a un nodo.

Para combinar acciones poseemos los objetos ``Spawn`` y ``Sequence``, que respectivamente ejecutan acciones en simultáneo y secuenciadas.

Ejemplo:

``var accion1 = MoveTo.create({x: 10, y: 50});``

``var accion2 = ScaleTo.create({width: 2, height: 2});``

``var combinacion = Spawn.create(accion1, accion2);``

``var sprite = Player.create();``

``sprite.runAction(combinacion) // se mueve y se agranda al mismo tiempo;``

Por último existen un modificador de acciones llamado ``repeatForever``, que es un objeto que al construirse toma una acción y devuelve la repetición por tiempo indefinido de dicha acción.

Director
^^^^^^^^

El objeto ``Director`` es el componente que se encarga del flujo del juego, y en general de intercambiar las escenas que definamos. Además posee información que va a ser compartida por todos los objetos del juego.

Dicho objeto es singleton, lo que significa que podemos accederlo desde cualquier objeto del framework. Conoce la escena activa en cada momento y posee una stack de escenas para poder retomar las anteriores. Cuando queres cambiar a una escena nueva hacemos ``push`` y cuando queremos retomar la anterior a la actual hacemos ``pop``.

El ``Director`` también es responsable de inicializar la ventana principal del juego.

Escenas
^^^^^^^^^^

Las escenas representan una parte del juego que va a ser ejecutada en solitario. Por ejemplo, una escena puede ser el menu principal, otra el primer nivel y otra el segundo nivel. Cada escena posee su propia lógica y su propio conjunto de layers y sprites relacionados. Las escenas nos permiten separar mejor el flujo general del juego, e inclusive permitirnos programarlo en porciones bien definidas.

Ejemplo:
.. image:: http://cocos2d.org/doc/programming_guide/scenes.png

Una escena en el framework es implementada a través del objeto ``Scene``, al cual le podemos agregar ``Layers``.

Ejemplo:

``var scene = cocos.nodes.Scene.create();``

``scene.addChild({child: GameLayer.create()});``

``director.runWithScene(scene);``

Capas
^^^^^

Una capa representa la superficie sobre la que se van a dibujar varios objetos visuales. Una escena  puede ser pensada también como una stack de capas.

Ejemplo de capas:        

.. image:: http://cocos2d.org/doc/programming_guide/layers.png

Las capas son representadas por el objeto ``Layer``, que también es un ``Node``.

Los nodos que agregamos a las capas poseen un valor en el eje z.

Ejemplo:

``aLayer.addChild({child: aChild, z: 1})``

Sprites
^^^^^^^^^
Un sprite cocos2d es una imagen 2D que puede ser movida, rotada, re-dimensionada, animada, etc. Los sprites (implementados usando la clase ``Sprite``) pueden tener como hijos a otros sprites. Cuando un padre sufre una transformación, todos sus hijos la sufren también.
Como los sprites son subclase de ``Node``, pueden transformarse manualmente o mediante acciones. Vease ``Actions``, ``Transformations`` y ``Effects`` para más detalles sobre las acciones.

Ejemplo:

``Sprite.create({ file: ‘/resources/sprites.png’, newRect(0,0,25,25) })``

Modificadores de Acciónes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Modificadores de tiempo
   - ``Accelerate`` (acelerar)
   - ``AccelDeccel`` (acelerar y desacelerar)
   - ``Speed`` (velocidad constante)
   - ``Reverse`` (revertir)

``var reverseMoveTo = Reverse.create( MoveBy.create({x: 5, y: 10}) )``

Cambios de Escena
^^^^^^^^^^^^^^^^^^^^^^^

Como mencionamos antes, una de las principales responsabilidades del ``Director`` es manejar el control de flujo de las escenas.

Para ello, el director provee una API:

``director.replaceScene( new_scene )``
``director.pushScene( new_scene )``
``director.popScene()``

Para reemplazar la escena actual con una nueva, debes usar ``Director.replaceScene``, y para apilar una nueva en el stack, ``Director.pushScene``. La vieja escena quedará en la pila, debajo de la nueva. Puedes quitar una escena de la pila con ``Director.popScene``.

Eventos del teclado
^^^^^^^^^^^^^^^^^^^^^

Podemos tomar eventos del teclado si el layer en su inicialización setea ``isKeyboardEnabled`` en ``true``.

Con eso, podemos implementar los métodos ``keyDown`` y ``keyUp``, los cuales reciben por parametro  un ``key_evt`` que podemos utilizar para averiguar qué tecla fue presionada (entre otras cosas). Entonces, con ``key_evt['keyCode']`` podemos obtener la tecla presionada.

Los códigos de las teclas pueden ser consultados en la siguiente `dirección <http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes>`_.

Eventos del mouse
^^^^^^^^^^^^^^^^^^^^^

De forma similar a los eventos por teclado, definimos en la inicialización del layer ``isKeyboardEnabled`` en ``true``. De ahí en más podemos implementar los métodos ``mouseMoved``, por ejemplo. Aquí el evento que recibimos por parámetro posee información relacionada con la cantidad de movimiento realizado por el mouse y la posición en la que se encuentre en la pantalla actualmente. También podemos implementar ``mouseDown`` que nos pemitirá manejar los botones presionados del mouse.
