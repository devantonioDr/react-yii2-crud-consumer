import { createContext } from "react";
import useResponsiveLayout from "../components/ClientList/hooks/useResponsiveRow";
import { TemplateMode } from "../types/Template";

/**
 * This context is responsible for enabling 
 * notification of the layout mode for screen resize responsiveness.
*/

interface ResponsiveLayoutContextValue {
    mode: TemplateMode;
}

export const ResponsiveLayoutContext = createContext<ResponsiveLayoutContextValue>(
    {} as ResponsiveLayoutContextValue
);

export const ResponsiveLayoutContextProvider = (props: any) => {


    // Responsive layout hook.
    const mode = useResponsiveLayout();

    const contextValue: ResponsiveLayoutContextValue = {
        mode,
    };
    return (
        <ResponsiveLayoutContext.Provider value={contextValue}>
            {props.children}
        </ResponsiveLayoutContext.Provider>
    );
};
