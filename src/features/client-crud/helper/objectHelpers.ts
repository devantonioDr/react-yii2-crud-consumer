/**
 * Takes an object and converts its keys from dot notation to nested objects.
 *
 * @param {object} obj - The object to convert
 * @returns {object} - A new object with nested keys
 */

export function nestObjectKeys(obj: any) {
    const nestedObj: any = {};

    // Loop through each key in the original object
    for (let key in obj) {
        const keyParts = key.split(".");
        let currentObj = nestedObj;

        // Loop through each part of the key
        for (let i = 0; i < keyParts.length; i++) {
            const currentKey = keyParts[i];

            // If the current key is not defined in the current object, create a new nested object
            if (!currentObj[currentKey]) {
                currentObj[currentKey] = {};
            }

            // If we have reached the last part of the key, set the value of the current object to the value of the original key
            if (i === keyParts.length - 1) {
                currentObj[currentKey] = obj[key];
            }

            // Set the current object to the nested object for the current key
            currentObj = currentObj[currentKey];
        }
    }
    return nestedObj;
}

/**
 * Flattens an object with nested properties into a single-level object.
 * @param {object} obj - The object to flatten.
 * @param {string} [prefix=""] - Optional prefix to use for the flattened keys.
 * @returns {object} - A new object with the flattened keys.
 */

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

/**
 * Returns a new object with only the properties that are not objects.
 * @param {object} obj - The object to filter.
 * @returns {object} - A new object with only non-object properties.
 */

export function filterNonObjects(obj: any) {
    const filteredObj: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] !== "object") {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
}



/**
 * A function that checks if two objects are deeply equal.
 * @param {object} obj1 - The first object to compare.
 * @param {object} obj2 - The second object to compare.
 * @returns {boolean} Returns true if the objects are deeply equal, otherwise false.
 */
export function deepEqual(obj1:any, obj2:any) {
    // Compare types
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
  
    // Compare values
    if (typeof obj1 !== "object" || obj1 === null) {
      return obj1 === obj2;
    }
  
    // Compare keys
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
  
    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }
  
    // Compare nested values
    for (const key of obj1Keys) {
      if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }
  
  // Jest test case
 