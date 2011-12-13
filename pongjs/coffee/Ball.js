(function() {
  var Ball, cocos, geom, nodes, util;

  cocos = require('cocos2d');

  geom = require('geometry');

  util = require('util');

  nodes = cocos.nodes;

  Ball = nodes.Node.extend({
    velocity: null,
    init: function() {
      var sprite;
      Ball.superclass.init.call(this);
      sprite = nodes.Sprite.create({
        file: '/resources/sprites.png',
        rect: new geom.Rect(20, 0, 15, 16)
      });
      sprite.set('anchorPoint', new geom.Point(0, 0));
      this.addChild({
        child: sprite
      });
      this.set('contentSize', sprite.get('contentSize'));
      this.set('velocity', new geom.Point(320, 320));
      return this.scheduleUpdate();
    },
    update: function(dt) {
      var pos, vel;
      pos = util.copy(this.get('position'));
      vel = util.copy(this.get('velocity'));
      pos.x += dt * vel.x;
      pos.y += dt * vel.y;
      this.set('position', pos);
      this.testPlayerCollision();
      return this.testEdgeCollision();
    },
    testPlayerCollision: function() {
      var ballBox, player2Box, player2Collide, playerBox, playerCollide, vel;
      vel = util.copy(this.get('velocity'));
      ballBox = this.get('boundingBox');
      playerBox = this.get('parent').get('player').get('boundingBox');
      player2Box = this.get('parent').get('player2').get('boundingBox');
      playerCollide = vel.x < 0 && geom.rectOverlapsRect(ballBox, playerBox);
      player2Collide = vel.x > 0 && geom.rectOverlapsRect(ballBox, player2Box);
      if (playerCollide || player2Collide) vel.x *= -1;
      return this.set('velocity', vel);
    },
    testEdgeCollision: function() {
      var ballBox, bottomEdgeCollide, leftEdgeCollide, parent, rightEdgeCollide, topEdgeCollide, vel, winSize;
      vel = util.copy(this.get('velocity'));
      ballBox = this.get('boundingBox');
      winSize = cocos.Director.get('sharedDirector').get('winSize');
      parent = this.get('parent');
      leftEdgeCollide = vel.x < 0 && geom.rectGetMinX(ballBox) < 0;
      rightEdgeCollide = vel.x > 0 && geom.rectGetMaxX(ballBox) > winSize.width;
      topEdgeCollide = vel.y < 0 && geom.rectGetMinY(ballBox) < 0;
      bottomEdgeCollide = vel.y > 0 && geom.rectGetMaxY(ballBox) > winSize.height;
      if (topEdgeCollide || bottomEdgeCollide) vel.y *= -1;
      if (leftEdgeCollide || rightEdgeCollide) vel.x *= -1;
      if (rightEdgeCollide) parent.incrementPlayerPoints();
      if (leftEdgeCollide) parent.incrementPlayer2Points();
      return this.set('velocity', vel);
    }
  });

  exports.Ball = Ball;

}).call(this);
