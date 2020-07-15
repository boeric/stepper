/* test-babel.js */
/* eslint-disable no-console */

// Exports
export default function testBabel() {
  // Variables
  let value;
  let obj;

  // Test template string
  value = 'template string works';
  console.log(`${value}`);

  // Test tagged template
  function tag(strings, t, w) {
    return `tagged ${t} ${w}s`;
  }
  const template = 'template';
  const work = 'work';
  console.log(tag`does tagged ${template} ${work}?`);

  // Test arrow functions
  const arrow = (d) => {
    console.log(d);
  };
  arrow('arrow works');

  // Test arrow iife
  (() => {
    console.log('arrow iife works');
  })();

  // Test async function
  async function asyncTest() {
    console.log('async function works');
  }
  asyncTest();

  // Test async iife function
  (async () => {
    console.log('async iife works');
  })();

  // Test async/await (will show up late in the log, due to execution at the next tick
  // of the event loop)
  (async () => {
    function returnPromise() {
      return Promise.resolve('async/await works');
    }
    const awaitValue = await returnPromise();
    console.log(awaitValue);
  })();

  // Test spread
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const newArray = [...Array(10).keys()];
  if (array.length === newArray.length && array.every((d, i) => d === newArray[i])) {
    console.log('spread works');
  } else {
    console.log('spread does not work', array, newArray);
  }

  // Test generator
  function* generator() {
    while (true) {
      yield 'generator works';
    }
  }
  const gen = generator();
  console.log(gen.next().value);

  // Test Map
  const map = new Map();
  map.set('key', 'Map works');
  console.log(map.get('key'));

  // Test Set
  const set = new Set();
  set.add('Set works');
  console.log([...set.values()][0]);

  // Test WeakMap
  const weakMap = new WeakMap();
  obj = {
    key0: {},
    key1: {},
  };
  value = 'WeakMap works';
  weakMap.set(obj.key0, value);
  weakMap.set(obj.key1, '');
  delete obj.key1;
  if (weakMap.get(obj.key1) === undefined) {
    console.log(weakMap.get(obj.key0));
  } else {
    console.log('weakmap does NOT work');
  }

  // Test WeakSet
  const weakSet = new WeakSet();
  obj = {
    obj0: {},
    obj1: {},
  };
  weakSet.add(obj.obj0);
  weakSet.add(obj.obj1);
  delete obj.obj1;
  if (weakSet.has(obj.obj0) && !weakSet.has(obj.obj1)) {
    console.log('WeakSet works');
  } else {
    console.log('WeakSet does NOT work');
  }

  // Test getter/setter
  obj = {
    internal: 'getter works',
    get string() {
      return this.internal;
    },
    set newString(newValue) {
      this.internal = newValue;
    },
  };
  console.log(obj.string);
  obj.newString = 'setter works';
  console.log(obj.string);

  // Test optional chaining
  try {
    obj = {
      prop0: {
        prop00: {},
      },
    };
    value = obj?.prop0?.prop00?.prop000 || 'optional chaining works';
    console.log(value);
  } catch (e) {
    console.log(`optional chaining does NOT work: ${e}`);
  }

  return 'default export/import works';
}
