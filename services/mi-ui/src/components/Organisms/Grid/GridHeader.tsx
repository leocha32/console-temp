import { GridFilter } from './GridFilter';
import { Table as ReactTable, flexRender, TableOptions } from '@tanstack/react-table';
import { TableCell, TableHead, TableRow } from '@mui/material';

export type THeaderOptions = {
  onHeaderClick: (column: any) => void;
};

export const GridHeader = ({ table }: { table: ReactTable<any> }) => {
  return (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableCell key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanFilter() ? (
                      <div>
                        <GridFilter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
};
