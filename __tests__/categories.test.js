const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(sanitized_obj => {
        Object.keys(obj).forEach(key => {
          expect(sanitized_obj[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id)
          .then(matching_categories => {
            Object.keys(obj).forEach(key => {
              expect(matching_categories[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        categories.delete(record)
        .then(() => {
          categories.get(record.id)
          .then((matching_categories) => {
            expect(matching_categories.length).toEqual(0);
          })
        })
      })
      .catch(e => console.error('ERR', e));
  });

  it('can update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        record.name = 'updated name';
        categories.update(record.id, record)
        .then(() => {
          categories.get(record.id)
          .then((matching_categories) => {
            expect(matching_categories[0].name).toEqual('updated name')
          })
        })
      })
      .catch(e => console.error('ERR', e));
  });

});