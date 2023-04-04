var scmLoadScript = function(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Others
        script.onreadystatechange = callback;
        script.onload = callback;
    }

    script.src = url;
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(script, x);
};

function customSwticher(jQuery){
    
    const marginTop = 25;
    const marginRight = 25;
    const marginBottom = 25;
    const marginLeft = 25;
    const border = "";
    const option_border_width = "";
    const box_shadow = "";
    const hover_box_shadow = "";
    const fontWeight = "";
    const color_background = "transparent";
    const color_border = "transparent";
    const color_text = "#000";
    const color_arrow = "";
            
    const color_background_hover = "";
    const color_border_hover = "";
    const color_text_hover = "";
    const color_arrow_hover = "";

    
    {
        jQuery('.cs-placeholder').css({'background-color': color_background});
    }
        {
        jQuery('.cs-placeholder').css({'color': color_text});
        jQuery('.cs-options').css({'color': color_text});
    }
    
    
    
    jQuery('.sca-body-currency').addClass(`border-type__${border}`);
    jQuery('.sca-body-currency').addClass(`border-witdh__${option_border_width}`);
    jQuery('.cs-options').addClass(`border-type__${border}`);
    jQuery('.cs-options').addClass(`border-witdh__${option_border_width}`);
    jQuery('.cs-options').addClass("overflow-x-hidden");
    jQuery('.cs-placeholder').addClass(`border-type__${border}`);
    jQuery('.cs-placeholder').addClass(`border-witdh__${option_border_width}`);
    jQuery('.cs-placeholder').addClass(`shadow-${box_shadow}`);
    jQuery('.cs-placeholder').addClass(`hover-${hover_box_shadow}`);
    jQuery('.cs-placeholder').css({"font-weight": fontWeight});

            jQuery('.cs-placeholder').css({"background-image": "none"});
    
    
            
            jQuery('.cs-skin-elastic').addClass("hidden-after");
    
    
            jQuery('.cs-placeholder').addClass('layout-only-label');
        jQuery('.cs-placeholder').css({'width': '50px'});
    
    
    }

                                            var startCurrencySwitcher = function(jQuery) {

                    jQuery('.sca-body-currency').css({'display': 'none', visibility: 'hidden'});
        
            SECOMAPP.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};

            Currency.cookie = {
                configuration: {
                    expires: 10,
                    path: '/',
                    domain: window.location.hostname
                },
                name: 'scm_currency_4506',
                write: function(currency) {
                    SECOMAPP.cookie(this.name, currency, this.configuration);
                },
                read: function() {
                    return SECOMAPP.cookie(this.name);
                },
                destroy: function() {
                    SECOMAPP.cookie(this.name, null, this.configuration);
                }
            };

            if (SECOMAPP.cs.defineCurrencyFormatMoney !== true || typeof Currency.formatMoney === 'undefined') {
                Currency.formatMoney = function(cents, format, isConverting) {
                    if (typeof SECOMAPP.cs.shopifyFormatMoney === 'function') {
                        return SECOMAPP.cs.shopifyFormatMoney(cents, format, isConverting);
                    }
                    if (typeof Shopify.formatMoney === 'function' && SECOMAPP.cs.overrideShopifyFormatMoney !== true) {
                        return Shopify.formatMoney(cents, format, isConverting);
                    }

                    if (typeof cents == 'string') {
                        cents = cents.replace('.','');
                    }
                    var value = '';
                    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
                    var formatString = format || '${{amount}}';

                    function defaultOption(opt, def) {
                        return (typeof opt == 'undefined' ? def : opt);
                    }

                    function formatWithDelimiters(number, precision, thousands, decimal) {
                        precision = defaultOption(precision, 2);
                        thousands = defaultOption(thousands, ',');
                        decimal   = defaultOption(decimal, '.');

                        if (isNaN(number) || number == null) {
                            return 0;
                        }

                        number = (number/100.0).toFixed(precision);
                        var parts   = number.split('.'),
                            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                            cents   = parts[1] ? (decimal + parts[1]) : '';

                        return dollars + cents;
                    }

                    switch(formatString.match(placeholderRegex)[1]) {
                        case 'amount':
                            value = formatWithDelimiters(cents, 2);
                            break;
                        case 'amount_no_decimals':
                            value = formatWithDelimiters(cents, 0);
                            break;
                        case 'amount_with_comma_separator':
                            value = formatWithDelimiters(cents, 2, '.', ',');
                            break;
                        case 'amount_no_decimals_with_comma_separator':
                            value = formatWithDelimiters(cents, 0, '.', ',');
                            break;
                    }

                    return formatString.replace(placeholderRegex, value);
                };
                SECOMAPP.cs.defineCurrencyFormatMoney = true;
            }
            Currency.currentCurrency = 'GBP';
            Currency.format = 'money_with_currency_format';
            Currency.convertAll = function(oldCurrency, newCurrency, selector, format = null) {
                                    var selectorDefault='span.money';
                                jQuery(selector || selectorDefault).each(function() {
                    // ignore parent in nested span.money
                    if (jQuery(this).find(selectorDefault).length > 0)
                        return;
                    // If the amount has already been converted, we leave it alone.
                    if (jQuery(this).attr('data-currency') === newCurrency)
                        return;
                    // If we are converting to a currency that we have saved, we will use the saved amount.
                    if (jQuery(this).attr('data-currency-'+newCurrency)) {
                        jQuery(this).html(jQuery(this).attr('data-currency-'+newCurrency));
                    } else {
                     // Converting to Y for the first time? Let's get to it!
                        var cents = 0.0;
                        var oldFormat = Currency.moneyFormats[oldCurrency][format || Currency.format] || '{{amount}}';
                        var newFormat = Currency.moneyFormats[newCurrency][format || Currency.format] || '{{amount}}';
                        if (typeof SECOMAPP.cs.customConvert === 'function' && jQuery(this).attr('data-org-price')) {
                            val = jQuery(this).attr('data-org-price');
                            var orgPrice = parseInt(val, 10);
                            if (typeof SECOMAPP.cs.customConvert === 'function') {
                                cents = SECOMAPP.cs.customConvert(orgPrice, shopCurrency, newCurrency);
                            } else {
                                cents = Currency.convert(orgPrice, shopCurrency, newCurrency);
                                
                            }
                        } else {
                            if (jQuery(this).attr('data-currency-'+oldCurrency)) {
                                var val = jQuery(this).attr('data-currency-'+oldCurrency);
                                val = val.replace(/&#\d+;/, '');
                            } else {
                                var val = jQuery(this).html();
                            }

                            if (oldFormat.indexOf('amount_no_decimals') !== -1) {
                                val = val.replace(/[^0-9]/g, '');
                                var orgPrice = parseInt(val, 10)*100;
                                if (typeof SECOMAPP.cs.customConvert === 'function') {
                                    cents = SECOMAPP.cs.customConvert(orgPrice, oldCurrency, newCurrency);
                                } else {
                                    cents = Currency.convert(orgPrice, oldCurrency, newCurrency);
                                   
                                }
                            } else {
                                if (oldFormat.indexOf('with_comma_separator') == -1) {
                                    var formatNoDots = oldFormat.split(".").length - 1;
                                    var valueNoDots = val.split(".").length - 1;
                                } else {
                                    var formatNoDots = oldFormat.split(",").length - 1;
                                    var valueNoDots = val.split(",").length - 1;
                                }
                                if (valueNoDots <= formatNoDots) {
                                    if (val.match(/<sup>\s*\d+\s*<\/sup>/)) {
                                        val = val.replace(/[^0-9]/g, '');
                                    } else {
                                        val = val.replace(/[^0-9]/g, '') + '00';
                                    }
                                } else {
                                    val = val.replace(/[^0-9]/g, '');
                                }
                                var orgPrice = parseInt(val, 10);
                                if (typeof SECOMAPP.cs.customConvert === 'function') {
                                    cents = SECOMAPP.cs.customConvert(orgPrice, oldCurrency, newCurrency);
                                } else {
                                    cents = Currency.convert(orgPrice, oldCurrency, newCurrency);
                                    
                                }
                            }
                        }
                        var newFormattedAmount = Currency.formatMoney(cents, newFormat, true);
                        if (! jQuery(this).attr('data-currency-'+shopCurrency) && oldCurrency === shopCurrency) {
                            jQuery(this).attr('data-currency-'+shopCurrency, jQuery(this).html());
                            jQuery(this).attr('data-org-price', orgPrice);
                        }
                        jQuery(this).html(newFormattedAmount);
                        jQuery(this).attr('data-currency-'+newCurrency, newFormattedAmount);
                    }
                    // We record the new currency locally.
                    jQuery(this).attr('data-currency', newCurrency);
                });
                this.currentCurrency = newCurrency;
                this.cookie.write(newCurrency);
            };

            Currency.format = 'money_format';
            Currency.shopCurrency = 'GBP';
            shopCurrency = 'GBP';
            window.shopCurrency = 'GBP';
            var shopCurrency = 'GBP';

            /*
             * Sometimes merchants change their shop currency, let's tell our JavaScript file
             */
            Currency.moneyFormats = {
                                                            GBP : {
                                                    money_format : '<span class=money>£{{amount}}</span>',
                            money_with_currency_format : '<span class=money>£{{amount}} GBP</span>'
                                                },
                                                  };

                                                                                                    
            /* Default currency */
            var defaultCurrency = 'GBP' || shopCurrency;

            /* Cookie currency */
            var cookieCurrency = Currency.cookie.read();

            if ((typeof Currency !== 'undefined') && (typeof Shopify.formatMoney !== 'undefined') && (SECOMAPP.cs.overrideShopifyFormatMoney !== true)) {
                SECOMAPP.cs.shopifyFormatMoney = Shopify.formatMoney;

                Shopify.formatMoney = function(cents, format, isConverting) {
                    var newFormat = Currency.moneyFormats[Currency.currentCurrency][Currency.format] || '{{amount}}';
                    if (newFormat.indexOf("span") == -1 && newFormat.indexOf("money") == -1 && !isConverting) {
                        newFormat = '<span class=money>' + newFormat + '</span>';
                    }
                    if (typeof SECOMAPP.cs.customConvert === 'function') {
                        var newCents = SECOMAPP.cs.customConvert(cents, Currency.shopCurrency, Currency.currentCurrency);
                    } else {
                        var newCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);

                    }
                    if (Currency.shopCurrency != Currency.currentCurrency && !isConverting) {
                        if (newFormat.indexOf('data-currency') == -1) {
                            newFormat = newFormat.replace('<span ', '<span data-currency="' + Currency.currentCurrency + '" ');
                        }
                        // add original amount
                        if (typeof SECOMAPP.cs.customConvert === 'function') {
                            var orgCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                            if (newCents != orgCents) {
                                newFormat = newFormat.replace('<span ', '<span data-org-price="' + cents + '" ');
                            }
                        }
                    }
                    
                    return Currency.formatMoney(newCents, newFormat);
                };

                SECOMAPP.cs.overrideShopifyFormatMoney = true;
            }

            if ((typeof Currency !== 'undefined') && (typeof Shopify.api !== 'undefined') && (typeof Shopify.api.formatMoney !== 'undefined') && (SECOMAPP.cs.overrideShopifyApiFormatMoney !== true)) {
                SECOMAPP.cs.shopifyApiFormatMoney = Shopify.formatMoney;

                Shopify.api.formatMoney = function(cents, format, isConverting) {
                    var newFormat = Currency.moneyFormats[Currency.currentCurrency][Currency.format] || '{{amount}}';
                    if (newFormat.indexOf("span") == -1 && newFormat.indexOf("money") == -1 && !isConverting) {
                        newFormat = '<span class=money>' + newFormat + '</span>';
                    }
                    if (typeof SECOMAPP.cs.customConvert === 'function') {
                        var newCents = SECOMAPP.cs.customConvert(cents, Currency.shopCurrency, Currency.currentCurrency);
                    } else {
                        var newCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                    }
                    if (Currency.shopCurrency != Currency.currentCurrency && !isConverting) {
                        if (newFormat.indexOf('data-currency') == -1) {
                            newFormat = newFormat.replace('<span ', '<span data-currency="' + Currency.currentCurrency + '" ');
                        }
                        // add original amount
                        if (typeof SECOMAPP.cs.customConvert === 'function') {
                            var orgCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                            if (newCents != orgCents) {
                                newFormat = newFormat.replace('<span ', '<span data-org-price="' + cents + '" ');
                            }
                        }
                    }
                    
                    return Currency.formatMoney(newCents, newFormat);
                };

                SECOMAPP.cs.overrideShopifyApiFormatMoney = true;
            }

            if ((typeof Currency !== 'undefined') && (typeof currency !== 'undefined') && (typeof currency.formatMoney !== 'undefined') && (SECOMAPP.cs.overrideCurrency2FormatMoney !== true)) {
                SECOMAPP.cs.currency2FormatMoney = currency.formatMoney;

                currency.formatMoney = function(cents, format, isConverting) {
                    var newFormat = Currency.moneyFormats[Currency.currentCurrency][Currency.format] || '{{amount}}';
                    if (newFormat.indexOf("span") == -1 && newFormat.indexOf("money") == -1 && !isConverting) {
                        newFormat = '<span class=money>' + newFormat + '</span>';
                    }
                    if (typeof SECOMAPP.cs.customConvert === 'function') {
                        var newCents = SECOMAPP.cs.customConvert(cents, Currency.shopCurrency, Currency.currentCurrency);
                    } else {
                        var newCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                    }
                    if (Currency.shopCurrency != Currency.currentCurrency && !isConverting) {
                        if (newFormat.indexOf('data-currency') == -1) {
                            newFormat = newFormat.replace('<span ', '<span data-currency="' + Currency.currentCurrency + '" ');
                        }
                        // add original amount
                        if (typeof SECOMAPP.cs.customConvert === 'function') {
                            var orgCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                            if (newCents != orgCents) {
                                newFormat = newFormat.replace('<span ', '<span data-org-price="' + cents + '" ');
                            }
                        }
                    }
                    
                    return Currency.formatMoney(newCents, newFormat);
                };

                SECOMAPP.cs.overrideCurrency2FormatMoney = true;
            }

            if ((typeof Currency !== 'undefined') && (typeof theme !== 'undefined') && (typeof theme.Currency !== 'undefined') && (typeof theme.Currency.formatMoney !== 'undefined') && (SECOMAPP.cs.overrideThemeCurrencyFormatMoney !== true)) {
                SECOMAPP.cs.themeCurrencyFormatMoney = theme.Currency.formatMoney;

                theme.Currency.formatMoney = function(cents, format, isConverting) {
                    var newFormat = Currency.moneyFormats[Currency.currentCurrency][Currency.format] || '{{amount}}';
                    if (newFormat.indexOf("span") == -1 && newFormat.indexOf("money") == -1 && !isConverting) {
                        newFormat = '<span class=money>' + newFormat + '</span>';
                    }
                    if (typeof SECOMAPP.cs.customConvert === 'function') {
                        var newCents = SECOMAPP.cs.customConvert (cents, Currency.shopCurrency, Currency.currentCurrency);
                    } else {
                        var newCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                    }
                    if (Currency.shopCurrency != Currency.currentCurrency && !isConverting) {
                        if (newFormat.indexOf('data-currency') == -1) {
                            newFormat = newFormat.replace('<span ', '<span data-currency="' + Currency.currentCurrency + '" ');
                        }
                        // add original amount
                        if (typeof SECOMAPP.cs.customConvert === 'function') {
                            var orgCents = Currency.convert(cents, Currency.shopCurrency, Currency.currentCurrency);
                            if (newCents != orgCents) {
                                newFormat = newFormat.replace('<span ', '<span data-org-price="' + cents + '" ');
                            }
                        }
                    }
                    
                    return Currency.formatMoney(newCents, newFormat);
                };

                SECOMAPP.cs.overrideThemeCurrencyFormatMoney = true;
            }

            SECOMAPP.csCookie = {
        configuration: {
            expires: 365,
            path: '/',
            domain: window.location.hostname
        },
        name: 'scm_currency_app',
        count: 'scm_currency_count',
        isInstalled: function() {
            var count = SECOMAPP.cookie(this.count);
            if (! count) count = 0;
            count++;
            SECOMAPP.cookie(this.count, count, this.configuration);

            var scripts = document.head.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; ++i) {
                if(scripts[i].innerText.indexOf('asyncLoad') >= 0 && scripts[i].innerText.indexOf("secomapp.com\\/currency_switcher") >= 0) {
                    console.log('already has scripttag, load CS');
                    return true;
                }
            }

            return SECOMAPP.cookie(this.name) === "installed" && count < 3;
        },
    };

    if (! SECOMAPP.csCookie.isInstalled()) {
        return;
    }
    if (SECOMAPP.cs.loadedApp === true) {
        return;
    }

            /* Fix for customer account pages */
            jQuery('span.money span.money').each(function() {
                jQuery(this).parents('span.money').removeClass('money');
            });

            /* Saving the current price */
            jQuery('span.money').each(function() {
                jQuery(this).attr('data-currency-GBP', jQuery(this).html());
            });

            // *********************************************************//
                                            // If there's no cookie.
if (cookieCurrency == null) {
            var countryCurrencyMap = {
                            "GS":"GBP",
                            "GB":"GBP",
                            "JE":"GBP",
                            "IM":"GBP",
                            "SH":"GBP",
                    };
        if (window.location.protocol === "https:") {
            
                
                    
                    
                        
                        
                    
                        
                    
                
            
                jQuery.getJSON('//geoip.secomtech.com/?json', function(location) {
                    if(location.country_code){
                        var myCurrency = countryCurrencyMap[location.country_code];
                        if(myCurrency){
                            Currency.convertAll(shopCurrency, myCurrency);
                                jQuery('[name=currencies]').val(myCurrency);
    jQuery('[name=currencies]').change();
            jQuery('.cs-placeholder').text(jQuery('.cs-options li.flag-' + Currency.currentCurrency + ' span').first().text());
        jQuery('.cs-placeholder').removeClass("flag-" + Currency.shopCurrency).addClass("flag-" + Currency.currentCurrency);
    
    if (Currency.currentCurrency !== defaultCurrency) {
        jQuery('.scm-currency-cart').show();
        jQuery('.selected-currency').text(Currency.currentCurrency);
        jQuery('body').attr('data-current',Currency.currentCurrency);
    } else {
        jQuery('.scm-currency-cart').hide();
        jQuery('body').attr('data-current',Currency.currentCurrency);
    }
                        } else {
                            Currency.cookie.write(shopCurrency);
                        }
                    }
                });
            
        } else {
            jQuery.getJSON('http://ipinfo.io', function(location) {
                if(location.country){
                    var myCurrency = countryCurrencyMap[location.country];
                    if(myCurrency){
                        Currency.convertAll(shopCurrency, myCurrency);
                            jQuery('[name=currencies]').val(myCurrency);
    jQuery('[name=currencies]').change();
            jQuery('.cs-placeholder').text(jQuery('.cs-options li.flag-' + Currency.currentCurrency + ' span').first().text());
        jQuery('.cs-placeholder').removeClass("flag-" + Currency.shopCurrency).addClass("flag-" + Currency.currentCurrency);
    
    if (Currency.currentCurrency !== defaultCurrency) {
        jQuery('.scm-currency-cart').show();
        jQuery('.selected-currency').text(Currency.currentCurrency);
        jQuery('body').attr('data-current',Currency.currentCurrency);
    } else {
        jQuery('.scm-currency-cart').hide();
        jQuery('body').attr('data-current',Currency.currentCurrency);
    }
                    } else {
                        Currency.cookie.write(shopCurrency);
                    }
                }
            });
        }
    } else if (!cookieCurrency || (jQuery('[name=currencies]').length && jQuery('[name=currencies] option[value=' + cookieCurrency + ']').length === 0)) {
    // If the cookie value does not correspond to any value in the currency dropdown.
    Currency.currentCurrency = shopCurrency;
    Currency.cookie.write(shopCurrency);
} else if (cookieCurrency === shopCurrency) {
    Currency.currentCurrency = shopCurrency;
} else {
    Currency.convertAll(shopCurrency, cookieCurrency);
    if (Currency.currentCurrency !== defaultCurrency) {
        jQuery('.scm-currency-cart').show();
        jQuery('.selected-currency').text(Currency.currentCurrency);
    } else {
        jQuery('.scm-currency-cart').hide();
    }
}

    var original_selectCallback = window.selectCallback;
    var selectCallback = function(variant, selector) {
        original_selectCallback(variant, selector);
        Currency.convertAll(shopCurrency, jQuery('[name=currencies]').val());
        jQuery('[name=currencies]').val(Currency.currentCurrency);
        jQuery('[name=currencies]').change();
                    jQuery('.cs-placeholder').text(jQuery('.cs-options li.flag-' + Currency.currentCurrency + ' span').first().text());
            jQuery('.cs-placeholder').removeClass("flag-" + shopCurrency).addClass("flag-" + Currency.currentCurrency);
        
        if (Currency.currentCurrency !== defaultCurrency) {
            jQuery('.scm-currency-cart').show();
            jQuery('.selected-currency').text(Currency.currentCurrency);
            jQuery('body').attr('data-current',Currency.currentCurrency);
        } else {
            jQuery('.scm-currency-cart').hide();
            jQuery('body').attr('data-current',Currency.currentCurrency);
        }
    };

    [].slice.call( document.querySelectorAll( '[name=currencies]' ) ).forEach( function(el) {
        new SelectFx(el, {
            onChange: function(newCurrency) {
                                    jQuery('span.cs-placeholder').removeClass("flag-" + Currency.currentCurrency);
                    jQuery('.cs-placeholder').text(jQuery('.cs-options li.flag-' + Currency.currentCurrency + ' span').first().text());
                                Currency.convertAll(Currency.currentCurrency, newCurrency);
                jQuery('[name=currencies]').val(Currency.currentCurrency);
                jQuery('[name=currencies]').change();
                                    jQuery('.cs-placeholder').addClass("flag-" + Currency.currentCurrency);
                    jQuery('.cs-placeholder').text(jQuery('.cs-options li.flag-' + Currency.currentCurrency + ' span').first().text());
                
                if (Currency.currentCurrency !== defaultCurrency) {
                    jQuery('.scm-currency-cart').show();
                    jQuery('.selected-currency').text(Currency.currentCurrency);
                    jQuery('body').attr('data-current',Currency.currentCurrency);
                } else {
                    jQuery('.scm-currency-cart').hide();
                    jQuery('body').attr('data-current',Currency.currentCurrency);
                }
            }
        });
    } );

    jQuery(document).ajaxSuccess(function() {
        if (Currency.currentCurrency != shopCurrency) {
            Currency.convertAll(shopCurrency, Currency.currentCurrency);
            jQuery('.scm-currency-cart').show();
            jQuery('.selected-currency').text(Currency.currentCurrency);
            jQuery('body').attr('data-current',Currency.currentCurrency);
        } else {
            jQuery('.scm-currency-cart').hide();
            jQuery('body').attr('data-current',Currency.currentCurrency);
        }
    });

    jQuery('[name=currencies]').val(Currency.currentCurrency);
    jQuery('[name=currencies]').change();
            jQuery('.cs-placeholder').addClass("flag-" + Currency.currentCurrency);
        jQuery('.cs-placeholder').text(jQuery('.cs-options li.flag-' + Currency.currentCurrency + ' span').first().text());
    
    if (Currency.currentCurrency !== defaultCurrency) {
        jQuery('.scm-currency-cart').show();
        jQuery('.selected-currency').text(Currency.currentCurrency);
        jQuery('body').attr('data-current',Currency.currentCurrency);
    } else {
        jQuery('.scm-currency-cart').hide();
        jQuery('body').attr('data-current',Currency.currentCurrency);
    }
                                        // *********************************************************//

            SECOMAPP.cs.loadedApp = true;
        };
        var SECOMAPP = SECOMAPP || new Object();
    SECOMAPP.cs = SECOMAPP.cs || new Object();
    if ((typeof jQuery === 'undefined')) {
        scmLoadScript('//code.jquery.com/jquery-1.11.1.min.js', function() {
            SECOMAPP.jQuery = jQuery.noConflict(true);
            SECOMAPP.jQuery(document).ready(function() {
                SECOMAPP.jQuery.ajaxSetup({async:false});
                SECOMAPP.jQuery.getScript('https://d3f0kqa8h3si01.cloudfront.net/scripts/currencies.js', function() {
                    SECOMAPP.cs.jQuery = SECOMAPP.jQuery;
                    SECOMAPP.cs.loadedJs = true;
                    startCurrencySwitcher(SECOMAPP.jQuery);
                });
                SECOMAPP.jQuery.ajaxSetup({async:true});
            });
        });
    } else {
        jQuery(document).ready(function() {
            jQuery.ajaxSetup({async:false});
            jQuery.getScript('https://d3f0kqa8h3si01.cloudfront.net/scripts/currencies.js', function() {
                SECOMAPP.cs.jQuery = jQuery;
                SECOMAPP.cs.loadedJs = true;
                startCurrencySwitcher(jQuery);
            });
            jQuery.ajaxSetup({async:true});
        });
    }
    