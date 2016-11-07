'use strict'
let chai = require('chai'),
    LEXER = require('../Lexer'),
    expect = chai.expect,
    assert = chai.assert,
    Lexer = LEXER.Lexer,
    Rule = LEXER.Rule,
    Parser = require('../Parser');

let Token = {
    LBRACE : 0,
    RBRACE : 1,
    LBRACKET : 2,
    RBRACKET : 3,
    COMMA : 4,
    NUMBER : 5,
    STRING : 6,
    SEMICOLON : 7,
    QUOTE : 8,
    BOOLEAN : 9,
    NULL : 10,
    UNDEFINED : 11
}
describe('test Lexer ', () => {
    let json = '{\'key1\' : [1,2,3],\'key2\' : \'some\', \'key3\' : true, \'key4\' : null, \'key5\' : undefined}',
        lexer = new Lexer(json),
        token = lexer.getTokenArray(),
        predictRule;

    function getRule(rule) {
        if(!token) throw new Error('empty token');
        for(let k of token) {
            if(k['id'] === rule.getId()) return k; 
        }
        return null;
    } 

        
    beforeEach(() => {
        
    });

    afterEach(() => {
        predictRule = null;
    });
    
    it('should get Rule of {', () => {
        let rule = new Rule(Token.LBRACE, '{');
        predictRule = getRule(rule);
        if(!predictRule) assert(predictRule.getId() === rule.getId(), 'not equal');
    });

    it('should get Rule of }', () => {
        let rule = new Rule(Token.RBRACE, '}');      
        predictRule = getRule(rule);
        if(!predictRule) assert(predictRule.getId() === rule.getId(), 'not equal'); 
       });

    it('should get Rule of [', () => {
        let rule = new Rule(Token.LBRACKET, '[');
        predictRule = getRule(rule);
        if(!predictRule) assert(predictRule.getId() === rule.getId(), 'not equal');  
      });

    it('should get Rule of ]', () => {
        let rule = new Rule(Token.RBRACKET, ']');
        predictRule = getRule(rule);
        if(!predictRule) assert(predictRule.getId() === rule.getId(), 'not equal');   
     });

    it('should get Rule of \'', () => {
        let rule = new Rule(Token.QUOTE, '\'');
        predictRule = getRule(rule);
        if(!predictRule) assert(predictRule.getId() === rule.getId(), 'not equal');  
     });

    it('should get Rule of string key1', () => {
        let rule = new Rule(Token.STRING, 'key1');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'key1', 'not equal'); 
        }
    });

    it('should get Rule of string key2', () => {            
        let rule = new Rule(Token.STRING, 'key2');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'key2', 'not equal'); 
        }
    });

    it('should get Rule of string key3', () => {
        let rule = new Rule(Token.STRING, 'key3');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'key3', 'not equal'); 
        }
    });

    it('should get Rule of string key4', () => {
        let rule = new Rule(Token.STRING, 'key4');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'key4', 'not equal'); 
        }
    });

    it('should get Rule of string key5', () => {
        let rule = new Rule(Token.STRING, 'key5');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'key5', 'not equal'); 
        }
    });

    it('should get Rule of string some', () => {
        let rule = new Rule(Token.STRING, 'some');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'some', 'not equal'); 
        }
    });

    it('should get Rule of boolean true', () => {
        let rule = new Rule(Token.BOOLEAN, 'true');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'true', 'not equal'); 
        }
    });

    it('should get Rule of null', () => {
        let rule = new Rule(Token.NULL, 'null');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'true', 'not equal'); 
        }
    });

    it('should get Rule of undefined', () => {
        let rule = new Rule(Token.UNDEFINED, 'undefined');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === 'true', 'not equal'); 
        }
    });

    it('should get Rule of number 1', () => {
        let rule = new Rule(Token.NUMBER, '1');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === '1', 'not equal'); 
        }
    });

    it('should get Rule of number 2', () => {
        let rule = new Rule(Token.NUMBER, '2');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === '2', 'not equal'); 
        }
    });

    it('should get Rule of number 3', () => {
        let rule = new Rule(Token.NUMBER, '3');
        predictRule = getRule(rule);
        if(!predictRule) {
            assert(predictRule.getId() === rule.getId(), 'not equal');
            assert(predictRule.getValue() === '3', 'not equal'); 
        }
    });
});


function isSpace(c)  {
    return /\s+/.test(c);
}

function isDigit(c )  {
    return /[0-9]\.?[0-9]*/.test(c);
}

function isAlphabet(c ) {
    return /[_$a-zA-Z][a-zA-Z0-9_$]*/.test(c);
}

function isLBrace(c)   {
    return /[{]/.test(c);
}

function isRBrace(c )   {
    return /[}]/.test(c);
}


function isLBracket(c )   {
    return /\[/.test(c);
}
function isComma(c  )   {
    return /,/.test(c);
}
function isSemicolon(c  )   {
    return /:/.test(c);
}
function isBoolean(c )   {
    return /[true|false]]/.test(c);
}
function isNull(c  )  {
    return /null/.test(c);
}
function isUndefined(c ) {
    return /undefined/.test(c);
}
function isRBracket(c){
    return /\]/.test(c);
}

function isQuote(c  )   {
    return /['"]/.test(c);
}


