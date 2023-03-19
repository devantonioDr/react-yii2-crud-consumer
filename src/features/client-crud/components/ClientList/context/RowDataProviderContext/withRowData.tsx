
import { useContext, memo } from "react";
import { deepEqualRowData } from "../../utils/deepEqualRowData";
import { RowDataContext } from "../RowDataProviderContext";

// This one cares whether or not the current row is selected.

export default function withRowData<P extends object>(Component: React.ComponentType<P>) {
    
    const PureComponent: any = memo(Component,deepEqualRowData);

    return function WithSelected(props: P & { children: any }) {

        const { rowData } = useContext(RowDataContext);

        return (
            <PureComponent {...props} rowData={rowData} />
        );
    };
};