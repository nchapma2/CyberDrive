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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cycle = function () {
  function Cycle() {
    _classCallCheck(this, Cycle);

    this.pos = [1, 1];
    this.color = "rgba(246,106,53, .5)";
    this.dir = [1, 0];
    this.bindKeyHandlers();
  }

  _createClass(Cycle, [{
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var _this = this;

      this.keyPress = function (e) {
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
      };
      document.addEventListener('keydown', this.keyPress);
    }
  }, {
    key: "attemptTurn",
    value: function attemptTurn(key) {
      if (!(Cycle.TURNS[key][0] + this.dir[0] === 0 && Cycle.TURNS[key][1] + this.dir[1] === 0)) {
        this.dir = Cycle.TURNS[key];
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

Cycle.TURNS = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

exports.default = Cycle;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var posX = 0;
  var posY = 0;
  for (var i = 25; i < 700; i += 25) {
    ctx.beginPath();
    ctx.strokeStyle = '#18CAE6';
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke();
  }
  for (var _i = 25; _i < 500; _i += 25) {
    ctx.beginPath();
    ctx.strokeStyle = '#18CAE6';
    ctx.moveTo(0, _i);
    ctx.lineTo(700, _i);
    ctx.stroke();
  }

  window.game = new _game2.default(1, ctx);

  // let gameLoop = setInterval(() => {
  //   game.moveCycles();
  //   game.draw();
  //   console.log(game.player1.pos);
  // }, 16);

  function animate() {
    game.moveCycles();
    game.draw();
    console.log(game.player1.pos);
    setTimeout(function () {
      requestAnimationFrame(animate);
    }, 16);
  }
  animate();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _cycle = __webpack_require__(1);

var _cycle2 = _interopRequireDefault(_cycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numPlayers, ctx) {
    _classCallCheck(this, Game);

    this.Board = new _board2.default();
    this.board = this.Board.board;
    this.ctx = ctx;
    this.numPlayers = 1;
    this.addCycles();
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.checkPathCollision = this.checkPathCollision.bind(this);
  }

  _createClass(Game, [{
    key: 'addCycles',
    value: function addCycles() {
      if (this.numPlayers === 1) {
        this.player1 = new _cycle2.default();
      }
    }
  }, {
    key: 'moveCycles',
    value: function moveCycles() {
      this.player1.move();
      this.checkCollision();
      this.Board.fillPath(this.player1);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.fillStyle = this.player1.color;
      this.ctx.fillRect((this.player1.pos[1] - 1) * 5, (this.player1.pos[0] - 1) * 5, 10, 10);
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision() {
      if (this.checkWallCollision() || this.checkPathCollision()) {
        return true;
      }
    }
  }, {
    key: 'checkWallCollision',
    value: function checkWallCollision() {
      if (this.player1.pos[1] < -1 || this.player1.pos[1] > 140 || this.player1.pos[0] < 1 || this.player1.pos[0] > 100) {
        alert('hit a wall');
        return true;
      }
    }
  }, {
    key: 'checkPathCollision',
    value: function checkPathCollision() {
      if (this.board[this.player1.pos[0]][this.player1.pos[1]] === 1) {
        alert('hit a light path');
        return true;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map