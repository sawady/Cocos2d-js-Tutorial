(function() {
  var Player, cocos, geom;

  cocos = require('cocos2d');

  geom = require('geometry');

  Player = cocos.nodes.Node.extend({
    init: function() {
      var sprite;
      Player.superclass.init.call(this);
      sprite = cocos.nodes.Sprite.create({
        file: '/resources/sprites.png',
        rect: new geom.Rect(0, 0, 20, 48)
      });
      sprite.set('anchorPoint', new geom.Point(0, 0));
      this.addChild({
        child: sprite
      });
      return this.set('contentSize', sprite.get('contentSize'));
    }
  });

  exports.Player = Player;

}).call(this);
