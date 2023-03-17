import React, { useEffect, useState } from "react";
import ClientService  from "../../../services/ClientService";
import { RowSelectContextProvider } from "./RowSelectContext";
import { RowShowMoreContextProvider } from "./RowShowMoreContext";

export type RepairListContextValue = {
  repairs: ClientData[];
  fetchNewRepairs: () => any;
};
export const RepairListContext = React.createContext<RepairListContextValue>(
  {} as RepairListContextValue
);

export const RepairListContextProvider = (props: any) => {
  const [repairs, setRepairs] = useState<ClientData[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchNewRepairs = async () => {
    try {
      const result = await ClientService.get('client') as any;
      setRepairs([...result?.data]);
    } catch (error:any) {
      console.log(error.message);
      setHasError(true);
    }
    // return fetch("./api/repairs").then(async (data) => {
    //   let json = await data.json();
      
    // });
  };

  useEffect(() => {
    fetchNewRepairs();
  }, []);

  const contextValue: RepairListContextValue = {
    repairs,
    fetchNewRepairs,
  };

  return (
    <RepairListContext.Provider value={contextValue}>
      
        <RowShowMoreContextProvider>
          <RowSelectContextProvider>{props.children}</RowSelectContextProvider>
        </RowShowMoreContextProvider>
      
    </RepairListContext.Provider>
  );
};
