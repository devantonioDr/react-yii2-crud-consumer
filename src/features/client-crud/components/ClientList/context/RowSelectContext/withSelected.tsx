import { useContext, memo } from "react";
import { RowSelectContext } from "./context";
import { RowDataContext } from "../RowDataProviderContext";

export function withtSelected<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return function WithtSelected(props: P) {
    const { rowData } = useContext(RowDataContext);
    // console.log("WithtSelected",rowData)
    const { selectedRows } = useContext(RowSelectContext);
    // Check if the current invoice id is present in the list of selected rows.
    // selected = true if present.
    const selected = selectedRows.indexOf(rowData.id) > -1;

    return (
      <PureComponent
        {...props}
        selected={selected}
        id={rowData.id}
      />
    );
  };
};