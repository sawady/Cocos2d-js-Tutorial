// Import the cocos2d module
var cocos = require('cocos2d');
// Import the geometry module
var geo = require('geometry');

/*
    Game classes
*/
var Player = require('Player').Player;
var Ball = require('Ball').Ball;

// Create a new layer
var Pongjs = cocos.nodes.Layer.extend({

    ball: null,
    player: null, 
    player2: null, 
    playerPoints: 0,
    player2Points: 0,
    playerPointsLabel: null,
    player2PointsLabel: null,
 
    init: function() {
        // You must always call the super class version of init
        Pongjs.superclass.init.call(this);
 
        // Add Player
        var player = Player.create();
        player.set('position', new geo.Point(15, 160));
        this.addChild({child: player});
        this.set('player', player);

        // Add Player
        var player2 = Player.create();
        player2.set('position', new geo.Point(465, 160));
        this.addChild({child: player2});
        this.set('player2', player2);
        
        // Add Ball
        var ball = Ball.create();
        ball.set('position', new geo.Point(160, 250));
        this.addChild({child: ball});
        this.set('ball', ball);
        
        // Create label
        var playerPointsLabel = cocos.nodes.Label.create({string: '0', fontName: 'Arial', fontSize: 32});
        // Get size of canvas
        var canvasSize = cocos.Director.get('sharedDirector').get('winSize');
        // Add label to layer
        this.addChild({child: playerPointsLabel, z:1});
        // Position the label in the centre of the view
        playerPointsLabel.set('position', geo.ccp(canvasSize.width / 2 - 30, canvasSize.height / 2));
        this.set('playerPointsLabel', playerPointsLabel)
        
        // Create label
        var player2PointsLabel = cocos.nodes.Label.create({string: '0', fontName: 'Arial', fontSize: 32});
        // Add label to layer
        this.addChild({child: player2PointsLabel, z:1});
        // Position the label in the centre of the view
        player2PointsLabel.set('position', geo.ccp(canvasSize.width / 2 + 30, canvasSize.height / 2));
        this.set('player2PointsLabel', player2PointsLabel)        

        // Tracking mouse
        this.set('isMouseEnabled', true);
        this.set('isKeyboardEnabled', true);
    },
    
    keyDown: function(key_evt) {
        var player = this.get('player')
        var player2 = this.get('player2')
        var playerPos = player.get('position')
        var player2Pos = player2.get('position')
        var vel = 40
        var top = 50
        var bottom = 270
        
        if(key_evt['keyCode'] == 87 && playerPos.y > top){
            playerPos.y -= vel
        }
        
        if(key_evt['keyCode'] == 83 && playerPos.y < bottom){
            playerPos.y += vel
        }
        
        if(key_evt['keyCode'] == 38 && player2Pos.y > top){
            player2Pos.y -= vel
        }
        
        if(key_evt['keyCode'] == 40 && player2Pos.y < bottom){
            player2Pos.y += vel
        }   
        
        player.set('position', playerPos)
        player2.set('position', player2Pos)
    },
    
    incrementPlayerPoints: function() {
        this.playerPoints += 1;
        var playerPointsLabel = this.get('playerPointsLabel')
        playerPointsLabel.set('string', this.playerPoints);
    },
    
    incrementPlayer2Points: function() {
        this.player2Points += 1;
        var player2PointsLabel = this.get('player2PointsLabel')
        player2PointsLabel.set('string', this.player2Points);
    }    

});

exports.main = function() {
    // Initialise application

    // Get director
    var director = cocos.Director.get('sharedDirector');

    // Attach director to our <div> element
    director.attachInView(document.getElementById('breakout_app'));

    // Create a scene
    var scene = cocos.nodes.Scene.create();

    // Add our layer to the scene
    scene.addChild({child: Pongjs.create()});

    // Run the scene
    director.runWithScene(scene);
};
