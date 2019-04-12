/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var Dx1SlideshowView = /** @class */ (function () {
    function Dx1SlideshowView() {
    }
    Dx1SlideshowView.prototype.loadSettingsFromJson = function (slideshowInstanceId) {
        var json = $("[data-slideshow-setting-id=\"" + slideshowInstanceId + "\"]").html();
        return JSON.parse(json);
    };
    Dx1SlideshowView.prototype.calculateSlideshowDimensions = function (slideshowInstanceId) {
        var $slideshowRoot = $("div[data-slideshow-instance-id=\"" + slideshowInstanceId + "\"]");
        var settings = this.loadSettingsFromJson(slideshowInstanceId);
        var width = $slideshowRoot.width();
        var height = width < settings.Width ? width / settings.Width * settings.Height : settings.Height;
        $slideshowRoot.find(".slick-list").css("height", height + "px");
    };
    Dx1SlideshowView.prototype.initWindowResizeEvent = function (slideshowInstanceId) {
        var _this = this;
        $(window).on("resize", function () {
            if (_this.resizeTimeoutId) {
                clearTimeout(_this.resizeTimeoutId);
            }
            _this.resizeTimeoutId = setTimeout(function () {
                _this.calculateSlideshowDimensions(slideshowInstanceId);
                _this.resizeTimeoutId = null;
            }, 250);
        });
    };
    Dx1SlideshowView.prototype.initSlideshow = function (slideshowInstanceId) {
        var _this = this;
        var $slideshowRoot = $("div[data-slideshow-instance-id=\"" + slideshowInstanceId + "\"]");
        var settings = this.loadSettingsFromJson(slideshowInstanceId);
        $slideshowRoot.css("display", "block")
            .css("max-width", settings.Width + "px")
            .css("max-height", settings.Height + "px");
        $slideshowRoot.on("init", function () {
            _this.calculateSlideshowDimensions(slideshowInstanceId);
            _this.initWindowResizeEvent(slideshowInstanceId);
        });
        $slideshowRoot.slick({
            lazyLoad: 'progressive',
            infinite: true,
            pauseOnFocus: false,
            cssEase: 'linear',
            pauseOnHover: true,
            initialSlide: 0,
            dots: settings.IsDisplayBullet,
            arrows: settings.IsDisplayArrow,
            autoplay: settings.IsAutoPlay,
            autoplaySpeed: settings.SlideDisplayDuration * 1000,
            speed: settings.SlideSpeed * 1000,
            fade: settings.TransitionStyleCode === "FADE"
        });
    };
    Dx1SlideshowView.prototype.init = function (slideshowInstanceId) {
        this.initSlideshow(slideshowInstanceId);
    };
    return Dx1SlideshowView;
}());
//# sourceMappingURL=Dx1SlideshowView.js.map
;;;