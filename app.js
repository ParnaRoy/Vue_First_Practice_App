new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns:[]
	},
	methods: {
		startGame: function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		attack: function(){
			var damage = this.calculateDamage(10, 3);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer : true,
				text : 'Player hits monster for ' + damage
			});
			if(this.checkWin()){
				return;
			}			
			this.monsterAttack();
		},
		specialAttack: function(){
			var damage = this.calculateDamage(20, 10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer : true,
				text : 'Player hits monster hard for ' + damage
			});
			if(this.checkWin()){
				return;
			}
			this.monsterAttack();
		},
		heal: function(){
			if(this.playerHealth <= 90){
				this.playerHealth += 10;
			}else{
				this.playerHealth = 100;
			}
			this.turns.unshift({
				isPlayer : true,
				text : 'Player heals for 10'
			});	

			this.monsterAttack();
		},
		giveUp: function(){
			this.gameIsRunning = false;
		},
		calculateDamage : function(max, min){
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function(){
			if(this.monsterHealth <= 0){
				if(confirm("You Won!! Start a new game?")){
					this.startGame();
				}else{
					this.gameIsRunning = false;
				}
				return true;
			}else if(this.playerHealth <= 0){
				if(confirm("You lost!! Start a new game?")){
					this.startGame();
				}else{
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		},
		monsterAttack: function(){
			var damage = this.calculateDamage(10, 3);
			this.playerHealth -= damage;
			this.checkWin();
			this.turns.unshift({
				isPlayer : false,
				text : 'Monster hits player for ' + damage
			});
		}
	}
});