import {
  DataGrid as MuiDataGrid,
  DataGridProps,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

export type TDataGridProps = DataGridProps;

const CDataGrid = styled(MuiDataGrid)({
  '.MuiDataGrid-cell:focus': {
    outline: 'none',
  },
});
const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
};

export const DataGrid = ({ ...props }: DataGridProps) => {
  return (
    <CDataGrid
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      components={{ Toolbar: QuickSearchToolbar }}
      {...props}
    />
  );
};
