var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');

var Ball = cocos.nodes.Node.extend({

    velocity: null,

    init: function() {
        Ball.superclass.init.call(this);
        
        var sprite = cocos.nodes.Sprite.create({
            file: '/resources/sprites.png',
            rect: new geom.Rect(20, 0, 15, 16)
        });
         
        sprite.set('anchorPoint', new geom.Point(0, 0));
        this.addChild({child: sprite});
        this.set('contentSize', sprite.get('contentSize'));
        
        this.set('velocity', new geom.Point(320, 320));
        this.scheduleUpdate();
    },
    
    update: function(dt) {
        var pos = util.copy(this.get('position')),
            vel = util.copy(this.get('velocity'));
            
        pos.x += dt * vel.x;
        pos.y += dt * vel.y;
        
        this.set('position', pos);
        this.testPlayerCollision();
        this.testEdgeCollision();
    },
    
    testPlayerCollision: function() {
        var vel = util.copy(this.get('velocity')),
            ballBox = this.get('boundingBox'),
            
            // The parent of the ball is the Breakout Layer, which has a 'player'
            // property pointing to the player.
            playerBox = this.get('parent').get('player').get('boundingBox');
            player2Box = this.get('parent').get('player2').get('boundingBox');
     
        // If moving down then check for collision with the player
        if(vel.x < 0 && geom.rectOverlapsRect(ballBox, playerBox)){
            vel.x *= -1
        }
        
        if(vel.x > 0 && geom.rectOverlapsRect(ballBox, player2Box)){
            vel.x *= -1
        }        
     
        // Update position and velocity on the ball
        this.set('velocity', vel);
    },
    
    testEdgeCollision: function() {
        var vel = util.copy(this.get('velocity')),
            ballBox = this.get('boundingBox'),
            // Get size of canvas
            winSize = cocos.Director.get('sharedDirector').get('winSize');
            parent  = this.get('parent');
         
        // Moving left and hit left edge
        if (vel.x < 0 && geom.rectGetMinX(ballBox) < 0) {
            // Flip X velocity
            parent.incrementPlayer2Points()
            vel.x *= -1;
        }
         
        // Moving right and hit right edge
        if (vel.x > 0 && geom.rectGetMaxX(ballBox) > winSize.width) {
            // Flip X velocity
            parent.incrementPlayerPoints()
            vel.x *= -1;
        }
         
        // Moving up and hit top edge
        if (vel.y < 0 && geom.rectGetMinY(ballBox) < 0) {
            // Flip Y velocity
            vel.y *= -1;
        }
        
        // Moving down and hit bottom edge
        if (vel.y > 0 && geom.rectGetMaxY(ballBox) > winSize.height) {
            // Flip Y velocity            
            vel.y *= -1;
        }
         
        this.set('velocity', vel);
    }
});

exports.Ball = Ball;