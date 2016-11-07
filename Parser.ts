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
        this.__build();
    }
    
    private __build() : void {
        let cursor : Rule;
        this.next();
        cursor = this.__currentRule;
        switch(cursor.getId()) {
            case TOKEN.LBRACE: 
                this.next();
                this.jsonObject = this.getObject();
                break;
            default :
                throw new Error();
        }               
    }

    private next() : void {
        this.__currentRule = this.tokens[this.__index];
        this.__index += 1;
    }

    private getObject() : Object {
        let obj : Object = {};
        switch(this.__currentRule.getId()) {
            case TOKEN.QUOTE :
                do {
                    Object.        
                }

            default:
                throw new SyntaxError('not valid json string');
        }
        return {};
    }

}

function init(json : string) : Array<Rule>{
    let lexer = new Lexer(json);
    return lexer.getTokenArray();
}