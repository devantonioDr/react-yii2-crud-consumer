import { nestObjectKeys, flattenObject, deepEqual } from "../objectHelpers";

// Tests the `nestObjectKeys` function to ensure that it correctly nests object keys.
describe("ObjectHelpers tests", () => {
  describe("nestObjectKeys", () => {
    test("should nest object keys correctly", () => {
      const inputObj = {
        "a.b.c": 1,
        "a.d.e": 2,
        "f.g.h": 3,
      };
      const expectedOutput = {
        a: {
          b: {
            c: 1,
          },
          d: {
            e: 2,
          },
        },
        f: {
          g: {
            h: 3,
          },
        },
      };
      expect(nestObjectKeys(inputObj)).toEqual(expectedOutput);
    });
  });

  describe("flattenObject", () => {

    test("should flatten object keys correctly", () => {
      const inputObj = {
        a: {
          b: {
            c: 1,
          },
          d: {
            e: 2,
          },
        },
        f: {
          g: {
            h: 3,
          },
        },
      };

      const expectedOutput = {
        "a.b.c": 1,
        "a.d.e": 2,
        "f.g.h": 3,
      };

      expect(flattenObject(inputObj)).toEqual(expectedOutput);
      
    });

    test("should handle empty object", () => {
      expect(flattenObject({})).toEqual({});
    });

    test("should handle null object", () => {
      expect(flattenObject(null)).toEqual({});
    });

  });



  test("deepEqual function", () => {
    const obj1 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    };
    const obj2 = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA"
      }
    };
    const obj3 = {
      name: "Jane",
      age: 25,
      address: {
        street: "456 Oak Ave",
        city: "Othertown",
        state: "NY"
      }
    };
  
    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });
  
  
});
