export function nestObjectKeys(obj: any) {
    const nestedObj: any = {};

    for (let key in obj) {
        const keyParts = key.split('.');
        let currentObj = nestedObj;

        for (let i = 0; i < keyParts.length; i++) {
            const currentKey = keyParts[i];

            if (!currentObj[currentKey]) {
                currentObj[currentKey] = {};
            }

            if (i === keyParts.length - 1) {
                currentObj[currentKey] = obj[key];
            }

            currentObj = currentObj[currentKey];
        }
    }

    return nestedObj;
}

export function flattenObject(obj: any, prefix = "") {
    let flatObj: any = {};

    for (let key in obj) {
        const newKey = prefix + key;

        if (typeof obj[key] === "object" && obj[key] !== null) {
            const nestedObj = flattenObject(obj[key], newKey + ".");
            flatObj = { ...flatObj, ...nestedObj };
        } else {
            flatObj[newKey] = obj[key];
        }
    }

    return flatObj;
}
