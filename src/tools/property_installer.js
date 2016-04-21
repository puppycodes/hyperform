'use strict';


/**
 * return a function, that adds property to an element
 *
 * js> installer('foo', { value: 'bar' })(element);
 * js> assert(element.foo === 'bar');
 */
export default function(property, descriptor) {
  return function(element) {
    if (property in element && ! element[property].hyperform) {
      /* publish existing property under new name, if it's not from us */
      Object.defineProperty(
        element,
        '_original_'+property,
        Object.getOwnPropertyDescriptor(element, property)
      );
    }
    delete element[property];
    Object.defineProperty(element, property, descriptor);
  };
}
