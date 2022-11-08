import * as dayjs from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    toYMDHMS(): string;
    toYMD(): string;
  }
  export function fromYMDHMS(datetime: string): dayjs.Dayjs;
  export function fromYMD(date: string): dayjs.Dayjs;
}

export default (option, dayjsClass, dayjsFactory) => {
  /* 날짜와 시간을 'YYYY-MM-DD HH:mm:ss' 포맷의 문자열로 반환합니다.
   * ex)
   * dayjs().toYMDHMS()                           // 2022-02-05 12:42:50
   */
  dayjsClass.prototype.toYMDHMS = function (): string {
    return this.format('YYYY-MM-DD HH:mm:ss');
  };

  /* 날짜를 'YYYY-MM-DD' 형식의 문자열로 반환합니다.
   * ex)
   * dayjs().toYMD()                              // 2022-02-05
   */
  dayjsClass.prototype.toYMD = function (): string {
    return this.format('YYYY-MM-DD');
  };

  /* 'YYYY-MM-DD HH:mm:ss' 포맷의 문자열을 파싱해서 Dayjs 클래스 인스턴스를 생성합니다.
   * ex)
   * dayjs.fromYMDHMS('2022-02-05 12:42:50');     // 2022-02-05T12:42:50+09:00
   */
  dayjsFactory.fromYMDHMS = function (datetime: string): dayjs.Dayjs {
    return dayjsFactory(datetime, 'YYYY-MM-DD HH:mm:ss', true);
  };

  /* 'YYYY-MM-DD' 포맷의 문자열을 파싱해서 Dayjs 클래스 인스턴스를 생성합니다.
   * ex)
   * dayjs.fromYMD('2022-02-05');                // 2022-02-05T00:00:00+09:00
   */
  dayjsFactory.fromYMD = function (date: string): dayjs.Dayjs {
    return dayjsFactory(date, 'YYYY-MM-DD', true);
  };
};
