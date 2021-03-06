var carousel = function (t, i) {
    "undefined" == typeof i && (i = 0),
        this.obj = $(t),
        this.autoscrolldelay = i,
        $(this.obj).find(".carousel-button-left").on("click", this.left.bind(this)),
        $(this.obj).find(".carousel-button-right").on("click", this.right.bind(this)),
        $(this.obj).on("mouseenter",
            this.mousein.bind(this)),
        $(this.obj).on("mouseleave", this.mouseout.bind(this)),
        i && (this.interval = window.setInterval(this.right.bind(this), i)),
        $(this.obj).find(".carousel-items").css("height", function () {
            var t = 0;
            return $(this).children().each(function () {
                t = Math.max(t, $(this).height())
            }),
                t
        })
};

carousel.prototype = {
    obj: null,
    interval: null,
    scrollSpeed: 200,
    stop: !1,
    mousein: function () {
        window.clearTimeout(this.interval)
    },
    mouseout: function () {
        this.autoscrolldelay && (this.interval = window.setInterval(this.right.bind(this),
            this.autoscrolldelay))
    },
    left: function () {
        if (!this.stop) {
            this.stop = !0;
            var t = $(this.obj).find(".carousel-block").outerWidth();
            $(this.obj).find(".carousel-items .carousel-block").eq(-1).prependTo($(this.obj).find(".carousel-items")),
                $(this.obj).find(".carousel-items").css({ left: "-" + t + "px" }),
                $(this.obj).find(".carousel-items").animate({ left: "0px" },
                    this.scrollSpeed,
                    function () {
                        this.stop = !1
                    }.
                        bind(this))
        }
    },
    right: function () {
        if (!this.stop) {
            this.stop = !0;
            var t = $(this.obj).find(".carousel-block").outerWidth();
            $(this.obj).find(".carousel-items").animate({ left: "-" + t + "px" },
                this.scrollSpeed,
                function () {
                    $(this.obj).find(".carousel-items .carousel-block").eq(0).appendTo($(this.obj).find(".carousel-items")),
                        $(this.obj).find(".carousel-items").css({ left: "0px" }),
                        this.stop = !1
                }.bind(this))
        }
    }
};