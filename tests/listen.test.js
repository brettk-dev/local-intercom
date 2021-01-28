"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var setupDom_1 = require("./setupDom");
var config_1 = require("../src/config");
var init_1 = require("../src/init");
var listen_1 = require("../src/listen");
describe('listen', function () {
    var dom;
    before(function () {
        dom = setupDom_1.setupDom();
        init_1.init();
    });
    it('allows the user to listen for new messages of a type.', function () {
        var fn = sinon_1.default.fake();
        listen_1.listen('test', fn);
        window.localStorage.setItem(config_1.config.KEY, '{"type":"test"}');
        var event = new dom.window.StorageEvent('storage', { bubbles: true });
        window.document.dispatchEvent(event);
        chai_1.expect(fn).to.have.been.calledOnceWith();
    });
});
//# sourceMappingURL=listen.test.js.map