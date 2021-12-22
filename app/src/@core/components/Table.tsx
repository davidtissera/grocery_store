export type IColumn = {
  name: string;
  header: string;
  Cell?: (cellValue: any) => React.ReactNode;
};

export interface ITable {
  rows: Record<string, string | number>[];
  columns: IColumn[];
}

export default function Table(props: ITable) {
  const { columns, rows } = props;

  if (columns.length === 0 || rows.length === 0) {
    return null;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => {
            return (
              <th scope="col" role="columnheader" key={column.name}>
                {column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => {
          return (
            <tr role="row" key={`row-${idx}`}>
              {columns.map((column) => {
                const cellValue = row[column.name];
                return (
                  <td role="cell" key={`${column.name}-${cellValue}`}>
                    {column.Cell ? column.Cell(cellValue) : cellValue}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
