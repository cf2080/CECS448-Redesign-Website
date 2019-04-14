/*global jQuery */
(function ($) {
    'use strict';
    $.fn.redirectOnSelect = function () {
        return this.change(function () {
            var url = $(this).val();
            if (url) {
                window.location = url;
            }
        });
    };

    $(function () {
        $('select[data-redirect-on-select]').redirectOnSelect();
    });
}(jQuery));