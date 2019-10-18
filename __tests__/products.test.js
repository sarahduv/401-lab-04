const Products = require('../products/products.js');

describe('Products Model', () => {

  let products;

  beforeEach(() => {
    products = new Products();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = products.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new product', () => {
    let obj = { price: 4 };
    return products.create(obj)
      .then(sanitized_obj => {
        Object.keys(obj).forEach(key => {
          expect(sanitized_obj[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    let obj = { price: 4 };
    return products.create(obj)
      .then(record => {
        return products.get(record.id)
          .then(matching_products => {
            Object.keys(obj).forEach(key => {
              expect(matching_products[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a product', () => {
    let obj = { price: 4 };
    return products.create(obj)
      .then(record => {
        products.delete(record)
        .then(() => {
          products.get(record.id)
          .then((matching_products) => {
            expect(matching_products.length).toEqual(0);
          })
        })
      })
      .catch(e => console.error('ERR', e));
  });

  it('can update() a product', () => {
    let obj = { price: 4 };
    return products.create(obj)
      .then(record => {
        record.price = 6;
        products.update(record.id, record)
        .then(() => {
          products.get(record.id)
          .then((matching_products) => {
            expect(matching_products[0].price).toEqual(6)
          })
        })
      })
      .catch(e => console.error('ERR', e));
  });

});