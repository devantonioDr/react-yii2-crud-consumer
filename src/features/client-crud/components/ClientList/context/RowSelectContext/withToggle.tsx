import { useContext, memo } from "react";
import { RowSelectContext } from "./context";
import { RowDataContext } from "../RowDataProviderContext";

export function withToggle<P extends object>(
  Component: React.ComponentType<P>
) {
  const PureComponent: any = memo(Component);

  return function WithToggle(props: P) {

    const { toggleSelectedRow } = useContext(RowSelectContext);

    return (
      <PureComponent
        {...props}
        onClick={toggleSelectedRow}
      />
    );
  };
};