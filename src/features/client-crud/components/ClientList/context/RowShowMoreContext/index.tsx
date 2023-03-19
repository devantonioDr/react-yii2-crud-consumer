import {
  createContext,
  useCallback,
  useState,
} from "react";

type RowShowMoreContextProviderProps = {
  children?: any;
};

type RowShowMoreContextValue = {
  expanded: number | string;
  setExpanded: any;
  toggleExpanded: (invoiceId: number) => void;
};

// Context.
export const RowShowMoreContext = createContext<RowShowMoreContextValue>(
  {} as RowShowMoreContextValue
);

// Context Provider for ShowMore button of the table row.
export function RowShowMoreContextProvider({
  children,
}: RowShowMoreContextProviderProps) {
  const [expanded, setExpanded] = useState<number | string>("");

  const toggleExpanded = useCallback((id: number) => {
    setExpanded((expanded) => {
      // If current is the one expanded.
      if (expanded == id) {
        return "";
      }
      // Set expanded value.
      return id;
    });
  }, []);

  const contextValue: RowShowMoreContextValue = {
    expanded,
    setExpanded,
    toggleExpanded,
  };

  return (
    <RowShowMoreContext.Provider value={contextValue}>
      {children}
    </RowShowMoreContext.Provider>
  );
}

// Consumers wrapper with hook.
// Wraps components to be used with the context.

