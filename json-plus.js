const BIGINT = /^-?[1-9]\d{0,15}n$/;
const ISO_DATE = /^((\+|-)\d\d)?\d{4}(-\d\d){2}T(\d\d:){2}\d\d\.\d{3}Z$/;

function JsonPlus(propertyTransformers = {}) {
  const _propertyTransformers = {
    revivers: {},
    replacers: {},
    ...propertyTransformers,
  };
  const { revivers, replacers } = _propertyTransformers;

  return {
    parse(data) {
      return JSON.parse(data, reviver);
    },
    stringify(data, spaces) {
      return JSON.stringify(data, replacer, spaces);
    },
  };

  function reviver(key, val, context) {
    const _reviver = revivers[key];
    if (_reviver) return _reviver(val, context);
    if (BIGINT.test(val)) return BigInt(val.replace(/n$/, ''));
    return ISO_DATE.test(val) ? new Date(val) : val;
  }

  function replacer(key, val) {
    const _replacer = replacers[key];
    if (_replacer) return _replacer(val);
    return 'bigint' === typeof val ? `${val}n` : val;
  }
}

export { JsonPlus };
