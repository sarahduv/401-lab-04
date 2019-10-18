'use strict';

/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param {any} input
 * @returns {boolean}
 */

class Validator {
  constructor(){
  }

  isValid(input, rules) {
    return rules(input);
    // return true;
  }

  isValidType(input, type_name, is_it_required) {
    if (!input && !is_it_required) {
      return true;
    }
    
    if (type_name === 'string') {
      return this.isString(input);
    }

    if (type_name === 'number') {
      return this.isNumber(input);
    }

    if (type_name === 'array') {
      return this.isArray(input);
    }

    if (type_name === 'boolean') {
      return this.isBoolean(input);
    }

    if (type_name === 'function') {
      return this.isFunction(input);
    }

    return false;
  }

  /**
   * Is this a string?
   * @param input
   * @returns {boolean}
   */
  isString(input) {
    return typeof input === 'string';
  }

  areStrings(inputs) {
    return inputs.every(x => this.isString(x));
  }

  /**
   * Is this a number?
   * @param input
   * @returns {boolean}
   */
  isNumber(input) {
    return typeof input === 'number';
  }

  /**
   * Is this an array?
   * @param input
   * @returns {boolean}
   */
  isArray(input) {
    return Array.isArray(input);
  }

  /**
   * Is this an object?
   * @param input
   * @returns {boolean}
   */
  isObject(input) {
    return typeof input === 'object';
  }

  /**
   * Is this a boolean?
   * @param input
   * @returns {boolean}
   */
  isBoolean(input) {
    return typeof input === 'boolean';
  }

  /**
   * Is this a function?
   * @param input
   * @returns {boolean}
   */
  isFunction(input) {
    return typeof input === 'function';
  }
}

module.exports = Validator;