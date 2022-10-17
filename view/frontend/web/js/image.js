// copy of vendor/ulmod/module-bundle-item/view/frontend/web/js/image.js
define([
    'jquery'
], function ($) {
    'use strict';
    $.widget('mage.BundleItem', {
        component: 'Ulmod_BundleItem/js/image',
        options: {
            jsonbundle:[],
            class_option_bundle:'',
            height:'',
            width:'',
            itemsDesktop:'',
            speedSlide:'',
            autoSlide:''
        },

        /**
         * @private
         */
        _init: function () {
            if (this.options.jsonbundle !== '' && this.options.class_option_bundle!=='') {
                this._renderBundleOptionImage();
            } else {
                console.log('BundleItem: No input data received');
            }
        },

        /**
         * @private
         */
        _create: function () {
            var $widget = this;
            $widget._EventListener();
        },

        /**
         * Render bundle option image
		 *
         * @private
         */
        _renderBundleOptionImage: function () {
            var jsbundle = this.options.jsonbundle;
            var $widget = this;
            var class_option = this.options.class_option_bundle;
            $(class_option).each(function () {
                var optionid = $(this).attr('name').match(/\d+/)[0];
                if ($(this).is("select")) {
                    if ($(this).is("select[multiple]")) {
                        $("<div data-content-type='slider' class='multiple-option-bundle-image-ulmod'><div class='slick-list' style='gap:15px'></div>").insertBefore($(this));//pagebuilderCarousel
                        $(this).find('option').each(function () {
                            if ($(this).val() !='') {
                                var selection = $(this).val();
                                var productId = '';
                                productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
								// MULTI-SELECT IMAGE
                                $('.ulmod-all-bundle-items-data .child-product-' + productId).first().clone().appendTo($(this).parents('.control').find('.multiple-option-bundle-image-ulmod .slick-list'));//pagebuilderCarousel
								// POPUP
								$('.ulmod-all-bundle-items-data .um-bi-popup-link-product-id-' + productId).first().clone().appendTo($(this).parents('.control').find('.multiple-option-bundle-image-ulmod .slick-list'));//pagebuilderCarousel
                            }
                        })
                    } else {
                        $("<div class='dropdown-option-bundle-image-ulmod'></div>").insertBefore($(this));
                        $(this).find('option').each(function () {
                            if ($(this).val() !='') {
                                var selection = $(this).val();
                                var productId = '';
                                productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
								// SELECT IMAGE
                                $('.ulmod-all-bundle-items-data .child-product-' + productId).first().clone().appendTo($(this).parents('.control').find('.dropdown-option-bundle-image-ulmod')).css('display','none');
								// POPUP
                                $('.ulmod-all-bundle-items-data .um-bi-popup-link-product-id-' + productId).first().clone().appendTo($(this).parents('.control').find('.dropdown-option-bundle-image-ulmod')).css('display','none');
                            }
                        })
                    }
                } else {
                    var selection = $(this).val();
                    if (selection !='') {
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                        if ($(this).parents('.field.option').find('input.bundle.option').length > 1) {
							// Other Inputs IMAGE
                            $('.ulmod-all-bundle-items-data .child-product-' + productId).first().clone().insertAfter($(this).next());
							// POPUP
							$('.ulmod-all-bundle-items-data .um-bi-popup-link-product-id-' + productId).first().clone().insertAfter($(this).next());
                        } else {
							// Other Inputs IMAGE
                            $('.ulmod-all-bundle-items-data .child-product-' + productId).first().clone().insertAfter($(this));
							// POPUP
							$('.ulmod-all-bundle-items-data .um-bi-popup-link-product-id-' + productId).first().clone().insertAfter($(this));
                        }
                    }
                }
            });
            $('select.bundle.option').each(function () {
                var optionid = $(this).attr('name').match(/\d+/)[0];
                if ($(this).val() !='') {
                    if ($(this).is("select[multiple]")) {
                        $(this).find('option:checked').each(function () {// Breeze fix: selected => checked
                        var selection = $(this).val();
                            if (selection !='') {
                                var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                                $(this).parents('.control').find('.multiple-option-bundle-image-ulmod div#child-product-' + productId).addClass('selected');
                            }
                        });
                    } else {
                        var selection = $(this).val();
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
						// SELECT IMAGE
                        $(this).parent().find('.dropdown-option-bundle-image-ulmod div#child-product-' + productId).show();
						// POPUP
						$(this).parent().find('.dropdown-option-bundle-image-ulmod div#um-bi-popup-link-product-id-' + productId).show();
                    }
                }
            })

            var imageHeight = this.options.height;
            $('.field.choice').each(function () {
                if ($(this).find('.image-child-bundle').length && $(window).width() > 480 && ($(window).width() < 768 || $(window).width() > 960)) {
                    $(this).css({
                        position: "relative",
                        height: imageHeight + 'px',
                        padding: "5px"
                    });
                    var margin = (imageHeight - $(this).find('input').height())/2;
                    var margin1 = (imageHeight - $(this).find('label').css("line-height").match(/\d+/)[0])/2;
                    $(this).find('input').css({float :'left','margin-top': margin + 'px'});
                    $(this).find('label').css({float :'left','margin-top': margin1 + 'px'});
                    $(this).find('.image-child-bundle').css('float','left');
                }
            })

            // Desktop and mobile media queries
            // Breeze fix: rewritten using matchMedia
            function toggleImageSize(e) {
                // Switch to Desktop Version
                if (e.matches) {
                    $('.multiple-option-bundle-image-ulmod').css({'max-width':'400px'});
                } else {// Switch to Mobile Version
                    $('.multiple-option-bundle-image-ulmod').css({'max-width':'320px'});
                }
            }

            var mql = window.matchMedia('(min-width: 768px)');
            toggleImageSize(mql);
            mql.addEventListener('change', toggleImageSize);

            // Multi-select slider
            // Breeze fix: rewritten using pagebuilderCarousel
            $('.multiple-option-bundle-image-ulmod').pagebuilderCarousel({
                'slidesPerView': this.options.itemsDesktop,
                'speed': this.options.speedSlide,
                'autoplay': (this.options.autoSlide != '')? true : false
            });
        },

        /**
         * Event listener
         * Breeze fix: rewritten using this._on for Turbo compatibility
		 *
         * @private
         */
        _EventListener: function () {
            var $widget = this;

            this._on(document, {
                'click #reorder-select-all': function (e) {
                    return $widget._OnClick($(e.target));
                }
            });

            this._on(window, {
                resize: function () {
                    return $widget._resizeBundleOptionImage();
                }
            });

            this._on($('select.bundle.option'), {
                change: function (e) {
                    return $widget._selectBundleOptionImage($(e.target));
                }
            });

            this._on($('select[multiple].bundle.option option'), {
                click: function (e) {
                    return $widget._multiSelectBundleOptionImage($(e.target));
                }
            });
        },

        /**
         * Select inputs
		 *
         * @param {Object} $this
         * @private
         */
        _selectBundleOptionImage: function ($this) {
            var jsbundle = this.options.jsonbundle;
            var optionid = $this.attr('name').match(/\d+/)[0];
            if ($this.is("select[multiple]")) {
                var $slide = $this.parent().find('.multiple-option-bundle-image-ulmod');
                $this.parent().find('.multiple-option-bundle-image-ulmod div').removeClass('selected');
                var mv = false;
                $this.find('option:checked').each(function () {// Breeze fix: selected => checked
                    var selection = $(this).val();
                    if (selection !='') {
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                        $slide.find('.child-product-' + productId).addClass('selected');
                        if (!mv) {
                            mv = productId;
                        }
                    }
                });
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    if (mv !='') {
                        var index = $this.parent().find('.child-product-' + mv).parent().index();
                        $this.parent().find('.multiple-option-bundle-image-ulmod').trigger('owl.goTo', index);
                        $this.parent().find('.child-product-' + mv)[0].scrollIntoView();// Breeze fix
                    }
                }
            } else {
                var selection = $this.val();
                if (selection !='') {
                    $this.parent().find('.dropdown-option-bundle-image-ulmod div').hide();
                    var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                    $this.parent().find('.dropdown-option-bundle-image-ulmod div.child-product-' + productId).show();
					// UM POPUP
					 $this.parent().find('.dropdown-option-bundle-image-ulmod div.um-bi-popup-link-product-id-' + productId).show();
                } else {
                    $this.parent().find('.dropdown-option-bundle-image-ulmod div').hide();
                }
            }
        },

        /**
         * Multi-select inputs
		 *
         * @param {Object} $this
         * @private
         */
        _multiSelectBundleOptionImage: function ($this) {
            var jsbundle = this.options.jsonbundle;
            if ($this.is(':selected')) {
                    var parent = $this.parent();
                    var optionid = $(parent).attr('name').match(/\d+/)[0];
                    var selection = $this.val();
                    if (selection) {// Breeze fix
                        var productId = jsbundle["options"][optionid]["selections"][selection]['optionId'];
                        var control = $(parent).parent();
                        var index = $(control).find('.child-product-' + productId).parent().index();
                        $(control).find('.multiple-option-bundle-image-ulmod').trigger('owl.goTo', index);
                        $(control).find('.child-product-' + productId)[0].scrollIntoView();// Breeze fix
                    }
            } else {
               // no thing
            }
        },

        /**
         * Resize bundle option image
		 *
         * @param {Object} $this
         * @private
         */
        _resizeBundleOptionImage: function ($this) {
            var imageHeight = this.options.height;
            $('.field.choice').each(function () {
                if ($(this).find('.image-child-bundle').length && $(window).width() > 480 && ($(window).width() < 768 || $(window).width() > 960)) {
                    $(this).css({
                        position: "relative",
                        height: imageHeight + 'px',
                        padding: "5px"
                    });
                    var margin = (imageHeight - $(this).find('input').height())/2;
                    var margin1 = (imageHeight - $(this).find('label').css("line-height").match(/\d+/)[0])/2;
                    $(this).find('input').css({float :'left','margin-top': margin + 'px'});
                    $(this).find('label').css({float :'left','margin-top': margin1 + 'px'});
                    $(this).find('.image-child-bundle').css('float','left');
                } else {
                    $(this).css({
                        position: "relative",
                        height: 'auto',
                        padding: "5px"
                    });
                    $(this).find('input').css({float :'left','margin-top':'auto'});
                    $(this).find('label').css({float :'none','margin-top':'auto'});
                    $(this).find('.image-child-bundle').css('float','none');
                }
            })
        },

        /**
         * Breeze fix: added cleanup for Turbo compatibility
         */
        destroy: function () {
            $('.bundle-options-wrapper').find(
                '.multiple-option-bundle-image-ulmod, ' +
                '.dropdown-option-bundle-image-ulmod, ' +
                '.um-b-item-image, ' +
                '.um-b-item-popup-link-container'
            )
            .remove();
        },
    });
    return $.mage.BundleItem;
});
