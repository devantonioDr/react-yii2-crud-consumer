import { useContext,memo } from "react";
import { RowSelectContext } from "./context";
import { RowDataContext } from "../RowDataProviderContext";

export function withSelectRowCheckBox<P extends object>(
    Component: React.ComponentType<P>
  ) {
    const PureComponent: any = memo(Component);
  
    return function WithContextSelectRowCheckBox(props: P & { invoiceId: string }) {
      const {rowData} = useContext(RowDataContext);
      const {toggleSelectedRow,selectedRows} = useContext(RowSelectContext);
      // Check if the current invoice id is present in the list of selected rows.
      // selected = true if present.
      const selected = selectedRows.indexOf(rowData.id) > -1;
  
      return (
        <PureComponent
          {...props}
          selected={selected}
          onClick={toggleSelectedRow}
          id={rowData.id}
        />
      );
    };
  };