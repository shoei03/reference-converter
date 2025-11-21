/**
 * 参考文献フォーマット機能の型定義
 */

/**
 * Gemini API リクエストの型
 */
export interface GeminiRequest {
  prompt: string;
}

/**
 * Gemini API レスポンスの型
 */
export interface GeminiResponse {
  text: string;
}

/**
 * 参考文献フォーマットの種類
 */
export type ReferenceFormatType = 'APA' | 'MLA' | 'Chicago' | 'IEEE' | 'Japanese' | 'auto';

/**
 * フォーマットの表示名マッピング
 */
export const FORMAT_DISPLAY_NAMES: Record<ReferenceFormatType, string> = {
  auto: '自動判定',
  APA: 'APA (American Psychological Association)',
  MLA: 'MLA (Modern Language Association)',
  Chicago: 'Chicago Manual of Style',
  IEEE: 'IEEE (Institute of Electrical and Electronics Engineers)',
  Japanese: '日本の標準学術形式',
};
