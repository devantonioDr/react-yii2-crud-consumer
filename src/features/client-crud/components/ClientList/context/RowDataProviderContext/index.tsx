import { createContext, ReactNode } from "react";


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

export function RowDataContextProvider({
  children,
  rowData
}: RowDataContextProviderProps) {

  const conTextValue = {rowData};

  return (
    <RowDataContext.Provider value={conTextValue}>
      {children}
    </RowDataContext.Provider>
  );
};

