// To use this database:
// Add a collection and with a name to it (this collection has to be an array)
// To access the collection, just use its name, eg `db.users.find({name: 'filip'})`
import Collection from './collection';

class Db {
  constructor() {
    this.collections = [];
  }

  addCollection(name, collection) {
    this[name] = new Collection(collection);
    this.collections.push(name);
  }
}

export default Db;
