//--------BROWSER DETECT------------------------------------------------------------------------------------------------------

var BrowserDetect = {

    init:function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },

    searchString:function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },

    searchVersion:function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },

    dataBrowser:[
        {
            string:navigator.userAgent,
            subString:"Chrome",
            identity:"Chrome"
        },
        {     string:navigator.userAgent,
            subString:"OmniWeb",
            versionSearch:"OmniWeb/",
            identity:"OmniWeb"
        },
        {
            string:navigator.vendor,
            subString:"Apple",
            identity:"Safari",
            versionSearch:"Version"
        },
        {
            prop:window.opera,
            identity:"Opera"
        },
        {
            string:navigator.vendor,
            subString:"iCab",
            identity:"iCab"
        },
        {
            string:navigator.vendor,
            subString:"KDE",
            identity:"Konqueror"
        },
        {
            string:navigator.userAgent,
            subString:"Firefox",
            identity:"Firefox"
        },
        {
            string:navigator.vendor,
            subString:"Camino",
            identity:"Camino"
        },
        {        // for newer Netscapes (6+)
            string:navigator.userAgent,
            subString:"Netscape",
            identity:"Netscape"
        },
        {
            string:navigator.userAgent,
            subString:"MSIE",
            identity:"Explorer",
            versionSearch:"MSIE"
        },
        {
            string:navigator.userAgent,
            subString:"Gecko",
            identity:"Mozilla",
            versionSearch:"rv"
        },
        {         // for older Netscapes (4-)
            string:navigator.userAgent,
            subString:"Mozilla",
            identity:"Netscape",
            versionSearch:"Mozilla"
        }
    ],

    dataOS:[
        {
            string:navigator.platform,
            subString:"Win",
            identity:"Windows"
        },
        {
            string:navigator.platform,
            subString:"Mac",
            identity:"Mac"
        },
        {
            string:navigator.userAgent,
            subString:"iPhone",
            identity:"iPhone/iPod"
        },
        {
            string:navigator.platform,
            subString:"Linux",
            identity:"Linux"
        }
    ]

};
BrowserDetect.init();

//-----------------------------------------------------------------------------------------------------------

// Windows Position
/*
 * jQuery Plugin by Outmind Design Studio
 * Copyright (C) 2012 Outmind Design Studio
 * www.outmind-design.com
 */

function getreal() {
    var wndw = $("[class^='window_']");
    if (!wndw.is(':visible')) {
        wndw.css({ display:'block', top:-2000 });
        wndw.each(function () {
            realH = $(this).outerHeight();
            $(this).css({height:$(this).outerHeight() });
        });
        wndw.css({ display:'none' });
    }

    else {
        wndw.each(function () {
            realH = $(this).outerHeight();
            $(this).css({height:$(this).outerHeight() });
        });
    }
}

function windw() {
    var fader = $("#fader");
    bodyH = document.body.clientHeight;
    windowH = window.innerHeight;

    if (windowH <= bodyH) {
        fader.css({ height:bodyH });
    }
    else {
        fader.css({ height:windowH });
    }

    var wndw = $("[class^='window_']");
    wndw.each(function () {
        wndwH = wndw.offsetHeight;
        wndwMrgn = $(this).outerHeight() / 2;

        if (($(this).outerHeight() + 40) > windowH) {
            $(this).css({ position:'absolute', top:0, marginTop:40 });
        }

        else {
            $(this).css({ position:'fixed', top:'50%', marginTop:-wndwMrgn });
        }
    });
}

$(document).ready(function () {
    $(window).resize(function () {
        windw();
    });

    getreal();
    windw();


});

// Many Windows
/*
 * jQuery Plugin by Outmind Design Studio
 * Copyright (C) 2012 Outmind Design Studio
 * www.outmind-design.com
 */

jQuery(function () {
    var selectorToShow = jQuery.cookie('selectorToShow');
    (selectorToShow != null && selectorToShow !== '') ? jQuery(selectorToShow).show() : jQuery.cookie('selectorToShow', '');
    jQuery("[class^='button_'],[class*=' button_']").click(function () {
        jQuery('#fader').fadeIn(500);
        var selectors = [];
        var arrayClass = jQuery(this).attr('class').split(" ");
        for (var i = 0, length = arrayClass.length; i < length; i++) {
            var currClass = arrayClass[i];
            if (currClass.indexOf("button_") != -1) {
                selectors.push(".window_" + currClass.split("_")[1]);
            }
        }
        selectors.push('#fader');
        //console.log(selectors.toString());
        jQuery.cookie('selectorToShow', selectors.toString());
        jQuery(selectors.toString()).fadeIn(500);
        return false;
    });
});

jQuery(function () {
    jQuery('.close_bttn').click(function () {
        jQuery.cookie('selectorToShow', '');
        jQuery(this).parent().fadeOut(500);
        jQuery("#fader").fadeOut(500);
    });

    jQuery('#fader').click(function () {
        jQuery('.close_bttn').click();
        jQuery(this).fadeOut(500);
    });

});

//jQuery(function () { //special
//
//    var tempWindow = jQuery('.firstload');
//
//    //console.log('onreadyDOM...');
//
//    var myWindowTemp = jQuery.cookie('myWindowTemp');
//    //    (myWindowTemp == null) ? jQuery('.firstload, #fader_temp').show() : jQuery.cookie('selectorToShow', '1');
//
//    if (!myWindowTemp) {
//        jQuery('.firstload, #fader_temp').show()
//    } else {
//        jQuery.cookie('myWindowTemp', '1', { expires:365 });
//        //jQuery('a.jp-play').click();
//        //console.log('play...');
//        //jQuery('#btnYES').click();
//        jQuery('#jquery_jplayer_1').jPlayer("play");
//    }
//
//    jQuery('#btnNO, #btnYES, .close_bttn_temp, #fader_temp').click(function () {
//        if (jQuery(this).attr("id") === 'btnYES') {
//            $('a.jp-play').click();
//        }
//
//        jQuery.cookie('myWindowTemp', '1', { expires:365 });
//
//        tempWindow.fadeOut(500);
//        jQuery("#fader_temp").fadeOut(500);
//    });
//
//});


/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


// Pagination Script
/*
 * jQuery Plugin by Outmind Design Studio
 * Copyright (C) 2012 Outmind Design Studio
 * www.outmind-design.com
 */

jQuery(function () {

    var divContentItem = jQuery('div.content_item')[0];

    if (divContentItem) {

        var divContentCollection = jQuery('div.content_block');

        if (divContentCollection.size() != 0) {

            var pag = document.createElement('ul');
            pag.id = "pagination";
            divContentItem.appendChild(pag);

            var buttonsArray = new Array();
            var col = divContentCollection.size();

            for (var i = 0; i < col; i++) {
                var li = document.createElement('li');
                li.className = 'bttn';
                var txt = document.createTextNode(i + 1);
                li.appendChild(txt);
                pag.appendChild(li);
                buttonsArray.push(li);
            }

            jQuery(buttonsArray).each(function (index) {
                var button = jQuery(this);

                button.click(function () {

                    if (!jQuery(this).hasClass('current')) {
                        jQuery(pag).hide();
                        jQuery(this).addClass('current').siblings('.current').removeClass('current');
                        jQuery('div.current').hide().removeClass('current');
                        jQuery(divContentCollection[index]).addClass('current').fadeIn(300, function () {
                            jQuery(pag).fadeIn(100);
                        });
                    }

                    return false;

                });
            });

            //show first button and first block
            jQuery(divContentCollection.get(0)).addClass('current').show();
            jQuery(buttonsArray[0]).addClass('current').show();
        }

    }

});

// Slider Script
/*
 * jQuery Plugin by Outmind Design Studio
 * Copyright (C) 2012 Outmind Design Studio
 * www.outmind-design.com
 */

jQuery(function () {

    var divSlideshow = jQuery('div.slide_show')[0];

    if (divSlideshow) {

        var divContentCollection = jQuery('div.slide');

        if (divContentCollection.size() != 0) {

            var pag = document.createElement('ul');
            pag.id = "pagination2";
            divSlideshow.appendChild(pag);

            var buttonsArray = new Array();
            var col = divContentCollection.size();

            for (var i = 0; i < col; i++) {
                var li = document.createElement('li');
                li.className = 'bttn2';
                var txt = document.createTextNode(i + 1);
                li.appendChild(txt);
                pag.appendChild(li);
                buttonsArray.push(li);
            }

            jQuery(buttonsArray).each(function (index) {
                var button = jQuery(this);

                button.click(function () {

                    if (!jQuery(this).hasClass('current2')) {
                        jQuery(pag).hide();
                        jQuery(this).addClass('current2').siblings('.current2').removeClass('current2');
                        jQuery('div.current2').hide().removeClass('current2');
                        jQuery(divContentCollection[index]).addClass('current2').fadeIn(500);
                        jQuery(pag).fadeIn(0);
                    }

                    return false;

                });
            });

            //show first button and first block
            jQuery(divContentCollection.get(0)).addClass('current2').show();
            jQuery(buttonsArray[0]).addClass('current2').show();

            //if divContentCollection.size() != 0 ...
            var counter = 0;//counter
            function showPagerSlideShow() { //function for interval
                $(buttonsArray[counter]).click();
                counter == buttonsArray.length - 1 ? counter = 0 : counter++;
            }

            if ($(buttonsArray[0]).parent().parent().hasClass('slideshow')) {
                var timer = setInterval(showPagerSlideShow, 5000); //interval + function
            }

            function abortTimer() { // to be called when you want to stop the timer
                clearInterval(timer);
            }
        }

    }

});

