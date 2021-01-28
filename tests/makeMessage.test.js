"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var makeMessage_1 = require("../src/makeMessage");
var simpleMessage = 'A simple message';
var complexMessage = {
    one: 1,
    two: { too: 'to' },
    three: [1, 2, 3]
};
describe('makeMessage', function () {
    it('creates a simple Message', function () {
        var msg = makeMessage_1.makeMessage('simple', simpleMessage);
        chai_1.expect(msg.type).to.equal('simple');
        chai_1.expect(msg.payload).to.deep.equal(simpleMessage);
    });
    it('creates a complex message', function () {
        var msg = makeMessage_1.makeMessage('complex', complexMessage);
        chai_1.expect(msg.type).to.equal('complex');
        chai_1.expect(msg.payload).to.deep.equal(complexMessage);
    });
    it('throws an error if no type is provided', function () {
        // @ts-ignore
        chai_1.expect(function () { return makeMessage_1.makeMessage(); }).to.throw();
    });
    it('does not throw an error when no payload is provided', function () {
        var msg = makeMessage_1.makeMessage('event');
        chai_1.expect(msg.type).to.equal('event');
        chai_1.expect(msg.payload).to.be.undefined;
    });
});
//# sourceMappingURL=makeMessage.test.js.map