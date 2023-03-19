import React, { memo, useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { RepairListContext } from "..";
import { InmutableArrayMethods } from "../../../../helper/inmutableArrayMethods";
import { RowDataContext } from "../RowDataProviderContext";

export type RowSelectContextValue = {
  totalRowsCount: number,
  selectedCount: number;
  selectedRows: any;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSelectedRow: (invoiceId: string) => void;
};

export const RowSelectContext = createContext<RowSelectContextValue>(
  {} as RowSelectContextValue
);

export function RowSelectContextProvider(props: any) {
  const tableContext = useContext(RepairListContext);

  const [selectedRows, setSelectedRows] = useState<string[] | number[]>([]);

  //   Recreate only if table context repairs changes.
  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedRows(() => {
        if (event.target.checked) {
          const newSelecteds = tableContext.repairs.map((n) => n.id);
          return newSelecteds;
        }
        return [];
      });
    },
    [tableContext.repairs]
  );

  //   useCallback on this fucnmtion to only expose a single
  //   refrence during the component lifecycle.
  const toggleSelectedRow = useCallback((invoiceId: any) => {
    setSelectedRows((selectedRows) => {

      const selectedIndex = selectedRows.indexOf(invoiceId as never);
      // If selectedIndex is in the array.
      if (selectedIndex >= 0) {
        // Removes the value at given index.
        return [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1)
        ];
      };
      // Adds value
      return [
        ...selectedRows,
        invoiceId
      ];

    });
  }, []);

  // Count the amount of selected rows.
  const selectedCount = selectedRows.length;

  const conTextValue: RowSelectContextValue = {
    totalRowsCount: tableContext.repairs.length,
    selectedCount,
    selectedRows,
    handleSelectAll,
    toggleSelectedRow,
  };

  return (
    <RowSelectContext.Provider value={conTextValue}>
      {props.children}
    </RowSelectContext.Provider>
  );
}

// Consumer Wrappers.
// Here i specifyed the types of cosumers of this RowSelectContext.


// This one cares about the handleSelectAll function,
// the total rows count, 
// if rows are partially selected 
// if all rows are selected.




