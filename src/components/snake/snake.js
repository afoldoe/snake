import template from './snake.html';

export default {
	template,
	controller
};

controller.$inject = ['$scope', '$timeout', '$window'];
function controller($scope, $timeout, $window) {
	let board_size = 20;

	let directions = {
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	let colors = {
		game_over: '#820303',
		fruit: '#E8505',
		snake_head: '#078F00',
		snake_body: '#0DFF00',
		board: '#000'
	};

	let snake = {
		direction: directions.left,
		parts: [{x: -1, y: -1}]
	};

	let fruit = {
		x: -1, y: -1
	};

	let interval, tempDirection, isGameOver;

	$scope.score = 0;

	$scope.setStyling = function(col, row) {
		console.log(snake.parts[0].x);
		if(isGameOver) return colors.game_over
		else if(fruit.x == row && fruit.y == col) return colors.fruit
		else if(snake.parts[0].x == row && snake.parts[0].y == col) return colors.snake_head
		else if($scope.board[col][row] === true) return colors.snake_body
		return colors.board;
	};

	function update() {
		let newHead = getNewHead();
		if(boardCollision(newHead) || snakeCollision(newHead)) return gameOver()
		else if(fruitCollision(newHead)) eatFruit();
		let oldTail = snake.parts.pop();
		$scope.board[oldTail.y][oldTail.x] = false;
		snake.parts.unshift(newHead);
		$scope.board[newHead.y][newHead.x] = true;
		snake.direction = tempDirection;
		$timeout(update, interval);
	};

	function getNewHead() {
		let newHead = angular.copy(snake.parts[0]);

		if(tempDirection === directions.left) newHead.x -= 1
		else if(tempDirection === directions.right) newHead.x += 1
		else if(tempDirection === directions.up) newHead.y -= 1
		else if(tempDirection === directions.down) newHead.y += 1

		return newHead;
	};

	function boardCollision(part) {
		return part.x === board_size || part.x === -1 || part.y === board_size || part.y === -1;
	}

	function snakeCollision(part) {
		return $scope.board[part.y][part.x] === true;
	};

	function fruitCollision(part) {
		return part.x === fruit.x && part.y === fruit.y;
	};

	function resetFruit() {
		let x = Math.floor(Math.random() * board_size);
		let y = Math.floor(Math.random() * board_size);

		if($scope.board[y][x] === true) return resetFruit();

		fruit = {x: x, y: y};
	};

	function eatFruit() {
		$scope.score++;

		//extends tail
		let tail =  angular.copy(snake.parts[snake.parts.length-1]);
		snake.parts.push(tail);
		resetFruit();

		if($scope.score % 5) interval -= 15;
	};

	function gameOver() {
		isGameOver = true;

		$timeout(() => {
			isGameOver = false;
		}, 500);

		setupBoard();
	};

	function setupBoard() {
		$scope.board = [];
		for(let i = 0; i < board_size; i ++) {
			$scope.board[i] = [];
			for(let j = 0; j < board_size; j++) {
				$scope.board[i][j] = false;			}
		}
	};
	setupBoard();

	$window.addEventListener('keyup', (e) => {
		if(e.keyCode == directions.left && snake.direction !== directions.right) tempDirection = directions.left
		else if(e.keyCode == directions.right && snake.direction !== directions.left) tempDirection = directions.right
		else if(e.keyCode == directions.up && snake.direction !== directions.down) tempDirection = directions.up
		else if(e.keyCode == directions.down && snake.direction !== directions.up) tempDirection = directions.down;
	});

	$scope.startSnake = function() {
		$scope.scope = 0;
		snake = {direction: directions.left, parts: []};
		tempDirection = directions.left;
		isGameOver = false;
		interval = 150;

		//initial snake
		for(let i = 0; i < 5; i++) {
			snake.parts.push({x: 10 + i, y: 10});
		}
		resetFruit();
		update();
		};

	

};
