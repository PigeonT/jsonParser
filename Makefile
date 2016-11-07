all :
	tsc Lexer.ts Parser.ts --module commonjs -target es2015 && node_modules/mocha/bin/mocha test/LexerTest.js



