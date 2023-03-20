import { createContext, memo, ReactNode } from "react";
import { deepEqualRowData } from "../../utils/deepEqualRowData";


/* 
    This context responsability is 
    to have the data per each row and have small comsumers 
    within the row
*/


type RowDataContextProviderProps = {
  children?: ReactNode;
  rowData: ClientData;
};


type RowDataContextValue = {
  rowData: ClientData;
};

export const RowDataContext = createContext<RowDataContextValue>({} as RowDataContextValue);

export  const RowDataContextProvider = memo(({
  children,
  rowData
}: RowDataContextProviderProps) => {

  const conTextValue = {rowData};
  
  return (
    <RowDataContext.Provider value={conTextValue}>
      {children}
    </RowDataContext.Provider>
  );
},deepEqualRowData);

