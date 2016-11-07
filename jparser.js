(function(){
   'use strict'

   var jsonString = '',
       currentChar = '',
       currentIndex = 0;
       
   function Jparser(json){
       jsonString = json;
       _next();
   } 
          
   function _next(){
        let currentChar = jsonString.shift();
        switch (currentChar) {
            case '{':
                return getObject();
                break;
            case '[':
                return getArray();
            default:
                throw new SyntaxError('expected { or  [, but found {0}'.format(currentChar));
        }
   }
   
   function getObject(){
       
   }
   
   function getArray(){
       
   }
   
   Jparser.prototype.parser = () => {
       
   }
   
   return Jparser;
}());