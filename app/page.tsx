'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.text);
      } else {
        setResponse(`エラー: ${data.error}`);
      }
    } catch (error) {
      setResponse(`エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-zinc-900">
      <main className="w-full max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Gemini API テスト
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              プロンプトを入力
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例: Reactとは何ですか？"
              rows={5}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {loading ? '送信中...' : '送信'}
          </button>
        </form>

        {response && (
          <div className="mt-8">
            <h2 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              レスポンス
            </h2>
            <div className="rounded-lg border border-zinc-300 bg-white p-4 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50">
              <pre className="whitespace-pre-wrap">{response}</pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
