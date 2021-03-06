function touchDevices() {
    if (isTouchSupported()) {
        $("body").addClass("touch-device")
    } else {
        $(".videobg-fallback").on("click", function(e) {
            e.preventDefault();
            return false
        })
    }
}

function videobg() {
    $(".owl-videobg").owlVideoBg({
        autoGenerate: {
            posterImageFormat: "png"
        },
        preload: "auto"
    })
}

function setMinHeight() {
    var e = $(".page-wrapper");
    if (e.parents("#main-content.abs").length == 0) {
        e.css("min-height", $(window).height())
    }
}

function centerIt(e, t, n) {
    if (n == undefined) {
        n = 100
    }
    if (t == "parent") {
        t = e.parents().height()
    }
    var r = e.height(),
        i;
    if (t - r > 2 * n) {
        i = (t - r) / 2
    } else {
        i = n
    }
    e.css("margin-top", i)
}

function inviewAnimate(e) {
    e.each(function() {
        $(this).bind("inview", function(e, t, n, r) {
            var i = $(this);
            if (t) {
                i.addClass("visible-view");
                i.unbind("inview");
                if (r == "top") {
                    i.addClass("visible-view");
                    i.unbind("inview")
                }
            }
        })
    })
}

function setBg(e) {
    e.each(function() {
        var e = $(this);
        var t = e.find("img").first();
        e.css({
            background: "url(" + t.attr("src") + ") no-repeat 50% 50%",
            "background-size": "cover"
        });
        t.hide()
    })
}

function syncWidth(e, t) {
    e.css("width", t.width());
    $(window).on("debouncedresize", function() {
        syncWidth(e, t)
    })
}

function submitContact() {
    var e = $("form#contact-form");
    e.submit(function(t) {
        t.preventDefault();
        if ($("#alert-wrapper").length) {
            return false
        }
        var n = $('<div id="alert-wrapper"><button type="button" class="close" data-dismiss="alert">X</div>').appendTo(e);
        $("form#contact-form .alert").remove();
        var r = false,
            i = false;
        e.find(".requiredField").each(function() {
            if ($.trim($(this).val()) == "") {
                var e = $(this).attr("placeholder");
                n.append('<div class="alert">You forgot to enter your ' + e + ".</div>");
                r = true
            } else if ($(this).hasClass("email")) {
                var t = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!t.test($.trim($(this).val()))) {
                    var e = $(this).attr("placeholder");
                    n.append('<div class="alert"> You\'ve entered an invalid ' + e + ".</div>");
                    r = true
                }
            }
        });
        var s = new TimelineLite({
            paused: true
        });
        hideAlert = new TimelineLite({
            paused: true
        });
        s.to(n, .3, {
            opacity: 1,
            top: "30%"
        });
        hideAlert.to(n, .3, {
            opacity: 0,
            top: "60%",
            onComplete: function() {
                n.remove()
            }
        });
        if (r) {
            s.play();
            n.find("button").on("click", function() {
                hideAlert.play()
            })
        } else {
            var o = $(this).serialize();
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                dataType: "json",
                data: o,
                success: function(t) {
                    if (t.status == "error") {
                        i = true;
                        e.append('<div class="alert"><strong>Sorry</strong> There was an error sending your message!</div>')
                    } else if (t.status == "ok") {
                        e.slideUp(300, function() {
                            $(this).before('<div class="alert"><strong>Thanks</strong> Your email has been delivered. </div>')
                        })
                    }
                },
                error: function() {
                    i = true;
                    $("form#contact-form").append('<div class="alert"><strong>Sorry</strong> There was an error sending your message!</div>')
                }
            })
        }
        if (i) {
            s.play();
            n.find("button").on("click", function() {
                hideAlert.play()
            })
        }
        return false
    })
}

function isTouchSupported() {
    var e = window.navigator.msMaxTouchPoints;
    var t = "ontouchstart" in document.createElement("div");
    if (e || t) {
        return true
    }
    return false
}
$(document).ready(function() {
    "use strict";
    var e = false;
    $.ajaxSetup({
        cache: false
    });
    $(".kb-slider").kenburnIt();
    $(".vertical-carousel").DoubleCarousel();
    $("body").on("click", ".back-to-top", function() {
        TweenMax.to($("html, body"), .5, {
            scrollTop: 0,
            ease: Power2.easeOut
        });
        return false
    });
    if (e) {
        $.Isotope.prototype._positionAbs = function(e, t) {
            return {
                right: e,
                top: t
            }
        }
    }
    var t = {
        init: function() {
            this.scrollElems = $(".tj-parallax"), this.scrollWrappers = $(window);
            this.parallaxIt()
        },
        parallaxIt: function() {
            var e = this.scrollElems;
            var t = this.scrollElems.parent(".parallax-parent").height(),
                n = parseInt(this.scrollElems.css("bottom")),
                r = parseInt(this.scrollElems.css("opacity")),
                i, s, o, u;
            this.scrollWrappers.scroll(function() {
                i = $(this).scrollTop();
                o = -(n / t) * i + n;
                u = -(r / t) * i + r;
                s = {
                    bottom: o,
                    opacity: u
                };
                TweenMax.to(e, .2, s)
            })
        }
    };
    var n, r = {
        settings: {
            $sidebar: $("div#side-bar"),
            $sideContents: $("#side-contents"),
            $menuToggle: $("#menu-toggle-wrapper"),
            $sideFooter: $("div#side-footer"),
            $innerBar: $("#inner-bar"),
            $main: $("div#main-content, .page-side"),
            $navigation: $("#navigation"),
            $exteras: $(".move-with-js"),
            sideFlag: false,
            menuFlag: false,
            mobileFlag: false,
            showSide: $("body").hasClass("show-sidebar")
        },
        init: function() {
            n = this.settings;
            this.prepare();
            this.bindUiActions();
            if (!isTouchSupported()) {
                n.$sidebar.find(".inner-wrapper").niceScroll({
                    horizrailenabled: false
                })
            }
            this.setMobileFlag()
        },
        bindUiActions: function() {
            var t = this;
            var r = 0;
            $("#menu-toggle-wrapper , #inner-bar").on("click", function(e) {
                e.preventDefault();
                if (r) {
                    t.toggleMenu("out");
                    r = 0
                } else {
                    t.toggleMenu("in");
                    r = 1
                }
            });
            $(window).on("debouncedresize", function() {
                t.setMobileFlag();
                t.prepare();
                if (n.sideFlag && !n.mobileFlag) {
                    n.$menuToggle.trigger("click")
                }
            });
            n.$sideContents.find("li a").on("click", function(t) {
                if (!n.menuFlag) {
                    n.menuFlag = true;
                    var r = $(this),
                        i = r.parent("li"),
                        s = r.siblings("ul");
                    if (s.length == 1) {
                        t.preventDefault();
                        s.css("display", "block");
                        if (!e) {
                            TweenMax.to(s, .7, {
                                left: 0,
                                ease: Power4.easeOut
                            })
                        } else {
                            TweenMax.to(s, .7, {
                                right: 0,
                                ease: Power4.easeOut
                            })
                        }
                        s.addClass("menu-in")
                    }
                }
            });
            n.$sideContents.find("li.nav-prev").on("click", function() {
                var t = n.$sideContents.find(".sub-menu");
                if (!e) {
                    TweenMax.to(t, .7, {
                        left: "-100%",
                        ease: Power4.easeOut,
                        onComplete: function() {
                            t.css("display", "none");
                            n.menuFlag = false
                        }
                    })
                } else {
                    TweenMax.to(t, .7, {
                        right: "-100%",
                        ease: Power4.easeOut,
                        onComplete: function() {
                            t.css("display", "none");
                            n.menuFlag = false
                        }
                    })
                }
                t.removeClass("menu-in")
            })
        },
        toggleMenu: function(t) {
            var r = this,
                i = n.$sidebar.outerWidth(),
                s = n.$innerBar.outerWidth(),
                o = i - s,
                u = .4;
            if ($(window).width() < 992) {
                o = i
            }
            t || console.log("message: input argument missing");
            var a = new TimelineLite({
                paused: true
            });
            var f = new TimelineLite({
                paused: true
            });
            if (!e) {
                a.to(n.$innerBar, u, {
                    left: 0,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.removeClass("anim-out");
                        n.$sidebar.css("z-index", 0);
                        n.$main.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("display", "none")
                    }
                }, "start").to(n.$exteras, u, {
                    marginRight: 0,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    a.to(n.$main, u, {
                        left: 0,
                        right: 0,
                        ease: Power4.ease
                    }, "start")
                }
                f.to(n.$innerBar, u, {
                    left: -s,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.addClass("anim-out");
                        n.$sidebar.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("z-index", 10);
                        if (n.mobileFlag) {
                            n.$main.css("display", "none")
                        }
                    }
                }, "start").to(n.$exteras, u, {
                    marginRight: -o,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    f.to(n.$main, u, {
                        left: o,
                        right: -o,
                        ease: Power4.ease
                    }, "start")
                }
            } else {
                a.to(n.$innerBar, u, {
                    right: 0,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.removeClass("anim-out");
                        n.$sidebar.css("z-index", 0);
                        n.$main.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("display", "none")
                    }
                }, "start").to(n.$exteras, u, {
                    marginReft: 0,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    a.to(n.$main, u, {
                        right: 0,
                        left: 0,
                        ease: Power4.ease
                    }, "start")
                }
                f.to(n.$innerBar, u, {
                    right: -s,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.addClass("anim-out");
                        n.$sidebar.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("z-index", 10);
                        if (n.mobileFlag) {
                            n.$main.css("display", "none")
                        }
                    }
                }, "start").to(n.$exteras, u, {
                    marginRight: -o,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    console.log(n.mobileFlag);
                    f.to(n.$main, u, {
                        right: o,
                        left: -o,
                        ease: Power4.ease
                    }, "start")
                }
            }
            if (t == "out") {
                a.play();
                n.sideFlag = false
            } else {
                f.play();
                n.sideFlag = true
            }
        },
        prepare: function() {
            var e = this;
            var t = $(window).height() - $("#logo-wrapper").outerHeight();
            e.madineHeight = t;
            e.navHeight = n.$navigation.height();
            $(".sub-menu").css("height", t)
        },
        setMobileFlag: function() {
            var e = this;
            var t = $(window).width();
            if (t < 600) {
                n.$sidebar.width(t);
                n.mobileFlag = true
            } else {
                n.$sidebar.width("");
                n.mobileFlag = false;
                if (n.showSide) {
                    n.$sidebar.css("display", "")
                }
            }
        }
    };
    var i = {
        init: function(e, t) {
            this.container = e;
            this.setCss(t);
            this.bindUIActions()
        },
        setCss: function(e) {
            $container = this.container;
            $container.imagesLoaded(function() {
                var t = $container.width(),
                    n = $container.height(),
                    r = t / n,
                    i;
                $container.find("img").each(function() {
                    var e = $(this);
                    i = e.width() / e.height();
                    if (e.css("position") == "static") {
                        e.css("position", "relative")
                    }
                    if (r < i) {
                        e.css({
                            width: "auto",
                            height: n,
                            top: 0,
                            left: -(n * i - t) / 2
                        })
                    } else {
                        e.css({
                            width: t,
                            height: "auto",
                            top: -(t / i - n) / 2,
                            left: 0
                        })
                    }
                });
                if (typeof e == "function") {
                    e()
                }
            })
        },
        bindUIActions: function() {
            var e = this;
            $(window).on("debouncedresize", function() {
                e.setCss()
            })
        }
    };
    var s = $("#gmap , .gmap");
    if (s.length > 0) {
        s.each(function() {
            var e = $(this);
            var t = e.attr("data-address") || "Footscray VIC 3011 Australia";
            e.gmap3({
                map: {
                    options: {
                        maxZoom: 15,
                        streetViewControl: false,
                        mapTypeControl: false
                    }
                },
                styledmaptype: {
                    id: "mystyle",
                    options: {
                        name: "Style 1"
                    },
                    styles: [{
                        featureType: "all",
                        stylers: [{
                            saturation: -100
                        }, {
                            gamma: .9
                        }]
                    }]
                },
                overlay: {
                    address: t,
                    options: {
                        content: '<div id="map-marker"><i class="fa fa-map-marker"></i></div>',
                        offset: {
                            y: -65,
                            x: -20
                        }
                    }
                },
                autofit: {
                    maxZoom: 15
                }
            }, "autofit");
            e.gmap3("get").setMapTypeId("mystyle")
        })
    }
    var o = {
        init: function() {
            this.hfolio = $(".horizontal-folio"), this.hfolioContainer = $(".horizontal-folio-wrapper"), this.gfolio = $(".grid-portfolio"), this.gfolioFilters = $(".grid-filters");
            this.transform = e ? false : true;
            this.run();
            this.bindUIActions()
        },
        run: function() {
            var t = this;
            t.sameRatioFlag = t.gfolio.hasClass("same-ratio-items") ? true : false;
            t.gridSizer = t.gfolio.find(".grid-sizer").first();
            if (t.gridSizer.length < 1) {
                t.gridSizer = t.gfolio.find(".gp-item").first()
            }
            t.gfolioIsotop();
            var n = t.gfolioFilters.find(".active");
            var r = n.children().first().attr("data-filter");
            if (r != "*") {
                t.gfolio.isotope({
                    filter: r
                })
            }
            t.hfolio.isotope({
                layoutMode: "masonryHorizontal",
                transformsEnabled: t.transform
            });
            var i = this.hfolioContainer.niceScroll({
                cursoropacitymin: 1,
                cursoropacitymax: 1,
                rtlmode: e,
                railalign: e ? "left" : "right"
            })
        },
        bindUIActions: function() {
            var e = this;
            $(window).on("debouncedresize", function() {
                e.gfolioIsotop()
            });
            e.gfolioFilters.on("click", "a", function(t) {
                t.preventDefault();
                $(this).parent("li").addClass("active").siblings().removeClass("active");
                var n = $(this).attr("data-filter");
                e.gfolio.isotope({
                    filter: n
                })
            });
            var t = $(".fixed-filter , .grid-filters-wrapper");
            t.mouseenter(function() {
                t.addClass("active")
            }).mouseleave(function() {
                t.removeClass("active")
            });
            $(".select-filter").on("touchend", function() {
                if (t.hasClass("active")) {
                    t.removeClass("active")
                } else {
                    t.addClass("active")
                }
            })
        },
        colWidth: function(e, t) {
            var n = this;
            var r = e.width(),
                i = 1,
                s = 0;
            if (r > 1200) {
                i = e.attr("lg-cols") || 4
            } else if (r >= 800) {
                i = e.attr("md-cols") || 3
            } else if (r >= 500) {
                i = e.attr("sm-cols") || 2
            } else if (r >= 300) {
                i = e.attr("xs-cols") || 1
            }
            s = Math.floor(r / i);
            n.gridSizer.width(s);
            var o = n.gridSizer.height();
            e.find(t).each(function() {
                var e = $(this),
                    t, r;
                r = parseFloat(e.attr("data-width-ratio") || 1);
                var t = Math.min(s * r, s * i);
                e.width(t);
                if (n.sameRatioFlag && !e.hasClass("save-the-height")) {
                    var u = Math.round(e.height() / o) * o;
                    e.height(u);
                    e.find("img").css("height", u)
                }
            });
            return s
        },
        prepareItems: function() {
            this.gfolio.find(".gp-item").each(function() {
                var e = $(this);
                e.css({
                    width: "auto",
                    height: "auto"
                });
                e.find("img").css("height", "auto");
                var t = e.height() / e.width();
                e.data("ratio", t)
            })
        },
        gfolioIsotop: function() {
            var e = this;
            e.gfolio.imagesLoaded(function() {
                e.prepareItems();
                var t = e.colWidth(e.gfolio, ".gp-item");
                e.gfolio.isotope({
                    resizable: false,
                    itemSelector: ".gp-item",
                    transformsEnabled: e.transform,
                    masonry: {
                        columnWidth: t,
                        gutterWidth: 0
                    }
                })
            })
        }
    };
    var u = {
        init: function() {
            this.gblog = $(".grid-blog-list"), this.gblogFilters = $(".grid-filters");
            this.transform = e ? false : true;
            this.run();
            this.bindUIActions()
        },
        run: function() {
            this.gblogIsotop()
        },
        bindUIActions: function() {
            var e = this;
            $(window).on("debouncedresize", function() {
                e.gblogIsotop()
            })
        },
        colWidth: function(e, t) {
            var n = e.width(),
                r = 1,
                i = 0;
            if (n > 900) {
                r = 2
            }
            i = Math.floor(n / r);
            e.find(t).each(function() {
                var e = $(this);
                e.css({
                    width: i
                })
            });
            var s = e.parent();
            if (r == 1) {
                s.addClass("no-vertical-line")
            } else {
                s.addClass("no-vertical-line")
            }
            return i
        },
        gblogIsotop: function() {
            var e = this;
            e.gblog.isotope({
                resizable: false,
                transformsEnabled: e.transform,
                itemSelector: ".grid-blog-list .post",
                masonry: {
                    columnWidth: this.colWidth(this.gblog, ".post"),
                    gutterWidth: 0
                }
            })
        }
    };
    var a = {
        init: function() {
            var e = this;
            e.itemsClass = ".ajax-portfolio, .portfolio-prev, .portfolio-next";
            e.itemContainer = $("#ajax-folio-item");
            e.loader = $("#ajax-folio-loader");
            e.contentSelector = "#main-content";
            e.contents = $(e.contentSelector).first();
            e.ajaxElements = $(".ajax-element");
            e.parentUrl = window.location.href;
            e.parentTitle = document.title;
            e.History = window.History;
            e.rootUrl = e.History.getRootUrl();
            e.$body = $("body");
            e.listFlag = false, e.isAbsolute = e.contents.hasClass("abs") ? true : false;
            if (!e.History.enabled) {
                return false
            }
            e.ajaxify();
            e.bindStatechange();
            e.bindUIActions()
        },
        ajaxify: function() {
            var e = this;
            $("body").on("click", e.itemsClass, function(t) {
                var n = $(this),
                    r = n.attr("href"),
                    i = n.attr("title") || null;
                if (t.which == 2 || t.metaKey) {
                    return true
                }
                e.History.pushState(null, i, r);
                t.preventDefault();
                return false
            })
        },
        bindStatechange: function() {
            var e = this;
            $(window).bind("statechange", function() {
                var t = e.History.getState(),
                    n = t.url,
                    r = n.replace(e.rootUrl, "");
                e.$body.addClass("loading");
                e.showLoader(function() {
                    if (e.listFlag || n == e.parentUrl) {
                        e.itemContainer.html("");
                        e.ajaxElements.removeClass("ajax-hide");
                        if (e.isAbsolute) {
                            e.contents.addClass("abs")
                        }
                        $(window).trigger("debouncedresize");
                        e.hideLoader();
                        e.$body.removeClass("loading");
                        e.listFlag = false
                    } else {
                        $.ajax({
                            type: "GET",
                            url: n,
                            datatype: "html",
                            success: function(t, i, s) {
                                var o = $(e.documentHtml(t)),
                                    u = o.find(".document-body:first"),
                                    a = u.find(e.contentSelector).filter(":first"),
                                    f, l;
                                l = a.find(".document-script");
                                if (l.length) {
                                    l.detach()
                                }
                                f = a.html() || o.html();
                                if (!f) {
                                    document.location.href = n;
                                    return false
                                }
                                e.changeDom(f);
                                document.title = o.find(".document-title:first").text();
                                try {
                                    document.getElementsByTagName("title")[0].innerHTML = document.title.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " & ")
                                } catch (c) {}
                                l.each(function() {
                                    var e = $(this),
                                        t = e.text(),
                                        n = document.createElement("script");
                                    if (e.attr("src")) {
                                        if (!e[0].async) {
                                            n.async = false
                                        }
                                        n.src = e.attr("src")
                                    }
                                    n.appendChild(document.createTextNode(t));
                                    contentNode.appendChild(n)
                                });
                                e.$body.removeClass("loading");
                                e.hideLoader();
                                if (typeof window._gaq !== "undefined") {
                                    window._gaq.push(["_trackPageview", r])
                                }
                            },
                            error: function() {
                                document.location.href = n;
                                e.hideLoader();
                                e.$body.removeClass("loading");
                                return false
                            }
                        })
                    }
                })
            })
        },
        documentHtml: function(e) {
            var t = String(e).replace(/<\!DOCTYPE[^>]*>/i, "").replace(/<(html|head|body|title|meta|script)([\s\>])/gi, '<div class="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi, "</div>");
            return $.trim(t)
        },
        showLoader: function(e) {
            var t = this;
            TweenMax.to(t.loader, 1, {
                width: "100%",
                ease: Power2.easeOut,
                onComplete: function() {
                    if (typeof e == "function") {
                        e()
                    }
                }
            })
        },
        hideLoader: function() {
            var e = this;
            TweenMax.to(e.loader, 1, {
                width: 0,
                ease: Power2.easeOut
            })
        },
        changeDom: function(e) {
            var t = this;
            t.itemContainer.html(e);
            t.ajaxElements.addClass("ajax-hide");
            if (t.isAbsolute) {
                t.contents.removeClass("abs")
            }
            t.itemContainer.css("display", "block");
            t.hideLoader();
            t.itemContainer.trigger("newcontent");
            n.$exteras = $(".move-with-js").add(".mfp-wrap");
            $(window).scrollTop(0);
            inviewAnimate($(".inview-animate"));
            n.$main = $("div#main-content, .page-side")
        },
        bindUIActions: function() {
            var e = this;
            $("body").on("click", ".portfolio-close", function(t) {
                t.preventDefault();
                e.listFlag = true;
                e.History.pushState(null, e.parentTitle, e.parentUrl)
            });
            e.itemContainer.on("newcontent", function() {
                e.itemContainer.find(".sync-width").each(function() {
                    var e = $(this);
                    syncWidth(e, e.parent(".sync-width-parent").first())
                });
                setBg(e.itemContainer.find(".set-bg"));
                t.init();
                videobg()
            })
        }
    };
    var f, l = {
        settings: {
            isotopeContainer: $("#blog-list"),
            postItems: $("#blog-list .post-item"),
            blogMore: $("#blog-more")
        },
        init: function() {
            f = this.settings;
            this.buildIsotope();
            this.bindUIActions();
            this.transform = e ? false : true
        },
        buildIsotope: function() {
            var e = this;
            f.isotopeContainer.isotope({
                itemSelector: ".post-item",
                transformsEnabled: e.transform,
                duration: 750,
                resizable: true,
                resizesContainer: true,
                layoutMode: "masonry"
            })
        },
        bindUIActions: function() {
            var e = this;
            f.blogMore.on("click", function(e) {
                e.preventDefault();
                var t = f.postItems.filter(function(e) {
                    return e < 5
                }).clone();
                f.isotopeContainer.isotope("insert", t, function() {
                    f.isotopeContainer.isotope("reLayout")
                });
                return false
            })
        }
    };
    var c = {
        init: function() {
            var e = this;
            e.localvideo = {
                autoPlay: false,
                preload: "metadata",
                webm: true,
                ogv: false
            };
            this.bindUIActions()
        },
        generateVideo: function(e, t) {
            var n = this;
            var r = e.substr(0, e.lastIndexOf(".mp4"));
            var i = "";
            if (n.localvideo.autoPlay) {
                i += " autoplay"
            }
            i += 'preload="' + n.localvideo.preload + '"';
            var s = '<video class="mejs-player popup-mejs video-html5" controls ' + i + ' poster="' + t + '">' + '<source src="' + e + '" type="video/mp4" />';
            if (n.localvideo.webm) {
                s += '<source src="' + r + '.webm" type="video/webm" />'
            }
            if (n.localvideo.ogv) {
                s += '<source src="' + r + '.ogv" type="video/ogg" />'
            }
            s += "</video>" + '<div class="mfp-close"></div>';
            return s
        },
        bindUIActions: function() {
            var e = this,
                t = $("body");
            e.singleBox($(".tj-lightbox"));
            $(".tj-lightbox-gallery").each(function() {
                e.galleyBox($(this))
            });
            $("body").on("click", ".mfp-container", function(e) {
                if (e.target !== this) return;
                $(this).find(".mfp-close").trigger("click")
            })
        },
        singleBox: function(e) {
            var t = this;
            e.magnificPopup({
                type: "image",
                closeOnContentClick: false,
                closeOnBgClick: false,
                mainClass: "mfp-fade",
                iframe: {
markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title"></div>' + "</div>"
},
                callbacks: {
                    elementParse: function(e) {
                        var n = e.el.attr("data-type") || "image";
                        if (n == "localvideo") {
                            e.type = "inline";
                            var r = e.el.attr("data-poster") || "";
                            e.src = t.generateVideo(e.src, r)
                        } else {
                            e.type = n
                        }
                    },
                    markupParse: function(e, t, n) {
                        t.title = n.el.attr("title")
                    },
                    open: function() {
                        n.$exteras = $(".move-with-js").add(".mfp-wrap");
                        $(".popup-mejs").mediaelementplayer()
                    }
                },
                image: {
                    verticalFit: true
                }
            })
        },
        galleyBox: function(e) {
            var t = this,
                r = e,
                i = [];
            e.magnificPopup({
                delegate: ".lightbox-gallery-item",
                closeOnBgClick: false,
                closeOnContentClick: false,
                removalDelay: 300,
                mainClass: "mfp-fade",
               iframe: {
markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title"></div>' +  '<div class="mfp-counter"></div>' + "</div>"
},
                gallery: {
                    enabled: true,
                    tPrev: "Previous",
                    tNext: "Next",
                    tCounter: "%curr% / %total%",
                    arrowMarkup: '<a class="tj-mp-action tj-mp-arrow-%dir% mfp-prevent-close" title="%title%"><i class="ti-angle-%dir%"></i></a>'
                },
                callbacks: {
                    elementParse: function(e) {
                        var n = e.el.attr("data-type") || "image",
                            r = e.el.attr("href");
                        if (n == "localvideo") {
                            e.src = t.generateVideo(r, e.el.attr("data-poster") || "");
                            e.type = "inline"
                        } else {
                            e.type = n
                        }
                    },
                    open: function() {
                        n.$exteras = $(".move-with-js").add(".mfp-wrap");
                        $(".popup-mejs").mediaelementplayer()
                    },
                    change: function() {
                        if (this.isOpen) {
                            this.wrap.addClass("mfp-open")
                        }
                        $(".popup-mejs").mediaelementplayer()
                    }
                },
                type: "image"
            });
            i = []
        }
    };
    c.init();
    var h, p = {
        settings: {
            accUIelClass: ".accordion > .item > .head a",
            openFirstOne: true
        },
        init: function() {
            h = this.settings;
            this.bindUIActions();
            $(".accordion > .item:not(.active) > .body").hide();
            if ($(".accordion > .item.active").length == 0 && h.openFirstOne) $(".accordion > .item:first-child > .body").addClass("active").slideDown()
        },
        bindUIActions: function() {
            var e = this,
                t = $("body");
            t.on("click", h.accUIelClass, function(e) {
                var t = $(this);
                t.parents(".item").addClass("active").siblings().removeClass("active");
                $(".accordion > .item:not(.active) > .body").slideUp();
                t.parent().next().slideDown();
                e.preventDefault();
                return false
            })
        }
    };
    p.init();
    var d, v = {
        settings: {
            tabsBodiesExceptActive: $(".tabs > .tabs-body > .tab-item:not(.active)"),
            tabsUIelClass: ".tabs > ul.tabs-head a"
        },
        init: function() {
            d = this.settings;
            this.bindUIActions();
            if ($(".tabs > .tabs-head > li.active").length == 0) $(".tabs > .tabs-body > .tab-item:first-child, .tabs > .tabs-head > li:first-child").addClass("active")
        },
        bindUIActions: function() {
            var e = this,
                t = $("body");
            t.on("click", d.tabsUIelClass, function(e) {
                var t = $(this).parent(),
                    n = $("ul.tabs-head li").index(t);
                t.addClass("active").siblings().removeClass("active");
                $(".tabs > .tabs-body > .tab-item").eq(n).addClass("active").siblings().removeClass("active");
                e.preventDefault();
                return false
            })
        }
    };
    v.init();
    var m = {
        init: function() {
            var e = new MasterSlider;
            e.setup("teamcarousel", {
                loop: true,
                width: 240,
                height: 240,
                speed: 20,
                view: "fadeBasic",
                preload: 0,
                space: 0,
                wheel: true
            });
            e.control("arrows");
            e.control("slideinfo", {
                insertTo: "#teamcarousel-info"
            })
        }
    };
    if ($("#teamcarousel").length > 0) {
        m.init()
    }
    var g = {
        init: function(e) {
            var t = this;
            var n = e || $(".tj-ms-slider");
            n.each(function() {
                var e = $(this);
                var n = {
                    ewidth: e.attr("data-width") || e.width(),
                    eheight: e.attr("data-height") || e.height(),
                    layout: e.attr("data-layout") || "boxed",
                    view: e.attr("data-view") || "basic",
                    dir: e.attr("data-dir") || "h",
                    showCounter: e.attr("data-counter") || false,
                    isGallery: e.attr("data-gallery") || false,
                    autoHeight: e.attr("data-autoheight") || false,
                    hasPlay: e.attr("data-playbtn") || false,
                    galleryWrapper: e.parents(".tj-ms-gallery"),
                    mouse: (e.attr("data-mouse") || true) == true,
                    fillMode: e.attr("data-fillmode") || "fill",
                    initialPlay: false
                };
                t.runSlider(e, n)
            })
        },
        runSlider: function(e, t) {
            var n = this;
            var r = new MasterSlider,
                i = e.attr("id") || "";
            r.setup(i, {
                width: t.ewidth,
                height: t.eheight,
                layout: t.layout,
                view: t.view,
                dir: t.dir,
                autoHeight: t.autoHeight,
                space: 0,
                preload: 1,
                centerControls: false,
                mouse: t.mouse,
                fillMode: t.fillMode,
                overPause: false
            });
            r.control("arrows", {
                autohide: false
            });
            if (t.hasPlay) {
                r.control("timebar", {
                    autohide: false,
                    color: "#dc971f"
                })
            }
            if (t.isGallery) {
                n.makeGallery(e, r)
            }
            r.api.addEventListener(MSSliderEvent.INIT, function() {
                var i = e.find(".ms-container"),
                    s = $('<div class="tj-controlls tj-controlls-' + t.dir + 'mode"></div>').appendTo(i);
                if (t.hasPlay) {
                    var o = $("<div></div>").addClass("tj-playbtn").appendTo(s);
                    n.addPlay(r, o, t)
                }
                s.append(i.find(".ms-nav-prev"));
                if (t.showCounter) {
                    var u = '<div class="tj-ms-counter">' + '<span class="counter-current">' + (r.api.index() + 1) + "</span>" + '<span class="counter-divider">/</span>' + '<span class="counter-total">' + r.api.count() + "</span>" + "</div>";
                    var a = $(u).appendTo(s),
                        f = a.find(".counter-current");
                    n.sliderCounter(e, r, f)
                }
                r.api.resume();
                s.append(i.find(".ms-nav-next"));
                $(window).trigger("resize")
            })
        },
        sliderCounter: function(e, t, n) {
            var r = this;
            t.api.addEventListener(MSSliderEvent.CHANGE_START, function() {
                n.html("" + (t.api.index() + 1) + "")
            })
        },
        makeGallery: function(e, t) {
            var n = e.hasClass("tj-vertical-gallery") ? "v" : "h";
            t.control("thumblist", {
                autohide: false,
                dir: n
            })
        },
        addPlay: function(e, t, n) {
            if (n.initialPlay) {
                e.api.resume();
                t.addClass("btn-pause")
            }
            t.click(function() {
                if (e.api.paused) {
                    e.api.resume();
                    t.addClass("btn-pause")
                } else {
                    e.api.pause();
                    t.removeClass("btn-pause")
                }
            })
        }
    };
    var y = {
        init: function() {
            var e = this;
            e.mdWidth = 992;
            e.$window = $(window);
            e.folio = {}, e.blog = {};
            e.bindUIActions();
            if (e.$window.width() <= e.mdWidth) {
                e.portfolio("md");
                e.absPortfolio("md")
            } else {
                e.portfolio();
                e.absPortfolio()
            }
        },
        portfolio: function(e) {
            var t = this,
                n = $(window).height();
            t.folio.pHead = $(".parallax-head");
            t.blog.pHead = $(".header-cover");
            t.folio.pContent = $(".parallax-contents");
            t.folio.mdDetail = $(".portfolio-md-detail");
            var t = this;
            if (e == "md") {
                t.folio.pHead.css("height", n);
                t.blog.pHead.css("height", n);
                t.folio.pContent.css("marginTop", t.$window.height());
                t.folio.mdDetail.css("marginTop", -$(".portfolio-md-detail").outerHeight())
            } else {
                t.folio.pHead.css("height", 600);
                t.blog.pHead.css("height", 600);
                t.folio.pContent.css("marginTop", 600)
            }
        },
        absPortfolio: function(e) {
            var t = this;
            if (e == "md") {
                $(".set-height-mobile").height(t.$window.height() - $(".page-side").outerHeight())
            } else {
                $(".set-height-mobile").css("height", "100%")
            }
        },
        bindUIActions: function() {
            var e = this;
            $(window).on("debouncedresize", function() {
                if ($(this).width() <= e.mdWidth) {
                    e.portfolio("md");
                    e.absPortfolio("md")
                } else {
                    e.portfolio();
                    e.absPortfolio()
                }
            })
        }
    };
    var b = {
        init: function() {
            $(window).load(function() {
                o.init();
                u.init()
            });
            g.init();
            a.init();
            l.init();
            $(".sync-width").each(function() {
                syncWidth($(this), $(this).parent(".sync-width-parent").first())
            });
            setBg($(".set-bg"));
            r.init();
            y.init();
            t.init();
            videobg();
            submitContact();
            setMinHeight();
            inviewAnimate($(".inview-animate"));
            touchDevices();
            this.bindUIActions()
        },
        bindUIActions: function() {
            $(window).on("debouncedresize", function() {
                setMinHeight()
            })
        }
    };
    b.init()
});
(function(e) {
    var t = e.event,
        n, r;
    n = t.special.debouncedresize = {
        setup: function() {
            e(this).on("resize", n.handler)
        },
        teardown: function() {
            e(this).off("resize", n.handler)
        },
        handler: function(e, i) {
            var s = this,
                o = arguments,
                u = function() {
                    e.type = "debouncedresize";
                    t.dispatch.apply(s, o)
                };
            if (r) {
                clearTimeout(r)
            }
            i ? u() : r = setTimeout(u, n.threshold)
        },
        threshold: 150
    }
})(jQuery)

/* Arrow Down */
$(document).ready(function(){
$(".arrow-hide").show();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() < 100) {
				$('.arrow-hide').fadeIn();
			} else {
				$('.arrow-hide').fadeOut();
			}
		});
	});
});	

var animateTopButton = $('.go-bottom'),
	htmBody = $('html, body');
	
animateTopButton.click(function(){
htmBody.animate({scrollTop: 570}, 'slow');
	return false;
});

/* /Arrow Down */