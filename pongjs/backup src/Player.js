var cocos = require('cocos2d');
var geom = require('geometry');

var Player = cocos.nodes.Node.extend({

    init: function() {
       Player.superclass.init.call(this);
       
       var sprite = cocos.nodes.Sprite.create({
            file: '/resources/sprites.png',
            rect: new geom.Rect(0, 0, 20, 48)
        });
       
       sprite.set('anchorPoint', new geom.Point(0, 0));
       this.addChild({child: sprite});
       this.set('contentSize', sprite.get('contentSize'));
    }
});

exports.Player = Player;