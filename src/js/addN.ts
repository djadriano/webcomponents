const addN = (x: number) => (y: number): number => x + y;

var addEight = addN(8);

console.log(addEight(7));
console.log(addEight(100));
