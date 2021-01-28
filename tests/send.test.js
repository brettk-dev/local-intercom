"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var sinon_1 = __importDefault(require("sinon"));
var sinon_chai_1 = __importDefault(require("sinon-chai"));
var send_1 = require("../src/send");
var config_1 = require("../src/config");
var setupDom_1 = require("./setupDom");
chai_1.default.should();
chai_1.default.use(sinon_chai_1.default);
var simpleData = {
    type: 'test'
};
var complexData = {
    type: 'test',
    payload: {
        one: 1,
        two: { too: 'to' },
        three: ['four']
    }
};
describe('send', function () {
    before(function () {
        setupDom_1.setupDom();
    });
    it('uses local storage to send a message.', function () {
        var setItemSpy = sinon_1.default.spy(localStorage, 'setItem');
        send_1.send(simpleData.type);
        chai_1.expect(setItemSpy).to.have.been.calledOnceWith(config_1.config.KEY, JSON.stringify(simpleData));
        setItemSpy.restore();
    });
    it('clears the local storage key after.', function () {
        var clock = sinon_1.default.useFakeTimers();
        var setItemSpy = sinon_1.default.spy(localStorage, 'setItem');
        var removeItemSpy = sinon_1.default.spy(localStorage, 'removeItem');
        send_1.send(simpleData.type);
        clock.tick(1);
        chai_1.expect(removeItemSpy).to.have.been.calledAfter(setItemSpy);
        chai_1.expect(removeItemSpy).to.have.been.calledOnceWith(config_1.config.KEY);
        setItemSpy.restore();
        removeItemSpy.restore();
        clock.restore();
    });
    it('throws an error if no type is provided', function () {
        // @ts-ignore
        chai_1.expect(function () { return send_1.send(); }).to.throw();
    });
});
//# sourceMappingURL=send.test.js.map