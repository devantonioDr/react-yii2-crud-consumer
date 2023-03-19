import { useContext,memo } from "react";
import { RowSelectContext } from "./context";

export function withContextSelectAllCheckbox<P extends object>(Component: React.ComponentType<P>) {
    const PureComponent: any = memo(Component);
  
    return function WithContextSelectAllCheckbox(props: { indeterminate: boolean, checked: boolean, onChange: Function } & P)  {
      const rowSelectionContext = useContext(RowSelectContext);
      const selectedCount = rowSelectionContext.selectedRows.length;
      const rowsCount = rowSelectionContext.totalRowsCount;
  
      const areRowsPartiallySelected =
        selectedCount > 0 && selectedCount < rowsCount;
      const areAllRowsSelected = rowsCount > 0 && rowsCount == selectedCount;
  
      return (
        <PureComponent
          {...props}
          indeterminate={areRowsPartiallySelected}
          checked={areAllRowsSelected}
          onChange={(e: any) => {
            rowSelectionContext.handleSelectAll(e);
          }}
        />
      );
    };
  };
  