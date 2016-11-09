import {Lexer, Rule, TOKEN} from './Lexer';

export default class Parser {
    private json : string;
    private tokens : Array<Rule>;
    private __index : number;
    private jsonObject : Object;
    private __currentRule : Rule;

    constructor(json : string) {
        this.json = json;
        this.tokens = init(json)
        this.__index = 0;
        this.__currentRule = this.tokens[this.__index];
    }

    public parse() : Object {
        return this.__parseValue();
    }

    private __parseValue() : Object {

        switch(this.__currentRule.getId()) {
            case TOKEN.LBRACE: 
                this.__next();
                return this.__getObject();
            case TOKEN.LBRACKET:
                this.__next();
                return this.__getArray();    
            default :
                throw new SyntaxError('json parse exception');
        }               
    }

    private __next() : void {
        this.__index += 1;
        this.__currentRule = this.tokens[this.__index];
    }

    private __getObject() : Object {
        let obj : Object = {};
        switch(this.__currentRule.getId()) {
            case TOKEN.QUOTE :{
                do {
                    let key = this.__parseString();
                    this.__accept(TOKEN.SEMICOLON);
                    Object.defineProperty(obj, key, {
                        value : this.__parseValue()
                    });
                }while(this.__nextIfAccept(TOKEN.COMMA));
                this.__accept(TOKEN.RBRACE);
                return obj;
            }
            default:
                throw new SyntaxError('not valid json string');
        }
    }

    private __getArray() : Object {
        let arr = [];

        return arr;
    }

    private __parseString() : string {
        return null;
    }

    private __accept(token : TOKEN) {

    }

    private __nextIfAccept(token : TOKEN) : boolean {
        return false;
    }
}

function init(json : string) : Array<Rule>{
    let lexer = new Lexer(json);
    return lexer.getTokenArray();
}