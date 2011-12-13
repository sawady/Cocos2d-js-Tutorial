*******************
Pongjs
*******************

Objetos:
^^^^^^^^^^^^^^^^^^^^^

*Player:

El ‘player’ es un objeto que contiene un sprite el que indica como sera su posicionamiento y su aspecto, y no posee lógica de comportamiento en su clase

*Ball:
Posee como principal  método  el ‘update’ el cual sera llamado frente a una interacción, el mismo, posee métodos auxiliares los cuales son encargados de verificar colisiones de la pelota con los jugadores, como así también la colisión de la pelota con los limites del tablero, dichas colisiones tendrán como impacto la modificación en la dirección y/o en la velocidad del objeto ‘ball’

*Game:

El ‘game’ contiene un layer el cual posee a ball, player,player2,playerPoints,player2Points,    playerPointsLabel y player2PointsLabel. Le pide al ‘director’ el tamaño que debe poseer.
Y se pone de oyente del teclado, para ello es necesario setear en true la variable 'isKeyboardEnabled', y crear un función keyDown la cual definirá que sucede cuando se presionan ciertas teclas.

*Main:
Una vez creado estos objetos y habiendoles dado comportamiento,
lo que se hace es crear al director, la scene, agrego el  layer en la scene y se pone a correr la scene. Y … a Jugar!!
