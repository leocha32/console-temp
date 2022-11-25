export interface IResearchSelectableItemResponseDto {
  /**
   * 선택 가능한 기간
   */
  researchSelectableItems: IResearchSelectableItem[];
}
export interface IResearchSelectableItem {
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
