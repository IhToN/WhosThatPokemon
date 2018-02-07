webpackJsonp(["styles"],{

/***/ "../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/styles.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--7-1!../node_modules/postcss-loader/lib/index.js??postcss!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--7-1!../node_modules/postcss-loader/lib/index.js??postcss!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Scrollbars */\n.scrollbar {\n  background: #fff;\n  overflow-y: scroll;\n}\n.scrollbar-juicy-peach::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-juicy-peach::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-juicy-peach::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffecd2), to(#fcb69f));\n  background-image: linear-gradient(to bottom, #ffecd2 0%, #fcb69f 100%);\n}\n.scrollbar-young-passion::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-young-passion::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-young-passion::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ff8177), color-stop(0%, #ff867a), color-stop(21%, #ff8c7f), color-stop(52%, #f99185), color-stop(78%, #cf556c), to(#b12a5b));\n  background-image: linear-gradient(to bottom, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);\n}\n.scrollbar-lady-lips::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-lady-lips::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-lady-lips::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#ff9a9e), color-stop(99%, #fecfef), to(#fecfef));\n  background-image: linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);\n}\n.scrollbar-sunny-morning::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-sunny-morning::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-sunny-morning::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);\n}\n.scrollbar-rainy-ashville::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-rainy-ashville::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-rainy-ashville::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#fbc2eb), to(#a6c1ee));\n  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);\n}\n.scrollbar-frozen-dreams::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-frozen-dreams::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-frozen-dreams::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#fdcbf1), color-stop(1%, #fdcbf1), to(#e6dee9));\n  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);\n}\n.scrollbar-warm-flame::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-warm-flame::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-warm-flame::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);\n}\n.scrollbar-night-fade::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-night-fade::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-night-fade::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#a18cd1), to(#fbc2eb));\n  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);\n}\n.scrollbar-spring-warmth::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-spring-warmth::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-spring-warmth::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#fad0c4), to(#ffd1ff));\n  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);\n}\n.scrollbar-winter-neva::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-winter-neva::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-winter-neva::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);\n}\n.scrollbar-dusty-grass::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-dusty-grass::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-dusty-grass::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);\n}\n.scrollbar-tempting-azure::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-tempting-azure::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-tempting-azure::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);\n}\n.scrollbar-heavy-rain::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-heavy-rain::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-heavy-rain::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#cfd9df), to(#e2ebf0));\n  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);\n}\n.scrollbar-amy-crisp::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-amy-crisp::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-amy-crisp::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);\n}\n.scrollbar-mean-fruit::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-mean-fruit::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-mean-fruit::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);\n}\n.scrollbar-deep-blue::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-deep-blue::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-deep-blue::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);\n}\n.scrollbar-ripe-malinka::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-ripe-malinka::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-ripe-malinka::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);\n}\n.scrollbar-cloudy-knoxville::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-cloudy-knoxville::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-cloudy-knoxville::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);\n}\n.scrollbar-morpheus-den::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-morpheus-den::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-morpheus-den::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#30cfd0), to(#330867));\n  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);\n}\n.scrollbar-rare-wind::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-rare-wind::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-rare-wind::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#a8edea), to(#fed6e3));\n  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);\n}\n.scrollbar-near-moon::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-color: #F5F5F5;\n  border-radius: 10px;\n}\n.scrollbar-near-moon::-webkit-scrollbar {\n  width: 12px;\n  background-color: #F5F5F5;\n}\n.scrollbar-near-moon::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);\n  background-image: -webkit-gradient(linear, left bottom, left top, from(#5ee7df), to(#b490ca));\n  background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);\n}\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/styles.css");


/***/ })

},[3]);
//# sourceMappingURL=styles.bundle.js.map