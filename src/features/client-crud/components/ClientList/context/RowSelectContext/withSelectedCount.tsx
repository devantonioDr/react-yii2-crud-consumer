import React, { memo, useContext } from "react";
import { RowSelectContext } from "./context";

// This one cares about the checked elements count only.
export function withSelectedCount<P extends object>(
    Component: React.ComponentType<P>
  ) {
    const PureComponent: any = memo(Component);
  
    return function WithSelectedCount(props: P) {
      const rowSelectContext = useContext(RowSelectContext);
  
      return (
        <PureComponent
        {...props}
        selectedCount={rowSelectContext.selectedCount}
        />
      );
    };
  };