// Core
import { sum, delay, getUniqueID, getFullApiUrl } from "./";

describe("instruments:", () => {
    test("sum function should be a function", () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test("sum throw error with wrong first argument", () => {
        expect(() => sum(`string`, 2)).toThrow();
    });

    test("sum throw error with wrong second argument", () => {
        expect(() => sum(2, `string`)).toThrow();
    });

    test("sum return correct answer", () => {
        expect(sum(5, 5)).toBe(10);
        expect(sum(10, 10)).toMatchSnapshot();
    });

    test("delay function should be a function", () => {
        expect(delay).toBeInstanceOf(Function);
    });

    test("delay return resolved promise", async () => {
        await expect(delay(1000)).resolves.toBe(`Resolved`);
    });

    test("getUniqueID function should be a function", () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test("getUniqueID throw error with wrong argument", () => {
        expect(() => getUniqueID(`string`)).toThrow();
    });

    test("getUniqueID return string with correct length", () => {
        expect(typeof getUniqueID()).toBe(`string`);
        expect(getUniqueID().length).toBe(15);
    });

    test("getFullApiUrl function should be a function", () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test("getFullApiUrl throw error with wrong first argument", () => {
        expect(() => sum(1, `string`)).toThrow();
    });

    test("getFullApiUrl throw error with wrong second argument", () => {
        expect(() => sum(`string`, 2)).toThrow();
    });

    test("getFullApiUrl return string with correct arguments", () => {
        expect(typeof getFullApiUrl(`api`, `id1`)).toBe(`string`);
        expect(getFullApiUrl(`api`, `id1`)).toBe(`api/id1`);
    });
});
