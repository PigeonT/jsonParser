"use strict";
const Lexer_1 = require('./Lexer');
class Parser {
    constructor(json) {
        this.__index = 0;
        this.json = json;
        this.tokens = init(json);
        this.__build();
    }
    __build() {
        let cursor;
        this.next();
        cursor = this.__currentRule;
        switch (cursor.getId()) {
            case 0 /* LBRACE */:
                this.next();
                this.jsonObject = this.getObject();
                break;
            default:
                throw new Error();
        }
    }
    next() {
        this.__currentRule = this.tokens[this.__index];
        this.__index += 1;
    }
    getObject() {
        return {};
    }
}
exports.Parser = Parser;
function init(json) {
    let lexer = new Lexer_1.Lexer(json);
    return lexer.getTokenArray();
}
