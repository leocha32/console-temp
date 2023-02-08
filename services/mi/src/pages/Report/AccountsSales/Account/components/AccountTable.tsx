import { useEffect, useState } from 'react';
import { CardTitle } from '$pages/Report/commonStyled';
import { Table, TColumnProps, TRowData, IColumn, TRowProps } from 'mi-ui';
import { groupBy } from 'lodash';
import { TMonthlyAccountStatusRow } from '$modules/report/accountSales';
import { Card as CommonCard } from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
const Card = styled(CommonCard)`
  min-height: auto;
`;
const productGroupOrderStandard = [
  '정수기',
  '청정기',
  '비데',
  '연수기',
  '매트리스',
  '안마의자',
  '전기레인지',
  '의류청정기',
  '기타',
];

type TAccountTable = {
  data: TMonthlyAccountStatusRow[] | undefined;
  searchInfo: { selectList: boolean[]; date: Date };
};

const createHeader = (monthList: object[], selectList: boolean[]) => {
  if (!monthList) return [];

  const [familyAllCheck, functionalAllCheck, productAllCheck] = selectList;
  const headerList: IColumn[] = [
    {
      name: '구분',
      sx: {
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
    },
  ];
  const groupByYear = groupBy(monthList, 'year');
  for (const year of Object.keys(groupByYear)) {
    headerList.push({
      name: year + '년',
      columns: groupByYear[year].map((obj) => {
        return {
          name: obj['month'] + '월',
          header: obj['month'] + '월',
          sx: {
            backgroundColor: 'aliceblue',
            textAlign: 'right' as const,
            paddingTop: 0,
            paddingBottom: 0,
            border: '1px solid rgba(224, 224, 224, 1) ',
          },
        };
      }),
      sx: {
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
    });
  }

  if (!familyAllCheck && functionalAllCheck && productAllCheck) {
    headerList[0].colSpan = 2;
  } else if (!productAllCheck || (!familyAllCheck && !functionalAllCheck)) {
    headerList[0].colSpan = 3;
  }
  return headerList;
};

const createColumn = (monthList: { year: string; month: string }[]) => {
  const columnList: TColumnProps[] = [
    {
      name: 'rowHeader',
      options: {
        sx: {
          backgroundColor: 'aliceblue',
          border: '1px solid rgba(224, 224, 224, 1) ',
        },
      },
    },
  ];
  monthList.forEach(({ year, month }) => {
    columnList.push({
      name: year + month,
      options: {
        textFormat: (value) => value.toLocaleString('ko-KR'),
        sx: {
          textAlign: 'right',
          border: '1px solid rgba(224, 224, 224, 1) ',
        },
      },
    });
  });
  return columnList;
};

const createRowData = (
  { data: originData, searchInfo }: TAccountTable,
  monthList: { year: string; month: string }[],
) => {
  if (!originData) return [];
  const { selectList } = searchInfo;
  const [familyAllCheck, functionalAllCheck, productAllCheck] = selectList;
  // 제품군 정렬
  const groupByProductGroupData = groupBy(originData, 'productGroup');

  if (!familyAllCheck && functionalAllCheck && productAllCheck) {
    // 제품군만 선택했을 경우 (제품군/기능군 Group By 제품 별 카운트 )
    return groupByFunctionalGroup(groupByProductGroupData, originData, monthList);
  } else if (!productAllCheck || (!familyAllCheck && !functionalAllCheck)) {
    //제품 선택 했을 경우 or 제품군,기능군 선택했을경우(제품군/기능군별 카운트)
    return groupByProduct(groupByProductGroupData, originData, monthList);
  } else if (familyAllCheck && functionalAllCheck && productAllCheck) {
    //모두 다 전체선택일 경우(제품군별 카운트)
    return groupByProductGroup(groupByProductGroupData, originData, monthList);
  }

  return [];
};

const groupByProductGroup = (groupByProductGroupData, originData, monthList) => {
  const keys = Object.keys(groupByProductGroupData);
  const orderedName = productGroupOrderStandard.filter((prodName) =>
    keys.find((key) => key === prodName),
  );

  const summaryData = monthList.map(({ year, month }) => {
    return {
      value: 0,
      name: year + month,
      colName: year + month,
    };
  });

  const data: TRowProps[] = orderedName.map((name) => {
    const productData = originData.filter((data) => data.productGroup === name);
    return {
      name: name,
      label: name,
      colName: 'rowHeader',
      data: monthList.map(({ year, month }) => {
        const { count } = productData.find(
          ({ yearMonth }) => yearMonth === year + month,
        ) || { count: 0 };
        summaryData.find((ps) => ps.name === year + month)!.value += count;
        return {
          value: count === 0 ? '-' : count,
          colName: year + month,
        };
      }),
    };
  });

  data.push({
    name: '합계',
    label: '합계',
    data: summaryData,
    options: {
      fontWeight: 'bold',
    },
  });

  return data;
};

const groupByFunctionalGroup = (groupByProductGroupData, originData, monthList) => {
  const keys = Object.keys(groupByProductGroupData);
  const totalSum = monthList.map(({ year, month }) => {
    return {
      value: 0,
      name: year + month,
      colName: year + month,
    };
  });
  const data: TRowProps[] = productGroupOrderStandard
    .filter((prodName) => keys.find((key) => key === prodName))
    .map((prodName) => {
      const summaryData = monthList.map(({ year, month }) => {
        return {
          value: 0,
          name: year + month,
          colName: year + month,
          options: {
            fontWeight: 'bold',
          },
        };
      });
      const functionalGroup = Object.entries(
        groupBy(groupByProductGroupData[prodName], 'functionalGroup'),
      ).map(([name, data]) => {
        const dataList: TRowData[] = monthList.map(({ year, month }) => {
          const monthData = data.find(({ yearMonth }) => yearMonth === year + month);
          if (monthData) {
            summaryData.find((ps) => ps.name === year + month)!.value += monthData.count;
            totalSum.find((ps) => ps.name === year + month)!.value += monthData.count;
            return {
              name: monthData.functionalGroup,
              label: monthData.functionalGroup,
              colName: monthData.yearMonth,
              value: monthData.count,
            };
          } else {
            return {
              colName: year + month,
              value: '-',
              label: data[0].functionalGroup,
              name: data[0].functionalGroup,
            };
          }
        });
        dataList.unshift({
          colName: 'rowHeader',
          value: name,
        });
        return dataList;
      });
      summaryData.unshift({
        value: '합계',
        colName: 'rowHeader',
        options: {
          colSpan: 1,
          fontWeight: 'bold',
        },
      });
      let showSummary = false;
      if (functionalGroup.length > 1 && keys.length > 1) {
        showSummary = true;
        functionalGroup.push(summaryData);
      }
      return {
        name: prodName,
        label: prodName,
        options: {
          rowSpan: showSummary ? functionalGroup.length : functionalGroup.length,
        },
        data: functionalGroup.length === 1 ? functionalGroup[0] : functionalGroup,
      };
    });
  data.push({
    name: '합계',
    label: '합계',
    data: totalSum,
    options: {
      colSpan: 2,
      fontWeight: 'bold',
    },
  });
  return data;
};

const groupByProduct = (groupByProductGroupData, originData, monthList) => {
  const keys = Object.keys(groupByProductGroupData);
  const orderedName = productGroupOrderStandard.filter((prodName) =>
    keys.find((key) => key === prodName),
  );
  const totalSum = monthList.map(({ year, month }) => {
    return {
      value: 0,
      name: year + month,
      colName: year + month,
      sx: {
        fontWeight: 'bold',
      },
    };
  });

  const data: any[] = orderedName.map((prodName) => {
    const test = Object.entries(
      groupBy(groupByProductGroupData[prodName], 'functionalGroup'),
    )
      .map(([functionalKey, functionalData]: [string, TMonthlyAccountStatusRow[]]) => {
        const productData = groupBy(functionalData, 'product');
        const summaryData = monthList.map(({ year, month }) => {
          return {
            value: 0,
            name: year + month,
            colName: year + month,
            options: {
              fontWeight: 'bold',
            },
          };
        });
        const productGroupList: any[] = Object.entries(productData).map(
          ([productKey, productDataList]: [string, TMonthlyAccountStatusRow[]]) => {
            const dataList: TRowData[] = monthList.map(({ year, month }) => {
              const monthData = productDataList.find(
                ({ yearMonth }) => yearMonth === year + month,
              );
              if (monthData) {
                summaryData.find((ps) => ps.name === year + month)!.value +=
                  monthData.count;
                totalSum.find((ps) => ps.name === year + month)!.value += monthData.count;

                return {
                  name: monthData.functionalGroup,
                  label: monthData.functionalGroup,
                  colName: monthData.yearMonth,
                  value: monthData.count,
                };
              } else {
                return {
                  colName: year + month,
                  value: '-',
                  label: productDataList[0].product,
                  name: productDataList[0].product,
                };
              }
            });
            dataList.unshift({
              colName: 'rowHeader',
              value: productKey,
            });
            return dataList;
          },
        );
        if (productGroupList.length > 1) {
          productGroupList.push(summaryData);
        }

        summaryData.unshift({
          value: '합계',
          colName: 'rowHeader',
          options: { colSpan: 1, fontWeight: 'bold' },
        });

        productGroupList.unshift([
          {
            colName: 'rowHeader',
            value: functionalKey,
            options: {
              rowSpan: productGroupList.length + 1,
            },
          },
        ]);
        return productGroupList;
      })
      .flat();
    return {
      data: test,
      label: prodName,
      name: prodName,
      options: {
        rowSpan: test.length,
        colSpan: 1,
      },
    };
  });

  data.push({
    name: '합계',
    label: '합계',
    data: totalSum,
    options: {
      rowSpan: 1,
      colSpan: 3,
      fontWeight: 'bold',
    },
  });
  return data;
};

export const AccountTable = ({ data, searchInfo }: TAccountTable) => {
  const [rowDataState, setRowDataState] = useState<any[]>([]);
  const [headerState, setHeaderState] = useState<{ name: string }[]>([]);
  const [columnState, setColumnState] = useState<any[]>([]);

  useEffect(() => {
    const { selectList, date } = searchInfo;

    const monthList: { year: string; month: string }[] = [];
    for (let i = 12; i >= 0; i--) {
      const month = dayjs(date).subtract(i, 'month');
      monthList.push({
        year: `${month.format('YYYY')}`,
        month: `${month.format('MM')}`,
      });
    }

    const headers = createHeader(monthList, selectList);
    setHeaderState(headers);
    setColumnState(createColumn(monthList));
    setRowDataState(createRowData({ data, searchInfo }, monthList));
  }, [data]);

  return (
    <Card>
      <CardTitle>계정 지표</CardTitle>
      <div>
        <p
          css={css`
            margin: 0;
            text-align: right;
          `}
        >
          (단위 : 계정)
        </p>
        <Table
          rows={rowDataState}
          columns={columnState}
          showHeader={true}
          headers={headerState}
        ></Table>
      </div>
    </Card>
  );
};
