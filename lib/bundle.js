/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _cycle = __webpack_require__(3);

var _cycle2 = _interopRequireDefault(_cycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numPlayers, ctx) {
    _classCallCheck(this, Game);

    this.Board = new _board2.default();
    this.board = this.Board.board;
    this.players = [];
    this.ctx = ctx;
    this.numPlayers = numPlayers;
    this.won = false;
    this.addCycles();
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.checkPathCollision = this.checkPathCollision.bind(this);
  }

  _createClass(Game, [{
    key: 'addCycles',
    value: function addCycles() {
      this.players.push(new _cycle2.default({ name: 'nate', pos: [1, 1], dir: [1, 0], number: 1 }));
      if (this.numPlayers === 2) {
        this.players.push(new _cycle2.default({ name: 'kyle', color: "rgba(255,230,77, .5)", pos: [100, 140], dir: [-1, 0], number: 2 }));
      }
    }
  }, {
    key: 'moveCycles',
    value: function moveCycles() {
      var _this = this;

      this.players.forEach(function (player) {
        player.move();
      });
      this.checkCollision();
      this.players.forEach(function (player) {
        _this.Board.fillPath(player);
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.players.forEach(function (player) {
        _this2.ctx.fillStyle = player.color;
        _this2.ctx.fillRect((player.pos[1] - 1) * 5, (player.pos[0] - 1) * 5, 10, 10);
      });
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision() {
      if (this.checkWallCollision() || this.checkPathCollision()) {
        this.won = true;
        return true;
      }
    }
  }, {
    key: 'checkWallCollision',
    value: function checkWallCollision() {
      var collision = false;
      this.players.forEach(function (player) {
        if (player.pos[1] < -1 || player.pos[1] > 140 || player.pos[0] < 1 || player.pos[0] > 100) {
          alert('hit a wall');
          collision = true;
        }
      });
      return collision;
    }
  }, {
    key: 'checkPathCollision',
    value: function checkPathCollision() {
      var _this3 = this;

      var collision = false;
      this.players.forEach(function (player) {
        if (_this3.board[player.pos[0]][player.pos[1]] === 1) {
          alert('hit a light path');
          collision = true;
        }
      });
      return collision;
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _game_view = __webpack_require__(4);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var posX = 0;
  var posY = 0;

  // for(let i = 25; i < 700; i += 25){
  //   let j = 0;
  //   setInterval()
  // }

  var _loop = function _loop(j) {
    var _loop2 = function _loop2(i) {
      setTimeout(function () {
        ctx.beginPath();
        ctx.strokeStyle = '#18CAE6';
        ctx.moveTo(i, j);
        ctx.lineTo(i, j + 1);
        ctx.stroke();
        ctx.moveTo(j, i);
        ctx.lineTo(j + 1, i);
        ctx.stroke();
      }, 0);
    };

    for (var i = 25; i < 700; i += 25) {
      _loop2(i);
    }
  };

  for (var j = 0; j < 700; j += 1) {
    _loop(j);
  }
  // let game = new Game(1, ctx);
  var gameView = new _game_view2.default(ctx);
  // gameView.animate();
  gameView.start();

  // let gameLoop = setInterval(() => {
  //   game.moveCycles();
  //   game.draw();
  //   console.log(game.player1.pos);
  // }, 16);

  //   function animate(){
  //   game.moveCycles();
  //   game.draw();
  //   console.log(game.player1.pos);
  //   setTimeout(() => {
  //     requestAnimationFrame(animate);
  //   }, 16);
  // }
  // animate();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.board = [];
    for (var i = 0; i < 102; i++) {
      this.board.push([]);
      for (var j = 0; j < 140; j++) {
        this.board[i].push(0);
      }
    }
  }

  _createClass(Board, [{
    key: "fillPath",
    value: function fillPath(cycle) {
      this.board[cycle.pos[0]][cycle.pos[1]] = 1;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cycle = function () {
  function Cycle(options) {
    _classCallCheck(this, Cycle);

    this.name = options.name;
    this.playerNumber = options.number;
    this.pos = options.pos || [1, 1];
    this.color = options.color || "rgba(246,106,53, .5)";
    this.dir = options.dir || [1, 0];
    this.bindKeyHandlers();
  }

  _createClass(Cycle, [{
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var _this = this;

      this.keyPress = function (e) {
        console.log(e.key);
        if (_this.playerNumber === 1) {
          switch (e.key) {
            case "w":
              _this.attemptTurn("w");
              break;
            case "a":
              _this.attemptTurn("a");
              break;
            case "s":
              _this.attemptTurn("s");
              break;
            case "d":
              _this.attemptTurn("d");
              break;
          }
        } else {
          e.preventDefault();
          switch (e.key) {
            case "ArrowUp":
              _this.attemptTurn("ArrowUp");
              break;
            case "ArrowLeft":
              _this.attemptTurn("ArrowLeft");
              break;
            case "ArrowDown":
              _this.attemptTurn("ArrowDown");
              break;
            case "ArrowRight":
              _this.attemptTurn("ArrowRight");
              break;
          }
        }
      };
      document.addEventListener('keydown', this.keyPress.bind(this));
    }
  }, {
    key: "attemptTurn",
    value: function attemptTurn(key) {
      if (this.playerNumber === 1) {
        if (!(Cycle.P1TURNS[key][0] + this.dir[0] === 0 && Cycle.P1TURNS[key][1] + this.dir[1] === 0)) {
          this.dir = Cycle.P1TURNS[key];
        }
      } else {
        if (!(Cycle.P2TURNS[key][0] + this.dir[0] === 0 && Cycle.P2TURNS[key][1] + this.dir[1] === 0)) {
          this.dir = Cycle.P2TURNS[key];
        }
      }
    }
  }, {
    key: "move",
    value: function move() {
      this.pos = [this.pos[0] + this.dir[1], this.pos[1] + this.dir[0]];
    }
  }]);

  return Cycle;
}();

Cycle.P2TURNS = {
  "ArrowUp": [0, -1],
  "ArrowLeft": [-1, 0],
  "ArrowDown": [0, 1],
  "ArrowRight": [1, 0]
};

Cycle.P1TURNS = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

exports.default = Cycle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = new _game2.default(2, this.ctx);
    this.animate = this.animate.bind(this);
  }

  // initialize(){
  //   $('')
  // }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      var _this = this;

      var i = 3;
      var p = $('#countdown');
      var countdown = setInterval(function () {
        p.text('' + i);
        p.fadeIn(600);
        p.fadeOut(600);
        i -= 1;
        if (i === 0) {
          clearInterval(countdown);
        }
      }, 1200);
      setTimeout(function () {
        p.text('BATTLE!');
        p.fadeIn(800);
        p.fadeOut(500);
      }, 4800);
      setTimeout(function () {
        _this.animate();
      }, 6200);
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this2 = this;

      this.game.moveCycles();
      this.game.draw();
      setTimeout(function () {
        if (!_this2.game.won) {
          requestAnimationFrame(_this2.animate.bind(_this2));
        } else {
          alert('game over');
        }
      }, 16);
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map