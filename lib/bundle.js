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
    this.ai = false;
    this.ctx = ctx;
    this.phaser = new Audio('./images/phaser.mp3');
    this.explosion = new Audio('./images/explosion.mp3');
    this.cheer = new Audio('./images/cheer.mp3');
    this.won = false;
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.checkPathCollision = this.checkPathCollision.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.aiDirection = this.aiDirection.bind(this);
  }

  _createClass(Game, [{
    key: 'drawBoard',
    value: function drawBoard() {
      var _this = this;

      this.phaser.play();

      var _loop = function _loop(j) {
        var _loop2 = function _loop2(i) {
          setTimeout(function () {
            _this.ctx.beginPath();
            _this.ctx.strokeStyle = '#18CAE6';
            _this.ctx.moveTo(i, j);
            _this.ctx.lineTo(i, j + 3);
            _this.ctx.stroke();
            _this.ctx.moveTo(j, i);
            _this.ctx.lineTo(j + 3, i);
            _this.ctx.stroke();
          }, 0);
        };

        for (var i = 25; i < 700; i += 25) {
          _loop2(i);
        }
      };

      for (var j = 0; j < 700; j += 3) {
        _loop(j);
      }
    }
  }, {
    key: 'addCycles',
    value: function addCycles(players) {
      for (var i = 1; i < Object.keys(players).length + 1; i++) {
        players['player' + i].playerNumber = i;
        if (i === 1) {
          players['player' + i].dir = [1, 0];
          players['player' + i].pos = [1, 1];
          this.players.push(new _cycle2.default(players['player' + i]));
        } else {
          players['player' + i].dir = [-1, 0];
          players['player' + i].pos = [139, 138];
          this.players.push(new _cycle2.default(players['player' + i]));
        }
      }
      if (Object.keys(players).length === 1) {
        this.players.push(new _cycle2.default(_cycle2.default.AI));
      }
      return true;
    }
  }, {
    key: 'aiDirection',
    value: function aiDirection(player) {
      var newPos = [];
      player.pos.forEach(function (num, i) {
        if (i === 0) {
          newPos.push(player.dir[1] * 15 + num);
        } else {
          newPos.push(player.dir[0] * 15 + num);
        }
      });
      if ((newPos[0] > 140 || newPos[0] < 1) && player.dir[1] !== 0) {
        player.dir = [[1, 0], [-1, 0]][Math.round(Math.random())];
      } else if ((newPos[1] > 140 || newPos[1] < -1) && player.dir[0] !== 0) {
        player.dir = [[0, 1], [0, -1]][Math.round(Math.random())];
      } else if (this.board[newPos[0]][newPos[1]] === 1) {
        if (player.dir[0] !== 0) {
          player.dir = [[0, 1], [0, -1]][Math.round(Math.random())];
        } else {
          player.dir = [[1, 0], [-1, 0]][Math.round(Math.random())];
        }
      }
    }
  }, {
    key: 'moveCycles',
    value: function moveCycles() {
      var _this2 = this;

      this.players.forEach(function (player) {
        if (player.ai) {
          _this2.aiDirection(player);
        }
        player.move();
      });
      this.checkCollision();
      this.players.forEach(function (player) {
        _this2.Board.fillPath(player);
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this3 = this;

      this.players.forEach(function (player) {
        _this3.ctx.fillStyle = player.color;
        _this3.ctx.fillRect((player.pos[1] - 1) * 5, (player.pos[0] - 1) * 5, 10, 10);
      });
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision() {
      if (this.checkWallCollision() || this.checkPathCollision()) {
        this.won = true;
        this.explosion.play();
        return true;
      }
    }
  }, {
    key: 'checkWallCollision',
    value: function checkWallCollision() {
      var collision = false;
      this.players.forEach(function (player) {
        if (player.pos[1] < -1 || player.pos[1] > 140 || player.pos[0] < 1 || player.pos[0] > 140) {
          player.crashed = true;
          collision = true;
        }
      });
      return collision;
    }
  }, {
    key: 'checkPathCollision',
    value: function checkPathCollision() {
      var _this4 = this;

      var collision = false;
      this.players.forEach(function (player) {
        if (_this4.board[player.pos[0]][player.pos[1]] === 1) {
          player.crashed = true;
          collision = true;
        }
      });
      return collision;
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      var winner = void 0;
      for (var i = 0; i < this.players.length; i++) {
        if (!this.players[i].crashed) {
          winner = this.players[i];
        }
      }
      var p = $('#countdown');
      p.text(winner.name + ' wins!');
      p.fadeIn(600);
      this.cheer.play();
      setTimeout(function () {
        p.fadeOut(1000);
        setTimeout(function () {
          p.text('Again? Y or N');
          p.fadeIn(1000);
        }, 1000);
      }, 2200);
    }
  }, {
    key: 'resetBoard',
    value: function resetBoard() {
      this.Board = new _board2.default();
      this.board = this.Board.board;
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, 700, 700);
      this.won = false;
    }
  }, {
    key: 'resetPlayers',
    value: function resetPlayers() {
      this.players.forEach(function (player) {
        return player.reset();
      });
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
  var music = new Audio('./images/music.mp3');
  music.play();
  var isPlaying = true;
  var musicPlay = function musicPlay() {
    if (isPlaying) {
      isPlaying = false;
      music.pause();
    } else {
      isPlaying = true;
      music.play();
    }
  };

  $('.music-player').click(musicPlay);
  $('#player-details').hide();
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var posX = 0;
  var posY = 0;

  var gameView = new _game_view2.default(ctx);
  gameView.playerSelect();
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
    for (var i = 0; i < 142; i++) {
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
    this.ai = options.ai || false;
    this.playerNumber = options.playerNumber;
    this.pos = options.pos;
    this.color = options.color;
    this.dir = options.dir;
    this.crashed = false;
    this.bindKeyHandlers();
  }

  _createClass(Cycle, [{
    key: "keyPress",
    value: function keyPress(e) {
      e.preventDefault();
      if (this.playerNumber === 1) {
        switch (e.key) {
          case "w":
            this.attemptTurn("w");
            break;
          case "a":
            this.attemptTurn("a");
            break;
          case "s":
            this.attemptTurn("s");
            break;
          case "d":
            this.attemptTurn("d");
            break;
        }
      } else if (this.playerNumber === 2) {
        switch (e.key) {
          case "ArrowUp":
            this.attemptTurn("ArrowUp");
            break;
          case "ArrowLeft":
            this.attemptTurn("ArrowLeft");
            break;
          case "ArrowDown":
            this.attemptTurn("ArrowDown");
            break;
          case "ArrowRight":
            this.attemptTurn("ArrowRight");
            break;
        }
      }
    }
  }, {
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      this.specificFunc = this.keyPress.bind(this);
      document.addEventListener('keydown', this.specificFunc);
    }
  }, {
    key: "removeHandler",
    value: function removeHandler() {
      document.removeEventListener('keydown', this.specificFunc);
    }
  }, {
    key: "attemptTurn",
    value: function attemptTurn(key) {
      if (this.playerNumber === 1) {
        if (!(Cycle.P1TURNS[key][0] + this.dir[0] === 0 && Cycle.P1TURNS[key][1] + this.dir[1] === 0)) {
          this.dir = Cycle.P1TURNS[key];
        }
      } else if (this.playerNumber === 2) {
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
  }, {
    key: "reset",
    value: function reset() {
      this.crashed = false;
      if (this.playerNumber === 1) {
        this.pos = [1, 1];
        this.dir = [1, 0];
      } else if (this.playerNumber === 2) {
        this.pos = [139, 139];
        this.dir = [-1, 0];
      } else if (this.playerNumber === 3) {
        this.pos = [139, 90];
        this.dir = [0, -1];
      }
    }
  }]);

  return Cycle;
}();

Cycle.P1TURNS = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

Cycle.P2TURNS = {
  "ArrowUp": [0, -1],
  "ArrowLeft": [-1, 0],
  "ArrowDown": [0, 1],
  "ArrowRight": [1, 0]
};

Cycle.AITURNS = {
  "w": [-1, 0],
  "a": [0, 1],
  "s": [1, 0],
  "d": [0, -1]
};

Cycle.AI = {
  color: "rgba(0, 255, 255, 0.5)",
  ai: true,
  playerNumber: 3,
  pos: [139, 90],
  name: "CyberTron",
  dir: [0, -1]
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
    this.numPlayers = 0;
    this.players = {};
    this.flashMessage = null;
    this.numPlayersEvent = this.numPlayersEvent.bind(this);
    this.setupPlayers = this.setupPlayers.bind(this);
    this.reset = this.reset.bind(this);
  }

  _createClass(GameView, [{
    key: 'setupForm',
    value: function setupForm(numPlayers) {
      this.numPlayers = numPlayers;
      var playerDetails = $('#player-details');
      var form = $('#player-form');
      form.off('submit', this.setupPlayers);
      form.submit(this.setupPlayers);
      $('#player-id').text('Player 1');
      $('.controls').text('Controls: W A S D');
      playerDetails.show();
    }
  }, {
    key: 'setupPlayers',
    value: function setupPlayers(e) {
      e.preventDefault();
      e.stopPropagation();
      var name = $('.name').val();
      $('.name').val("");
      var color = $('.driver-color').val();
      $('.driver-color').val("");
      if (!this.players.player1) {
        this.players.player1 = { name: name, color: color };
        if (this.numPlayers === 1) {
          $('#player-select-div').hide();
          this.game.addCycles(this.players);
          this.game.drawBoard();
          this.start();
        } else {
          $('#player-id').text('Player 2');
          $('.controls').text('Controls: Up Down Left Right');
        }
      } else if (this.numPlayers === 2) {
        this.players.player2 = { name: name, color: color };
        $('#player-select-div').hide();
        this.game.addCycles(this.players);
        this.game.drawBoard();
        this.start();
      }
    }
  }, {
    key: 'numPlayersEvent',
    value: function numPlayersEvent() {
      event.preventDefault();
      if (event.key === '1' || event.key === '2') {
        clearInterval(this.flashMessage);
        var select = $('#flash-player-select');
        select.hide();
        document.removeEventListener('keydown', this.numPlayersEvent);
        this.setupForm(parseInt(event.key));
      }
    }
  }, {
    key: 'playerSelect',
    value: function playerSelect() {
      var playerDetails = $('#player-details');
      playerDetails.hide();
      var selectDiv = $('#player-select-div');
      selectDiv.show();
      var select = $('#flash-player-select');
      this.flashMessage = setInterval(function () {
        select.fadeIn(800);
        select.fadeOut(800);
      }, 1700);
      document.addEventListener('keydown', this.numPlayersEvent);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var snd1 = new Audio('./images/count.ogg');
      var snd2 = new Audio('./images/start.ogg');
      this.game.draw();
      var i = 3;
      var p = $('#countdown');
      var countdown = setInterval(function () {
        p.text('' + i);
        p.fadeIn(600);
        p.fadeOut(600);
        // snd1.play();
        i -= 1;
        if (i === 0) {
          clearInterval(countdown);
          setTimeout(function () {
            p.text('BATTLE!');
            p.fadeIn(800);
            p.fadeOut(500);
            // snd2.play();
          }, 1200);
        }
      }, 1400);
      setTimeout(function () {
        _this.animate();
      }, 6800);
    }
  }, {
    key: 'reset',
    value: function reset(e) {
      event.preventDefault();
      console.log(e);
      if (event.key === "y") {
        $('#countdown').fadeOut(100);
        this.game.resetBoard();
        this.game.resetPlayers();
        this.game.drawBoard();
        document.removeEventListener('keydown', this.reset);
        this.start();
      } else if (event.key === "n") {
        document.removeEventListener('keydown', this.reset);
        $('#countdown').fadeOut(100);
        this.game.resetBoard();
        this.game.players.forEach(function (player) {
          player.removeHandler();
        });
        this.game.ai = false;
        this.game.players = [];
        this.players = {};
        this.playerSelect();
      }
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
          setTimeout(function () {
            _this2.game.gameOver();
          }, 800);
          document.addEventListener('keydown', _this2.reset);
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