// copy of vendor/ulmod/module-bundle-item/view/frontend/web/js/popup.js
define([
    'jquery',
    'Magento_Ui/js/modal/modal'
], function ($) {
    'use strict';

    $.widget('ulmod.processUmCallforprice', {
        component: 'Ulmod_BundleItem/js/popup',

        /**
         * Bind handlers to events.
         */
        _create: function () {
			var self = this,
			um_bundle_item_popup_options = {
					type: 'popup',
					responsive: true,
					innerScroll: true,
					title: $.mage.__(' '),
					wrapperClass: 'modals-wrapper um-b-item-popup-modals-wrapper',
					modalClass : 'um-b-item-popup-modal-container',
					buttons: [{
						text: $.mage.__('OK'),
						class: 'um-b-item-popup-ok action primary',
						attr: {
							'data-action': 'confirm'
						},
						click: function () {
							this.closeModal();
						}
					}]
			};

            $('#um-bundle-item-popup-container').modal(um_bundle_item_popup_options);

            $(document).on('click', '.um-b-item-popup-link', function () {
                var product = $(this).parent().find('input[name="product"]').val();
                var product_name = $(this).parent().find('input[name="product_name"]').val();
                var product_sku = $(this).parent().find('input[name="product_sku"]').val();
                var product_short_desc = $(this).parent().find('#product_short_desc').html();
                var product_desc = $(this).parent().find('#product_desc').html();
                $('.callforprice_request .product_ids').val(product);
                $('.callforprice_request .product_name').val(product_name);
				var product_img_abspath = $('#um-b-img-product-id-' + product).attr('src');
                $('.um-bundle-item-details .um-prodimg-block .um-prodimg').attr('src', product_img_abspath);
                $('.um-bundle-item-details .um-prodname').text(product_name);
                $('.um-bundle-item-details .um-prodsku').text(product_sku);
                $('.um-bundle-item-details .um-prod-short-desc').html(product_short_desc);
                $('.um-bundle-item-details .um-prod-desc').html(product_desc);
                $('#um-bundle-item-popup-container').modal('openModal');
            });
        }
    });
    return $.ulmod.processUmCallforprice;
});
