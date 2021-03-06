cocos = require 'cocos2d'
geom  = require 'geometry'
util  = require 'util'
nodes = cocos.nodes

Ball = nodes.Node.extend
	velocity: null

	init: -> 
		Ball.superclass.init.call this
		sprite = nodes.Sprite.create
				file: '/resources/sprites.png'
				rect: new geom.Rect(20, 0, 15, 16)
		sprite.set('anchorPoint', new geom.Point(0, 0))
		this.addChild child: sprite
		this.set('contentSize', sprite.get 'contentSize')
		this.set('velocity', new geom.Point(320, 320))
		this.scheduleUpdate()

	update: (dt) ->
		pos = util.copy(this.get('position'))
		vel = util.copy(this.get('velocity'))
		   
		pos.x += dt * vel.x
		pos.y += dt * vel.y
		   
		this.set('position', pos)
		this.testPlayerCollision()
		this.testEdgeCollision()

	testPlayerCollision: () ->
		vel = util.copy(this.get('velocity'))
		ballBox = this.get('boundingBox')
		playerBox = this.get('parent').get('player').get('boundingBox')
		player2Box = this.get('parent').get('player2').get('boundingBox')
		playerCollide  = vel.x < 0 and geom.rectOverlapsRect(ballBox, playerBox)
		player2Collide = vel.x > 0 and geom.rectOverlapsRect(ballBox, player2Box)
		vel.x *= -1 if playerCollide or player2Collide
		this.set('velocity', vel)

	testEdgeCollision: () ->
		vel = util.copy(this.get('velocity'))
		ballBox  = this.get('boundingBox')
		winSize  = cocos.Director.get('sharedDirector').get('winSize')
		parent   = this.get('parent')
		leftEdgeCollide   = vel.x < 0 and geom.rectGetMinX(ballBox) < 0
		rightEdgeCollide  = vel.x > 0 and geom.rectGetMaxX(ballBox) > winSize.width
		topEdgeCollide    = vel.y < 0 and geom.rectGetMinY(ballBox) < 0
		bottomEdgeCollide = vel.y > 0 and geom.rectGetMaxY(ballBox) > winSize.height
		vel.y *= -1 if topEdgeCollide or bottomEdgeCollide
		vel.x *= -1 if leftEdgeCollide or rightEdgeCollide
		parent.incrementPlayerPoints() if rightEdgeCollide
		parent.incrementPlayer2Points() if leftEdgeCollide
		this.set('velocity', vel)
		
		
exports.Ball = Ball	
	  
	   
