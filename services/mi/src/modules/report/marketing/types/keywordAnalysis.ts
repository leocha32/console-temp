import {
  KeywordSearchAnalysis,
  KeywordSearchTrend,
  KeywordSearchVolumeRateRow,
  MarketingKeywordAnalysisResponseDto,
} from '$modules/mi-console-report-api';

export type TMarketingKeywordAnalysisResponseDto = MarketingKeywordAnalysisResponseDto;
export type TKeywordSearchAnalysis = KeywordSearchAnalysis;
export type TKeywordSearchTrend = KeywordSearchTrend;
export type TKeywordSearchVolumeRateRow = KeywordSearchVolumeRateRow;

export interface IKeywordAnalysisRequestParams {
  'product-group': string;
  from: string;
  to: string;
  'from-comp': string;
  'to-comp': string;
}
export interface IKeywordAnalysisDownloadParams {
  'product-group': string;
  to: string;
  criteria?: 'M' | 'D';
}
