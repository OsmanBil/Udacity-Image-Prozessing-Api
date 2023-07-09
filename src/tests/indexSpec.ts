import arrays from "../utilities/arrays"; // this is the import statement from the test file

const numArr = [3, 4, 5, 6];
const wordArr = ['cat', 'dog', 'rabbit', 'bird'];


it ('should add numbers in array and be truthy', () => {
    expect(arrays.addArr(numArr)).toBeTruthy();
});

it ('should concatenate 2 arrays to not equal just 1', () => {
    expect(arrays.concatArr(numArr, wordArr)).not.toEqual(numArr);
});

it ('should not contain the third index', () => {
    expect(arrays.cut3(wordArr)).not.toContain('rabbit');
});

it('should return the original array if it has less than 3 elements', () => {
    expect(arrays.cut3(['apple', 'banana'])).toEqual(['apple', 'banana']);
  });