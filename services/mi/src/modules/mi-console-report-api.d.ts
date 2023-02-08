/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.36.1070 on 2023-02-08 12:53:16.

export interface ResearchBrandAwarenessResponseDto {
  /**
   * 브랜드 인지도
   */
  brandAwareness: BrandAwareness;
}

export interface ResearchMarketShareResponseDto {
  /**
   * 시장 점유율
   */
  marketShare: MarketShare;
}

export interface ResearchSalesVolumeResponseDto {
  /**
   * 시판 판매량
   */
  salesVolume: SalesVolume;
}

export interface ResearchSummaryResponseDto {
  /**
   * 시장 점유율 요약
   */
  marketShareSummary: MarketShareSummary;
  /**
   * 시판 판매량 요약
   */
  salesVolumeSummary: SalesVolumeSummary;
  /**
   * 브랜드 점유율 요약
   */
  brandAwarenessSummary: BrandAwarenessSummary;
}

export interface ResearchSelectableItemResponseDto {
  /**
   * 선택 가능한 기간
   */
  researchSelectableItems: ResearchSelectableItem[];
}

export interface UserListResponseDto {
  /**
   * 사용자
   */
  users: User[];
}

export interface UserRequestDto {
  /**
   * 사용자 정보
   */
  user: User;
}

export interface UserResponseDto {
  /**
   * 유저 정보
   */
  user: User;
  /**
   * 결과
   */
  result: boolean;
  /**
   * 결과 메시지
   */
  message: string;
}

export interface CategoryRequestDto {
  /**
   * 카테고리 목록
   */
  categories: Category[];
  /**
   * 제품 상세 목록
   */
  productDetails: ProductDetail[];
}

export interface CategoryResponseDto {
  /**
   * 카테고리 목록
   */
  categories: Category[];
  /**
   * 제품 상세 목록
   */
  productDetails: ProductDetail[];
}

export interface CategorySummaryResponseDto {
  /**
   * 카테고리 목록
   */
  categories: CategorySummary[];
}

export interface ResearchUploadDataRequestDto {
  /**
   * 연간 판매량 데이터
   */
  annualSalesInput: ResearchAnnualSalesInput[];
  /**
   * 브랜드 인지도 데이터
   */
  brandAwarenessInput: ResearchBrandAwarenessInput[];
  /**
   * 연간 판매량 기준 시장 점유율 데이터
   */
  marketShareBySalesInput: ResearchMarketShareBySalesInput[];
  /**
   * 시장 점유율
   */
  marketShareInput: ResearchMarketShareInput[];
  /**
   * 제품 보급률 데이터
   */
  productPenetrationInput: ResearchProductPenetrationInput[];
}

export interface ResearchUploadDataResponseDto {
  /**
   * 영향 받은 행 수
   */
  affectedRows: number;
  /**
   * 연간 판매량
   */
  annualSalesInput: ResearchAnnualSalesInput[];
  /**
   * 브랜드 인지도
   */
  brandAwarenessInput: ResearchBrandAwarenessInput[];
  /**
   * 판매량 / 매출액 기준 시장 점유율
   */
  marketShareBySales: ResearchMarketShareBySalesInput[];
  /**
   * 시장 점유율
   */
  marketShare: ResearchMarketShareInput[];
  /**
   * 제품 보급률
   */
  productPenetration: ResearchProductPenetrationInput[];
}

export interface ResearchUploadReportFileUrlResponseDto {
  /**
   * File Url
   */
  fileUrl: string;
}

export interface SearchKeywordMetaRequestDto {
  /**
   * 검색 키워드 목록
   */
  searchKeywordMetas: SearchKeywordMeta[];
}

export interface SearchKeywordMetaResponseDto {
  /**
   * 영향 받은 행 수
   */
  affectedRows: number;
  /**
   * 검색 키워드 목록
   */
  searchKeywordMetas: SearchKeywordMeta[];
}

export interface BrandUploadDataRequestDto {
  /**
   * 마케팅 비용
   */
  brandMarketingCostInputs: BrandMarketingCostInput[];
  /**
   * ATL 퍼포먼스
   */
  brandATLPerformanceInputs: BrandATLPerformanceInput[];
  /**
   * ATL 제품 별 퍼포먼스
   */
  brandATLPerformanceByProductInputs: BrandATLPerformanceByProductInput[];
  /**
   * ATL 경쟁사 별 퍼포먼스
   */
  brandATLPerformanceByCompetitorInputs: BrandATLPerformanceByCompetitorInput[];
  /**
   * ATL 광고 링크
   */
  brandATLAdsLinkInputs: BrandATLAdsLinkInput[];
}

export interface BrandUploadDataResponseDto {
  /**
   * 영향 받은 행 수
   */
  affectedRows: number;
  /**
   * 마케팅 비용
   */
  brandMarketingCostInputs: BrandMarketingCostInput[];
  /**
   * ATL 퍼포먼스
   */
  brandATLPerformanceInputs: BrandATLPerformanceInput[];
  /**
   * ATL 제품 별 퍼포먼스
   */
  brandATLPerformanceByProductInputs: BrandATLPerformanceByProductInput[];
  /**
   * ATL 경쟁사 별 퍼포먼스
   */
  brandATLPerformanceByCompetitorInputs: BrandATLPerformanceByCompetitorInput[];
  /**
   * ATL 광고 링크
   */
  brandATLAdsLinkInputs: BrandATLAdsLinkInput[];
}

export interface AccountDetailsResponseDto {
  /**
   * 계정 상세 데이터
   */
  accountDetails: AccountDetails;
}

export interface AccountCombinationDetailsResponseDto {
  /**
   * 계정 보유 조합 상세
   */
  accountCombinationDetails: AccountCombinationDetails;
}

export interface AccountStatusResponseDto {
  /**
   * 계정 수
   */
  accountStatus: AccountStatus;
  /**
   * 렌탈 지표
   */
  rentalIndicator: RentalIndicator;
}

export interface AccountCombinationResponseDto {
  /**
   * 계정 보유 조합
   */
  accountCombination: AccountCombination;
}

export interface AccountSummaryDto {}

export interface AccountOwnershipResponseDto {}

export interface MarketingCostAndEfficiencyStatusResponseDto {
  /**
   * 마케팅 비용 현황
   */
  marketingCostStatus: MarketingCostStatus;
  /**
   * 마케팅 효율
   */
  marketingEfficiencyStatus: MarketingEfficiencyStatus;
}

export interface MarketingATLResponseDto {
  /**
   * ATL 매체비 현황
   */
  atlMediaCostStatus: ATLMediaCostStatus;
  /**
   * ATL 매체 퍼포먼스
   */
  atlMediaPerformanceStatus: ATLMediaPerformanceStatus;
  /**
   * 마케팅 비용 현황
   */
  atlMediaCostByCompanyStatus: ATLMediaCostByCompanyStatus;
}

export interface MarketingKeywordAnalysisResponseDto {
  /**
   * 키워드 검색 분석
   */
  keywordSearchAnalysis: KeywordSearchAnalysis;
  /**
   * 검색량 및 비중 트렌드
   */
  keywordSearchTrend: KeywordSearchTrend;
}

export interface MarketingDigitalCampaignPerformanceResponseDto {
  /**
   * 디지털 캠페인 온라인 실적
   */
  marketingDigitalCampaignPerformance: MarketingDigitalCampaignPerformance;
}

export interface MarketingDigitalCampaignStatusResponseDto {
  /**
   * 마케팅 | 디지털 캠페인 | 현황
   */
  marketingDigitalCampaignStatus: MarketingDigitalCampaignStatus;
}

export interface BrandAwareness {
  description: string;
  /**
   * 코웨이 브랜드 인지도
   */
  cowayBrandAwareness: CowayBrandAwareness[];
  /**
   * 주요 브랜드 인지도
   */
  majorBrandAwareness: MajorBrandAwareness[];
  /**
   * 리포트 파일
   */
  researchReportFileUrl: ResearchReportFileUrl;
}

export interface MarketShare {
  description: string;
  /**
   * 코웨이 시장 점유율
   */
  cowayMarketShare: CowayMarketShare[];
  /**
   * 타 브랜드 와의 비교
   */
  competitorComparison: CompetitorComparison[];
  /**
   * 주요 브랜드 시장 점유율 (반기별)
   */
  majorBrandMarketShare: MajorBrandMarketShare[];
  /**
   * 제품 보급률
   */
  productPenetration: ProductPenetration[];
  /**
   * 리포트 파일
   */
  researchReportFileUrl: ResearchReportFileUrl;
}

export interface SalesVolume {
  description: string;
  /**
   * 시장 규모
   */
  marketSpread: MarketSpread[];
  /**
   * 브랜드 점유율 (판매량 기준 / 매출액 기준)
   */
  marketShareByBrand: MarketShareByBrand[];
  /**
   * 리포트 파일
   */
  researchReportFileUrl: ResearchReportFileUrl;
}

export interface MarketShareSummary {
  description: string;
  /**
   * 코웨이 시장 점유율
   */
  cowayMarketShare: CowayMarketShareSummary[];
  /**
   * 제품 보급률
   */
  productPenetration: ProductPenetrationSummary[];
  /**
   * 시장 점유율 랭킹
   */
  marketShareRank: MarketShareRankSummary[];
  /**
   * 보고서 파일
   */
  researchReportFileUrl: ResearchReportFileUrl;
}

export interface SalesVolumeSummary {
  description: string;
  /**
   * 코웨이 판매량 및 매출액
   */
  cowaySales: CowaySummary[];
  /**
   * 브랜드 점유율 및 순위
   */
  brandShareRank: BrandShareRankSummary[];
  /**
   * 보고서 파일
   */
  researchReportFileUrl: ResearchReportFileUrl;
}

export interface BrandAwarenessSummary {
  description: string;
  /**
   * 코웨이 브랜드 인지도
   */
  cowayBrandAwareness: CowayBrandAwarenessSummary[];
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: TopOfMindRankSummary[];
  /**
   * 보고서 파일
   */
  researchReportFileUrl: ResearchReportFileUrl;
}

export interface ResearchSelectableItem {
  /**
   * 리포트 인덱스
   */
  reportIndex: string;
  /**
   * 리포트 타이틀
   */
  reportTitle: string;
  /**
   * 기간
   */
  item: string;
}

export interface User {
  /**
   * 이름
   */
  name: string;
  /**
   * 사용자 계정
   */
  email: string;
  /**
   * 사번
   */
  employeeId: string;
  /**
   * 부서
   */
  department: string;
  /**
   * 부서 아이디
   */
  departmentId: string;
  /**
   * 회사
   */
  company: string;
  /**
   * 전화 번호1
   */
  phone1: string;
  /**
   * 전화 번호2
   */
  phone2: string;
  /**
   * 권한: ADMIN, MANAGER, USER
   */
  role: string;
  /**
   * 접근 가능 URI, 콤마로 구분
   */
  accessibleUri: string;
  /**
   * 업데이트 날짜
   */
  updatedDateTime: string;
}

export interface Category {
  /**
   * 정렬 순서
   */
  seqNum: number;
  /**
   * category1, 제품 | 제품외
   */
  category1: string;
  /**
   * category2, 제품의 경우 제품군, 제품 외의 경우 서비스 혹은 브랜드
   */
  category2: string;
  /**
   * 제품의 경우 제품 이름, 제품 외의 경우 서비스 명 혹은 브랜드 (기업 PR)
   */
  category3: string;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface ProductDetail {
  /**
   * 제품 코드
   */
  goodsCd: string;
  /**
   * 제품 이름
   */
  goodsNm: string;
  /**
   * 제품군 (MI용)
   */
  productGroup: string;
  /**
   * 기능군 (MI용)
   */
  functionalGroup: string;
  /**
   * 제품 이름 (MI용)
   */
  product: string;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface CategorySummary extends Category {
  /**
   * 제품의 경우 기능군, 제품 외의 경우는 NULL
   */
  functionalGroup: string;
}

export interface ResearchAnnualSalesInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연간 판매량
   */
  annualSalesVolume: number;
  /**
   * 연간 매출액
   */
  annualSalesValue: number;
}

export interface ResearchBrandAwarenessInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
}

export interface ResearchMarketShareBySalesInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 판매량 기준 시장 점유율
   */
  marketShareBySalesVolume: number;
  /**
   * 매출액 기준 시장 점유율
   */
  marketShareBySalesValue: number;
}

export interface ResearchMarketShareInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 시장 점유율
   */
  marketShare: number;
}

export interface ResearchProductPenetrationInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품 보급률
   */
  productPenetration: number;
}

export interface SearchKeywordMeta {
  /**
   * 인덱스
   */
  idx: number;
  /**
   * 카테고리
   */
  category: string;
  /**
   * 그룹
   */
  group: string;
  /**
   * 회사
   */
  competitor: string;
  /**
   * 키워드
   */
  keyword: string;
  /**
   * 시드 데이터 연월
   */
  initYearMonth: string;
  /**
   * 시드 데이터 검색량
   */
  initSearchCount: number;
  /**
   * 마지막 수행 시간
   */
  lastProcessedDateTime: string;
  /**
   * 마지막 저장된 검색 날짜
   */
  lastSavedDate: string;
  /**
   * 마지막 저장된 검색 카운트
   */
  lastSavedSearchCount: number;
  /**
   * 삭제 여부
   */
  deletedYn: string;
  /**
   * 메타 변경 식간
   */
  updatedDateTime: string;
}

export interface BrandMarketingCostInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품
   */
  product: string;
  /**
   * 매체
   */
  media: string;
  /**
   * 마케팅 비용
   */
  cost: number;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface BrandATLPerformanceInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품
   */
  product: string;
  /**
   * 매체
   */
  media: string;
  /**
   * 채널1
   */
  channel1: string;
  /**
   * 채널2
   */
  channel2: string;
  /**
   * 채널3
   */
  channel3: string;
  /**
   * 횟수
   */
  count: number;
  /**
   * 당월 누적 GRP
   */
  grp: number;
  /**
   * 광고비(천원)
   */
  cost: number;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface BrandATLPerformanceByProductInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품
   */
  product: string;
  /**
   * R3
   */
  r3: number;
  /**
   * 제품 누적 GRP
   */
  grp: number;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface BrandATLPerformanceByCompetitorInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 카테고리
   */
  category1: string;
  /**
   * 카테고리 가 제품 일 경우 제품군, 제품 외일 경우 브랜드
   */
  category2: string;
  /**
   * 경쟁사 이름
   */
  company: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 매체
   */
  media: string;
  /**
   * 광고비
   */
  cost: number;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface BrandATLAdsLinkInput {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 카테고리
   */
  category: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 경쟁사
   */
  company: string;
  /**
   * 영상 타이틀
   */
  adTitle: string;
  /**
   * 링크
   */
  adUrl: string;
  /**
   * 업데이트 시간
   */
  updatedDateTime: string;
}

export interface AccountDetails {
  /**
   * 계정 상세 데이터 (다운로드)
   */
  accountDetailsRows: AccountDetailsRow[];
}

export interface AccountCombinationDetails {
  /**
   * 계정 및 판매 | 계정 보유 조합 | 상세 데이터 (다운로드)
   */
  accountCombinationDetailsRows: AccountCombinationDetailsRow[];
}

export interface AccountStatus {
  /**
   * 월별/제품군/기능군/제품 별 계정 수
   */
  monthlyAccountStatusRows: MonthlyAccountStatusRow[];
}

export interface RentalIndicator {
  /**
   * 월별 렌탈 지표
   */
  monthlyRentalIndicatorRows: MonthlyRentalIndicatorRow[];
  /**
   * 렌탈 지표 평균
   */
  rentalIndicatorAverage: RentalIndicatorRow;
}

export interface AccountCombination {
  /**
   * 계정 보유 조합 (2,3,4 계정)
   */
  productCombinationRows: ProductCombinationRow[];
}

export interface MarketingCostStatus {
  /**
   * 마케팅 비용 (전체)
   */
  marketingCosts: MarketingCostByMedia[];
  /**
   * 제품군 별 마케팅 비용
   */
  marketingCostBySelectedItems: MarketingCostBySelectedItem[];
  /**
   * 월별 마케팅 비용
   */
  marketingCostByMonths: MarketingCostByMonth[];
  /**
   * 전년 동월, 전월 비교
   */
  marketingCostCompare: MarketingCostCompare;
}

export interface MarketingEfficiencyStatus {
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 전체
   */
  marketingEfficiency: MarketingEfficiency;
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 제품군 별
   */
  marketingEfficiencyByProductGroups: MarketingEfficiencyByCategory[];
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 제품 별
   */
  marketingEfficiencyByProducts: MarketingEfficiencyByCategory[];
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 전월, 전년 동월 비교
   */
  marketingEfficiencyCompares: MarketingEfficiencyCompare[];
  /**
   * 마케팅 효율 | CPP 및 PLT 매출 대비 비중 | 월 별
   */
  marketingEfficiencyByMonths: MarketingEfficiencyByMonth[];
}

export interface ATLMediaCostStatus {
  /**
   * 월별 매체별 광고비
   */
  monthlyCostByMedia: MonthlyCostByMedia[];
  /**
   * 월별 제품군 별 광고비
   */
  monthlyCostByProductGroup: MonthlyCostByProductGroup[];
  /**
   * 회사별 광고비 비중
   */
  shareByCompanies: ShareByCompany[];
}

export interface ATLMediaPerformanceStatus {
  /**
   * R3 & 제품 누적 GRP
   */
  r3grp: R3Grp;
  /**
   * 매체 별 광고 퍼포먼스
   */
  performanceByMedia: PerformanceByMedia[];
}

export interface ATLMediaCostByCompanyStatus {
  /**
   * 월별 매체별 광고비
   */
  mediaCostByCompanies: MediaCostByCompany[];
}

export interface KeywordSearchAnalysis {
  /**
   * 카테고리 검색량
   */
  categorySearchVolume: CategorySearchVolume;
  /**
   * 코웨이 검색 비중 대비 경쟁사
   */
  cowayCategorySearchRate: CategorySearchRate;
}

export interface KeywordSearchTrend {
  /**
   * 검색량 및 비중 트렌드 (월별)
   */
  keywordSearchMonthlyTrends: KeywordSearchVolumeRateRow[];
  /**
   * 검색량 및 비중 트렌드 (일별)
   */
  keywordSearchDailyTrends: KeywordSearchVolumeRateRow[];
}

export interface MarketingDigitalCampaignPerformance {
  /**
   * 온라인 실적 (카드)
   */
  onlinePerformance: OnlinePerformance;
  /**
   * 판매 채널 별 실적 추이 (일)
   */
  trendInSalesByChannelDaily: TrendInSalesByChannelRow[];
  /**
   * 판매 채널 별 실적 추이 (월)
   */
  trendInSalesByChannelMonthly: TrendInSalesByChannelRow[];
  /**
   * 광고비 X 판매 실적 추이 (일)
   */
  trendInSalesAdsCostDaily: TrendInSalesAdsCostRow[];
  /**
   * 광고비 X 판매 실적 추이 (월)
   */
  trendInSalesAdsCostMonthly: TrendInSalesAdsCostRow[];
  /**
   * nCPP X eROAS 추이 (일)
   */
  trendInEroasNcppDaily: TrendInEroasNcppRow[];
  /**
   * nCPP X eROAS 추이 (월)
   */
  trendInEroasNcppMonthly: TrendInEroasNcppRow[];
}

export interface MarketingDigitalCampaignStatus {
  /**
   * 현황 카드
   */
  paidAdsStatus: PaidAdsStatus;
  /**
   * 광고 별 비중
   */
  ratioByAdsTypeRows: RatioByAdsTypeRow[];
  /**
   * UV x 전환 퍼널
   */
  funnelByAttributeTypeRows: FunnelByAttributeTypeRow[];
  /**
   * 매체 및 지면 상세
   */
  mediaSourceDetailRows: MediaSourceDetailRow[];
}

export interface CowayBrandAwareness {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 직전 반기 최초 상기도
   */
  topOfMindHoh: number;
  /**
   * 직전 반기 최초 상기도 차이
   */
  topOfMindHohDiff: number;
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 직전 반기 비보조 인지도
   */
  unaidedAwarenessHoh: number;
  /**
   * 직전 반기 비보조 인지도 차이
   */
  unaidedAwarenessHohDiff: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
  /**
   * 직전 반기 보조 인지도
   */
  aidedAwarenessHoh: number;
  /**
   * 직전 반기 보조 인지도 차이
   */
  aidedAwarenessHohDiff: number;
}

export interface MajorBrandAwareness {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 년도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
}

export interface ResearchReportFileUrl {
  /**
   * 연도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 리포트 종류
   */
  category: string;
  /**
   * 파일 URL
   */
  fileUrl: string;
  /**
   * 타임 스탬프
   */
  updatedTimestamp: number;
}

export interface CowayMarketShare {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 전년 동기 시장 점유율
   */
  marketShareYoyValue: number;
  /**
   * 전년 동기 대비 차이
   */
  yoyDiff: number;
}

export interface CompetitorComparison {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 시장 점유율 격차
   */
  gapWithCoway: number;
  /**
   * 시장 점유율 순위
   */
  marketShareRank: number;
}

export interface MajorBrandMarketShare {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 년도
   */
  year: string;
  /**
   * 반기
   */
  half: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 시장 점유율 순위
   */
  marketShareRank: number;
}

export interface ProductPenetration {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품 보급률
   */
  productPenetrationValue: number;
}

export interface MarketSpread {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연간 판매량
   */
  annualSalesVolume: number;
  /**
   * 연간 매출액
   */
  annualSalesValue: number;
  /**
   * 전년 핀매량
   */
  salesVolumeYoy: number;
  /**
   * 전년 대비 핀매량 증가율
   */
  salesVolumeYoyDiff: number;
  /**
   * 전년 매출액
   */
  salesValueYoy: number;
  /**
   * 전년 대비 매출액 증가율
   */
  salesValueYoyDiff: number;
}

export interface MarketShareByBrand {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연도
   */
  year: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 판매량 기준 시장 점유율
   */
  marketShareBySalesVolume: number;
  /**
   * 매출액 기준 시장 점유율
   */
  marketShareBySalesValue: number;
}

export interface CowayMarketShareSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 당사 시장 점유율
   */
  marketShareValue: number;
  /**
   * 시장 점유율 순위
   */
  marketShareRank: number;
  /**
   * 당사 비교 시장 점유율
   */
  marketShareHohValue: number;
  /**
   * 당사 직전 반기 대비 차이
   */
  hohDiff: number;
}

export interface ProductPenetrationSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 제품 보급률
   */
  productPenetrationValue: number;
}

export interface MarketShareRankSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 시장 점유율
   */
  marketShareValue: number;
  /**
   * 점유율 순위
   */
  marketShareRank: number;
}

export interface CowaySummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 연간 판매량
   */
  salesVolume: number;
  /**
   * 연간 매출액
   */
  salesValue: number;
}

export interface BrandShareRankSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드 점유율 (판매량 기준)
   */
  msBySalesVolume: number;
  /**
   * 브랜드 점유율 (판매량 기준) 순위
   */
  msBySalesVolumeRank: number;
  /**
   * 브랜드 점유율 (매출액 기준)
   */
  msBySalesValue: number;
  /**
   * 브랜드 점유율 (매출액 기준) 순위
   */
  msBySalesValueRank: number;
}

export interface CowayBrandAwarenessSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: number;
  /**
   * 비보조 인지도
   */
  unaidedAwareness: number;
  /**
   * 보조 인지도
   */
  aidedAwareness: number;
}

export interface TopOfMindRankSummary {
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 브랜드
   */
  brand: string;
  /**
   * 최초 상기도
   */
  topOfMind: number;
  /**
   * 최초 상기도 순위
   */
  topOfMindRank: number;
}

export interface AccountDetailsRow {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 고객타입
   */
  customerType: string;
  /**
   * 계약방식
   */
  contractType: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 기능군
   */
  functionGroup: string;
  /**
   * 제품
   */
  product: string;
  /**
   * 제품코드
   */
  productCode: string;
  /**
   * 제품코드 이름
   */
  productCodeName: string;
  /**
   * 약정기간
   */
  contractPeriod: string;
  /**
   * 고객 수
   */
  customerCount: number;
  /**
   * 평균 연령
   */
  averageAge: number;
  /**
   * 계정 수
   */
  accountCount: number;
  /**
   * 계정 해약률
   */
  cancelRate: number;
}

export interface AccountCombinationDetailsRow {
  /**
   * 연도
   */
  year: string;
  /**
   * 월
   */
  month: string;
  /**
   * 고객 타입
   */
  customerType: string;
  /**
   * 계정 수 그룹
   */
  accountCountGroup: string;
  /**
   * 고객 수
   */
  customerCount: number;
  /**
   * 정수기 수
   */
  cnt001: number;
  /**
   * 청정기 수
   */
  cnt002: number;
  /**
   * 비데 수
   */
  cnt003: number;
  /**
   * 매트리스 수
   */
  cnt004: number;
  /**
   * 전기레인지 수
   */
  cnt005: number;
  /**
   * 연수기 수
   */
  cnt006: number;
  /**
   * 의류청정기 수
   */
  cnt007: number;
  /**
   * 안마의자 수
   */
  cnt008: number;
  /**
   * 기타
   */
  cnt009: number;
}

export interface MonthlyAccountStatusRow {
  /**
   * 연도/월
   */
  yearMonth: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 기능군
   */
  functionalGroup: string;
  /**
   * 제품
   */
  product: string;
  /**
   * 계정 수
   */
  count: number;
}

export interface MonthlyRentalIndicatorRow {
  /**
   * 연도/월
   */
  yearMonth: string;
  /**
   * 값
   */
  rentalIndicatorRow: RentalIndicatorRow;
}

export interface RentalIndicatorRow {
  /**
   * 계정 해약률 (%)
   */
  cancelRate: number;
}

export interface ProductCombinationRow {
  /**
   * 순번
   */
  order: number;
  /**
   * 계정 조합 수 그룹
   */
  accountCountGroup: string;
  /**
   * 제품 1
   */
  product1: string;
  /**
   * 제품 2
   */
  product2: string;
  /**
   * 제품 3
   */
  product3: string;
  /**
   * 제품 4
   */
  product4: string;
  /**
   * 고객 수
   */
  customerCount: number;
  /**
   * 비율
   */
  customerRate: number;
}

export interface MarketingCostByMedia {
  /**
   * 매체
   */
  media: string;
  /**
   * 비용
   */
  cost: number;
}

export interface MarketingCostBySelectedItem extends MarketingCostByMedia {
  /**
   * 선택된 항목
   */
  selectedItem: string;
}

export interface MarketingCostByMonth extends MarketingCostByMedia {
  /**
   * 년월
   */
  yearMonth: string;
}

export interface MarketingCostCompare {
  /**
   * 전월 대비
   */
  mom: number;
  /**
   * 전년 동월 대비
   */
  yoy: number;
}

export interface MarketingEfficiency {
  /**
   * 마케팅 빙용
   */
  cpp: number;
  /**
   * PLT 매출 대비 비중
   */
  percentOfSales: number;
}

export interface MarketingEfficiencyByCategory extends MarketingEfficiency {
  /**
   * 카테고리
   */
  category: string;
}

export interface MarketingEfficiencyCompare {
  /**
   * 타이틀
   */
  title: string;
  /**
   * 전월 대비
   */
  mom: number;
  /**
   * 전년 동월 대비
   */
  yoy: number;
}

export interface MarketingEfficiencyByMonth extends MarketingEfficiency {
  /**
   * 년월
   */
  yearMonth: string;
}

export interface MonthlyCostByMedia {
  /**
   * 년월
   */
  yearMonth: string;
  /**
   * 매체
   */
  media: string;
  /**
   * 광고비
   */
  cost: number;
}

export interface MonthlyCostByProductGroup {
  /**
   * 년월
   */
  yearMonth: string;
  /**
   * 제품군
   */
  productGroup: string;
  /**
   * 광고비
   */
  cost: number;
}

export interface ShareByCompany {
  /**
   * 회사
   */
  company: string;
  /**
   * 비중
   */
  shareValue: number;
}

export interface R3Grp {
  /**
   * R3: Reach 3+, 광고에 3번 이상 노출된 타겟 시청자 비율
   */
  r3: number;
  /**
   * 제품 누적 GRP: Gross Rating Points, 일정 기간 동안 광고 캠페인 누적 시청률
   */
  grp: number;
}

export interface PerformanceByMedia {
  /**
   * 정렬 순서
   */
  seqNum: number;
  /**
   * 매체
   */
  media: string;
  /**
   * 채널
   */
  channel: string;
  /**
   * 광고비
   */
  cost: number;
  /**
   * 광고 횟수
   */
  ads: number;
  /**
   * 당월 누적 GRP
   */
  grp: number;
  /**
   * CPRP: Cost Per Rating Point, 시청률 1% 를 올리기 위한 매체 비용
   */
  cprp: number;
}

export interface MediaCostByCompany {
  /**
   * 회사
   */
  company: string;
  /**
   * 매체 비용 합
   */
  sum: number;
  /**
   * 지상파
   */
  ttv: number;
  /**
   * 케이블 및 종편
   */
  ctv: number;
  /**
   * 광고 제목
   */
  adTitle: string;
  /**
   * 광고 링크
   */
  adUrl: string;
}

export interface CategorySearchVolume {
  /**
   * 검색량
   */
  searchVolume: number;
  /**
   * 비교 기간 검색량
   */
  searchVolumeComp: number;
  /**
   * 비교 차 (비율)
   */
  compDiffRate: number;
  /**
   * 검색량(코웨이)
   */
  searchVolumeCoway: number;
  /**
   * 비교 기간 검색량(코웨이)
   */
  searchVolumeCompCoway: number;
  /**
   * 비교 차 (코웨이)
   */
  compDiffRateCoway: number;
}

export interface CategorySearchRate {
  /**
   * 검색 비중
   */
  searchRate: number;
  /**
   * 비교 기간 검색 비중
   */
  searchRateComp: number;
  /**
   * 비교 차
   */
  compDiffRate: number;
}

export interface KeywordSearchVolumeRateRow {
  /**
   * 월별: yyyyMM, 일별: yyyyMMdd
   */
  date: string;
  /**
   * 회사
   */
  company: string;
  /**
   * 검색량
   */
  searchVolume: number;
  /**
   * 검색 비중
   */
  searchRate: number;
}

export interface OnlinePerformance {
  /**
   * 신청 수
   */
  clicks: number;
  /**
   * 신청 수 (비교)
   */
  clicksComp: number;
  /**
   * 신청 수 차이
   */
  clicksDiff: number;
  /**
   * 주문 수
   */
  orders: number;
  /**
   * 주문 수 (비교)
   */
  ordersComp: number;
  /**
   * 주문 수 차이
   */
  ordersDiff: number;
  /**
   * 광고비
   */
  adsCost: number;
  /**
   * 광고비 (비교)
   */
  adsCostComp: number;
  /**
   * 광고비 차이
   */
  adsCostDiff: number;
  /**
   * nCPP
   */
  ncpp: number;
  /**
   * nCPP (비교)
   */
  ncppComp: number;
  /**
   * nCPP 차이
   */
  ncppDiff: number;
  /**
   * eROAS
   */
  eroas: number;
  /**
   * eROAS 차이
   */
  eroasDiff: number;
}

export interface TrendInSalesByChannelRow {
  /**
   * 날짜
   */
  date: string;
  /**
   * 채널
   */
  channel: string;
  /**
   * 주문량
   */
  orderVolume: number;
}

export interface TrendInSalesAdsCostRow {
  /**
   * 날짜
   */
  date: string;
  /**
   * 주문량
   */
  orderVolume: number;
  /**
   * 광고비
   */
  adsCost: number;
}

export interface TrendInEroasNcppRow {
  /**
   * 날짜
   */
  date: string;
  /**
   * nCPP
   */
  ncpp: number;
  /**
   * eROAS
   */
  eroas: number;
}

export interface PaidAdsStatus {
  /**
   * 노출 수
   */
  impressions: number;
  /**
   * 노출 수 (비교)
   */
  impressionComp: number;
  /**
   * 노출 수 차이
   */
  impressionDiff: number;
  /**
   * 클릭 수
   */
  clicks: number;
  /**
   * 클릭 수 (비교)
   */
  clicksComp: number;
  /**
   * 클릭 수 차이
   */
  clicksDiff: number;
  /**
   * Click-Through Rate
   */
  ctr: number;
  /**
   * ctr (비교)
   */
  ctrComp: number;
  /**
   * ctr 차이
   */
  ctrDiff: number;
  /**
   * Cost Per Click
   */
  cpc: number;
  /**
   * cpc (비교)
   */
  cpcComp: number;
  /**
   * cpc 차이
   */
  cpcDiff: number;
}

export interface RatioByAdsTypeRow {
  /**
   * 광고 타입: DA, SA, VA
   */
  adsType: string;
  /**
   * 광고비
   */
  adsCost: number;
  /**
   * 광고비 비중
   */
  adsCostRate: number;
  /**
   * 유입 수
   */
  attributes: number;
  /**
   * 유입 비중
   */
  attributesRate: number;
  /**
   * 신청 건수
   */
  requests: number;
  /**
   * 신청 건수 비중
   */
  requestsRate: number;
  /**
   * 완료 건수
   */
  completes: number;
  /**
   * 완료 건수 비중
   */
  completesRate: number;
}

export interface FunnelByAttributeTypeRow {
  /**
   * 유입 타입: Paid, Organic
   */
  attributesType: string;
  /**
   * 유입 수
   */
  attributes: number;
  /**
   * 유입 비중
   */
  attributesRate: number;
  /**
   * 신청 건수
   */
  requests: number;
  /**
   * 신청 비중
   */
  requestsRate: number;
  /**
   * 완료 건수
   */
  completes: number;
  /**
   * 완료 비중
   */
  completesRate: number;
}

export interface MediaSourceDetailRow {
  /**
   * 광고 타입: DA(Display Ads),  VA (Video Ads), SA (Search Ads)
   */
  adsType: string;
  /**
   * 매체: 구글, 네이버, 카카오 등
   */
  media: string;
  /**
   * 지면: 매체 별 광고 지면
   */
  source: string;
  /**
   * 광고비
   */
  adCost: number;
  /**
   * 광고 노출 수
   */
  impressions: number;
  /**
   * 광고 클릭 수
   */
  clicks: number;
  /**
   * 광고 뷰 수
   */
  views: number;
  /**
   * [GA] 유입 수
   */
  attributes: number;
  /**
   * [GA] 신청 수 (서비스, 주문)
   */
  requests: number;
  /**
   * [GA] 완료 수 (주문)
   */
  completes: number;
}
