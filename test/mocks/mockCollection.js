export default function mockCollection() {
  return {
    all() {
      return [];
    },
    find(params) {
      const item = { id: 0, name: 'test' };
      const keys = Object.keys(params);

      if (keys.length === 0) {
        throw new Error('Bad parameters to Collection.find()');
      }
      if (item[keys[0]] !== params[keys[0]]) {
        return -1;
      }
      return item;
    },
    push() {
      return 1;
    },
  };
}
