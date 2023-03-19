
import { useContext,memo } from "react";
import { RowSelectContext } from "./context";
import { RowDataContext } from "../RowDataProviderContext";

// This one cares whether or not the current row is selected.

export default function withSelected<P extends object>(Component: React.ComponentType<P>) {
    const PureComponent: any = memo(Component);
  
    return function WithSelected(props: P & { children: any }) {

      const { rowData: { id } } = useContext(RowDataContext);
      const { selectedRows } = useContext(RowSelectContext);
  
      const selected = selectedRows.indexOf(id) !== -1;

      return (
        <PureComponent {...props} selected={selected}>
          {props.children}
        </PureComponent>
      );
    };
  };