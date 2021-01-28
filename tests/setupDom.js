"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDom = void 0;
var jsdom_1 = require("jsdom");
var setupDom = function () {
    var dom = new jsdom_1.JSDOM('', {
        url: 'http://localhost'
    });
    global.document = dom.window.document;
    // @ts-ignore
    global.window = dom.window;
    global.localStorage = {
        setItem: function (key, value) { },
        getItem: function (key) { return ''; },
        removeItem: function (key) { },
        length: 0,
        clear: function () { },
        key: function (index) { return null; }
    };
    return dom;
};
exports.setupDom = setupDom;
//# sourceMappingURL=setupDom.js.map