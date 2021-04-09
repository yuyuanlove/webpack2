(function(depsChart){
            function require(module){
                function localRequire(relativePath){
                   return require(depsChart[module].deps[relativePath])//递归解析
                }
                var exports={};
                (function(require,exports,code){
                 eval(code)
                })(localRequire,exports,depsChart[module].code)
                return exports
            }
            require('./src/index.js')
        })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(2, 0));","deps":{"./add.js":"/Users/liangxiaoyuan/Documents/study/webpack2/05.myWebpack/src/add.js","./count.js":"/Users/liangxiaoyuan/Documents/study/webpack2/05.myWebpack/src/count.js"}},"/Users/liangxiaoyuan/Documents/study/webpack2/05.myWebpack/src/add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _test = _interopRequireDefault(require(\"./test.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log('test', (0, _test[\"default\"])(2, 3));\n\nfunction add(x, y) {\n  return x + y;\n}\n\nvar _default = add;\nexports[\"default\"] = _default;","deps":{"./test.js":"/Users/liangxiaoyuan/Documents/study/webpack2/05.myWebpack/src/test.js"}},"/Users/liangxiaoyuan/Documents/study/webpack2/05.myWebpack/src/test.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction test(x, y) {\n  return x + y;\n}\n\nvar _default = test;\nexports[\"default\"] = _default;","deps":{}},"/Users/liangxiaoyuan/Documents/study/webpack2/05.myWebpack/src/count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction count(x, y) {\n  return x - y;\n}\n\nvar _default = count;\nexports[\"default\"] = _default;","deps":{}}})