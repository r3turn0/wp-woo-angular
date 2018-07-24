/*!
 * WooCommerce Variation Swatches v1.0.27 
 * 
 * Author: Emran Ahmed ( emran.bd.08@gmail.com ) 
 * Date: 2018-6-3 16:12:59
 * Released under the GPLv3 license.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

jQuery(function ($) {
    Promise.resolve().then(function () {
        return __webpack_require__(11);
    }).then(function () {
        // Init on Ajax Popup :)
        $(document).on('wc_variation_form', '.variations_form', function () {
            $(this).WooVariationSwatches();
        });

        // Support for Jetpack's Infinite Scroll,
        $(document.body).on('post-load', function () {
            $('.variations_form').each(function () {
                $(this).wc_variation_form();
            });
        });
    });
}); // end of jquery main wrapper

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ================================================================
// WooCommerce Variation Change
// ================================================================

var WooVariationSwatches = function ($) {

    var Default = {};

    var WooVariationSwatches = function () {
        function WooVariationSwatches(element, config) {
            _classCallCheck(this, WooVariationSwatches);

            // Assign
            this._element = $(element);
            this._config = $.extend({}, Default, config);
            this._generated = {};
            this.product_variations = this._element.data('product_variations');
            this.is_ajax_variation = !this.product_variations;
            this.product_id = this._element.data('product_id');
            this.hidden_behaviour = $('body').hasClass('woo-variation-swatches-attribute-behavior-hide');

            // Call
            this.init(this.is_ajax_variation, this.hidden_behaviour);
            this.loaded(this.is_ajax_variation, this.hidden_behaviour);
            this.update(this.is_ajax_variation, this.hidden_behaviour);
            this.reset(this.is_ajax_variation, this.hidden_behaviour);

            // Trigger
            $(document).trigger('woo_variation_swatches', [this._element]);
        }

        _createClass(WooVariationSwatches, [{
            key: 'init',
            value: function init(is_ajax, hidden_behaviour) {
                var _this2 = this;

                this._element.find('ul.variable-items-wrapper').each(function (i, el) {

                    var select = $(this).siblings('select.woo-variation-raw-select');
                    var li = $(this).find('li');
                    var reselect_clear = $(this).hasClass('reselect-clear');

                    // For Avada FIX
                    if (select.length < 1) {
                        select = $(this).parent().find('select.woo-variation-raw-select');
                    }

                    if (reselect_clear) {
                        $(this).on('touchstart click', 'li:not(.selected):not(.radio-variable-item)', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = $(this).data('value');
                            select.val(value).trigger('change');
                            select.trigger('click');
                            select.trigger('focusin');
                            select.trigger('touchstart');

                            $(this).trigger('focus'); // Mobile tooltip
                        });

                        $(this).on('touchstart click', 'li.selected:not(.radio-variable-item)', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            select.val('').trigger('change');
                            select.trigger('click');
                            select.trigger('focusin');
                            select.trigger('touchstart');

                            $(this).trigger('focus'); // Mobile tooltip
                        });

                        // RADIO
                        $(this).on('touchstart click', 'input.wvs-radio-variable-item:radio', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(this).trigger('change');
                        });

                        $(this).on('change', 'input.wvs-radio-variable-item:radio', function (e) {
                            var _this = this;

                            e.preventDefault();
                            e.stopPropagation();

                            var value = $(this).val();

                            if ($(this).parent('.radio-variable-item').hasClass('selected')) {
                                select.val('').trigger('change');
                                _.delay(function () {
                                    $(_this).prop('checked', false);
                                }, 1);
                            } else {
                                select.val(value).trigger('change');
                            }

                            select.trigger('click');
                            select.trigger('focusin');
                            select.trigger('touchstart');
                        });
                    } else {
                        $(this).on('touchstart click', 'li:not(.radio-variable-item)', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = $(this).data('value');
                            select.val(value).trigger('change');
                            select.trigger('click');
                            select.trigger('focusin');
                            select.trigger('touchstart');

                            $(this).trigger('focus'); // Mobile tooltip
                        });

                        // Radio
                        $(this).on('change', 'input.wvs-radio-variable-item:radio', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var value = $(this).val();

                            select.val(value).trigger('change');
                            select.trigger('click');
                            select.trigger('focusin');
                            select.trigger('touchstart');

                            // Radio
                            $(this).parent('li.radio-variable-item').removeClass('selected disabled').addClass('selected');
                        });
                    }
                });

                _.delay(function () {
                    _this2._element.trigger('woo_variation_swatches_init', [_this2, _this2.product_variations]);
                    $(document).trigger('woo_variation_swatches_loaded', [_this2._element, _this2.product_variations]);
                }, 2);
            }
        }, {
            key: 'loaded',
            value: function loaded(is_ajax, hidden_behaviour) {
                if (!is_ajax) {
                    this._element.on('woo_variation_swatches_init', function (event, object, product_variations) {

                        object._generated = product_variations.reduce(function (obj, variation) {
                            Object.keys(variation.attributes).map(function (attribute_name) {

                                if (!obj[attribute_name]) {
                                    obj[attribute_name] = [];
                                }

                                if (variation.attributes[attribute_name]) {
                                    obj[attribute_name].push(variation.attributes[attribute_name]);
                                }
                            });

                            return obj;
                        }, {});

                        $(this).find('ul.variable-items-wrapper').each(function () {
                            var li = $(this).find('li');
                            var attribute = $(this).data('attribute_name');
                            var attribute_values = object._generated[attribute];

                            li.each(function () {
                                var attribute_value = $(this).attr('data-value');

                                if (!_.isEmpty(attribute_values) && !attribute_values.includes(attribute_value)) {
                                    $(this).removeClass('selected');
                                    $(this).addClass('disabled');

                                    if (hidden_behaviour) {
                                        //$(this).stop().fadeOut('fast');
                                    }

                                    if ($(this).hasClass('radio-variable-item')) {
                                        $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', true).prop('checked', false);
                                    }
                                }
                            });
                        });
                    });
                }
            }
        }, {
            key: 'reset',
            value: function reset(is_ajax, hidden_behaviour) {
                this._element.on('reset_data', function (event) {
                    $(this).find('ul.variable-items-wrapper').each(function () {
                        var li = $(this).find('li');
                        li.each(function () {
                            if (!is_ajax) {
                                $(this).removeClass('selected disabled');
                                if (hidden_behaviour) {
                                    //$(this).stop().fadeIn('fast');
                                }
                                if ($(this).hasClass('radio-variable-item')) {
                                    $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false).prop('checked', false);
                                }
                            } else {
                                if ($(this).hasClass('radio-variable-item')) {
                                    //    $(this).find('input.wvs-radio-variable-item:radio').prop('checked', false);
                                }
                            }
                        });
                    });
                });
            }
        }, {
            key: 'update',
            value: function update(is_ajax, hidden_behaviour) {
                this._element.on('woocommerce_variation_has_changed', function (event) {
                    if (is_ajax) {
                        $(this).find('ul.variable-items-wrapper').each(function () {
                            var selected = '',
                                options = $(this).siblings('select.woo-variation-raw-select').find('option'),
                                current = $(this).siblings('select.woo-variation-raw-select').find('option:selected'),
                                eq = $(this).siblings('select.woo-variation-raw-select').find('option').eq(1),
                                li = $(this).find('li'),
                                selects = [];

                            // For Avada FIX
                            if (options.length < 1) {
                                options = $(this).parent().find('select.woo-variation-raw-select').find('option');
                                current = $(this).parent().find('select.woo-variation-raw-select').find('option:selected');
                                eq = $(this).parent().find('select.woo-variation-raw-select').find('option').eq(1);
                            }

                            options.each(function () {
                                if ($(this).val() !== '') {
                                    selects.push($(this).val());
                                    selected = current ? current.val() : eq.val();
                                }
                            });

                            _.delay(function () {
                                li.each(function () {
                                    var value = $(this).attr('data-value');
                                    $(this).removeClass('selected disabled');
                                    if (hidden_behaviour) {
                                        //$(this).stop().fadeIn('fast');
                                    }
                                    if (value === selected) {
                                        $(this).addClass('selected');
                                        if ($(this).hasClass('radio-variable-item')) {
                                            $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false).prop('checked', true);
                                        }
                                    }
                                });
                            }, 1);
                        });
                    }
                });

                // WithOut Ajax Update
                this._element.on('woocommerce_update_variation_values', function (event) {
                    $(this).find('ul.variable-items-wrapper').each(function () {

                        var selected = '',
                            options = $(this).siblings('select.woo-variation-raw-select').find('option'),
                            current = $(this).siblings('select.woo-variation-raw-select').find('option:selected'),
                            eq = $(this).siblings('select.woo-variation-raw-select').find('option').eq(1),
                            li = $(this).find('li'),
                            selects = [];

                        // For Avada FIX
                        if (options.length < 1) {
                            options = $(this).parent().find('select.woo-variation-raw-select').find('option');
                            current = $(this).parent().find('select.woo-variation-raw-select').find('option:selected');
                            eq = $(this).parent().find('select.woo-variation-raw-select').find('option').eq(1);
                        }

                        options.each(function () {
                            if ($(this).val() !== '') {
                                selects.push($(this).val());
                                selected = current ? current.val() : eq.val();
                            }
                        });

                        _.delay(function () {
                            li.each(function () {
                                var value = $(this).attr('data-value');
                                $(this).removeClass('selected disabled').addClass('disabled');

                                if (hidden_behaviour) {
                                    //$(this).stop().fadeIn('fast');
                                }

                                if (_.contains(selects, value)) {
                                    $(this).removeClass('disabled');
                                    $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false);
                                    if (value === selected) {
                                        $(this).addClass('selected');
                                        if ($(this).hasClass('radio-variable-item')) {
                                            $(this).find('input.wvs-radio-variable-item:radio').prop('checked', true);
                                        }
                                    }
                                } else {

                                    if (hidden_behaviour) {
                                        //$(this).stop().fadeOut('fast');
                                    }
                                    if ($(this).hasClass('radio-variable-item')) {
                                        $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', true).prop('checked', false);
                                    }
                                }
                            });
                        }, 1);
                    });
                });
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                return this.each(function () {
                    new WooVariationSwatches(this, config);
                });
            }
        }]);

        return WooVariationSwatches;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn['WooVariationSwatches'] = WooVariationSwatches._jQueryInterface;
    $.fn['WooVariationSwatches'].Constructor = WooVariationSwatches;
    $.fn['WooVariationSwatches'].noConflict = function () {
        $.fn['WooVariationSwatches'] = $.fn['WooVariationSwatches'];
        return WooVariationSwatches._jQueryInterface;
    };

    return WooVariationSwatches;
}(jQuery);

/* harmony default export */ __webpack_exports__["default"] = (WooVariationSwatches);

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2Zyb250ZW5kLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDY2NTAxYjNjNTBiZTBlMzhmZjhkIiwid2VicGFjazovLy9zcmMvanMvZnJvbnRlbmQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9Xb29WYXJpYXRpb25Td2F0Y2hlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NjUwMWIzYzUwYmUwZTM4ZmY4ZCIsImpRdWVyeSgkID0+IHtcbiAgICBpbXBvcnQoJy4vV29vVmFyaWF0aW9uU3dhdGNoZXMnKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gSW5pdCBvbiBBamF4IFBvcHVwIDopXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd3Y192YXJpYXRpb25fZm9ybScsICcudmFyaWF0aW9uc19mb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5Xb29WYXJpYXRpb25Td2F0Y2hlcygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdXBwb3J0IGZvciBKZXRwYWNrJ3MgSW5maW5pdGUgU2Nyb2xsLFxuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLm9uKCdwb3N0LWxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcudmFyaWF0aW9uc19mb3JtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS53Y192YXJpYXRpb25fZm9ybSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pOyAgLy8gZW5kIG9mIGpxdWVyeSBtYWluIHdyYXBwZXJcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2Zyb250ZW5kLmpzIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gV29vQ29tbWVyY2UgVmFyaWF0aW9uIENoYW5nZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBXb29WYXJpYXRpb25Td2F0Y2hlcyA9ICgoJCkgPT4ge1xuXG4gICAgY29uc3QgRGVmYXVsdCA9IHt9O1xuXG4gICAgY2xhc3MgV29vVmFyaWF0aW9uU3dhdGNoZXMge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuXG4gICAgICAgICAgICAvLyBBc3NpZ25cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICAgID0gJC5leHRlbmQoe30sIERlZmF1bHQsIGNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZWQgICAgICAgICA9IHt9O1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0X3ZhcmlhdGlvbnMgPSB0aGlzLl9lbGVtZW50LmRhdGEoJ3Byb2R1Y3RfdmFyaWF0aW9ucycpO1xuICAgICAgICAgICAgdGhpcy5pc19hamF4X3ZhcmlhdGlvbiAgPSAhdGhpcy5wcm9kdWN0X3ZhcmlhdGlvbnM7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RfaWQgICAgICAgICA9IHRoaXMuX2VsZW1lbnQuZGF0YSgncHJvZHVjdF9pZCcpO1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5fYmVoYXZpb3VyICAgPSAkKCdib2R5JykuaGFzQ2xhc3MoJ3dvby12YXJpYXRpb24tc3dhdGNoZXMtYXR0cmlidXRlLWJlaGF2aW9yLWhpZGUnKTtcblxuICAgICAgICAgICAgLy8gQ2FsbFxuICAgICAgICAgICAgdGhpcy5pbml0KHRoaXMuaXNfYWpheF92YXJpYXRpb24sIHRoaXMuaGlkZGVuX2JlaGF2aW91cik7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZCh0aGlzLmlzX2FqYXhfdmFyaWF0aW9uLCB0aGlzLmhpZGRlbl9iZWhhdmlvdXIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5pc19hamF4X3ZhcmlhdGlvbiwgdGhpcy5oaWRkZW5fYmVoYXZpb3VyKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQodGhpcy5pc19hamF4X3ZhcmlhdGlvbiwgdGhpcy5oaWRkZW5fYmVoYXZpb3VyKTtcblxuICAgICAgICAgICAgLy8gVHJpZ2dlclxuICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignd29vX3ZhcmlhdGlvbl9zd2F0Y2hlcycsIFt0aGlzLl9lbGVtZW50XSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5ldyBXb29WYXJpYXRpb25Td2F0Y2hlcyh0aGlzLCBjb25maWcpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaW5pdChpc19hamF4LCBoaWRkZW5fYmVoYXZpb3VyKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ICAgICAgICAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGxpICAgICAgICAgICAgID0gJCh0aGlzKS5maW5kKCdsaScpO1xuICAgICAgICAgICAgICAgIGxldCByZXNlbGVjdF9jbGVhciA9ICQodGhpcykuaGFzQ2xhc3MoJ3Jlc2VsZWN0LWNsZWFyJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBGb3IgQXZhZGEgRklYXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNlbGVjdF9jbGVhcikge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgJ2xpOm5vdCguc2VsZWN0ZWQpOm5vdCgucmFkaW8tdmFyaWFibGUtaXRlbSknLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuZGF0YSgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwodmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdmb2N1cycpOyAvLyBNb2JpbGUgdG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgJ2xpLnNlbGVjdGVkOm5vdCgucmFkaW8tdmFyaWFibGUtaXRlbSknLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdmb2N1cycpOyAvLyBNb2JpbGUgdG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSQURJT1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjaGFuZ2UnLCAnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCcucmFkaW8tdmFyaWFibGUtaXRlbScpLmhhc0NsYXNzKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWxheSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudmFsKHZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgJ2xpOm5vdCgucmFkaW8tdmFyaWFibGUtaXRlbSknLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykuZGF0YSgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwodmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdmb2N1cycpOyAvLyBNb2JpbGUgdG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSYWRpb1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjaGFuZ2UnLCAnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC52YWwodmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QudHJpZ2dlcignZm9jdXNpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LnRyaWdnZXIoJ3RvdWNoc3RhcnQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFkaW9cbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCdsaS5yYWRpby12YXJpYWJsZS1pdGVtJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIGRpc2FibGVkJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uZGVsYXkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQudHJpZ2dlcignd29vX3ZhcmlhdGlvbl9zd2F0Y2hlc19pbml0JywgW3RoaXMsIHRoaXMucHJvZHVjdF92YXJpYXRpb25zXSlcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCd3b29fdmFyaWF0aW9uX3N3YXRjaGVzX2xvYWRlZCcsIFt0aGlzLl9lbGVtZW50LCB0aGlzLnByb2R1Y3RfdmFyaWF0aW9uc10pXG4gICAgICAgICAgICB9LCAyKVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGVkKGlzX2FqYXgsIGhpZGRlbl9iZWhhdmlvdXIpIHtcbiAgICAgICAgICAgIGlmICghaXNfYWpheCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQub24oJ3dvb192YXJpYXRpb25fc3dhdGNoZXNfaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgb2JqZWN0LCBwcm9kdWN0X3ZhcmlhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuX2dlbmVyYXRlZCA9IHByb2R1Y3RfdmFyaWF0aW9ucy5yZWR1Y2UoKG9iaiwgdmFyaWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YXJpYXRpb24uYXR0cmlidXRlcykubWFwKChhdHRyaWJ1dGVfbmFtZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmpbYXR0cmlidXRlX25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialthdHRyaWJ1dGVfbmFtZV0gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYXRpb24uYXR0cmlidXRlc1thdHRyaWJ1dGVfbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2F0dHJpYnV0ZV9uYW1lXS5wdXNoKHZhcmlhdGlvbi5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV9uYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpICAgICAgICAgICAgICAgPSAkKHRoaXMpLmZpbmQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0cmlidXRlICAgICAgICA9ICQodGhpcykuZGF0YSgnYXR0cmlidXRlX25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVfdmFsdWVzID0gb2JqZWN0Ll9nZW5lcmF0ZWRbYXR0cmlidXRlXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZV92YWx1ZSA9ICQodGhpcykuYXR0cignZGF0YS12YWx1ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkoYXR0cmlidXRlX3ZhbHVlcykgJiYgIWF0dHJpYnV0ZV92YWx1ZXMuaW5jbHVkZXMoYXR0cmlidXRlX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuc3RvcCgpLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyYWRpby12YXJpYWJsZS1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXNldChpc19hamF4LCBoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm9uKCdyZXNldF9kYXRhJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd1bC52YXJpYWJsZS1pdGVtcy13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaSA9ICQodGhpcykuZmluZCgnbGknKTtcbiAgICAgICAgICAgICAgICAgICAgbGkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzX2FqYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5zdG9wKCkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyYWRpby12YXJpYWJsZS1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dC53dnMtcmFkaW8tdmFyaWFibGUtaXRlbTpyYWRpbycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3JhZGlvLXZhcmlhYmxlLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAkKHRoaXMpLmZpbmQoJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGUoaXNfYWpheCwgaGlkZGVuX2JlaGF2aW91cikge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5vbignd29vY29tbWVyY2VfdmFyaWF0aW9uX2hhc19jaGFuZ2VkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzX2FqYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd1bC52YXJpYWJsZS1pdGVtcy13cmFwcGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zICA9ICQodGhpcykuc2libGluZ3MoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ICA9ICQodGhpcykuc2libGluZ3MoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcSAgICAgICA9ICQodGhpcykuc2libGluZ3MoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb24nKS5lcSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaSAgICAgICA9ICQodGhpcykuZmluZCgnbGknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzICA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgQXZhZGEgRklYXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcSAgICAgID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJykuZXEoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBjdXJyZW50ID8gY3VycmVudC52YWwoKSA6IGVxLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRlbGF5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIGRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuc3RvcCgpLmZhZGVJbignZmFzdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmFkaW8tdmFyaWFibGUtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dC53dnMtcmFkaW8tdmFyaWFibGUtaXRlbTpyYWRpbycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBXaXRoT3V0IEFqYXggVXBkYXRlXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lm9uKCd3b29jb21tZXJjZV91cGRhdGVfdmFyaWF0aW9uX3ZhbHVlcycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndWwudmFyaWFibGUtaXRlbXMtd3JhcHBlcicpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyAgPSAkKHRoaXMpLnNpYmxpbmdzKCdzZWxlY3Qud29vLXZhcmlhdGlvbi1yYXctc2VsZWN0JykuZmluZCgnb3B0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ICA9ICQodGhpcykuc2libGluZ3MoJ3NlbGVjdC53b28tdmFyaWF0aW9uLXJhdy1zZWxlY3QnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVxICAgICAgID0gJCh0aGlzKS5zaWJsaW5ncygnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpLmVxKDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGkgICAgICAgPSAkKHRoaXMpLmZpbmQoJ2xpJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RzICA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBBdmFkYSBGSVhcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXEgICAgICA9ICQodGhpcykucGFyZW50KCkuZmluZCgnc2VsZWN0Lndvby12YXJpYXRpb24tcmF3LXNlbGVjdCcpLmZpbmQoJ29wdGlvbicpLmVxKDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdHMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGN1cnJlbnQgPyBjdXJyZW50LnZhbCgpIDogZXEudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uZGVsYXkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQgZGlzYWJsZWQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5zdG9wKCkuZmFkZUluKCdmYXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uY29udGFpbnMoc2VsZWN0cywgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQud3ZzLXJhZGlvLXZhcmlhYmxlLWl0ZW06cmFkaW8nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyYWRpby12YXJpYWJsZS1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoaWRkZW5fYmVoYXZpb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuc3RvcCgpLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmFkaW8tdmFyaWFibGUtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0Lnd2cy1yYWRpby12YXJpYWJsZS1pdGVtOnJhZGlvJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQuZm5bJ1dvb1ZhcmlhdGlvblN3YXRjaGVzJ10gPSBXb29WYXJpYXRpb25Td2F0Y2hlcy5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQuZm5bJ1dvb1ZhcmlhdGlvblN3YXRjaGVzJ10uQ29uc3RydWN0b3IgPSBXb29WYXJpYXRpb25Td2F0Y2hlcztcbiAgICAkLmZuWydXb29WYXJpYXRpb25Td2F0Y2hlcyddLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmZuWydXb29WYXJpYXRpb25Td2F0Y2hlcyddID0gJC5mblsnV29vVmFyaWF0aW9uU3dhdGNoZXMnXTtcbiAgICAgICAgcmV0dXJuIFdvb1ZhcmlhdGlvblN3YXRjaGVzLl9qUXVlcnlJbnRlcmZhY2VcbiAgICB9XG5cbiAgICByZXR1cm4gV29vVmFyaWF0aW9uU3dhdGNoZXM7XG5cbn0pKGpRdWVyeSk7XG5cbmV4cG9ydCBkZWZhdWx0IFdvb1ZhcmlhdGlvblN3YXRjaGVzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9Xb29WYXJpYXRpb25Td2F0Y2hlcy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUExQkE7QUFBQTtBQUFBO0FBaUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcElBO0FBQUE7QUFBQTtBQXVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpMQTtBQUFBO0FBQUE7QUFvTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBek1BO0FBQUE7QUFBQTtBQTRNQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhUQTtBQUFBO0FBQUE7QUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUEvQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWtUQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=