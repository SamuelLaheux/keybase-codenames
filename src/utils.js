module.exports = exports = {
  shuffle(array) {
    const cloned = [...array]
    for (let i = cloned.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }

    return cloned
  },

  trimVert(str) {
    return str.replace(/^[\s\uFEFF\xA0\v]+|[\s\uFEFF\xA0\v]+$/g, '')
  },

  windowed(arr1, size) {
    const array = [];
    for (let i = 0; i < arr1.length; i++) {
        const w = i % size;
        (array[w] = array[w] || []).push(arr1[i]);
    }

    return array
  },

  zip(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error('Length mismatch')
    }

    const obj = {}
    for (let i = 0; i < arr1.length; i++) {
        obj[arr1[i]] = arr2[i];
    }

    return obj
  },
}
