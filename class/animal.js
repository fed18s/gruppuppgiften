export default class Animal {
  constructor(type, collection) {
    this.type = type;
    this.collection = collection;
  }

  getType() {
    return this.type;
  }

  getAll() {
    return this.collection.all();
  }

  getById(id) {
    return this.collection.find({ id });
  }

  find(key, value) {
    return this.collection.find({ key, value });
  }

  add(animal) {
    return this.collection.push(animal);
  }
}
