import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';

import { JsonPlus } from './json-plus.js';

describe('JSON PLUS', () => {
  describe('in basic mode', () => {
    const testObject = {
      bigInt: 1234567890n,
      date1: new Date(2025, 11, 13, 14, 15, 16, 143),
      date2: new Date(+122025, 11, 13, 14, 15, 16, 143),
      date3: new Date(-122025, 11, 13, 14, 15, 16, 143),
      hello: 'World!',
    };
    const testString =
      '{"bigInt":"1234567890n","date1":"2025-12-13T14:15:16.143Z","date2":"+122025-12-13T14:15:16.143Z","date3":"-122025-12-13T14:16:31.143Z","hello":"World!"}';

    it('can parse BigInts and Date ISO strings', () => {
      const jsonObject = JsonPlus().parse(testString);

      assert.strictEqual(jsonObject.bigInt, testObject.bigInt);
      assert.deepEqual(jsonObject.date1, testObject.date1);
      assert.deepEqual(jsonObject.date2, testObject.date2);
      assert.deepEqual(jsonObject.date3, testObject.date3);

      assert.strictEqual(typeof jsonObject.bigInt, 'bigint');
      assert.strictEqual(jsonObject.date1 instanceof Date, true);
      assert.strictEqual(jsonObject.date2 instanceof Date, true);
      assert.strictEqual(jsonObject.date3 instanceof Date, true);
    });

    it('can stringify BigInts and Date objects', () => {
      const jsonString = JsonPlus().stringify(testObject);

      assert.strictEqual(jsonString, testString);
    });
  });

  describe('in advanced mode', () => {
    const testObject = {
      message: '',
      meaning: 0,
    };
    const testString = '{"message":"","meaning":0}';

    const transforms = {
      revivers: {
        message(val, ctxt) {
          return 'Hello, World!';
        },
      },
      replacers: {
        meaning(val) {
          return 42;
        },
      },
    };

    it('can apply a reviver during parse', () => {
      const jsonObject = JsonPlus(transforms).parse(testString);

      assert.strictEqual(jsonObject.message, 'Hello, World!');
      assert.strictEqual(jsonObject.meaning, 0);
    });

    it('can apply a replacers during stringify', () => {
      const jsonString = JsonPlus(transforms).stringify(testObject);

      assert.strictEqual(jsonString, '{"message":"","meaning":42}');
    });
  });
});
