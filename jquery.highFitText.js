(function(){

/*!
 * HighFitText.js 1.0
 *
 * Copyright (c) 2014 René Peschmann
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Date: 2014-02-06
 */

/**
 * HighFitText finds the best font-size of a text inside a container, that it "perfectly" fits.
 *
 * @example $('h1').highFitText()
 *
 * @param maxFontSize maximal font size in pixel
 * @param minFontSize minimal font size in pixel
 * @param sufficeAbsRange tolerance in pixel of the width differs to the container width
 * @param maxWidth the width that is optimal (default: parent container width)
 *
 * The idea is to (binary) search for the best font-size without user attention.
 */
var init = (function($){
    $.fn.highFitText = function( options ) {

        // setup
        var MIN_FS = 1.5,             // minimal font size [configurable setting]
            MAX_FS = 9362,            // maximal font size [configurable setting]
            SUFFICE_ABS_RANGE = 2,    // stop, if it is only this width away from optimal size [configurable setting]
            BEST_MAX_FS = 250;        // best max font size

        // options, arrangements and backup
        var $this = $(this), low, high, ref, mid, endSize,
            getCan, $innerCan;
        var oldPos = $this.css("position"),
            oldLeft = $this.css("left"),
            settings = $.extend({
                'maxFontSize' : BEST_MAX_FS,
                'minFontSize' : MIN_FS,
                'sufficeAbsRange': SUFFICE_ABS_RANGE,
                'maxWidth': $this.width()
            }, options);
        settings.sufficeAbsRange = isNaN(ref = parseFloat(settings.sufficeAbsRange)) ? SUFFICE_ABS_RANGE : Math.max(0, ref);
        settings.maxWidth = isNaN(ref = parseFloat(settings.maxWidth)) ? $this.width() : ref;
        low = endSize = isNaN(ref = Math.max(MIN_FS, settings.minFontSize)) ? MIN_FS : ref;
        high = isNaN(ref = Math.max(settings.minFontSize, Math.min(settings.maxFontSize, MAX_FS))) ? BEST_MAX_FS : ref;
        $this.css({position: "relative", left: -29999});

        // we need an inner container to measure the size
        getCan = function(){
            return $this.children('div[data-highfittext="1"]');
        };
        $innerCan = getCan();
        if($innerCan.length < 1) {
            $this.wrapInner('<div style="display:inline-block;" data-highfittext="1"></div>');
            $innerCan = getCan();
        }

        // calculations
        var rounds = Math.ceil(Math.log(high) / Math.log(2));

        while(rounds-- > 0) {
            if(low < high) {
                mid = (low + high) / 2;
                $innerCan.css("font-size", mid);
                if($innerCan.width() < settings.maxWidth) {
                    endSize = mid;
                    if($innerCan.width() < settings.maxWidth - settings.sufficeAbsRange) {
                        low = mid;
                    } else break;
                } else {
                    high = mid;
                }
            } else break;
        }

        // reload and finish
        $innerCan.css("font-size", endSize);
        $this.css({"position": oldPos, "left": oldLeft});

    };
});

// requireJS module definition
if(typeof window.define === 'function' && window.define.amd) {
    window.define(function(){init(jQuery)});
} else {
    init(jQuery);
}

})();