'use strict';

const uuid = require('uuid/v4');
const Validator = require('./lib/validator.js');

class Model {

  constructor() {
    this.database = [];
    this.validator = new Validator();
  }

  get(user_requested_id) {
    let response = user_requested_id
      ? this.database.filter((record) => record.id === user_requested_id) 
      : this.database;
    return Promise.resolve(response);
  }

  create(user_entry) {
    user_entry.id = uuid();
    let sanitized_entry = this.sanitize(user_entry);
    if (sanitized_entry && sanitized_entry.id) { this.database.push(sanitized_entry); }
    return Promise.resolve(sanitized_entry);
  }

  update(id, user_entry) {
    let sanitized_entry = this.sanitize(user_entry);
    if (sanitized_entry && sanitized_entry.id) {
      // Map every item in the database to itself if its id is different than the id argument
      // if it has the same id as the argument, map it to sanitized_entry instead 
      this.database = this.database.map(
        (item) => (item.id !== id) ? item : sanitized_entry 
      ); 
    }
    return Promise.resolve(sanitized_entry);
  }

  delete(id) {
    // Keep all the items in database that have a different id than id
    // which is the same as deleting id
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  // The point is to copy everything from entry into a new "sanitized_entry"
  // and every property of entry we are copying, we are validating as we are copying it
  sanitize(entry) {

    // assume that the sanitized entry is valid and start it as empty
    let valid = true;
    let sanitized_entry = {};

    //add validator method to the below

    // We have a schema (e.g. id => ... name => ....)
    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        // We are in a required schema field .. e.g. id

        if (entry[field]) {
          // If it has a value, copy it into the sanitized entry
          sanitized_entry[field] = entry[field];
        } else {
          // we are no longer valid
          valid = false;
        }
      }
      else {
        sanitized_entry[field] = entry[field];
      }

      if (valid && this.schema[field].type) {
        const is_valid_type = this.validator.isValidType(
          sanitized_entry[field], // the value to test
          this.schema[field].type, // the type it should be
          this.schema[field].required // whether it is required
        );

        if (!is_valid_type) {
          valid = false;
        }
      }
    });

    return valid ? sanitized_entry : undefined;
  }

}

module.exports = Model;


