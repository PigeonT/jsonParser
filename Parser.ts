import {Lexer, Rule, TOKEN} from './Lexer';

export class Parser {
    private json : string;
    private tokens : Array<Rule>;
    private __index : number = 0;
    private jsonObject : Object;
    private __currentRule : Rule;

    constructor(json : string) {
        this.json = json;
        this.tokens = init(json);
    }

    public parse() : Object {
        return this.__parseValue();
    }

    private __parseValue() : Object {
        let cursor : Rule;
        this.__next();
        cursor = this.__currentRule;
        switch(cursor.getId()) {
            case TOKEN.LBRACE: 
                this.__next();
                return this.__getObject();
            default :
                throw new SyntaxError('json parse exception');
        }               
    }

    private __next() : void {
        this.__currentRule = this.tokens[this.__index];
        this.__index += 1; 
    }

//TODO 
    private __getObject() : Object {
        let obj : Object = {};
        switch(this.__currentRule.getId()) {
            case TOKEN.QUOTE :{
                let key = this.__parseString();
                this.__accept(TOKEN.SEMICOLON);
                Object.defineProperty(obj, key, {
                    value : this.__parseValue()
                });
                this.__next();
                return obj;
            }
            default:
                throw new SyntaxError('not valid json string');
        }
    }

    private __parseString() : string {
        return null;
    }

    private __accept(token : TOKEN) {

    }

}

function init(json : string) : Array<Rule>{
    let lexer = new Lexer(json);
    return lexer.getTokenArray();
}