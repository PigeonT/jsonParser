"use strict";
class Rule {
    constructor(i, v) {
        this.id = i;
        this.value = v;
    }
    getId() {
        return this.id;
    }
    getValue() {
        return this.value;
    }
}
exports.Rule = Rule;
class Lexer {
    constructor(_json) {
        this.json = _json;
        initTokenArray(_json);
    }
    getTokenArray() {
        return tokens;
    }
}
exports.Lexer = Lexer;
let _index = 0;
let tokens = [];
let json;
function initTokenArray(_json) {
    if (!_json)
        throw Error('Not valid input');
    json = _json;
    while (_index < json.length) {
        let tk = getToken();
        if (tk)
            tokens.push(tk);
    }
}
function getToken() {
    let _c = json[_index];
    let _rule = null;
    if (isLBrace(_c)) {
        _rule = new Rule(0 /* LBRACE */, '{');
    }
    else if (isRBrace(_c)) {
        _rule = new Rule(1 /* RBRACE */, '}');
    }
    else if (isLBracket(_c)) {
        _rule = new Rule(2 /* LBRACKET */, '[');
    }
    else if (isRBracket(_c)) {
        _rule = new Rule(3 /* RBRACKET */, ']');
    }
    else if (isComma(_c)) {
        _rule = new Rule(4 /* COMMA */, ',');
    }
    else if (isSemicolon(_c)) {
        _rule = new Rule(7 /* SEMICOLON */, ':');
    }
    else if (isQuote(_c)) {
        _rule = new Rule(8 /* QUOTE */, _c);
    }
    else if (isDigit(_c)) {
        let nr = '';
        do {
            nr += json[_index];
            _index += 1;
        } while (isDigit(json[_index]));
        _index -= 1;
        _rule = new Rule(5 /* NUMBER */, nr);
    }
    else if (isAlphabet(_c)) {
        let str = '';
        do {
            str += json[_index];
            _index += 1;
        } while (isAlphabet(json[_index]));
        _index -= 1;
        if (isNull(str)) {
            _rule = new Rule(10 /* NULL */, 'null');
        }
        else if (isUndefined(str)) {
            _rule = new Rule(11 /* UNDEFINED */, 'undefined');
        }
        else if (isBoolean(str)) {
            _rule = new Rule(9 /* BOOLEAN */, str);
        }
        else {
            _rule = new Rule(6 /* STRING */, str);
        }
    }
    _index += 1;
    return _rule;
}
function isSpace(c) {
    return /\s+/.test(c);
}
function isDigit(c) {
    return /[0-9\.]/.test(c);
}
function isAlphabet(c) {
    return /[a-zA-Z0-9_$]/.test(c);
}
function isLBrace(c) {
    return /[{]/.test(c);
}
function isRBrace(c) {
    return /[}]/.test(c);
}
function isLBracket(c) {
    return /\[/.test(c);
}
function isComma(c) {
    return /,/.test(c);
}
function isSemicolon(c) {
    return /:/.test(c);
}
function isNull(c) {
    return /null/.test(c);
}
function isUndefined(c) {
    return /undefined/.test(c);
}
function isBoolean(c) {
    return /true|false/.test(c);
}
function isRBracket(c) {
    return /\]/.test(c);
}
function isQuote(c) {
    return /['"]/.test(c);
}
