(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/file-saver/dist/FileSaver.min.js
  var require_FileSaver_min = __commonJS({
    "node_modules/file-saver/dist/FileSaver.min.js"(exports, module) {
      (function(a, b) {
        if ("function" == typeof define && define.amd)
          define([], b);
        else if ("undefined" != typeof exports)
          b();
        else {
          b(), a.FileSaver = { exports: {} }.exports;
        }
      })(exports, function() {
        "use strict";
        function b(a2, b2) {
          return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
        }
        function c(a2, b2, c2) {
          var d2 = new XMLHttpRequest();
          d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
            g(d2.response, b2, c2);
          }, d2.onerror = function() {
            console.error("could not download file");
          }, d2.send();
        }
        function d(a2) {
          var b2 = new XMLHttpRequest();
          b2.open("HEAD", a2, false);
          try {
            b2.send();
          } catch (a3) {
          }
          return 200 <= b2.status && 299 >= b2.status;
        }
        function e(a2) {
          try {
            a2.dispatchEvent(new MouseEvent("click"));
          } catch (c2) {
            var b2 = document.createEvent("MouseEvents");
            b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
          }
        }
        var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
        } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
          var i = f.URL || f.webkitURL, j = document.createElement("a");
          g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
            i.revokeObjectURL(j.href);
          }, 4e4), setTimeout(function() {
            e(j);
          }, 0));
        } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
          if (g2 = g2 || f2.name || "download", "string" != typeof f2)
            navigator.msSaveOrOpenBlob(b(f2, h), g2);
          else if (d(f2))
            c(f2, g2, h);
          else {
            var i = document.createElement("a");
            i.href = f2, i.target = "_blank", setTimeout(function() {
              e(i);
            });
          }
        } : function(b2, d2, e2, g2) {
          if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
            return c(b2, d2, e2);
          var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
          if ((j || h && i || a) && "undefined" != typeof FileReader) {
            var k = new FileReader();
            k.onloadend = function() {
              var a2 = k.result;
              a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
            }, k.readAsDataURL(b2);
          } else {
            var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
            g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
              l.revokeObjectURL(m);
            }, 4e4);
          }
        });
        f.saveAs = g.saveAs = g, "undefined" != typeof module && (module.exports = g);
      });
    }
  });

  // node_modules/html-to-image/lib/util.js
  var require_util = __commonJS({
    "node_modules/html-to-image/lib/util.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isInstanceOfElement = exports.nodeToDataURL = exports.svgToDataURL = exports.createImage = exports.canvasToBlob = exports.checkCanvasDimensions = exports.getPixelRatio = exports.getImageSize = exports.toArray = exports.delay = exports.uuid = exports.resolveUrl = void 0;
      function resolveUrl(url, baseUrl) {
        if (url.match(/^[a-z]+:\/\//i)) {
          return url;
        }
        if (url.match(/^\/\//)) {
          return window.location.protocol + url;
        }
        if (url.match(/^[a-z]+:/i)) {
          return url;
        }
        var doc = document.implementation.createHTMLDocument();
        var base = doc.createElement("base");
        var a = doc.createElement("a");
        doc.head.appendChild(base);
        doc.body.appendChild(a);
        if (baseUrl) {
          base.href = baseUrl;
        }
        a.href = url;
        return a.href;
      }
      exports.resolveUrl = resolveUrl;
      exports.uuid = /* @__PURE__ */ function() {
        var counter = 0;
        var random = function() {
          return "0000".concat((Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        };
        return function() {
          counter += 1;
          return "u".concat(random()).concat(counter);
        };
      }();
      function delay(ms) {
        return function(args) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              return resolve(args);
            }, ms);
          });
        };
      }
      exports.delay = delay;
      function toArray(arrayLike) {
        var arr = [];
        for (var i = 0, l = arrayLike.length; i < l; i++) {
          arr.push(arrayLike[i]);
        }
        return arr;
      }
      exports.toArray = toArray;
      function px(node, styleProperty) {
        var win = node.ownerDocument.defaultView || window;
        var val = win.getComputedStyle(node).getPropertyValue(styleProperty);
        return val ? parseFloat(val.replace("px", "")) : 0;
      }
      function getNodeWidth(node) {
        var leftBorder = px(node, "border-left-width");
        var rightBorder = px(node, "border-right-width");
        return node.clientWidth + leftBorder + rightBorder;
      }
      function getNodeHeight(node) {
        var topBorder = px(node, "border-top-width");
        var bottomBorder = px(node, "border-bottom-width");
        return node.clientHeight + topBorder + bottomBorder;
      }
      function getImageSize(targetNode, options) {
        if (options === void 0) {
          options = {};
        }
        var width = options.width || getNodeWidth(targetNode);
        var height = options.height || getNodeHeight(targetNode);
        return { width, height };
      }
      exports.getImageSize = getImageSize;
      function getPixelRatio() {
        var ratio;
        var FINAL_PROCESS;
        try {
          FINAL_PROCESS = process;
        } catch (e) {
        }
        var val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
        if (val) {
          ratio = parseInt(val, 10);
          if (Number.isNaN(ratio)) {
            ratio = 1;
          }
        }
        return ratio || window.devicePixelRatio || 1;
      }
      exports.getPixelRatio = getPixelRatio;
      var canvasDimensionLimit = 16384;
      function checkCanvasDimensions(canvas) {
        if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) {
          if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) {
            if (canvas.width > canvas.height) {
              canvas.height *= canvasDimensionLimit / canvas.width;
              canvas.width = canvasDimensionLimit;
            } else {
              canvas.width *= canvasDimensionLimit / canvas.height;
              canvas.height = canvasDimensionLimit;
            }
          } else if (canvas.width > canvasDimensionLimit) {
            canvas.height *= canvasDimensionLimit / canvas.width;
            canvas.width = canvasDimensionLimit;
          } else {
            canvas.width *= canvasDimensionLimit / canvas.height;
            canvas.height = canvasDimensionLimit;
          }
        }
      }
      exports.checkCanvasDimensions = checkCanvasDimensions;
      function canvasToBlob(canvas, options) {
        if (options === void 0) {
          options = {};
        }
        if (canvas.toBlob) {
          return new Promise(function(resolve) {
            canvas.toBlob(resolve, options.type ? options.type : "image/png", options.quality ? options.quality : 1);
          });
        }
        return new Promise(function(resolve) {
          var binaryString = window.atob(canvas.toDataURL(options.type ? options.type : void 0, options.quality ? options.quality : void 0).split(",")[1]);
          var len = binaryString.length;
          var binaryArray = new Uint8Array(len);
          for (var i = 0; i < len; i += 1) {
            binaryArray[i] = binaryString.charCodeAt(i);
          }
          resolve(new Blob([binaryArray], {
            type: options.type ? options.type : "image/png"
          }));
        });
      }
      exports.canvasToBlob = canvasToBlob;
      function createImage(url) {
        return new Promise(function(resolve, reject) {
          var img = new Image();
          img.decode = function() {
            return resolve(img);
          };
          img.onload = function() {
            return resolve(img);
          };
          img.onerror = reject;
          img.crossOrigin = "anonymous";
          img.decoding = "async";
          img.src = url;
        });
      }
      exports.createImage = createImage;
      function svgToDataURL(svg) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            return [2, Promise.resolve().then(function() {
              return new XMLSerializer().serializeToString(svg);
            }).then(encodeURIComponent).then(function(html) {
              return "data:image/svg+xml;charset=utf-8,".concat(html);
            })];
          });
        });
      }
      exports.svgToDataURL = svgToDataURL;
      function nodeToDataURL(node, width, height) {
        return __awaiter(this, void 0, void 0, function() {
          var xmlns, svg, foreignObject;
          return __generator(this, function(_a) {
            xmlns = "http://www.w3.org/2000/svg";
            svg = document.createElementNS(xmlns, "svg");
            foreignObject = document.createElementNS(xmlns, "foreignObject");
            svg.setAttribute("width", "".concat(width));
            svg.setAttribute("height", "".concat(height));
            svg.setAttribute("viewBox", "0 0 ".concat(width, " ").concat(height));
            foreignObject.setAttribute("width", "100%");
            foreignObject.setAttribute("height", "100%");
            foreignObject.setAttribute("x", "0");
            foreignObject.setAttribute("y", "0");
            foreignObject.setAttribute("externalResourcesRequired", "true");
            svg.appendChild(foreignObject);
            foreignObject.appendChild(node);
            return [2, svgToDataURL(svg)];
          });
        });
      }
      exports.nodeToDataURL = nodeToDataURL;
      var isInstanceOfElement = function(node, instance) {
        if (node instanceof instance)
          return true;
        var nodePrototype = Object.getPrototypeOf(node);
        if (nodePrototype === null)
          return false;
        return nodePrototype.constructor.name === instance.name || (0, exports.isInstanceOfElement)(nodePrototype, instance);
      };
      exports.isInstanceOfElement = isInstanceOfElement;
    }
  });

  // node_modules/html-to-image/lib/clone-pseudos.js
  var require_clone_pseudos = __commonJS({
    "node_modules/html-to-image/lib/clone-pseudos.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.clonePseudoElements = void 0;
      var util_1 = require_util();
      function formatCSSText(style) {
        var content = style.getPropertyValue("content");
        return "".concat(style.cssText, " content: '").concat(content.replace(/'|"/g, ""), "';");
      }
      function formatCSSProperties(style) {
        return (0, util_1.toArray)(style).map(function(name) {
          var value = style.getPropertyValue(name);
          var priority = style.getPropertyPriority(name);
          return "".concat(name, ": ").concat(value).concat(priority ? " !important" : "", ";");
        }).join(" ");
      }
      function getPseudoElementStyle(className, pseudo, style) {
        var selector = ".".concat(className, ":").concat(pseudo);
        var cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style);
        return document.createTextNode("".concat(selector, "{").concat(cssText, "}"));
      }
      function clonePseudoElement(nativeNode, clonedNode, pseudo) {
        var style = window.getComputedStyle(nativeNode, pseudo);
        var content = style.getPropertyValue("content");
        if (content === "" || content === "none") {
          return;
        }
        var className = (0, util_1.uuid)();
        try {
          clonedNode.className = "".concat(clonedNode.className, " ").concat(className);
        } catch (err) {
          return;
        }
        var styleElement = document.createElement("style");
        styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
        clonedNode.appendChild(styleElement);
      }
      function clonePseudoElements(nativeNode, clonedNode) {
        clonePseudoElement(nativeNode, clonedNode, ":before");
        clonePseudoElement(nativeNode, clonedNode, ":after");
      }
      exports.clonePseudoElements = clonePseudoElements;
    }
  });

  // node_modules/html-to-image/lib/mimes.js
  var require_mimes = __commonJS({
    "node_modules/html-to-image/lib/mimes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMimeType = void 0;
      var WOFF = "application/font-woff";
      var JPEG = "image/jpeg";
      var mimes = {
        woff: WOFF,
        woff2: WOFF,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: JPEG,
        jpeg: JPEG,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml",
        webp: "image/webp"
      };
      function getExtension(url) {
        var match = /\.([^./]*?)$/g.exec(url);
        return match ? match[1] : "";
      }
      function getMimeType(url) {
        var extension = getExtension(url).toLowerCase();
        return mimes[extension] || "";
      }
      exports.getMimeType = getMimeType;
    }
  });

  // node_modules/html-to-image/lib/dataurl.js
  var require_dataurl = __commonJS({
    "node_modules/html-to-image/lib/dataurl.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resourceToDataURL = exports.fetchAsDataURL = exports.makeDataUrl = exports.isDataUrl = void 0;
      function getContentFromDataUrl(dataURL) {
        return dataURL.split(/,/)[1];
      }
      function isDataUrl(url) {
        return url.search(/^(data:)/) !== -1;
      }
      exports.isDataUrl = isDataUrl;
      function makeDataUrl(content, mimeType) {
        return "data:".concat(mimeType, ";base64,").concat(content);
      }
      exports.makeDataUrl = makeDataUrl;
      function fetchAsDataURL(url, init, process2) {
        return __awaiter(this, void 0, void 0, function() {
          var res, blob;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, fetch(url, init)];
              case 1:
                res = _a.sent();
                if (res.status === 404) {
                  throw new Error('Resource "'.concat(res.url, '" not found'));
                }
                return [4, res.blob()];
              case 2:
                blob = _a.sent();
                return [2, new Promise(function(resolve, reject) {
                  var reader = new FileReader();
                  reader.onerror = reject;
                  reader.onloadend = function() {
                    try {
                      resolve(process2({ res, result: reader.result }));
                    } catch (error) {
                      reject(error);
                    }
                  };
                  reader.readAsDataURL(blob);
                })];
            }
          });
        });
      }
      exports.fetchAsDataURL = fetchAsDataURL;
      var cache = {};
      function getCacheKey(url, contentType, includeQueryParams) {
        var key = url.replace(/\?.*/, "");
        if (includeQueryParams) {
          key = url;
        }
        if (/ttf|otf|eot|woff2?/i.test(key)) {
          key = key.replace(/.*\//, "");
        }
        return contentType ? "[".concat(contentType, "]").concat(key) : key;
      }
      function resourceToDataURL(resourceUrl, contentType, options) {
        return __awaiter(this, void 0, void 0, function() {
          var cacheKey, dataURL, content, error_1, msg;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
                if (cache[cacheKey] != null) {
                  return [2, cache[cacheKey]];
                }
                if (options.cacheBust) {
                  resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
                }
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, fetchAsDataURL(resourceUrl, options.fetchRequestInit, function(_a2) {
                  var res = _a2.res, result = _a2.result;
                  if (!contentType) {
                    contentType = res.headers.get("Content-Type") || "";
                  }
                  return getContentFromDataUrl(result);
                })];
              case 2:
                content = _a.sent();
                dataURL = makeDataUrl(content, contentType);
                return [3, 4];
              case 3:
                error_1 = _a.sent();
                dataURL = options.imagePlaceholder || "";
                msg = "Failed to fetch resource: ".concat(resourceUrl);
                if (error_1) {
                  msg = typeof error_1 === "string" ? error_1 : error_1.message;
                }
                if (msg) {
                  console.warn(msg);
                }
                return [3, 4];
              case 4:
                cache[cacheKey] = dataURL;
                return [2, dataURL];
            }
          });
        });
      }
      exports.resourceToDataURL = resourceToDataURL;
    }
  });

  // node_modules/html-to-image/lib/clone-node.js
  var require_clone_node = __commonJS({
    "node_modules/html-to-image/lib/clone-node.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cloneNode = void 0;
      var clone_pseudos_1 = require_clone_pseudos();
      var util_1 = require_util();
      var mimes_1 = require_mimes();
      var dataurl_1 = require_dataurl();
      function cloneCanvasElement(canvas) {
        return __awaiter(this, void 0, void 0, function() {
          var dataURL;
          return __generator(this, function(_a) {
            dataURL = canvas.toDataURL();
            if (dataURL === "data:,") {
              return [2, canvas.cloneNode(false)];
            }
            return [2, (0, util_1.createImage)(dataURL)];
          });
        });
      }
      function cloneVideoElement(video, options) {
        return __awaiter(this, void 0, void 0, function() {
          var canvas, ctx, dataURL_1, poster, contentType, dataURL;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (video.currentSrc) {
                  canvas = document.createElement("canvas");
                  ctx = canvas.getContext("2d");
                  canvas.width = video.clientWidth;
                  canvas.height = video.clientHeight;
                  ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  dataURL_1 = canvas.toDataURL();
                  return [2, (0, util_1.createImage)(dataURL_1)];
                }
                poster = video.poster;
                contentType = (0, mimes_1.getMimeType)(poster);
                return [4, (0, dataurl_1.resourceToDataURL)(poster, contentType, options)];
              case 1:
                dataURL = _a.sent();
                return [2, (0, util_1.createImage)(dataURL)];
            }
          });
        });
      }
      function cloneIFrameElement(iframe) {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          var _b;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                _c.trys.push([0, 3, , 4]);
                if (!((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body))
                  return [3, 2];
                return [4, cloneNode(iframe.contentDocument.body, {}, true)];
              case 1:
                return [2, _c.sent()];
              case 2:
                return [3, 4];
              case 3:
                _b = _c.sent();
                return [3, 4];
              case 4:
                return [2, iframe.cloneNode(false)];
            }
          });
        });
      }
      function cloneSingleNode(node, options) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            if ((0, util_1.isInstanceOfElement)(node, HTMLCanvasElement)) {
              return [2, cloneCanvasElement(node)];
            }
            if ((0, util_1.isInstanceOfElement)(node, HTMLVideoElement)) {
              return [2, cloneVideoElement(node, options)];
            }
            if ((0, util_1.isInstanceOfElement)(node, HTMLIFrameElement)) {
              return [2, cloneIFrameElement(node)];
            }
            return [2, node.cloneNode(false)];
          });
        });
      }
      var isSlotElement = function(node) {
        return node.tagName != null && node.tagName.toUpperCase() === "SLOT";
      };
      function cloneChildren(nativeNode, clonedNode, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function() {
          var children;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                children = [];
                if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
                  children = (0, util_1.toArray)(nativeNode.assignedNodes());
                } else if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) {
                  children = (0, util_1.toArray)(nativeNode.contentDocument.body.childNodes);
                } else {
                  children = (0, util_1.toArray)(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
                }
                if (children.length === 0 || (0, util_1.isInstanceOfElement)(nativeNode, HTMLVideoElement)) {
                  return [2, clonedNode];
                }
                return [4, children.reduce(function(deferred, child) {
                  return deferred.then(function() {
                    return cloneNode(child, options);
                  }).then(function(clonedChild) {
                    if (clonedChild) {
                      clonedNode.appendChild(clonedChild);
                    }
                  });
                }, Promise.resolve())];
              case 1:
                _c.sent();
                return [2, clonedNode];
            }
          });
        });
      }
      function cloneCSSStyle(nativeNode, clonedNode) {
        var targetStyle = clonedNode.style;
        if (!targetStyle) {
          return;
        }
        var sourceStyle = window.getComputedStyle(nativeNode);
        if (sourceStyle.cssText) {
          targetStyle.cssText = sourceStyle.cssText;
          targetStyle.transformOrigin = sourceStyle.transformOrigin;
        } else {
          (0, util_1.toArray)(sourceStyle).forEach(function(name) {
            var value = sourceStyle.getPropertyValue(name);
            if (name === "font-size" && value.endsWith("px")) {
              var reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
              value = "".concat(reducedFont, "px");
            }
            if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") {
              value = "block";
            }
            if (name === "d" && clonedNode.getAttribute("d")) {
              value = "path(".concat(clonedNode.getAttribute("d"), ")");
            }
            targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
          });
        }
      }
      function cloneInputValue(nativeNode, clonedNode) {
        if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLTextAreaElement)) {
          clonedNode.innerHTML = nativeNode.value;
        }
        if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLInputElement)) {
          clonedNode.setAttribute("value", nativeNode.value);
        }
      }
      function cloneSelectValue(nativeNode, clonedNode) {
        if ((0, util_1.isInstanceOfElement)(nativeNode, HTMLSelectElement)) {
          var clonedSelect = clonedNode;
          var selectedOption = Array.from(clonedSelect.children).find(function(child) {
            return nativeNode.value === child.getAttribute("value");
          });
          if (selectedOption) {
            selectedOption.setAttribute("selected", "");
          }
        }
      }
      function decorate(nativeNode, clonedNode) {
        if ((0, util_1.isInstanceOfElement)(clonedNode, Element)) {
          cloneCSSStyle(nativeNode, clonedNode);
          (0, clone_pseudos_1.clonePseudoElements)(nativeNode, clonedNode);
          cloneInputValue(nativeNode, clonedNode);
          cloneSelectValue(nativeNode, clonedNode);
        }
        return clonedNode;
      }
      function ensureSVGSymbols(clone, options) {
        return __awaiter(this, void 0, void 0, function() {
          var uses, processedDefs, i, use, id, exist, definition, _a, _b, nodes, ns, svg, defs, i;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
                if (uses.length === 0) {
                  return [2, clone];
                }
                processedDefs = {};
                i = 0;
                _c.label = 1;
              case 1:
                if (!(i < uses.length))
                  return [3, 4];
                use = uses[i];
                id = use.getAttribute("xlink:href");
                if (!id)
                  return [3, 3];
                exist = clone.querySelector(id);
                definition = document.querySelector(id);
                if (!(!exist && definition && !processedDefs[id]))
                  return [3, 3];
                _a = processedDefs;
                _b = id;
                return [4, cloneNode(definition, options, true)];
              case 2:
                _a[_b] = _c.sent();
                _c.label = 3;
              case 3:
                i++;
                return [3, 1];
              case 4:
                nodes = Object.values(processedDefs);
                if (nodes.length) {
                  ns = "http://www.w3.org/1999/xhtml";
                  svg = document.createElementNS(ns, "svg");
                  svg.setAttribute("xmlns", ns);
                  svg.style.position = "absolute";
                  svg.style.width = "0";
                  svg.style.height = "0";
                  svg.style.overflow = "hidden";
                  svg.style.display = "none";
                  defs = document.createElementNS(ns, "defs");
                  svg.appendChild(defs);
                  for (i = 0; i < nodes.length; i++) {
                    defs.appendChild(nodes[i]);
                  }
                  clone.appendChild(svg);
                }
                return [2, clone];
            }
          });
        });
      }
      function cloneNode(node, options, isRoot) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            if (!isRoot && options.filter && !options.filter(node)) {
              return [2, null];
            }
            return [2, Promise.resolve(node).then(function(clonedNode) {
              return cloneSingleNode(clonedNode, options);
            }).then(function(clonedNode) {
              return cloneChildren(node, clonedNode, options);
            }).then(function(clonedNode) {
              return decorate(node, clonedNode);
            }).then(function(clonedNode) {
              return ensureSVGSymbols(clonedNode, options);
            })];
          });
        });
      }
      exports.cloneNode = cloneNode;
    }
  });

  // node_modules/html-to-image/lib/embed-resources.js
  var require_embed_resources = __commonJS({
    "node_modules/html-to-image/lib/embed-resources.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.embedResources = exports.shouldEmbed = exports.embed = exports.parseURLs = void 0;
      var util_1 = require_util();
      var mimes_1 = require_mimes();
      var dataurl_1 = require_dataurl();
      var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
      var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
      var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
      function toRegex(url) {
        var escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp(`(url\\(['"]?)(`.concat(escaped, `)(['"]?\\))`), "g");
      }
      function parseURLs(cssText) {
        var urls = [];
        cssText.replace(URL_REGEX, function(raw, quotation, url) {
          urls.push(url);
          return raw;
        });
        return urls.filter(function(url) {
          return !(0, dataurl_1.isDataUrl)(url);
        });
      }
      exports.parseURLs = parseURLs;
      function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
        return __awaiter(this, void 0, void 0, function() {
          var resolvedURL, contentType, dataURL, content, error_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 5, , 6]);
                resolvedURL = baseURL ? (0, util_1.resolveUrl)(resourceURL, baseURL) : resourceURL;
                contentType = (0, mimes_1.getMimeType)(resourceURL);
                dataURL = void 0;
                if (!getContentFromUrl)
                  return [3, 2];
                return [4, getContentFromUrl(resolvedURL)];
              case 1:
                content = _a.sent();
                dataURL = (0, dataurl_1.makeDataUrl)(content, contentType);
                return [3, 4];
              case 2:
                return [4, (0, dataurl_1.resourceToDataURL)(resolvedURL, contentType, options)];
              case 3:
                dataURL = _a.sent();
                _a.label = 4;
              case 4:
                return [2, cssText.replace(toRegex(resourceURL), "$1".concat(dataURL, "$3"))];
              case 5:
                error_1 = _a.sent();
                return [3, 6];
              case 6:
                return [2, cssText];
            }
          });
        });
      }
      exports.embed = embed;
      function filterPreferredFontFormat(str, _a) {
        var preferredFontFormat = _a.preferredFontFormat;
        return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, function(match) {
          while (true) {
            var _a2 = URL_WITH_FORMAT_REGEX.exec(match) || [], src = _a2[0], format = _a2[2];
            if (!format) {
              return "";
            }
            if (format === preferredFontFormat) {
              return "src: ".concat(src, ";");
            }
          }
        });
      }
      function shouldEmbed(url) {
        return url.search(URL_REGEX) !== -1;
      }
      exports.shouldEmbed = shouldEmbed;
      function embedResources(cssText, baseUrl, options) {
        return __awaiter(this, void 0, void 0, function() {
          var filteredCSSText, urls;
          return __generator(this, function(_a) {
            if (!shouldEmbed(cssText)) {
              return [2, cssText];
            }
            filteredCSSText = filterPreferredFontFormat(cssText, options);
            urls = parseURLs(filteredCSSText);
            return [2, urls.reduce(function(deferred, url) {
              return deferred.then(function(css) {
                return embed(css, url, baseUrl, options);
              });
            }, Promise.resolve(filteredCSSText))];
          });
        });
      }
      exports.embedResources = embedResources;
    }
  });

  // node_modules/html-to-image/lib/embed-images.js
  var require_embed_images = __commonJS({
    "node_modules/html-to-image/lib/embed-images.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.embedImages = void 0;
      var embed_resources_1 = require_embed_resources();
      var util_1 = require_util();
      var dataurl_1 = require_dataurl();
      var mimes_1 = require_mimes();
      function embedProp(propName, node, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          var propValue, cssString;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
                if (!propValue)
                  return [3, 2];
                return [4, (0, embed_resources_1.embedResources)(propValue, null, options)];
              case 1:
                cssString = _b.sent();
                node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
                return [2, true];
              case 2:
                return [2, false];
            }
          });
        });
      }
      function embedBackground(clonedNode, options) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, embedProp("background", clonedNode, options)];
              case 1:
                if (!!_a.sent())
                  return [3, 3];
                return [4, embedProp("background-image", clonedNode, options)];
              case 2:
                _a.sent();
                _a.label = 3;
              case 3:
                return [4, embedProp("mask", clonedNode, options)];
              case 4:
                if (!!_a.sent())
                  return [3, 6];
                return [4, embedProp("mask-image", clonedNode, options)];
              case 5:
                _a.sent();
                _a.label = 6;
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
      function embedImageNode(clonedNode, options) {
        return __awaiter(this, void 0, void 0, function() {
          var isImageElement, url, dataURL;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                isImageElement = (0, util_1.isInstanceOfElement)(clonedNode, HTMLImageElement);
                if (!(isImageElement && !(0, dataurl_1.isDataUrl)(clonedNode.src)) && !((0, util_1.isInstanceOfElement)(clonedNode, SVGImageElement) && !(0, dataurl_1.isDataUrl)(clonedNode.href.baseVal))) {
                  return [
                    2
                    /*return*/
                  ];
                }
                url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
                return [4, (0, dataurl_1.resourceToDataURL)(url, (0, mimes_1.getMimeType)(url), options)];
              case 1:
                dataURL = _a.sent();
                return [4, new Promise(function(resolve, reject) {
                  clonedNode.onload = resolve;
                  clonedNode.onerror = reject;
                  var image = clonedNode;
                  if (image.decode) {
                    image.decode = resolve;
                  }
                  if (image.loading === "lazy") {
                    image.loading = "eager";
                  }
                  if (isImageElement) {
                    clonedNode.srcset = "";
                    clonedNode.src = dataURL;
                  } else {
                    clonedNode.href.baseVal = dataURL;
                  }
                })];
              case 2:
                _a.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
      function embedChildren(clonedNode, options) {
        return __awaiter(this, void 0, void 0, function() {
          var children, deferreds;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                children = (0, util_1.toArray)(clonedNode.childNodes);
                deferreds = children.map(function(child) {
                  return embedImages(child, options);
                });
                return [4, Promise.all(deferreds).then(function() {
                  return clonedNode;
                })];
              case 1:
                _a.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
      function embedImages(clonedNode, options) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!(0, util_1.isInstanceOfElement)(clonedNode, Element))
                  return [3, 4];
                return [4, embedBackground(clonedNode, options)];
              case 1:
                _a.sent();
                return [4, embedImageNode(clonedNode, options)];
              case 2:
                _a.sent();
                return [4, embedChildren(clonedNode, options)];
              case 3:
                _a.sent();
                _a.label = 4;
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
      exports.embedImages = embedImages;
    }
  });

  // node_modules/html-to-image/lib/apply-style.js
  var require_apply_style = __commonJS({
    "node_modules/html-to-image/lib/apply-style.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.applyStyle = void 0;
      function applyStyle(node, options) {
        var style = node.style;
        if (options.backgroundColor) {
          style.backgroundColor = options.backgroundColor;
        }
        if (options.width) {
          style.width = "".concat(options.width, "px");
        }
        if (options.height) {
          style.height = "".concat(options.height, "px");
        }
        var manual = options.style;
        if (manual != null) {
          Object.keys(manual).forEach(function(key) {
            style[key] = manual[key];
          });
        }
        return node;
      }
      exports.applyStyle = applyStyle;
    }
  });

  // node_modules/html-to-image/lib/embed-webfonts.js
  var require_embed_webfonts = __commonJS({
    "node_modules/html-to-image/lib/embed-webfonts.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.embedWebFonts = exports.getWebFontCSS = void 0;
      var util_1 = require_util();
      var dataurl_1 = require_dataurl();
      var embed_resources_1 = require_embed_resources();
      var cssFetchCache = {};
      function fetchCSS(url) {
        return __awaiter(this, void 0, void 0, function() {
          var cache, res, cssText;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                cache = cssFetchCache[url];
                if (cache != null) {
                  return [2, cache];
                }
                return [4, fetch(url)];
              case 1:
                res = _a.sent();
                return [4, res.text()];
              case 2:
                cssText = _a.sent();
                cache = { url, cssText };
                cssFetchCache[url] = cache;
                return [2, cache];
            }
          });
        });
      }
      function embedFonts(data, options) {
        return __awaiter(this, void 0, void 0, function() {
          var cssText, regexUrl, fontLocs, loadFonts;
          var _this = this;
          return __generator(this, function(_a) {
            cssText = data.cssText;
            regexUrl = /url\(["']?([^"')]+)["']?\)/g;
            fontLocs = cssText.match(/url\([^)]+\)/g) || [];
            loadFonts = fontLocs.map(function(loc) {
              return __awaiter(_this, void 0, void 0, function() {
                var url;
                return __generator(this, function(_a2) {
                  url = loc.replace(regexUrl, "$1");
                  if (!url.startsWith("https://")) {
                    url = new URL(url, data.url).href;
                  }
                  return [2, (0, dataurl_1.fetchAsDataURL)(url, options.fetchRequestInit, function(_a3) {
                    var result = _a3.result;
                    cssText = cssText.replace(loc, "url(".concat(result, ")"));
                    return [loc, result];
                  })];
                });
              });
            });
            return [2, Promise.all(loadFonts).then(function() {
              return cssText;
            })];
          });
        });
      }
      function parseCSS(source) {
        if (source == null) {
          return [];
        }
        var result = [];
        var commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
        var cssText = source.replace(commentsRegex, "");
        var keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
        while (true) {
          var matches = keyframesRegex.exec(cssText);
          if (matches === null) {
            break;
          }
          result.push(matches[0]);
        }
        cssText = cssText.replace(keyframesRegex, "");
        var importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
        var combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})";
        var unifiedRegex = new RegExp(combinedCSSRegex, "gi");
        while (true) {
          var matches = importRegex.exec(cssText);
          if (matches === null) {
            matches = unifiedRegex.exec(cssText);
            if (matches === null) {
              break;
            } else {
              importRegex.lastIndex = unifiedRegex.lastIndex;
            }
          } else {
            unifiedRegex.lastIndex = importRegex.lastIndex;
          }
          result.push(matches[0]);
        }
        return result;
      }
      function getCSSRules(styleSheets, options) {
        return __awaiter(this, void 0, void 0, function() {
          var ret, deferreds;
          return __generator(this, function(_a) {
            ret = [];
            deferreds = [];
            styleSheets.forEach(function(sheet) {
              if ("cssRules" in sheet) {
                try {
                  (0, util_1.toArray)(sheet.cssRules || []).forEach(function(item, index) {
                    if (item.type === CSSRule.IMPORT_RULE) {
                      var importIndex_1 = index + 1;
                      var url = item.href;
                      var deferred = fetchCSS(url).then(function(metadata) {
                        return embedFonts(metadata, options);
                      }).then(function(cssText) {
                        return parseCSS(cssText).forEach(function(rule) {
                          try {
                            sheet.insertRule(rule, rule.startsWith("@import") ? importIndex_1 += 1 : sheet.cssRules.length);
                          } catch (error) {
                            console.error("Error inserting rule from remote css", {
                              rule,
                              error
                            });
                          }
                        });
                      }).catch(function(e) {
                        console.error("Error loading remote css", e.toString());
                      });
                      deferreds.push(deferred);
                    }
                  });
                } catch (e) {
                  var inline_1 = styleSheets.find(function(a) {
                    return a.href == null;
                  }) || document.styleSheets[0];
                  if (sheet.href != null) {
                    deferreds.push(fetchCSS(sheet.href).then(function(metadata) {
                      return embedFonts(metadata, options);
                    }).then(function(cssText) {
                      return parseCSS(cssText).forEach(function(rule) {
                        inline_1.insertRule(rule, sheet.cssRules.length);
                      });
                    }).catch(function(err) {
                      console.error("Error loading remote stylesheet", err);
                    }));
                  }
                  console.error("Error inlining remote css file", e);
                }
              }
            });
            return [2, Promise.all(deferreds).then(function() {
              styleSheets.forEach(function(sheet) {
                if ("cssRules" in sheet) {
                  try {
                    (0, util_1.toArray)(sheet.cssRules || []).forEach(function(item) {
                      ret.push(item);
                    });
                  } catch (e) {
                    console.error("Error while reading CSS rules from ".concat(sheet.href), e);
                  }
                }
              });
              return ret;
            })];
          });
        });
      }
      function getWebFontRules(cssRules) {
        return cssRules.filter(function(rule) {
          return rule.type === CSSRule.FONT_FACE_RULE;
        }).filter(function(rule) {
          return (0, embed_resources_1.shouldEmbed)(rule.style.getPropertyValue("src"));
        });
      }
      function parseWebFontRules(node, options) {
        return __awaiter(this, void 0, void 0, function() {
          var styleSheets, cssRules;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (node.ownerDocument == null) {
                  throw new Error("Provided element is not within a Document");
                }
                styleSheets = (0, util_1.toArray)(node.ownerDocument.styleSheets);
                return [4, getCSSRules(styleSheets, options)];
              case 1:
                cssRules = _a.sent();
                return [2, getWebFontRules(cssRules)];
            }
          });
        });
      }
      function getWebFontCSS(node, options) {
        return __awaiter(this, void 0, void 0, function() {
          var rules, cssTexts;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, parseWebFontRules(node, options)];
              case 1:
                rules = _a.sent();
                return [4, Promise.all(rules.map(function(rule) {
                  var baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
                  return (0, embed_resources_1.embedResources)(rule.cssText, baseUrl, options);
                }))];
              case 2:
                cssTexts = _a.sent();
                return [2, cssTexts.join("\n")];
            }
          });
        });
      }
      exports.getWebFontCSS = getWebFontCSS;
      function embedWebFonts(clonedNode, options) {
        return __awaiter(this, void 0, void 0, function() {
          var cssText, _a, _b, styleNode, sytleContent;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                if (!(options.fontEmbedCSS != null))
                  return [3, 1];
                _a = options.fontEmbedCSS;
                return [3, 5];
              case 1:
                if (!options.skipFonts)
                  return [3, 2];
                _b = null;
                return [3, 4];
              case 2:
                return [4, getWebFontCSS(clonedNode, options)];
              case 3:
                _b = _c.sent();
                _c.label = 4;
              case 4:
                _a = _b;
                _c.label = 5;
              case 5:
                cssText = _a;
                if (cssText) {
                  styleNode = document.createElement("style");
                  sytleContent = document.createTextNode(cssText);
                  styleNode.appendChild(sytleContent);
                  if (clonedNode.firstChild) {
                    clonedNode.insertBefore(styleNode, clonedNode.firstChild);
                  } else {
                    clonedNode.appendChild(styleNode);
                  }
                }
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }
      exports.embedWebFonts = embedWebFonts;
    }
  });

  // node_modules/html-to-image/lib/index.js
  var require_lib = __commonJS({
    "node_modules/html-to-image/lib/index.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getFontEmbedCSS = exports.toBlob = exports.toJpeg = exports.toPng = exports.toPixelData = exports.toCanvas = exports.toSvg = void 0;
      var clone_node_1 = require_clone_node();
      var embed_images_1 = require_embed_images();
      var apply_style_1 = require_apply_style();
      var embed_webfonts_1 = require_embed_webfonts();
      var util_1 = require_util();
      function toSvg(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          var _a, width, height, clonedNode, datauri;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
                return [4, (0, clone_node_1.cloneNode)(node, options, true)];
              case 1:
                clonedNode = _b.sent();
                return [4, (0, embed_webfonts_1.embedWebFonts)(clonedNode, options)];
              case 2:
                _b.sent();
                return [4, (0, embed_images_1.embedImages)(clonedNode, options)];
              case 3:
                _b.sent();
                (0, apply_style_1.applyStyle)(clonedNode, options);
                return [4, (0, util_1.nodeToDataURL)(clonedNode, width, height)];
              case 4:
                datauri = _b.sent();
                return [2, datauri];
            }
          });
        });
      }
      exports.toSvg = toSvg;
      function toCanvas(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          var _a, width, height, svg, img, canvas, context, ratio, canvasWidth, canvasHeight;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
                return [4, toSvg(node, options)];
              case 1:
                svg = _b.sent();
                return [4, (0, util_1.createImage)(svg)];
              case 2:
                img = _b.sent();
                canvas = document.createElement("canvas");
                context = canvas.getContext("2d");
                ratio = options.pixelRatio || (0, util_1.getPixelRatio)();
                canvasWidth = options.canvasWidth || width;
                canvasHeight = options.canvasHeight || height;
                canvas.width = canvasWidth * ratio;
                canvas.height = canvasHeight * ratio;
                if (!options.skipAutoScale) {
                  (0, util_1.checkCanvasDimensions)(canvas);
                }
                canvas.style.width = "".concat(canvasWidth);
                canvas.style.height = "".concat(canvasHeight);
                if (options.backgroundColor) {
                  context.fillStyle = options.backgroundColor;
                  context.fillRect(0, 0, canvas.width, canvas.height);
                }
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                return [2, canvas];
            }
          });
        });
      }
      exports.toCanvas = toCanvas;
      function toPixelData(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          var _a, width, height, canvas, ctx;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _a = (0, util_1.getImageSize)(node, options), width = _a.width, height = _a.height;
                return [4, toCanvas(node, options)];
              case 1:
                canvas = _b.sent();
                ctx = canvas.getContext("2d");
                return [2, ctx.getImageData(0, 0, width, height).data];
            }
          });
        });
      }
      exports.toPixelData = toPixelData;
      function toPng(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          var canvas;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, toCanvas(node, options)];
              case 1:
                canvas = _a.sent();
                return [2, canvas.toDataURL()];
            }
          });
        });
      }
      exports.toPng = toPng;
      function toJpeg(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          var canvas;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, toCanvas(node, options)];
              case 1:
                canvas = _a.sent();
                return [2, canvas.toDataURL("image/jpeg", options.quality || 1)];
            }
          });
        });
      }
      exports.toJpeg = toJpeg;
      function toBlob(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          var canvas, blob;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, toCanvas(node, options)];
              case 1:
                canvas = _a.sent();
                return [4, (0, util_1.canvasToBlob)(canvas)];
              case 2:
                blob = _a.sent();
                return [2, blob];
            }
          });
        });
      }
      exports.toBlob = toBlob;
      function getFontEmbedCSS(node, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            return [2, (0, embed_webfonts_1.getWebFontCSS)(node, options)];
          });
        });
      }
      exports.getFontEmbedCSS = getFontEmbedCSS;
    }
  });

  // assets/editor.js
  var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  tinymce.init({
    selector: "textarea#mytextarea",
    plugins: "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons spellchecker",
    imagetools_cors_hosts: ["picsum.photos"],
    menu: { custom: { title: "File", items: "newdocument | open | save | saveImage | preview | print" }, languages: { title: "Language", items: "Albanian Arabic Azerbaijani Bulgarian Catalan Czech Danish German Greek Spanish Persian Finnish French Hebrew Croatian Hungarian Indonesian Italian Japanese Georgian Kabyle Kazakh Korean Lithuanian Dutch Polish Portuguese Romanian Russian Slovak Slovenian Swedish Tamil Tajik Thai Turkish Uzbek Uyghur Ukrainian Chinese_Simplified Chinese_Traditional" } },
    menubar: "custom edit view insert format tools table languages help",
    toolbar: "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify  | ltr rtl | spellchecker | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | outdent indent | numlist bullist",
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: "sliding",
    contextmenu: "link image imagetools table spellchecker",
    skin: useDarkMode ? "oxide-dark" : "oxide",
    content_css: useDarkMode ? "dark" : "default",
    content_style: "body { font-family: Verdana,UKIJ,sans-serif; }",
    spellchecker_languages: "Bulgarian=bg,Catalan=ca,Czech=cs,Croatian=hr,Danish=da,Dutch=nl,English=en,French=fr_FR,German=de,Georgian=ka,Greek=el,Hebrew=he,Hungarian=hu,Italian=it,Korean=ko,Lithuanian=lt,Polish=pl,Portuguese=pt_PT,Persian=fa,Romanian=ro,Russian=ru,Spanish=es,Swedish=sv,Slovak=sk,Slovenian=sl,Turkish=tr,Uyghur=ug,Ukrainian=uk",
    spellchecker_rpc_url: "https://editor.yadikar.it/tinymce_spellchecker/spellchecker.php",
    font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
    language: "en",
    setup: function(editor) {
      editor.ui.registry.addToggleMenuItem("open", {
        text: "Open",
        icon: "browse",
        onAction: function() {
          openFile();
        }
      });
      editor.ui.registry.addToggleMenuItem("save", {
        text: "Save",
        icon: "save",
        onAction: function() {
          saveFile();
        }
      });
      editor.ui.registry.addToggleMenuItem("saveImage", {
        text: "Save As PNG",
        icon: "save",
        onAction: function() {
          saveAsImage();
        }
      });
      editor.ui.registry.addMenuItem("Arabic", {
        text: "Arabic",
        onAction: function() {
          window.open("https://editor.yadikar.it/Arabic", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Albanian", {
        text: "Albanian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Albanian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Azerbaijani", {
        text: "Azerbaijani",
        onAction: function() {
          window.open("https://editor.yadikar.it/Azerbaijani", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Bulgarian", {
        text: "Bulgarian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Bulgarian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Catalan", {
        text: "Catalan",
        onAction: function() {
          window.open("https://editor.yadikar.it/Catalan", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Czech", {
        text: "Czech",
        onAction: function() {
          window.open("https://editor.yadikar.it/Czech", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Danish", {
        text: "Danish",
        onAction: function() {
          window.open("https://editor.yadikar.it/Danish", "_self");
        }
      });
      editor.ui.registry.addMenuItem("German", {
        text: "German",
        onAction: function() {
          window.open("https://editor.yadikar.it/German", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Greek", {
        text: "Greek",
        onAction: function() {
          window.open("https://editor.yadikar.it/Greek", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Spanish", {
        text: "Spanish",
        onAction: function() {
          window.open("https://editor.yadikar.it/Spanish", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Persian", {
        text: "Persian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Persian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Finnish", {
        text: "Finnish",
        onAction: function() {
          window.open("https://editor.yadikar.it/Finnish", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Hebrew", {
        text: "Hebrew",
        onAction: function() {
          window.open("https://editor.yadikar.it/Hebrew", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Croatian", {
        text: "Croatian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Croatian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Hungarian", {
        text: "Hungarian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Hungarian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Indonesian", {
        text: "Indonesian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Indonesian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Japanese", {
        text: "Japanese",
        onAction: function() {
          window.open("https://editor.yadikar.it/Japanese", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Georgian", {
        text: "Georgian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Georgian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Kabyle", {
        text: "Kabyle",
        onAction: function() {
          window.open("https://editor.yadikar.it/Kabyle", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Kazakh", {
        text: "Kazakh",
        onAction: function() {
          window.open("https://editor.yadikar.it/Kazakh", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Korean", {
        text: "Korean",
        onAction: function() {
          window.open("https://editor.yadikar.it/Korean", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Lithuanian", {
        text: "Lithuanian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Lithuanian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Polish", {
        text: "Polish",
        onAction: function() {
          window.open("https://editor.yadikar.it/Polish", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Portuguese", {
        text: "Portuguese",
        onAction: function() {
          window.open("https://editor.yadikar.it/Portuguese", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Romanian", {
        text: "Romanian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Romanian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Russian", {
        text: "Russian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Russian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Slovak", {
        text: "Slovak",
        onAction: function() {
          window.open("https://editor.yadikar.it/Slovak", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Slovenian", {
        text: "Slovenian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Slovenian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Swedish", {
        text: "Swedish",
        onAction: function() {
          window.open("https://editor.yadikar.it/Swedish", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Tamil", {
        text: "Tamil",
        onAction: function() {
          window.open("https://editor.yadikar.it/Tamil", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Tajik", {
        text: "Tajik",
        onAction: function() {
          window.open("https://editor.yadikar.it/Tajik", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Thai", {
        text: "Thai",
        onAction: function() {
          window.open("https://editor.yadikar.it/Thai", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Uzbek", {
        text: "Uzbek",
        onAction: function() {
          window.open("https://editor.yadikar.it/Uzbek", "_self");
        }
      });
      editor.ui.registry.addMenuItem("English", {
        text: "English",
        onAction: function() {
          window.open("https://editor.yadikar.it/English", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Uyghur", {
        text: "Uyghur",
        onAction: function() {
          window.open("https://editor.yadikar.it/Uyghur", "_self");
        }
      });
      editor.ui.registry.addMenuItem("French", {
        text: "French",
        onAction: function() {
          window.open("https://editor.yadikar.it/French", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Italian", {
        text: "Italian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Italian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Dutch", {
        text: "Dutch",
        onAction: function() {
          window.open("https://editor.yadikar.it/Dutch", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Turkish", {
        text: "Turkish",
        onAction: function() {
          window.open("https://editor.yadikar.it/Turkish", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Ukrainian", {
        text: "Ukrainian",
        onAction: function() {
          window.open("https://editor.yadikar.it/Ukrainian", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Welsh", {
        text: "Welsh",
        onAction: function() {
          window.open("https://editor.yadikar.it/Welsh", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Chinese_Simplified", {
        text: "Chinese Simplified",
        onAction: function() {
          window.open("https://editor.yadikar.it/Chinese_Simplified", "_self");
        }
      });
      editor.ui.registry.addMenuItem("Chinese_Traditional", {
        text: "ChineseTraditional",
        onAction: function() {
          window.open("https://editor.yadikar.it/Chinese_Traditional", "_self");
        }
      });
    }
  });
  var fileHandle;
  async function openFile() {
    const options = {
      types: [
        {
          description: "Text files",
          accept: {
            "text/plain": [".txt"]
          }
        }
      ]
    };
    [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const content = await file.text();
    tinymce.get("mytextarea").setContent(content);
    return content;
  }
  async function saveFile() {
    const options = {
      types: [
        {
          description: "Text files",
          accept: {
            "text/plain": [".txt"]
          }
        }
      ]
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    const content = tinymce.get("mytextarea").getContent();
    await writable.write(content);
    await writable.close();
    return handle;
  }
  var FileSaver = require_FileSaver_min();
  var htmlToImage = require_lib();
  async function saveAsImage() {
    const options = {
      types: [
        {
          description: "Text files",
          accept: {
            "Image Files": [".png"]
          }
        }
      ]
    };
    var elem = tinymce.get("mytextarea").contentDocument.body;
    var blob = htmlToImage.toBlob(elem, { backgroundColor: "white" }).then(function(blob2) {
      if (window.saveAs) {
        window.saveAs(blob2, "my-node.png");
      } else {
        FileSaver.saveAs(blob2, "my-node.png");
      }
    });
  }
})();
