/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst app = express();\nconst PORT = process.env.PORT || 8080;\nconst cors = __webpack_require__(/*! cors */ \"cors\");\napp.use(cors());\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\napp.use(bodyParser.json());\nconst state = {\n  events: [false, \"Bachata\", \"Salsa & Zouk\", false, \"Bachata & Salsa\", false, false],\n  workers: {\n    instructors: [{\n      name: \"Tanya\",\n      email: \"tanya9kin@gmail.com\",\n      bachata: true,\n      salsa: false,\n      zouk: true\n    }, {\n      name: \"Daniel\",\n      email: \"daniel@gmail.com\",\n      bachata: true,\n      salsa: false,\n      zouk: true\n    }, {\n      name: \"Lior\",\n      email: \"lior@gmail.com\",\n      bachata: true,\n      salsa: false,\n      zouk: false\n    }, {\n      name: \"Hezi\",\n      email: \"hezi@gmail.com\",\n      bachata: true,\n      salsa: true,\n      zouk: false\n    }, {\n      name: \"Bat-hen\",\n      email: \"bat-hen@gmail.com\",\n      bachata: false,\n      salsa: true,\n      zouk: false\n    }, {\n      name: \"Haim\",\n      email: \"haim@gmail.com\",\n      bachata: true,\n      salsa: true,\n      zouk: false\n    }],\n    djs: [{\n      name: \"Don Or\",\n      bachata: true,\n      salsa: false,\n      zouk: false\n    }, {\n      name: \"Lobo\",\n      bachata: true,\n      salsa: false,\n      zouk: true\n    }, {\n      name: \"Vova\",\n      bachata: false,\n      salsa: true,\n      zouk: false\n    }]\n  },\n  chosen_day: 25,\n  chosen_day_schedule: {\n    bachata: {\n      level1: \"Tanya\",\n      level2: \"Hezi\",\n      level3: \"Lior\",\n      dj: \"Don Or\"\n    },\n    salsa: {\n      level1: \"Bat-hen\",\n      level2: \"Haim\",\n      dj: \"Vova\"\n    }\n  }\n};\napp.listen(PORT, () => {\n  console.log(`Example app listening on port ${PORT}`);\n});\napp.get(\"/instructors\", (req, res, next) => {\n  const name = req.query.name;\n  console.log(\"Hey, I got your request\");\n  if (name != undefined) {\n    const instructorToSend = state.workers.instructors.filter(person => person.name === name);\n    res.send(instructorToSend);\n  } else {\n    res.send(state.workers.instructors);\n  }\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.js");
/******/ 	
/******/ })()
;