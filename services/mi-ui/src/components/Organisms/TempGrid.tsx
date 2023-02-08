import '@glideapps/glide-data-grid/dist/index.css';
import React, { useCallback, useEffect, useRef, useState, ElementType } from 'react';
import ReactDOM from 'react-dom';
import {
  CellRendererClass,
  CellRenderer,
  CellRendererProps,
} from 'tui-grid/types/renderer';
import 'tui-grid/dist/tui-grid.css';
import useDrivePicker from 'react-google-drive-picker';

import { default as TuiGrid } from '@toast-ui/react-grid';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  Backdrop,
  Input,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemButton as MuiListItemButton,
  Box as MuiBox,
  Checkbox as MuiCheckbox,
  TextField as MuiTextField,
  Button as MuiButton,
} from '@mui/material';
import { Button } from '../Atoms/Button';
import readXlsxFile, { readSheetNames } from 'read-excel-file';

const SheetList = ({
  sheets,
  clickBtn,
}: {
  sheets: TSheets[] | null;
  clickBtn: (boolean) => void;
}) => {
  return (
    <MuiBox
      sx={{
        width: '100%',
        maxWidth: '30%',
        backgroundColor: 'white',
        color: 'black',
        border: 'solid',
        textAlign: 'center',
      }}
    >
      {sheets ? (
        <>
          <MuiList sx={{ maxHeight: 300, overflowY: 'scroll' }}>
            {sheets.map((sheet, i) => (
              <MuiListItem disablePadding key={i} sx={{ borderBottom: 'solid 1px' }}>
                <MuiListItemButton onClick={() => clickBtn(false)}>
                  <MuiCheckbox></MuiCheckbox>
                  <MuiListItemText primary={sheet?.properties?.title || ''} />
                </MuiListItemButton>
              </MuiListItem>
            ))}
          </MuiList>
          <MuiTextField sx={{ width: '80%' }} label="범위"></MuiTextField>
          <Button label={'확인'}></Button>
        </>
      ) : (
        <p>파일을 선택하세요</p>
      )}
    </MuiBox>
  );
};

export const TempGrid = () => {
  const gridRef = useRef();
  const [sheetList, setSheetList] = useState<TSheets[] | null>(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [openPicker, authResponse] = useDrivePicker();

  const changeShwBackdrop = (value: boolean) => {
    setShowBackdrop(value);
  };

  useScript('https://accounts.google.com/gsi/client', () => {
    // window.google.accounts.id.initialize({
    //   client_id:
    //     '583556409780-9liktnp2snin64maga1l7lbsabgmt1ok.apps.googleusercontent.com',
    //   callback: (e) => {
    //     console.log('google', e);
    //   },
    // });
    // window.google.accounts.id.renderButton(googleSignInButton.current, {
    //   width: '250',
    //   type: 'icon',
    //   shape: 'circle',
    // });
  });

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        '583556409780-g87rmfphh1020ivct1cd9sthm6egnres.apps.googleusercontent.com',
      developerKey: 'AIzaSyBWc5vhxKj8Vfq46IVDSR9OK6Yagq6smb0',
      appId: 'nm-prod-global-cw-mi',
      viewId: 'DOCS',
      token: authResponse?.access_token || '',
      // viewMimeTypes: 'application/vnd.google-apps.spreadsheet',
      viewMimeTypes: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      setIncludeFolders: false,
      setSelectFolderEnabled: false,
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: false,
      multiselect: false,
      callbackFunction: async (data) => {
        if (data.action === 'picked') {
          const { id, mimeType } = data.docs[0];

          // window.gapi.client.sheets.spreadsheets
          //   .get({
          //     spreadsheetId: '18ZKPuGT44g2QjTDLnOhdKlsAxfuLPwwZ',
          //     includeGridData: false,
          //   })
          //   .then(({ result }) => {
          //     setSheetList(result.sheets);
          //     setShowBackdrop(true);
          //   });
        }
      },
    });
  };
  const readExcel = async (e) => {
    const { target } = e;
    const file = await readXlsxFile(target.files[0]);
    console.log(file);
    const sheetList = await readSheetNames(target.files[0]);
    console.log(sheetList);
  };
  return (
    <MuiBox>
      <Input type={'file'} onChange={readExcel}></Input>
      <Button label={'googleAPI 테스트'}></Button>
      <MuiButton
        sx={{ height: 'fit-content' }}
        variant="outlined"
        // onClick={() => handleOpenPicker()}
      >
        가져오기
      </MuiButton>
      <SheetList clickBtn={changeShwBackdrop} sheets={sheetList}></SheetList>
      <TuiGrid
        // ref={gridRef}
        data={[
          { id: 1, name: 'Editor' },
          { id: 2, name: 'Grid' },
          { id: 3, name: 'Chart' },
        ]}
        columns={[
          {
            name: 'id',
            header: 'ID',
          },
          { name: 'name', header: 'Name', editor: 'text' },
        ]}
        rowHeight={25}
        bodyHeight={550}
        width={500}
        rowHeaders={['rowNum']}
        showDummyRows={false}
      ></TuiGrid>
    </MuiBox>
  );
};

const useScript = (url, onload) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.onload = onload;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
};

export default useScript;

// import { DataEditor } from '@glideapps/glide-data-grid';
// import {
//   GridColumn,
//   GridCell,
//   GridCellKind,
//   Item,
//   EditableGridCell,
// } from '@glideapps/glide-data-grid';
//
// const columns: GridColumn[] = [
//   { id: 'year', title: '연도', width: 100 },
//   { id: 'halfYear', title: '반기', width: 100 },
//   { id: 'category', title: '카테고리', width: 100 },
//   { id: 'brand', title: '브랜드', width: 100 },
//   { id: 'marketShare', title: '시장 점유율', width: 100 },
// ];
//
// type TDataType = {
//   year: string;
//   halfYear: string;
//   category: string;
//   brand: string;
//   marketShare: number;
// };
// interface IGridData {
//   <T>(data: T): T[];
// }
// export const Grid = (gridData: IGridData) => {
//   const [data, setData] = useState<typeof gridData>(gridData);
//   const getContent = React.useCallback((cell: Item): GridCell => {
//     const [col, row] = cell;
//     const dataRow = data[row];
//     const indexes: (keyof TDataType)[] = [
//       'year',
//       'halfYear',
//       'category',
//       'brand',
//       'marketShare',
//     ];
//     const d = dataRow[indexes[col]];
//     return {
//       kind: GridCellKind.Text,
//       allowOverlay: true,
//       displayData: d.toString(),
//       data: d.toString(),
//     };
//   }, []);
//
//   const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
//     if (newValue.kind !== GridCellKind.Text) {
//       // we only have text cells, might as well just die here.
//       return;
//     }
//
//     const indexes: (keyof TDataType)[] = [
//       'year',
//       'halfYear',
//       'category',
//       'brand',
//       'marketShare',
//     ];
//     const [col, row] = cell;
//     const key = indexes[col];
//
//     data[row][key] = newValue.data;
//   }, []);
//
//   return (
//     <div style={{ width: 'fit-content', height: 500 }}>
//       <DataEditor
//         onCellEdited={onCellEdited}
//         onPaste={true}
//         getCellContent={getContent}
//         columns={columns}
//         rows={data.length}
//       />
//       <div id={'portal'}></div>
//     </div>
//   );
// };
// const mockData: TDataType[] = [
//   { year: '2020', halfYear: '1', category: '정수기', brand: '코웨이', marketShare: 26.8 },
//   { year: '2020', halfYear: '1', category: '정수기', brand: 'LG전자', marketShare: 24.7 },
//   { year: '2020', halfYear: '1', category: '정수기', brand: 'SK매직', marketShare: 14.4 },
//   { year: '2020', halfYear: '1', category: '정수기', brand: '쿠쿠', marketShare: 10.3 },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '정수기',
//     brand: '청호나이스',
//     marketShare: 6.8,
//   },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '정수기',
//     brand: '삼성전자',
//     marketShare: 4.5,
//   },
//   { year: '2020', halfYear: '1', category: '정수기', brand: '웰스', marketShare: 3.8 },
//   { year: '2020', halfYear: '1', category: '정수기', brand: '기타', marketShare: 8.7 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: 'LG전자', marketShare: 27.4 },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '청정기',
//     brand: '삼성전자',
//     marketShare: 16.3,
//   },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '위닉스', marketShare: 12.6 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '코웨이', marketShare: 8.6 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '다이슨', marketShare: 6.0 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '쿠쿠', marketShare: 4.7 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '위니아', marketShare: 4.7 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '샤오미', marketShare: 4.0 },
//   { year: '2020', halfYear: '1', category: '청정기', brand: '기타', marketShare: 15.7 },
//   { year: '2020', halfYear: '1', category: '비데', brand: '노비타', marketShare: 25.0 },
//   { year: '2020', halfYear: '1', category: '비데', brand: '코웨이', marketShare: 22.4 },
//   { year: '2020', halfYear: '1', category: '비데', brand: 'SK매직', marketShare: 10.1 },
//   { year: '2020', halfYear: '1', category: '비데', brand: '블루밍', marketShare: 7.8 },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '비데',
//     brand: '대림통상 도비도스',
//     marketShare: 6.6,
//   },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '비데',
//     brand: '청호 나이스',
//     marketShare: 4.4,
//   },
//   { year: '2020', halfYear: '1', category: '비데', brand: '쿠쿠', marketShare: 4.3 },
//   { year: '2020', halfYear: '1', category: '비데', brand: '기타', marketShare: 19.4 },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '매트리스',
//     brand: '에이스',
//     marketShare: 10.2,
//   },
//   { year: '2020', halfYear: '1', category: '매트리스', brand: '한샘', marketShare: 8.0 },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '매트리스',
//     brand: '시몬스',
//     marketShare: 5.4,
//   },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '매트리스',
//     brand: '코웨이',
//     marketShare: 5.1,
//   },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '매트리스',
//     brand: '에몬스',
//     marketShare: 4.6,
//   },
//   {
//     year: '2020',
//     halfYear: '1',
//     category: '매트리스',
//     brand: '리바트',
//     marketShare: 3.6,
//   },
//   { year: '2022', halfYear: '1', category: '매트리스', brand: '씰리', marketShare: 3.6 },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '매트리스',
//     brand: '일룸 슬로우',
//     marketShare: 3.3,
//   },
//   { year: '2022', halfYear: '1', category: '매트리스', brand: '기타', marketShare: 43.5 },
//   { year: '2022', halfYear: '1', category: '매트리스', brand: '모름', marketShare: 12.7 },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: '바디프랜드',
//     marketShare: 34.0,
//   },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: '세라젬',
//     marketShare: 19.7,
//   },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: '휴테크',
//     marketShare: 16.8,
//   },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: '코지마',
//     marketShare: 9.6,
//   },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: '브람스',
//     marketShare: 5.8,
//   },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: 'LG전자',
//     marketShare: 1.0,
//   },
//   {
//     year: '2022',
//     halfYear: '1',
//     category: '안마의자',
//     brand: '코웨이',
//     marketShare: 0.6,
//   },
//   { year: '2022', halfYear: '1', category: '안마의자', brand: '기타', marketShare: 12.5 },
// ];
type TSheets = {
  properties?: {
    sheetId: number;
    title: string;
    index: number;
    sheetType: string;
    gridProperties: {
      rowCount: number;
      columnCount: number;
    };
  };
};
