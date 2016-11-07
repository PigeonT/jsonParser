export const enum TOKEN {
    LBRACE, RBRACE, LBRACKET, RBRACKET, COMMA, NUMBER, STRING, SEMICOLON, QUOTE, BOOLEAN, NULL, UNDEFINED
}
    
export class Rule {
    private readonly id : TOKEN;
    private readonly value : string;
    public constructor(i, v) {
        this.id = i;
        this.value = v;
    }
    public getId() : TOKEN {
        return this.id;
    }
    public getValue() : string {
        return this.value;
    }
}

export class Lexer {
    private readonly json : string;
    private tokens : Array<Rule>;  
 
    public constructor(_json : string) {
        this.json = _json;        
        initTokenArray(_json);
    }       

    public getTokenArray() : Array<Rule>  {
         return tokens;
    }
}

let _index : number = 0;
let tokens : Array<Rule> = [];
let json : string;

function initTokenArray(_json : string) : void {
       if(!_json) throw Error('Not valid input');
       json = _json;
       while(_index < json.length) {
           let tk = getToken();
           if(tk) tokens.push(tk);
       }
}

 function getToken() : Rule {
        let _c : string = json[_index];
        let _rule : Rule = null;
        if(isLBrace(_c)) {
            _rule = new Rule(TOKEN.LBRACE, '{');
        }else if(isRBrace(_c)) {
            _rule =  new Rule(TOKEN.RBRACE, '}');
        }else if(isLBracket(_c)) {
            _rule =  new Rule(TOKEN.LBRACKET, '[');
        }else if(isRBracket(_c)) {
            _rule =  new Rule(TOKEN.RBRACKET, ']');
        }else if(isComma(_c)) {
            _rule = new Rule(TOKEN.COMMA, ',');
        }else if(isSemicolon(_c)) {
            _rule = new Rule(TOKEN.SEMICOLON, ':');
        }else if(isQuote(_c)) {
            _rule = new Rule(TOKEN.QUOTE, _c);
        }else if(isDigit(_c)) {
            let nr = '';            
            do {
                nr += json[_index];
                _index += 1;                
            }while(isDigit(json[_index]));
            _index -= 1;
            _rule =  new Rule(TOKEN.NUMBER, nr);
        }else if(isAlphabet(_c)) {
            let str = '';            
            do {
                str += json[_index];
                _index += 1;                
            }while(isAlphabet(json[_index]));
            _index -= 1;
            if(isNull(str)) {
                _rule =  new Rule(TOKEN.NULL, 'null'); 
            } 
            else if(isUndefined(str)) {
                _rule =  new Rule(TOKEN.UNDEFINED, 'undefined');
            }
            else if(isBoolean(str)) {
                _rule = new Rule(TOKEN.BOOLEAN, str);            
            } 
            else {
                _rule =  new Rule(TOKEN.STRING, str);
            } 
        }
        _index += 1;
       
        return _rule;
}

function isSpace(c : string) : boolean {
    return /\s+/.test(c);
}

function isDigit(c : string) : boolean {
    return /[0-9\.]/.test(c);
}

function isAlphabet(c : string) : boolean {
    return /[a-zA-Z0-9_$]/.test(c);
}

function isLBrace(c : string) : boolean {
    return /[{]/.test(c);
}

function isRBrace(c : string) : boolean {
    return /[}]/.test(c);
}

function isLBracket(c : string) : boolean {
    return /\[/.test(c);
}
function isComma(c : string) : boolean {
    return /,/.test(c);
}
function isSemicolon(c : string) : boolean {
    return /:/.test(c);
}
function isNull(c : string) : boolean {
    return /null/.test(c);
}
function isUndefined(c : string) : boolean {
    return /undefined/.test(c);
}

function isBoolean(c : string) : boolean {
    return /true|false/.test(c);
}
function isRBracket(c : string) : boolean {
    return /\]/.test(c);
}

function isQuote(c : string) : boolean {
    return /['"]/.test(c);
}

