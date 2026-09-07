/**
 * Toggle loading UI on a submit button during fetch().
 * Saves/restores innerHTML via data-submit-default-html.
 */
(function (w) {
  'use strict';
  w.setFormSubmitBusy = function (button, busy) {
    if (!button) return;
    if (busy) {
      if (!button.hasAttribute('data-submit-default-html')) {
        button.setAttribute('data-submit-default-html', button.innerHTML);
      }
      button.disabled = true;
      button.classList.add('form-submit-busy');
      button.setAttribute('aria-busy', 'true');
      var msg =
        window.I18n && window.I18n.t ? window.I18n.t('forms.submitting') : 'Submitting…';
      button.innerHTML =
        '<span class="form-submit-busy__spin" aria-hidden="true"></span>' +
        '<span class="form-submit-busy__sr">' +
        msg +
        '</span>';
    } else {
      button.disabled = false;
      button.classList.remove('form-submit-busy');
      button.removeAttribute('aria-busy');
      if (button.hasAttribute('data-submit-default-html')) {
        button.innerHTML = button.getAttribute('data-submit-default-html');
        button.removeAttribute('data-submit-default-html');
      }
    }
  };
})(window);
