import { deepEqual } from "../../../helper/objectHelpers";

export function deepEqualRowData(prevProps: any, nextProps: any) {
    // By default, shallow comparison is used for performance reasons
    // However, we can override the comparison function with deepEqual
    return deepEqual(prevProps.rowData, nextProps.rowData);
}