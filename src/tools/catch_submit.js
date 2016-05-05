'use strict';


import reportValidity from '../polyfills/reportValidity';
import { text as text_types } from '../components/types';


function check(event) {
  event.preventDefault();
  if (reportValidity(event.target.form)) {
    event.target.form.submit();
  }
}


/**
 * catch the events _prior_ to a form being submitted
 */
export default function(listening_node) {
  /* catch explicit submission (click on button) */
  listening_node.addEventListener('click', function(event) {
    if (! event.defaultPrevented &&

        (event.target.nodeName === 'INPUT' ||
         event.target.nodeName === 'BUTTON') &&

        (event.target.type === 'image' || event.target.type === 'submit') &&

        ! event.target.hasAttribute('formnovalidate') &&

        event.target.form &&

        ! event.target.form.hasAttribute('novalidate')) {

      check(event);
    }
  });

  /* catch implicit submission */
  listening_node.addEventListener('keypress', function(event) {
    if (! event.defaultPrevented &&

        event.keyCode === 13 &&

        event.target.nodeName === 'INPUT' &&

        text_types.indexOf(event.target.type) > -1 &&

        event.target.form &&

        ! event.target.form.hasAttribute('novalidate')) {

      /* check, that there is no submit button in the form. Otherwise
       * that should be clicked. */
      var submit, el = event.target.form.elements.length;
      for (let i = 0; i < el; i++) {
        if (['image', 'submit'].indexOf(event.target.form.elements[i].type) > -1) {
          submit = event.target.form.elements[i];
          break;
        }
      }

      if (submit) {
        event.preventDefault();
        submit.click();
      } else {
        check(event);
      }
    }
  });
}