'use client';

import { useState } from 'react';
import { AlertCircle, Check, Copy, Github, Loader2 } from 'lucide-react';
import { createReferenceFormattingPrompt } from '@/lib/prompts';
import { FORMAT_DISPLAY_NAMES, type ReferenceFormatType } from '@/lib/types';

export default function Home() {
  const [referenceInput, setReferenceInput] = useState('');
  const [formattedReference, setFormattedReference] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<ReferenceFormatType>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!referenceInput.trim()) return;

    setIsLoading(true);
    setFormattedReference('');
    setError(null);

    try {
      const prompt = createReferenceFormattingPrompt(referenceInput, selectedFormat);

      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormattedReference(data.text);
      } else {
        setError(data.error || '整形に失敗しました');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!formattedReference) return;

    try {
      await navigator.clipboard.writeText(formattedReference);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setError('クリップボードへのコピーに失敗しました');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-indigo-50 to-blue-100">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-blue-900">
                Ref-Linter
                <span className="ml-2 text-sm font-medium text-blue-600">(Beta)</span>
              </h1>
            </div>
            <a
              href="https://github.com/shoei03/reference-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-blue-900 sm:text-5xl">
              卒論の参考文献、まだ手書きしてるの？
            </h2>
            <p className="text-lg text-blue-700 sm:text-xl">
              AIが大学指定フォーマットに一瞬で整形します。コピペするだけ。
            </p>
          </div>

          {/* Main Tool Card */}
          <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xl sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Area */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Input */}
                <div className="space-y-3">
                  <label htmlFor="reference-input" className="block text-sm font-semibold text-blue-900">
                    参考文献を入力
                  </label>
                  <textarea
                    id="reference-input"
                    value={referenceInput}
                    onChange={(e) => setReferenceInput(e.target.value)}
                    placeholder="ここに汚い参考文献を貼り付けてください...&#10;&#10;例:&#10;山田太郎、機械学習入門、技術評論社、2020年、150-165ページ&#10;https://example.com/article&#10;John Doe, 2019, Introduction to AI"
                    rows={12}
                    className="w-full rounded-lg border border-blue-300 bg-blue-50/50 px-4 py-3 text-blue-900 placeholder-blue-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Right: Output */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reference-output" className="block text-sm font-semibold text-blue-900">
                      整形結果
                    </label>
                    {formattedReference && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-4 w-4" />
                            コピーしました！
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            コピー
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <textarea
                    id="reference-output"
                    value={formattedReference}
                    readOnly
                    placeholder="整形された参考文献がここに表示されます..."
                    rows={12}
                    className="w-full rounded-lg border border-blue-300 bg-blue-50/50 px-4 py-3 text-blue-900 placeholder-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Format Selection & Submit Button */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label htmlFor="format-select" className="mb-2 block text-sm font-semibold text-blue-900">
                    フォーマット選択
                  </label>
                  <select
                    id="format-select"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value as ReferenceFormatType)}
                    className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 text-blue-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {(Object.keys(FORMAT_DISPLAY_NAMES) as ReferenceFormatType[]).map((format) => (
                      <option key={format} value={format}>
                        {FORMAT_DISPLAY_NAMES[format]}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !referenceInput.trim()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-indigo-600 sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      整形中...
                    </>
                  ) : (
                    '整形する'
                  )}
                </button>
              </div>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">エラーが発生しました</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-8 rounded-xl bg-white/60 p-6 backdrop-blur-sm">
            <h3 className="mb-3 font-semibold text-blue-900">使い方のヒント</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• 著者名、タイトル、出版年などが含まれていれば、どんな形式でもOKです</li>
              <li>• 複数の参考文献を一度に整形する場合は、改行で区切って入力してください</li>
              <li>• URLをそのまま貼り付けても、自動でフォーマットしてくれます</li>
              <li>• フォーマット選択で「自動判定」を選ぶと、最適な形式を提案してくれます</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-blue-600">© 2025 Shoei YOSHIDA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
