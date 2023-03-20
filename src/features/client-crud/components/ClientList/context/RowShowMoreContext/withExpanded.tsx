import {
    memo,
    useContext,
} from "react";

import { RowShowMoreContext } from ".";
import { RowDataContext } from "../RowDataProviderContext";



type WithExpandedProps = {
    isExpanded?: boolean;
    onClick?: Function;
    id: string | number;
};


export function withExpanded<P extends object>(
    Component: React.ComponentType<P>
) {
    const PureShowMoreButton: any = memo(Component,
        (prev:any, next:any) => {

          return prev.isExpanded === next.isExpanded;
        }
    );

    return function WithExpanded(props: P & WithExpandedProps) {
        const { rowData } = useContext(RowDataContext);
        const { expanded ,toggleExpanded} = useContext(RowShowMoreContext);

        const isExpanded = expanded === rowData?.id;

        // debugger;
        return (
            <PureShowMoreButton
                onClick={toggleExpanded}
                isExpanded={isExpanded}
                {...{...rowData,...props}}
            />
        );
    };
}
