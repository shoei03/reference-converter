/**
 * 参考文献フォーマット用プロンプトテンプレート
 */

import type { ReferenceFormatType } from './types';

/**
 * 参考文献を適切なフォーマットに整形するためのプロンプトを生成
 * @param referenceText ユーザーが入力した参考文献情報
 * @param format 希望するフォーマット（デフォルト: 'auto'）
 * @returns Gemini APIに送信するプロンプト
 */
export function createReferenceFormattingPrompt(
  referenceText: string,
  format: ReferenceFormatType = 'auto'
): string {
  const formatInstructions = getFormatInstructions(format);

  return `あなたは学術論文の参考文献を整形する専門家です。

以下の参考文献情報を解析し、指定されたフォーマットで正しく整形してください。

【入力された参考文献情報】
${referenceText}

${formatInstructions}

【指示】
1. 入力された情報から、著者名、タイトル、出版年、出版社、ページ数などを抽出してください
2. 文献の種類（書籍、論文、ウェブサイトなど）を判定してください
3. 指定されたフォーマットに従って正確に整形してください
4. 整形された参考文献のみを出力してください（余計な説明は不要）

※情報が不足している場合は、その旨を指摘してください。`;
}

/**
 * フォーマット別の詳細指示を生成
 */
function getFormatInstructions(format: ReferenceFormatType): string {
  switch (format) {
    case 'APA':
      return `【希望フォーマット】
APA (American Psychological Association) 第7版
- 書籍: 著者名. (出版年). 書籍名 (版数). 出版社.
- 論文: 著者名. (出版年). 論文タイトル. 雑誌名, 巻(号), ページ範囲.`;

    case 'MLA':
      return `【希望フォーマット】
MLA (Modern Language Association) 第9版
- 書籍: 著者名. 書籍名. 版数, 出版社, 出版年.
- 論文: 著者名. "論文タイトル." 雑誌名, vol. 巻, no. 号, 出版年, pp. ページ範囲.`;

    case 'Chicago':
      return `【希望フォーマット】
Chicago Manual of Style (Notes and Bibliography)
- 書籍: 著者名. 書籍名. 出版地: 出版社, 出版年.
- 論文: 著者名. "論文タイトル." 雑誌名 巻, no. 号 (出版年): ページ範囲.`;

    case 'IEEE':
      return `【希望フォーマット】
IEEE (Institute of Electrical and Electronics Engineers)
- 書籍: [番号] 著者名, 書籍名, 版数. 出版地: 出版社, 出版年.
- 論文: [番号] 著者名, "論文タイトル," 雑誌名, vol. 巻, no. 号, pp. ページ範囲, 出版年.`;

    case 'Japanese':
      return `【希望フォーマット】
日本の標準学術形式
- 書籍: 著者名『書籍名』出版社, 出版年, ページ範囲.
- 論文: 著者名「論文タイトル」『雑誌名』巻号, 出版年, ページ範囲.
- Web: 著者名「タイトル」サイト名, URL (閲覧日: YYYY年MM月DD日).`;

    default:
      return `【希望フォーマット】
自動判定: 最も適切な学術フォーマット（APA、MLA、Chicago、IEEE、日本の標準学術形式など）を自動で判定し、そのフォーマット名を明記してください。

出力形式:
フォーマット: [判定したフォーマット名]

[整形された参考文献]`;
  }
}
