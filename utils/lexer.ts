// utils/lexer.ts

export type Token = {
    value: string;
    type: string;
  };
  
  export type ExtendedToken = {
    token: string; // symbolic name
    lexeme: string; // actual text
    type: string; // explanation
  };
  
  export function simpleLexer(code: string): Token[] {
    const keywords = ['int', 'float', 'if', 'else', 'return', 'for', 'while'];
    const operators = ['+', '-', '*', '/', '=', '==', '!=', '>', '<', '>=', '<='];
    const symbols = ['(', ')', '{', '}', ';', ','];
    const tokens: Token[] = [];
  
    const lines = code.split('\n');
  
    for (const line of lines) {
      const parts = line.trim().split(/\s+|(?=[{}();,+\-*/=<>])/).filter(Boolean);
  
      for (const part of parts) {
        if (keywords.includes(part)) {
          tokens.push({ value: part, type: 'Keyword' });
        } else if (operators.includes(part)) {
          tokens.push({ value: part, type: 'Operator' });
        } else if (symbols.includes(part)) {
          tokens.push({ value: part, type: 'Symbol' });
        } else if (/^[0-9]+$/.test(part)) {
          tokens.push({ value: part, type: 'Number' });
        } else if (/^[a-zA-Z_]\w*$/.test(part)) {
          tokens.push({ value: part, type: 'Identifier' });
        } else {
          tokens.push({ value: part, type: 'Unknown' });
        }
      }
    }
  
    return tokens;
  }
  
  export function arithmeticLexer(code: string): ExtendedToken[] | string {
    if (code.length > 100) {
      return 'Expression too long';
    }
  
    const tokens: ExtendedToken[] = [];
    const operators = ['+', '-', '*', '/', '='];
    const symbols = ['(', ')', ';'];
  
    const parts = code.trim().split(/\s+|(?=[()+\-*/=;])|(?<=[()+\-*/=;])/).filter(Boolean);
  
    for (const part of parts) {
      if (/^[a-zA-Z_]\w*$/.test(part)) {
        tokens.push({ token: 'IDENTIFIER', lexeme: part, type: 'Variable or Identifier' });
      } else if (/^[0-9]+(\.[0-9]+)?$/.test(part)) {
        tokens.push({ token: 'NUMBER', lexeme: part, type: 'Numeric Literal' });
      } else if (operators.includes(part)) {
        tokens.push({ token: 'OPERATOR', lexeme: part, type: getOperatorType(part) });
      } else if (symbols.includes(part)) {
        tokens.push({ token: 'SYMBOL', lexeme: part, type: getSymbolType(part) });
      } else {
        tokens.push({ token: 'UNKNOWN', lexeme: part, type: 'Unrecognized token' });
      }
    }
  
    return tokens;
  }
  
  function getOperatorType(op: string): string {
    switch (op) {
      case '=': return 'Assignment Operator';
      case '+': return 'Addition Operator';
      case '-': return 'Subtraction Operator';
      case '*': return 'Multiplication Operator';
      case '/': return 'Division Operator';
      default: return 'Unknown Operator';
    }
  }
  
  function getSymbolType(sym: string): string {
    switch (sym) {
      case '(': return 'Left Parenthesis';
      case ')': return 'Right Parenthesis';
      case ';': return 'Semicolon';
      default: return 'Unknown Symbol';
    }
  }
  