'use client';

import { useState } from 'react';
import { simpleLexer, arithmeticLexer, Token, ExtendedToken } from '@/utils/lexer';

export default function LexicalAnalyzerPage() {
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<'code' | 'arithmetic'>('code');
  const [tokens, setTokens] = useState<(Token | ExtendedToken)[]>([]);
  const [error, setError] = useState('');

  const analyze = () => {
    setError('');
    if (mode === 'code') {
      const result = simpleLexer(code);
      setTokens(result);
    } else {
      const result = arithmeticLexer(code);
      if (typeof result === 'string') {
        setTokens([]);
        setError(result);
      } else {
        setTokens(result);
      }
    }
  };

  const loadDemo = () => {
    if (mode === 'code') {
      setCode(`int a = 5;\nfloat b = a + 10;`);
    } else {
      setCode(`(a + 10) * (b - 3) / 2;`);
    }
  };

  return (
    <div className=" bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Lexical Analyzer</h1>

      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Mode:</label>
        <select
          className="p-2 border rounded"
          value={mode}
          onChange={(e) => setMode(e.target.value as 'code' | 'arithmetic')}
        >
          <option value="code">General Code</option>
          <option value="arithmetic">Arithmetic Expression</option>
        </select>

        <button
          className="bg-green-600 text-sm px-3 py-1 text-white lg:px-4 lg:py-1 rounded hover:bg-green-700"
          onClick={loadDemo}
        >
          Load Demo
        </button>
      </div>

      <textarea
        className="w-full h-48 p-4 border border-gray-300 rounded mb-4 font-mono"
        placeholder="Enter your code or expression here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={analyze}
      >
        Analyze
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {tokens.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Tokens:</h2>
          <table className="w-full border border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Token</th>
                <th className="border p-2">{mode === 'code' ? 'Value' : 'Lexeme'}</th>
                <th className="border p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td className="border p-2">{'token' in token ? token.token : token.type}</td>
                  <td className="border p-2">{'lexeme' in token ? token.lexeme : token.value}</td>
                  <td className="border p-2">{token.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
