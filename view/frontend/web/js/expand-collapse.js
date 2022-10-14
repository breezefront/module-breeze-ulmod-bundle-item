// copy of vendor/ulmod/module-bundle-item/view/frontend/web/js/expand-collapse.js
define([
	'jquery'
], function($) {
	"use strict";

	var result = function(config, element) {
		var umIsExpandCollapse = config.isExpandCollapse;
		$('.bundle-options-container .product-options-wrapper .fieldset .field.option').each(function(i) {
			$(this).addClass('um-bundle-option-id-' + (i + 1));
			if (umIsExpandCollapse) {
				$(this).addClass('um-b-o-expand-collapse');
				$('.um-bundle-option-id-' + (i + 1) + ' label').first().prepend('<span id="expand-collapse-icon">' + ('Expand Collapse') + '</span>');// Breeze fix: :first => first()
				var optionSelecttor = $('.bundle-options-container .product-options-wrapper .fieldset .field.option');
				optionSelecttor.addClass('um-b-o-expanded');
				$('.um-bundle-option-id-' + (i + 1)).find('label').first().click(function() {// added first() to prevent collapsing when clicking any label
					var element = $('.um-bundle-option-id-' + (i + 1)).find('.control');
					if ($(element).is(":visible")) {
						$('.um-bundle-option-id-' + (i + 1)).find('.control').hide();
						optionSelecttor.removeClass('um-b-o-expanded');
						optionSelecttor.addClass('um-b-o-collapsed');
					} else {
						$('.um-bundle-option-id-' + (i + 1)).find('.control').show();
						optionSelecttor.removeClass('um-b-o-collapsed');
						optionSelecttor.addClass('um-b-o-expanded');
					}
				});
			}
		})
	}

	$(document).on('breeze:mount:Ulmod_BundleItem/js/expand-collapse', (e, data) => {
		result(data.settings, data.el);
	});

	return result;
});
