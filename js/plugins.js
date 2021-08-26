(function () {
    var d = [].indexOf || function (e) {
            for (var b = 0, a = this.length; b < a; b++) {
                if (b in this && this[b] === e) {
                    return b
                }
            }
            return -1
        }, c = [].slice;
    (function (b, a) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (f) {
                return a(f, b)
            })
        } else {
            return a(b.jQuery, b)
        }
    })(this, function (y, n) {
            var i, L, v, g, u, m, s, f, h, r, a, o, b, l, p, w;
            i = y(n);
            f = d.call(n, "ontouchstart") >= 0;
            g = {
                horizontal: {},
                vertical: {}
            };
            u = 1;
            s = {};
            m = "waypoints-context-id";
            a = "resize.waypoints";
            o = "scroll.waypoints";
            b = 1;
            l = "waypoints-waypoint-ids";
            p = "waypoint";
            w = "waypoints";
            L = function () {
                function e(j) {
                    var k = this;
                    this.$element = j;
                    this.element = j[0];
                    this.didResize = false;
                    this.didScroll = false;
                    this.id = "context" + u++;
                    this.oldScroll = {
                        x: j.scrollLeft(),
                        y: j.scrollTop()
                    };
                    this.waypoints = {
                        horizontal: {},
                        vertical: {}
                    };
                    j.data(m, this.id);
                    s[this.id] = this;
                    j.bind(o, function () {
                        var q;
                        if (!(k.didScroll || f)) {
                            k.didScroll = true;
                            q = function () {
                                k.doScroll();
                                return k.didScroll = false
                            };
                            return n.setTimeout(q, y[w].settings.scrollThrottle)
                        }
                    });
                    j.bind(a, function () {
                        var q;
                        if (!k.didResize) {
                            k.didResize = true;
                            q = function () {
                                y[w]("refresh");
                                return k.didResize = false
                            };
                            return n.setTimeout(q, y[w].settings.resizeThrottle)
                        }
                    })
                }
                e.prototype.doScroll = function () {
                    var j, k = this;
                    j = {
                        horizontal: {
                            newScroll: this.$element.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left"
                        },
                        vertical: {
                            newScroll: this.$element.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up"
                        }
                    };
                    if (f && (!j.vertical.oldScroll || !j.vertical.newScroll)) {
                        y[w]("refresh")
                    }
                    y.each(j, function (z, t) {
                        var x, A, q;
                        q = [];
                        A = t.newScroll > t.oldScroll;
                        x = A ? t.forward : t.backward;
                        y.each(k.waypoints[z], function (B, E) {
                            var C, D;
                            if (t.oldScroll < (C = E.offset) && C <= t.newScroll) {
                                return q.push(E)
                            } else {
                                if (t.newScroll < (D = E.offset) && D <= t.oldScroll) {
                                    return q.push(E)
                                }
                            }
                        });
                        q.sort(function (B, C) {
                            return B.offset - C.offset
                        });
                        if (!A) {
                            q.reverse()
                        }
                        return y.each(q, function (B, C) {
                            if (C.options.continuous || B === q.length - 1) {
                                return C.trigger([x])
                            }
                        })
                    });
                    return this.oldScroll = {
                        x: j.horizontal.newScroll,
                        y: j.vertical.newScroll
                    }
                };
                e.prototype.refresh = function () {
                    var t, j, k, q = this;
                    k = y.isWindow(this.element);
                    j = this.$element.offset();
                    this.doScroll();
                    t = {
                        horizontal: {
                            contextOffset: k ? 0 : j.left,
                            contextScroll: k ? 0 : this.oldScroll.x,
                            contextDimension: this.$element.width(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left"
                        },
                        vertical: {
                            contextOffset: k ? 0 : j.top,
                            contextScroll: k ? 0 : this.oldScroll.y,
                            contextDimension: k ? y[w]("viewportHeight") : this.$element.height(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top"
                        }
                    };
                    return y.each(t, function (x, z) {
                        return y.each(q.waypoints[x], function (D, G) {
                            var B, C, E, F, A;
                            B = G.options.offset;
                            E = G.offset;
                            C = y.isWindow(G.element) ? 0 : G.$element.offset()[z.offsetProp];
                            if (y.isFunction(B)) {
                                B = B.apply(G.element)
                            } else {
                                if (typeof B === "string") {
                                    B = parseFloat(B);
                                    if (G.options.offset.indexOf("%") > -1) {
                                        B = Math.ceil(z.contextDimension * B / 100)
                                    }
                                }
                            }
                            G.offset = C - z.contextOffset + z.contextScroll - B;
                            if (G.options.onlyOnScroll && E != null || !G.enabled) {
                                return
                            }
                            if (E !== null && E < (F = z.oldScroll) && F <= G.offset) {
                                return G.trigger([z.backward])
                            } else {
                                if (E !== null && E > (A = z.oldScroll) && A >= G.offset) {
                                    return G.trigger([z.forward])
                                } else {
                                    if (E === null && z.oldScroll >= G.offset) {
                                        return G.trigger([z.forward])
                                    }
                                }
                            }
                        })
                    })
                };
                e.prototype.checkEmpty = function () {
                    if (y.isEmptyObject(this.waypoints.horizontal) && y.isEmptyObject(this.waypoints.vertical)) {
                        this.$element.unbind([a, o].join(" "));
                        return delete s[this.id]
                    }
                };
                return e
            }();
            v = function () {
                function e(k, j, x) {
                    var t, q;
                    x = y.extend({}, y.fn[p].defaults, x);
                    if (x.offset === "bottom-in-view") {
                        x.offset = function () {
                            var z;
                            z = y[w]("viewportHeight");
                            if (!y.isWindow(j.element)) {
                                z = j.$element.height()
                            }
                            return z - y(this).outerHeight()
                        }
                    }
                    this.$element = k;
                    this.element = k[0];
                    this.axis = x.horizontal ? "horizontal" : "vertical";
                    this.callback = x.handler;
                    this.context = j;
                    this.enabled = x.enabled;
                    this.id = "waypoints" + b++;
                    this.offset = null;
                    this.options = x;
                    j.waypoints[this.axis][this.id] = this;
                    g[this.axis][this.id] = this;
                    t = (q = k.data(l)) != null ? q : [];
                    t.push(this.id);
                    k.data(l, t)
                }
                e.prototype.trigger = function (j) {
                    if (!this.enabled) {
                        return
                    }
                    if (this.callback != null) {
                        this.callback.apply(this.element, j)
                    }
                    if (this.options.triggerOnce) {
                        return this.destroy()
                    }
                };
                e.prototype.disable = function () {
                    return this.enabled = false
                };
                e.prototype.enable = function () {
                    this.context.refresh();
                    return this.enabled = true
                };
                e.prototype.destroy = function () {
                    delete g[this.axis][this.id];
                    delete this.context.waypoints[this.axis][this.id];
                    return this.context.checkEmpty()
                };
                e.getWaypointsByElement = function (k) {
                    var j, q;
                    q = y(k).data(l);
                    if (!q) {
                        return []
                    }
                    j = y.extend({}, g.horizontal, g.vertical);
                    return y.map(q, function (t) {
                        return j[t]
                    })
                };
                return e
            }();
            r = {
                init: function (e, j) {
                    var k;
                    if (j == null) {
                        j = {}
                    }
                    if ((k = j.handler) == null) {
                        j.handler = e
                    }
                    this.each(function () {
                        var z, q, t, x;
                        z = y(this);
                        t = (x = j.context) != null ? x : y.fn[p].defaults.context;
                        if (!y.isWindow(t)) {
                            t = z.closest(t)
                        }
                        t = y(t);
                        q = s[t.data(m)];
                        if (!q) {
                            q = new L(t)
                        }
                        return new v(z, q, j)
                    });
                    y[w]("refresh");
                    return this
                },
                disable: function () {
                    return r._invoke(this, "disable")
                },
                enable: function () {
                    return r._invoke(this, "enable")
                },
                destroy: function () {
                    return r._invoke(this, "destroy")
                },
                prev: function (j, e) {
                    return r._traverse.call(this, j, e, function (k, q, t) {
                        if (q > 0) {
                            return k.push(t[q - 1])
                        }
                    })
                },
                next: function (j, e) {
                    return r._traverse.call(this, j, e, function (k, q, t) {
                        if (q < t.length - 1) {
                            return k.push(t[q + 1])
                        }
                    })
                },
                _traverse: function (t, j, e) {
                    var q, k;
                    if (t == null) {
                        t = "vertical"
                    }
                    if (j == null) {
                        j = n
                    }
                    k = h.aggregate(j);
                    q = [];
                    this.each(function () {
                        var x;
                        x = y.inArray(this, k[t]);
                        return e(q, x, k[t])
                    });
                    return this.pushStack(q)
                },
                _invoke: function (j, e) {
                    j.each(function () {
                        var k;
                        k = v.getWaypointsByElement(this);
                        return y.each(k, function (q, t) {
                            t[e]();
                            return true
                        })
                    });
                    return this
                }
            };
            y.fn[p] = function () {
                var e, j;
                j = arguments[0], e = 2 <= arguments.length ? c.call(arguments, 1) : [];
                if (r[j]) {
                    return r[j].apply(this, e)
                } else {
                    if (y.isFunction(j)) {
                        return r.init.apply(this, arguments)
                    } else {
                        if (y.isPlainObject(j)) {
                            return r.init.apply(this, [null, j])
                        } else {
                            if (!j) {
                                return y.error("jQuery Waypoints needs a callback function or handler option.")
                            } else {
                                return y.error("The " + j + " method does not exist in jQuery Waypoints.")
                            }
                        }
                    }
                }
            };
            y.fn[p].defaults = {
                context: n,
                continuous: true,
                enabled: true,
                horizontal: false,
                offset: 0,
                triggerOnce: false
            };
            h = {
                refresh: function () {
                    return y.each(s, function (j, e) {
                        return e.refresh()
                    })
                },
                viewportHeight: function () {
                    var e;
                    return (e = n.innerHeight) != null ? e : i.height()
                },
                aggregate: function (k) {
                    var j, q, e;
                    j = g;
                    if (k) {
                        j = (e = s[y(k).data(m)]) != null ? e.waypoints : void 0
                    }
                    if (!j) {
                        return []
                    }
                    q = {
                        horizontal: [],
                        vertical: []
                    };
                    y.each(q, function (t, x) {
                        y.each(j[t], function (A, z) {
                            return x.push(z)
                        });
                        x.sort(function (A, z) {
                            return A.offset - z.offset
                        });
                        q[t] = y.map(x, function (z) {
                            return z.element
                        });
                        return q[t] = y.unique(q[t])
                    });
                    return q
                },
                above: function (e) {
                    if (e == null) {
                        e = n
                    }
                    return h._filter(e, "vertical", function (j, k) {
                        return k.offset <= j.oldScroll.y
                    })
                },
                below: function (e) {
                    if (e == null) {
                        e = n
                    }
                    return h._filter(e, "vertical", function (j, k) {
                        return k.offset > j.oldScroll.y
                    })
                },
                left: function (e) {
                    if (e == null) {
                        e = n
                    }
                    return h._filter(e, "horizontal", function (j, k) {
                        return k.offset <= j.oldScroll.x
                    })
                },
                right: function (e) {
                    if (e == null) {
                        e = n
                    }
                    return h._filter(e, "horizontal", function (j, k) {
                        return k.offset > j.oldScroll.x
                    })
                },
                enable: function () {
                    return h._invoke("enable")
                },
                disable: function () {
                    return h._invoke("disable")
                },
                destroy: function () {
                    return h._invoke("destroy")
                },
                extendFn: function (j, e) {
                    return r[j] = e
                },
                _invoke: function (j) {
                    var e;
                    e = y.extend({}, g.vertical, g.horizontal);
                    return y.each(e, function (k, q) {
                        q[j]();
                        return true
                    })
                },
                _filter: function (t, j, e) {
                    var q, k;
                    q = s[y(t).data(m)];
                    if (!q) {
                        return []
                    }
                    k = [];
                    y.each(q.waypoints[j], function (x, z) {
                        if (e(q, z)) {
                            return k.push(z)
                        }
                    });
                    k.sort(function (x, z) {
                        return x.offset - z.offset
                    });
                    return y.map(k, function (x) {
                        return x.element
                    })
                }
            };
            y[w] = function () {
                var e, j;
                j = arguments[0], e = 2 <= arguments.length ? c.call(arguments, 1) : [];
                if (h[j]) {
                    return h[j].apply(null, e)
                } else {
                    return h.aggregate.call(null, j)
                }
            };
            y[w].settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            };
            return i.load(function () {
                return y[w]("refresh")
            })
        })
}).call(this);
(function (a) {
    a.fn.absoluteCounter = function (b) {
        b = a.extend({}, a.fn.absoluteCounter.defaults, b || {});
        return a(this).each(function () {
            var e = this,
                g = b.speed,
                d = b.setStyles,
                f = b.delayedStart,
                c = b.fadeInDelay;
            if (d) {
                a(e).css({
                    display: "block",
                    position: "relative",
                    overflow: "hidden"
                }).addClass("animated")
            }
            a(e).css("opacity", "0");
            a(e).animate({
                opacity: 0
            }, f, function () {
                var l = a(e).text();
                a(e).text("");
                for (var h = 0; h < l.length; h++) {
                    var k = l.charAt(h);
                    var j = "";
                    if (parseInt(k, 10) >= 0) {
                        j = '<span class="onedigit p' + (l.length - h) + " d" + k + '">';
                        for (var i = 0; i <= parseInt(k, 10); i++) {
                            j += '<span class="n' + (i % 10) + '">' + (i % 10) + "</span>"
                        }
                        j += "</span>"
                    } else {
                        j = '<span class="onedigit p' + (l.length - h) + ' char"><span class="c">' + k + "</span></span>"
                    }
                    a(e).append(j)
                }
                a(e).animate({
                    opacity: 1
                }, c);
                a("span.onedigit", e).each(function (p, t) {
                    if (d) {
                        a(t).css({
                            "float": "left",
                            position: "relative"
                        });
                        a("span", a(t)).css({
                            display: "block"
                        })
                    }
                    var s = a("span", a(t)).length,
                        o = a(e).height();
                    a(t).css({
                        height: (s * o) + "px",
                        top: "0"
                    });
                    a("span", a(t)).css({
                        height: o + "px"
                    });
                    a(t).animate({
                        top: -1 * ((s - 1) * o) + "px"
                    }, g, function () {
                        if (typeof (b.onComplete) === "function") {
                            b.onComplete.call(e)
                        }
                    })
                })
            })
        })
    };
    a.fn.absoluteCounter.defaults = {
        speed: 2000,
        setStyles: true,
        onComplete: null,
        delayedStart: 0,
        fadeInDelay: 0
    }
}(jQuery));
(function (h, g, f, e) {
    h.fn.doubleTapToGo = function (a) {
        if (!("ontouchstart" in g) && !g.navigator.msPointerEnabled && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) {
            return false
        }
        this.each(function () {
            var b = false;
            h(this).on("click", function (c) {
                var d = h(this);
                if (d[0] !== b[0]) {
                    c.preventDefault();
                    b = d
                }
            });
            h(f).on("click touchstart MSPointerDown", function (i) {
                var c = true,
                    l = h(i.target).parents();
                for (var d = 0; d < l.length; d++) {
                    if (l[d] === b[0]) {
                        c = false
                    }
                }
                if (c) {
                    b = false
                }
            })
        });
        return this
    }
})(jQuery, window, document);
(function (i, l) {
    var h = 0,
        j = /^ui-id-\d+$/;
    i.ui = i.ui || {};
    i.extend(i.ui, {
        version: "1.10.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    i.fn.extend({
        focus: (function (a) {
            return function (b, c) {
                return typeof b === "number" ? this.each(function () {
                    var d = this;
                    setTimeout(function () {
                        i(d).focus();
                        if (c) {
                            c.call(d)
                        }
                    }, b)
                }) : a.apply(this, arguments)
            }
        })(i.fn.focus),
        scrollParent: function () {
            var a;
            if ((i.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                a = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test(i.css(this, "position")) && (/(auto|scroll)/).test(i.css(this, "overflow") + i.css(this, "overflow-y") + i.css(this, "overflow-x"))
                }).eq(0)
            } else {
                a = this.parents().filter(function () {
                    return (/(auto|scroll)/).test(i.css(this, "overflow") + i.css(this, "overflow-y") + i.css(this, "overflow-x"))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !a.length ? i(document) : a
        },
        zIndex: function (b) {
            if (b !== l) {
                return this.css("zIndex", b)
            }
            if (this.length) {
                var d = i(this[0]),
                    c, a;
                while (d.length && d[0] !== document) {
                    c = d.css("position");
                    if (c === "absolute" || c === "relative" || c === "fixed") {
                        a = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(a) && a !== 0) {
                            return a
                        }
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        uniqueId: function () {
            return this.each(function () {
                if (!this.id) {
                    this.id = "ui-id-" + (++h)
                }
            })
        },
        removeUniqueId: function () {
            return this.each(function () {
                if (j.test(this.id)) {
                    i(this).removeAttr("id")
                }
            })
        }
    });

    function g(d, e) {
        var a, f, c, b = d.nodeName.toLowerCase();
        if ("area" === b) {
            a = d.parentNode;
            f = a.name;
            if (!d.href || !f || a.nodeName.toLowerCase() !== "map") {
                return false
            }
            c = i("img[usemap=#" + f + "]")[0];
            return !!c && k(c)
        }
        return (/input|select|textarea|button|object/.test(b) ? !d.disabled : "a" === b ? d.href || e : e) && k(d)
    }

    function k(a) {
        return i.expr.filters.visible(a) && !i(a).parents().addBack().filter(function () {
            return i.css(this, "visibility") === "hidden"
        }).length
    }
    i.extend(i.expr[":"], {
        data: i.expr.createPseudo ? i.expr.createPseudo(function (a) {
            return function (b) {
                return !!i.data(b, a)
            }
        }) : function (c, b, a) {
            return !!i.data(c, a[3])
        },
        focusable: function (a) {
            return g(a, !isNaN(i.attr(a, "tabindex")))
        },
        tabbable: function (c) {
            var a = i.attr(c, "tabindex"),
                b = isNaN(a);
            return (b || a >= 0) && g(c, !b)
        }
    });
    if (!i("<a>").outerWidth(1).jquery) {
        i.each(["Width", "Height"], function (c, a) {
            var f = a === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                b = a.toLowerCase(),
                d = {
                    innerWidth: i.fn.innerWidth,
                    innerHeight: i.fn.innerHeight,
                    outerWidth: i.fn.outerWidth,
                    outerHeight: i.fn.outerHeight
                };

            function e(q, s, r, m) {
                i.each(f, function () {
                    s -= parseFloat(i.css(q, "padding" + this)) || 0;
                    if (r) {
                        s -= parseFloat(i.css(q, "border" + this + "Width")) || 0
                    }
                    if (m) {
                        s -= parseFloat(i.css(q, "margin" + this)) || 0
                    }
                });
                return s
            }
            i.fn["inner" + a] = function (m) {
                if (m === l) {
                    return d["inner" + a].call(this)
                }
                return this.each(function () {
                    i(this).css(b, e(this, m) + "px")
                })
            };
            i.fn["outer" + a] = function (o, m) {
                if (typeof o !== "number") {
                    return d["outer" + a].call(this, o)
                }
                return this.each(function () {
                    i(this).css(b, e(this, o, true, m) + "px")
                })
            }
        })
    }
    if (!i.fn.addBack) {
        i.fn.addBack = function (a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
        }
    }
    if (i("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        i.fn.removeData = (function (a) {
            return function (b) {
                if (arguments.length) {
                    return a.call(this, i.camelCase(b))
                } else {
                    return a.call(this)
                }
            }
        })(i.fn.removeData)
    }
    i.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    i.support.selectstart = "onselectstart" in document.createElement("div");
    i.fn.extend({
        disableSelection: function () {
            return this.bind((i.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                a.preventDefault()
            })
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    });
    i.extend(i.ui, {
        plugin: {
            add: function (c, e, a) {
                var d, b = i.ui[c].prototype;
                for (d in a) {
                    b.plugins[d] = b.plugins[d] || [];
                    b.plugins[d].push([e, a[d]])
                }
            },
            call: function (e, a, d) {
                var b, c = e.plugins[a];
                if (!c || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) {
                    return
                }
                for (b = 0; b < c.length; b++) {
                    if (e.options[c[b][0]]) {
                        c[b][1].apply(e.element, d)
                    }
                }
            }
        },
        hasScroll: function (b, a) {
            if (i(b).css("overflow") === "hidden") {
                return false
            }
            var c = (a && a === "left") ? "scrollLeft" : "scrollTop",
                d = false;
            if (b[c] > 0) {
                return true
            }
            b[c] = 1;
            d = (b[c] > 0);
            b[c] = 0;
            return d
        }
    })
})(jQuery);
(function (g, h) {
    var f = 0,
        j = Array.prototype.slice,
        i = g.cleanData;
    g.cleanData = function (d) {
        for (var b = 0, a;
            (a = d[b]) != null; b++) {
            try {
                g(a).triggerHandler("remove")
            } catch (c) {}
        }
        i(d)
    };
    g.widget = function (o, a, b) {
        var e, d, r, c, p = {}, q = o.split(".")[0];
        o = o.split(".")[1];
        e = q + "-" + o;
        if (!b) {
            b = a;
            a = g.Widget
        }
        g.expr[":"][e.toLowerCase()] = function (k) {
            return !!g.data(k, e)
        };
        g[q] = g[q] || {};
        d = g[q][o];
        r = g[q][o] = function (l, k) {
            if (!this._createWidget) {
                return new r(l, k)
            }
            if (arguments.length) {
                this._createWidget(l, k)
            }
        };
        g.extend(r, d, {
            version: b.version,
            _proto: g.extend({}, b),
            _childConstructors: []
        });
        c = new a();
        c.options = g.widget.extend({}, c.options);
        g.each(b, function (l, k) {
            if (!g.isFunction(k)) {
                p[l] = k;
                return
            }
            p[l] = (function () {
                var m = function () {
                    return a.prototype[l].apply(this, arguments)
                }, n = function (t) {
                        return a.prototype[l].apply(this, t)
                    };
                return function () {
                    var x = this._super,
                        v = this._superApply,
                        w;
                    this._super = m;
                    this._superApply = n;
                    w = k.apply(this, arguments);
                    this._super = x;
                    this._superApply = v;
                    return w
                }
            })()
        });
        r.prototype = g.widget.extend(c, {
            widgetEventPrefix: d ? c.widgetEventPrefix : o
        }, p, {
            constructor: r,
            namespace: q,
            widgetName: o,
            widgetFullName: e
        });
        if (d) {
            g.each(d._childConstructors, function (k, l) {
                var m = l.prototype;
                g.widget(m.namespace + "." + m.widgetName, r, l._proto)
            });
            delete d._childConstructors
        } else {
            a._childConstructors.push(r)
        }
        g.widget.bridge(o, r)
    };
    g.widget.extend = function (d) {
        var e = j.call(arguments, 1),
            a = 0,
            c = e.length,
            l, b;
        for (; a < c; a++) {
            for (l in e[a]) {
                b = e[a][l];
                if (e[a].hasOwnProperty(l) && b !== h) {
                    if (g.isPlainObject(b)) {
                        d[l] = g.isPlainObject(d[l]) ? g.widget.extend({}, d[l], b) : g.widget.extend({}, b)
                    } else {
                        d[l] = b
                    }
                }
            }
        }
        return d
    };
    g.widget.bridge = function (c, b) {
        var a = b.prototype.widgetFullName || c;
        g.fn[c] = function (e) {
            var n = typeof e === "string",
                d = j.call(arguments, 1),
                m = this;
            e = !n && d.length ? g.widget.extend.apply(null, [e].concat(d)) : e;
            if (n) {
                this.each(function () {
                    var k, l = g.data(this, a);
                    if (!l) {
                        return g.error("cannot call methods on " + c + " prior to initialization; attempted to call method '" + e + "'")
                    }
                    if (!g.isFunction(l[e]) || e.charAt(0) === "_") {
                        return g.error("no such method '" + e + "' for " + c + " widget instance")
                    }
                    k = l[e].apply(l, d);
                    if (k !== l && k !== h) {
                        m = k && k.jquery ? m.pushStack(k.get()) : k;
                        return false
                    }
                })
            } else {
                this.each(function () {
                    var k = g.data(this, a);
                    if (k) {
                        k.option(e || {})._init()
                    } else {
                        g.data(this, a, new b(e, this))
                    }
                })
            }
            return m
        }
    };
    g.Widget = function () {};
    g.Widget._childConstructors = [];
    g.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function (a, b) {
            b = g(b || this.defaultElement || this)[0];
            this.element = g(b);
            this.uuid = f++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = g.widget.extend({}, this.options, this._getCreateOptions(), a);
            this.bindings = g();
            this.hoverable = g();
            this.focusable = g();
            if (b !== this) {
                g.data(b, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (c) {
                        if (c.target === b) {
                            this.destroy()
                        }
                    }
                });
                this.document = g(b.style ? b.ownerDocument : b.document || b);
                this.window = g(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: g.noop,
        _getCreateEventData: g.noop,
        _create: g.noop,
        _init: g.noop,
        destroy: function () {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(g.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: g.noop,
        widget: function () {
            return this.element
        },
        option: function (c, b) {
            var a = c,
                e, d, m;
            if (arguments.length === 0) {
                return g.widget.extend({}, this.options)
            }
            if (typeof c === "string") {
                a = {};
                e = c.split(".");
                c = e.shift();
                if (e.length) {
                    d = a[c] = g.widget.extend({}, this.options[c]);
                    for (m = 0; m < e.length - 1; m++) {
                        d[e[m]] = d[e[m]] || {};
                        d = d[e[m]]
                    }
                    c = e.pop();
                    if (b === h) {
                        return d[c] === h ? null : d[c]
                    }
                    d[c] = b
                } else {
                    if (b === h) {
                        return this.options[c] === h ? null : this.options[c]
                    }
                    a[c] = b
                }
            }
            this._setOptions(a);
            return this
        },
        _setOptions: function (b) {
            var a;
            for (a in b) {
                this._setOption(a, b[a])
            }
            return this
        },
        _setOption: function (b, a) {
            this.options[b] = a;
            if (b === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! a).attr("aria-disabled", a);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            }
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _on: function (b, d, c) {
            var e, a = this;
            if (typeof b !== "boolean") {
                c = d;
                d = b;
                b = false
            }
            if (!c) {
                c = d;
                d = this.element;
                e = this.widget()
            } else {
                d = e = g(d);
                this.bindings = this.bindings.add(d)
            }
            g.each(c, function (r, t) {
                function v() {
                    if (!b && (a.options.disabled === true || g(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof t === "string" ? a[t] : t).apply(a, arguments)
                }
                if (typeof t !== "string") {
                    v.guid = t.guid = t.guid || v.guid || g.guid++
                }
                var u = r.match(/^(\w+)\s*(.*)$/),
                    q = u[1] + a.eventNamespace,
                    s = u[2];
                if (s) {
                    e.delegate(s, q, v)
                } else {
                    d.bind(q, v)
                }
            })
        },
        _off: function (b, a) {
            a = (a || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            b.unbind(a).undelegate(a)
        },
        _delay: function (d, c) {
            function b() {
                return (typeof d === "string" ? a[d] : d).apply(a, arguments)
            }
            var a = this;
            return setTimeout(b, c || 0)
        },
        _hoverable: function (a) {
            this.hoverable = this.hoverable.add(a);
            this._on(a, {
                mouseenter: function (b) {
                    g(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (b) {
                    g(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (a) {
            this.focusable = this.focusable.add(a);
            this._on(a, {
                focusin: function (b) {
                    g(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (b) {
                    g(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (c, a, b) {
            var d, e, l = this.options[c];
            b = b || {};
            a = g.Event(a);
            a.type = (c === this.widgetEventPrefix ? c : this.widgetEventPrefix + c).toLowerCase();
            a.target = this.element[0];
            e = a.originalEvent;
            if (e) {
                for (d in e) {
                    if (!(d in a)) {
                        a[d] = e[d]
                    }
                }
            }
            this.element.trigger(a, b);
            return !(g.isFunction(l) && l.apply(this.element[0], [a].concat(b)) === false || a.isDefaultPrevented())
        }
    };
    g.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (a, b) {
        g.Widget.prototype["_" + a] = function (e, d, n) {
            if (typeof d === "string") {
                d = {
                    effect: d
                }
            }
            var c, m = !d ? a : d === true || typeof d === "number" ? b : d.effect || b;
            d = d || {};
            if (typeof d === "number") {
                d = {
                    duration: d
                }
            }
            c = !g.isEmptyObject(d);
            d.complete = n;
            if (d.delay) {
                e.delay(d.delay)
            }
            if (c && g.effects && g.effects.effect[m]) {
                e[a](d)
            } else {
                if (m !== a && e[m]) {
                    e[m](d.duration, d.easing, n)
                } else {
                    e.queue(function (k) {
                        g(this)[a]();
                        if (n) {
                            n.call(e[0])
                        }
                        k()
                    })
                }
            }
        }
    })
})(jQuery);
(function (f, d) {
    var e = false;
    f(document).mouseup(function () {
        e = false
    });
    f.widget("ui.mouse", {
        version: "1.10.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function (b) {
                return a._mouseDown(b)
            }).bind("click." + this.widgetName, function (b) {
                if (true === f.data(b.target, a.widgetName + ".preventClickEvent")) {
                    f.removeData(b.target, a.widgetName + ".preventClickEvent");
                    b.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                f(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function (b) {
            if (e) {
                return
            }(this._mouseStarted && this._mouseUp(b));
            this._mouseDownEvent = b;
            var a = this,
                c = (b.which === 1),
                h = (typeof this.options.cancel === "string" && b.target.nodeName ? f(b.target).closest(this.options.cancel).length : false);
            if (!c || h || !this._mouseCapture(b)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    a.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = (this._mouseStart(b) !== false);
                if (!this._mouseStarted) {
                    b.preventDefault();
                    return true
                }
            }
            if (true === f.data(b.target, this.widgetName + ".preventClickEvent")) {
                f.removeData(b.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function (g) {
                return a._mouseMove(g)
            };
            this._mouseUpDelegate = function (g) {
                return a._mouseUp(g)
            };
            f(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            b.preventDefault();
            e = true;
            return true
        },
        _mouseMove: function (a) {
            if (f.ui.ie && (!document.documentMode || document.documentMode < 9) && !a.button) {
                return this._mouseUp(a)
            }
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, a) !== false);
                (this._mouseStarted ? this._mouseDrag(a) : this._mouseUp(a))
            }
            return !this._mouseStarted
        },
        _mouseUp: function (a) {
            f(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (a.target === this._mouseDownEvent.target) {
                    f.data(a.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet: function (a) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
(function (d, c) {
    d.widget("ui.draggable", d.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._mouseInit()
        },
        _destroy: function () {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy()
        },
        _mouseCapture: function (a) {
            var b = this.options;
            if (this.helper || b.disabled || d(a.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(a);
            if (!this.handle) {
                return false
            }
            d(b.iframeFix === true ? "iframe" : b.iframeFix).each(function () {
                d("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(d(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function (a) {
            var b = this.options;
            this.helper = this._createHelper(a);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (d.ui.ddmanager) {
                d.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            (b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt));
            if (b.containment) {
                this._setContainment()
            }
            if (this._trigger("start", a) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (d.ui.ddmanager && !b.dropBehaviour) {
                d.ui.ddmanager.prepareOffsets(this, a)
            }
            this._mouseDrag(a, true);
            if (d.ui.ddmanager) {
                d.ui.ddmanager.dragStart(this, a)
            }
            return true
        },
        _mouseDrag: function (f, b) {
            this.position = this._generatePosition(f);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!b) {
                var a = this._uiHash();
                if (this._trigger("drag", f, a) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = a.position
            }
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (d.ui.ddmanager) {
                d.ui.ddmanager.drag(this, f)
            }
            return false
        },
        _mouseStop: function (b) {
            var h, a = this,
                j = false,
                i = false;
            if (d.ui.ddmanager && !this.options.dropBehaviour) {
                i = d.ui.ddmanager.drop(this, b)
            }
            if (this.dropped) {
                i = this.dropped;
                this.dropped = false
            }
            h = this.element[0];
            while (h && (h = h.parentNode)) {
                if (h === document) {
                    j = true
                }
            }
            if (!j && this.options.helper === "original") {
                return false
            }
            if ((this.options.revert === "invalid" && !i) || (this.options.revert === "valid" && i) || this.options.revert === true || (d.isFunction(this.options.revert) && this.options.revert.call(this.element, i))) {
                d(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    if (a._trigger("stop", b) !== false) {
                        a._clear()
                    }
                })
            } else {
                if (this._trigger("stop", b) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function (a) {
            d("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            });
            if (d.ui.ddmanager) {
                d.ui.ddmanager.dragStop(this, a)
            }
            return d.ui.mouse.prototype._mouseUp.call(this, a)
        },
        cancel: function () {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function (a) {
            return this.options.handle ? !! d(a.target).closest(this.element.find(this.options.handle)).length : true
        },
        _createHelper: function (a) {
            var b = this.options,
                f = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a])) : (b.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!f.parents("body").length) {
                f.appendTo((b.appendTo === "parent" ? this.element[0].parentNode : b.appendTo))
            }
            if (f[0] !== this.element[0] && !(/(fixed|absolute)/).test(f.css("position"))) {
                f.css("position", "absolute")
            }
            return f
        },
        _adjustOffsetFromHelper: function (a) {
            if (typeof a === "string") {
                a = a.split(" ")
            }
            if (d.isArray(a)) {
                a = {
                    left: +a[0],
                    top: +a[1] || 0
                }
            }
            if ("left" in a) {
                this.offset.click.left = a.left + this.margins.left
            }
            if ("right" in a) {
                this.offset.click.left = this.helperProportions.width - a.right + this.margins.left
            }
            if ("top" in a) {
                this.offset.click.top = a.top + this.margins.top
            }
            if ("bottom" in a) {
                this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && d.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] === document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && d.ui.ie)) {
                a = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition === "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var a, b, h, i = this.options;
            if (i.containment === "parent") {
                i.containment = this.helper[0].parentNode
            }
            if (i.containment === "document" || i.containment === "window") {
                this.containment = [i.containment === "document" ? 0 : d(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, i.containment === "document" ? 0 : d(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (i.containment === "document" ? 0 : d(window).scrollLeft()) + d(i.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (i.containment === "document" ? 0 : d(window).scrollTop()) + (d(i.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(i.containment) && i.containment.constructor !== Array) {
                b = d(i.containment);
                h = b[0];
                if (!h) {
                    return
                }
                a = (d(h).css("overflow") !== "hidden");
                this.containment = [(parseInt(d(h).css("borderLeftWidth"), 10) || 0) + (parseInt(d(h).css("paddingLeft"), 10) || 0), (parseInt(d(h).css("borderTopWidth"), 10) || 0) + (parseInt(d(h).css("paddingTop"), 10) || 0), (a ? Math.max(h.scrollWidth, h.offsetWidth) : h.offsetWidth) - (parseInt(d(h).css("borderRightWidth"), 10) || 0) - (parseInt(d(h).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (a ? Math.max(h.scrollHeight, h.offsetHeight) : h.offsetHeight) - (parseInt(d(h).css("borderBottomWidth"), 10) || 0) - (parseInt(d(h).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                this.relative_container = b
            } else {
                if (i.containment.constructor === Array) {
                    this.containment = i.containment
                }
            }
        },
        _convertPositionTo: function (b, i) {
            if (!i) {
                i = this.position
            }
            var a = b === "absolute" ? 1 : -1,
                k = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && d.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                j = (/(html|body)/i).test(k[0].tagName);
            return {
                top: (i.top + this.offset.relative.top * a + this.offset.parent.top * a - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (j ? 0 : k.scrollTop())) * a)),
                left: (i.left + this.offset.relative.left * a + this.offset.parent.left * a - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : j ? 0 : k.scrollLeft()) * a))
            }
        },
        _generatePosition: function (a) {
            var m, s, p, n, q = this.options,
                t = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && d.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                r = (/(html|body)/i).test(t[0].tagName),
                b = a.pageX,
                o = a.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (this.relative_container) {
                        s = this.relative_container.offset();
                        m = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]
                    } else {
                        m = this.containment
                    } if (a.pageX - this.offset.click.left < m[0]) {
                        b = m[0] + this.offset.click.left
                    }
                    if (a.pageY - this.offset.click.top < m[1]) {
                        o = m[1] + this.offset.click.top
                    }
                    if (a.pageX - this.offset.click.left > m[2]) {
                        b = m[2] + this.offset.click.left
                    }
                    if (a.pageY - this.offset.click.top > m[3]) {
                        o = m[3] + this.offset.click.top
                    }
                }
                if (q.grid) {
                    p = q.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / q.grid[1]) * q.grid[1] : this.originalPageY;
                    o = m ? ((p - this.offset.click.top >= m[1] || p - this.offset.click.top > m[3]) ? p : ((p - this.offset.click.top >= m[1]) ? p - q.grid[1] : p + q.grid[1])) : p;
                    n = q.grid[0] ? this.originalPageX + Math.round((b - this.originalPageX) / q.grid[0]) * q.grid[0] : this.originalPageX;
                    b = m ? ((n - this.offset.click.left >= m[0] || n - this.offset.click.left > m[2]) ? n : ((n - this.offset.click.left >= m[0]) ? n - q.grid[0] : n + q.grid[0])) : n
                }
            }
            return {
                top: (o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (r ? 0 : t.scrollTop())))),
                left: (b - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : r ? 0 : t.scrollLeft())))
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (a, f, b) {
            b = b || this._uiHash();
            d.ui.plugin.call(this, a, [f, b]);
            if (a === "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return d.Widget.prototype._trigger.call(this, a, f, b)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    d.ui.plugin.add("draggable", "connectToSortable", {
        start: function (a, b) {
            var h = d(this).data("ui-draggable"),
                i = h.options,
                j = d.extend({}, b, {
                    item: h.element
                });
            h.sortables = [];
            d(i.connectToSortable).each(function () {
                var e = d.data(this, "ui-sortable");
                if (e && !e.options.disabled) {
                    h.sortables.push({
                        instance: e,
                        shouldRevert: e.options.revert
                    });
                    e.refreshPositions();
                    e._trigger("activate", a, j)
                }
            })
        },
        stop: function (a, b) {
            var g = d(this).data("ui-draggable"),
                h = d.extend({}, b, {
                    item: g.element
                });
            d.each(g.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    g.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = this.shouldRevert
                    }
                    this.instance._mouseStop(a);
                    this.instance.options.helper = this.instance.options._helper;
                    if (g.options.helper === "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", a, h)
                }
            })
        },
        drag: function (b, h) {
            var a = d(this).data("ui-draggable"),
                g = this;
            d.each(a.sortables, function () {
                var e = false,
                    f = this;
                this.instance.positionAbs = a.positionAbs;
                this.instance.helperProportions = a.helperProportions;
                this.instance.offset.click = a.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    e = true;
                    d.each(a.sortables, function () {
                        this.instance.positionAbs = a.positionAbs;
                        this.instance.helperProportions = a.helperProportions;
                        this.instance.offset.click = a.offset.click;
                        if (this !== f && this.instance._intersectsWith(this.instance.containerCache) && d.contains(f.instance.element[0], this.instance.element[0])) {
                            e = false
                        }
                        return e
                    })
                }
                if (e) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = d(g).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return h.helper[0]
                        };
                        b.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(b, true);
                        this.instance._mouseStart(b, true, true);
                        this.instance.offset.click.top = a.offset.click.top;
                        this.instance.offset.click.left = a.offset.click.left;
                        this.instance.offset.parent.left -= a.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= a.offset.parent.top - this.instance.offset.parent.top;
                        a._trigger("toSortable", b);
                        a.dropped = this.instance.element;
                        a.currentItem = a.element;
                        this.instance.fromOutside = a
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(b)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", b, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(b, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        a._trigger("fromSortable", b);
                        a.dropped = false
                    }
                }
            })
        }
    });
    d.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var a = d("body"),
                b = d(this).data("ui-draggable").options;
            if (a.css("cursor")) {
                b._cursor = a.css("cursor")
            }
            a.css("cursor", b.cursor)
        },
        stop: function () {
            var a = d(this).data("ui-draggable").options;
            if (a._cursor) {
                d("body").css("cursor", a._cursor)
            }
        }
    });
    d.ui.plugin.add("draggable", "opacity", {
        start: function (a, b) {
            var h = d(b.helper),
                g = d(this).data("ui-draggable").options;
            if (h.css("opacity")) {
                g._opacity = h.css("opacity")
            }
            h.css("opacity", g.opacity)
        },
        stop: function (f, a) {
            var b = d(this).data("ui-draggable").options;
            if (b._opacity) {
                d(a.helper).css("opacity", b._opacity)
            }
        }
    });
    d.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var a = d(this).data("ui-draggable");
            if (a.scrollParent[0] !== document && a.scrollParent[0].tagName !== "HTML") {
                a.overflowOffset = a.scrollParent.offset()
            }
        },
        drag: function (g) {
            var a = d(this).data("ui-draggable"),
                b = a.options,
                h = false;
            if (a.scrollParent[0] !== document && a.scrollParent[0].tagName !== "HTML") {
                if (!b.axis || b.axis !== "x") {
                    if ((a.overflowOffset.top + a.scrollParent[0].offsetHeight) - g.pageY < b.scrollSensitivity) {
                        a.scrollParent[0].scrollTop = h = a.scrollParent[0].scrollTop + b.scrollSpeed
                    } else {
                        if (g.pageY - a.overflowOffset.top < b.scrollSensitivity) {
                            a.scrollParent[0].scrollTop = h = a.scrollParent[0].scrollTop - b.scrollSpeed
                        }
                    }
                }
                if (!b.axis || b.axis !== "y") {
                    if ((a.overflowOffset.left + a.scrollParent[0].offsetWidth) - g.pageX < b.scrollSensitivity) {
                        a.scrollParent[0].scrollLeft = h = a.scrollParent[0].scrollLeft + b.scrollSpeed
                    } else {
                        if (g.pageX - a.overflowOffset.left < b.scrollSensitivity) {
                            a.scrollParent[0].scrollLeft = h = a.scrollParent[0].scrollLeft - b.scrollSpeed
                        }
                    }
                }
            } else {
                if (!b.axis || b.axis !== "x") {
                    if (g.pageY - d(document).scrollTop() < b.scrollSensitivity) {
                        h = d(document).scrollTop(d(document).scrollTop() - b.scrollSpeed)
                    } else {
                        if (d(window).height() - (g.pageY - d(document).scrollTop()) < b.scrollSensitivity) {
                            h = d(document).scrollTop(d(document).scrollTop() + b.scrollSpeed)
                        }
                    }
                }
                if (!b.axis || b.axis !== "y") {
                    if (g.pageX - d(document).scrollLeft() < b.scrollSensitivity) {
                        h = d(document).scrollLeft(d(document).scrollLeft() - b.scrollSpeed)
                    } else {
                        if (d(window).width() - (g.pageX - d(document).scrollLeft()) < b.scrollSensitivity) {
                            h = d(document).scrollLeft(d(document).scrollLeft() + b.scrollSpeed)
                        }
                    }
                }
            } if (h !== false && d.ui.ddmanager && !b.dropBehaviour) {
                d.ui.ddmanager.prepareOffsets(a, g)
            }
        }
    });
    d.ui.plugin.add("draggable", "snap", {
        start: function () {
            var a = d(this).data("ui-draggable"),
                b = a.options;
            a.snapElements = [];
            d(b.snap.constructor !== String ? (b.snap.items || ":data(ui-draggable)") : b.snap).each(function () {
                var g = d(this),
                    h = g.offset();
                if (this !== a.element[0]) {
                    a.snapElements.push({
                        item: this,
                        width: g.outerWidth(),
                        height: g.outerHeight(),
                        top: h.top,
                        left: h.left
                    })
                }
            })
        },
        drag: function (b, a) {
            var i, L, M, o, B, C, H, J, G, F, E = d(this).data("ui-draggable"),
                t = E.options,
                r = t.snapTolerance,
                K = a.offset.left,
                D = K + E.helperProportions.width,
                I = a.offset.top,
                l = I + E.helperProportions.height;
            for (G = E.snapElements.length - 1; G >= 0; G--) {
                B = E.snapElements[G].left;
                C = B + E.snapElements[G].width;
                H = E.snapElements[G].top;
                J = H + E.snapElements[G].height;
                if (!((B - r < K && K < C + r && H - r < I && I < J + r) || (B - r < K && K < C + r && H - r < l && l < J + r) || (B - r < D && D < C + r && H - r < I && I < J + r) || (B - r < D && D < C + r && H - r < l && l < J + r))) {
                    if (E.snapElements[G].snapping) {
                        (E.options.snap.release && E.options.snap.release.call(E.element, b, d.extend(E._uiHash(), {
                            snapItem: E.snapElements[G].item
                        })))
                    }
                    E.snapElements[G].snapping = false;
                    continue
                }
                if (t.snapMode !== "inner") {
                    i = Math.abs(H - l) <= r;
                    L = Math.abs(J - I) <= r;
                    M = Math.abs(B - D) <= r;
                    o = Math.abs(C - K) <= r;
                    if (i) {
                        a.position.top = E._convertPositionTo("relative", {
                            top: H - E.helperProportions.height,
                            left: 0
                        }).top - E.margins.top
                    }
                    if (L) {
                        a.position.top = E._convertPositionTo("relative", {
                            top: J,
                            left: 0
                        }).top - E.margins.top
                    }
                    if (M) {
                        a.position.left = E._convertPositionTo("relative", {
                            top: 0,
                            left: B - E.helperProportions.width
                        }).left - E.margins.left
                    }
                    if (o) {
                        a.position.left = E._convertPositionTo("relative", {
                            top: 0,
                            left: C
                        }).left - E.margins.left
                    }
                }
                F = (i || L || M || o);
                if (t.snapMode !== "outer") {
                    i = Math.abs(H - I) <= r;
                    L = Math.abs(J - l) <= r;
                    M = Math.abs(B - K) <= r;
                    o = Math.abs(C - D) <= r;
                    if (i) {
                        a.position.top = E._convertPositionTo("relative", {
                            top: H,
                            left: 0
                        }).top - E.margins.top
                    }
                    if (L) {
                        a.position.top = E._convertPositionTo("relative", {
                            top: J - E.helperProportions.height,
                            left: 0
                        }).top - E.margins.top
                    }
                    if (M) {
                        a.position.left = E._convertPositionTo("relative", {
                            top: 0,
                            left: B
                        }).left - E.margins.left
                    }
                    if (o) {
                        a.position.left = E._convertPositionTo("relative", {
                            top: 0,
                            left: C - E.helperProportions.width
                        }).left - E.margins.left
                    }
                }
                if (!E.snapElements[G].snapping && (i || L || M || o || F)) {
                    (E.options.snap.snap && E.options.snap.snap.call(E.element, b, d.extend(E._uiHash(), {
                        snapItem: E.snapElements[G].item
                    })))
                }
                E.snapElements[G].snapping = (i || L || M || o || F)
            }
        }
    });
    d.ui.plugin.add("draggable", "stack", {
        start: function () {
            var f, b = this.data("ui-draggable").options,
                a = d.makeArray(d(b.stack)).sort(function (h, e) {
                    return (parseInt(d(h).css("zIndex"), 10) || 0) - (parseInt(d(e).css("zIndex"), 10) || 0)
                });
            if (!a.length) {
                return
            }
            f = parseInt(d(a[0]).css("zIndex"), 10) || 0;
            d(a).each(function (e) {
                d(this).css("zIndex", f + e)
            });
            this.css("zIndex", (f + a.length))
        }
    });
    d.ui.plugin.add("draggable", "zIndex", {
        start: function (a, b) {
            var h = d(b.helper),
                g = d(this).data("ui-draggable").options;
            if (h.css("zIndex")) {
                g._zIndex = h.css("zIndex")
            }
            h.css("zIndex", g.zIndex)
        },
        stop: function (f, a) {
            var b = d(this).data("ui-draggable").options;
            if (b._zIndex) {
                d(a.helper).css("zIndex", b._zIndex)
            }
        }
    })
})(jQuery);
(function (d, e) {
    function f(a, b, c) {
        return (a > b) && (a < (b + c))
    }
    d.widget("ui.droppable", {
        version: "1.10.2",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var a = this.options,
                b = a.accept;
            this.isover = false;
            this.isout = true;
            this.accept = d.isFunction(b) ? b : function (c) {
                return c.is(b)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            d.ui.ddmanager.droppables[a.scope] = d.ui.ddmanager.droppables[a.scope] || [];
            d.ui.ddmanager.droppables[a.scope].push(this);
            (a.addClasses && this.element.addClass("ui-droppable"))
        },
        _destroy: function () {
            var b = 0,
                a = d.ui.ddmanager.droppables[this.options.scope];
            for (; b < a.length; b++) {
                if (a[b] === this) {
                    a.splice(b, 1)
                }
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (a, b) {
            if (a === "accept") {
                this.accept = d.isFunction(b) ? b : function (c) {
                    return c.is(b)
                }
            }
            d.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (a) {
            var b = d.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            if (b) {
                this._trigger("activate", a, this.ui(b))
            }
        },
        _deactivate: function (a) {
            var b = d.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            if (b) {
                this._trigger("deactivate", a, this.ui(b))
            }
        },
        _over: function (a) {
            var b = d.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", a, this.ui(b))
            }
        },
        _out: function (a) {
            var b = d.ui.ddmanager.current;
            if (!b || (b.currentItem || b.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", a, this.ui(b))
            }
        },
        _drop: function (a, b) {
            var c = b || d.ui.ddmanager.current,
                h = false;
            if (!c || (c.currentItem || c.element)[0] === this.element[0]) {
                return false
            }
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var g = d.data(this, "ui-droppable");
                if (g.options.greedy && !g.options.disabled && g.options.scope === c.options.scope && g.accept.call(g.element[0], (c.currentItem || c.element)) && d.ui.intersect(c, d.extend(g, {
                    offset: g.element.offset()
                }), g.options.tolerance)) {
                    h = true;
                    return false
                }
            });
            if (h) {
                return false
            }
            if (this.accept.call(this.element[0], (c.currentItem || c.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", a, this.ui(c));
                return this.element
            }
            return false
        },
        ui: function (a) {
            return {
                draggable: (a.currentItem || a.element),
                helper: a.helper,
                position: a.position,
                offset: a.positionAbs
            }
        }
    });
    d.ui.intersect = function (b, y, a) {
        if (!y.offset) {
            return false
        }
        var c, l, v = (b.positionAbs || b.position.absolute).left,
            t = v + b.helperProportions.width,
            w = (b.positionAbs || b.position.absolute).top,
            u = w + b.helperProportions.height,
            r = y.offset.left,
            z = r + y.proportions.width,
            x = y.offset.top,
            s = x + y.proportions.height;
        switch (a) {
        case "fit":
            return (r <= v && t <= z && x <= w && u <= s);
        case "intersect":
            return (r < v + (b.helperProportions.width / 2) && t - (b.helperProportions.width / 2) < z && x < w + (b.helperProportions.height / 2) && u - (b.helperProportions.height / 2) < s);
        case "pointer":
            c = ((b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left);
            l = ((b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top);
            return f(l, x, y.proportions.height) && f(c, r, y.proportions.width);
        case "touch":
            return ((w >= x && w <= s) || (u >= x && u <= s) || (w < x && u > s)) && ((v >= r && v <= z) || (t >= r && t <= z) || (v < r && t > z));
        default:
            return false
        }
    };
    d.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (i, c) {
            var m, a, n = d.ui.ddmanager.droppables[i.options.scope] || [],
                b = c ? c.type : null,
                j = (i.currentItem || i.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (m = 0; m < n.length; m++) {
                if (n[m].options.disabled || (i && !n[m].accept.call(n[m].element[0], (i.currentItem || i.element)))) {
                    continue
                }
                for (a = 0; a < j.length; a++) {
                    if (j[a] === n[m].element[0]) {
                        n[m].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                n[m].visible = n[m].element.css("display") !== "none";
                if (!n[m].visible) {
                    continue
                }
                if (b === "mousedown") {
                    n[m]._activate.call(n[m], c)
                }
                n[m].offset = n[m].element.offset();
                n[m].proportions = {
                    width: n[m].element[0].offsetWidth,
                    height: n[m].element[0].offsetHeight
                }
            }
        },
        drop: function (c, a) {
            var b = false;
            d.each((d.ui.ddmanager.droppables[c.options.scope] || []).slice(), function () {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && d.ui.intersect(c, this, this.options.tolerance)) {
                    b = this._drop.call(this, a) || b
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (c.currentItem || c.element))) {
                    this.isout = true;
                    this.isover = false;
                    this._deactivate.call(this, a)
                }
            });
            return b
        },
        dragStart: function (a, b) {
            a.element.parentsUntil("body").bind("scroll.droppable", function () {
                if (!a.options.refreshPositions) {
                    d.ui.ddmanager.prepareOffsets(a, b)
                }
            })
        },
        drag: function (a, b) {
            if (a.options.refreshPositions) {
                d.ui.ddmanager.prepareOffsets(a, b)
            }
            d.each(d.ui.ddmanager.droppables[a.options.scope] || [], function () {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var c, l, k, m = d.ui.intersect(a, this, this.options.tolerance),
                    n = !m && this.isover ? "isout" : (m && !this.isover ? "isover" : null);
                if (!n) {
                    return
                }
                if (this.options.greedy) {
                    l = this.options.scope;
                    k = this.element.parents(":data(ui-droppable)").filter(function () {
                        return d.data(this, "ui-droppable").options.scope === l
                    });
                    if (k.length) {
                        c = d.data(k[0], "ui-droppable");
                        c.greedyChild = (n === "isover")
                    }
                }
                if (c && n === "isover") {
                    c.isover = false;
                    c.isout = true;
                    c._out.call(c, b)
                }
                this[n] = true;
                this[n === "isout" ? "isover" : "isout"] = false;
                this[n === "isover" ? "_over" : "_out"].call(this, b);
                if (c && n === "isout") {
                    c.isout = false;
                    c.isover = true;
                    c._over.call(c, b)
                }
            })
        },
        dragStop: function (a, b) {
            a.element.parentsUntil("body").unbind("scroll.droppable");
            if (!a.options.refreshPositions) {
                d.ui.ddmanager.prepareOffsets(a, b)
            }
        }
    }
})(jQuery);
(function (h, g) {
    function e(a) {
        return parseInt(a, 10) || 0
    }

    function f(a) {
        return !isNaN(parseInt(a, 10))
    }
    h.widget("ui.resizable", h.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function () {
            var d, m, a, c, n, b = this,
                i = this.options;
            this.element.addClass("ui-resizable");
            h.extend(this, {
                _aspectRatio: !! (i.aspectRatio),
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(h("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = i.handles || (!h(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                d = this.handles.split(",");
                this.handles = {};
                for (m = 0; m < d.length; m++) {
                    a = h.trim(d[m]);
                    n = "ui-resizable-" + a;
                    c = h("<div class='ui-resizable-handle " + n + "'></div>");
                    c.css({
                        zIndex: i.zIndex
                    });
                    if ("se" === a) {
                        c.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[a] = ".ui-resizable-" + a;
                    this.element.append(c)
                }
            }
            this._renderAxis = function (r) {
                var s, l, j, k;
                r = r || this.element;
                for (s in this.handles) {
                    if (this.handles[s].constructor === String) {
                        this.handles[s] = h(this.handles[s], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        l = h(this.handles[s], this.element);
                        k = /sw|ne|nw|se|n|s/.test(s) ? l.outerHeight() : l.outerWidth();
                        j = ["padding", /ne|nw|n/.test(s) ? "Top" : /se|sw|s/.test(s) ? "Bottom" : /^e$/.test(s) ? "Right" : "Left"].join("");
                        r.css(j, k);
                        this._proportionallyResize()
                    }
                    if (!h(this.handles[s]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = h(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!b.resizing) {
                    if (this.className) {
                        c = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    b.axis = c && c[1] ? c[1] : "se"
                }
            });
            if (i.autoHide) {
                this._handles.hide();
                h(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                    if (i.disabled) {
                        return
                    }
                    h(this).removeClass("ui-resizable-autohide");
                    b._handles.show()
                }).mouseleave(function () {
                    if (i.disabled) {
                        return
                    }
                    if (!b.resizing) {
                        h(this).addClass("ui-resizable-autohide");
                        b._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var a, b = function (c) {
                    h(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
            if (this.elementIsWrapper) {
                b(this.element);
                a = this.element;
                this.originalElement.css({
                    position: a.css("position"),
                    width: a.outerWidth(),
                    height: a.outerHeight(),
                    top: a.css("top"),
                    left: a.css("left")
                }).insertAfter(a);
                a.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            b(this.originalElement);
            return this
        },
        _mouseCapture: function (d) {
            var b, c, a = false;
            for (b in this.handles) {
                c = h(this.handles[b])[0];
                if (c === d.target || h.contains(c, d.target)) {
                    a = true
                }
            }
            return !this.options.disabled && a
        },
        _mouseStart: function (c) {
            var n, d, b, l = this.options,
                m = this.element.position(),
                a = this.element;
            this.resizing = true;
            if ((/absolute/).test(a.css("position"))) {
                a.css({
                    position: "absolute",
                    top: a.css("top"),
                    left: a.css("left")
                })
            } else {
                if (a.is(".ui-draggable")) {
                    a.css({
                        position: "absolute",
                        top: m.top,
                        left: m.left
                    })
                }
            }
            this._renderProxy();
            n = e(this.helper.css("left"));
            d = e(this.helper.css("top"));
            if (l.containment) {
                n += h(l.containment).scrollLeft() || 0;
                d += h(l.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: n,
                top: d
            };
            this.size = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            } : {
                width: a.width(),
                height: a.height()
            };
            this.originalSize = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            } : {
                width: a.width(),
                height: a.height()
            };
            this.originalPosition = {
                left: n,
                top: d
            };
            this.sizeDiff = {
                width: a.outerWidth() - a.width(),
                height: a.outerHeight() - a.height()
            };
            this.originalMousePosition = {
                left: c.pageX,
                top: c.pageY
            };
            this.aspectRatio = (typeof l.aspectRatio === "number") ? l.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            b = h(".ui-resizable-" + this.axis).css("cursor");
            h("body").css("cursor", b === "auto" ? this.axis + "-resize" : b);
            a.addClass("ui-resizable-resizing");
            this._propagate("start", c);
            return true
        },
        _mouseDrag: function (b) {
            var s, z = this.helper,
                y = {}, d = this.originalMousePosition,
                w = this.axis,
                c = this.position.top,
                a = this.position.left,
                u = this.size.width,
                x = this.size.height,
                t = (b.pageX - d.left) || 0,
                r = (b.pageY - d.top) || 0,
                v = this._change[w];
            if (!v) {
                return false
            }
            s = v.apply(this, [b, t, r]);
            this._updateVirtualBoundaries(b.shiftKey);
            if (this._aspectRatio || b.shiftKey) {
                s = this._updateRatio(s, b)
            }
            s = this._respectSize(s, b);
            this._updateCache(s);
            this._propagate("resize", b);
            if (this.position.top !== c) {
                y.top = this.position.top + "px"
            }
            if (this.position.left !== a) {
                y.left = this.position.left + "px"
            }
            if (this.size.width !== u) {
                y.width = this.size.width + "px"
            }
            if (this.size.height !== x) {
                y.height = this.size.height + "px"
            }
            z.css(y);
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!h.isEmptyObject(y)) {
                this._trigger("resize", b, this.ui())
            }
            return false
        },
        _mouseStop: function (a) {
            this.resizing = false;
            var b, c, t, s, p, q, d, r = this.options,
                o = this;
            if (this._helper) {
                b = this._proportionallyResizeElements;
                c = b.length && (/textarea/i).test(b[0].nodeName);
                t = c && h.ui.hasScroll(b[0], "left") ? 0 : o.sizeDiff.height;
                s = c ? 0 : o.sizeDiff.width;
                p = {
                    width: (o.helper.width() - s),
                    height: (o.helper.height() - t)
                };
                q = (parseInt(o.element.css("left"), 10) + (o.position.left - o.originalPosition.left)) || null;
                d = (parseInt(o.element.css("top"), 10) + (o.position.top - o.originalPosition.top)) || null;
                if (!r.animate) {
                    this.element.css(h.extend(p, {
                        top: d,
                        left: q
                    }))
                }
                o.helper.height(o.size.height);
                o.helper.width(o.size.width);
                if (this._helper && !r.animate) {
                    this._proportionallyResize()
                }
            }
            h("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", a);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateVirtualBoundaries: function (n) {
            var m, a, d, b, c, l = this.options;
            c = {
                minWidth: f(l.minWidth) ? l.minWidth : 0,
                maxWidth: f(l.maxWidth) ? l.maxWidth : Infinity,
                minHeight: f(l.minHeight) ? l.minHeight : 0,
                maxHeight: f(l.maxHeight) ? l.maxHeight : Infinity
            };
            if (this._aspectRatio || n) {
                m = c.minHeight * this.aspectRatio;
                d = c.minWidth / this.aspectRatio;
                a = c.maxHeight * this.aspectRatio;
                b = c.maxWidth / this.aspectRatio;
                if (m > c.minWidth) {
                    c.minWidth = m
                }
                if (d > c.minHeight) {
                    c.minHeight = d
                }
                if (a < c.maxWidth) {
                    c.maxWidth = a
                }
                if (b < c.maxHeight) {
                    c.maxHeight = b
                }
            }
            this._vBoundaries = c
        },
        _updateCache: function (a) {
            this.offset = this.helper.offset();
            if (f(a.left)) {
                this.position.left = a.left
            }
            if (f(a.top)) {
                this.position.top = a.top
            }
            if (f(a.height)) {
                this.size.height = a.height
            }
            if (f(a.width)) {
                this.size.width = a.width
            }
        },
        _updateRatio: function (b) {
            var a = this.position,
                d = this.size,
                c = this.axis;
            if (f(b.height)) {
                b.width = (b.height * this.aspectRatio)
            } else {
                if (f(b.width)) {
                    b.height = (b.width / this.aspectRatio)
                }
            } if (c === "sw") {
                b.left = a.left + (d.width - b.width);
                b.top = null
            }
            if (c === "nw") {
                b.top = a.top + (d.height - b.height);
                b.left = a.left + (d.width - b.width)
            }
            return b
        },
        _respectSize: function (r) {
            var v = this._vBoundaries,
                b = this.axis,
                t = f(r.width) && v.maxWidth && (v.maxWidth < r.width),
                o = f(r.height) && v.maxHeight && (v.maxHeight < r.height),
                c = f(r.width) && v.minWidth && (v.minWidth > r.width),
                q = f(r.height) && v.minHeight && (v.minHeight > r.height),
                d = this.originalPosition.left + this.originalSize.width,
                u = this.position.top + this.size.height,
                a = /sw|nw|w/.test(b),
                s = /nw|ne|n/.test(b);
            if (c) {
                r.width = v.minWidth
            }
            if (q) {
                r.height = v.minHeight
            }
            if (t) {
                r.width = v.maxWidth
            }
            if (o) {
                r.height = v.maxHeight
            }
            if (c && a) {
                r.left = d - v.minWidth
            }
            if (t && a) {
                r.left = d - v.maxWidth
            }
            if (q && s) {
                r.top = u - v.minHeight
            }
            if (o && s) {
                r.top = u - v.maxHeight
            }
            if (!r.width && !r.height && !r.left && r.top) {
                r.top = null
            } else {
                if (!r.width && !r.height && !r.top && r.left) {
                    r.left = null
                }
            }
            return r
        },
        _proportionallyResize: function () {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var d, i, b, j, c, a = this.helper || this.element;
            for (d = 0; d < this._proportionallyResizeElements.length; d++) {
                c = this._proportionallyResizeElements[d];
                if (!this.borderDif) {
                    this.borderDif = [];
                    b = [c.css("borderTopWidth"), c.css("borderRightWidth"), c.css("borderBottomWidth"), c.css("borderLeftWidth")];
                    j = [c.css("paddingTop"), c.css("paddingRight"), c.css("paddingBottom"), c.css("paddingLeft")];
                    for (i = 0; i < b.length; i++) {
                        this.borderDif[i] = (parseInt(b[i], 10) || 0) + (parseInt(j[i], 10) || 0)
                    }
                }
                c.css({
                    height: (a.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (a.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        },
        _renderProxy: function () {
            var a = this.element,
                b = this.options;
            this.elementOffset = a.offset();
            if (this._helper) {
                this.helper = this.helper || h("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++b.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function (a, b) {
                return {
                    width: this.originalSize.width + b
                }
            },
            w: function (c, a) {
                var b = this.originalSize,
                    d = this.originalPosition;
                return {
                    left: d.left + a,
                    width: b.width - a
                }
            },
            n: function (d, a, j) {
                var c = this.originalSize,
                    b = this.originalPosition;
                return {
                    top: b.top + j,
                    height: c.height - j
                }
            },
            s: function (b, a, c) {
                return {
                    height: this.originalSize.height + c
                }
            },
            se: function (b, a, c) {
                return h.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            sw: function (b, a, c) {
                return h.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            },
            ne: function (b, a, c) {
                return h.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            nw: function (b, a, c) {
                return h.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            }
        },
        _propagate: function (a, b) {
            h.ui.plugin.call(this, a, [b, this.ui()]);
            (a !== "resize" && this._trigger(a, b, this.ui()))
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    h.ui.plugin.add("resizable", "animate", {
        stop: function (a) {
            var o = h(this).data("ui-resizable"),
                r = o.options,
                b = o._proportionallyResizeElements,
                c = b.length && (/textarea/i).test(b[0].nodeName),
                t = c && h.ui.hasScroll(b[0], "left") ? 0 : o.sizeDiff.height,
                s = c ? 0 : o.sizeDiff.width,
                p = {
                    width: (o.size.width - s),
                    height: (o.size.height - t)
                }, q = (parseInt(o.element.css("left"), 10) + (o.position.left - o.originalPosition.left)) || null,
                d = (parseInt(o.element.css("top"), 10) + (o.position.top - o.originalPosition.top)) || null;
            o.element.animate(h.extend(p, d && q ? {
                top: d,
                left: q
            } : {}), {
                duration: r.animateDuration,
                easing: r.animateEasing,
                step: function () {
                    var i = {
                        width: parseInt(o.element.css("width"), 10),
                        height: parseInt(o.element.css("height"), 10),
                        top: parseInt(o.element.css("top"), 10),
                        left: parseInt(o.element.css("left"), 10)
                    };
                    if (b && b.length) {
                        h(b[0]).css({
                            width: i.width,
                            height: i.height
                        })
                    }
                    o._updateCache(i);
                    o._propagate("resize", a)
                }
            })
        }
    });
    h.ui.plugin.add("resizable", "containment", {
        start: function () {
            var t, c, w, u, x, b, v, s = h(this).data("ui-resizable"),
                d = s.options,
                o = s.element,
                a = d.containment,
                p = (a instanceof h) ? a.get(0) : (/parent/.test(a)) ? o.parent().get(0) : a;
            if (!p) {
                return
            }
            s.containerElement = h(p);
            if (/document/.test(a) || a === document) {
                s.containerOffset = {
                    left: 0,
                    top: 0
                };
                s.containerPosition = {
                    left: 0,
                    top: 0
                };
                s.parentData = {
                    element: h(document),
                    left: 0,
                    top: 0,
                    width: h(document).width(),
                    height: h(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                t = h(p);
                c = [];
                h(["Top", "Right", "Left", "Bottom"]).each(function (j, i) {
                    c[j] = e(t.css("padding" + i))
                });
                s.containerOffset = t.offset();
                s.containerPosition = t.position();
                s.containerSize = {
                    height: (t.innerHeight() - c[3]),
                    width: (t.innerWidth() - c[1])
                };
                w = s.containerOffset;
                u = s.containerSize.height;
                x = s.containerSize.width;
                b = (h.ui.hasScroll(p, "left") ? p.scrollWidth : x);
                v = (h.ui.hasScroll(p) ? p.scrollHeight : u);
                s.parentData = {
                    element: p,
                    left: w.left,
                    top: w.top,
                    width: b,
                    height: v
                }
            }
        },
        resize: function (b) {
            var x, o, t, c, w = h(this).data("ui-resizable"),
                a = w.options,
                r = w.containerOffset,
                s = w.position,
                v = w._aspectRatio || b.shiftKey,
                d = {
                    top: 0,
                    left: 0
                }, u = w.containerElement;
            if (u[0] !== document && (/static/).test(u.css("position"))) {
                d = r
            }
            if (s.left < (w._helper ? r.left : 0)) {
                w.size.width = w.size.width + (w._helper ? (w.position.left - r.left) : (w.position.left - d.left));
                if (v) {
                    w.size.height = w.size.width / w.aspectRatio
                }
                w.position.left = a.helper ? r.left : 0
            }
            if (s.top < (w._helper ? r.top : 0)) {
                w.size.height = w.size.height + (w._helper ? (w.position.top - r.top) : w.position.top);
                if (v) {
                    w.size.width = w.size.height * w.aspectRatio
                }
                w.position.top = w._helper ? r.top : 0
            }
            w.offset.left = w.parentData.left + w.position.left;
            w.offset.top = w.parentData.top + w.position.top;
            x = Math.abs((w._helper ? w.offset.left - d.left : (w.offset.left - d.left)) + w.sizeDiff.width);
            o = Math.abs((w._helper ? w.offset.top - d.top : (w.offset.top - r.top)) + w.sizeDiff.height);
            t = w.containerElement.get(0) === w.element.parent().get(0);
            c = /relative|absolute/.test(w.containerElement.css("position"));
            if (t && c) {
                x -= w.parentData.left
            }
            if (x + w.size.width >= w.parentData.width) {
                w.size.width = w.parentData.width - x;
                if (v) {
                    w.size.height = w.size.width / w.aspectRatio
                }
            }
            if (o + w.size.height >= w.parentData.height) {
                w.size.height = w.parentData.height - o;
                if (v) {
                    w.size.width = w.size.height * w.aspectRatio
                }
            }
        },
        stop: function () {
            var c = h(this).data("ui-resizable"),
                s = c.options,
                d = c.containerOffset,
                q = c.containerPosition,
                p = c.containerElement,
                r = h(c.helper),
                a = r.offset(),
                b = r.outerWidth() - c.sizeDiff.width,
                o = r.outerHeight() - c.sizeDiff.height;
            if (c._helper && !s.animate && (/relative/).test(p.css("position"))) {
                h(this).css({
                    left: a.left - q.left - d.left,
                    width: b,
                    height: o
                })
            }
            if (c._helper && !s.animate && (/static/).test(p.css("position"))) {
                h(this).css({
                    left: a.left - q.left - d.left,
                    width: b,
                    height: o
                })
            }
        }
    });
    h.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var b = h(this).data("ui-resizable"),
                c = b.options,
                a = function (d) {
                    h(d).each(function () {
                        var j = h(this);
                        j.data("ui-resizable-alsoresize", {
                            width: parseInt(j.width(), 10),
                            height: parseInt(j.height(), 10),
                            left: parseInt(j.css("left"), 10),
                            top: parseInt(j.css("top"), 10)
                        })
                    })
                };
            if (typeof (c.alsoResize) === "object" && !c.alsoResize.parentNode) {
                if (c.alsoResize.length) {
                    c.alsoResize = c.alsoResize[0];
                    a(c.alsoResize)
                } else {
                    h.each(c.alsoResize, function (d) {
                        a(d)
                    })
                }
            } else {
                a(c.alsoResize)
            }
        },
        resize: function (a, d) {
            var n = h(this).data("ui-resizable"),
                m = n.options,
                c = n.originalSize,
                b = n.originalPosition,
                p = {
                    height: (n.size.height - c.height) || 0,
                    width: (n.size.width - c.width) || 0,
                    top: (n.position.top - b.top) || 0,
                    left: (n.position.left - b.left) || 0
                }, o = function (i, j) {
                    h(i).each(function () {
                        var k = h(this),
                            l = h(this).data("ui-resizable-alsoresize"),
                            s = {}, t = j && j.length ? j : k.parents(d.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        h.each(t, function (q, r) {
                            var v = (l[r] || 0) + (p[r] || 0);
                            if (v && v >= 0) {
                                s[r] = v || null
                            }
                        });
                        k.css(s)
                    })
                };
            if (typeof (m.alsoResize) === "object" && !m.alsoResize.nodeType) {
                h.each(m.alsoResize, function (i, j) {
                    o(i, j)
                })
            } else {
                o(m.alsoResize)
            }
        },
        stop: function () {
            h(this).removeData("resizable-alsoresize")
        }
    });
    h.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var a = h(this).data("ui-resizable"),
                b = a.options,
                c = a.size;
            a.ghost = a.originalElement.clone();
            a.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: c.height,
                width: c.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof b.ghost === "string" ? b.ghost : "");
            a.ghost.appendTo(a.helper)
        },
        resize: function () {
            var a = h(this).data("ui-resizable");
            if (a.ghost) {
                a.ghost.css({
                    position: "relative",
                    height: a.size.height,
                    width: a.size.width
                })
            }
        },
        stop: function () {
            var a = h(this).data("ui-resizable");
            if (a.ghost && a.helper) {
                a.helper.get(0).removeChild(a.ghost.get(0))
            }
        }
    });
    h.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var y = h(this).data("ui-resizable"),
                o = y.options,
                B = y.size,
                E = y.originalSize,
                x = y.originalPosition,
                c = y.axis,
                A = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
                G = (A[0] || 1),
                H = (A[1] || 1),
                D = Math.round((B.width - E.width) / G) * G,
                w = Math.round((B.height - E.height) / H) * H,
                C = E.width + D,
                a = E.height + w,
                z = o.maxWidth && (o.maxWidth < C),
                F = o.maxHeight && (o.maxHeight < a),
                b = o.minWidth && (o.minWidth > C),
                d = o.minHeight && (o.minHeight > a);
            o.grid = A;
            if (b) {
                C = C + G
            }
            if (d) {
                a = a + H
            }
            if (z) {
                C = C - G
            }
            if (F) {
                a = a - H
            }
            if (/^(se|s|e)$/.test(c)) {
                y.size.width = C;
                y.size.height = a
            } else {
                if (/^(ne)$/.test(c)) {
                    y.size.width = C;
                    y.size.height = a;
                    y.position.top = x.top - w
                } else {
                    if (/^(sw)$/.test(c)) {
                        y.size.width = C;
                        y.size.height = a;
                        y.position.left = x.left - D
                    } else {
                        y.size.width = C;
                        y.size.height = a;
                        y.position.top = x.top - w;
                        y.position.left = x.left - D
                    }
                }
            }
        }
    })
})(jQuery);
(function (d, c) {
    d.widget("ui.selectable", d.ui.mouse, {
        version: "1.10.2",
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function () {
            var b, a = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            this.refresh = function () {
                b = d(a.options.filter, a.element[0]);
                b.addClass("ui-selectee");
                b.each(function () {
                    var g = d(this),
                        h = g.offset();
                    d.data(this, "selectable-item", {
                        element: this,
                        $element: g,
                        left: h.left,
                        top: h.top,
                        right: h.left + g.outerWidth(),
                        bottom: h.top + g.outerHeight(),
                        startselected: false,
                        selected: g.hasClass("ui-selected"),
                        selecting: g.hasClass("ui-selecting"),
                        unselecting: g.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = b.addClass("ui-selectee");
            this._mouseInit();
            this.helper = d("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled");
            this._mouseDestroy()
        },
        _mouseStart: function (a) {
            var f = this,
                b = this.options;
            this.opos = [a.pageX, a.pageY];
            if (this.options.disabled) {
                return
            }
            this.selectees = d(b.filter, this.element[0]);
            this._trigger("start", a);
            d(b.appendTo).append(this.helper);
            this.helper.css({
                left: a.pageX,
                top: a.pageY,
                width: 0,
                height: 0
            });
            if (b.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function () {
                var e = d.data(this, "selectable-item");
                e.startselected = true;
                if (!a.metaKey && !a.ctrlKey) {
                    e.$element.removeClass("ui-selected");
                    e.selected = false;
                    e.$element.addClass("ui-unselecting");
                    e.unselecting = true;
                    f._trigger("unselecting", a, {
                        unselecting: e.element
                    })
                }
            });
            d(a.target).parents().addBack().each(function () {
                var h, e = d.data(this, "selectable-item");
                if (e) {
                    h = (!a.metaKey && !a.ctrlKey) || !e.$element.hasClass("ui-selected");
                    e.$element.removeClass(h ? "ui-unselecting" : "ui-selected").addClass(h ? "ui-selecting" : "ui-unselecting");
                    e.unselecting = !h;
                    e.selecting = h;
                    e.selected = h;
                    if (h) {
                        f._trigger("selecting", a, {
                            selecting: e.element
                        })
                    } else {
                        f._trigger("unselecting", a, {
                            unselecting: e.element
                        })
                    }
                    return false
                }
            })
        },
        _mouseDrag: function (l) {
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var o, k = this,
                b = this.options,
                n = this.opos[0],
                a = this.opos[1],
                m = l.pageX,
                p = l.pageY;
            if (n > m) {
                o = m;
                m = n;
                n = o
            }
            if (a > p) {
                o = p;
                p = a;
                a = o
            }
            this.helper.css({
                left: n,
                top: a,
                width: m - n,
                height: p - a
            });
            this.selectees.each(function () {
                var f = d.data(this, "selectable-item"),
                    e = false;
                if (!f || f.element === k.element[0]) {
                    return
                }
                if (b.tolerance === "touch") {
                    e = (!(f.left > m || f.right < n || f.top > p || f.bottom < a))
                } else {
                    if (b.tolerance === "fit") {
                        e = (f.left > n && f.right < m && f.top > a && f.bottom < p)
                    }
                } if (e) {
                    if (f.selected) {
                        f.$element.removeClass("ui-selected");
                        f.selected = false
                    }
                    if (f.unselecting) {
                        f.$element.removeClass("ui-unselecting");
                        f.unselecting = false
                    }
                    if (!f.selecting) {
                        f.$element.addClass("ui-selecting");
                        f.selecting = true;
                        k._trigger("selecting", l, {
                            selecting: f.element
                        })
                    }
                } else {
                    if (f.selecting) {
                        if ((l.metaKey || l.ctrlKey) && f.startselected) {
                            f.$element.removeClass("ui-selecting");
                            f.selecting = false;
                            f.$element.addClass("ui-selected");
                            f.selected = true
                        } else {
                            f.$element.removeClass("ui-selecting");
                            f.selecting = false;
                            if (f.startselected) {
                                f.$element.addClass("ui-unselecting");
                                f.unselecting = true
                            }
                            k._trigger("unselecting", l, {
                                unselecting: f.element
                            })
                        }
                    }
                    if (f.selected) {
                        if (!l.metaKey && !l.ctrlKey && !f.startselected) {
                            f.$element.removeClass("ui-selected");
                            f.selected = false;
                            f.$element.addClass("ui-unselecting");
                            f.unselecting = true;
                            k._trigger("unselecting", l, {
                                unselecting: f.element
                            })
                        }
                    }
                }
            });
            return false
        },
        _mouseStop: function (b) {
            var a = this;
            this.dragged = false;
            d(".ui-unselecting", this.element[0]).each(function () {
                var f = d.data(this, "selectable-item");
                f.$element.removeClass("ui-unselecting");
                f.unselecting = false;
                f.startselected = false;
                a._trigger("unselected", b, {
                    unselected: f.element
                })
            });
            d(".ui-selecting", this.element[0]).each(function () {
                var f = d.data(this, "selectable-item");
                f.$element.removeClass("ui-selecting").addClass("ui-selected");
                f.selecting = false;
                f.selected = true;
                f.startselected = true;
                a._trigger("selected", b, {
                    selected: f.element
                })
            });
            this._trigger("stop", b);
            this.helper.remove();
            return false
        }
    })
})(jQuery);
(function (f, e) {
    function h(a, b, c) {
        return (a > b) && (a < (b + c))
    }

    function g(a) {
        return (/left|right/).test(a.css("float")) || (/inline|table-cell/).test(a.css("display"))
    }
    f.widget("ui.sortable", f.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function () {
            var a = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? a.axis === "x" || g(this.items[0].item) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this.ready = true
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) {
                this.items[a].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _setOption: function (a, b) {
            if (a === "disabled") {
                this.options[a] = b;
                this.widget().toggleClass("ui-sortable-disabled", !! b)
            } else {
                f.Widget.prototype._setOption.apply(this, arguments)
            }
        },
        _mouseCapture: function (j, a) {
            var b = null,
                d = false,
                c = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type === "static") {
                return false
            }
            this._refreshItems(j);
            f(j.target).parents().each(function () {
                if (f.data(this, c.widgetName + "-item") === c) {
                    b = f(this);
                    return false
                }
            });
            if (f.data(j.target, c.widgetName + "-item") === c) {
                b = f(j.target)
            }
            if (!b) {
                return false
            }
            if (this.options.handle && !a) {
                f(this.options.handle, b).find("*").addBack().each(function () {
                    if (this === j.target) {
                        d = true
                    }
                });
                if (!d) {
                    return false
                }
            }
            this.currentItem = b;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (a, b, c) {
            var l, d, i = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            f.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            (i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] !== this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (i.containment) {
                this._setContainment()
            }
            if (i.cursor && i.cursor !== "auto") {
                d = this.document.find("body");
                this.storedCursor = d.css("cursor");
                d.css("cursor", i.cursor);
                this.storedStylesheet = f("<style>*{ cursor: " + i.cursor + " !important; }</style>").appendTo(d)
            }
            if (i.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", i.opacity)
            }
            if (i.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", i.zIndex)
            }
            if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", a, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!c) {
                for (l = this.containers.length - 1; l >= 0; l--) {
                    this.containers[l]._trigger("activate", a, this._uiHash(this))
                }
            }
            if (f.ui.ddmanager) {
                f.ui.ddmanager.current = this
            }
            if (f.ui.ddmanager && !i.dropBehaviour) {
                f.ui.ddmanager.prepareOffsets(this, a)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(a);
            return true
        },
        _mouseDrag: function (c) {
            var i, b, a, m, n = this.options,
                d = false;
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - c.pageY < n.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + n.scrollSpeed
                    } else {
                        if (c.pageY - this.overflowOffset.top < n.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - n.scrollSpeed
                        }
                    } if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - c.pageX < n.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + n.scrollSpeed
                    } else {
                        if (c.pageX - this.overflowOffset.left < n.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - n.scrollSpeed
                        }
                    }
                } else {
                    if (c.pageY - f(document).scrollTop() < n.scrollSensitivity) {
                        d = f(document).scrollTop(f(document).scrollTop() - n.scrollSpeed)
                    } else {
                        if (f(window).height() - (c.pageY - f(document).scrollTop()) < n.scrollSensitivity) {
                            d = f(document).scrollTop(f(document).scrollTop() + n.scrollSpeed)
                        }
                    } if (c.pageX - f(document).scrollLeft() < n.scrollSensitivity) {
                        d = f(document).scrollLeft(f(document).scrollLeft() - n.scrollSpeed)
                    } else {
                        if (f(window).width() - (c.pageX - f(document).scrollLeft()) < n.scrollSensitivity) {
                            d = f(document).scrollLeft(f(document).scrollLeft() + n.scrollSpeed)
                        }
                    }
                } if (d !== false && f.ui.ddmanager && !n.dropBehaviour) {
                    f.ui.ddmanager.prepareOffsets(this, c)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (i = this.items.length - 1; i >= 0; i--) {
                b = this.items[i];
                a = b.item[0];
                m = this._intersectsWithPointer(b);
                if (!m) {
                    continue
                }
                if (b.instance !== this.currentContainer) {
                    continue
                }
                if (a !== this.currentItem[0] && this.placeholder[m === 1 ? "next" : "prev"]()[0] !== a && !f.contains(this.placeholder[0], a) && (this.options.type === "semi-dynamic" ? !f.contains(this.element[0], a) : true)) {
                    this.direction = m === 1 ? "down" : "up";
                    if (this.options.tolerance === "pointer" || this._intersectsWithSides(b)) {
                        this._rearrange(c, b)
                    } else {
                        break
                    }
                    this._trigger("change", c, this._uiHash());
                    break
                }
            }
            this._contactContainers(c);
            if (f.ui.ddmanager) {
                f.ui.ddmanager.drag(this, c)
            }
            this._trigger("sort", c, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (c, k) {
            if (!c) {
                return
            }
            if (f.ui.ddmanager && !this.options.dropBehaviour) {
                f.ui.ddmanager.drop(this, c)
            }
            if (this.options.revert) {
                var l = this,
                    a = this.placeholder.offset(),
                    b = this.options.axis,
                    d = {};
                if (!b || b === "x") {
                    d.left = a.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)
                }
                if (!b || b === "y") {
                    d.top = a.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)
                }
                this.reverting = true;
                f(this.helper).animate(d, parseInt(this.options.revert, 10) || 500, function () {
                    l._clear(c)
                })
            } else {
                this._clear(c, k)
            }
            return false
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper === "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var a = this.containers.length - 1; a >= 0; a--) {
                    this.containers[a]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[a].containerCache.over) {
                        this.containers[a]._trigger("out", null, this._uiHash(this));
                        this.containers[a].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                f.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    f(this.domPosition.prev).after(this.currentItem)
                } else {
                    f(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function (c) {
            var a = this._getItemsAsjQuery(c && c.connected),
                b = [];
            c = c || {};
            f(a).each(function () {
                var d = (f(c.item || this).attr(c.attribute || "id") || "").match(c.expression || (/(.+)[\-=_](.+)/));
                if (d) {
                    b.push((c.key || d[1] + "[]") + "=" + (c.key && c.expression ? d[1] : d[2]))
                }
            });
            if (!b.length && c.key) {
                b.push(c.key + "=")
            }
            return b.join("&")
        },
        toArray: function (c) {
            var a = this._getItemsAsjQuery(c && c.connected),
                b = [];
            c = c || {};
            a.each(function () {
                b.push(f(c.item || this).attr(c.attribute || "id") || "")
            });
            return b
        },
        _intersectsWith: function (u) {
            var b = this.positionAbs.left,
                x = b + this.helperProportions.width,
                l = this.positionAbs.top,
                v = l + this.helperProportions.height,
                a = u.left,
                d = a + u.width,
                r = u.top,
                c = r + u.height,
                w = this.offset.click.top,
                t = this.offset.click.left,
                s = (l + w) > r && (l + w) < c && (b + t) > a && (b + t) < d;
            if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > u[this.floating ? "width" : "height"])) {
                return s
            } else {
                return (a < b + (this.helperProportions.width / 2) && x - (this.helperProportions.width / 2) < d && r < l + (this.helperProportions.height / 2) && v - (this.helperProportions.height / 2) < c)
            }
        },
        _intersectsWithPointer: function (c) {
            var l = (this.options.axis === "x") || h(this.positionAbs.top + this.offset.click.top, c.top, c.height),
                b = (this.options.axis === "y") || h(this.positionAbs.left + this.offset.click.left, c.left, c.width),
                d = l && b,
                k = this._getDragVerticalDirection(),
                a = this._getDragHorizontalDirection();
            if (!d) {
                return false
            }
            return this.floating ? (((a && a === "right") || k === "down") ? 2 : 1) : (k && (k === "down" ? 2 : 1))
        },
        _intersectsWithSides: function (a) {
            var j = h(this.positionAbs.top + this.offset.click.top, a.top + (a.height / 2), a.height),
                b = h(this.positionAbs.left + this.offset.click.left, a.left + (a.width / 2), a.width),
                d = this._getDragVerticalDirection(),
                c = this._getDragHorizontalDirection();
            if (this.floating && c) {
                return ((c === "right" && b) || (c === "left" && !b))
            } else {
                return d && ((d === "down" && j) || (d === "up" && !j))
            }
        },
        _getDragVerticalDirection: function () {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a !== 0 && (a > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a !== 0 && (a > 0 ? "right" : "left")
        },
        refresh: function (a) {
            this._refreshItems(a);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var a = this.options;
            return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function (d) {
            var o, i, c, j, a = [],
                p = [],
                b = this._connectWith();
            if (b && d) {
                for (o = b.length - 1; o >= 0; o--) {
                    c = f(b[o]);
                    for (i = c.length - 1; i >= 0; i--) {
                        j = f.data(c[i], this.widgetFullName);
                        if (j && j !== this && !j.options.disabled) {
                            p.push([f.isFunction(j.options.items) ? j.options.items.call(j.element) : f(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
                        }
                    }
                }
            }
            p.push([f.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : f(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (o = p.length - 1; o >= 0; o--) {
                p[o][0].each(function () {
                    a.push(this)
                })
            }
            return f(a)
        },
        _removeCurrentsFromItems: function () {
            var a = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = f.grep(this.items, function (c) {
                for (var b = 0; b < a.length; b++) {
                    if (a[b] === c.item[0]) {
                        return false
                    }
                }
                return true
            })
        },
        _refreshItems: function (i) {
            this.items = [];
            this.containers = [this];
            var b, u, c, a, d, w, s, t, v = this.items,
                j = [
                    [f.isFunction(this.options.items) ? this.options.items.call(this.element[0], i, {
                        item: this.currentItem
                    }) : f(this.options.items, this.element), this]
                ],
                x = this._connectWith();
            if (x && this.ready) {
                for (b = x.length - 1; b >= 0; b--) {
                    c = f(x[b]);
                    for (u = c.length - 1; u >= 0; u--) {
                        a = f.data(c[u], this.widgetFullName);
                        if (a && a !== this && !a.options.disabled) {
                            j.push([f.isFunction(a.options.items) ? a.options.items.call(a.element[0], i, {
                                item: this.currentItem
                            }) : f(a.options.items, a.element), a]);
                            this.containers.push(a)
                        }
                    }
                }
            }
            for (b = j.length - 1; b >= 0; b--) {
                d = j[b][1];
                w = j[b][0];
                for (u = 0, t = w.length; u < t; u++) {
                    s = f(w[u]);
                    s.data(this.widgetName + "-item", d);
                    v.push({
                        item: s,
                        instance: d,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (i) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            var c, b, a, d;
            for (c = this.items.length - 1; c >= 0; c--) {
                b = this.items[c];
                if (b.instance !== this.currentContainer && this.currentContainer && b.item[0] !== this.currentItem[0]) {
                    continue
                }
                a = this.options.toleranceElement ? f(this.options.toleranceElement, b.item) : b.item;
                if (!i) {
                    b.width = a.outerWidth();
                    b.height = a.outerHeight()
                }
                d = a.offset();
                b.left = d.left;
                b.top = d.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (c = this.containers.length - 1; c >= 0; c--) {
                    d = this.containers[c].element.offset();
                    this.containers[c].containerCache.left = d.left;
                    this.containers[c].containerCache.top = d.top;
                    this.containers[c].containerCache.width = this.containers[c].element.outerWidth();
                    this.containers[c].containerCache.height = this.containers[c].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (a) {
            a = a || this;
            var b, c = a.options;
            if (!c.placeholder || c.placeholder.constructor === String) {
                b = c.placeholder;
                c.placeholder = {
                    element: function () {
                        var j = a.currentItem[0].nodeName.toLowerCase(),
                            d = f(a.document[0].createElement(j)).addClass(b || a.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        if (j === "tr") {
                            d.append("<td colspan='99'> </td>")
                        } else {
                            if (j === "img") {
                                d.attr("src", a.currentItem.attr("src"))
                            }
                        } if (!b) {
                            d.css("visibility", "hidden")
                        }
                        return d
                    },
                    update: function (d, j) {
                        if (b && !c.forcePlaceholderSize) {
                            return
                        }
                        if (!j.height()) {
                            j.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!j.width()) {
                            j.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            a.placeholder = f(c.placeholder.element.call(a.element, a.currentItem));
            a.currentItem.after(a.placeholder);
            c.placeholder.update(a, a.placeholder)
        },
        _contactContainers: function (b) {
            var t, j, y, z, i, v, c, d, w, x, a = null,
                u = null;
            for (t = this.containers.length - 1; t >= 0; t--) {
                if (f.contains(this.currentItem[0], this.containers[t].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[t].containerCache)) {
                    if (a && f.contains(this.containers[t].element[0], a.element[0])) {
                        continue
                    }
                    a = this.containers[t];
                    u = t
                } else {
                    if (this.containers[t].containerCache.over) {
                        this.containers[t]._trigger("out", b, this._uiHash(this));
                        this.containers[t].containerCache.over = 0
                    }
                }
            }
            if (!a) {
                return
            }
            if (this.containers.length === 1) {
                if (!this.containers[u].containerCache.over) {
                    this.containers[u]._trigger("over", b, this._uiHash(this));
                    this.containers[u].containerCache.over = 1
                }
            } else {
                y = 10000;
                z = null;
                x = a.floating || g(this.currentItem);
                i = x ? "left" : "top";
                v = x ? "width" : "height";
                c = this.positionAbs[i] + this.offset.click[i];
                for (j = this.items.length - 1; j >= 0; j--) {
                    if (!f.contains(this.containers[u].element[0], this.items[j].item[0])) {
                        continue
                    }
                    if (this.items[j].item[0] === this.currentItem[0]) {
                        continue
                    }
                    if (x && !h(this.positionAbs.top + this.offset.click.top, this.items[j].top, this.items[j].height)) {
                        continue
                    }
                    d = this.items[j].item.offset()[i];
                    w = false;
                    if (Math.abs(d - c) > Math.abs(d + this.items[j][v] - c)) {
                        w = true;
                        d += this.items[j][v]
                    }
                    if (Math.abs(d - c) < y) {
                        y = Math.abs(d - c);
                        z = this.items[j];
                        this.direction = w ? "up" : "down"
                    }
                }
                if (!z && !this.options.dropOnEmpty) {
                    return
                }
                if (this.currentContainer === this.containers[u]) {
                    return
                }
                z ? this._rearrange(b, z, null, true) : this._rearrange(b, null, this.containers[u].element, true);
                this._trigger("change", b, this._uiHash());
                this.containers[u]._trigger("change", b, this._uiHash(this));
                this.currentContainer = this.containers[u];
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[u]._trigger("over", b, this._uiHash(this));
                this.containers[u].containerCache.over = 1
            }
        },
        _createHelper: function (b) {
            var c = this.options,
                a = f.isFunction(c.helper) ? f(c.helper.apply(this.element[0], [b, this.currentItem])) : (c.helper === "clone" ? this.currentItem.clone() : this.currentItem);
            if (!a.parents("body").length) {
                f(c.appendTo !== "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(a[0])
            }
            if (a[0] === this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (!a[0].style.width || c.forceHelperSize) {
                a.width(this.currentItem.width())
            }
            if (!a[0].style.height || c.forceHelperSize) {
                a.height(this.currentItem.height())
            }
            return a
        },
        _adjustOffsetFromHelper: function (a) {
            if (typeof a === "string") {
                a = a.split(" ")
            }
            if (f.isArray(a)) {
                a = {
                    left: +a[0],
                    top: +a[1] || 0
                }
            }
            if ("left" in a) {
                this.offset.click.left = a.left + this.margins.left
            }
            if ("right" in a) {
                this.offset.click.left = this.helperProportions.width - a.right + this.margins.left
            }
            if ("top" in a) {
                this.offset.click.top = a.top + this.margins.top
            }
            if ("bottom" in a) {
                this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && f.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && f.ui.ie)) {
                a = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition === "relative") {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var d, b, a, c = this.options;
            if (c.containment === "parent") {
                c.containment = this.helper[0].parentNode
            }
            if (c.containment === "document" || c.containment === "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, f(c.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (f(c.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(c.containment)) {
                d = f(c.containment)[0];
                b = f(c.containment).offset();
                a = (f(d).css("overflow") !== "hidden");
                this.containment = [b.left + (parseInt(f(d).css("borderLeftWidth"), 10) || 0) + (parseInt(f(d).css("paddingLeft"), 10) || 0) - this.margins.left, b.top + (parseInt(f(d).css("borderTopWidth"), 10) || 0) + (parseInt(f(d).css("paddingTop"), 10) || 0) - this.margins.top, b.left + (a ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(f(d).css("borderLeftWidth"), 10) || 0) - (parseInt(f(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, b.top + (a ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(f(d).css("borderTopWidth"), 10) || 0) - (parseInt(f(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (a, c) {
            if (!c) {
                c = this.position
            }
            var d = a === "absolute" ? 1 : -1,
                b = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && f.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                j = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (c.top + this.offset.relative.top * d + this.offset.parent.top * d - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (j ? 0 : b.scrollTop())) * d)),
                left: (c.left + this.offset.relative.left * d + this.offset.parent.left * d - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : j ? 0 : b.scrollLeft()) * d))
            }
        },
        _generatePosition: function (c) {
            var d, a, m = this.options,
                n = c.pageX,
                b = c.pageY,
                p = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && f.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                o = (/(html|body)/i).test(p[0].tagName);
            if (this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) {
                        n = this.containment[0] + this.offset.click.left
                    }
                    if (c.pageY - this.offset.click.top < this.containment[1]) {
                        b = this.containment[1] + this.offset.click.top
                    }
                    if (c.pageX - this.offset.click.left > this.containment[2]) {
                        n = this.containment[2] + this.offset.click.left
                    }
                    if (c.pageY - this.offset.click.top > this.containment[3]) {
                        b = this.containment[3] + this.offset.click.top
                    }
                }
                if (m.grid) {
                    d = this.originalPageY + Math.round((b - this.originalPageY) / m.grid[1]) * m.grid[1];
                    b = this.containment ? ((d - this.offset.click.top >= this.containment[1] && d - this.offset.click.top <= this.containment[3]) ? d : ((d - this.offset.click.top >= this.containment[1]) ? d - m.grid[1] : d + m.grid[1])) : d;
                    a = this.originalPageX + Math.round((n - this.originalPageX) / m.grid[0]) * m.grid[0];
                    n = this.containment ? ((a - this.offset.click.left >= this.containment[0] && a - this.offset.click.left <= this.containment[2]) ? a : ((a - this.offset.click.left >= this.containment[0]) ? a - m.grid[0] : a + m.grid[0])) : a
                }
            }
            return {
                top: (b - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (o ? 0 : p.scrollTop())))),
                left: (n - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : p.scrollLeft())))
            }
        },
        _rearrange: function (b, d, i, c) {
            i ? i[0].appendChild(this.placeholder[0]) : d.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? d.item[0] : d.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var a = this.counter;
            this._delay(function () {
                if (a === this.counter) {
                    this.refreshPositions(!c)
                }
            })
        },
        _clear: function (c, b) {
            this.reverting = false;
            var d, a = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (d in this._storedCSS) {
                    if (this._storedCSS[d] === "auto" || this._storedCSS[d] === "static") {
                        this._storedCSS[d] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            } if (this.fromOutside && !b) {
                a.push(function (j) {
                    this._trigger("receive", j, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !b) {
                a.push(function (j) {
                    this._trigger("update", j, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!b) {
                    a.push(function (j) {
                        this._trigger("remove", j, this._uiHash())
                    });
                    a.push((function (j) {
                        return function (i) {
                            j._trigger("receive", i, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer));
                    a.push((function (j) {
                        return function (i) {
                            j._trigger("update", i, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer))
                }
            }
            for (d = this.containers.length - 1; d >= 0; d--) {
                if (!b) {
                    a.push((function (j) {
                        return function (i) {
                            j._trigger("deactivate", i, this._uiHash(this))
                        }
                    }).call(this, this.containers[d]))
                }
                if (this.containers[d].containerCache.over) {
                    a.push((function (j) {
                        return function (i) {
                            j._trigger("out", i, this._uiHash(this))
                        }
                    }).call(this, this.containers[d]));
                    this.containers[d].containerCache.over = 0
                }
            }
            if (this.storedCursor) {
                this.document.find("body").css("cursor", this.storedCursor);
                this.storedStylesheet.remove()
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!b) {
                    this._trigger("beforeStop", c, this._uiHash());
                    for (d = 0; d < a.length; d++) {
                        a[d].call(this, c)
                    }
                    this._trigger("stop", c, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!b) {
                this._trigger("beforeStop", c, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] !== this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!b) {
                for (d = 0; d < a.length; d++) {
                    a[d].call(this, c)
                }
                this._trigger("stop", c, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            if (f.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function (a) {
            var b = a || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || f([]),
                position: b.position,
                originalPosition: b.originalPosition,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: a ? a.element : null
            }
        }
    })
})(jQuery);
(function (d, e) {
    var f = "ui-effects-";
    d.effects = {
        effect: {}
    };
    (function (C, y) {
        var z = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            a = /^([\-+])=\s*(\d+\.?\d*)/,
            x = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (g) {
                    return [g[1], g[2], g[3], g[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (g) {
                    return [g[1] * 2.55, g[2] * 2.55, g[3] * 2.55, g[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function (g) {
                    return [parseInt(g[1], 16), parseInt(g[2], 16), parseInt(g[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function (g) {
                    return [parseInt(g[1] + g[1], 16), parseInt(g[2] + g[2], 16), parseInt(g[3] + g[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (g) {
                    return [g[1], g[2] / 100, g[3] / 100, g[4]]
                }
            }],
            v = C.Color = function (h, g, j, i) {
                return new C.Color.fn.parse(h, g, j, i)
            }, B = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            }, t = {
                "byte": {
                    floor: true,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: true
                }
            }, D = v.support = {}, s = C("<p>")[0],
            w, c = C.each;
        s.style.cssText = "background-color:rgba(1,1,1,.5)";
        D.rgba = s.style.backgroundColor.indexOf("rgba") > -1;
        c(B, function (h, g) {
            g.cache = "_" + h;
            g.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });

        function A(h, i, j) {
            var g = t[i.type] || {};
            if (h == null) {
                return (j || !i.def) ? null : i.def
            }
            h = g.floor ? ~~h : parseFloat(h);
            if (isNaN(h)) {
                return i.def
            }
            if (g.mod) {
                return (h + g.mod) % g.mod
            }
            return 0 > h ? 0 : g.max < h ? g.max : h
        }

        function u(i) {
            var h = v(),
                g = h._rgba = [];
            i = i.toLowerCase();
            c(x, function (m, k) {
                var n, j = k.re.exec(i),
                    o = j && k.parse(j),
                    l = k.space || "rgba";
                if (o) {
                    n = h[l](o);
                    h[B[l].cache] = n[B[l].cache];
                    g = h._rgba = n._rgba;
                    return false
                }
            });
            if (g.length) {
                if (g.join() === "0,0,0,0") {
                    C.extend(g, w.transparent)
                }
                return h
            }
            return w[i]
        }
        v.fn = C.extend(v.prototype, {
            parse: function (l, j, h, i) {
                if (l === y) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (l.jquery || l.nodeType) {
                    l = C(l).css(j);
                    j = y
                }
                var m = this,
                    k = C.type(l),
                    g = this._rgba = [];
                if (j !== y) {
                    l = [l, j, h, i];
                    k = "array"
                }
                if (k === "string") {
                    return this.parse(u(l) || w._default)
                }
                if (k === "array") {
                    c(B.rgba.props, function (n, o) {
                        g[o.idx] = A(l[o.idx], o)
                    });
                    return this
                }
                if (k === "object") {
                    if (l instanceof v) {
                        c(B, function (o, n) {
                            if (l[n.cache]) {
                                m[n.cache] = l[n.cache].slice()
                            }
                        })
                    } else {
                        c(B, function (o, p) {
                            var n = p.cache;
                            c(p.props, function (q, r) {
                                if (!m[n] && p.to) {
                                    if (q === "alpha" || l[q] == null) {
                                        return
                                    }
                                    m[n] = p.to(m._rgba)
                                }
                                m[n][r.idx] = A(l[q], r, true)
                            });
                            if (m[n] && C.inArray(null, m[n].slice(0, 3)) < 0) {
                                m[n][3] = 1;
                                if (p.from) {
                                    m._rgba = p.from(m[n])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function (i) {
                var g = v(i),
                    h = true,
                    j = this;
                c(B, function (n, m) {
                    var k, l = g[m.cache];
                    if (l) {
                        k = j[m.cache] || m.to && m.to(j._rgba) || [];
                        c(m.props, function (o, p) {
                            if (l[p.idx] != null) {
                                h = (l[p.idx] === k[p.idx]);
                                return h
                            }
                        })
                    }
                    return h
                });
                return h
            },
            _space: function () {
                var h = [],
                    g = this;
                c(B, function (j, i) {
                    if (g[i.cache]) {
                        h.push(j)
                    }
                });
                return h.pop()
            },
            transition: function (g, l) {
                var h = v(g),
                    j = h._space(),
                    n = B[j],
                    m = this.alpha() === 0 ? v("transparent") : this,
                    k = m[n.cache] || n.to(m._rgba),
                    i = k.slice();
                h = h[n.cache];
                c(n.props, function (H, r) {
                    var p = r.idx,
                        o = k[p],
                        q = h[p],
                        G = t[r.type] || {};
                    if (q === null) {
                        return
                    }
                    if (o === null) {
                        i[p] = q
                    } else {
                        if (G.mod) {
                            if (q - o > G.mod / 2) {
                                o += G.mod
                            } else {
                                if (o - q > G.mod / 2) {
                                    o -= G.mod
                                }
                            }
                        }
                        i[p] = A((q - o) * l + o, r)

                    }
                });
                return this[j](i)
            },
            blend: function (g) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var j = this._rgba.slice(),
                    i = j.pop(),
                    h = v(g)._rgba;
                return v(C.map(j, function (l, k) {
                    return (1 - i) * h[k] + i * l
                }))
            },
            toRgbaString: function () {
                var g = "rgba(",
                    h = C.map(this._rgba, function (i, j) {
                        return i == null ? (j > 2 ? 1 : 0) : i
                    });
                if (h[3] === 1) {
                    h.pop();
                    g = "rgb("
                }
                return g + h.join() + ")"
            },
            toHslaString: function () {
                var g = "hsla(",
                    h = C.map(this.hsla(), function (i, j) {
                        if (i == null) {
                            i = j > 2 ? 1 : 0
                        }
                        if (j && j < 3) {
                            i = Math.round(i * 100) + "%"
                        }
                        return i
                    });
                if (h[3] === 1) {
                    h.pop();
                    g = "hsl("
                }
                return g + h.join() + ")"
            },
            toHexString: function (h) {
                var g = this._rgba.slice(),
                    i = g.pop();
                if (h) {
                    g.push(~~(i * 255))
                }
                return "#" + C.map(g, function (j) {
                    j = (j || 0).toString(16);
                    return j.length === 1 ? "0" + j : j
                }).join("")
            },
            toString: function () {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        v.fn.parse.prototype = v.fn;

        function b(h, i, g) {
            g = (g + 1) % 1;
            if (g * 6 < 1) {
                return h + (i - h) * g * 6
            }
            if (g * 2 < 1) {
                return i
            }
            if (g * 3 < 2) {
                return h + (i - h) * ((2 / 3) - g) * 6
            }
            return h
        }
        B.hsla.to = function (h) {
            if (h[0] == null || h[1] == null || h[2] == null) {
                return [null, null, null, h[3]]
            }
            var l = h[0] / 255,
                q = h[1] / 255,
                k = h[2] / 255,
                j = h[3],
                n = Math.max(l, q, k),
                i = Math.min(l, q, k),
                m = n - i,
                o = n + i,
                p = o * 0.5,
                g, r;
            if (i === n) {
                g = 0
            } else {
                if (l === n) {
                    g = (60 * (q - k) / m) + 360
                } else {
                    if (q === n) {
                        g = (60 * (k - l) / m) + 120
                    } else {
                        g = (60 * (l - q) / m) + 240
                    }
                }
            } if (m === 0) {
                r = 0
            } else {
                if (p <= 0.5) {
                    r = m / o
                } else {
                    r = m / (2 - o)
                }
            }
            return [Math.round(g) % 360, r, p, j == null ? 1 : j]
        };
        B.hsla.from = function (g) {
            if (g[0] == null || g[1] == null || g[2] == null) {
                return [null, null, null, g[3]]
            }
            var m = g[0] / 360,
                i = g[1],
                k = g[2],
                j = g[3],
                h = k <= 0.5 ? k * (1 + i) : k + i - k * i,
                l = 2 * k - h;
            return [Math.round(b(l, h, m + (1 / 3)) * 255), Math.round(b(l, h, m) * 255), Math.round(b(l, h, m - (1 / 3)) * 255), j]
        };
        c(B, function (j, h) {
            var k = h.props,
                i = h.cache,
                g = h.to,
                l = h.from;
            v.fn[j] = function (q) {
                if (g && !this[i]) {
                    this[i] = g(this._rgba)
                }
                if (q === y) {
                    return this[i].slice()
                }
                var m, o = C.type(q),
                    n = (o === "array" || o === "object") ? q : arguments,
                    p = this[i].slice();
                c(k, function (r, G) {
                    var H = n[o === "object" ? r : G.idx];
                    if (H == null) {
                        H = p[G.idx]
                    }
                    p[G.idx] = A(H, G)
                });
                if (l) {
                    m = v(l(p));
                    m[i] = p;
                    return m
                } else {
                    return v(p)
                }
            };
            c(k, function (n, m) {
                if (v.fn[n]) {
                    return
                }
                v.fn[n] = function (p) {
                    var H = C.type(p),
                        G = (n === "alpha" ? (this._hsla ? "hsla" : "rgba") : j),
                        r = this[G](),
                        q = r[m.idx],
                        o;
                    if (H === "undefined") {
                        return q
                    }
                    if (H === "function") {
                        p = p.call(this, q);
                        H = C.type(p)
                    }
                    if (p == null && m.empty) {
                        return this
                    }
                    if (H === "string") {
                        o = a.exec(p);
                        if (o) {
                            p = q + parseFloat(o[2]) * (o[1] === "+" ? 1 : -1)
                        }
                    }
                    r[m.idx] = p;
                    return this[G](r)
                }
            })
        });
        v.hook = function (g) {
            var h = g.split(" ");
            c(h, function (j, i) {
                C.cssHooks[i] = {
                    set: function (o, l) {
                        var n, m, k = "";
                        if (l !== "transparent" && (C.type(l) !== "string" || (n = u(l)))) {
                            l = v(n || l);
                            if (!D.rgba && l._rgba[3] !== 1) {
                                m = i === "backgroundColor" ? o.parentNode : o;
                                while ((k === "" || k === "transparent") && m && m.style) {
                                    try {
                                        k = C.css(m, "backgroundColor");
                                        m = m.parentNode
                                    } catch (p) {}
                                }
                                l = l.blend(k && k !== "transparent" ? k : "_default")
                            }
                            l = l.toRgbaString()
                        }
                        try {
                            o.style[i] = l
                        } catch (p) {}
                    }
                };
                C.fx.step[i] = function (k) {
                    if (!k.colorInit) {
                        k.start = v(k.elem, i);
                        k.end = v(k.end);
                        k.colorInit = true
                    }
                    C.cssHooks[i].set(k.elem, k.start.transition(k.end, k.pos))
                }
            })
        };
        v.hook(z);
        C.cssHooks.borderColor = {
            expand: function (h) {
                var g = {};
                c(["Top", "Right", "Bottom", "Left"], function (j, i) {
                    g["border" + i + "Color"] = h
                });
                return g
            }
        };
        w = C.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    })(jQuery);
    (function () {
        var c = ["add", "remove", "toggle"],
            h = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        d.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (g, j) {
            d.fx.step[j] = function (i) {
                if (i.end !== "none" && !i.setAttr || i.pos === 1 && !i.setAttr) {
                    jQuery.style(i.elem, j, i.end);
                    i.setAttr = true
                }
            }
        });

        function a(o) {
            var m, g, p = o.ownerDocument.defaultView ? o.ownerDocument.defaultView.getComputedStyle(o, null) : o.currentStyle,
                n = {};
            if (p && p.length && p[0] && p[p[0]]) {
                g = p.length;
                while (g--) {
                    m = p[g];
                    if (typeof p[m] === "string") {
                        n[d.camelCase(m)] = p[m]
                    }
                }
            } else {
                for (m in p) {
                    if (typeof p[m] === "string") {
                        n[m] = p[m]
                    }
                }
            }
            return n
        }

        function b(m, n) {
            var g = {}, o, p;
            for (o in n) {
                p = n[o];
                if (m[o] !== p) {
                    if (!h[o]) {
                        if (d.fx.step[o] || !isNaN(parseFloat(p))) {
                            g[o] = p
                        }
                    }
                }
            }
            return g
        }
        if (!d.fn.addBack) {
            d.fn.addBack = function (g) {
                return this.add(g == null ? this.prevObject : this.prevObject.filter(g))
            }
        }
        d.effects.animateClass = function (p, o, g, n) {
            var m = d.speed(o, g, n);
            return this.queue(function () {
                var k = d(this),
                    i = k.attr("class") || "",
                    j, l = m.children ? k.find("*").addBack() : k;
                l = l.map(function () {
                    var r = d(this);
                    return {
                        el: r,
                        start: a(this)
                    }
                });
                j = function () {
                    d.each(c, function (s, t) {
                        if (p[t]) {
                            k[t + "Class"](p[t])
                        }
                    })
                };
                j();
                l = l.map(function () {
                    this.end = a(this.el[0]);
                    this.diff = b(this.start, this.end);
                    return this
                });
                k.attr("class", i);
                l = l.map(function () {
                    var u = this,
                        t = d.Deferred(),
                        v = d.extend({}, m, {
                            queue: false,
                            complete: function () {
                                t.resolve(u)
                            }
                        });
                    this.el.animate(this.diff, v);
                    return t.promise()
                });
                d.when.apply(d, l.get()).done(function () {
                    j();
                    d.each(arguments, function () {
                        var r = this.el;
                        d.each(this.diff, function (q) {
                            r.css(q, "")
                        })
                    });
                    m.complete.call(k[0])
                })
            })
        };
        d.fn.extend({
            addClass: (function (g) {
                return function (m, o, n, p) {
                    return o ? d.effects.animateClass.call(this, {
                        add: m
                    }, o, n, p) : g.apply(this, arguments)
                }
            })(d.fn.addClass),
            removeClass: (function (g) {
                return function (m, o, n, p) {
                    return arguments.length > 1 ? d.effects.animateClass.call(this, {
                        remove: m
                    }, o, n, p) : g.apply(this, arguments)
                }
            })(d.fn.removeClass),
            toggleClass: (function (g) {
                return function (n, r, p, o, q) {
                    if (typeof r === "boolean" || r === e) {
                        if (!p) {
                            return g.apply(this, arguments)
                        } else {
                            return d.effects.animateClass.call(this, (r ? {
                                add: n
                            } : {
                                remove: n
                            }), p, o, q)
                        }
                    } else {
                        return d.effects.animateClass.call(this, {
                            toggle: n
                        }, r, p, o)
                    }
                }
            })(d.fn.toggleClass),
            switchClass: function (g, n, o, m, p) {
                return d.effects.animateClass.call(this, {
                    add: n,
                    remove: g
                }, o, m, p)
            }
        })
    })();
    (function () {
        d.extend(d.effects, {
            version: "1.10.2",
            save: function (i, j) {
                for (var c = 0; c < j.length; c++) {
                    if (j[c] !== null) {
                        i.data(f + j[c], i[0].style[j[c]])
                    }
                }
            },
            restore: function (k, l) {
                var c, i;
                for (i = 0; i < l.length; i++) {
                    if (l[i] !== null) {
                        c = k.data(f + l[i]);
                        if (c === e) {
                            c = ""
                        }
                        k.css(l[i], c)
                    }
                }
            },
            setMode: function (h, c) {
                if (c === "toggle") {
                    c = h.is(":hidden") ? "show" : "hide"
                }
                return c
            },
            getBaseline: function (l, c) {
                var j, k;
                switch (l[0]) {
                case "top":
                    j = 0;
                    break;
                case "middle":
                    j = 0.5;
                    break;
                case "bottom":
                    j = 1;
                    break;
                default:
                    j = l[0] / c.height
                }
                switch (l[1]) {
                case "left":
                    k = 0;
                    break;
                case "center":
                    k = 0.5;
                    break;
                case "right":
                    k = 1;
                    break;
                default:
                    k = l[1] / c.width
                }
                return {
                    x: k,
                    y: j
                }
            },
            createWrapper: function (m) {
                if (m.parent().is(".ui-effects-wrapper")) {
                    return m.parent()
                }
                var p = {
                    width: m.outerWidth(true),
                    height: m.outerHeight(true),
                    "float": m.css("float")
                }, n = d("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }),
                    c = {
                        width: m.width(),
                        height: m.height()
                    }, l = document.activeElement;
                try {
                    l.id
                } catch (o) {
                    l = document.body
                }
                m.wrap(n);
                if (m[0] === l || d.contains(m[0], l)) {
                    d(l).focus()
                }
                n = m.parent();
                if (m.css("position") === "static") {
                    n.css({
                        position: "relative"
                    });
                    m.css({
                        position: "relative"
                    })
                } else {
                    d.extend(p, {
                        position: m.css("position"),
                        zIndex: m.css("z-index")
                    });
                    d.each(["top", "left", "bottom", "right"], function (g, h) {
                        p[h] = m.css(h);
                        if (isNaN(parseInt(p[h], 10))) {
                            p[h] = "auto"
                        }
                    });
                    m.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })
                }
                m.css(c);
                return n.css(p).show()
            },
            removeWrapper: function (h) {
                var c = document.activeElement;
                if (h.parent().is(".ui-effects-wrapper")) {
                    h.parent().replaceWith(h);
                    if (h[0] === c || d.contains(h[0], c)) {
                        d(c).focus()
                    }
                }
                return h
            },
            setTransition: function (k, l, c, j) {
                j = j || {};
                d.each(l, function (i, g) {
                    var h = k.cssUnit(g);
                    if (h[0] > 0) {
                        j[g] = h[0] * c + h[1]
                    }
                });
                return j
            }
        });

        function a(c, k, l, j) {
            if (d.isPlainObject(c)) {
                k = c;
                c = c.effect
            }
            c = {
                effect: c
            };
            if (k == null) {
                k = {}
            }
            if (d.isFunction(k)) {
                j = k;
                l = null;
                k = {}
            }
            if (typeof k === "number" || d.fx.speeds[k]) {
                j = l;
                l = k;
                k = {}
            }
            if (d.isFunction(l)) {
                j = l;
                l = null
            }
            if (k) {
                d.extend(c, k)
            }
            l = l || k.duration;
            c.duration = d.fx.off ? 0 : typeof l === "number" ? l : l in d.fx.speeds ? d.fx.speeds[l] : d.fx.speeds._default;
            c.complete = j || k.complete;
            return c
        }

        function b(c) {
            if (!c || typeof c === "number" || d.fx.speeds[c]) {
                return true
            }
            if (typeof c === "string" && !d.effects.effect[c]) {
                return true
            }
            if (d.isFunction(c)) {
                return true
            }
            if (typeof c === "object" && !c.effect) {
                return true
            }
            return false
        }
        d.fn.extend({
            effect: function () {
                var k = a.apply(this, arguments),
                    n = k.mode,
                    m = k.queue,
                    l = d.effects.effect[k.effect];
                if (d.fx.off || !l) {
                    if (n) {
                        return this[n](k.duration, k.complete)
                    } else {
                        return this.each(function () {
                            if (k.complete) {
                                k.complete.call(this)
                            }
                        })
                    }
                }

                function c(j) {
                    var p = d(this),
                        i = k.complete,
                        g = k.mode;

                    function h() {
                        if (d.isFunction(i)) {
                            i.call(p[0])
                        }
                        if (d.isFunction(j)) {
                            j()
                        }
                    }
                    if (p.is(":hidden") ? g === "hide" : g === "show") {
                        p[g]();
                        h()
                    } else {
                        l.call(p[0], k, h)
                    }
                }
                return m === false ? this.each(c) : this.queue(m || "fx", c)
            },
            show: (function (c) {
                return function (i) {
                    if (b(i)) {
                        return c.apply(this, arguments)
                    } else {
                        var j = a.apply(this, arguments);
                        j.mode = "show";
                        return this.effect.call(this, j)
                    }
                }
            })(d.fn.show),
            hide: (function (c) {
                return function (i) {
                    if (b(i)) {
                        return c.apply(this, arguments)
                    } else {
                        var j = a.apply(this, arguments);
                        j.mode = "hide";
                        return this.effect.call(this, j)
                    }
                }
            })(d.fn.hide),
            toggle: (function (c) {
                return function (i) {
                    if (b(i) || typeof i === "boolean") {
                        return c.apply(this, arguments)
                    } else {
                        var j = a.apply(this, arguments);
                        j.mode = "toggle";
                        return this.effect.call(this, j)
                    }
                }
            })(d.fn.toggle),
            cssUnit: function (c) {
                var i = this.css(c),
                    j = [];
                d.each(["em", "px", "%", "pt"], function (g, h) {
                    if (i.indexOf(h) > 0) {
                        j = [parseFloat(i), h]
                    }
                });
                return j
            }
        })
    })();
    (function () {
        var a = {};
        d.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (b, c) {
            a[c] = function (h) {
                return Math.pow(h, b + 2)
            }
        });
        d.extend(a, {
            Sine: function (b) {
                return 1 - Math.cos(b * Math.PI / 2)
            },
            Circ: function (b) {
                return 1 - Math.sqrt(1 - b * b)
            },
            Elastic: function (b) {
                return b === 0 || b === 1 ? b : -Math.pow(2, 8 * (b - 1)) * Math.sin(((b - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function (b) {
                return b * b * (3 * b - 2)
            },
            Bounce: function (c) {
                var h, b = 4;
                while (c < ((h = Math.pow(2, --b)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((h * 3 - 2) / 22 - c, 2)
            }
        });
        d.each(a, function (b, c) {
            d.easing["easeIn" + b] = c;
            d.easing["easeOut" + b] = function (h) {
                return 1 - c(1 - h)
            };
            d.easing["easeInOut" + b] = function (h) {
                return h < 0.5 ? c(h * 2) / 2 : 1 - c(h * -2 + 2) / 2
            }
        })
    })()
})(jQuery);
(function (g, h) {
    var i = 0,
        f = {}, j = {};
    f.height = f.paddingTop = f.paddingBottom = f.borderTopWidth = f.borderBottomWidth = "hide";
    j.height = j.paddingTop = j.paddingBottom = j.borderTopWidth = j.borderBottomWidth = "show";
    g.widget("ui.accordion", {
        version: "1.10.2",
        options: {
            active: 0,
            animate: {},
            collapsible: false,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function () {
            var a = this.options;
            this.prevShow = this.prevHide = g();
            this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist");
            if (!a.collapsible && (a.active === false || a.active == null)) {
                a.active = 0
            }
            this._processPanels();
            if (a.active < 0) {
                a.active += this.headers.length
            }
            this._refresh()
        },
        _getCreateEventData: function () {
            return {
                header: this.active,
                panel: !this.active.length ? g() : this.active.next(),
                content: !this.active.length ? g() : this.active.next()
            }
        },
        _createIcons: function () {
            var a = this.options.icons;
            if (a) {
                g("<span>").addClass("ui-accordion-header-icon ui-icon " + a.header).prependTo(this.headers);
                this.active.children(".ui-accordion-header-icon").removeClass(a.header).addClass(a.activeHeader);
                this.headers.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function () {
            var a;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function () {
                if (/^ui-accordion/.test(this.id)) {
                    this.removeAttribute("id")
                }
            });
            this._destroyIcons();
            a = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function () {
                if (/^ui-accordion/.test(this.id)) {
                    this.removeAttribute("id")
                }
            });
            if (this.options.heightStyle !== "content") {
                a.css("height", "")
            }
        },
        _setOption: function (b, a) {
            if (b === "active") {
                this._activate(a);
                return
            }
            if (b === "event") {
                if (this.options.event) {
                    this._off(this.headers, this.options.event)
                }
                this._setupEvents(a)
            }
            this._super(b, a);
            if (b === "collapsible" && !a && this.options.active === false) {
                this._activate(0)
            }
            if (b === "icons") {
                this._destroyIcons();
                if (a) {
                    this._createIcons()
                }
            }
            if (b === "disabled") {
                this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !! a)
            }
        },
        _keydown: function (e) {
            if (e.altKey || e.ctrlKey) {
                return
            }
            var c = g.ui.keyCode,
                b = this.headers.length,
                a = this.headers.index(e.target),
                d = false;
            switch (e.keyCode) {
            case c.RIGHT:
            case c.DOWN:
                d = this.headers[(a + 1) % b];
                break;
            case c.LEFT:
            case c.UP:
                d = this.headers[(a - 1 + b) % b];
                break;
            case c.SPACE:
            case c.ENTER:
                this._eventHandler(e);
                break;
            case c.HOME:
                d = this.headers[0];
                break;
            case c.END:
                d = this.headers[b - 1];
                break
            }
            if (d) {
                g(e.target).attr("tabIndex", -1);
                g(d).attr("tabIndex", 0);
                d.focus();
                e.preventDefault()
            }
        },
        _panelKeyDown: function (a) {
            if (a.keyCode === g.ui.keyCode.UP && a.ctrlKey) {
                g(a.currentTarget).prev().focus()
            }
        },
        refresh: function () {
            var a = this.options;
            this._processPanels();
            if ((a.active === false && a.collapsible === true) || !this.headers.length) {
                a.active = false;
                this.active = g()
            }
            if (a.active === false) {
                this._activate(0)
            } else {
                if (this.active.length && !g.contains(this.element[0], this.active[0])) {
                    if (this.headers.length === this.headers.find(".ui-state-disabled").length) {
                        a.active = false;
                        this.active = g()
                    } else {
                        this._activate(Math.max(0, a.active - 1))
                    }
                } else {
                    a.active = this.headers.index(this.active)
                }
            }
            this._destroyIcons();
            this._refresh()
        },
        _processPanels: function () {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function () {
            var d, c = this.options,
                a = c.heightStyle,
                e = this.element.parent(),
                b = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++i);
            this.active = this._findActive(c.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");
            this.active.next().addClass("ui-accordion-content-active").show();
            this.headers.attr("role", "tab").each(function (r) {
                var t = g(this),
                    p = t.attr("id"),
                    q = t.next(),
                    s = q.attr("id");
                if (!p) {
                    p = b + "-header-" + r;
                    t.attr("id", p)
                }
                if (!s) {
                    s = b + "-panel-" + r;
                    q.attr("id", s)
                }
                t.attr("aria-controls", s);
                q.attr("aria-labelledby", p)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", 0)
            } else {
                this.active.attr({
                    "aria-selected": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })
            }
            this._createIcons();
            this._setupEvents(c.event);
            if (a === "fill") {
                d = e.height();
                this.element.siblings(":visible").each(function () {
                    var m = g(this),
                        n = m.css("position");
                    if (n === "absolute" || n === "fixed") {
                        return
                    }
                    d -= m.outerHeight(true)
                });
                this.headers.each(function () {
                    d -= g(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    g(this).height(Math.max(0, d - g(this).innerHeight() + g(this).height()))
                }).css("overflow", "auto")
            } else {
                if (a === "auto") {
                    d = 0;
                    this.headers.next().each(function () {
                        d = Math.max(d, g(this).css("height", "").height())
                    }).height(d)
                }
            }
        },
        _activate: function (b) {
            var a = this._findActive(b)[0];
            if (a === this.active[0]) {
                return
            }
            a = a || this.active[0];
            this._eventHandler({
                target: a,
                currentTarget: a,
                preventDefault: g.noop
            })
        },
        _findActive: function (a) {
            return typeof a === "number" ? this.headers.eq(a) : g()
        },
        _setupEvents: function (b) {
            var a = {
                keydown: "_keydown"
            };
            if (b) {
                g.each(b.split(" "), function (c, d) {
                    a[d] = "_eventHandler"
                })
            }
            this._off(this.headers.add(this.headers.next()));
            this._on(this.headers, a);
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            });
            this._hoverable(this.headers);
            this._focusable(this.headers)
        },
        _eventHandler: function (a) {
            var o = this.options,
                e = this.active,
                d = g(a.currentTarget),
                r = d[0] === e[0],
                q = r && o.collapsible,
                c = q ? g() : d.next(),
                p = e.next(),
                b = {
                    oldHeader: e,
                    oldPanel: p,
                    newHeader: q ? g() : d,
                    newPanel: c
                };
            a.preventDefault();
            if ((r && !o.collapsible) || (this._trigger("beforeActivate", a, b) === false)) {
                return
            }
            o.active = q ? false : this.headers.index(d);
            this.active = r ? g() : d;
            this._toggle(b);
            e.removeClass("ui-accordion-header-active ui-state-active");
            if (o.icons) {
                e.children(".ui-accordion-header-icon").removeClass(o.icons.activeHeader).addClass(o.icons.header)
            }
            if (!r) {
                d.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top");
                if (o.icons) {
                    d.children(".ui-accordion-header-icon").removeClass(o.icons.header).addClass(o.icons.activeHeader)
                }
                d.next().addClass("ui-accordion-content-active")
            }
        },
        _toggle: function (b) {
            var a = b.newPanel,
                c = this.prevShow.length ? this.prevShow : b.oldPanel;
            this.prevShow.add(this.prevHide).stop(true, true);
            this.prevShow = a;
            this.prevHide = c;
            if (this.options.animate) {
                this._animate(a, c, b)
            } else {
                c.hide();
                a.show();
                this._toggleComplete(b)
            }
            c.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            c.prev().attr("aria-selected", "false");
            if (a.length && c.length) {
                c.prev().attr("tabIndex", -1)
            } else {
                if (a.length) {
                    this.headers.filter(function () {
                        return g(this).attr("tabIndex") === 0
                    }).attr("tabIndex", -1)
                }
            }
            a.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _animate: function (t, v, s) {
            var b, e, r, x = this,
                a = 0,
                c = t.length && (!v.length || (t.index() < v.index())),
                w = this.options.animate || {}, u = c && w.down || w,
                d = function () {
                    x._toggleComplete(s)
                };
            if (typeof u === "number") {
                r = u
            }
            if (typeof u === "string") {
                e = u
            }
            e = e || u.easing || w.easing;
            r = r || u.duration || w.duration;
            if (!v.length) {
                return t.animate(j, r, e, d)
            }
            if (!t.length) {
                return v.animate(f, r, e, d)
            }
            b = t.show().outerHeight();
            v.animate(f, {
                duration: r,
                easing: e,
                step: function (k, l) {
                    l.now = Math.round(k)
                }
            });
            t.hide().animate(j, {
                duration: r,
                easing: e,
                complete: d,
                step: function (k, l) {
                    l.now = Math.round(k);
                    if (l.prop !== "height") {
                        a += l.now
                    } else {
                        if (x.options.heightStyle !== "content") {
                            l.now = Math.round(b - v.outerHeight() - a);
                            a = 0
                        }
                    }
                }
            })
        },
        _toggleComplete: function (b) {
            var a = b.oldPanel;
            a.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");
            if (a.length) {
                a.parent()[0].className = a.parent()[0].className
            }
            this._trigger("activate", null, b)
        }
    })
})(jQuery);
(function (d, e) {
    var f = 0;
    d.widget("ui.autocomplete", {
        version: "1.10.2",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function () {
            var a, j, l, k = this.element[0].nodeName.toLowerCase(),
                b = k === "textarea",
                c = k === "input";
            this.isMultiLine = b ? true : c ? false : this.element.prop("isContentEditable");
            this.valueMethod = this.element[b || c ? "val" : "text"];
            this.isNewMenu = true;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function (h) {
                    if (this.element.prop("readOnly")) {
                        a = true;
                        l = true;
                        j = true;
                        return
                    }
                    a = false;
                    l = false;
                    j = false;
                    var g = d.ui.keyCode;
                    switch (h.keyCode) {
                    case g.PAGE_UP:
                        a = true;
                        this._move("previousPage", h);
                        break;
                    case g.PAGE_DOWN:
                        a = true;
                        this._move("nextPage", h);
                        break;
                    case g.UP:
                        a = true;
                        this._keyEvent("previous", h);
                        break;
                    case g.DOWN:
                        a = true;
                        this._keyEvent("next", h);
                        break;
                    case g.ENTER:
                    case g.NUMPAD_ENTER:
                        if (this.menu.active) {
                            a = true;
                            h.preventDefault();
                            this.menu.select(h)
                        }
                        break;
                    case g.TAB:
                        if (this.menu.active) {
                            this.menu.select(h)
                        }
                        break;
                    case g.ESCAPE:
                        if (this.menu.element.is(":visible")) {
                            this._value(this.term);
                            this.close(h);
                            h.preventDefault()
                        }
                        break;
                    default:
                        j = true;
                        this._searchTimeout(h);
                        break
                    }
                },
                keypress: function (h) {
                    if (a) {
                        a = false;
                        h.preventDefault();
                        return
                    }
                    if (j) {
                        return
                    }
                    var g = d.ui.keyCode;
                    switch (h.keyCode) {
                    case g.PAGE_UP:
                        this._move("previousPage", h);
                        break;
                    case g.PAGE_DOWN:
                        this._move("nextPage", h);
                        break;
                    case g.UP:
                        this._keyEvent("previous", h);
                        break;
                    case g.DOWN:
                        this._keyEvent("next", h);
                        break
                    }
                },
                input: function (g) {
                    if (l) {
                        l = false;
                        g.preventDefault();
                        return
                    }
                    this._searchTimeout(g)
                },
                focus: function () {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function (g) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching);
                    this.close(g);
                    this._change(g)
                }
            });
            this._initSource();
            this.menu = d("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                input: d(),
                role: null
            }).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function (g) {
                    g.preventDefault();
                    this.cancelBlur = true;
                    this._delay(function () {
                        delete this.cancelBlur
                    });
                    var h = this.menu.element[0];
                    if (!d(g.target).closest(".ui-menu-item").length) {
                        this._delay(function () {
                            var i = this;
                            this.document.one("mousedown", function (n) {
                                if (n.target !== i.element[0] && n.target !== h && !d.contains(h, n.target)) {
                                    i.close()
                                }
                            })
                        })
                    }
                },
                menufocus: function (h, i) {
                    if (this.isNewMenu) {
                        this.isNewMenu = false;
                        if (h.originalEvent && /^mouse/.test(h.originalEvent.type)) {
                            this.menu.blur();
                            this.document.one("mousemove", function () {
                                d(h.target).trigger(h.originalEvent)
                            });
                            return
                        }
                    }
                    var g = i.item.data("ui-autocomplete-item");
                    if (false !== this._trigger("focus", h, {
                        item: g
                    })) {
                        if (h.originalEvent && /^key/.test(h.originalEvent.type)) {
                            this._value(g.value)
                        }
                    } else {
                        this.liveRegion.text(g.value)
                    }
                },
                menuselect: function (h, n) {
                    var g = n.item.data("ui-autocomplete-item"),
                        i = this.previous;
                    if (this.element[0] !== this.document[0].activeElement) {
                        this.element.focus();
                        this.previous = i;
                        this._delay(function () {
                            this.previous = i;
                            this.selectedItem = g
                        })
                    }
                    if (false !== this._trigger("select", h, {
                        item: g
                    })) {
                        this._value(g.value)
                    }
                    this.term = this._value();
                    this.close(h);
                    this.selectedItem = g
                }
            });
            this.liveRegion = d("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element);
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function (a, b) {
            this._super(a, b);
            if (a === "source") {
                this._initSource()
            }
            if (a === "appendTo") {
                this.menu.element.appendTo(this._appendTo())
            }
            if (a === "disabled" && b && this.xhr) {
                this.xhr.abort()
            }
        },
        _appendTo: function () {
            var a = this.options.appendTo;
            if (a) {
                a = a.jquery || a.nodeType ? d(a) : this.document.find(a).eq(0)
            }
            if (!a) {
                a = this.element.closest(".ui-front")
            }
            if (!a.length) {
                a = this.document[0].body
            }
            return a
        },
        _initSource: function () {
            var a, c, b = this;
            if (d.isArray(this.options.source)) {
                a = this.options.source;
                this.source = function (j, i) {
                    i(d.ui.autocomplete.filter(a, j.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    c = this.options.source;
                    this.source = function (j, i) {
                        if (b.xhr) {
                            b.xhr.abort()
                        }
                        b.xhr = d.ajax({
                            url: c,
                            data: j,
                            dataType: "json",
                            success: function (g) {
                                i(g)
                            },
                            error: function () {
                                i([])
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        },
        _searchTimeout: function (a) {
            clearTimeout(this.searching);
            this.searching = this._delay(function () {
                if (this.term !== this._value()) {
                    this.selectedItem = null;
                    this.search(null, a)
                }
            }, this.options.delay)
        },
        search: function (a, b) {
            a = a != null ? a : this._value();
            this.term = this._value();
            if (a.length < this.options.minLength) {
                return this.close(b)
            }
            if (this._trigger("search", b) === false) {
                return
            }
            return this._search(a)
        },
        _search: function (a) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = false;
            this.source({
                term: a
            }, this._response())
        },
        _response: function () {
            var b = this,
                a = ++f;
            return function (c) {
                if (a === f) {
                    b.__response(c)
                }
                b.pending--;
                if (!b.pending) {
                    b.element.removeClass("ui-autocomplete-loading")
                }
            }
        },
        __response: function (a) {
            if (a) {
                a = this._normalize(a)
            }
            this._trigger("response", null, {
                content: a
            });
            if (!this.options.disabled && a && a.length && !this.cancelSearch) {
                this._suggest(a);
                this._trigger("open")
            } else {
                this._close()
            }
        },
        close: function (a) {
            this.cancelSearch = true;
            this._close(a)
        },
        _close: function (a) {
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.blur();
                this.isNewMenu = true;
                this._trigger("close", a)
            }
        },
        _change: function (a) {
            if (this.previous !== this._value()) {
                this._trigger("change", a, {
                    item: this.selectedItem
                })
            }
        },
        _normalize: function (a) {
            if (a.length && a[0].label && a[0].value) {
                return a
            }
            return d.map(a, function (b) {
                if (typeof b === "string") {
                    return {
                        label: b,
                        value: b
                    }
                }
                return d.extend({
                    label: b.label || b.value,
                    value: b.value || b.label
                }, b)
            })
        },
        _suggest: function (b) {
            var a = this.menu.element.empty();
            this._renderMenu(a, b);
            this.isNewMenu = true;
            this.menu.refresh();
            a.show();
            this._resizeMenu();
            a.position(d.extend({
                of: this.element
            }, this.options.position));
            if (this.options.autoFocus) {
                this.menu.next()
            }
        },
        _resizeMenu: function () {
            var a = this.menu.element;
            a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (a, c) {
            var b = this;
            d.each(c, function (j, i) {
                b._renderItemData(a, i)
            })
        },
        _renderItemData: function (b, a) {
            return this._renderItem(b, a).data("ui-autocomplete-item", a)
        },
        _renderItem: function (b, a) {
            return d("<li>").append(d("<a>").text(a.label)).appendTo(b)
        },
        _move: function (a, b) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, b);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a)) {
                this._value(this.term);
                this.menu.blur();
                return
            }
            this.menu[a](b)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (a, b) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(a, b);
                b.preventDefault()
            }
        }
    });
    d.extend(d.ui.autocomplete, {
        escapeRegex: function (a) {
            return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (a, c) {
            var b = new RegExp(d.ui.autocomplete.escapeRegex(c), "i");
            return d.grep(a, function (h) {
                return b.test(h.label || h.value || h)
            })
        }
    });
    d.widget("ui.autocomplete", d.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (a) {
                    return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (a) {
            var b;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) {
                return
            }
            if (a && a.length) {
                b = this.options.messages.results(a.length)
            } else {
                b = this.options.messages.noResults
            }
            this.liveRegion.text(b)
        }
    })
}(jQuery));
(function (l, r) {
    var p, t, v, q, o = "ui-button ui-widget ui-state-default ui-corner-all",
        s = "ui-state-hover ui-state-active ",
        n = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        m = function () {
            var a = l(this).find(":ui-button");
            setTimeout(function () {
                a.button("refresh")
            }, 1)
        }, u = function (d) {
            var a = d.name,
                c = d.form,
                b = l([]);
            if (a) {
                a = a.replace(/'/g, "\\'");
                if (c) {
                    b = l(c).find("[name='" + a + "']")
                } else {
                    b = l("[name='" + a + "']", d.ownerDocument).filter(function () {
                        return !this.form
                    })
                }
            }
            return b
        };
    l.widget("ui.button", {
        version: "1.10.2",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = !! this.element.prop("disabled")
            } else {
                this.element.prop("disabled", this.options.disabled)
            }
            this._determineButtonType();
            this.hasTitle = !! this.buttonElement.attr("title");
            var a = this,
                d = this.options,
                c = this.type === "checkbox" || this.type === "radio",
                b = !c ? "ui-state-active" : "",
                e = "ui-state-focus";
            if (d.label === null) {
                d.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html())
            }
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                if (d.disabled) {
                    return
                }
                if (this === p) {
                    l(this).addClass("ui-state-active")
                }
            }).bind("mouseleave" + this.eventNamespace, function () {
                if (d.disabled) {
                    return
                }
                l(this).removeClass(b)
            }).bind("click" + this.eventNamespace, function (f) {
                if (d.disabled) {
                    f.preventDefault();
                    f.stopImmediatePropagation()
                }
            });
            this.element.bind("focus" + this.eventNamespace, function () {
                a.buttonElement.addClass(e)
            }).bind("blur" + this.eventNamespace, function () {
                a.buttonElement.removeClass(e)
            });
            if (c) {
                this.element.bind("change" + this.eventNamespace, function () {
                    if (q) {
                        return
                    }
                    a.refresh()
                });
                this.buttonElement.bind("mousedown" + this.eventNamespace, function (f) {
                    if (d.disabled) {
                        return
                    }
                    q = false;
                    t = f.pageX;
                    v = f.pageY
                }).bind("mouseup" + this.eventNamespace, function (f) {
                    if (d.disabled) {
                        return
                    }
                    if (t !== f.pageX || v !== f.pageY) {
                        q = true
                    }
                })
            }
            if (this.type === "checkbox") {
                this.buttonElement.bind("click" + this.eventNamespace, function () {
                    if (d.disabled || q) {
                        return false
                    }
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click" + this.eventNamespace, function () {
                        if (d.disabled || q) {
                            return false
                        }
                        l(this).addClass("ui-state-active");
                        a.buttonElement.attr("aria-pressed", "true");
                        var f = a.element[0];
                        u(f).not(f).map(function () {
                            return l(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", "false")
                    })
                } else {
                    this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                        if (d.disabled) {
                            return false
                        }
                        l(this).addClass("ui-state-active");
                        p = this;
                        a.document.one("mouseup", function () {
                            p = null
                        })
                    }).bind("mouseup" + this.eventNamespace, function () {
                        if (d.disabled) {
                            return false
                        }
                        l(this).removeClass("ui-state-active")
                    }).bind("keydown" + this.eventNamespace, function (f) {
                        if (d.disabled) {
                            return false
                        }
                        if (f.keyCode === l.ui.keyCode.SPACE || f.keyCode === l.ui.keyCode.ENTER) {
                            l(this).addClass("ui-state-active")
                        }
                    }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                        l(this).removeClass("ui-state-active")
                    });
                    if (this.buttonElement.is("a")) {
                        this.buttonElement.keyup(function (f) {
                            if (f.keyCode === l.ui.keyCode.SPACE) {
                                l(this).click()
                            }
                        })
                    }
                }
            }
            this._setOption("disabled", d.disabled);
            this._resetButton()
        },
        _determineButtonType: function () {
            var c, a, b;
            if (this.element.is("[type=checkbox]")) {
                this.type = "checkbox"
            } else {
                if (this.element.is("[type=radio]")) {
                    this.type = "radio"
                } else {
                    if (this.element.is("input")) {
                        this.type = "input"
                    } else {
                        this.type = "button"
                    }
                }
            } if (this.type === "checkbox" || this.type === "radio") {
                c = this.element.parents().last();
                a = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = c.find(a);
                if (!this.buttonElement.length) {
                    c = c.length ? c.siblings() : this.element.siblings();
                    this.buttonElement = c.filter(a);
                    if (!this.buttonElement.length) {
                        this.buttonElement = c.find(a)
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                b = this.element.is(":checked");
                if (b) {
                    this.buttonElement.addClass("ui-state-active")
                }
                this.buttonElement.prop("aria-pressed", b)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass(o + " " + s + " " + n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            if (!this.hasTitle) {
                this.buttonElement.removeAttr("title")
            }
        },
        _setOption: function (b, a) {
            this._super(b, a);
            if (b === "disabled") {
                if (a) {
                    this.element.prop("disabled", true)
                } else {
                    this.element.prop("disabled", false)
                }
                return
            }
            this._resetButton()
        },
        refresh: function () {
            var a = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            if (a !== this.options.disabled) {
                this._setOption("disabled", a)
            }
            if (this.type === "radio") {
                u(this.element[0]).each(function () {
                    if (l(this).is(":checked")) {
                        l(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        l(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                })
            } else {
                if (this.type === "checkbox") {
                    if (this.element.is(":checked")) {
                        this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true")
                    } else {
                        this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
                    }
                }
            }
        },
        _resetButton: function () {
            if (this.type === "input") {
                if (this.options.label) {
                    this.element.val(this.options.label)
                }
                return
            }
            var c = this.buttonElement.removeClass(n),
                a = l("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(c.empty()).text(),
                b = this.options.icons,
                d = b.primary && b.secondary,
                e = [];
            if (b.primary || b.secondary) {
                if (this.options.text) {
                    e.push("ui-button-text-icon" + (d ? "s" : (b.primary ? "-primary" : "-secondary")))
                }
                if (b.primary) {
                    c.prepend("<span class='ui-button-icon-primary ui-icon " + b.primary + "'></span>")
                }
                if (b.secondary) {
                    c.append("<span class='ui-button-icon-secondary ui-icon " + b.secondary + "'></span>")
                }
                if (!this.options.text) {
                    e.push(d ? "ui-button-icons-only" : "ui-button-icon-only");
                    if (!this.hasTitle) {
                        c.attr("title", l.trim(a))
                    }
                }
            } else {
                e.push("ui-button-text-only")
            }
            c.addClass(e.join(" "))
        }
    });
    l.widget("ui.buttonset", {
        version: "1.10.2",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (b, a) {
            if (b === "disabled") {
                this.buttons.button("option", b, a)
            }
            this._super(b, a)
        },
        refresh: function () {
            var a = this.element.css("direction") === "rtl";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return l(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(a ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return l(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery));
(function (i, n) {
    i.extend(i.ui, {
        datepicker: {
            version: "1.10.2"
        }
    });
    var l = "datepicker",
        j = new Date().getTime(),
        p;

    function k() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        i.extend(this._defaults, this.regional[""]);
        this.dpDiv = m(i("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    i.extend(k.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (a) {
            o(this._defaults, a || {});
            return this
        },
        _attachDatepicker: function (b, c) {
            var a, d, e;
            a = b.nodeName.toLowerCase();
            d = (a === "div" || a === "span");
            if (!b.id) {
                this.uuid += 1;
                b.id = "dp" + this.uuid
            }
            e = this._newInst(i(b), d);
            e.settings = i.extend({}, c || {});
            if (a === "input") {
                this._connectDatepicker(b, e)
            } else {
                if (d) {
                    this._inlineDatepicker(b, e)
                }
            }
        },
        _newInst: function (c, b) {
            var a = c[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: a,
                input: c,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: b,
                dpDiv: (!b ? this.dpDiv : m(i("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function (c, a) {
            var b = i(c);
            a.append = i([]);
            a.trigger = i([]);
            if (b.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(b, a);
            b.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(a);
            i.data(c, l, a);
            if (a.settings.disabled) {
                this._disableDatepicker(c)
            }
        },
        _attachments: function (f, d) {
            var c, a, g, b = this._get(d, "appendText"),
                e = this._get(d, "isRTL");
            if (d.append) {
                d.append.remove()
            }
            if (b) {
                d.append = i("<span class='" + this._appendClass + "'>" + b + "</span>");
                f[e ? "before" : "after"](d.append)
            }
            f.unbind("focus", this._showDatepicker);
            if (d.trigger) {
                d.trigger.remove()
            }
            c = this._get(d, "showOn");
            if (c === "focus" || c === "both") {
                f.focus(this._showDatepicker)
            }
            if (c === "button" || c === "both") {
                a = this._get(d, "buttonText");
                g = this._get(d, "buttonImage");
                d.trigger = i(this._get(d, "buttonImageOnly") ? i("<img/>").addClass(this._triggerClass).attr({
                    src: g,
                    alt: a,
                    title: a
                }) : i("<button type='button'></button>").addClass(this._triggerClass).html(!g ? a : i("<img/>").attr({
                    src: g,
                    alt: a,
                    title: a
                })));
                f[e ? "before" : "after"](d.trigger);
                d.trigger.click(function () {
                    if (i.datepicker._datepickerShowing && i.datepicker._lastInput === f[0]) {
                        i.datepicker._hideDatepicker()
                    } else {
                        if (i.datepicker._datepickerShowing && i.datepicker._lastInput !== f[0]) {
                            i.datepicker._hideDatepicker();
                            i.datepicker._showDatepicker(f[0])
                        } else {
                            i.datepicker._showDatepicker(f[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function (e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var b, a, c, g, d = new Date(2009, 12 - 1, 20),
                    f = this._get(e, "dateFormat");
                if (f.match(/[DM]/)) {
                    b = function (h) {
                        a = 0;
                        c = 0;
                        for (g = 0; g < h.length; g++) {
                            if (h[g].length > a) {
                                a = h[g].length;
                                c = g
                            }
                        }
                        return c
                    };
                    d.setMonth(b(this._get(e, (f.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    d.setDate(b(this._get(e, (f.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - d.getDay())
                }
                e.input.attr("size", this._formatDate(e, d).length)
            }
        },
        _inlineDatepicker: function (a, b) {
            var c = i(a);
            if (c.hasClass(this.markerClassName)) {
                return
            }
            c.addClass(this.markerClassName).append(b.dpDiv);
            i.data(a, l, b);
            this._setDate(b, this._getDefaultDate(b), true);
            this._updateDatepicker(b);
            this._updateAlternate(b);
            if (b.settings.disabled) {
                this._disableDatepicker(a)
            }
            b.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function (t, c, b, f, a) {
            var g, u, e, h, v, d = this._dialogInst;
            if (!d) {
                this.uuid += 1;
                g = "dp" + this.uuid;
                this._dialogInput = i("<input type='text' id='" + g + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                i("body").append(this._dialogInput);
                d = this._dialogInst = this._newInst(this._dialogInput, false);
                d.settings = {};
                i.data(this._dialogInput[0], l, d)
            }
            o(d.settings, f || {});
            c = (c && c.constructor === Date ? this._formatDate(d, c) : c);
            this._dialogInput.val(c);
            this._pos = (a ? (a.length ? a : [a.pageX, a.pageY]) : null);
            if (!this._pos) {
                u = document.documentElement.clientWidth;
                e = document.documentElement.clientHeight;
                h = document.documentElement.scrollLeft || document.body.scrollLeft;
                v = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(u / 2) - 100 + h, (e / 2) - 150 + v]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            d.settings.onSelect = b;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if (i.blockUI) {
                i.blockUI(this.dpDiv)
            }
            i.data(this._dialogInput[0], l, d);
            return this
        },
        _destroyDatepicker: function (a) {
            var c, d = i(a),
                b = i.data(a, l);
            if (!d.hasClass(this.markerClassName)) {
                return
            }
            c = a.nodeName.toLowerCase();
            i.removeData(a, l);
            if (c === "input") {
                b.append.remove();
                b.trigger.remove();
                d.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (c === "div" || c === "span") {
                    d.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function (a) {
            var c, d, e = i(a),
                b = i.data(a, l);
            if (!e.hasClass(this.markerClassName)) {
                return
            }
            c = a.nodeName.toLowerCase();
            if (c === "input") {
                a.disabled = false;
                b.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (c === "div" || c === "span") {
                    d = e.children("." + this._inlineClass);
                    d.children().removeClass("ui-state-disabled");
                    d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
                }
            }
            this._disabledInputs = i.map(this._disabledInputs, function (f) {
                return (f === a ? null : f)
            })
        },
        _disableDatepicker: function (a) {
            var c, d, e = i(a),
                b = i.data(a, l);
            if (!e.hasClass(this.markerClassName)) {
                return
            }
            c = a.nodeName.toLowerCase();
            if (c === "input") {
                a.disabled = true;
                b.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (c === "div" || c === "span") {
                    d = e.children("." + this._inlineClass);
                    d.children().addClass("ui-state-disabled");
                    d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
                }
            }
            this._disabledInputs = i.map(this._disabledInputs, function (f) {
                return (f === a ? null : f)
            });
            this._disabledInputs[this._disabledInputs.length] = a
        },
        _isDisabledDatepicker: function (a) {
            if (!a) {
                return false
            }
            for (var b = 0; b < this._disabledInputs.length; b++) {
                if (this._disabledInputs[b] === a) {
                    return true
                }
            }
            return false
        },
        _getInst: function (a) {
            try {
                return i.data(a, l)
            } catch (b) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (a, b, g) {
            var f, h, d, c, e = this._getInst(a);
            if (arguments.length === 2 && typeof b === "string") {
                return (b === "defaults" ? i.extend({}, i.datepicker._defaults) : (e ? (b === "all" ? i.extend({}, e.settings) : this._get(e, b)) : null))
            }
            f = b || {};
            if (typeof b === "string") {
                f = {};
                f[b] = g
            }
            if (e) {
                if (this._curInst === e) {
                    this._hideDatepicker()
                }
                h = this._getDateDatepicker(a, true);
                d = this._getMinMaxDate(e, "min");
                c = this._getMinMaxDate(e, "max");
                o(e.settings, f);
                if (d !== null && f.dateFormat !== n && f.minDate === n) {
                    e.settings.minDate = this._formatDate(e, d)
                }
                if (c !== null && f.dateFormat !== n && f.maxDate === n) {
                    e.settings.maxDate = this._formatDate(e, c)
                }
                if ("disabled" in f) {
                    if (f.disabled) {
                        this._disableDatepicker(a)
                    } else {
                        this._enableDatepicker(a)
                    }
                }
                this._attachments(i(a), e);
                this._autoSize(e);
                this._setDate(e, h);
                this._updateAlternate(e);
                this._updateDatepicker(e)
            }
        },
        _changeDatepicker: function (c, a, b) {
            this._optionDatepicker(c, a, b)
        },
        _refreshDatepicker: function (a) {
            var b = this._getInst(a);
            if (b) {
                this._updateDatepicker(b)
            }
        },
        _setDateDatepicker: function (a, c) {
            var b = this._getInst(a);
            if (b) {
                this._setDate(b, c);
                this._updateDatepicker(b);
                this._updateAlternate(b)
            }
        },
        _getDateDatepicker: function (c, b) {
            var a = this._getInst(c);
            if (a && !a.inline) {
                this._setDateFromField(a, b)
            }
            return (a ? this._getDate(a) : null)
        },
        _doKeyDown: function (c) {
            var e, f, b, g = i.datepicker._getInst(c.target),
                d = true,
                a = g.dpDiv.is(".ui-datepicker-rtl");
            g._keyEvent = true;
            if (i.datepicker._datepickerShowing) {
                switch (c.keyCode) {
                case 9:
                    i.datepicker._hideDatepicker();
                    d = false;
                    break;
                case 13:
                    b = i("td." + i.datepicker._dayOverClass + ":not(." + i.datepicker._currentClass + ")", g.dpDiv);
                    if (b[0]) {
                        i.datepicker._selectDay(c.target, g.selectedMonth, g.selectedYear, b[0])
                    }
                    e = i.datepicker._get(g, "onSelect");
                    if (e) {
                        f = i.datepicker._formatDate(g);
                        e.apply((g.input ? g.input[0] : null), [f, g])
                    } else {
                        i.datepicker._hideDatepicker()
                    }
                    return false;
                case 27:
                    i.datepicker._hideDatepicker();
                    break;
                case 33:
                    i.datepicker._adjustDate(c.target, (c.ctrlKey ? -i.datepicker._get(g, "stepBigMonths") : -i.datepicker._get(g, "stepMonths")), "M");
                    break;
                case 34:
                    i.datepicker._adjustDate(c.target, (c.ctrlKey ? +i.datepicker._get(g, "stepBigMonths") : +i.datepicker._get(g, "stepMonths")), "M");
                    break;
                case 35:
                    if (c.ctrlKey || c.metaKey) {
                        i.datepicker._clearDate(c.target)
                    }
                    d = c.ctrlKey || c.metaKey;
                    break;
                case 36:
                    if (c.ctrlKey || c.metaKey) {
                        i.datepicker._gotoToday(c.target)
                    }
                    d = c.ctrlKey || c.metaKey;
                    break;
                case 37:
                    if (c.ctrlKey || c.metaKey) {
                        i.datepicker._adjustDate(c.target, (a ? +1 : -1), "D")
                    }
                    d = c.ctrlKey || c.metaKey;
                    if (c.originalEvent.altKey) {
                        i.datepicker._adjustDate(c.target, (c.ctrlKey ? -i.datepicker._get(g, "stepBigMonths") : -i.datepicker._get(g, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (c.ctrlKey || c.metaKey) {
                        i.datepicker._adjustDate(c.target, -7, "D")
                    }
                    d = c.ctrlKey || c.metaKey;
                    break;
                case 39:
                    if (c.ctrlKey || c.metaKey) {
                        i.datepicker._adjustDate(c.target, (a ? -1 : +1), "D")
                    }
                    d = c.ctrlKey || c.metaKey;
                    if (c.originalEvent.altKey) {
                        i.datepicker._adjustDate(c.target, (c.ctrlKey ? +i.datepicker._get(g, "stepBigMonths") : +i.datepicker._get(g, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (c.ctrlKey || c.metaKey) {
                        i.datepicker._adjustDate(c.target, +7, "D")
                    }
                    d = c.ctrlKey || c.metaKey;
                    break;
                default:
                    d = false
                }
            } else {
                if (c.keyCode === 36 && c.ctrlKey) {
                    i.datepicker._showDatepicker(this)
                } else {
                    d = false
                }
            } if (d) {
                c.preventDefault();
                c.stopPropagation()
            }
        },
        _doKeyPress: function (c) {
            var d, b, a = i.datepicker._getInst(c.target);
            if (i.datepicker._get(a, "constrainInput")) {
                d = i.datepicker._possibleChars(i.datepicker._get(a, "dateFormat"));
                b = String.fromCharCode(c.charCode == null ? c.keyCode : c.charCode);
                return c.ctrlKey || c.metaKey || (b < " " || !d || d.indexOf(b) > -1)
            }
        },
        _doKeyUp: function (b) {
            var a, d = i.datepicker._getInst(b.target);
            if (d.input.val() !== d.lastVal) {
                try {
                    a = i.datepicker.parseDate(i.datepicker._get(d, "dateFormat"), (d.input ? d.input.val() : null), i.datepicker._getFormatConfig(d));
                    if (a) {
                        i.datepicker._setDateFromField(d);
                        i.datepicker._updateAlternate(d);
                        i.datepicker._updateDatepicker(d)
                    }
                } catch (c) {}
            }
            return true
        },
        _showDatepicker: function (c) {
            c = c.target || c;
            if (c.nodeName.toLowerCase() !== "input") {
                c = i("input", c.parentNode)[0]
            }
            if (i.datepicker._isDisabledDatepicker(c) || i.datepicker._lastInput === c) {
                return
            }
            var g, d, e, a, b, f, h;
            g = i.datepicker._getInst(c);
            if (i.datepicker._curInst && i.datepicker._curInst !== g) {
                i.datepicker._curInst.dpDiv.stop(true, true);
                if (g && i.datepicker._datepickerShowing) {
                    i.datepicker._hideDatepicker(i.datepicker._curInst.input[0])
                }
            }
            d = i.datepicker._get(g, "beforeShow");
            e = d ? d.apply(c, [c, g]) : {};
            if (e === false) {
                return
            }
            o(g.settings, e);
            g.lastVal = null;
            i.datepicker._lastInput = c;
            i.datepicker._setDateFromField(g);
            if (i.datepicker._inDialog) {
                c.value = ""
            }
            if (!i.datepicker._pos) {
                i.datepicker._pos = i.datepicker._findPos(c);
                i.datepicker._pos[1] += c.offsetHeight
            }
            a = false;
            i(c).parents().each(function () {
                a |= i(this).css("position") === "fixed";
                return !a
            });
            b = {
                left: i.datepicker._pos[0],
                top: i.datepicker._pos[1]
            };
            i.datepicker._pos = null;
            g.dpDiv.empty();
            g.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            i.datepicker._updateDatepicker(g);
            b = i.datepicker._checkOffset(g, b, a);
            g.dpDiv.css({
                position: (i.datepicker._inDialog && i.blockUI ? "static" : (a ? "fixed" : "absolute")),
                display: "none",
                left: b.left + "px",
                top: b.top + "px"
            });
            if (!g.inline) {
                f = i.datepicker._get(g, "showAnim");
                h = i.datepicker._get(g, "duration");
                g.dpDiv.zIndex(i(c).zIndex() + 1);
                i.datepicker._datepickerShowing = true;
                if (i.effects && i.effects.effect[f]) {
                    g.dpDiv.show(f, i.datepicker._get(g, "showOptions"), h)
                } else {
                    g.dpDiv[f || "show"](f ? h : null)
                } if (g.input.is(":visible") && !g.input.is(":disabled")) {
                    g.input.focus()
                }
                i.datepicker._curInst = g
            }
        },
        _updateDatepicker: function (b) {
            this.maxRows = 4;
            p = b;
            b.dpDiv.empty().append(this._generateHTML(b));
            this._attachHandlers(b);
            b.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var e, c = this._getNumberOfMonths(b),
                a = c[1],
                d = 17;
            b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (a > 1) {
                b.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", (d * a) + "em")
            }
            b.dpDiv[(c[0] !== 1 || c[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (b === i.datepicker._curInst && i.datepicker._datepickerShowing && b.input && b.input.is(":visible") && !b.input.is(":disabled") && b.input[0] !== document.activeElement) {
                b.input.focus()
            }
            if (b.yearshtml) {
                e = b.yearshtml;
                setTimeout(function () {
                    if (e === b.yearshtml && b.yearshtml) {
                        b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml)
                    }
                    e = b.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (a) {
            var b = function (c) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[c] || c
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset: function (c, f, a) {
            var e = c.dpDiv.outerWidth(),
                d = c.dpDiv.outerHeight(),
                b = c.input ? c.input.outerWidth() : 0,
                h = c.input ? c.input.outerHeight() : 0,
                g = document.documentElement.clientWidth + (a ? 0 : i(document).scrollLeft()),
                r = document.documentElement.clientHeight + (a ? 0 : i(document).scrollTop());
            f.left -= (this._get(c, "isRTL") ? (e - b) : 0);
            f.left -= (a && f.left === c.input.offset().left) ? i(document).scrollLeft() : 0;
            f.top -= (a && f.top === (c.input.offset().top + h)) ? i(document).scrollTop() : 0;
            f.left -= Math.min(f.left, (f.left + e > g && g > e) ? Math.abs(f.left + e - g) : 0);
            f.top -= Math.min(f.top, (f.top + d > r && r > d) ? Math.abs(d + h) : 0);
            return f
        },
        _findPos: function (b) {
            var c, a = this._getInst(b),
                d = this._get(a, "isRTL");
            while (b && (b.type === "hidden" || b.nodeType !== 1 || i.expr.filters.hidden(b))) {
                b = b[d ? "previousSibling" : "nextSibling"]
            }
            c = i(b).offset();
            return [c.left, c.top]
        },
        _hideDatepicker: function (e) {
            var f, b, d, c, a = this._curInst;
            if (!a || (e && a !== i.data(e, l))) {
                return
            }
            if (this._datepickerShowing) {
                f = this._get(a, "showAnim");
                b = this._get(a, "duration");
                d = function () {
                    i.datepicker._tidyDialog(a)
                };
                if (i.effects && (i.effects.effect[f] || i.effects[f])) {
                    a.dpDiv.hide(f, i.datepicker._get(a, "showOptions"), b, d)
                } else {
                    a.dpDiv[(f === "slideDown" ? "slideUp" : (f === "fadeIn" ? "fadeOut" : "hide"))]((f ? b : null), d)
                } if (!f) {
                    d()
                }
                this._datepickerShowing = false;
                c = this._get(a, "onClose");
                if (c) {
                    c.apply((a.input ? a.input[0] : null), [(a.input ? a.input.val() : ""), a])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (i.blockUI) {
                        i.unblockUI();
                        i("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (c) {
            if (!i.datepicker._curInst) {
                return
            }
            var b = i(c.target),
                a = i.datepicker._getInst(b[0]);
            if (((b[0].id !== i.datepicker._mainDivId && b.parents("#" + i.datepicker._mainDivId).length === 0 && !b.hasClass(i.datepicker.markerClassName) && !b.closest("." + i.datepicker._triggerClass).length && i.datepicker._datepickerShowing && !(i.datepicker._inDialog && i.blockUI))) || (b.hasClass(i.datepicker.markerClassName) && i.datepicker._curInst !== a)) {
                i.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, c, a) {
            var d = i(e),
                b = this._getInst(d[0]);
            if (this._isDisabledDatepicker(d[0])) {
                return
            }
            this._adjustInstDate(b, c + (a === "M" ? this._get(b, "showCurrentAtPos") : 0), a);
            this._updateDatepicker(b)
        },
        _gotoToday: function (d) {
            var c, a = i(d),
                b = this._getInst(a[0]);
            if (this._get(b, "gotoCurrent") && b.currentDay) {
                b.selectedDay = b.currentDay;
                b.drawMonth = b.selectedMonth = b.currentMonth;
                b.drawYear = b.selectedYear = b.currentYear
            } else {
                c = new Date();
                b.selectedDay = c.getDate();
                b.drawMonth = b.selectedMonth = c.getMonth();
                b.drawYear = b.selectedYear = c.getFullYear()
            }
            this._notifyChange(b);
            this._adjustDate(a)
        },
        _selectMonthYear: function (e, c, a) {
            var d = i(e),
                b = this._getInst(d[0]);
            b["selected" + (a === "M" ? "Month" : "Year")] = b["draw" + (a === "M" ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10);
            this._notifyChange(b);
            this._adjustDate(d)
        },
        _selectDay: function (c, b, a, e) {
            var f, d = i(c);
            if (i(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(d[0])) {
                return
            }
            f = this._getInst(d[0]);
            f.selectedDay = f.currentDay = i("a", e).html();
            f.selectedMonth = f.currentMonth = b;
            f.selectedYear = f.currentYear = a;
            this._selectDate(c, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
        },
        _clearDate: function (a) {
            var b = i(a);
            this._selectDate(b, "")
        },
        _selectDate: function (a, c) {
            var e, b = i(a),
                d = this._getInst(b[0]);
            c = (c != null ? c : this._formatDate(d));
            if (d.input) {
                d.input.val(c)
            }
            this._updateAlternate(d);
            e = this._get(d, "onSelect");
            if (e) {
                e.apply((d.input ? d.input[0] : null), [c, d])
            } else {
                if (d.input) {
                    d.input.trigger("change")
                }
            } if (d.inline) {
                this._updateDatepicker(d)
            } else {
                this._hideDatepicker();
                this._lastInput = d.input[0];
                if (typeof (d.input[0]) !== "object") {
                    d.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function (b) {
            var a, e, c, d = this._get(b, "altField");
            if (d) {
                a = this._get(b, "altFormat") || this._get(b, "dateFormat");
                e = this._getDate(b);
                c = this.formatDate(a, e, this._getFormatConfig(b));
                i(d).each(function () {
                    i(this).val(c)
                })
            }
        },
        noWeekends: function (a) {
            var b = a.getDay();
            return [(b > 0 && b < 6), ""]
        },
        iso8601Week: function (c) {
            var b, a = new Date(c.getTime());
            a.setDate(a.getDate() + 4 - (a.getDay() || 7));
            b = a.getTime();
            a.setMonth(0);
            a.setDate(1);
            return Math.floor(Math.round((b - a) / 86400000) / 7) + 1
        },
        parseDate: function (K, P, F) {
            if (K == null || P == null) {
                throw "Invalid arguments"
            }
            P = (typeof P === "object" ? P.toString() : P + "");
            if (P === "") {
                return null
            }
            var N, a, L, I = 0,
                d = (F ? F.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                G = (typeof d !== "string" ? d : new Date().getFullYear() % 100 + parseInt(d, 10)),
                c = (F ? F.dayNamesShort : null) || this._defaults.dayNamesShort,
                b = (F ? F.dayNames : null) || this._defaults.dayNames,
                g = (F ? F.monthNamesShort : null) || this._defaults.monthNamesShort,
                O = (F ? F.monthNames : null) || this._defaults.monthNames,
                T = -1,
                f = -1,
                e = -1,
                H = -1,
                J = false,
                h, Q = function (q) {
                    var r = (N + 1 < K.length && K.charAt(N + 1) === q);
                    if (r) {
                        N++
                    }
                    return r
                }, M = function (u) {
                    var r = Q(u),
                        t = (u === "@" ? 14 : (u === "!" ? 20 : (u === "y" && r ? 4 : (u === "o" ? 3 : 2)))),
                        s = new RegExp("^\\d{1," + t + "}"),
                        q = P.substring(I).match(s);
                    if (!q) {
                        throw "Missing number at position " + I
                    }
                    I += q[0].length;
                    return parseInt(q[0], 10)
                }, R = function (t, q, u) {
                    var r = -1,
                        s = i.map(Q(t) ? u : q, function (v, w) {
                            return [[w, v]]
                        }).sort(function (v, w) {
                            return -(v[1].length - w[1].length)
                        });
                    i.each(s, function (w, x) {
                        var v = x[1];
                        if (P.substr(I, v.length).toLowerCase() === v.toLowerCase()) {
                            r = x[0];
                            I += v.length;
                            return false
                        }
                    });
                    if (r !== -1) {
                        return r + 1
                    } else {
                        throw "Unknown name at position " + I
                    }
                }, S = function () {
                    if (P.charAt(I) !== K.charAt(N)) {
                        throw "Unexpected literal at position " + I
                    }
                    I++
                };
            for (N = 0; N < K.length; N++) {
                if (J) {
                    if (K.charAt(N) === "'" && !Q("'")) {
                        J = false
                    } else {
                        S()
                    }
                } else {
                    switch (K.charAt(N)) {
                    case "d":
                        e = M("d");
                        break;
                    case "D":
                        R("D", c, b);
                        break;
                    case "o":
                        H = M("o");
                        break;
                    case "m":
                        f = M("m");
                        break;
                    case "M":
                        f = R("M", g, O);
                        break;
                    case "y":
                        T = M("y");
                        break;
                    case "@":
                        h = new Date(M("@"));
                        T = h.getFullYear();
                        f = h.getMonth() + 1;
                        e = h.getDate();
                        break;
                    case "!":
                        h = new Date((M("!") - this._ticksTo1970) / 10000);
                        T = h.getFullYear();
                        f = h.getMonth() + 1;
                        e = h.getDate();
                        break;
                    case "'":
                        if (Q("'")) {
                            S()
                        } else {
                            J = true
                        }
                        break;
                    default:
                        S()
                    }
                }
            }
            if (I < P.length) {
                L = P.substr(I);
                if (!/^\s+/.test(L)) {
                    throw "Extra/unparsed characters found in date: " + L
                }
            }
            if (T === -1) {
                T = new Date().getFullYear()
            } else {
                if (T < 100) {
                    T += new Date().getFullYear() - new Date().getFullYear() % 100 + (T <= G ? 0 : -100)
                }
            } if (H > -1) {
                f = 1;
                e = H;
                do {
                    a = this._getDaysInMonth(T, f - 1);
                    if (e <= a) {
                        break
                    }
                    f++;
                    e -= a
                } while (true)
            }
            h = this._daylightSavingAdjust(new Date(T, f - 1, e));
            if (h.getFullYear() !== T || h.getMonth() + 1 !== f || h.getDate() !== e) {
                throw "Invalid date"
            }
            return h
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (c, x, z) {
            if (!x) {
                return ""
            }
            var v, a = (z ? z.dayNamesShort : null) || this._defaults.dayNamesShort,
                b = (z ? z.dayNames : null) || this._defaults.dayNames,
                d = (z ? z.monthNamesShort : null) || this._defaults.monthNamesShort,
                g = (z ? z.monthNames : null) || this._defaults.monthNames,
                y = function (r) {
                    var q = (v + 1 < c.length && c.charAt(v + 1) === r);
                    if (q) {
                        v++
                    }
                    return q
                }, h = function (t, r, s) {
                    var q = "" + r;
                    if (y(t)) {
                        while (q.length < s) {
                            q = "0" + q
                        }
                    }
                    return q
                }, w = function (t, r, s, q) {
                    return (y(t) ? q[r] : s[r])
                }, f = "",
                e = false;
            if (x) {
                for (v = 0; v < c.length; v++) {
                    if (e) {
                        if (c.charAt(v) === "'" && !y("'")) {
                            e = false
                        } else {
                            f += c.charAt(v)
                        }
                    } else {
                        switch (c.charAt(v)) {
                        case "d":
                            f += h("d", x.getDate(), 2);
                            break;
                        case "D":
                            f += w("D", x.getDay(), a, b);
                            break;
                        case "o":
                            f += h("o", Math.round((new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime() - new Date(x.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            f += h("m", x.getMonth() + 1, 2);
                            break;
                        case "M":
                            f += w("M", x.getMonth(), d, g);
                            break;
                        case "y":
                            f += (y("y") ? x.getFullYear() : (x.getYear() % 100 < 10 ? "0" : "") + x.getYear() % 100);
                            break;
                        case "@":
                            f += x.getTime();
                            break;
                        case "!":
                            f += x.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (y("'")) {
                                f += "'"
                            } else {
                                e = true
                            }
                            break;
                        default:
                            f += c.charAt(v)
                        }
                    }
                }
            }
            return f
        },
        _possibleChars: function (a) {
            var d, e = "",
                c = false,
                b = function (f) {
                    var g = (d + 1 < a.length && a.charAt(d + 1) === f);
                    if (g) {
                        d++
                    }
                    return g
                };
            for (d = 0; d < a.length; d++) {
                if (c) {
                    if (a.charAt(d) === "'" && !b("'")) {
                        c = false
                    } else {
                        e += a.charAt(d)
                    }
                } else {
                    switch (a.charAt(d)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        e += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (b("'")) {
                            e += "'"
                        } else {
                            c = true
                        }
                        break;
                    default:
                        e += a.charAt(d)
                    }
                }
            }
            return e
        },
        _get: function (a, b) {
            return a.settings[b] !== n ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function (f, g) {
            if (f.input.val() === f.lastVal) {
                return
            }
            var b = this._get(f, "dateFormat"),
                h = f.lastVal = f.input ? f.input.val() : null,
                a = this._getDefaultDate(f),
                e = a,
                c = this._getFormatConfig(f);
            try {
                e = this.parseDate(b, h, c) || a
            } catch (d) {
                h = (g ? "" : h)
            }
            f.selectedDay = e.getDate();
            f.drawMonth = f.selectedMonth = e.getMonth();
            f.drawYear = f.selectedYear = e.getFullYear();
            f.currentDay = (h ? e.getDate() : 0);
            f.currentMonth = (h ? e.getMonth() : 0);
            f.currentYear = (h ? e.getFullYear() : 0);
            this._adjustInstDate(f)
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date()))
        },
        _determineDate: function (f, e, d) {
            var c = function (h) {
                var g = new Date();
                g.setDate(g.getDate() + h);
                return g
            }, a = function (B) {
                    try {
                        return i.datepicker.parseDate(i.datepicker._get(f, "dateFormat"), B, i.datepicker._getFormatConfig(f))
                    } catch (g) {}
                    var z = (B.toLowerCase().match(/^c/) ? i.datepicker._getDate(f) : null) || new Date(),
                        h = z.getFullYear(),
                        x = z.getMonth(),
                        y = z.getDate(),
                        w = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                        A = w.exec(B);
                    while (A) {
                        switch (A[2] || "d") {
                        case "d":
                        case "D":
                            y += parseInt(A[1], 10);
                            break;
                        case "w":
                        case "W":
                            y += parseInt(A[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            x += parseInt(A[1], 10);
                            y = Math.min(y, i.datepicker._getDaysInMonth(h, x));
                            break;
                        case "y":
                        case "Y":
                            h += parseInt(A[1], 10);
                            y = Math.min(y, i.datepicker._getDaysInMonth(h, x));
                            break
                        }
                        A = w.exec(B)
                    }
                    return new Date(h, x, y)
                }, b = (e == null || e === "" ? d : (typeof e === "string" ? a(e) : (typeof e === "number" ? (isNaN(e) ? d : c(e)) : new Date(e.getTime()))));
            b = (b && b.toString() === "Invalid Date" ? d : b);
            if (b) {
                b.setHours(0);
                b.setMinutes(0);
                b.setSeconds(0);
                b.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(b)
        },
        _daylightSavingAdjust: function (a) {
            if (!a) {
                return null
            }
            a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
            return a
        },
        _setDate: function (e, d, c) {
            var a = !d,
                b = e.selectedMonth,
                g = e.selectedYear,
                f = this._restrictMinMax(e, this._determineDate(e, d, new Date()));
            e.selectedDay = e.currentDay = f.getDate();
            e.drawMonth = e.selectedMonth = e.currentMonth = f.getMonth();
            e.drawYear = e.selectedYear = e.currentYear = f.getFullYear();
            if ((b !== e.selectedMonth || g !== e.selectedYear) && !c) {
                this._notifyChange(e)
            }
            this._adjustInstDate(e);
            if (e.input) {
                e.input.val(a ? "" : this._formatDate(e))
            }
        },
        _getDate: function (a) {
            var b = (!a.currentYear || (a.input && a.input.val() === "") ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay)));
            return b
        },
        _attachHandlers: function (a) {
            var c = this._get(a, "stepMonths"),
                b = "#" + a.id.replace(/\\\\/g, "\\");
            a.dpDiv.find("[data-handler]").map(function () {
                var d = {
                    prev: function () {
                        window["DP_jQuery_" + j].datepicker._adjustDate(b, -c, "M")
                    },
                    next: function () {
                        window["DP_jQuery_" + j].datepicker._adjustDate(b, +c, "M")
                    },
                    hide: function () {
                        window["DP_jQuery_" + j].datepicker._hideDatepicker()
                    },
                    today: function () {
                        window["DP_jQuery_" + j].datepicker._gotoToday(b)
                    },
                    selectDay: function () {
                        window["DP_jQuery_" + j].datepicker._selectDay(b, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function () {
                        window["DP_jQuery_" + j].datepicker._selectMonthYear(b, this, "M");
                        return false
                    },
                    selectYear: function () {
                        window["DP_jQuery_" + j].datepicker._selectMonthYear(b, this, "Y");
                        return false
                    }
                };
                i(this).bind(this.getAttribute("data-event"), d[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (au) {
            var a, aP, c, a1, aE, aT, av, aq, b, an, aU, ap, a0, ax, ae, aK, aR, aC, am, g, aQ, aw, az, e, aD, aN, ao, at, d, ay, h, aB, al, aW, aL, a2, aG, aA, aZ, aM = new Date(),
                aH = this._daylightSavingAdjust(new Date(aM.getFullYear(), aM.getMonth(), aM.getDate())),
                a4 = this._get(au, "isRTL"),
                aY = this._get(au, "showButtonPanel"),
                aF = this._get(au, "hideIfNoPrevNext"),
                a3 = this._get(au, "navigationAsDateFormat"),
                aV = this._getNumberOfMonths(au),
                aJ = this._get(au, "showCurrentAtPos"),
                aI = this._get(au, "stepMonths"),
                ad = (aV[0] !== 1 || aV[1] !== 1),
                aS = this._daylightSavingAdjust((!au.currentDay ? new Date(9999, 9, 9) : new Date(au.currentYear, au.currentMonth, au.currentDay))),
                aO = this._getMinMaxDate(au, "min"),
                ar = this._getMinMaxDate(au, "max"),
                f = au.drawMonth - aJ,
                aX = au.drawYear;
            if (f < 0) {
                f += 12;
                aX--
            }
            if (ar) {
                a = this._daylightSavingAdjust(new Date(ar.getFullYear(), ar.getMonth() - (aV[0] * aV[1]) + 1, ar.getDate()));
                a = (aO && a < aO ? aO : a);
                while (this._daylightSavingAdjust(new Date(aX, f, 1)) > a) {
                    f--;
                    if (f < 0) {
                        f = 11;
                        aX--
                    }
                }
            }
            au.drawMonth = f;
            au.drawYear = aX;
            aP = this._get(au, "prevText");
            aP = (!a3 ? aP : this.formatDate(aP, this._daylightSavingAdjust(new Date(aX, f - aI, 1)), this._getFormatConfig(au)));
            c = (this._canAdjustMonth(au, -1, aX, f) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + aP + "'><span class='ui-icon ui-icon-circle-triangle-" + (a4 ? "e" : "w") + "'>" + aP + "</span></a>" : (aF ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + aP + "'><span class='ui-icon ui-icon-circle-triangle-" + (a4 ? "e" : "w") + "'>" + aP + "</span></a>"));
            a1 = this._get(au, "nextText");
            a1 = (!a3 ? a1 : this.formatDate(a1, this._daylightSavingAdjust(new Date(aX, f + aI, 1)), this._getFormatConfig(au)));
            aE = (this._canAdjustMonth(au, +1, aX, f) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + a1 + "'><span class='ui-icon ui-icon-circle-triangle-" + (a4 ? "w" : "e") + "'>" + a1 + "</span></a>" : (aF ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + a1 + "'><span class='ui-icon ui-icon-circle-triangle-" + (a4 ? "w" : "e") + "'>" + a1 + "</span></a>"));
            aT = this._get(au, "currentText");
            av = (this._get(au, "gotoCurrent") && au.currentDay ? aS : aH);
            aT = (!a3 ? aT : this.formatDate(aT, av, this._getFormatConfig(au)));
            aq = (!au.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(au, "closeText") + "</button>" : "");
            b = (aY) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (a4 ? aq : "") + (this._isInRange(au, av) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + aT + "</button>" : "") + (a4 ? "" : aq) + "</div>" : "";
            an = parseInt(this._get(au, "firstDay"), 10);
            an = (isNaN(an) ? 0 : an);
            aU = this._get(au, "showWeek");
            ap = this._get(au, "dayNames");
            a0 = this._get(au, "dayNamesMin");
            ax = this._get(au, "monthNames");
            ae = this._get(au, "monthNamesShort");
            aK = this._get(au, "beforeShowDay");
            aR = this._get(au, "showOtherMonths");
            aC = this._get(au, "selectOtherMonths");
            am = this._getDefaultDate(au);
            g = "";
            aQ;
            for (aw = 0; aw < aV[0]; aw++) {
                az = "";
                this.maxRows = 4;
                for (e = 0; e < aV[1]; e++) {
                    aD = this._daylightSavingAdjust(new Date(aX, f, au.selectedDay));
                    aN = " ui-corner-all";
                    ao = "";
                    if (ad) {
                        ao += "<div class='ui-datepicker-group";
                        if (aV[1] > 1) {
                            switch (e) {
                            case 0:
                                ao += " ui-datepicker-group-first";
                                aN = " ui-corner-" + (a4 ? "right" : "left");
                                break;
                            case aV[1] - 1:
                                ao += " ui-datepicker-group-last";
                                aN = " ui-corner-" + (a4 ? "left" : "right");
                                break;
                            default:
                                ao += " ui-datepicker-group-middle";
                                aN = "";
                                break
                            }
                        }
                        ao += "'>"
                    }
                    ao += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + aN + "'>" + (/all|left/.test(aN) && aw === 0 ? (a4 ? aE : c) : "") + (/all|right/.test(aN) && aw === 0 ? (a4 ? c : aE) : "") + this._generateMonthYearHeader(au, f, aX, aO, ar, aw > 0 || e > 0, ax, ae) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
                    at = (aU ? "<th class='ui-datepicker-week-col'>" + this._get(au, "weekHeader") + "</th>" : "");
                    for (aQ = 0; aQ < 7; aQ++) {
                        d = (aQ + an) % 7;
                        at += "<th" + ((aQ + an + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ap[d] + "'>" + a0[d] + "</span></th>"
                    }
                    ao += at + "</tr></thead><tbody>";
                    ay = this._getDaysInMonth(aX, f);
                    if (aX === au.selectedYear && f === au.selectedMonth) {
                        au.selectedDay = Math.min(au.selectedDay, ay)
                    }
                    h = (this._getFirstDayOfMonth(aX, f) - an + 7) % 7;
                    aB = Math.ceil((h + ay) / 7);
                    al = (ad ? this.maxRows > aB ? this.maxRows : aB : aB);
                    this.maxRows = al;
                    aW = this._daylightSavingAdjust(new Date(aX, f, 1 - h));
                    for (aL = 0; aL < al; aL++) {
                        ao += "<tr>";
                        a2 = (!aU ? "" : "<td class='ui-datepicker-week-col'>" + this._get(au, "calculateWeek")(aW) + "</td>");
                        for (aQ = 0; aQ < 7; aQ++) {
                            aG = (aK ? aK.apply((au.input ? au.input[0] : null), [aW]) : [true, ""]);
                            aA = (aW.getMonth() !== f);
                            aZ = (aA && !aC) || !aG[0] || (aO && aW < aO) || (ar && aW > ar);
                            a2 += "<td class='" + ((aQ + an + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (aA ? " ui-datepicker-other-month" : "") + ((aW.getTime() === aD.getTime() && f === au.selectedMonth && au._keyEvent) || (am.getTime() === aW.getTime() && am.getTime() === aD.getTime()) ? " " + this._dayOverClass : "") + (aZ ? " " + this._unselectableClass + " ui-state-disabled" : "") + (aA && !aR ? "" : " " + aG[1] + (aW.getTime() === aS.getTime() ? " " + this._currentClass : "") + (aW.getTime() === aH.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!aA || aR) && aG[2] ? " title='" + aG[2].replace(/'/g, "'") + "'" : "") + (aZ ? "" : " data-handler='selectDay' data-event='click' data-month='" + aW.getMonth() + "' data-year='" + aW.getFullYear() + "'") + ">" + (aA && !aR ? " " : (aZ ? "<span class='ui-state-default'>" + aW.getDate() + "</span>" : "<a class='ui-state-default" + (aW.getTime() === aH.getTime() ? " ui-state-highlight" : "") + (aW.getTime() === aS.getTime() ? " ui-state-active" : "") + (aA ? " ui-priority-secondary" : "") + "' href='#'>" + aW.getDate() + "</a>")) + "</td>";
                            aW.setDate(aW.getDate() + 1);
                            aW = this._daylightSavingAdjust(aW)
                        }
                        ao += a2 + "</tr>"
                    }
                    f++;
                    if (f > 11) {
                        f = 0;
                        aX++
                    }
                    ao += "</tbody></table>" + (ad ? "</div>" + ((aV[0] > 0 && e === aV[1] - 1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                    az += ao
                }
                g += az
            }
            g += b;
            au._keyEvent = false;
            return g
        },
        _generateMonthYearHeader: function (E, e, K, d, I, g, J, G) {
            var b, M, f, O, D, P, c, F, L = this._get(E, "changeMonth"),
                N = this._get(E, "changeYear"),
                a = this._get(E, "showMonthAfterYear"),
                h = "<div class='ui-datepicker-title'>",
                H = "";
            if (g || !L) {
                H += "<span class='ui-datepicker-month'>" + J[e] + "</span>"
            } else {
                b = (d && d.getFullYear() === K);
                M = (I && I.getFullYear() === K);
                H += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (f = 0; f < 12; f++) {
                    if ((!b || f >= d.getMonth()) && (!M || f <= I.getMonth())) {
                        H += "<option value='" + f + "'" + (f === e ? " selected='selected'" : "") + ">" + G[f] + "</option>"
                    }
                }
                H += "</select>"
            } if (!a) {
                h += H + (g || !(L && N) ? " " : "")
            }
            if (!E.yearshtml) {
                E.yearshtml = "";
                if (g || !N) {
                    h += "<span class='ui-datepicker-year'>" + K + "</span>"
                } else {
                    O = this._get(E, "yearRange").split(":");
                    D = new Date().getFullYear();
                    P = function (q) {
                        var r = (q.match(/c[+\-].*/) ? K + parseInt(q.substring(1), 10) : (q.match(/[+\-].*/) ? D + parseInt(q, 10) : parseInt(q, 10)));
                        return (isNaN(r) ? D : r)
                    };
                    c = P(O[0]);
                    F = Math.max(c, P(O[1] || ""));
                    c = (d ? Math.max(c, d.getFullYear()) : c);
                    F = (I ? Math.min(F, I.getFullYear()) : F);
                    E.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; c <= F; c++) {
                        E.yearshtml += "<option value='" + c + "'" + (c === K ? " selected='selected'" : "") + ">" + c + "</option>"
                    }
                    E.yearshtml += "</select>";
                    h += E.yearshtml;
                    E.yearshtml = null
                }
            }
            h += this._get(E, "yearSuffix");
            if (a) {
                h += (g || !(L && N) ? " " : "") + H
            }
            h += "</div>";
            return h
        },
        _adjustInstDate: function (d, c, f) {
            var a = d.drawYear + (f === "Y" ? c : 0),
                b = d.drawMonth + (f === "M" ? c : 0),
                e = Math.min(d.selectedDay, this._getDaysInMonth(a, b)) + (f === "D" ? c : 0),
                g = this._restrictMinMax(d, this._daylightSavingAdjust(new Date(a, b, e)));
            d.selectedDay = g.getDate();
            d.drawMonth = d.selectedMonth = g.getMonth();
            d.drawYear = d.selectedYear = g.getFullYear();
            if (f === "M" || f === "Y") {
                this._notifyChange(d)
            }
        },
        _restrictMinMax: function (b, c) {
            var a = this._getMinMaxDate(b, "min"),
                d = this._getMinMaxDate(b, "max"),
                e = (a && c < a ? a : c);
            return (d && e > d ? d : e)
        },
        _notifyChange: function (a) {
            var b = this._get(a, "onChangeMonthYear");
            if (b) {
                b.apply((a.input ? a.input[0] : null), [a.selectedYear, a.selectedMonth + 1, a])
            }
        },
        _getNumberOfMonths: function (a) {
            var b = this._get(a, "numberOfMonths");
            return (b == null ? [1, 1] : (typeof b === "number" ? [1, b] : b))
        },
        _getMinMaxDate: function (a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function (a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },
        _getFirstDayOfMonth: function (a, b) {
            return new Date(a, b, 1).getDay()
        },
        _canAdjustMonth: function (d, a, e, c) {
            var b = this._getNumberOfMonths(d),
                f = this._daylightSavingAdjust(new Date(e, c + (a < 0 ? a : b[0] * b[1]), 1));
            if (a < 0) {
                f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth()))
            }
            return this._isInRange(d, f)
        },
        _isInRange: function (b, a) {
            var h, f, e = this._getMinMaxDate(b, "min"),
                d = this._getMinMaxDate(b, "max"),
                g = null,
                r = null,
                c = this._get(b, "yearRange");
            if (c) {
                h = c.split(":");
                f = new Date().getFullYear();
                g = parseInt(h[0], 10);
                r = parseInt(h[1], 10);
                if (h[0].match(/[+\-].*/)) {
                    g += f
                }
                if (h[1].match(/[+\-].*/)) {
                    r += f
                }
            }
            return ((!e || a.getTime() >= e.getTime()) && (!d || a.getTime() <= d.getTime()) && (!g || a.getFullYear() >= g) && (!r || a.getFullYear() <= r))
        },
        _getFormatConfig: function (a) {
            var b = this._get(a, "shortYearCutoff");
            b = (typeof b !== "string" ? b : new Date().getFullYear() % 100 + parseInt(b, 10));
            return {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function (b, a, e, c) {
            if (!a) {
                b.currentDay = b.selectedDay;
                b.currentMonth = b.selectedMonth;
                b.currentYear = b.selectedYear
            }
            var d = (a ? (typeof a === "object" ? a : this._daylightSavingAdjust(new Date(c, e, a))) : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay)));
            return this.formatDate(this._get(b, "dateFormat"), d, this._getFormatConfig(b))
        }
    });

    function m(a) {
        var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return a.delegate(b, "mouseout", function () {
            i(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                i(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                i(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(b, "mouseover", function () {
            if (!i.datepicker._isDisabledDatepicker(p.inline ? a.parent()[0] : p.input[0])) {
                i(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                i(this).addClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                    i(this).addClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") !== -1) {
                    i(this).addClass("ui-datepicker-next-hover")
                }
            }
        })
    }

    function o(c, b) {
        i.extend(c, b);
        for (var a in b) {
            if (b[a] == null) {
                c[a] = b[a]
            }
        }
        return c
    }
    i.fn.datepicker = function (a) {
        if (!this.length) {
            return this
        }
        if (!i.datepicker.initialized) {
            i(document).mousedown(i.datepicker._checkExternalClick);
            i.datepicker.initialized = true
        }
        if (i("#" + i.datepicker._mainDivId).length === 0) {
            i("body").append(i.datepicker.dpDiv)
        }
        var b = Array.prototype.slice.call(arguments, 1);
        if (typeof a === "string" && (a === "isDisabled" || a === "getDate" || a === "widget")) {
            return i.datepicker["_" + a + "Datepicker"].apply(i.datepicker, [this[0]].concat(b))
        }
        if (a === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return i.datepicker["_" + a + "Datepicker"].apply(i.datepicker, [this[0]].concat(b))
        }
        return this.each(function () {
            typeof a === "string" ? i.datepicker["_" + a + "Datepicker"].apply(i.datepicker, [this].concat(b)) : i.datepicker._attachDatepicker(this, a)
        })
    };
    i.datepicker = new k();
    i.datepicker.initialized = false;
    i.datepicker.uuid = new Date().getTime();
    i.datepicker.version = "1.10.2";
    window["DP_jQuery_" + j] = i
})(jQuery);
(function (h, f) {
    var g = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    }, e = {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        };
    h.widget("ui.dialog", {
        version: "1.10.2",
        options: {
            appendTo: "body",
            autoOpen: true,
            buttons: [],
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (a) {
                    var b = h(this).css(a).offset().top;
                    if (b < 0) {
                        h(this).css("top", a.top - b)
                    }
                }
            },
            resizable: true,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            if (this.options.draggable && h.fn.draggable) {
                this._makeDraggable()
            }
            if (this.options.resizable && h.fn.resizable) {
                this._makeResizable()
            }
            this._isOpen = false
        },
        _init: function () {
            if (this.options.autoOpen) {
                this.open()
            }
        },
        _appendTo: function () {
            var a = this.options.appendTo;
            if (a && (a.jquery || a.nodeType)) {
                return h(a)
            }
            return this.document.find(a || "body").eq(0)
        },
        _destroy: function () {
            var a, b = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(true, true).remove();
            if (this.originalTitle) {
                this.element.attr("title", this.originalTitle)
            }
            a = b.parent.children().eq(b.index);
            if (a.length && a[0] !== this.element[0]) {
                a.before(this.element)
            } else {
                b.parent.append(this.element)
            }
        },
        widget: function () {
            return this.uiDialog
        },
        disable: h.noop,
        enable: h.noop,
        close: function (a) {
            var b = this;
            if (!this._isOpen || this._trigger("beforeClose", a) === false) {
                return
            }
            this._isOpen = false;
            this._destroyOverlay();
            if (!this.opener.filter(":focusable").focus().length) {
                h(this.document[0].activeElement).blur()
            }
            this._hide(this.uiDialog, this.options.hide, function () {
                b._trigger("close", a)
            })
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (a, b) {
            var c = !! this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            if (c && !b) {
                this._trigger("focus", a)
            }
            return c
        },
        open: function () {
            var a = this;
            if (this._isOpen) {
                if (this._moveToTop()) {
                    this._focusTabbable()
                }
                return
            }
            this._isOpen = true;
            this.opener = h(this.document[0].activeElement);
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, true);
            this._show(this.uiDialog, this.options.show, function () {
                a._focusTabbable();
                a._trigger("focus")
            });
            this._trigger("open")
        },
        _focusTabbable: function () {
            var a = this.element.find("[autofocus]");
            if (!a.length) {
                a = this.element.find(":tabbable")
            }
            if (!a.length) {
                a = this.uiDialogButtonPane.find(":tabbable")
            }
            if (!a.length) {
                a = this.uiDialogTitlebarClose.filter(":tabbable")
            }
            if (!a.length) {
                a = this.uiDialog
            }
            a.eq(0).focus()
        },
        _keepFocus: function (a) {
            function b() {
                var d = this.document[0].activeElement,
                    c = this.uiDialog[0] === d || h.contains(this.uiDialog[0], d);
                if (!c) {
                    this._focusTabbable()
                }
            }
            a.preventDefault();
            b.call(this);
            this._delay(b)
        },
        _createWrapper: function () {
            this.uiDialog = h("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function (c) {
                    if (this.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === h.ui.keyCode.ESCAPE) {
                        c.preventDefault();
                        this.close(c);
                        return
                    }
                    if (c.keyCode !== h.ui.keyCode.TAB) {
                        return
                    }
                    var d = this.uiDialog.find(":tabbable"),
                        a = d.filter(":first"),
                        b = d.filter(":last");
                    if ((c.target === b[0] || c.target === this.uiDialog[0]) && !c.shiftKey) {
                        a.focus(1);
                        c.preventDefault()
                    } else {
                        if ((c.target === a[0] || c.target === this.uiDialog[0]) && c.shiftKey) {
                            b.focus(1);
                            c.preventDefault()
                        }
                    }
                },
                mousedown: function (a) {
                    if (this._moveToTop(a)) {
                        this._focusTabbable()
                    }
                }
            });
            if (!this.element.find("[aria-describedby]").length) {
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            }
        },
        _createTitlebar: function () {
            var a;
            this.uiDialogTitlebar = h("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function (b) {
                    if (!h(b.target).closest(".ui-dialog-titlebar-close")) {
                        this.uiDialog.focus()
                    }
                }
            });
            this.uiDialogTitlebarClose = h("<button></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: false
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function (b) {
                    b.preventDefault();
                    this.close(b)
                }
            });
            a = h("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(a);
            this.uiDialog.attr({
                "aria-labelledby": a.attr("id")
            })
        },
        _title: function (a) {
            if (!this.options.title) {
                a.html(" ")
            }
            a.text(this.options.title)
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = h("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = h("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function () {
            var a = this,
                b = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            if (h.isEmptyObject(b) || (h.isArray(b) && !b.length)) {
                this.uiDialog.removeClass("ui-dialog-buttons");
                return
            }
            h.each(b, function (d, c) {
                var k, l;
                c = h.isFunction(c) ? {
                    click: c,
                    text: d
                } : c;
                c = h.extend({
                    type: "button"
                }, c);
                k = c.click;
                c.click = function () {
                    k.apply(a.element[0], arguments)
                };
                l = {
                    icons: c.icons,
                    text: c.showText
                };
                delete c.icons;
                delete c.showText;
                h("<button></button>", c).button(l).appendTo(a.uiButtonSet)
            });
            this.uiDialog.addClass("ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function () {
            var a = this,
                c = this.options;

            function b(d) {
                return {
                    position: d.position,
                    offset: d.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (d, j) {
                    h(this).addClass("ui-dialog-dragging");
                    a._blockFrames();
                    a._trigger("dragStart", d, b(j))
                },
                drag: function (d, j) {
                    a._trigger("drag", d, b(j))
                },
                stop: function (d, j) {
                    c.position = [j.position.left - a.document.scrollLeft(), j.position.top - a.document.scrollTop()];
                    h(this).removeClass("ui-dialog-dragging");
                    a._unblockFrames();
                    a._trigger("dragStop", d, b(j))
                }
            })
        },
        _makeResizable: function () {
            var l = this,
                b = this.options,
                d = b.resizable,
                k = this.uiDialog.css("position"),
                c = typeof d === "string" ? d : "n,e,s,w,se,sw,ne,nw";

            function a(i) {
                return {
                    originalPosition: i.originalPosition,
                    originalSize: i.originalSize,
                    position: i.position,
                    size: i.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: b.maxWidth,
                maxHeight: b.maxHeight,
                minWidth: b.minWidth,
                minHeight: this._minHeight(),
                handles: c,
                start: function (i, j) {
                    h(this).addClass("ui-dialog-resizing");
                    l._blockFrames();
                    l._trigger("resizeStart", i, a(j))
                },
                resize: function (i, j) {
                    l._trigger("resize", i, a(j))
                },
                stop: function (i, j) {
                    b.height = h(this).height();
                    b.width = h(this).width();
                    h(this).removeClass("ui-dialog-resizing");
                    l._unblockFrames();
                    l._trigger("resizeStop", i, a(j))
                }
            }).css("position", k)
        },
        _minHeight: function () {
            var a = this.options;
            return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
        },
        _position: function () {
            var a = this.uiDialog.is(":visible");
            if (!a) {
                this.uiDialog.show()
            }
            this.uiDialog.position(this.options.position);
            if (!a) {
                this.uiDialog.hide()
            }
        },
        _setOptions: function (b) {
            var c = this,
                a = false,
                d = {};
            h.each(b, function (k, l) {
                c._setOption(k, l);
                if (k in g) {
                    a = true
                }
                if (k in e) {
                    d[k] = l
                }
            });
            if (a) {
                this._size();
                this._position()
            }
            if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", d)
            }
        },
        _setOption: function (b, c) {
            var a, d, j = this.uiDialog;
            if (b === "dialogClass") {
                j.removeClass(this.options.dialogClass).addClass(c)
            }
            if (b === "disabled") {
                return
            }
            this._super(b, c);
            if (b === "appendTo") {
                this.uiDialog.appendTo(this._appendTo())
            }
            if (b === "buttons") {
                this._createButtons()
            }
            if (b === "closeText") {
                this.uiDialogTitlebarClose.button({
                    label: "" + c
                })
            }
            if (b === "draggable") {
                a = j.is(":data(ui-draggable)");
                if (a && !c) {
                    j.draggable("destroy")
                }
                if (!a && c) {
                    this._makeDraggable()
                }
            }
            if (b === "position") {
                this._position()
            }
            if (b === "resizable") {
                d = j.is(":data(ui-resizable)");
                if (d && !c) {
                    j.resizable("destroy")
                }
                if (d && typeof c === "string") {
                    j.resizable("option", "handles", c)
                }
                if (!d && c !== false) {
                    this._makeResizable()
                }
            }
            if (b === "title") {
                this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
            }
        },
        _size: function () {
            var c, a, d, b = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            if (b.minWidth > b.width) {
                b.width = b.minWidth
            }
            c = this.uiDialog.css({
                height: "auto",
                width: b.width
            }).outerHeight();
            a = Math.max(0, b.minHeight - c);
            d = typeof b.maxHeight === "number" ? Math.max(0, b.maxHeight - c) : "none";
            if (b.height === "auto") {
                this.element.css({
                    minHeight: a,
                    maxHeight: d,
                    height: "auto"
                })
            } else {
                this.element.height(Math.max(0, b.height - c))
            } if (this.uiDialog.is(":data(ui-resizable)")) {
                this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var a = h(this);
                return h("<div>").css({
                    position: "absolute",
                    width: a.outerWidth(),
                    height: a.outerHeight()
                }).appendTo(a.parent()).offset(a.offset())[0]
            })
        },
        _unblockFrames: function () {
            if (this.iframeBlocks) {
                this.iframeBlocks.remove();
                delete this.iframeBlocks
            }
        },
        _allowInteraction: function (a) {
            if (h(a.target).closest(".ui-dialog").length) {
                return true
            }
            return !!h(a.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (!this.options.modal) {
                return
            }
            var a = this,
                b = this.widgetFullName;
            if (!h.ui.dialog.overlayInstances) {
                this._delay(function () {
                    if (h.ui.dialog.overlayInstances) {
                        this.document.bind("focusin.dialog", function (c) {
                            if (!a._allowInteraction(c)) {
                                c.preventDefault();
                                h(".ui-dialog:visible:last .ui-dialog-content").data(b)._focusTabbable()
                            }
                        })
                    }
                })
            }
            this.overlay = h("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            });
            h.ui.dialog.overlayInstances++
        },
        _destroyOverlay: function () {
            if (!this.options.modal) {
                return
            }
            if (this.overlay) {
                h.ui.dialog.overlayInstances--;
                if (!h.ui.dialog.overlayInstances) {
                    this.document.unbind("focusin.dialog")
                }
                this.overlay.remove();
                this.overlay = null
            }
        }
    });
    h.ui.dialog.overlayInstances = 0;
    if (h.uiBackCompat !== false) {
        h.widget("ui.dialog", h.ui.dialog, {
            _position: function () {
                var d = this.options.position,
                    c = [],
                    a = [0, 0],
                    b;
                if (d) {
                    if (typeof d === "string" || (typeof d === "object" && "0" in d)) {
                        c = d.split ? d.split(" ") : [d[0], d[1]];
                        if (c.length === 1) {
                            c[1] = c[0]
                        }
                        h.each(["left", "top"], function (i, l) {
                            if (+c[i] === c[i]) {
                                a[i] = c[i];
                                c[i] = l
                            }
                        });
                        d = {
                            my: c[0] + (a[0] < 0 ? a[0] : "+" + a[0]) + " " + c[1] + (a[1] < 0 ? a[1] : "+" + a[1]),
                            at: c.join(" ")
                        }
                    }
                    d = h.extend({}, h.ui.dialog.prototype.options.position, d)
                } else {
                    d = h.ui.dialog.prototype.options.position
                }
                b = this.uiDialog.is(":visible");
                if (!b) {
                    this.uiDialog.show()
                }
                this.uiDialog.position(d);
                if (!b) {
                    this.uiDialog.hide()
                }
            }
        })
    }
}(jQuery));
(function (f, g) {
    var h = /up|down|vertical/,
        e = /up|left|vertical|horizontal/;
    f.effects.effect.blind = function (o, b) {
        var D = f(this),
            C = ["position", "top", "bottom", "left", "right", "height", "width"],
            y = f.effects.setMode(D, o.mode || "hide"),
            x = o.direction || "up",
            A = h.test(x),
            d = A ? "height" : "width",
            z = A ? "top" : "left",
            B = e.test(x),
            w = {}, u = y === "show",
            a, c, v;
        if (D.parent().is(".ui-effects-wrapper")) {
            f.effects.save(D.parent(), C)
        } else {
            f.effects.save(D, C)
        }
        D.show();
        a = f.effects.createWrapper(D).css({
            overflow: "hidden"
        });
        c = a[d]();
        v = parseFloat(a.css(z)) || 0;
        w[d] = u ? c : 0;
        if (!B) {
            D.css(A ? "bottom" : "right", 0).css(A ? "top" : "left", "auto").css({
                position: "absolute"
            });
            w[z] = u ? v : c + v
        }
        if (u) {
            a.css(d, 0);
            if (!B) {
                a.css(z, v + c)
            }
        }
        a.animate(w, {
            duration: o.duration,
            easing: o.easing,
            queue: false,
            complete: function () {
                if (y === "hide") {
                    D.hide()
                }
                f.effects.restore(D, C);
                f.effects.removeWrapper(D);
                b()
            }
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.bounce = function (F, b) {
        var C = d(this),
            L = ["position", "top", "bottom", "left", "right", "height", "width"],
            N = d.effects.setMode(C, F.mode || "effect"),
            B = N === "hide",
            G = N === "show",
            M = F.direction || "up",
            o = F.distance,
            E = F.times || 5,
            i = E * 2 + (G || B ? 1 : 0),
            J = F.duration / i,
            z = F.easing,
            y = (M === "up" || M === "down") ? "top" : "left",
            A = (M === "up" || M === "left"),
            H, K, I, a = C.queue(),
            D = a.length;
        if (G || B) {
            L.push("opacity")
        }
        d.effects.save(C, L);
        C.show();
        d.effects.createWrapper(C);
        if (!o) {
            o = C[y === "top" ? "outerHeight" : "outerWidth"]() / 3
        }
        if (G) {
            I = {
                opacity: 1
            };
            I[y] = 0;
            C.css("opacity", 0).css(y, A ? -o * 2 : o * 2).animate(I, J, z)
        }
        if (B) {
            o = o / Math.pow(2, E - 1)
        }
        I = {};
        I[y] = 0;
        for (H = 0; H < E; H++) {
            K = {};
            K[y] = (A ? "-=" : "+=") + o;
            C.animate(K, J, z).animate(I, J, z);
            o = B ? o * 2 : o / 2
        }
        if (B) {
            K = {
                opacity: 0
            };
            K[y] = (A ? "-=" : "+=") + o;
            C.animate(K, J, z)
        }
        C.queue(function () {
            if (B) {
                C.hide()
            }
            d.effects.restore(C, L);
            d.effects.removeWrapper(C);
            b()
        });
        if (D > 1) {
            a.splice.apply(a, [1, 0].concat(a.splice(D, i + 1)))
        }
        C.dequeue()
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.clip = function (t, s) {
        var w = d(this),
            v = ["position", "top", "bottom", "left", "right", "height", "width"],
            y = d.effects.setMode(w, t.mode || "hide"),
            B = y === "show",
            x = t.direction || "vertical",
            o = x === "vertical",
            A = o ? "height" : "width",
            b = o ? "top" : "left",
            u = {}, r, z, a;
        d.effects.save(w, v);
        w.show();
        r = d.effects.createWrapper(w).css({
            overflow: "hidden"
        });
        z = (w[0].tagName === "IMG") ? r : w;
        a = z[A]();
        if (B) {
            z.css(A, 0);
            z.css(b, a / 2)
        }
        u[A] = B ? a : 0;
        u[b] = B ? 0 : a / 2;
        z.animate(u, {
            queue: false,
            duration: t.duration,
            easing: t.easing,
            complete: function () {
                if (!B) {
                    w.hide()
                }
                d.effects.restore(w, v);
                d.effects.removeWrapper(w);
                s()
            }
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.drop = function (r, b) {
        var p = d(this),
            s = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            t = d.effects.setMode(p, r.mode || "hide"),
            a = t === "show",
            n = r.direction || "left",
            u = (n === "up" || n === "down") ? "top" : "left",
            o = (n === "up" || n === "left") ? "pos" : "neg",
            q = {
                opacity: a ? 1 : 0
            }, v;
        d.effects.save(p, s);
        p.show();
        d.effects.createWrapper(p);
        v = r.distance || p[u === "top" ? "outerHeight" : "outerWidth"](true) / 2;
        if (a) {
            p.css("opacity", 0).css(u, o === "pos" ? -v : v)
        }
        q[u] = (a ? (o === "pos" ? "+=" : "-=") : (o === "pos" ? "-=" : "+=")) + v;
        p.animate(q, {
            queue: false,
            duration: r.duration,
            easing: r.easing,
            complete: function () {
                if (t === "hide") {
                    p.hide()
                }
                d.effects.restore(p, s);
                d.effects.removeWrapper(p);
                b()
            }
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.explode = function (y, i) {
        var K = y.pieces ? Math.round(Math.sqrt(y.pieces)) : 3,
            L = K,
            A = d(this),
            C = d.effects.setMode(A, y.mode || "hide"),
            D = C === "show",
            J = A.show().css("visibility", "hidden").offset(),
            j = Math.ceil(A.outerWidth() / L),
            B = Math.ceil(A.outerHeight() / K),
            z = [],
            E, G, I, a, H, o;

        function b() {
            z.push(this);
            if (z.length === K * L) {
                F()
            }
        }
        for (E = 0; E < K; E++) {
            a = J.top + E * B;
            o = E - (K - 1) / 2;
            for (G = 0; G < L; G++) {
                I = J.left + G * j;
                H = G - (L - 1) / 2;
                A.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -G * j,
                    top: -E * B
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: j,
                    height: B,
                    left: I + (D ? H * j : 0),
                    top: a + (D ? o * B : 0),
                    opacity: D ? 0 : 1
                }).animate({
                    left: I + (D ? 0 : H * j),
                    top: a + (D ? 0 : o * B),
                    opacity: D ? 1 : 0
                }, y.duration || 500, y.easing, b)
            }
        }

        function F() {
            A.css({
                visibility: "visible"
            });
            d(z).remove();
            if (!D) {
                A.hide()
            }
            i()
        }
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.fade = function (h, g) {
        var b = d(this),
            a = d.effects.setMode(b, h.mode || "toggle");
        b.animate({
            opacity: a
        }, {
            queue: false,
            duration: h.duration,
            easing: h.easing,
            complete: g
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.fold = function (A, D) {
        var F = d(this),
            H = ["position", "top", "bottom", "left", "right", "height", "width"],
            G = d.effects.setMode(F, A.mode || "hide"),
            w = G === "show",
            z = G === "hide",
            y = A.size || 15,
            v = /([0-9]+)%/.exec(y),
            C = !! A.horizFirst,
            b = w !== C,
            x = b ? ["width", "height"] : ["height", "width"],
            B = A.duration / 2,
            o, a, u = {}, E = {};
        d.effects.save(F, H);
        F.show();
        o = d.effects.createWrapper(F).css({
            overflow: "hidden"
        });
        a = b ? [o.width(), o.height()] : [o.height(), o.width()];
        if (v) {
            y = parseInt(v[1], 10) / 100 * a[z ? 0 : 1]
        }
        if (w) {
            o.css(C ? {
                height: 0,
                width: y
            } : {
                height: y,
                width: 0
            })
        }
        u[x[0]] = w ? a[0] : y;
        E[x[1]] = w ? a[1] : 0;
        o.animate(u, B, A.easing).animate(E, B, A.easing, function () {
            if (z) {
                F.hide()
            }
            d.effects.restore(F, H);
            d.effects.removeWrapper(F);
            D()
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.highlight = function (l, j) {
        var a = d(this),
            k = ["backgroundImage", "backgroundColor", "opacity"],
            b = d.effects.setMode(a, l.mode || "show"),
            i = {
                backgroundColor: a.css("backgroundColor")
            };
        if (b === "hide") {
            i.opacity = 0
        }
        d.effects.save(a, k);
        a.show().css({
            backgroundImage: "none",
            backgroundColor: l.color || "#ffff99"
        }).animate(i, {
            queue: false,
            duration: l.duration,
            easing: l.easing,
            complete: function () {
                if (b === "hide") {
                    a.hide()
                }
                d.effects.restore(a, k);
                j()
            }
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.pulsate = function (t, b) {
        var a = d(this),
            v = d.effects.setMode(a, t.mode || "show"),
            x = v === "show",
            z = v === "hide",
            i = (x || v === "hide"),
            w = ((t.times || 5) * 2) + (i ? 1 : 0),
            u = t.duration / w,
            r = 0,
            o = a.queue(),
            y = o.length,
            s;
        if (x || !a.is(":visible")) {
            a.css("opacity", 0).show();
            r = 1
        }
        for (s = 1; s < w; s++) {
            a.animate({
                opacity: r
            }, u, t.easing);
            r = 1 - r
        }
        a.animate({
            opacity: r
        }, u, t.easing);
        a.queue(function () {
            if (z) {
                a.hide()
            }
            b()
        });
        if (y > 1) {
            o.splice.apply(o, [1, 0].concat(o.splice(y, w + 1)))
        }
        a.dequeue()
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.puff = function (p, b) {
        var m = d(this),
            k = d.effects.setMode(m, p.mode || "hide"),
            o = k === "hide",
            a = parseInt(p.percent, 10) || 150,
            n = a / 100,
            l = {
                height: m.height(),
                width: m.width(),
                outerHeight: m.outerHeight(),
                outerWidth: m.outerWidth()
            };
        d.extend(p, {
            effect: "scale",
            queue: false,
            fade: true,
            mode: k,
            complete: b,
            percent: o ? a : 100,
            from: o ? l : {
                height: l.height * n,
                width: l.width * n,
                outerHeight: l.outerHeight * n,
                outerWidth: l.outerWidth * n
            }
        });
        m.effect(p)
    };
    d.effects.effect.scale = function (q, m) {
        var b = d(this),
            s = d.extend(true, {}, q),
            p = d.effects.setMode(b, q.mode || "effect"),
            n = parseInt(q.percent, 10) || (parseInt(q.percent, 10) === 0 ? 0 : (p === "hide" ? 0 : 100)),
            r = q.direction || "both",
            a = q.origin,
            o = {
                height: b.height(),
                width: b.width(),
                outerHeight: b.outerHeight(),
                outerWidth: b.outerWidth()
            }, t = {
                y: r !== "horizontal" ? (n / 100) : 1,
                x: r !== "vertical" ? (n / 100) : 1
            };
        s.effect = "size";
        s.queue = false;
        s.complete = m;
        if (p !== "effect") {
            s.origin = a || ["middle", "center"];
            s.restore = true
        }
        s.from = q.from || (p === "show" ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : o);
        s.to = {
            height: o.height * t.y,
            width: o.width * t.x,
            outerHeight: o.outerHeight * t.y,
            outerWidth: o.outerWidth * t.x
        };
        if (s.fade) {
            if (p === "show") {
                s.from.opacity = 0;
                s.to.opacity = 1
            }
            if (p === "hide") {
                s.from.opacity = 1;
                s.to.opacity = 0
            }
        }
        b.effect(s)
    };
    d.effects.effect.size = function (E, H) {
        var x, b, z, B = d(this),
            F = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            G = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            a = ["width", "height", "overflow"],
            w = ["fontSize"],
            o = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            C = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            J = d.effects.setMode(B, E.mode || "effect"),
            D = E.restore || J !== "effect",
            y = E.scale || "both",
            L = E.origin || ["middle", "center"],
            I = B.css("position"),
            A = D ? F : G,
            K = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        if (J === "show") {
            B.show()
        }
        x = {
            height: B.height(),
            width: B.width(),
            outerHeight: B.outerHeight(),
            outerWidth: B.outerWidth()
        };
        if (E.mode === "toggle" && J === "show") {
            B.from = E.to || K;
            B.to = E.from || x
        } else {
            B.from = E.from || (J === "show" ? K : x);
            B.to = E.to || (J === "hide" ? K : x)
        }
        z = {
            from: {
                y: B.from.height / x.height,
                x: B.from.width / x.width
            },
            to: {
                y: B.to.height / x.height,
                x: B.to.width / x.width
            }
        };
        if (y === "box" || y === "both") {
            if (z.from.y !== z.to.y) {
                A = A.concat(o);
                B.from = d.effects.setTransition(B, o, z.from.y, B.from);
                B.to = d.effects.setTransition(B, o, z.to.y, B.to)
            }
            if (z.from.x !== z.to.x) {
                A = A.concat(C);
                B.from = d.effects.setTransition(B, C, z.from.x, B.from);
                B.to = d.effects.setTransition(B, C, z.to.x, B.to)
            }
        }
        if (y === "content" || y === "both") {
            if (z.from.y !== z.to.y) {
                A = A.concat(w).concat(a);
                B.from = d.effects.setTransition(B, w, z.from.y, B.from);
                B.to = d.effects.setTransition(B, w, z.to.y, B.to)
            }
        }
        d.effects.save(B, A);
        B.show();
        d.effects.createWrapper(B);
        B.css("overflow", "hidden").css(B.from);
        if (L) {
            b = d.effects.getBaseline(L, x);
            B.from.top = (x.outerHeight - B.outerHeight()) * b.y;
            B.from.left = (x.outerWidth - B.outerWidth()) * b.x;
            B.to.top = (x.outerHeight - B.to.outerHeight) * b.y;
            B.to.left = (x.outerWidth - B.to.outerWidth) * b.x
        }
        B.css(B.from);
        if (y === "content" || y === "both") {
            o = o.concat(["marginTop", "marginBottom"]).concat(w);
            C = C.concat(["marginLeft", "marginRight"]);
            a = F.concat(o).concat(C);
            B.find("*[width]").each(function () {
                var e = d(this),
                    f = {
                        height: e.height(),
                        width: e.width(),
                        outerHeight: e.outerHeight(),
                        outerWidth: e.outerWidth()
                    };
                if (D) {
                    d.effects.save(e, a)
                }
                e.from = {
                    height: f.height * z.from.y,
                    width: f.width * z.from.x,
                    outerHeight: f.outerHeight * z.from.y,
                    outerWidth: f.outerWidth * z.from.x
                };
                e.to = {
                    height: f.height * z.to.y,
                    width: f.width * z.to.x,
                    outerHeight: f.height * z.to.y,
                    outerWidth: f.width * z.to.x
                };
                if (z.from.y !== z.to.y) {
                    e.from = d.effects.setTransition(e, o, z.from.y, e.from);
                    e.to = d.effects.setTransition(e, o, z.to.y, e.to)
                }
                if (z.from.x !== z.to.x) {
                    e.from = d.effects.setTransition(e, C, z.from.x, e.from);
                    e.to = d.effects.setTransition(e, C, z.to.x, e.to)
                }
                e.css(e.from);
                e.animate(e.to, E.duration, E.easing, function () {
                    if (D) {
                        d.effects.restore(e, a)
                    }
                })
            })
        }
        B.animate(B.to, {
            queue: false,
            duration: E.duration,
            easing: E.easing,
            complete: function () {
                if (B.to.opacity === 0) {
                    B.css("opacity", B.from.opacity)
                }
                if (J === "hide") {
                    B.hide()
                }
                d.effects.restore(B, A);
                if (!D) {
                    if (I === "static") {
                        B.css({
                            position: "relative",
                            top: B.to.top,
                            left: B.to.left
                        })
                    } else {
                        d.each(["top", "left"], function (e, f) {
                            B.css(f, function (j, g) {
                                var h = parseInt(g, 10),
                                    i = e ? B.to.left : B.to.top;
                                if (g === "auto") {
                                    return i + "px"
                                }
                                return h + i + "px"
                            })
                        })
                    }
                }
                d.effects.removeWrapper(B);
                H()
            }
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.shake = function (D, E) {
        var A = d(this),
            z = ["position", "top", "bottom", "left", "right", "height", "width"],
            H = d.effects.setMode(A, D.mode || "effect"),
            J = D.direction || "left",
            i = D.distance || 20,
            a = D.times || 3,
            F = a * 2 + 1,
            I = Math.round(D.duration / F),
            C = (J === "up" || J === "down") ? "top" : "left",
            o = (J === "up" || J === "left"),
            B = {}, b = {}, G = {}, y, w = A.queue(),
            x = w.length;
        d.effects.save(A, z);
        A.show();
        d.effects.createWrapper(A);
        B[C] = (o ? "-=" : "+=") + i;
        b[C] = (o ? "+=" : "-=") + i * 2;
        G[C] = (o ? "-=" : "+=") + i * 2;
        A.animate(B, I, D.easing);
        for (y = 1; y < a; y++) {
            A.animate(b, I, D.easing).animate(G, I, D.easing)
        }
        A.animate(b, I, D.easing).animate(B, I / 2, D.easing).queue(function () {
            if (H === "hide") {
                A.hide()
            }
            d.effects.restore(A, z);
            d.effects.removeWrapper(A);
            E()
        });
        if (x > 1) {
            w.splice.apply(w, [1, 0].concat(w.splice(x, F + 1)))
        }
        A.dequeue()
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.slide = function (r, b) {
        var o = d(this),
            s = ["position", "top", "bottom", "left", "right", "width", "height"],
            t = d.effects.setMode(o, r.mode || "show"),
            a = t === "show",
            n = r.direction || "left",
            u = (n === "up" || n === "down") ? "top" : "left",
            p = (n === "up" || n === "left"),
            v, q = {};
        d.effects.save(o, s);
        o.show();
        v = r.distance || o[u === "top" ? "outerHeight" : "outerWidth"](true);
        d.effects.createWrapper(o).css({
            overflow: "hidden"
        });
        if (a) {
            o.css(u, p ? (isNaN(v) ? "-" + v : -v) : v)
        }
        q[u] = (a ? (p ? "+=" : "-=") : (p ? "-=" : "+=")) + v;
        o.animate(q, {
            queue: false,
            duration: r.duration,
            easing: r.easing,
            complete: function () {
                if (t === "hide") {
                    o.hide()
                }
                d.effects.restore(o, s);
                d.effects.removeWrapper(o);
                b()
            }
        })
    }
})(jQuery);
(function (d, c) {
    d.effects.effect.transfer = function (w, u) {
        var q = d(this),
            v = d(w.to),
            o = v.css("position") === "fixed",
            s = d("body"),
            p = o ? s.scrollTop() : 0,
            b = o ? s.scrollLeft() : 0,
            t = v.offset(),
            r = {
                top: t.top - p,
                left: t.left - b,
                height: v.innerHeight(),
                width: v.innerWidth()
            }, a = q.offset(),
            x = d("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(w.className).css({
                top: a.top - p,
                left: a.left - b,
                height: q.innerHeight(),
                width: q.innerWidth(),
                position: o ? "fixed" : "absolute"
            }).animate(r, w.duration, w.easing, function () {
                x.remove();
                u()
            })
    }
})(jQuery);
(function (d, c) {
    d.widget("ui.menu", {
        version: "1.10.2",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element;
            this.mouseHandled = false;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, d.proxy(function (a) {
                if (this.options.disabled) {
                    a.preventDefault()
                }
            }, this));
            if (this.options.disabled) {
                this.element.addClass("ui-state-disabled").attr("aria-disabled", "true")
            }
            this._on({
                "mousedown .ui-menu-item > a": function (a) {
                    a.preventDefault()
                },
                "click .ui-state-disabled > a": function (a) {
                    a.preventDefault()
                },
                "click .ui-menu-item:has(a)": function (b) {
                    var a = d(b.target).closest(".ui-menu-item");
                    if (!this.mouseHandled && a.not(".ui-state-disabled").length) {
                        this.mouseHandled = true;
                        this.select(b);
                        if (a.has(".ui-menu").length) {
                            this.expand(b)
                        } else {
                            if (!this.element.is(":focus")) {
                                this.element.trigger("focus", [true]);
                                if (this.active && this.active.parents(".ui-menu").length === 1) {
                                    clearTimeout(this.timer)
                                }
                            }
                        }
                    }
                },
                "mouseenter .ui-menu-item": function (b) {
                    var a = d(b.currentTarget);
                    a.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(b, a)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (a, b) {
                    var f = this.active || this.element.children(".ui-menu-item").eq(0);
                    if (!b) {
                        this.focus(a, f)
                    }
                },
                blur: function (a) {
                    this._delay(function () {
                        if (!d.contains(this.element[0], this.document[0].activeElement)) {
                            this.collapseAll(a)
                        }
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function (a) {
                    if (!d(a.target).closest(".ui-menu").length) {
                        this.collapseAll(a)
                    }
                    this.mouseHandled = false
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var a = d(this);
                if (a.data("ui-menu-submenu-carat")) {
                    a.remove()
                }
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (a) {
            var l, n, m, k, b, p = true;

            function o(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            switch (a.keyCode) {
            case d.ui.keyCode.PAGE_UP:
                this.previousPage(a);
                break;
            case d.ui.keyCode.PAGE_DOWN:
                this.nextPage(a);
                break;
            case d.ui.keyCode.HOME:
                this._move("first", "first", a);
                break;
            case d.ui.keyCode.END:
                this._move("last", "last", a);
                break;
            case d.ui.keyCode.UP:
                this.previous(a);
                break;
            case d.ui.keyCode.DOWN:
                this.next(a);
                break;
            case d.ui.keyCode.LEFT:
                this.collapse(a);
                break;
            case d.ui.keyCode.RIGHT:
                if (this.active && !this.active.is(".ui-state-disabled")) {
                    this.expand(a)
                }
                break;
            case d.ui.keyCode.ENTER:
            case d.ui.keyCode.SPACE:
                this._activate(a);
                break;
            case d.ui.keyCode.ESCAPE:
                this.collapse(a);
                break;
            default:
                p = false;
                n = this.previousFilter || "";
                m = String.fromCharCode(a.keyCode);
                k = false;
                clearTimeout(this.filterTimer);
                if (m === n) {
                    k = true
                } else {
                    m = n + m
                }
                b = new RegExp("^" + o(m), "i");
                l = this.activeMenu.children(".ui-menu-item").filter(function () {
                    return b.test(d(this).children("a").text())
                });
                l = k && l.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : l;
                if (!l.length) {
                    m = String.fromCharCode(a.keyCode);
                    b = new RegExp("^" + o(m), "i");
                    l = this.activeMenu.children(".ui-menu-item").filter(function () {
                        return b.test(d(this).children("a").text())
                    })
                }
                if (l.length) {
                    this.focus(a, l);
                    if (l.length > 1) {
                        this.previousFilter = m;
                        this.filterTimer = this._delay(function () {
                            delete this.previousFilter
                        }, 1000)
                    } else {
                        delete this.previousFilter
                    }
                } else {
                    delete this.previousFilter
                }
            }
            if (p) {
                a.preventDefault()
            }
        },
        _activate: function (a) {
            if (!this.active.is(".ui-state-disabled")) {
                if (this.active.children("a[aria-haspopup='true']").length) {
                    this.expand(a)
                } else {
                    this.select(a)
                }
            }
        },
        refresh: function () {
            var f, b = this.options.icons.submenu,
                a = this.element.find(this.options.menus);
            a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var j = d(this),
                    i = j.prev("a"),
                    e = d("<span>").addClass("ui-menu-icon ui-icon " + b).data("ui-menu-submenu-carat", true);
                i.attr("aria-haspopup", "true").prepend(e);
                j.attr("aria-labelledby", i.attr("id"))
            });
            f = a.add(this.element);
            f.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            f.children(":not(.ui-menu-item)").each(function () {
                var e = d(this);
                if (!/[^\-\u2014\u2013\s]/.test(e.text())) {
                    e.addClass("ui-widget-content ui-menu-divider")
                }
            });
            f.children(".ui-state-disabled").attr("aria-disabled", "true");
            if (this.active && !d.contains(this.element[0], this.active[0])) {
                this.blur()
            }
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function (b, a) {
            if (b === "icons") {
                this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(a.submenu)
            }
            this._super(b, a)
        },
        focus: function (a, g) {
            var h, b;
            this.blur(a, a && a.type === "focus");
            this._scrollIntoView(g);
            this.active = g.first();
            b = this.active.children("a").addClass("ui-state-focus");
            if (this.options.role) {
                this.element.attr("aria-activedescendant", b.attr("id"))
            }
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            if (a && a.type === "keydown") {
                this._close()
            } else {
                this.timer = this._delay(function () {
                    this._close()
                }, this.delay)
            }
            h = g.children(".ui-menu");
            if (h.length && (/^mouse/.test(a.type))) {
                this._startOpening(h)
            }
            this.activeMenu = g.parent();
            this._trigger("focus", a, {
                item: g
            })
        },
        _scrollIntoView: function (b) {
            var m, l, n, k, j, a;
            if (this._hasScroll()) {
                m = parseFloat(d.css(this.activeMenu[0], "borderTopWidth")) || 0;
                l = parseFloat(d.css(this.activeMenu[0], "paddingTop")) || 0;
                n = b.offset().top - this.activeMenu.offset().top - m - l;
                k = this.activeMenu.scrollTop();
                j = this.activeMenu.height();
                a = b.height();
                if (n < 0) {
                    this.activeMenu.scrollTop(k + n)
                } else {
                    if (n + a > j) {
                        this.activeMenu.scrollTop(k + n - j + a)
                    }
                }
            }
        },
        blur: function (a, b) {
            if (!b) {
                clearTimeout(this.timer)
            }
            if (!this.active) {
                return
            }
            this.active.children("a").removeClass("ui-state-focus");
            this.active = null;
            this._trigger("blur", a, {
                item: this.active
            })
        },
        _startOpening: function (a) {
            clearTimeout(this.timer);
            if (a.attr("aria-hidden") !== "true") {
                return
            }
            this.timer = this._delay(function () {
                this._close();
                this._open(a)
            }, this.delay)
        },
        _open: function (b) {
            var a = d.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(a)
        },
        collapseAll: function (a, b) {
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                var f = b ? this.element : d(a && a.target).closest(this.element.find(".ui-menu"));
                if (!f.length) {
                    f = this.element
                }
                this._close(f);
                this.blur(a);
                this.activeMenu = f
            }, this.delay)
        },
        _close: function (a) {
            if (!a) {
                a = this.active ? this.active.parent() : this.element
            }
            a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function (a) {
            var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            if (b && b.length) {
                this._close();
                this.focus(a, b)
            }
        },
        expand: function (a) {
            var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            if (b && b.length) {
                this._open(b.parent());
                this._delay(function () {
                    this.focus(a, b)
                })
            }
        },
        next: function (a) {
            this._move("next", "first", a)
        },
        previous: function (a) {
            this._move("prev", "last", a)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (b, h, a) {
            var g;
            if (this.active) {
                if (b === "first" || b === "last") {
                    g = this.active[b === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1)
                } else {
                    g = this.active[b + "All"](".ui-menu-item").eq(0)
                }
            }
            if (!g || !g.length || !this.active) {
                g = this.activeMenu.children(".ui-menu-item")[h]()
            }
            this.focus(a, g)
        },
        nextPage: function (a) {
            var g, h, b;
            if (!this.active) {
                this.next(a);
                return
            }
            if (this.isLastItem()) {
                return
            }
            if (this._hasScroll()) {
                h = this.active.offset().top;
                b = this.element.height();
                this.active.nextAll(".ui-menu-item").each(function () {
                    g = d(this);
                    return g.offset().top - h - b < 0
                });
                this.focus(a, g)
            } else {
                this.focus(a, this.activeMenu.children(".ui-menu-item")[!this.active ? "first" : "last"]())
            }
        },
        previousPage: function (a) {
            var g, h, b;
            if (!this.active) {
                this.next(a);
                return
            }
            if (this.isFirstItem()) {
                return
            }
            if (this._hasScroll()) {
                h = this.active.offset().top;
                b = this.element.height();
                this.active.prevAll(".ui-menu-item").each(function () {
                    g = d(this);
                    return g.offset().top - h + b > 0
                });
                this.focus(a, g)
            } else {
                this.focus(a, this.activeMenu.children(".ui-menu-item").first())
            }
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (b) {
            this.active = this.active || d(b.target).closest(".ui-menu-item");
            var a = {
                item: this.active
            };
            if (!this.active.has(".ui-menu").length) {
                this.collapseAll(b, true)
            }
            this._trigger("select", b, a)
        }
    })
}(jQuery));
(function (v, D) {
    v.ui = v.ui || {};
    var q, u = Math.max,
        C = Math.abs,
        w = Math.round,
        t = /left|center|right/,
        A = /top|center|bottom/,
        x = /[\+\-]\d+(\.[\d]+)?%?/,
        r = /^\w+/,
        B = /%$/,
        z = v.fn.position;

    function y(c, b, a) {
        return [parseFloat(c[0]) * (B.test(c[0]) ? b / 100 : 1), parseFloat(c[1]) * (B.test(c[1]) ? a / 100 : 1)]
    }

    function s(b, a) {
        return parseInt(v.css(b, a), 10) || 0
    }

    function p(b) {
        var a = b[0];
        if (a.nodeType === 9) {
            return {
                width: b.width(),
                height: b.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            }
        }
        if (v.isWindow(a)) {
            return {
                width: b.width(),
                height: b.height(),
                offset: {
                    top: b.scrollTop(),
                    left: b.scrollLeft()
                }
            }
        }
        if (a.preventDefault) {
            return {
                width: 0,
                height: 0,
                offset: {
                    top: a.pageY,
                    left: a.pageX
                }
            }
        }
        return {
            width: b.outerWidth(),
            height: b.outerHeight(),
            offset: b.offset()
        }
    }
    v.position = {
        scrollbarWidth: function () {
            if (q !== D) {
                return q
            }
            var d, b, a = v("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                c = a.children()[0];
            v("body").append(a);
            d = c.offsetWidth;
            a.css("overflow", "scroll");
            b = c.offsetWidth;
            if (d === b) {
                b = a[0].clientWidth
            }
            a.remove();
            return (q = d - b)
        },
        getScrollInfo: function (b) {
            var e = b.isWindow ? "" : b.element.css("overflow-x"),
                c = b.isWindow ? "" : b.element.css("overflow-y"),
                d = e === "scroll" || (e === "auto" && b.width < b.element[0].scrollWidth),
                a = c === "scroll" || (c === "auto" && b.height < b.element[0].scrollHeight);
            return {
                width: a ? v.position.scrollbarWidth() : 0,
                height: d ? v.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function (a) {
            var c = v(a || window),
                b = v.isWindow(c[0]);
            return {
                element: c,
                isWindow: b,
                offset: c.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: c.scrollLeft(),
                scrollTop: c.scrollTop(),
                width: b ? c.width() : c.outerWidth(),
                height: b ? c.height() : c.outerHeight()
            }
        }
    };
    v.fn.position = function (e) {
        if (!e || !e.of) {
            return z.apply(this, arguments)
        }
        e = v.extend({}, e);
        var k, b, d, f, h, g, i = v(e.of),
            j = v.position.getWithinInfo(e.within),
            c = v.position.getScrollInfo(j),
            l = (e.collision || "flip").split(" "),
            a = {};
        g = p(i);
        if (i[0].preventDefault) {
            e.at = "left top"
        }
        b = g.width;
        d = g.height;
        f = g.offset;
        h = v.extend({}, f);
        v.each(["my", "at"], function () {
            var m = (e[this] || "").split(" "),
                n, o;
            if (m.length === 1) {
                m = t.test(m[0]) ? m.concat(["center"]) : A.test(m[0]) ? ["center"].concat(m) : ["center", "center"]
            }
            m[0] = t.test(m[0]) ? m[0] : "center";
            m[1] = A.test(m[1]) ? m[1] : "center";
            n = x.exec(m[0]);
            o = x.exec(m[1]);
            a[this] = [n ? n[0] : 0, o ? o[0] : 0];
            e[this] = [r.exec(m[0])[0], r.exec(m[1])[0]]
        });
        if (l.length === 1) {
            l[1] = l[0]
        }
        if (e.at[0] === "right") {
            h.left += b
        } else {
            if (e.at[0] === "center") {
                h.left += b / 2
            }
        } if (e.at[1] === "bottom") {
            h.top += d
        } else {
            if (e.at[1] === "center") {
                h.top += d / 2
            }
        }
        k = y(a.at, b, d);
        h.left += k[0];
        h.top += k[1];
        return this.each(function () {
            var n, o, P = v(this),
                O = P.outerWidth(),
                R = P.outerHeight(),
                T = s(this, "marginLeft"),
                N = s(this, "marginTop"),
                Q = O + T + s(this, "marginRight") + c.width,
                M = R + N + s(this, "marginBottom") + c.height,
                m = v.extend({}, h),
                S = y(a.my, P.outerWidth(), P.outerHeight());
            if (e.my[0] === "right") {
                m.left -= O
            } else {
                if (e.my[0] === "center") {
                    m.left -= O / 2
                }
            } if (e.my[1] === "bottom") {
                m.top -= R
            } else {
                if (e.my[1] === "center") {
                    m.top -= R / 2
                }
            }
            m.left += S[0];
            m.top += S[1];
            if (!v.support.offsetFractions) {
                m.left = w(m.left);
                m.top = w(m.top)
            }
            n = {
                marginLeft: T,
                marginTop: N
            };
            v.each(["left", "top"], function (F, E) {
                if (v.ui.position[l[F]]) {
                    v.ui.position[l[F]][E](m, {
                        targetWidth: b,
                        targetHeight: d,
                        elemWidth: O,
                        elemHeight: R,
                        collisionPosition: n,
                        collisionWidth: Q,
                        collisionHeight: M,
                        offset: [k[0] + S[0], k[1] + S[1]],
                        my: e.my,
                        at: e.at,
                        within: j,
                        elem: P
                    })
                }
            });
            if (e.using) {
                o = function (J) {
                    var E = f.left - m.left,
                        F = E + b - O,
                        H = f.top - m.top,
                        I = H + d - R,
                        G = {
                            target: {
                                element: i,
                                left: f.left,
                                top: f.top,
                                width: b,
                                height: d
                            },
                            element: {
                                element: P,
                                left: m.left,
                                top: m.top,
                                width: O,
                                height: R
                            },
                            horizontal: F < 0 ? "left" : E > 0 ? "right" : "center",
                            vertical: I < 0 ? "top" : H > 0 ? "bottom" : "middle"
                        };
                    if (b < O && C(E + F) < b) {
                        G.horizontal = "center"
                    }
                    if (d < R && C(H + I) < d) {
                        G.vertical = "middle"
                    }
                    if (u(C(E), C(F)) > u(C(H), C(I))) {
                        G.important = "horizontal"
                    } else {
                        G.important = "vertical"
                    }
                    e.using.call(this, J, G)
                }
            }
            P.offset(v.extend(m, {
                using: o
            }))
        })
    };
    v.ui.position = {
        fit: {
            left: function (h, b) {
                var f = b.within,
                    d = f.isWindow ? f.scrollLeft : f.offset.left,
                    i = f.width,
                    e = h.left - b.collisionPosition.marginLeft,
                    c = d - e,
                    g = e + b.collisionWidth - i - d,
                    a;
                if (b.collisionWidth > i) {
                    if (c > 0 && g <= 0) {
                        a = h.left + c + b.collisionWidth - i - d;
                        h.left += c - a
                    } else {
                        if (g > 0 && c <= 0) {
                            h.left = d
                        } else {
                            if (c > g) {
                                h.left = d + i - b.collisionWidth
                            } else {
                                h.left = d
                            }
                        }
                    }
                } else {
                    if (c > 0) {
                        h.left += c
                    } else {
                        if (g > 0) {
                            h.left -= g
                        } else {
                            h.left = u(h.left - e, h.left)
                        }
                    }
                }
            },
            top: function (g, a) {
                var f = a.within,
                    d = f.isWindow ? f.scrollTop : f.offset.top,
                    h = a.within.height,
                    i = g.top - a.collisionPosition.marginTop,
                    c = d - i,
                    b = i + a.collisionHeight - h - d,
                    e;
                if (a.collisionHeight > h) {
                    if (c > 0 && b <= 0) {
                        e = g.top + c + a.collisionHeight - h - d;
                        g.top += c - e
                    } else {
                        if (b > 0 && c <= 0) {
                            g.top = d
                        } else {
                            if (c > b) {
                                g.top = d + h - a.collisionHeight
                            } else {
                                g.top = d
                            }
                        }
                    }
                } else {
                    if (c > 0) {
                        g.top += c
                    } else {
                        if (b > 0) {
                            g.top -= b
                        } else {
                            g.top = u(g.top - i, g.top)
                        }
                    }
                }
            }
        },
        flip: {
            left: function (h, k) {
                var j = k.within,
                    b = j.offset.left + j.scrollLeft,
                    l = j.width,
                    g = j.isWindow ? j.scrollLeft : j.offset.left,
                    a = h.left - k.collisionPosition.marginLeft,
                    i = a - g,
                    c = a + k.collisionWidth - l - g,
                    f = k.my[0] === "left" ? -k.elemWidth : k.my[0] === "right" ? k.elemWidth : 0,
                    d = k.at[0] === "left" ? k.targetWidth : k.at[0] === "right" ? -k.targetWidth : 0,
                    e = -2 * k.offset[0],
                    n, m;
                if (i < 0) {
                    n = h.left + f + d + e + k.collisionWidth - l - b;
                    if (n < 0 || n < C(i)) {
                        h.left += f + d + e
                    }
                } else {
                    if (c > 0) {
                        m = h.left - k.collisionPosition.marginLeft + f + d + e - g;
                        if (m > 0 || C(m) < c) {
                            h.left += f + d + e
                        }
                    }
                }
            },
            top: function (o, l) {
                var k = l.within,
                    f = k.offset.top + k.scrollTop,
                    d = k.height,
                    n = k.isWindow ? k.scrollTop : k.offset.top,
                    m = o.top - l.collisionPosition.marginTop,
                    a = m - n,
                    h = m + l.collisionHeight - d - n,
                    i = l.my[1] === "top",
                    e = i ? -l.elemHeight : l.my[1] === "bottom" ? l.elemHeight : 0,
                    c = l.at[1] === "top" ? l.targetHeight : l.at[1] === "bottom" ? -l.targetHeight : 0,
                    g = -2 * l.offset[1],
                    j, b;
                if (a < 0) {
                    b = o.top + e + c + g + l.collisionHeight - d - f;
                    if ((o.top + e + c + g) > a && (b < 0 || b < C(a))) {
                        o.top += e + c + g
                    }
                } else {
                    if (h > 0) {
                        j = o.top - l.collisionPosition.marginTop + e + c + g - n;
                        if ((o.top + e + c + g) > h && (j > 0 || C(j) < h)) {
                            o.top += e + c + g
                        }
                    }
                }
            }
        },
        flipfit: {
            left: function () {
                v.ui.position.flip.left.apply(this, arguments);
                v.ui.position.fit.left.apply(this, arguments)
            },
            top: function () {
                v.ui.position.flip.top.apply(this, arguments);
                v.ui.position.fit.top.apply(this, arguments)
            }
        }
    };
    (function () {
        var e, a, b, f, g, d = document.getElementsByTagName("body")[0],
            c = document.createElement("div");
        e = document.createElement(d ? "div" : "body");
        b = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (d) {
            v.extend(b, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            })
        }
        for (g in b) {
            e.style[g] = b[g]
        }
        e.appendChild(c);
        a = d || document.documentElement;
        a.insertBefore(e, a.firstChild);
        c.style.cssText = "position: absolute; left: 10.7432222px;";
        f = v(c).offset().left;
        v.support.offsetFractions = f > 10 && f < 11;
        e.innerHTML = "";
        a.removeChild(e)
    })()
}(jQuery));
(function (d, c) {
    d.widget("ui.progressbar", {
        version: "1.10.2",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function () {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = d("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function (a) {
            if (a === c) {
                return this.options.value
            }
            this.options.value = this._constrainedValue(a);
            this._refreshValue()
        },
        _constrainedValue: function (a) {
            if (a === c) {
                a = this.options.value
            }
            this.indeterminate = a === false;
            if (typeof a !== "number") {
                a = 0
            }
            return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, a))
        },
        _setOptions: function (b) {
            var a = b.value;
            delete b.value;
            this._super(b);
            this.options.value = this._constrainedValue(a);
            this._refreshValue()
        },
        _setOption: function (b, a) {
            if (b === "max") {
                a = Math.max(this.min, a)
            }
            this._super(b, a)
        },
        _percentage: function () {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function () {
            var a = this.options.value,
                b = this._percentage();
            this.valueDiv.toggle(this.indeterminate || a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            if (this.indeterminate) {
                this.element.removeAttr("aria-valuenow");
                if (!this.overlayDiv) {
                    this.overlayDiv = d("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv)
                }
            } else {
                this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": a
                });
                if (this.overlayDiv) {
                    this.overlayDiv.remove();
                    this.overlayDiv = null
                }
            } if (this.oldValue !== a) {
                this.oldValue = a;
                this._trigger("change")
            }
            if (a === this.options.max) {
                this._trigger("complete")
            }
        }
    })
})(jQuery);
(function (f, d) {
    var e = 5;
    f.widget("ui.slider", f.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = false
        },
        _refresh: function () {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function () {
            var b, a, i = this.options,
                l = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                c = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                k = [];
            a = (i.values && i.values.length) || 1;
            if (l.length > a) {
                l.slice(a).remove();
                l = l.slice(0, a)
            }
            for (b = l.length; b < a; b++) {
                k.push(c)
            }
            this.handles = l.add(f(k.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function (g) {
                f(this).data("ui-slider-handle-index", g)
            })
        },
        _createRange: function () {
            var b = this.options,
                a = "";
            if (b.range) {
                if (b.range === true) {
                    if (!b.values) {
                        b.values = [this._valueMin(), this._valueMin()]
                    } else {
                        if (b.values.length && b.values.length !== 2) {
                            b.values = [b.values[0], b.values[0]]
                        } else {
                            if (f.isArray(b.values)) {
                                b.values = b.values.slice(0)
                            }
                        }
                    }
                }
                if (!this.range || !this.range.length) {
                    this.range = f("<div></div>").appendTo(this.element);
                    a = "ui-slider-range ui-widget-header ui-corner-all"
                } else {
                    this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        left: "",
                        bottom: ""
                    })
                }
                this.range.addClass(a + ((b.range === "min" || b.range === "max") ? " ui-slider-range-" + b.range : ""))
            } else {
                this.range = f([])
            }
        },
        _setupEvents: function () {
            var a = this.handles.add(this.range).filter("a");
            this._off(a);
            this._on(a, this._handleEvents);
            this._hoverable(a);
            this._focusable(a)
        },
        _destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function (c) {
            var r, p, v, t, q, o, a, b, s = this,
                u = this.options;
            if (u.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            r = {
                x: c.pageX,
                y: c.pageY
            };
            p = this._normValueFromMouse(r);
            v = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function (h) {
                var g = Math.abs(p - s.values(h));
                if ((v > g) || (v === g && (h === s._lastChangedValue || s.values(h) === u.min))) {
                    v = g;
                    t = f(this);
                    q = h
                }
            });
            o = this._start(c, q);
            if (o === false) {
                return false
            }
            this._mouseSliding = true;
            this._handleIndex = q;
            t.addClass("ui-state-active").focus();
            a = t.offset();
            b = !f(c.target).parents().addBack().is(".ui-slider-handle");
            this._clickOffset = b ? {
                left: 0,
                top: 0
            } : {
                left: c.pageX - a.left - (t.width() / 2),
                top: c.pageY - a.top - (t.height() / 2) - (parseInt(t.css("borderTopWidth"), 10) || 0) - (parseInt(t.css("borderBottomWidth"), 10) || 0) + (parseInt(t.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(c, q, p)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (a) {
            var c = {
                x: a.pageX,
                y: a.pageY
            }, b = this._normValueFromMouse(c);
            this._slide(a, this._handleIndex, b);
            return false
        },
        _mouseStop: function (a) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(a, this._handleIndex);
            this._change(a, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function () {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (b) {
            var a, c, j, k, l;
            if (this.orientation === "horizontal") {
                a = this.elementSize.width;
                c = b.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                a = this.elementSize.height;
                c = b.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            j = (c / a);
            if (j > 1) {
                j = 1
            }
            if (j < 0) {
                j = 0
            }
            if (this.orientation === "vertical") {
                j = 1 - j
            }
            k = this._valueMax() - this._valueMin();
            l = this._valueMin() + j * k;
            return this._trimAlignValue(l)
        },
        _start: function (c, b) {
            var a = {
                handle: this.handles[b],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                a.value = this.values(b);
                a.values = this.values()
            }
            return this._trigger("start", c, a)
        },
        _slide: function (j, l, k) {
            var b, c, a;
            if (this.options.values && this.options.values.length) {
                b = this.values(l ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((l === 0 && k > b) || (l === 1 && k < b))) {
                    k = b
                }
                if (k !== this.values(l)) {
                    c = this.values();
                    c[l] = k;
                    a = this._trigger("slide", j, {
                        handle: this.handles[l],
                        value: k,
                        values: c
                    });
                    b = this.values(l ? 0 : 1);
                    if (a !== false) {
                        this.values(l, k, true)
                    }
                }
            } else {
                if (k !== this.value()) {
                    a = this._trigger("slide", j, {
                        handle: this.handles[l],
                        value: k
                    });
                    if (a !== false) {
                        this.value(k)
                    }
                }
            }
        },
        _stop: function (c, b) {
            var a = {
                handle: this.handles[b],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                a.value = this.values(b);
                a.values = this.values()
            }
            this._trigger("stop", c, a)
        },
        _change: function (c, b) {
            if (!this._keySliding && !this._mouseSliding) {
                var a = {
                    handle: this.handles[b],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    a.value = this.values(b);
                    a.values = this.values()
                }
                this._lastChangedValue = b;
                this._trigger("change", c, a)
            }
        },
        value: function (a) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(a);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function (b, i) {
            var j, a, c;
            if (arguments.length > 1) {
                this.options.values[b] = this._trimAlignValue(i);
                this._refreshValue();
                this._change(null, b);
                return
            }
            if (arguments.length) {
                if (f.isArray(arguments[0])) {
                    j = this.options.values;
                    a = arguments[0];
                    for (c = 0; c < j.length; c += 1) {
                        j[c] = this._trimAlignValue(a[c]);
                        this._change(null, c)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(b)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function (c, h) {
            var a, b = 0;
            if (c === "range" && this.options.range === true) {
                if (h === "min") {
                    this.options.value = this._values(0);
                    this.options.values = null
                } else {
                    if (h === "max") {
                        this.options.value = this._values(this.options.values.length - 1);
                        this.options.values = null
                    }
                }
            }
            if (f.isArray(this.options.values)) {
                b = this.options.values.length
            }
            f.Widget.prototype._setOption.apply(this, arguments);
            switch (c) {
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (a = 0; a < b; a += 1) {
                    this._change(null, a)
                }
                this._animateOff = false;
                break;
            case "min":
            case "max":
                this._animateOff = true;
                this._refreshValue();
                this._animateOff = false;
                break;
            case "range":
                this._animateOff = true;
                this._refresh();
                this._animateOff = false;
                break
            }
        },
        _value: function () {
            var a = this.options.value;
            a = this._trimAlignValue(a);
            return a
        },
        _values: function (a) {
            var c, b, h;
            if (arguments.length) {
                c = this.options.values[a];
                c = this._trimAlignValue(c);
                return c
            } else {
                if (this.options.values && this.options.values.length) {
                    b = this.options.values.slice();
                    for (h = 0; h < b.length; h += 1) {
                        b[h] = this._trimAlignValue(b[h])
                    }
                    return b
                } else {
                    return []
                }
            }
        },
        _trimAlignValue: function (h) {
            if (h <= this._valueMin()) {
                return this._valueMin()
            }
            if (h >= this._valueMax()) {
                return this._valueMax()
            }
            var b = (this.options.step > 0) ? this.options.step : 1,
                c = (h - this._valueMin()) % b,
                a = h - c;
            if (Math.abs(c) * 2 >= b) {
                a += (c > 0) ? b : (-b)
            }
            return parseFloat(a.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var c, a, r, p, o, s = this.options.range,
                t = this.options,
                n = this,
                q = (!this._animateOff) ? t.animate : false,
                b = {};
            if (this.options.values && this.options.values.length) {
                this.handles.each(function (g) {
                    a = (n.values(g) - n._valueMin()) / (n._valueMax() - n._valueMin()) * 100;
                    b[n.orientation === "horizontal" ? "left" : "bottom"] = a + "%";
                    f(this).stop(1, 1)[q ? "animate" : "css"](b, t.animate);
                    if (n.options.range === true) {
                        if (n.orientation === "horizontal") {
                            if (g === 0) {
                                n.range.stop(1, 1)[q ? "animate" : "css"]({
                                    left: a + "%"
                                }, t.animate)
                            }
                            if (g === 1) {
                                n.range[q ? "animate" : "css"]({
                                    width: (a - c) + "%"
                                }, {
                                    queue: false,
                                    duration: t.animate
                                })
                            }
                        } else {
                            if (g === 0) {
                                n.range.stop(1, 1)[q ? "animate" : "css"]({
                                    bottom: (a) + "%"
                                }, t.animate)
                            }
                            if (g === 1) {
                                n.range[q ? "animate" : "css"]({
                                    height: (a - c) + "%"
                                }, {
                                    queue: false,
                                    duration: t.animate
                                })
                            }
                        }
                    }
                    c = a
                })
            } else {
                r = this.value();
                p = this._valueMin();
                o = this._valueMax();
                a = (o !== p) ? (r - p) / (o - p) * 100 : 0;
                b[this.orientation === "horizontal" ? "left" : "bottom"] = a + "%";
                this.handle.stop(1, 1)[q ? "animate" : "css"](b, t.animate);
                if (s === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[q ? "animate" : "css"]({
                        width: a + "%"
                    }, t.animate)
                }
                if (s === "max" && this.orientation === "horizontal") {
                    this.range[q ? "animate" : "css"]({
                        width: (100 - a) + "%"
                    }, {
                        queue: false,
                        duration: t.animate
                    })
                }
                if (s === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[q ? "animate" : "css"]({
                        height: a + "%"
                    }, t.animate)
                }
                if (s === "max" && this.orientation === "vertical") {
                    this.range[q ? "animate" : "css"]({
                        height: (100 - a) + "%"
                    }, {
                        queue: false,
                        duration: t.animate
                    })
                }
            }
        },
        _handleEvents: {
            keydown: function (c) {
                var j, a, k, b, l = f(c.target).data("ui-slider-handle-index");
                switch (c.keyCode) {
                case f.ui.keyCode.HOME:
                case f.ui.keyCode.END:
                case f.ui.keyCode.PAGE_UP:
                case f.ui.keyCode.PAGE_DOWN:
                case f.ui.keyCode.UP:
                case f.ui.keyCode.RIGHT:
                case f.ui.keyCode.DOWN:
                case f.ui.keyCode.LEFT:
                    c.preventDefault();
                    if (!this._keySliding) {
                        this._keySliding = true;
                        f(c.target).addClass("ui-state-active");
                        j = this._start(c, l);
                        if (j === false) {
                            return
                        }
                    }
                    break
                }
                b = this.options.step;
                if (this.options.values && this.options.values.length) {
                    a = k = this.values(l)
                } else {
                    a = k = this.value()
                }
                switch (c.keyCode) {
                case f.ui.keyCode.HOME:
                    k = this._valueMin();
                    break;
                case f.ui.keyCode.END:
                    k = this._valueMax();
                    break;
                case f.ui.keyCode.PAGE_UP:
                    k = this._trimAlignValue(a + ((this._valueMax() - this._valueMin()) / e));
                    break;
                case f.ui.keyCode.PAGE_DOWN:
                    k = this._trimAlignValue(a - ((this._valueMax() - this._valueMin()) / e));
                    break;
                case f.ui.keyCode.UP:
                case f.ui.keyCode.RIGHT:
                    if (a === this._valueMax()) {
                        return
                    }
                    k = this._trimAlignValue(a + b);
                    break;
                case f.ui.keyCode.DOWN:
                case f.ui.keyCode.LEFT:
                    if (a === this._valueMin()) {
                        return
                    }
                    k = this._trimAlignValue(a - b);
                    break
                }
                this._slide(c, l, k)
            },
            click: function (a) {
                a.preventDefault()
            },
            keyup: function (b) {
                var a = f(b.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    this._keySliding = false;
                    this._stop(b, a);
                    this._change(b, a);
                    f(b.target).removeClass("ui-state-active")
                }
            }
        }
    })
}(jQuery));
(function (d) {
    function c(a) {
        return function () {
            var b = this.element.val();
            a.apply(this, arguments);
            this._refresh();
            if (b !== this.element.val()) {
                this._trigger("change")
            }
        }
    }
    d.widget("ui.spinner", {
        version: "1.10.2",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: true,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            this._value(this.element.val(), true);
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var a = {}, b = this.element;
            d.each(["min", "max", "step"], function (i, h) {
                var j = b.attr(h);
                if (j !== undefined && j.length) {
                    a[h] = j
                }
            });
            return a
        },
        _events: {
            keydown: function (a) {
                if (this._start(a) && this._keydown(a)) {
                    a.preventDefault()
                }
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val()
            },
            blur: function (a) {
                if (this.cancelBlur) {
                    delete this.cancelBlur;
                    return
                }
                this._stop();
                this._refresh();
                if (this.previous !== this.element.val()) {
                    this._trigger("change", a)
                }
            },
            mousewheel: function (b, a) {
                if (!a) {
                    return
                }
                if (!this.spinning && !this._start(b)) {
                    return false
                }
                this._spin((a > 0 ? 1 : -1) * this.options.step, b);
                clearTimeout(this.mousewheelTimer);
                this.mousewheelTimer = this._delay(function () {
                    if (this.spinning) {
                        this._stop(b)
                    }
                }, 100);
                b.preventDefault()
            },
            "mousedown .ui-spinner-button": function (a) {
                var f;
                f = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();

                function b() {
                    var e = this.element[0] === this.document[0].activeElement;
                    if (!e) {
                        this.element.focus();
                        this.previous = f;
                        this._delay(function () {
                            this.previous = f
                        })
                    }
                }
                a.preventDefault();
                b.call(this);
                this.cancelBlur = true;
                this._delay(function () {
                    delete this.cancelBlur;
                    b.call(this)
                });
                if (this._start(a) === false) {
                    return
                }
                this._repeat(null, d(a.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, a)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function (a) {
                if (!d(a.currentTarget).hasClass("ui-state-active")) {
                    return
                }
                if (this._start(a) === false) {
                    return false
                }
                this._repeat(null, d(a.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, a)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton");
            this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
            if (this.buttons.height() > Math.ceil(a.height() * 0.5) && a.height() > 0) {
                a.height(a.height())
            }
            if (this.options.disabled) {
                this.disable()
            }
        },
        _keydown: function (f) {
            var b = this.options,
                a = d.ui.keyCode;
            switch (f.keyCode) {
            case a.UP:
                this._repeat(null, 1, f);
                return true;
            case a.DOWN:
                this._repeat(null, -1, f);
                return true;
            case a.PAGE_UP:
                this._repeat(null, b.page, f);
                return true;
            case a.PAGE_DOWN:
                this._repeat(null, -b.page, f);
                return true
            }
            return false
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>^</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>�</span></a>"
        },
        _start: function (a) {
            if (!this.spinning && this._trigger("start", a) === false) {
                return false
            }
            if (!this.counter) {
                this.counter = 1
            }
            this.spinning = true;
            return true
        },
        _repeat: function (a, f, b) {
            a = a || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function () {
                this._repeat(40, f, b)
            }, a);
            this._spin(f * this.options.step, b)
        },
        _spin: function (a, f) {
            var b = this.value() || 0;
            if (!this.counter) {
                this.counter = 1
            }
            b = this._adjustValue(b + a * this._increment(this.counter));
            if (!this.spinning || this._trigger("spin", f, {
                value: b
            }) !== false) {
                this._value(b);
                this.counter++
            }
        },
        _increment: function (a) {
            var b = this.options.incremental;
            if (b) {
                return d.isFunction(b) ? b(a) : Math.floor(a * a * a / 50000 - a * a / 500 + 17 * a / 200 + 1)
            }
            return 1
        },
        _precision: function () {
            var a = this._precisionOf(this.options.step);
            if (this.options.min !== null) {
                a = Math.max(a, this._precisionOf(this.options.min))
            }
            return a
        },
        _precisionOf: function (b) {
            var a = b.toString(),
                f = a.indexOf(".");
            return f === -1 ? 0 : a.length - f - 1
        },
        _adjustValue: function (h) {
            var a, b, g = this.options;
            a = g.min !== null ? g.min : 0;
            b = h - a;
            b = Math.round(b / g.step) * g.step;
            h = a + b;
            h = parseFloat(h.toFixed(this._precision()));
            if (g.max !== null && h > g.max) {
                return g.max
            }
            if (g.min !== null && h < g.min) {
                return g.min
            }
            return h
        },
        _stop: function (a) {
            if (!this.spinning) {
                return
            }
            clearTimeout(this.timer);
            clearTimeout(this.mousewheelTimer);
            this.counter = 0;
            this.spinning = false;
            this._trigger("stop", a)
        },
        _setOption: function (a, b) {
            if (a === "culture" || a === "numberFormat") {
                var f = this._parse(this.element.val());
                this.options[a] = b;
                this.element.val(this._format(f));
                return
            }
            if (a === "max" || a === "min" || a === "step") {
                if (typeof b === "string") {
                    b = this._parse(b)
                }
            }
            if (a === "icons") {
                this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(b.up);
                this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(b.down)
            }
            this._super(a, b);
            if (a === "disabled") {
                if (b) {
                    this.element.prop("disabled", true);
                    this.buttons.button("disable")
                } else {
                    this.element.prop("disabled", false);
                    this.buttons.button("enable")
                }
            }
        },
        _setOptions: c(function (a) {
            this._super(a);
            this._value(this.element.val())
        }),
        _parse: function (a) {
            if (typeof a === "string" && a !== "") {
                a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a
            }
            return a === "" || isNaN(a) ? null : a
        },
        _format: function (a) {
            if (a === "") {
                return ""
            }
            return window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function (b, a) {
            var f;
            if (b !== "") {
                f = this._parse(b);
                if (f !== null) {
                    if (!a) {
                        f = this._adjustValue(f)
                    }
                    b = this._format(f)
                }
            }
            this.element.val(b);
            this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: c(function (a) {
            this._stepUp(a)
        }),
        _stepUp: function (a) {
            if (this._start()) {
                this._spin((a || 1) * this.options.step);
                this._stop()
            }
        },
        stepDown: c(function (a) {
            this._stepDown(a)
        }),
        _stepDown: function (a) {
            if (this._start()) {
                this._spin((a || 1) * -this.options.step);
                this._stop()
            }
        },
        pageUp: c(function (a) {
            this._stepUp((a || 1) * this.options.page)
        }),
        pageDown: c(function (a) {
            this._stepDown((a || 1) * this.options.page)
        }),
        value: function (a) {
            if (!arguments.length) {
                return this._parse(this.element.val())
            }
            c(this._value).call(this, a)
        },
        widget: function () {
            return this.uiSpinner
        }
    })
}(jQuery));
(function (l, k) {
    var g = 0,
        h = /#.*$/;

    function i() {
        return ++g
    }

    function j(a) {
        return a.hash.length > 1 && decodeURIComponent(a.href.replace(h, "")) === decodeURIComponent(location.href.replace(h, ""))
    }
    l.widget("ui.tabs", {
        version: "1.10.2",
        delay: 300,
        options: {
            active: null,
            collapsible: false,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function () {
            var a = this,
                b = this.options;
            this.running = false;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", b.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function (c) {
                if (l(this).is(".ui-state-disabled")) {
                    c.preventDefault()
                }
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                if (l(this).closest("li").is(".ui-state-disabled")) {
                    this.blur()
                }
            });
            this._processTabs();
            b.active = this._initialActive();
            if (l.isArray(b.disabled)) {
                b.disabled = l.unique(b.disabled.concat(l.map(this.tabs.filter(".ui-state-disabled"), function (c) {
                    return a.tabs.index(c)
                }))).sort()
            }
            if (this.options.active !== false && this.anchors.length) {
                this.active = this._findActive(b.active)
            } else {
                this.active = l()
            }
            this._refresh();
            if (this.active.length) {
                this.load(b.active)
            }
        },
        _initialActive: function () {
            var c = this.options.active,
                a = this.options.collapsible,
                b = location.hash.substring(1);
            if (c === null) {
                if (b) {
                    this.tabs.each(function (d, e) {
                        if (l(e).attr("aria-controls") === b) {
                            c = d;
                            return false
                        }
                    })
                }
                if (c === null) {
                    c = this.tabs.index(this.tabs.filter(".ui-tabs-active"))
                }
                if (c === null || c === -1) {
                    c = this.tabs.length ? 0 : false
                }
            }
            if (c !== false) {
                c = this.tabs.index(this.tabs.eq(c));
                if (c === -1) {
                    c = a ? false : 0
                }
            }
            if (!a && c === false && this.anchors.length) {
                c = 0
            }
            return c
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: !this.active.length ? l() : this._getPanelForTab(this.active)
            }
        },
        _tabKeydown: function (b) {
            var a = l(this.document[0].activeElement).closest("li"),
                c = this.tabs.index(a),
                d = true;
            if (this._handlePageNav(b)) {
                return
            }
            switch (b.keyCode) {
            case l.ui.keyCode.RIGHT:
            case l.ui.keyCode.DOWN:
                c++;
                break;
            case l.ui.keyCode.UP:
            case l.ui.keyCode.LEFT:
                d = false;
                c--;
                break;
            case l.ui.keyCode.END:
                c = this.anchors.length - 1;
                break;
            case l.ui.keyCode.HOME:
                c = 0;
                break;
            case l.ui.keyCode.SPACE:
                b.preventDefault();
                clearTimeout(this.activating);
                this._activate(c);
                return;
            case l.ui.keyCode.ENTER:
                b.preventDefault();
                clearTimeout(this.activating);
                this._activate(c === this.options.active ? false : c);
                return;
            default:
                return
            }
            b.preventDefault();
            clearTimeout(this.activating);
            c = this._focusNextTab(c, d);
            if (!b.ctrlKey) {
                a.attr("aria-selected", "false");
                this.tabs.eq(c).attr("aria-selected", "true");
                this.activating = this._delay(function () {
                    this.option("active", c)
                }, this.delay)
            }
        },
        _panelKeydown: function (a) {
            if (this._handlePageNav(a)) {
                return
            }
            if (a.ctrlKey && a.keyCode === l.ui.keyCode.UP) {
                a.preventDefault();
                this.active.focus()
            }
        },
        _handlePageNav: function (a) {
            if (a.altKey && a.keyCode === l.ui.keyCode.PAGE_UP) {
                this._activate(this._focusNextTab(this.options.active - 1, false));
                return true
            }
            if (a.altKey && a.keyCode === l.ui.keyCode.PAGE_DOWN) {
                this._activate(this._focusNextTab(this.options.active + 1, true));
                return true
            }
        },
        _findNextTab: function (b, c) {
            var d = this.tabs.length - 1;

            function a() {
                if (b > d) {
                    b = 0
                }
                if (b < 0) {
                    b = d
                }
                return b
            }
            while (l.inArray(a(), this.options.disabled) !== -1) {
                b = c ? b + 1 : b - 1
            }
            return b
        },
        _focusNextTab: function (b, a) {
            b = this._findNextTab(b, a);
            this.tabs.eq(b).focus();
            return b
        },
        _setOption: function (b, a) {
            if (b === "active") {
                this._activate(a);
                return
            }
            if (b === "disabled") {
                this._setupDisabled(a);
                return
            }
            this._super(b, a);
            if (b === "collapsible") {
                this.element.toggleClass("ui-tabs-collapsible", a);
                if (!a && this.options.active === false) {
                    this._activate(0)
                }
            }
            if (b === "event") {
                this._setupEvents(a)
            }
            if (b === "heightStyle") {
                this._setupHeightStyle(a)
            }
        },
        _tabId: function (a) {
            return a.attr("aria-controls") || "ui-tabs-" + i()
        },
        _sanitizeSelector: function (a) {
            return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var a = this.options,
                b = this.tablist.children(":has(a[href])");
            a.disabled = l.map(b.filter(".ui-state-disabled"), function (c) {
                return b.index(c)
            });
            this._processTabs();
            if (a.active === false || !this.anchors.length) {
                a.active = false;
                this.active = l()
            } else {
                if (this.active.length && !l.contains(this.tablist[0], this.active[0])) {
                    if (this.tabs.length === a.disabled.length) {
                        a.active = false;
                        this.active = l()
                    } else {
                        this._activate(this._findNextTab(Math.max(0, a.active - 1), false))
                    }
                } else {
                    a.active = this.tabs.index(this.active)
                }
            }
            this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            if (!this.active.length) {
                this.tabs.eq(0).attr("tabIndex", 0)
            } else {
                this.active.addClass("ui-tabs-active ui-state-active").attr({
                    "aria-selected": "true",
                    tabIndex: 0
                });
                this._getPanelForTab(this.active).show().attr({
                    "aria-expanded": "true",
                    "aria-hidden": "false"
                })
            }
        },
        _processTabs: function () {
            var a = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function () {
                return l("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            });
            this.panels = l();
            this.anchors.each(function (f, d) {
                var s, r, q, b = l(d).uniqueId().attr("id"),
                    e = l(d).closest("li"),
                    c = e.attr("aria-controls");
                if (j(d)) {
                    s = d.hash;
                    r = a.element.find(a._sanitizeSelector(s))
                } else {
                    q = a._tabId(e);
                    s = "#" + q;
                    r = a.element.find(s);
                    if (!r.length) {
                        r = a._createPanel(q);
                        r.insertAfter(a.panels[f - 1] || a.tablist)
                    }
                    r.attr("aria-live", "polite")
                } if (r.length) {
                    a.panels = a.panels.add(r)
                }
                if (c) {
                    e.data("ui-tabs-aria-controls", c)
                }
                e.attr({
                    "aria-controls": s.substring(1),
                    "aria-labelledby": b
                });
                r.attr("aria-labelledby", b)
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function () {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (a) {
            return l("<div>").attr("id", a).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true)
        },
        _setupDisabled: function (a) {
            if (l.isArray(a)) {
                if (!a.length) {
                    a = false
                } else {
                    if (a.length === this.anchors.length) {
                        a = true
                    }
                }
            }
            for (var b = 0, c;
                (c = this.tabs[b]); b++) {
                if (a === true || l.inArray(b, a) !== -1) {
                    l(c).addClass("ui-state-disabled").attr("aria-disabled", "true")
                } else {
                    l(c).removeClass("ui-state-disabled").removeAttr("aria-disabled")
                }
            }
            this.options.disabled = a
        },
        _setupEvents: function (b) {
            var a = {
                click: function (c) {
                    c.preventDefault()
                }
            };
            if (b) {
                l.each(b.split(" "), function (c, d) {
                    a[d] = "_eventHandler"
                })
            }
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(this.anchors, a);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (b) {
            var c, a = this.element.parent();
            if (b === "fill") {
                c = a.height();
                c -= this.element.outerHeight() - this.element.height();
                this.element.siblings(":visible").each(function () {
                    var e = l(this),
                        d = e.css("position");
                    if (d === "absolute" || d === "fixed") {
                        return
                    }
                    c -= e.outerHeight(true)
                });
                this.element.children().not(this.panels).each(function () {
                    c -= l(this).outerHeight(true)
                });
                this.panels.each(function () {
                    l(this).height(Math.max(0, c - l(this).innerHeight() + l(this).height()))
                }).css("overflow", "auto")
            } else {
                if (b === "auto") {
                    c = 0;
                    this.panels.each(function () {
                        c = Math.max(c, l(this).height("").height())
                    }).height(c)
                }
            }
        },
        _eventHandler: function (b) {
            var s = this.options,
                c = this.active,
                d = l(b.currentTarget),
                e = d.closest("li"),
                r = e[0] === c[0],
                q = r && s.collapsible,
                t = q ? l() : this._getPanelForTab(e),
                a = !c.length ? l() : this._getPanelForTab(c),
                f = {
                    oldTab: c,
                    oldPanel: a,
                    newTab: q ? l() : e,
                    newPanel: t
                };
            b.preventDefault();
            if (e.hasClass("ui-state-disabled") || e.hasClass("ui-tabs-loading") || this.running || (r && !s.collapsible) || (this._trigger("beforeActivate", b, f) === false)) {
                return
            }
            s.active = q ? false : this.tabs.index(e);
            this.active = r ? l() : e;
            if (this.xhr) {
                this.xhr.abort()
            }
            if (!a.length && !t.length) {
                l.error("jQuery UI Tabs: Mismatching fragment identifier.")
            }
            if (t.length) {
                this.load(this.tabs.index(e), b)
            }
            this._toggle(b, f)
        },
        _toggle: function (a, e) {
            var c = this,
                b = e.newPanel,
                f = e.oldPanel;
            this.running = true;

            function n() {
                c.running = false;
                c._trigger("activate", a, e)
            }

            function d() {
                e.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                if (b.length && c.options.show) {
                    c._show(b, c.options.show, n)
                } else {
                    b.show();
                    n()
                }
            }
            if (f.length && this.options.hide) {
                this._hide(f, this.options.hide, function () {
                    e.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                    d()
                })
            } else {
                e.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                f.hide();
                d()
            }
            f.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            e.oldTab.attr("aria-selected", "false");
            if (b.length && f.length) {
                e.oldTab.attr("tabIndex", -1)
            } else {
                if (b.length) {
                    this.tabs.filter(function () {
                        return l(this).attr("tabIndex") === 0
                    }).attr("tabIndex", -1)
                }
            }
            b.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            });
            e.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function (a) {
            var c, b = this._findActive(a);
            if (b[0] === this.active[0]) {
                return
            }
            if (!b.length) {
                b = this.active
            }
            c = b.find(".ui-tabs-anchor")[0];
            this._eventHandler({
                target: c,
                currentTarget: c,
                preventDefault: l.noop
            })
        },
        _findActive: function (a) {
            return a === false ? l() : this.tabs.eq(a)
        },
        _getIndex: function (a) {
            if (typeof a === "string") {
                a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))
            }
            return a
        },
        _destroy: function () {
            if (this.xhr) {
                this.xhr.abort()
            }
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
            this.tabs.add(this.panels).each(function () {
                if (l.data(this, "ui-tabs-destroy")) {
                    l(this).remove()
                } else {
                    l(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                }
            });
            this.tabs.each(function () {
                var a = l(this),
                    b = a.data("ui-tabs-aria-controls");
                if (b) {
                    a.attr("aria-controls", b).removeData("ui-tabs-aria-controls")
                } else {
                    a.removeAttr("aria-controls")
                }
            });
            this.panels.show();
            if (this.options.heightStyle !== "content") {
                this.panels.css("height", "")
            }
        },
        enable: function (b) {
            var a = this.options.disabled;
            if (a === false) {
                return
            }
            if (b === k) {
                a = false
            } else {
                b = this._getIndex(b);
                if (l.isArray(a)) {
                    a = l.map(a, function (c) {
                        return c !== b ? c : null
                    })
                } else {
                    a = l.map(this.tabs, function (c, d) {
                        return d !== b ? d : null
                    })
                }
            }
            this._setupDisabled(a)
        },
        disable: function (b) {
            var a = this.options.disabled;
            if (a === true) {
                return
            }
            if (b === k) {
                a = true
            } else {
                b = this._getIndex(b);
                if (l.inArray(b, a) !== -1) {
                    return
                }
                if (l.isArray(a)) {
                    a = l.merge([b], a).sort()
                } else {
                    a = [b]
                }
            }
            this._setupDisabled(a)
        },
        load: function (n, a) {
            n = this._getIndex(n);
            var f = this,
                d = this.tabs.eq(n),
                b = d.find(".ui-tabs-anchor"),
                c = this._getPanelForTab(d),
                e = {
                    tab: d,
                    panel: c
                };
            if (j(b[0])) {
                return
            }
            this.xhr = l.ajax(this._ajaxSettings(b, a, e));
            if (this.xhr && this.xhr.statusText !== "canceled") {
                d.addClass("ui-tabs-loading");
                c.attr("aria-busy", "true");
                this.xhr.success(function (m) {
                    setTimeout(function () {
                        c.html(m);
                        f._trigger("load", a, e)
                    }, 1)
                }).complete(function (p, m) {
                    setTimeout(function () {
                        if (m === "abort") {
                            f.panels.stop(false, true)
                        }
                        d.removeClass("ui-tabs-loading");
                        c.removeAttr("aria-busy");
                        if (p === f.xhr) {
                            delete f.xhr
                        }
                    }, 1)
                })
            }
        },
        _ajaxSettings: function (d, c, a) {
            var b = this;
            return {
                url: d.attr("href"),
                beforeSend: function (e, f) {
                    return b._trigger("beforeLoad", c, l.extend({
                        jqXHR: e,
                        ajaxSettings: f
                    }, a))
                }
            }
        },
        _getPanelForTab: function (a) {
            var b = l(a).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + b))
        }
    })
})(jQuery);
(function (f) {
    var h = 0;

    function e(a, b) {
        var c = (a.attr("aria-describedby") || "").split(/\s+/);
        c.push(b);
        a.data("ui-tooltip-id", b).attr("aria-describedby", f.trim(c.join(" ")))
    }

    function g(a) {
        var d = a.data("ui-tooltip-id"),
            b = (a.attr("aria-describedby") || "").split(/\s+/),
            c = f.inArray(d, b);
        if (c !== -1) {
            b.splice(c, 1)
        }
        a.removeData("ui-tooltip-id");
        b = f.trim(b.join(" "));
        if (b) {
            a.attr("aria-describedby", b)
        } else {
            a.removeAttr("aria-describedby")
        }
    }
    f.widget("ui.tooltip", {
        version: "1.10.2",
        options: {
            content: function () {
                var a = f(this).attr("title") || "";
                return f("<a>").text(a).html()
            },
            hide: true,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: true,
            tooltipClass: null,
            track: false,
            close: null,
            open: null
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            if (this.options.disabled) {
                this._disable()
            }
        },
        _setOption: function (b, c) {
            var a = this;
            if (b === "disabled") {
                this[c ? "_disable" : "_enable"]();
                this.options[b] = c;
                return
            }
            this._super(b, c);
            if (b === "content") {
                f.each(this.tooltips, function (d, j) {
                    a._updateContent(j)
                })
            }
        },
        _disable: function () {
            var a = this;
            f.each(this.tooltips, function (b, c) {
                var d = f.Event("blur");
                d.target = d.currentTarget = c[0];
                a.close(d, true)
            });
            this.element.find(this.options.items).addBack().each(function () {
                var b = f(this);
                if (b.is("[title]")) {
                    b.data("ui-tooltip-title", b.attr("title")).attr("title", "")
                }
            })
        },
        _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var a = f(this);
                if (a.data("ui-tooltip-title")) {
                    a.attr("title", a.data("ui-tooltip-title"))
                }
            })
        },
        open: function (c) {
            var b = this,
                a = f(c ? c.target : this.element).closest(this.options.items);
            if (!a.length || a.data("ui-tooltip-id")) {
                return
            }
            if (a.attr("title")) {
                a.data("ui-tooltip-title", a.attr("title"))
            }
            a.data("ui-tooltip-open", true);
            if (c && c.type === "mouseover") {
                a.parents().each(function () {
                    var j = f(this),
                        d;
                    if (j.data("ui-tooltip-open")) {
                        d = f.Event("blur");
                        d.target = d.currentTarget = this;
                        b.close(d, true)
                    }
                    if (j.attr("title")) {
                        j.uniqueId();
                        b.parents[this.id] = {
                            element: this,
                            title: j.attr("title")
                        };
                        j.attr("title", "")
                    }
                })
            }
            this._updateContent(a, c)
        },
        _updateContent: function (d, c) {
            var k, b = this.options.content,
                l = this,
                a = c ? c.type : null;
            if (typeof b === "string") {
                return this._open(c, d, b)
            }
            k = b.call(d[0], function (i) {
                if (!d.data("ui-tooltip-open")) {
                    return
                }
                l._delay(function () {
                    if (c) {
                        c.type = a
                    }
                    this._open(c, d, i)
                })
            });
            if (k) {
                this._open(c, d, k)
            }
        },
        _open: function (c, p, n) {
            var o, d, m, b = f.extend({}, this.options.position);
            if (!n) {
                return
            }
            o = this._find(p);
            if (o.length) {
                o.find(".ui-tooltip-content").html(n);
                return
            }
            if (p.is("[title]")) {
                if (c && c.type === "mouseover") {
                    p.attr("title", "")
                } else {
                    p.removeAttr("title")
                }
            }
            o = this._tooltip(p);
            e(p, o.attr("id"));
            o.find(".ui-tooltip-content").html(n);

            function a(i) {
                b.of = i;
                if (o.is(":hidden")) {
                    return
                }
                o.position(b)
            }
            if (this.options.track && c && /^mouse/.test(c.type)) {
                this._on(this.document, {
                    mousemove: a
                });
                a(c)
            } else {
                o.position(f.extend({
                    of: p
                }, this.options.position))
            }
            o.hide();
            this._show(o, this.options.show);
            if (this.options.show && this.options.show.delay) {
                m = this.delayedShow = setInterval(function () {
                    if (o.is(":visible")) {
                        a(b.of);
                        clearInterval(m)
                    }
                }, f.fx.interval)
            }
            this._trigger("open", c, {
                tooltip: o
            });
            d = {
                keyup: function (i) {
                    if (i.keyCode === f.ui.keyCode.ESCAPE) {
                        var j = f.Event(i);
                        j.currentTarget = p[0];
                        this.close(j, true)
                    }
                },
                remove: function () {
                    this._removeTooltip(o)
                }
            };
            if (!c || c.type === "mouseover") {
                d.mouseleave = "close"
            }
            if (!c || c.type === "focusin") {
                d.focusout = "close"
            }
            this._on(true, p, d)
        },
        close: function (d) {
            var c = this,
                a = f(d ? d.currentTarget : this.element),
                b = this._find(a);
            if (this.closing) {
                return
            }
            clearInterval(this.delayedShow);
            if (a.data("ui-tooltip-title")) {
                a.attr("title", a.data("ui-tooltip-title"))
            }
            g(a);
            b.stop(true);
            this._hide(b, this.options.hide, function () {
                c._removeTooltip(f(this))
            });
            a.removeData("ui-tooltip-open");
            this._off(a, "mouseleave focusout keyup");
            if (a[0] !== this.element[0]) {
                this._off(a, "remove")
            }
            this._off(this.document, "mousemove");
            if (d && d.type === "mouseleave") {
                f.each(this.parents, function (k, l) {
                    f(l.element).attr("title", l.title);
                    delete c.parents[k]
                })
            }
            this.closing = true;
            this._trigger("close", d, {
                tooltip: b
            });
            this.closing = false
        },
        _tooltip: function (a) {
            var c = "ui-tooltip-" + h++,
                b = f("<div>").attr({
                    id: c,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            f("<div>").addClass("ui-tooltip-content").appendTo(b);
            b.appendTo(this.document[0].body);
            this.tooltips[c] = a;
            return b
        },
        _find: function (a) {
            var b = a.data("ui-tooltip-id");
            return b ? f("#" + b) : f()
        },
        _removeTooltip: function (a) {
            a.remove();
            delete this.tooltips[a.attr("id")]
        },
        _destroy: function () {
            var a = this;
            f.each(this.tooltips, function (b, c) {
                var d = f.Event("blur");
                d.target = d.currentTarget = c[0];
                a.close(d, true);
                f("#" + b).remove();
                if (c.data("ui-tooltip-title")) {
                    c.attr("title", c.data("ui-tooltip-title"));
                    c.removeData("ui-tooltip-title")
                }
            })
        }
    })
}(jQuery));
(function (b) {
    b.fn.appear = function (f, a) {
        var e = b.extend({
            data: undefined,
            one: true,
            accX: 0,
            accY: 0
        }, a);
        return this.each(function () {
            var d = b(this);
            d.appeared = false;
            if (!f) {
                d.trigger("appear", e.data);
                return
            }
            var j = b(window);
            var i = function () {
                if (!d.is(":visible")) {
                    d.appeared = false;
                    return
                }
                var A = j.scrollLeft();
                var y = j.scrollTop();
                var h = d.offset();
                var u = h.left;
                var g = h.top;
                var o = e.accX;
                var v = e.accY;
                var z = d.height();
                var B = j.height();
                var w = d.width();
                var x = j.width();
                if (g + z + v >= y && g <= y + B + v && u + w + o >= A && u <= A + x + o) {
                    if (!d.appeared) {
                        d.trigger("appear", e.data)
                    }
                } else {
                    d.appeared = false
                }
            };
            var c = function () {
                d.appeared = true;
                if (e.one) {
                    j.unbind("scroll", i);
                    var g = b.inArray(i, b.fn.appear.checks);
                    if (g >= 0) {
                        b.fn.appear.checks.splice(g, 1)
                    }
                }
                f.apply(this, arguments)
            };
            if (e.one) {
                d.one("appear", e.data, c)
            } else {
                d.bind("appear", e.data, c)
            }
            j.scroll(i);
            b.fn.appear.checks.push(i);
            (i)()
        })
    };
    b.extend(b.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function () {
            var a = b.fn.appear.checks.length;
            if (a > 0) {
                while (a--) {
                    (b.fn.appear.checks[a])()
                }
            }
        },
        run: function () {
            if (b.fn.appear.timeout) {
                clearTimeout(b.fn.appear.timeout)
            }
            b.fn.appear.timeout = setTimeout(b.fn.appear.checkAll, 20)
        }
    });
    b.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (f, a) {
        var e = b.fn[a];
        if (e) {
            b.fn[a] = function () {
                var c = e.apply(this, arguments);
                b.fn.appear.run();
                return c
            }
        }
    })
})(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (d, j, b, i, c) {
        return jQuery.easing[jQuery.easing.def](d, j, b, i, c)
    },
    easeInQuad: function (d, j, b, i, c) {
        return i * (j /= c) * j + b
    },
    easeOutQuad: function (d, j, b, i, c) {
        return -i * (j /= c) * (j - 2) + b
    },
    easeInOutQuad: function (d, j, b, i, c) {
        if ((j /= c / 2) < 1) {
            return i / 2 * j * j + b
        }
        return -i / 2 * ((--j) * (j - 2) - 1) + b
    },
    easeInCubic: function (d, j, b, i, c) {
        return i * (j /= c) * j * j + b
    },
    easeOutCubic: function (d, j, b, i, c) {
        return i * ((j = j / c - 1) * j * j + 1) + b
    },
    easeInOutCubic: function (d, j, b, i, c) {
        if ((j /= c / 2) < 1) {
            return i / 2 * j * j * j + b
        }
        return i / 2 * ((j -= 2) * j * j + 2) + b
    },
    easeInQuart: function (d, j, b, i, c) {
        return i * (j /= c) * j * j * j + b
    },
    easeOutQuart: function (d, j, b, i, c) {
        return -i * ((j = j / c - 1) * j * j * j - 1) + b
    },
    easeInOutQuart: function (d, j, b, i, c) {
        if ((j /= c / 2) < 1) {
            return i / 2 * j * j * j * j + b
        }
        return -i / 2 * ((j -= 2) * j * j * j - 2) + b
    },
    easeInQuint: function (d, j, b, i, c) {
        return i * (j /= c) * j * j * j * j + b
    },
    easeOutQuint: function (d, j, b, i, c) {
        return i * ((j = j / c - 1) * j * j * j * j + 1) + b
    },
    easeInOutQuint: function (d, j, b, i, c) {
        if ((j /= c / 2) < 1) {
            return i / 2 * j * j * j * j * j + b
        }
        return i / 2 * ((j -= 2) * j * j * j * j + 2) + b
    },
    easeInSine: function (d, j, b, i, c) {
        return -i * Math.cos(j / c * (Math.PI / 2)) + i + b
    },
    easeOutSine: function (d, j, b, i, c) {
        return i * Math.sin(j / c * (Math.PI / 2)) + b
    },
    easeInOutSine: function (d, j, b, i, c) {
        return -i / 2 * (Math.cos(Math.PI * j / c) - 1) + b
    },
    easeInExpo: function (d, j, b, i, c) {
        return (j == 0) ? b : i * Math.pow(2, 10 * (j / c - 1)) + b
    },
    easeOutExpo: function (d, j, b, i, c) {
        return (j == c) ? b + i : i * (-Math.pow(2, -10 * j / c) + 1) + b
    },
    easeInOutExpo: function (d, j, b, i, c) {
        if (j == 0) {
            return b
        }
        if (j == c) {
            return b + i
        }
        if ((j /= c / 2) < 1) {
            return i / 2 * Math.pow(2, 10 * (j - 1)) + b
        }
        return i / 2 * (-Math.pow(2, -10 * --j) + 2) + b
    },
    easeInCirc: function (d, j, b, i, c) {
        return -i * (Math.sqrt(1 - (j /= c) * j) - 1) + b
    },
    easeOutCirc: function (d, j, b, i, c) {
        return i * Math.sqrt(1 - (j = j / c - 1) * j) + b
    },
    easeInOutCirc: function (d, j, b, i, c) {
        if ((j /= c / 2) < 1) {
            return -i / 2 * (Math.sqrt(1 - j * j) - 1) + b
        }
        return i / 2 * (Math.sqrt(1 - (j -= 2) * j) + 1) + b
    },
    easeInElastic: function (p, m, c, a, d) {
        var b = 1.70158;
        var n = 0;
        var o = a;
        if (m == 0) {
            return c
        }
        if ((m /= d) == 1) {
            return c + a
        }
        if (!n) {
            n = d * 0.3
        }
        if (o < Math.abs(a)) {
            o = a;
            var b = n / 4
        } else {
            var b = n / (2 * Math.PI) * Math.asin(a / o)
        }
        return -(o * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * d - b) * (2 * Math.PI) / n)) + c
    },
    easeOutElastic: function (p, m, c, a, d) {
        var b = 1.70158;
        var n = 0;
        var o = a;
        if (m == 0) {
            return c
        }
        if ((m /= d) == 1) {
            return c + a
        }
        if (!n) {
            n = d * 0.3
        }
        if (o < Math.abs(a)) {
            o = a;
            var b = n / 4
        } else {
            var b = n / (2 * Math.PI) * Math.asin(a / o)
        }
        return o * Math.pow(2, -10 * m) * Math.sin((m * d - b) * (2 * Math.PI) / n) + a + c
    },
    easeInOutElastic: function (p, m, c, a, d) {
        var b = 1.70158;
        var n = 0;
        var o = a;
        if (m == 0) {
            return c
        }
        if ((m /= d / 2) == 2) {
            return c + a
        }
        if (!n) {
            n = d * (0.3 * 1.5)
        }
        if (o < Math.abs(a)) {
            o = a;
            var b = n / 4
        } else {
            var b = n / (2 * Math.PI) * Math.asin(a / o)
        } if (m < 1) {
            return -0.5 * (o * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * d - b) * (2 * Math.PI) / n)) + c
        }
        return o * Math.pow(2, -10 * (m -= 1)) * Math.sin((m * d - b) * (2 * Math.PI) / n) * 0.5 + a + c
    },
    easeInBack: function (l, k, b, j, d, c) {
        if (c == undefined) {
            c = 1.70158
        }
        return j * (k /= d) * k * ((c + 1) * k - c) + b
    },
    easeOutBack: function (l, k, b, j, d, c) {
        if (c == undefined) {
            c = 1.70158
        }
        return j * ((k = k / d - 1) * k * ((c + 1) * k + c) + 1) + b
    },
    easeInOutBack: function (l, k, b, j, d, c) {
        if (c == undefined) {
            c = 1.70158
        }
        if ((k /= d / 2) < 1) {
            return j / 2 * (k * k * (((c *= (1.525)) + 1) * k - c)) + b
        }
        return j / 2 * ((k -= 2) * k * (((c *= (1.525)) + 1) * k + c) + 2) + b
    },
    easeInBounce: function (d, j, b, i, c) {
        return i - jQuery.easing.easeOutBounce(d, c - j, 0, i, c) + b
    },
    easeOutBounce: function (d, j, b, i, c) {
        if ((j /= c) < (1 / 2.75)) {
            return i * (7.5625 * j * j) + b
        } else {
            if (j < (2 / 2.75)) {
                return i * (7.5625 * (j -= (1.5 / 2.75)) * j + 0.75) + b
            } else {
                if (j < (2.5 / 2.75)) {
                    return i * (7.5625 * (j -= (2.25 / 2.75)) * j + 0.9375) + b
                } else {
                    return i * (7.5625 * (j -= (2.625 / 2.75)) * j + 0.984375) + b
                }
            }
        }
    },
    easeInOutBounce: function (d, j, b, i, c) {
        if (j < c / 2) {
            return jQuery.easing.easeInBounce(d, j * 2, 0, i, c) * 0.5 + b
        }
        return jQuery.easing.easeOutBounce(d, j * 2 - c, 0, i, c) * 0.5 + i * 0.5 + b
    }
});
(function () {
    (function (b) {
        b.easyPieChart = function (o, n) {
            var s, t, m, l, p, a, r, q = this;
            this.el = o;
            this.$el = b(o);
            this.$el.data("easyPieChart", this);
            this.init = function () {
                var c;
                q.options = b.extend({}, b.easyPieChart.defaultOptions, n);
                c = parseInt(q.$el.data("percent"), 10);
                q.percentage = 0;
                q.canvas = b("<canvas width='" + q.options.size + "' height='" + q.options.size + "'></canvas>").get(0);
                q.$el.append(q.canvas);
                if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
                    G_vmlCanvasManager.initElement(q.canvas)
                }
                q.ctx = q.canvas.getContext("2d");
                if (window.devicePixelRatio > 1.5) {
                    b(q.canvas).css({
                        width: q.options.size,
                        height: q.options.size
                    });
                    q.canvas.width *= 2;
                    q.canvas.height *= 2;
                    q.ctx.scale(2, 2)
                }
                q.ctx.translate(q.options.size / 2, q.options.size / 2);
                q.$el.addClass("easyPieChart");
                q.$el.css({
                    width: q.options.size,
                    height: q.options.size,
                    lineHeight: "" + q.options.size + "px"
                });
                q.update(c);
                return q
            };
            this.update = function (c) {
                if (q.options.animate === false) {
                    return m(c)
                } else {
                    return t(q.percentage, c)
                }
            };
            a = function () {
                var c, e, d;
                q.ctx.fillStyle = q.options.scaleColor;
                q.ctx.lineWidth = 1;
                d = [];
                for (c = e = 0; e <= 24; c = ++e) {
                    d.push(s(c))
                }
                return d
            };
            s = function (c) {
                var d;
                d = c % 6 === 0 ? 0 : q.options.size * 0.017;
                q.ctx.save();
                q.ctx.rotate(c * Math.PI / 12);
                q.ctx.fillRect(q.options.size / 2 - d, 0, -q.options.size * 0.05 + d, 1);
                return q.ctx.restore()
            };
            r = function () {
                var c;
                c = q.options.size / 2 - q.options.lineWidth / 2;
                if (q.options.scaleColor !== false) {
                    c -= q.options.size * 0.08
                }
                q.ctx.beginPath();
                q.ctx.arc(0, 0, c, 0, Math.PI * 2, true);
                q.ctx.closePath();
                q.ctx.strokeStyle = q.options.trackColor;
                q.ctx.lineWidth = q.options.lineWidth;
                return q.ctx.stroke()
            };
            p = function () {
                if (q.options.scaleColor !== false) {
                    a()
                }
                if (q.options.trackColor !== false) {
                    return r()
                }
            };
            m = function (d) {
                var c;
                p();
                q.ctx.strokeStyle = b.isFunction(q.options.barColor) ? q.options.barColor(d) : q.options.barColor;
                q.ctx.lineCap = q.options.lineCap;
                q.ctx.lineWidth = q.options.lineWidth;
                c = q.options.size / 2 - q.options.lineWidth / 2;
                if (q.options.scaleColor !== false) {
                    c -= q.options.size * 0.08
                }
                q.ctx.save();
                q.ctx.rotate(-Math.PI / 2);
                q.ctx.beginPath();
                q.ctx.arc(0, 0, c, 0, Math.PI * 2 * d / 100, false);
                q.ctx.stroke();
                return q.ctx.restore()
            };
            t = function (g, c) {
                var d, f, e;
                f = 30;
                e = f * q.options.animate / 1000;
                d = 0;
                q.options.onStart.call(q);
                q.percentage = c;
                if (q.animation) {
                    clearInterval(q.animation);
                    q.animation = false
                }
                return q.animation = setInterval(function () {
                    q.ctx.clearRect(-q.options.size / 2, -q.options.size / 2, q.options.size, q.options.size);
                    p.call(q);
                    m.call(q, [l(d, g, c - g, e)]);
                    d++;
                    if ((d / e) > 1) {
                        clearInterval(q.animation);
                        q.animation = false;
                        return q.options.onStop.call(q)
                    }
                }, 1000 / f)
            };
            l = function (f, g, h, e) {
                var c, d;
                c = function (i) {
                    return Math.pow(i, 2)
                };
                d = function (i) {
                    if (i < 1) {
                        return c(i)
                    } else {
                        return 2 - c((i / 2) * -2 + 2)
                    }
                };
                f /= e / 2;
                return h / 2 * d(f) + g
            };
            return this.init()
        };
        b.easyPieChart.defaultOptions = {
            barColor: "#ef1e25",
            trackColor: "#f2f2f2",
            scaleColor: "#dfe0e0",
            lineCap: "round",
            size: 110,
            lineWidth: 3,
            animate: false,
            onStart: b.noop,
            onStop: b.noop
        };
        b.fn.easyPieChart = function (a) {
            return b.each(this, function (h, f) {
                var g;
                g = b(f);
                if (!g.data("easyPieChart")) {
                    return g.data("easyPieChart", new b.easyPieChart(f, a))
                }
            })
        };
        return void 0
    })(jQuery)
}).call(this);
(function (b) {
    b.fn.fitVids = function (a) {
        var f = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var g = document.createElement("div"),
                h = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
            g.className = "fit-vids-style";
            g.id = "fit-vids-style";
            g.style.display = "none";
            g.innerHTML = "�<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                      					 min-height: 1px;                         }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>";
            h.parentNode.insertBefore(g, h)
        }
        if (a) {
            b.extend(f, a)
        }
        return this.each(function () {
            var d = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            if (f.customSelector) {
                d.push(f.customSelector)
            }
            var c = b(this).find(d.join(","));
            c = c.not("object object");
            c.each(function () {
                var n = b(this);
                if (this.tagName.toLowerCase() === "embed" && n.parent("object").length || n.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                if (n.closest(".flexslider").length > 0) {
                    if (n.closest("ul").height() > 0) {
                        var m = n.closest("ul").height()
                    } else {
                        var m = 500
                    }
                    var e = !isNaN(parseInt(n.closest("li").attr("width"), 10)) ? parseInt(n.closest("li").attr("width"), 10) : n.closest("li").width();
                    var o = m / e
                } else {
                    if (n.closest(".portfolio_images").length > 0) {
                        var e = $j(".portfolio_images").width();
                        if (n.next("img").length > 0) {
                            var m = n.next("img").height()
                        } else {
                            var m = 500
                        }
                        var o = m / e
                    } else {
                        var m = (this.tagName.toLowerCase() === "object" || (n.attr("height") && !isNaN(parseInt(n.attr("height"), 10)))) ? parseInt(n.attr("height"), 10) : n.height(),
                            e = !isNaN(parseInt(n.attr("width"), 10)) ? parseInt(n.attr("width"), 10) : n.parent().width(),
                            o = m / e
                    }
                } if (!n.attr("id")) {
                    var p = "fitvid" + Math.floor(Math.random() * 999999);
                    n.attr("id", p)
                }
                n.wrap('<div class="fluid-width-video-wrapper"></div>');
                b(".fluid-width-video-wrapper").css("padding-top", (o * 100) + "%")
            })
        })
    }
})(jQuery);
(function (b) {
    b.flexslider = function (f, k) {
        var c = b(f),
            t = b.extend({}, b.flexslider.defaults, k),
            p = t.namespace,
            i = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            m = i ? "touchend" : "click",
            h = "vertical" === t.direction,
            e = t.reverse,
            l = 0 < t.itemWidth,
            r = "fade" === t.animation,
            s = "" !== t.asNavFor,
            a = {};
        b.data(f, "flexslider", c);
        a = {
            init: function () {
                c.animating = !1;
                c.currentSlide = t.startAt;
                c.animatingTo = c.currentSlide;
                c.atEnd = 0 === c.currentSlide || c.currentSlide === c.last;
                c.containerSelector = t.selector.substr(0, t.selector.search(" "));
                c.slides = b(t.selector, c);
                c.container = b(c.containerSelector, c);
                c.count = c.slides.length;
                c.syncExists = 0 < b(t.sync).length;
                "slide" === t.animation && (t.animation = "swing");
                c.prop = h ? "top" : "marginLeft";
                c.args = {};
                c.manualPause = !1;
                var n = c,
                    j;
                if (j = !t.video) {
                    if (j = !r) {
                        if (j = t.useCSS) {
                            c: {
                                j = document.createElement("div");
                                var g = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
                                    d;
                                for (d in g) {
                                    if (void 0 !== j.style[g[d]]) {
                                        c.pfx = g[d].replace("Perspective", "").toLowerCase();
                                        c.prop = "-" + c.pfx + "-transform";
                                        j = !0;
                                        break c
                                    }
                                }
                                j = !1
                            }
                        }
                    }
                }
                n.transitions = j;
                "" !== t.controlsContainer && (c.controlsContainer = 0 < b(t.controlsContainer).length && b(t.controlsContainer));
                "" !== t.manualControls && (c.manualControls = 0 < b(t.manualControls).length && b(t.manualControls));
                t.randomize && (c.slides.sort(function () {
                    return Math.round(Math.random()) - 0.5
                }), c.container.empty().append(c.slides));
                c.doMath();
                s && a.asNav.setup();
                c.setup("init");
                t.controlNav && a.controlNav.setup();
                t.directionNav && a.directionNav.setup();
                t.keyboard && (1 === b(c.containerSelector).length || t.multipleKeyboard) && b(document).bind("keyup", function (o) {
                    o = o.keyCode;
                    if (!c.animating && (39 === o || 37 === o)) {
                        o = 39 === o ? c.getTarget("next") : 37 === o ? c.getTarget("prev") : !1, c.flexAnimate(o, t.pauseOnAction)
                    }
                });
                t.mousewheel && c.bind("mousewheel", function (q, u) {
                    q.preventDefault();
                    var o = 0 > u ? c.getTarget("next") : c.getTarget("prev");
                    c.flexAnimate(o, t.pauseOnAction)
                });
                t.pausePlay && a.pausePlay.setup();
                t.slideshow && (t.pauseOnHover && c.hover(function () {
                    !c.manualPlay && !c.manualPause && c.pause()
                }, function () {
                    !c.manualPause && !c.manualPlay && c.play()
                }), 0 < t.initDelay ? setTimeout(c.play, t.initDelay) : c.play());
                i && t.touch && a.touch();
                (!r || r && t.smoothHeight) && b(window).bind("resize focus", a.resize);
                setTimeout(function () {
                    t.start(c)
                }, 200)
            },
            asNav: {
                setup: function () {
                    c.asNav = !0;
                    c.animatingTo = Math.floor(c.currentSlide / c.move);
                    c.currentItem = c.currentSlide;
                    c.slides.removeClass(p + "active-slide").eq(c.currentItem).addClass(p + "active-slide");
                    c.slides.click(function (d) {
                        d.preventDefault();
                        var d = b(this),
                            g = d.index();
                        !b(t.asNavFor).data("flexslider").animating && !d.hasClass("active") && (c.direction = c.currentItem < g ? "next" : "prev", c.flexAnimate(g, t.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function () {
                    c.manualControls ? a.controlNav.setupManual() : a.controlNav.setupPaging()
                },
                setupPaging: function () {
                    var g = 1,
                        j;
                    c.controlNavScaffold = b('<ol class="' + p + "control-nav " + p + ("thumbnails" === t.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
                    if (1 < c.pagingCount) {
                        for (var d = 0; d < c.pagingCount; d++) {
                            j = "thumbnails" === t.controlNav ? '<img src="' + c.slides.eq(d).attr("data-thumb") + '"/>' : "<a>" + g + "</a>", c.controlNavScaffold.append("<li>" + j + "</li>"), g++
                        }
                    }
                    c.controlsContainer ? b(c.controlsContainer).append(c.controlNavScaffold) : c.append(c.controlNavScaffold);
                    a.controlNav.set();
                    a.controlNav.active();
                    c.controlNavScaffold.delegate("a, img", m, function (n) {
                        n.preventDefault();
                        var n = b(this),
                            o = c.controlNav.index(n);
                        n.hasClass(p + "active") || (c.direction = o > c.currentSlide ? "next" : "prev", c.flexAnimate(o, t.pauseOnAction))
                    });
                    i && c.controlNavScaffold.delegate("a", "click touchstart", function (n) {
                        n.preventDefault()
                    })
                },
                setupManual: function () {
                    c.controlNav = c.manualControls;
                    a.controlNav.active();
                    c.controlNav.live(m, function (d) {
                        d.preventDefault();
                        var d = b(this),
                            g = c.controlNav.index(d);
                        d.hasClass(p + "active") || (g > c.currentSlide ? c.direction = "next" : c.direction = "prev", c.flexAnimate(g, t.pauseOnAction))
                    });
                    i && c.controlNav.live("click touchstart", function (d) {
                        d.preventDefault()
                    })
                },
                set: function () {
                    c.controlNav = b("." + p + "control-nav li " + ("thumbnails" === t.controlNav ? "img" : "a"), c.controlsContainer ? c.controlsContainer : c)
                },
                active: function () {
                    c.controlNav.removeClass(p + "active").eq(c.animatingTo).addClass(p + "active")
                },
                update: function (d, g) {
                    1 < c.pagingCount && "add" === d ? c.controlNavScaffold.append(b("<li><a>" + c.count + "</a></li>")) : 1 === c.pagingCount ? c.controlNavScaffold.find("li").remove() : c.controlNav.eq(g).closest("li").remove();
                    a.controlNav.set();
                    1 < c.pagingCount && c.pagingCount !== c.controlNav.length ? c.update(g, d) : a.controlNav.active()
                }
            },
            directionNav: {
                setup: function () {
                    var d = b('<ul class="' + p + 'direction-nav"><li><a class="' + p + 'prev" href="#">' + t.prevText + '</a></li><li><a class="' + p + 'next" href="#">' + t.nextText + "</a></li></ul>");
                    c.controlsContainer ? (b(c.controlsContainer).append(d), c.directionNav = b("." + p + "direction-nav li a", c.controlsContainer)) : (c.append(d), c.directionNav = b("." + p + "direction-nav li a", c));
                    a.directionNav.update();
                    c.directionNav.bind(m, function (g) {
                        g.preventDefault();
                        g = b(this).hasClass(p + "next") ? c.getTarget("next") : c.getTarget("prev");
                        c.flexAnimate(g, t.pauseOnAction)
                    });
                    i && c.directionNav.bind("click touchstart", function (g) {
                        g.preventDefault()
                    })
                },
                update: function () {
                    var d = p + "disabled";
                    1 === c.pagingCount ? c.directionNav.addClass(d) : t.animationLoop ? c.directionNav.removeClass(d) : 0 === c.animatingTo ? c.directionNav.removeClass(d).filter("." + p + "prev").addClass(d) : c.animatingTo === c.last ? c.directionNav.removeClass(d).filter("." + p + "next").addClass(d) : c.directionNav.removeClass(d)
                }
            },
            pausePlay: {
                setup: function () {
                    var d = b('<div class="' + p + 'pauseplay"><a></a></div>');
                    c.controlsContainer ? (c.controlsContainer.append(d), c.pausePlay = b("." + p + "pauseplay a", c.controlsContainer)) : (c.append(d), c.pausePlay = b("." + p + "pauseplay a", c));
                    a.pausePlay.update(t.slideshow ? p + "pause" : p + "play");
                    c.pausePlay.bind(m, function (g) {
                        g.preventDefault();
                        b(this).hasClass(p + "pause") ? (c.manualPause = !0, c.manualPlay = !1, c.pause()) : (c.manualPause = !1, c.manualPlay = !0, c.play())
                    });
                    i && c.pausePlay.bind("click touchstart", function (g) {
                        g.preventDefault()
                    })
                },
                update: function (d) {
                    "play" === d ? c.pausePlay.removeClass(p + "pause").addClass(p + "play").text(t.playText) : c.pausePlay.removeClass(p + "play").addClass(p + "pause").text(t.pauseText)
                }
            },
            touch: function () {
                function j(x) {
                    o = h ? w - x.touches[0].pageY : w - x.touches[0].pageX;
                    q = h ? Math.abs(o) < Math.abs(x.touches[0].pageX - d) : Math.abs(o) < Math.abs(x.touches[0].pageY - d);
                    if (!q || 500 < Number(new Date) - n) {
                        x.preventDefault(), !r && c.transitions && (t.animationLoop || (o /= 0 === c.currentSlide && 0 > o || c.currentSlide === c.last && 0 < o ? Math.abs(o) / g + 2 : 1), c.setProps(u + o, "setTouch"))
                    }
                }

                function v() {
                    f.removeEventListener("touchmove", j, !1);
                    if (c.animatingTo === c.currentSlide && !q && null !== o) {
                        var x = e ? -o : o,
                            y = 0 < x ? c.getTarget("next") : c.getTarget("prev");
                        c.canAdvance(y) && (550 > Number(new Date) - n && 50 < Math.abs(x) || Math.abs(x) > g / 2) ? c.flexAnimate(y, t.pauseOnAction) : r || c.flexAnimate(c.currentSlide, t.pauseOnAction, !0)
                    }
                    f.removeEventListener("touchend", v, !1);
                    u = o = d = w = null
                }
                var w, d, u, g, o, n, q = !1;
                f.addEventListener("touchstart", function (x) {
                    c.animating ? x.preventDefault() : 1 === x.touches.length && (c.pause(), g = h ? c.h : c.w, n = Number(new Date), u = l && e && c.animatingTo === c.last ? 0 : l && e ? c.limit - (c.itemW + t.itemMargin) * c.move * c.animatingTo : l && c.currentSlide === c.last ? c.limit : l ? (c.itemW + t.itemMargin) * c.move * c.currentSlide : e ? (c.last - c.currentSlide + c.cloneOffset) * g : (c.currentSlide + c.cloneOffset) * g, w = h ? x.touches[0].pageY : x.touches[0].pageX, d = h ? x.touches[0].pageX : x.touches[0].pageY, f.addEventListener("touchmove", j, !1), f.addEventListener("touchend", v, !1))
                }, !1)
            },
            resize: function () {
                !c.animating && c.is(":visible") && (l || c.doMath(), r ? a.smoothHeight() : l ? (c.slides.width(c.computedW), c.update(c.pagingCount), c.setProps()) : h ? (c.viewport.height(c.h), c.setProps(c.h, "setTotal")) : (t.smoothHeight && a.smoothHeight(), c.newSlides.width(c.computedW), c.setProps(c.computedW, "setTotal")))
            },
            smoothHeight: function (d) {
                if (!h || r) {
                    var g = r ? c : c.viewport;
                    d ? g.animate({
                        height: c.slides.eq(c.animatingTo).height()
                    }, d) : g.height(c.slides.eq(c.animatingTo).height())
                }
            },
            sync: function (j) {
                var g = b(t.sync).data("flexslider"),
                    d = c.animatingTo;
                switch (j) {
                case "animate":
                    g.flexAnimate(d, t.pauseOnAction, !1, !0);
                    break;
                case "play":
                    !g.playing && !g.asNav && g.play();
                    break;
                case "pause":
                    g.pause()
                }
            }
        };
        c.flexAnimate = function (d, g, q, o, n) {
            s && 1 === c.pagingCount && (c.direction = c.currentItem < d ? "next" : "prev");
            if (!c.animating && (c.canAdvance(d, n) || q) && c.is(":visible")) {
                if (s && o) {
                    if (q = b(t.asNavFor).data("flexslider"), c.atEnd = 0 === d || d === c.count - 1, q.flexAnimate(d, !0, !1, !0, n), c.direction = c.currentItem < d ? "next" : "prev", q.direction = c.direction, Math.ceil((d + 1) / c.visible) - 1 !== c.currentSlide && 0 !== d) {
                        c.currentItem = d, c.slides.removeClass(p + "active-slide").eq(d).addClass(p + "active-slide"), d = Math.floor(d / c.visible)
                    } else {
                        return c.currentItem = d, c.slides.removeClass(p + "active-slide").eq(d).addClass(p + "active-slide"), !1
                    }
                }
                c.animating = !0;
                c.animatingTo = d;
                t.before(c);
                g && c.pause();
                c.syncExists && !n && a.sync("animate");
                t.controlNav && a.controlNav.active();
                l || c.slides.removeClass(p + "active-slide").eq(d).addClass(p + "active-slide");
                c.atEnd = 0 === d || d === c.last;
                t.directionNav && a.directionNav.update();
                d === c.last && (t.end(c), t.animationLoop || c.pause());
                if (r) {
                    i ? (c.slides.eq(c.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    }), c.slides.eq(d).css({
                        opacity: 1,
                        zIndex: 2
                    }), c.slides.unbind("webkitTransitionEnd transitionend"), c.slides.eq(c.currentSlide).bind("webkitTransitionEnd transitionend", function () {
                        t.after(c)
                    }), c.animating = !1, c.currentSlide = c.animatingTo) : (c.slides.eq(c.currentSlide).fadeOut(t.animationSpeed, t.easing), c.slides.eq(d).fadeIn(t.animationSpeed, t.easing, c.wrapup))
                } else {
                    var j = h ? c.slides.filter(":first").height() : c.computedW;
                    l ? (d = t.itemWidth > c.w ? 2 * t.itemMargin : t.itemMargin, d = (c.itemW + d) * c.move * c.animatingTo, d = d > c.limit && 1 !== c.visible ? c.limit : d) : d = 0 === c.currentSlide && d === c.count - 1 && t.animationLoop && "next" !== c.direction ? e ? (c.count + c.cloneOffset) * j : 0 : c.currentSlide === c.last && 0 === d && t.animationLoop && "prev" !== c.direction ? e ? 0 : (c.count + 1) * j : e ? (c.count - 1 - d + c.cloneOffset) * j : (d + c.cloneOffset) * j;
                    c.setProps(d, "", t.animationSpeed);
                    if (c.transitions) {
                        if (!t.animationLoop || !c.atEnd) {
                            c.animating = !1, c.currentSlide = c.animatingTo
                        }
                        c.container.unbind("webkitTransitionEnd transitionend");
                        c.container.bind("webkitTransitionEnd transitionend", function () {
                            c.wrapup(j)
                        })
                    } else {
                        c.container.animate(c.args, t.animationSpeed, t.easing, function () {
                            c.wrapup(j)
                        })
                    }
                }
                t.smoothHeight && a.smoothHeight(t.animationSpeed)
            }
        };
        c.wrapup = function (d) {
            !r && !l && (0 === c.currentSlide && c.animatingTo === c.last && t.animationLoop ? c.setProps(d, "jumpEnd") : c.currentSlide === c.last && (0 === c.animatingTo && t.animationLoop) && c.setProps(d, "jumpStart"));
            c.animating = !1;
            c.currentSlide = c.animatingTo;
            t.after(c)
        };
        c.animateSlides = function () {
            c.animating || c.flexAnimate(c.getTarget("next"))
        };
        c.pause = function () {
            clearInterval(c.animatedSlides);
            c.playing = !1;
            t.pausePlay && a.pausePlay.update("play");
            c.syncExists && a.sync("pause")
        };
        c.play = function () {
            c.animatedSlides = setInterval(c.animateSlides, t.slideshowSpeed);
            c.playing = !0;
            t.pausePlay && a.pausePlay.update("pause");
            c.syncExists && a.sync("play")
        };
        c.canAdvance = function (d, j) {
            var g = s ? c.pagingCount - 1 : c.last;
            return j ? !0 : s && c.currentItem === c.count - 1 && 0 === d && "prev" === c.direction ? !0 : s && 0 === c.currentItem && d === c.pagingCount - 1 && "next" !== c.direction ? !1 : d === c.currentSlide && !s ? !1 : t.animationLoop ? !0 : c.atEnd && 0 === c.currentSlide && d === g && "next" !== c.direction ? !1 : c.atEnd && c.currentSlide === g && 0 === d && "next" === c.direction ? !1 : !0
        };
        c.getTarget = function (d) {
            c.direction = d;
            return "next" === d ? c.currentSlide === c.last ? 0 : c.currentSlide + 1 : 0 === c.currentSlide ? c.last : c.currentSlide - 1
        };
        c.setProps = function (g, o, d) {
            var n, j = g ? g : (c.itemW + t.itemMargin) * c.move * c.animatingTo;
            n = -1 * function () {
                if (l) {
                    return "setTouch" === o ? g : e && c.animatingTo === c.last ? 0 : e ? c.limit - (c.itemW + t.itemMargin) * c.move * c.animatingTo : c.animatingTo === c.last ? c.limit : j
                }
                switch (o) {
                case "setTotal":
                    return e ? (c.count - 1 - c.currentSlide + c.cloneOffset) * g : (c.currentSlide + c.cloneOffset) * g;
                case "setTouch":
                    return g;
                case "jumpEnd":
                    return e ? g : c.count * g;
                case "jumpStart":
                    return e ? c.count * g : g;
                default:
                    return g
                }
            }() + "px";
            c.transitions && (n = h ? "translate3d(0," + n + ",0)" : "translate3d(" + n + ",0,0)", d = void 0 !== d ? d / 1000 + "s" : "0s", c.container.css("-" + c.pfx + "-transition-duration", d));
            c.args[c.prop] = n;
            (c.transitions || void 0 === d) && c.container.css(c.args)
        };
        c.setup = function (g) {
            if (r) {
                c.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                }), "init" === g && (i ? c.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + t.animationSpeed / 1000 + "s ease",
                    zIndex: 1
                }).eq(c.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : c.slides.eq(c.currentSlide).fadeIn(t.animationSpeed, t.easing)), t.smoothHeight && a.smoothHeight()
            } else {
                var j, d;
                "init" === g && (c.viewport = b('<div class="' + p + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(c).append(c.container), c.cloneCount = 0, c.cloneOffset = 0, e && (d = b.makeArray(c.slides).reverse(), c.slides = b(d), c.container.empty().append(c.slides)));
                t.animationLoop && !l && (c.cloneCount = 2, c.cloneOffset = 1, "init" !== g && c.container.find(".clone").remove(), c.container.append(c.slides.first().clone().addClass("clone")).prepend(c.slides.last().clone().addClass("clone")));
                c.newSlides = b(t.selector, c);
                j = e ? c.count - 1 - c.currentSlide + c.cloneOffset : c.currentSlide + c.cloneOffset;
                h && !l ? (c.container.height(200 * (c.count + c.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    c.newSlides.css({
                        display: "block"
                    });
                    c.doMath();
                    c.viewport.height(c.h);
                    c.setProps(j * c.h, "init")
                }, "init" === g ? 100 : 0)) : (c.container.width(200 * (c.count + c.cloneCount) + "%"), c.setProps(j * c.computedW, "init"), setTimeout(function () {
                    c.doMath();
                    c.newSlides.css({
                        width: c.computedW,
                        "float": "left",
                        display: "block"
                    });
                    t.smoothHeight && a.smoothHeight()
                }, "init" === g ? 100 : 0))
            }
            l || c.slides.removeClass(p + "active-slide").eq(c.currentSlide).addClass(p + "active-slide")
        };
        c.doMath = function () {
            var g = c.slides.first(),
                d = t.itemMargin,
                n = t.minItems,
                j = t.maxItems;
            c.w = c.width();
            c.h = g.height();
            c.boxPadding = g.outerWidth() - g.width();
            l ? (c.itemT = t.itemWidth + d, c.minW = n ? n * c.itemT : c.w, c.maxW = j ? j * c.itemT : c.w, c.itemW = c.minW > c.w ? (c.w - d * n) / n : c.maxW < c.w ? (c.w - d * j) / j : t.itemWidth > c.w ? c.w : t.itemWidth, c.visible = Math.floor(c.w / (c.itemW + d)), c.move = 0 < t.move && t.move < c.visible ? t.move : c.visible, c.pagingCount = Math.ceil((c.count - c.visible) / c.move + 1), c.last = c.pagingCount - 1, c.limit = 1 === c.pagingCount ? 0 : t.itemWidth > c.w ? (c.itemW + 2 * d) * c.count - c.w - d : (c.itemW + d) * c.count - c.w - d) : (c.itemW = c.w, c.pagingCount = c.count, c.last = c.count - 1);
            c.computedW = c.itemW - c.boxPadding
        };
        c.update = function (d, g) {
            c.doMath();
            l || (d < c.currentSlide ? c.currentSlide += 1 : d <= c.currentSlide && 0 !== d && (c.currentSlide -= 1), c.animatingTo = c.currentSlide);
            if (t.controlNav && !c.manualControls) {
                if ("add" === g && !l || c.pagingCount > c.controlNav.length) {
                    a.controlNav.update("add")
                } else {
                    if ("remove" === g && !l || c.pagingCount < c.controlNav.length) {
                        l && c.currentSlide > c.last && (c.currentSlide -= 1, c.animatingTo -= 1), a.controlNav.update("remove", c.last)
                    }
                }
            }
            t.directionNav && a.directionNav.update()
        };
        c.addSlide = function (g, d) {
            var j = b(g);
            c.count += 1;
            c.last = c.count - 1;
            h && e ? void 0 !== d ? c.slides.eq(c.count - d).after(j) : c.container.prepend(j) : void 0 !== d ? c.slides.eq(d).before(j) : c.container.append(j);
            c.update(d, "add");
            c.slides = b(t.selector + ":not(.clone)", c);
            c.setup();
            t.added(c)
        };
        c.removeSlide = function (d) {
            var g = isNaN(d) ? c.slides.index(b(d)) : d;
            c.count -= 1;
            c.last = c.count - 1;
            isNaN(d) ? b(d, c.slides).remove() : h && e ? c.slides.eq(c.last).remove() : c.slides.eq(d).remove();
            c.doMath();
            c.update(g, "remove");
            c.slides = b(t.selector + ":not(.clone)", c);
            c.setup();
            t.removed(c)
        };
        a.init()
    };
    b.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 0,
        maxItems: 0,
        move: 0,
        start: function () {},
        before: function () {},
        after: function () {},
        end: function () {},
        added: function () {},
        removed: function () {}
    };
    b.fn.flexslider = function (d) {
        void 0 === d && (d = {});
        if ("object" === typeof d) {
            return this.each(function () {
                var c = b(this),
                    f = c.find(d.selector ? d.selector : ".slides > li");
                1 === f.length ? (f.fadeIn(400), d.start && d.start(c)) : void 0 == c.data("flexslider") && new b.flexslider(this, d)
            })
        }
        var a = b(this).data("flexslider");
        switch (d) {
        case "play":
            a.play();
            break;
        case "pause":
            a.pause();
            break;
        case "next":
            a.flexAnimate(a.getTarget("next"), !0);
            break;
        case "prev":
        case "previous":
            a.flexAnimate(a.getTarget("prev"), !0);
            break;
        default:
            "number" === typeof d && a.flexAnimate(d, !0)
        }
    }
})(jQuery);
(function (i) {
    var g = {};
    g.fileapi = i("<input type='file'/>").get(0).files !== undefined;
    g.formdata = window.FormData !== undefined;
    i.fn.ajaxSubmit = function (V) {
        if (!this.length) {
            j("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var T, S, I, P = this;
        if (typeof V == "function") {
            V = {
                success: V
            }
        }
        T = this.attr("method");
        S = this.attr("action");
        I = (typeof S === "string") ? i.trim(S) : "";
        I = I || window.location.href || "";
        if (I) {
            I = (I.match(/^([^#]+)/) || [])[1]
        }
        V = i.extend(true, {
            url: I,
            success: i.ajaxSettings.success,
            type: T || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, V);
        var Q = {};
        this.trigger("form-pre-serialize", [this, V, Q]);
        if (Q.veto) {
            j("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (V.beforeSerialize && V.beforeSerialize(this, V) === false) {
            j("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var L = V.traditional;
        if (L === undefined) {
            L = i.ajaxSettings.traditional
        }
        var k = [];
        var b, e = this.formToArray(V.semantic, k);
        if (V.data) {
            V.extraData = V.data;
            b = i.param(V.data, L)
        }
        if (V.beforeSubmit && V.beforeSubmit(e, this, V) === false) {
            j("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [e, this, V, Q]);
        if (Q.veto) {
            j("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var F = i.param(e, L);
        if (b) {
            F = (F ? (F + "&" + b) : b)
        }
        if (V.type.toUpperCase() == "GET") {
            V.url += (V.url.indexOf("?") >= 0 ? "&" : "?") + F;
            V.data = null
        } else {
            V.data = F
        }
        var G = [];
        if (V.resetForm) {
            G.push(function () {
                P.resetForm()
            })
        }
        if (V.clearForm) {
            G.push(function () {
                P.clearForm(V.includeHidden)
            })
        }
        if (!V.dataType && V.target) {
            var J = V.success || function () {};
            G.push(function (l) {
                var m = V.replaceTarget ? "replaceWith" : "html";
                i(V.target)[m](l).each(J, arguments)
            })
        } else {
            if (V.success) {
                G.push(V.success)
            }
        }
        V.success = function (l, n, o) {
            var m = V.context || this;
            for (var p = 0, r = G.length; p < r; p++) {
                G[p].apply(m, [l, n, o || P, P])
            }
        };
        var N = i('input[type=file]:enabled[value!=""]', this);
        var c = N.length > 0;
        var q = "multipart/form-data";
        var R = (P.attr("enctype") == q || P.attr("encoding") == q);
        var M = g.fileapi && g.formdata;
        j("fileAPI :" + M);
        var a = (c || R) && !M;
        var K;
        if (V.iframe !== false && (V.iframe || a)) {
            if (V.closeKeepAlive) {
                i.get(V.closeKeepAlive, function () {
                    K = O(e)
                })
            } else {
                K = O(e)
            }
        } else {
            if ((c || R) && M) {
                K = d(e)
            } else {
                K = i.ajax(V)
            }
        }
        P.removeData("jqxhr").data("jqxhr", K);
        for (var U = 0; U < k.length; U++) {
            k[U] = null
        }
        this.trigger("form-submit-notify", [this, V]);
        return this;

        function H(m) {
            var n = i.param(m).split("&");
            var l = n.length;
            var r = [];
            var p, o;
            for (p = 0; p < l; p++) {
                n[p] = n[p].replace(/\+/g, " ");
                o = n[p].split("=");
                r.push([decodeURIComponent(o[0]), decodeURIComponent(o[1])])
            }
            return r
        }

        function d(n) {
            var m = new FormData();
            for (var r = 0; r < n.length; r++) {
                m.append(n[r].name, n[r].value)
            }
            if (V.extraData) {
                var o = H(V.extraData);
                for (r = 0; r < o.length; r++) {
                    if (o[r]) {
                        m.append(o[r][0], o[r][1])
                    }
                }
            }
            V.data = null;
            var l = i.extend(true, {}, i.ajaxSettings, V, {
                contentType: false,
                processData: false,
                cache: false,
                type: T || "POST"
            });
            if (V.uploadProgress) {
                l.xhr = function () {
                    var s = jQuery.ajaxSettings.xhr();
                    if (s.upload) {
                        s.upload.addEventListener("progress", function (t) {
                            var u = 0;
                            var v = t.loaded || t.position;
                            var w = t.total;
                            if (t.lengthComputable) {
                                u = Math.ceil(v / w * 100)
                            }
                            V.uploadProgress(t, v, w, u)
                        }, false)
                    }
                    return s
                }
            }
            l.data = null;
            var p = l.beforeSend;
            l.beforeSend = function (t, s) {
                s.data = m;
                if (p) {
                    p.call(this, t, s)
                }
            };
            return i.ajax(l)
        }

        function O(l) {
            var al = P[0],
                ad, u, t, ai, ap, E, r, A, C, v, ak, o;
            var n = !! i.fn.prop;
            var m = i.Deferred();
            if (l) {
                for (u = 0; u < k.length; u++) {
                    ad = i(k[u]);
                    if (n) {
                        ad.prop("disabled", false)
                    } else {
                        ad.removeAttr("disabled")
                    }
                }
            }
            t = i.extend(true, {}, i.ajaxSettings, V);
            t.context = t.context || t;
            ap = "jqFormIO" + (new Date().getTime());
            if (t.iframeTarget) {
                E = i(t.iframeTarget);
                v = E.attr("name");
                if (!v) {
                    E.attr("name", ap)
                } else {
                    ap = v
                }
            } else {
                E = i('<iframe name="' + ap + '" src="' + t.iframeSrc + '" />');
                E.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })
            }
            r = E[0];
            A = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function () {},
                getResponseHeader: function () {},
                setRequestHeader: function () {},
                abort: function (W) {
                    var Y = (W === "timeout" ? "timeout" : "aborted");
                    j("aborting upload... " + Y);
                    this.aborted = 1;
                    try {
                        if (r.contentWindow.document.execCommand) {
                            r.contentWindow.document.execCommand("Stop")
                        }
                    } catch (X) {}
                    E.attr("src", t.iframeSrc);
                    A.error = Y;
                    if (t.error) {
                        t.error.call(t.context, A, Y, W)
                    }
                    if (ai) {
                        i.event.trigger("ajaxError", [A, t, Y])
                    }
                    if (t.complete) {
                        t.complete.call(t.context, A, Y)
                    }
                }
            };
            ai = t.global;
            if (ai && 0 === i.active++) {
                i.event.trigger("ajaxStart")
            }
            if (ai) {
                i.event.trigger("ajaxSend", [A, t])
            }
            if (t.beforeSend && t.beforeSend.call(t.context, A, t) === false) {
                if (t.global) {
                    i.active--
                }
                m.reject();
                return m
            }
            if (A.aborted) {
                m.reject();
                return m
            }
            C = al.clk;
            if (C) {
                v = C.name;
                if (v && !C.disabled) {
                    t.extraData = t.extraData || {};
                    t.extraData[v] = C.value;
                    if (C.type == "image") {
                        t.extraData[v + ".x"] = al.clk_x;
                        t.extraData[v + ".y"] = al.clk_y
                    }
                }
            }
            var p = 1;
            var z = 2;

            function ao(X) {
                var W = X.contentWindow ? X.contentWindow.document : X.contentDocument ? X.contentDocument : X.document;
                return W
            }
            var w = i("meta[name=csrf-token]").attr("content");
            var x = i("meta[name=csrf-param]").attr("content");
            if (x && w) {
                t.extraData = t.extraData || {};
                t.extraData[x] = w
            }

            function B() {
                var aa = P.attr("target"),
                    Z = P.attr("action");
                al.setAttribute("target", ap);
                if (!T) {
                    al.setAttribute("method", "POST")
                }
                if (Z != t.url) {
                    al.setAttribute("action", t.url)
                }
                if (!t.skipEncodingOverride && (!T || /post/i.test(T))) {
                    P.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    })
                }
                if (t.timeout) {
                    o = setTimeout(function () {
                        ak = true;
                        s(p)
                    }, t.timeout)
                }

                function X() {
                    try {
                        var ac = ao(r).readyState;
                        j("state = " + ac);
                        if (ac && ac.toLowerCase() == "uninitialized") {
                            setTimeout(X, 50)
                        }
                    } catch (ae) {
                        j("Server abort: ", ae, " (", ae.name, ")");
                        s(z);
                        if (o) {
                            clearTimeout(o)
                        }
                        o = undefined
                    }
                }
                var Y = [];
                try {
                    if (t.extraData) {
                        for (var W in t.extraData) {
                            if (t.extraData.hasOwnProperty(W)) {
                                if (i.isPlainObject(t.extraData[W]) && t.extraData[W].hasOwnProperty("name") && t.extraData[W].hasOwnProperty("value")) {
                                    Y.push(i('<input type="hidden" name="' + t.extraData[W].name + '">').val(t.extraData[W].value).appendTo(al)[0])
                                } else {
                                    Y.push(i('<input type="hidden" name="' + W + '">').val(t.extraData[W]).appendTo(al)[0])
                                }
                            }
                        }
                    }
                    if (!t.iframeTarget) {
                        E.appendTo("body");
                        if (r.attachEvent) {
                            r.attachEvent("onload", s)
                        } else {
                            r.addEventListener("load", s, false)
                        }
                    }
                    setTimeout(X, 15);
                    var ab = document.createElement("form").submit;
                    ab.apply(al)
                } finally {
                    al.setAttribute("action", Z);
                    if (aa) {
                        al.setAttribute("target", aa)
                    } else {
                        P.removeAttr("target")
                    }
                    i(Y).remove()
                }
            }
            if (t.forceSync) {
                B()
            } else {
                setTimeout(B, 10)
            }
            var y, an, ah = 50,
                D;

            function s(af) {
                if (A.aborted || D) {
                    return
                }
                try {
                    an = ao(r)
                } catch (ag) {
                    j("cannot access response document: ", ag);
                    af = z
                }
                if (af === p && A) {
                    A.abort("timeout");
                    m.reject(A, "timeout");
                    return
                } else {
                    if (af == z && A) {
                        A.abort("server abort");
                        m.reject(A, "error", "server abort");
                        return
                    }
                } if (!an || an.location.href == t.iframeSrc) {
                    if (!ak) {
                        return
                    }
                }
                if (r.detachEvent) {
                    r.detachEvent("onload", s)
                } else {
                    r.removeEventListener("load", s, false)
                }
                var aa = "success",
                    ab;
                try {
                    if (ak) {
                        throw "timeout"
                    }
                    var ac = t.dataType == "xml" || an.XMLDocument || i.isXMLDoc(an);
                    j("isXml=" + ac);
                    if (!ac && window.opera && (an.body === null || !an.body.innerHTML)) {
                        if (--ah) {
                            j("requeing onLoad callback, DOM not available");
                            setTimeout(s, 250);
                            return
                        }
                    }
                    var Y = an.body ? an.body : an.documentElement;
                    A.responseText = Y ? Y.innerHTML : null;
                    A.responseXML = an.XMLDocument ? an.XMLDocument : an;
                    if (ac) {
                        t.dataType = "xml"
                    }
                    A.getResponseHeader = function (aw) {
                        var av = {
                            "content-type": t.dataType
                        };
                        return av[aw]
                    };
                    if (Y) {
                        A.status = Number(Y.getAttribute("status")) || A.status;
                        A.statusText = Y.getAttribute("statusText") || A.statusText
                    }
                    var Z = (t.dataType || "").toLowerCase();
                    var W = /(json|script|text)/.test(Z);
                    if (W || t.textarea) {
                        var ae = an.getElementsByTagName("textarea")[0];
                        if (ae) {
                            A.responseText = ae.value;
                            A.status = Number(ae.getAttribute("status")) || A.status;
                            A.statusText = ae.getAttribute("statusText") || A.statusText
                        } else {
                            if (W) {
                                var X = an.getElementsByTagName("pre")[0];
                                var ar = an.getElementsByTagName("body")[0];
                                if (X) {
                                    A.responseText = X.textContent ? X.textContent : X.innerText
                                } else {
                                    if (ar) {
                                        A.responseText = ar.textContent ? ar.textContent : ar.innerText
                                    }
                                }
                            }
                        }
                    } else {
                        if (Z == "xml" && !A.responseXML && A.responseText) {
                            A.responseXML = aq(A.responseText)
                        }
                    }
                    try {
                        y = aj(A, Z, t)
                    } catch (af) {
                        aa = "parsererror";
                        A.error = ab = (af || aa)
                    }
                } catch (af) {
                    j("error caught: ", af);
                    aa = "error";
                    A.error = ab = (af || aa)
                }
                if (A.aborted) {
                    j("upload aborted");
                    aa = null
                }
                if (A.status) {
                    aa = (A.status >= 200 && A.status < 300 || A.status === 304) ? "success" : "error"
                }
                if (aa === "success") {
                    if (t.success) {
                        t.success.call(t.context, y, "success", A)
                    }
                    m.resolve(A.responseText, "success", A);
                    if (ai) {
                        i.event.trigger("ajaxSuccess", [A, t])
                    }
                } else {
                    if (aa) {
                        if (ab === undefined) {
                            ab = A.statusText
                        }
                        if (t.error) {
                            t.error.call(t.context, A, aa, ab)
                        }
                        m.reject(A, "error", ab);
                        if (ai) {
                            i.event.trigger("ajaxError", [A, t, ab])
                        }
                    }
                } if (ai) {
                    i.event.trigger("ajaxComplete", [A, t])
                }
                if (ai && !--i.active) {
                    i.event.trigger("ajaxStop")
                }
                if (t.complete) {
                    t.complete.call(t.context, A, aa)
                }
                D = true;
                if (t.timeout) {
                    clearTimeout(o)
                }
                setTimeout(function () {
                    if (!t.iframeTarget) {
                        E.remove()
                    }
                    A.responseXML = null
                }, 100)
            }
            var aq = i.parseXML || function (W, X) {
                    if (window.ActiveXObject) {
                        X = new ActiveXObject("Microsoft.XMLDOM");
                        X.async = "false";
                        X.loadXML(W)
                    } else {
                        X = (new DOMParser()).parseFromString(W, "text/xml")
                    }
                    return (X && X.documentElement && X.documentElement.nodeName != "parsererror") ? X : null
                };
            var am = i.parseJSON || function (W) {
                    return window["eval"]("(" + W + ")")
                };
            var aj = function (aa, W, Z) {
                var ab = aa.getResponseHeader("content-type") || "",
                    X = W === "xml" || !W && ab.indexOf("xml") >= 0,
                    Y = X ? aa.responseXML : aa.responseText;
                if (X && Y.documentElement.nodeName === "parsererror") {
                    if (i.error) {
                        i.error("parsererror")
                    }
                }
                if (Z && Z.dataFilter) {
                    Y = Z.dataFilter(Y, W)
                }
                if (typeof Y === "string") {
                    if (W === "json" || !W && ab.indexOf("json") >= 0) {
                        Y = am(Y)
                    } else {
                        if (W === "script" || !W && ab.indexOf("javascript") >= 0) {
                            i.globalEval(Y)
                        }
                    }
                }
                return Y
            };
            return m
        }
    };
    i.fn.ajaxForm = function (a) {
        a = a || {};
        a.delegation = a.delegation && i.isFunction(i.fn.on);
        if (!a.delegation && this.length === 0) {
            var b = {
                s: this.selector,
                c: this.context
            };
            if (!i.isReady && b.s) {
                j("DOM not ready, queuing ajaxForm");
                i(function () {
                    i(b.s, b.c).ajaxForm(a)
                });
                return this
            }
            j("terminating; zero elements found by selector" + (i.isReady ? "" : " (DOM not ready)"));
            return this
        }
        if (a.delegation) {
            i(document).off("submit.form-plugin", this.selector, h).off("click.form-plugin", this.selector, f).on("submit.form-plugin", this.selector, a, h).on("click.form-plugin", this.selector, a, f);
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", a, h).bind("click.form-plugin", a, f)
    };

    function h(a) {
        var b = a.data;
        if (!a.isDefaultPrevented()) {
            a.preventDefault();
            i(this).ajaxSubmit(b)
        }
    }

    function f(e) {
        var d = e.target;
        var l = i(d);
        if (!(l.is("[type=submit],[type=image]"))) {
            var b = l.closest("[type=submit]");
            if (b.length === 0) {
                return
            }
            d = b[0]
        }
        var c = this;
        c.clk = d;
        if (d.type == "image") {
            if (e.offsetX !== undefined) {
                c.clk_x = e.offsetX;
                c.clk_y = e.offsetY
            } else {
                if (typeof i.fn.offset == "function") {
                    var a = l.offset();
                    c.clk_x = e.pageX - a.left;
                    c.clk_y = e.pageY - a.top
                } else {
                    c.clk_x = e.pageX - d.offsetLeft;
                    c.clk_y = e.pageY - d.offsetTop
                }
            }
        }
        setTimeout(function () {
            c.clk = c.clk_x = c.clk_y = null
        }, 100)
    }
    i.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    i.fn.formToArray = function (D, E) {
        var b = [];
        if (this.length === 0) {
            return b
        }
        var n = this[0];
        var a = D ? n.getElementsByTagName("*") : n.elements;
        if (!a) {
            return b
        }
        var z, e, A, d, c, F, C;
        for (z = 0, F = a.length; z < F; z++) {
            c = a[z];
            A = c.name;
            if (!A) {
                continue
            }
            if (D && n.clk && c.type == "image") {
                if (!c.disabled && n.clk == c) {
                    b.push({
                        name: A,
                        value: i(c).val(),
                        type: c.type
                    });
                    b.push({
                        name: A + ".x",
                        value: n.clk_x
                    }, {
                        name: A + ".y",
                        value: n.clk_y
                    })
                }
                continue
            }
            d = i.fieldValue(c, true);
            if (d && d.constructor == Array) {
                if (E) {
                    E.push(c)
                }
                for (e = 0, C = d.length; e < C; e++) {
                    b.push({
                        name: A,
                        value: d[e]
                    })
                }
            } else {
                if (g.fileapi && c.type == "file" && !c.disabled) {
                    if (E) {
                        E.push(c)
                    }
                    var y = c.files;
                    if (y.length) {
                        for (e = 0; e < y.length; e++) {
                            b.push({
                                name: A,
                                value: y[e],
                                type: c.type
                            })
                        }
                    } else {
                        b.push({
                            name: A,
                            value: "",
                            type: c.type
                        })
                    }
                } else {
                    if (d !== null && typeof d != "undefined") {
                        if (E) {
                            E.push(c)
                        }
                        b.push({
                            name: A,
                            value: d,
                            type: c.type,
                            required: c.required
                        })
                    }
                }
            }
        }
        if (!D && n.clk) {
            var B = i(n.clk),
                v = B[0];
            A = v.name;
            if (A && !v.disabled && v.type == "image") {
                b.push({
                    name: A,
                    value: B.val()
                });
                b.push({
                    name: A + ".x",
                    value: n.clk_x
                }, {
                    name: A + ".y",
                    value: n.clk_y
                })
            }
        }
        return b
    };
    i.fn.formSerialize = function (a) {
        return i.param(this.formToArray(a))
    };
    i.fn.fieldSerialize = function (a) {
        var b = [];
        this.each(function () {
            var m = this.name;
            if (!m) {
                return
            }
            var d = i.fieldValue(this, a);
            if (d && d.constructor == Array) {
                for (var c = 0, e = d.length; c < e; c++) {
                    b.push({
                        name: m,
                        value: d[c]
                    })
                }
            } else {
                if (d !== null && typeof d != "undefined") {
                    b.push({
                        name: this.name,
                        value: d
                    })
                }
            }
        });
        return i.param(b)
    };
    i.fn.fieldValue = function (b) {
        for (var a = [], m = 0, d = this.length; m < d; m++) {
            var e = this[m];
            var c = i.fieldValue(e, b);
            if (c === null || typeof c == "undefined" || (c.constructor == Array && !c.length)) {
                continue
            }
            if (c.constructor == Array) {
                i.merge(a, c)
            } else {
                a.push(c)
            }
        }
        return a
    };
    i.fieldValue = function (e, A) {
        var t = e.name,
            n = e.type,
            x = e.tagName.toLowerCase();
        if (A === undefined) {
            A = true
        }
        if (A && (!t || e.disabled || n == "reset" || n == "button" || (n == "checkbox" || n == "radio") && !e.checked || (n == "submit" || n == "image") && e.form && e.form.clk != e || x == "select" && e.selectedIndex == -1)) {
            return null
        }
        if (x == "select") {
            var y = e.selectedIndex;
            if (y < 0) {
                return null
            }
            var a = [],
                b = e.options;
            var v = (n == "select-one");
            var w = (v ? y + 1 : b.length);
            for (var d = (v ? y : 0); d < w; d++) {
                var c = b[d];
                if (c.selected) {
                    var z = c.value;
                    if (!z) {
                        z = (c.attributes && c.attributes.value && !(c.attributes.value.specified)) ? c.text : c.value
                    }
                    if (v) {
                        return z
                    }
                    a.push(z)
                }
            }
            return a
        }
        return i(e).val()
    };
    i.fn.clearForm = function (a) {
        return this.each(function () {
            i("input,select,textarea", this).clearFields(a)
        })
    };
    i.fn.clearFields = i.fn.clearInputs = function (a) {
        var b = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var c = this.type,
                d = this.tagName.toLowerCase();
            if (b.test(c) || d == "textarea") {
                this.value = ""
            } else {
                if (c == "checkbox" || c == "radio") {
                    this.checked = false
                } else {
                    if (d == "select") {
                        this.selectedIndex = -1
                    } else {
                        if (c == "file") {
                            if (/MSIE/.test(navigator.userAgent)) {
                                i(this).replaceWith(i(this).clone())
                            } else {
                                i(this).val("")
                            }
                        } else {
                            if (a) {
                                if ((a === true && /hidden/.test(c)) || (typeof a == "string" && i(this).is(a))) {
                                    this.value = ""
                                }
                            }
                        }
                    }
                }
            }
        })
    };
    i.fn.resetForm = function () {
        return this.each(function () {
            if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                this.reset()
            }
        })
    };
    i.fn.enable = function (a) {
        if (a === undefined) {
            a = true
        }
        return this.each(function () {
            this.disabled = !a
        })
    };
    i.fn.selected = function (a) {
        if (a === undefined) {
            a = true
        }
        return this.each(function () {
            var b = this.type;
            if (b == "checkbox" || b == "radio") {
                this.checked = a
            } else {
                if (this.tagName.toLowerCase() == "option") {
                    var c = i(this).parent("select");
                    if (a && c[0] && c[0].type == "select-one") {
                        c.find("option").selected(false)
                    }
                    this.selected = a
                }
            }
        })
    };
    i.fn.ajaxSubmit.debug = false;

    function j() {
        if (!i.fn.ajaxSubmit.debug) {
            return
        }
        var a = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(a)
        } else {
            if (window.opera && window.opera.postError) {
                window.opera.postError(a)
            }
        }
    }
})(jQuery);
(function (f, e, g) {
    f.HoverDir = function (a, b) {
        this.$el = f(b);
        this._init(a)
    };
    f.HoverDir.defaults = {
        speed: 300,
        easing: "ease",
        hoverDelay: 0,
        inverse: false
    };
    f.HoverDir.prototype = {
        _init: function (a) {
            this.options = f.extend(true, {}, f.HoverDir.defaults, a);
            this.transitionProp = "all " + this.options.speed + "ms " + this.options.easing;
            this.support = Modernizr.csstransitions;
            this._loadEvents()
        },
        _loadEvents: function () {
            var a = this;
            this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir", function (c) {
                var d = f(this),
                    l = d.find("div.hover"),
                    k = a._getDir(d, {
                        x: c.pageX,
                        y: c.pageY
                    }),
                    b = a._getStyle(k);
                if (c.type === "mouseenter") {
                    l.hide().css(b.from);
                    clearTimeout(a.tmhover);
                    a.tmhover = setTimeout(function () {
                        l.show(0, function () {
                            var i = f(this);
                            if (a.support) {
                                i.css("transition", a.transitionProp)
                            }
                            a._applyAnimation(i, b.to, a.options.speed)
                        })
                    }, a.options.hoverDelay)
                } else {
                    if (a.support) {
                        l.css("transition", a.transitionProp)
                    }
                    clearTimeout(a.tmhover);
                    a._applyAnimation(l, b.from, a.options.speed)
                }
            })
        },
        _getDir: function (d, m) {
            var c = d.width(),
                b = d.height(),
                n = (m.x - d.offset().left - (c / 2)) * (c > b ? (b / c) : 1),
                o = (m.y - d.offset().top - (b / 2)) * (b > c ? (c / b) : 1),
                a = Math.round((((Math.atan2(o, n) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            return a
        },
        _getStyle: function (q) {
            var n, b, d = {
                    left: "0px",
                    top: "-100%"
                }, p = {
                    left: "0px",
                    top: "100%"
                }, o = {
                    left: "-100%",
                    top: "0px"
                }, a = {
                    left: "100%",
                    top: "0px"
                }, c = {
                    top: "0px"
                }, r = {
                    left: "0px"
                };
            switch (q) {
            case 0:
                n = !this.options.inverse ? d : p;
                b = c;
                break;
            case 1:
                n = !this.options.inverse ? a : o;
                b = r;
                break;
            case 2:
                n = !this.options.inverse ? p : d;
                b = c;
                break;
            case 3:
                n = !this.options.inverse ? o : a;
                b = r;
                break
            }
            return {
                from: n,
                to: b
            }
        },
        _applyAnimation: function (c, b, a) {
            f.fn.applyStyle = this.support ? f.fn.css : f.fn.animate;
            c.stop().applyStyle(b, f.extend(true, [], {
                duration: a + "ms"
            }))
        },
    };
    var h = function (a) {
        if (e.console) {
            e.console.error(a)
        }
    };
    f.fn.hoverdir = function (c) {
        var a = f.data(this, "hoverdir");
        if (typeof c === "string") {
            var b = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                if (!a) {
                    h("cannot call methods on hoverdir prior to initialization; attempted to call method '" + c + "'");
                    return
                }
                if (!f.isFunction(a[c]) || c.charAt(0) === "_") {
                    h("no such method '" + c + "' for hoverdir instance");
                    return
                }
                a[c].apply(a, b)
            })
        } else {
            this.each(function () {
                if (a) {
                    a._init()
                } else {
                    a = f.data(this, "hoverdir", new f.HoverDir(c, this))
                }
            })
        }
        return a
    }
})(jQuery, window);
(function (h) {
    function f(c, u, r, t, s) {
        function l() {
            L.unbind();
            u && g(u, r, t, s);
            s.startOrder = [];
            s.newOrder = [];
            s.origSort = [];
            s.checkSort = [];
            b.removeStyle(s.prefix + "filter, filter, " + s.prefix + "transform, transform, opacity, display").css(s.clean).removeAttr("data-checksum");
            window.atob || b.css({
                display: "none",
                opacity: "0"
            });
            L.removeStyle(s.prefix + "transition, transition, " + s.prefix + "perspective, perspective, " + s.prefix + "perspective-origin, perspective-origin, " + (s.resizeContainer ? "height" : ""));
            "list" == s.layoutMode ? (d.css({
                display: s.targetDisplayList,
                opacity: "1"
            }), s.origDisplay = s.targetDisplayList) : (d.css({
                display: s.targetDisplayGrid,
                opacity: "1"
            }), s.origDisplay = s.targetDisplayGrid);
            s.origLayout = s.layoutMode;
            setTimeout(function () {
                b.removeStyle(s.prefix + "transition, transition");
                s.mixing = !1;
                if ("function" == typeof s.onMixEnd) {
                    var i = s.onMixEnd.call(this, s);
                    s = i ? i : s
                }
            })
        }
        clearInterval(s.failsafe);
        s.mixing = !0;
        if ("function" == typeof s.onMixStart) {
            var K = s.onMixStart.call(this, s);
            s = K ? K : s
        }
        for (var j = s.transitionSpeed, K = 0; 2 > K; K++) {
            var M = 0 == K ? M = s.prefix : "";
            s.transition[M + "transition"] = "all " + j + "ms linear";
            s.transition[M + "transform"] = M + "translate3d(0,0,0)";
            s.perspective[M + "perspective"] = s.perspectiveDistance + "px";
            s.perspective[M + "perspective-origin"] = s.perspectiveOrigin
        }
        var p = s.targetSelector,
            b = t.find(p);
        b.each(function () {
            this.data = {}
        });
        var L = b.parent();
        L.css(s.perspective);
        s.easingFallback = "ease-in-out";
        "smooth" == s.easing && (s.easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)");
        "snap" == s.easing && (s.easing = "cubic-bezier(0.77, 0, 0.175, 1)");
        "windback" == s.easing && (s.easing = "cubic-bezier(0.175, 0.885, 0.320, 1.275)", s.easingFallback = "cubic-bezier(0.175, 0.885, 0.320, 1)");
        "windup" == s.easing && (s.easing = "cubic-bezier(0.6, -0.28, 0.735, 0.045)", s.easingFallback = "cubic-bezier(0.6, 0.28, 0.735, 0.045)");
        K = "list" == s.layoutMode && null != s.listEffects ? s.listEffects : s.effects;
        Array.prototype.indexOf && (s.fade = -1 < K.indexOf("fade") ? "0" : "", s.scale = -1 < K.indexOf("scale") ? "scale(.01)" : "", s.rotateZ = -1 < K.indexOf("rotateZ") ? "rotate(180deg)" : "", s.rotateY = -1 < K.indexOf("rotateY") ? "rotateY(90deg)" : "", s.rotateX = -1 < K.indexOf("rotateX") ? "rotateX(90deg)" : "", s.blur = -1 < K.indexOf("blur") ? "blur(8px)" : "", s.grayscale = -1 < K.indexOf("grayscale") ? "grayscale(100%)" : "");
        c = c.replace(/\s|\//g, ".");
        var d = h(),
            q = h();
        if ("or" == s.filterLogic) {
            var m = c.split(".");
            !0 == s.multiFilter && "" == m[0] && m.shift();
            1 > m.length ? q = q.add(t.find(p + ":visible")) : b.each(function () {
                for (var o = 0, i = h(this), v = 0; v < m.length; v++) {
                    i.hasClass(m[v]) && (d = d.add(i), o++)
                }
                0 == o && (q = q.add(i))
            })
        } else {
            d = d.add(L.find(p + "." + c)), q = q.add(L.find(p + ":not(." + c + "):visible"))
        }
        c = d.length;
        var a = h(),
            n = h(),
            k = h();
        q.each(function () {
            var i = h(this);
            "none" != i.css("display") && (a = a.add(i), k = k.add(i))
        });
        if (d.filter(":visible").length == c && !a.length && !u) {
            if (s.origLayout == s.layoutMode) {
                return l(), !1
            }
            if (1 == d.length) {
                return "list" == s.layoutMode ? (t.addClass(s.listClass), t.removeClass(s.gridClass), k.css("display", s.targetDisplayList)) : (t.addClass(s.gridClass), t.removeClass(s.listClass), k.css("display", s.targetDisplayGrid)), l(), !1
            }
        }
        s.origHeight = L.height();
        if (d.length) {
            t.removeClass(s.failClass);
            d.each(function () {
                var i = h(this);
                "none" == i.css("display") ? n = n.add(i) : k = k.add(i)
            });
            if (s.origLayout != s.layoutMode && !1 == s.animateGridList) {
                return "list" == s.layoutMode ? (t.addClass(s.listClass), t.removeClass(s.gridClass), k.css("display", s.targetDisplayList)) : (t.addClass(s.gridClass), t.removeClass(s.listClass), k.css("display", s.targetDisplayGrid)), l(), !1
            }
            if (!window.atob) {
                return l(), !1
            }
            b.css(s.clean);
            k.each(function () {
                this.data.origPos = h(this).offset()
            });
            "list" == s.layoutMode ? (t.addClass(s.listClass), t.removeClass(s.gridClass), n.css("display", s.targetDisplayList)) : (t.addClass(s.gridClass), t.removeClass(s.listClass), n.css("display", s.targetDisplayGrid));
            n.each(function () {
                this.data.showInterPos = h(this).offset()
            });
            a.each(function () {
                this.data.hideInterPos = h(this).offset()
            });
            k.each(function () {
                this.data.preInterPos = h(this).offset()
            });
            "list" == s.layoutMode ? k.css("display", s.targetDisplayList) : k.css("display", s.targetDisplayGrid);
            u && g(u, r, t, s);
            if (u && s.origSort.compare(s.checkSort)) {
                return l(), !1
            }
            a.hide();
            n.each(function () {
                this.data.finalPos = h(this).offset()
            });
            k.each(function () {
                this.data.finalPrePos = h(this).offset()
            });
            s.newHeight = L.height();
            u && g("reset", null, t, s);
            n.hide();
            k.css("display", s.origDisplay);
            "block" == s.origDisplay ? (t.addClass(s.listClass), n.css("display", s.targetDisplayList)) : (t.removeClass(s.listClass), n.css("display", s.targetDisplayGrid));
            s.resizeContainer && L.css("height", s.origHeight + "px");
            c = {};
            for (K = 0; 2 > K; K++) {
                M = 0 == K ? M = s.prefix : "", c[M + "transform"] = s.scale + " " + s.rotateX + " " + s.rotateY + " " + s.rotateZ, c[M + "filter"] = s.blur + " " + s.grayscale
            }
            n.css(c);
            k.each(function () {
                var o = this.data,
                    v = h(this);
                v.hasClass("mix_tohide") ? (o.preTX = o.origPos.left - o.hideInterPos.left, o.preTY = o.origPos.top - o.hideInterPos.top) : (o.preTX = o.origPos.left - o.preInterPos.left, o.preTY = o.origPos.top - o.preInterPos.top);
                for (var x = {}, w = 0; 2 > w; w++) {
                    var i = 0 == w ? i = s.prefix : "";
                    x[i + "transform"] = "translate(" + o.preTX + "px," + o.preTY + "px)"
                }
                v.css(x)
            });
            "list" == s.layoutMode ? (t.addClass(s.listClass), t.removeClass(s.gridClass)) : (t.addClass(s.gridClass), t.removeClass(s.listClass));
            setTimeout(function () {
                if (s.resizeContainer) {
                    for (var i = {}, v = 0; 2 > v; v++) {
                        var o = 0 == v ? o = s.prefix : "";
                        i[o + "transition"] = "all " + j + "ms ease-in-out";
                        i.height = s.newHeight + "px"
                    }
                    L.css(i)
                }
                a.css("opacity", s.fade);
                n.css("opacity", 1);
                n.each(function () {
                    var z = this.data;
                    z.tX = z.finalPos.left - z.showInterPos.left;
                    z.tY = z.finalPos.top - z.showInterPos.top;
                    for (var x = {}, w = 0; 2 > w; w++) {
                        var y = 0 == w ? y = s.prefix : "";
                        x[y + "transition-property"] = y + "transform, " + y + "filter, opacity";
                        x[y + "transition-timing-function"] = s.easing + ", linear, linear";
                        x[y + "transition-duration"] = j + "ms";
                        x[y + "transition-delay"] = "0";
                        x[y + "transform"] = "translate(" + z.tX + "px," + z.tY + "px)";
                        x[y + "filter"] = "none"
                    }
                    h(this).css("-webkit-transition", "all " + j + "ms " + s.easingFallback).css(x)
                });
                k.each(function () {
                    var z = this.data;
                    z.tX = 0 != z.finalPrePos.left ? z.finalPrePos.left - z.preInterPos.left : 0;
                    z.tY = 0 != z.finalPrePos.left ? z.finalPrePos.top - z.preInterPos.top : 0;
                    for (var x = {}, w = 0; 2 > w; w++) {
                        var y = 0 == w ? y = s.prefix : "";
                        x[y + "transition"] = "all " + j + "ms " + s.easing;
                        x[y + "transform"] = "translate(" + z.tX + "px," + z.tY + "px)"
                    }
                    h(this).css("-webkit-transition", "all " + j + "ms " + s.easingFallback).css(x)
                });
                i = {};
                for (v = 0; 2 > v; v++) {
                    o = 0 == v ? o = s.prefix : "", i[o + "transition"] = "all " + j + "ms " + s.easing + ", " + o + "filter " + j + "ms linear, opacity " + j + "ms linear", i[o + "transform"] = s.scale + " " + s.rotateX + " " + s.rotateY + " " + s.rotateZ, i[o + "filter"] = s.blur + " " + s.grayscale, i.opacity = s.fade
                }
                a.css(i);
                L.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (w) {
                    if (-1 < w.originalEvent.propertyName.indexOf("transform") || -1 < w.originalEvent.propertyName.indexOf("opacity")) {
                        -1 < p.indexOf(".") ? h(w.target).hasClass(p.replace(".", "")) && l() : h(w.target).is(p) && l()
                    }
                })
            }, 10);
            s.failsafe = setTimeout(function () {
                s.mixing && l()
            }, j + 400)
        } else {
            s.resizeContainer && L.css("height", s.origHeight + "px");
            if (!window.atob) {
                return l(), !1
            }
            a = q;
            setTimeout(function () {
                L.css(s.perspective);
                if (s.resizeContainer) {
                    for (var i = {}, v = 0; 2 > v; v++) {
                        var o = 0 == v ? o = s.prefix : "";
                        i[o + "transition"] = "height " + j + "ms ease-in-out";
                        i.height = s.minHeight + "px"
                    }
                    L.css(i)
                }
                b.css(s.transition);
                if (q.length) {
                    i = {};
                    for (v = 0; 2 > v; v++) {
                        o = 0 == v ? o = s.prefix : "", i[o + "transform"] = s.scale + " " + s.rotateX + " " + s.rotateY + " " + s.rotateZ, i[o + "filter"] = s.blur + " " + s.grayscale, i.opacity = s.fade
                    }
                    a.css(i);
                    L.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (w) {
                        if (-1 < w.originalEvent.propertyName.indexOf("transform") || -1 < w.originalEvent.propertyName.indexOf("opacity")) {
                            t.addClass(s.failClass), l()
                        }
                    })
                } else {
                    s.mixing = !1
                }
            }, 10)
        }
    }

    function g(r, z, c, a) {
        function k(n, p) {
            var o = isNaN(1 * n.attr(r)) ? n.attr(r).toLowerCase() : 1 * n.attr(r),
                i = isNaN(1 * p.attr(r)) ? p.attr(r).toLowerCase() : 1 * p.attr(r);
            return o < i ? -1 : o > i ? 1 : 0
        }

        function l(i) {
            "asc" == z ? b.prepend(i).prepend(" ") : b.append(i).append(" ")
        }
        c.find(a.targetSelector).wrapAll('<div class="mix_sorter"/>');
        var b = c.find(".mix_sorter");
        a.origSort.length || b.find(a.targetSelector + ":visible").each(function () {
            h(this).wrap("<s/>");
            a.origSort.push(h(this).parent().html().replace(/\s+/g, ""));
            h(this).unwrap()
        });
        b.empty();
        if ("reset" == r) {
            h.each(a.startOrder, function () {
                b.append(this).append(" ")
            })
        } else {
            if ("default" == r) {
                h.each(a.origOrder, function () {
                    l(this)
                })
            } else {
                if ("random" == r) {
                    if (!a.newOrder.length) {
                        for (var d = a.startOrder.slice(), y = d.length, A = y; A--;) {
                            var m = parseInt(Math.random() * y),
                                j = d[A];
                            d[A] = d[m];
                            d[m] = j
                        }
                        a.newOrder = d
                    }
                    h.each(a.newOrder, function () {
                        b.append(this).append(" ")
                    })
                } else {
                    if ("custom" == r) {
                        h.each(z, function () {
                            l(this)
                        })
                    } else {
                        if ("undefined" === typeof a.origOrder[0].attr(r)) {
                            return console.log("No such attribute found. Terminating"), !1
                        }
                        a.newOrder.length || (h.each(a.origOrder, function () {
                            a.newOrder.push(h(this))
                        }), a.newOrder.sort(k));
                        h.each(a.newOrder, function () {
                            l(this)
                        })
                    }
                }
            }
        }
        a.checkSort = [];
        b.find(a.targetSelector + ":visible").each(function (n) {
            var i = h(this);
            0 == n && i.attr("data-checksum", "1");
            i.wrap("<s/>");
            a.checkSort.push(i.parent().html().replace(/\s+/g, ""));
            i.unwrap()
        });
        c.find(a.targetSelector).unwrap()
    }
    var e = {
        init: function (a) {
            return this.each(function () {
                var c = {
                    targetSelector: ".mix",
                    filterSelector: ".filter",
                    sortSelector: ".sort",
                    buttonEvent: "click",
                    effects: ["fade", "scale"],
                    listEffects: null,
                    easing: "smooth",
                    layoutMode: "grid",
                    targetDisplayGrid: "inline-block",
                    targetDisplayList: "block",
                    listClass: "",
                    gridClass: "",
                    transitionSpeed: 600,
                    showOnLoad: "all",
                    sortOnLoad: !1,
                    multiFilter: !1,
                    filterLogic: "or",
                    resizeContainer: !0,
                    minHeight: 0,
                    failClass: "fail",
                    perspectiveDistance: "3000",
                    perspectiveOrigin: "50% 50%",
                    animateGridList: !0,
                    onMixLoad: null,
                    onMixStart: null,
                    onMixEnd: null,
                    container: null,
                    origOrder: [],
                    startOrder: [],
                    newOrder: [],
                    origSort: [],
                    checkSort: [],
                    filter: "",
                    mixing: !1,
                    origDisplay: "",
                    origLayout: "",
                    origHeight: 0,
                    newHeight: 0,
                    isTouch: !1,
                    resetDelay: 0,
                    failsafe: null,
                    prefix: "",
                    easingFallback: "ease-in-out",
                    transition: {},
                    perspective: {},
                    clean: {},
                    fade: "1",
                    scale: "",
                    rotateX: "",
                    rotateY: "",
                    rotateZ: "",
                    blur: "",
                    grayscale: ""
                };
                a && h.extend(c, a);
                this.config = c;
                h.support.touch = "ontouchend" in document;
                h.support.touch && (c.isTouch = !0, c.resetDelay = 350);
                c.container = h(this);
                var s = c.container,
                    j;
                c: {
                    j = s[0];
                    for (var d = ["Webkit", "Moz", "O", "ms"], q = 0; q < d.length; q++) {
                        if (d[q] + "Transition" in j.style) {
                            j = d[q];
                            break c
                        }
                    }
                    j = "transition" in j.style ? "" : !1
                }
                c.prefix = j;
                c.prefix = c.prefix ? "-" + c.prefix.toLowerCase() + "-" : "";
                s.find(c.targetSelector).each(function () {
                    c.origOrder.push(h(this))
                });
                if (c.sortOnLoad) {
                    var r;
                    h.isArray(c.sortOnLoad) ? (j = c.sortOnLoad[0], r = c.sortOnLoad[1], h(c.sortSelector + "[data-sort=" + c.sortOnLoad[0] + "][data-order=" + c.sortOnLoad[1] + "]").addClass("active")) : (h(c.sortSelector + "[data-sort=" + c.sortOnLoad + "]").addClass("active"), j = c.sortOnLoad, c.sortOnLoad = "desc");
                    g(j, r, s, c)
                }
                for (r = 0; 2 > r; r++) {
                    j = 0 == r ? j = c.prefix : "", c.transition[j + "transition"] = "all " + c.transitionSpeed + "ms ease-in-out", c.perspective[j + "perspective"] = c.perspectiveDistance + "px", c.perspective[j + "perspective-origin"] = c.perspectiveOrigin
                }
                for (r = 0; 2 > r; r++) {
                    j = 0 == r ? j = c.prefix : "", c.clean[j + "transition"] = "none"
                }
                "list" == c.layoutMode ? (s.addClass(c.listClass), c.origDisplay = c.targetDisplayList) : (s.addClass(c.gridClass), c.origDisplay = c.targetDisplayGrid);
                c.origLayout = c.layoutMode;
                r = c.showOnLoad.split(" ");
                h.each(r, function () {
                    h(c.filterSelector + '[data-filter="' + this + '"]').addClass("active")
                });
                s.find(c.targetSelector).addClass("mix_all");
                "all" == r[0] && (r[0] = "mix_all", c.showOnLoad = "mix_all");
                var b = h();
                h.each(r, function () {
                    b = b.add(h("." + this))
                });
                b.each(function () {
                    var i = h(this);
                    "list" == c.layoutMode ? i.css("display", c.targetDisplayList) : i.css("display", c.targetDisplayGrid);
                    i.css(c.transition)
                });
                setTimeout(function () {
                    c.mixing = !0;
                    b.css("opacity", "1");
                    setTimeout(function () {
                        "list" == c.layoutMode ? b.removeStyle(c.prefix + "transition, transition").css({
                            display: c.targetDisplayList,
                            opacity: 1
                        }) : b.removeStyle(c.prefix + "transition, transition").css({
                            display: c.targetDisplayGrid,
                            opacity: 1
                        });
                        c.mixing = !1;
                        if ("function" == typeof c.onMixLoad) {
                            var i = c.onMixLoad.call(this, c);
                            c = i ? i : c
                        }
                    }, c.transitionSpeed)
                }, 10);
                c.filter = c.showOnLoad;
                h(c.sortSelector).bind(c.buttonEvent, function () {
                    if (!c.mixing) {
                        var l = h(this),
                            i = l.attr("data-sort"),
                            k = l.attr("data-order");
                        if (l.hasClass("active")) {
                            if ("random" != i) {
                                return !1
                            }
                        } else {
                            h(c.sortSelector).removeClass("active"), l.addClass("active")
                        }
                        s.find(c.targetSelector).each(function () {
                            c.startOrder.push(h(this))
                        });
                        f(c.filter, i, k, s, c)
                    }
                });
                h(c.filterSelector).bind(c.buttonEvent, function () {
                    if (!c.mixing) {
                        var k = h(this);
                        if (!1 == c.multiFilter) {
                            h(c.filterSelector).removeClass("active"), k.addClass("active"), c.filter = k.attr("data-filter"), h(c.filterSelector + '[data-filter="' + c.filter + '"]').addClass("active"), "all" == c.filter && (c.filter = "mix_all")
                        } else {
                            var i = k.attr("data-filter");
                            "all" == i && (i = "mix_all");
                            k.hasClass("active") ? (k.removeClass("active"), c.filter = c.filter.replace(RegExp("(\\s|^)" + i), "")) : (k.addClass("active"), c.filter = c.filter + " " + i)
                        }
                        f(c.filter, null, null, s, c)
                    }
                })
            })
        },
        toGrid: function () {
            return this.each(function () {
                var a = this.config;
                "grid" != a.layoutMode && (a.layoutMode = "grid", f(a.filter, null, null, h(this), a))
            })
        },
        toList: function () {
            return this.each(function () {
                var a = this.config;
                "list" != a.layoutMode && (a.layoutMode = "list", f(a.filter, null, null, h(this), a))
            })
        },
        filter: function (a) {
            return this.each(function () {
                var b = this.config;
                b.mixing || (h(b.filterSelector).removeClass("active"), h(b.filterSelector + '[data-filter="' + a + '"]').addClass("active"), "all" == a && (a = "mix_all"), b.filter = a, f(a, null, null, h(this), b))
            })
        },
        sort: function (a) {
            return this.each(function () {
                var d = this.config,
                    b = h(this);
                if (!d.mixing) {
                    h(d.sortSelector).removeClass("active");
                    if (h.isArray(a)) {
                        var k = a[0],
                            c = a[1];
                        h(d.sortSelector + '[data-sort="' + a[0] + '"][data-order="' + a[1] + '"]').addClass("active")
                    } else {
                        h(d.sortSelector + '[data-sort="' + a + '"]').addClass("active"), k = a, c = "desc"
                    }
                    b.find(d.targetSelector).each(function () {
                        d.startOrder.push(h(this))
                    });
                    f(d.filter, k, c, b, d)
                }
            })
        },
        multimix: function (a) {
            return this.each(function () {
                var c = this.config,
                    b = h(this);
                multiOut = {
                    filter: c.filter,
                    sort: null,
                    order: "desc",
                    layoutMode: c.layoutMode
                };
                h.extend(multiOut, a);
                c.mixing || (h(c.filterSelector).add(c.sortSelector).removeClass("active"), h(c.filterSelector + '[data-filter="' + multiOut.filter + '"]').addClass("active"), "all" == multiOut.filter && (multiOur.filter = "mix_all"), "undefined" !== typeof multiOut.sort && (h(c.sortSelector + '[data-sort="' + multiOut.sort + '"][data-order="' + multiOut.order + '"]').addClass("active"), b.find(c.targetSelector).each(function () {
                    c.startOrder.push(h(this))
                })), c.layoutMode = multiOut.layoutMode, f(multiOut.filter, multiOut.sort, multiOut.order, b, c))
            })
        },
        remix: function (a) {
            return this.each(function () {
                var c = this.config,
                    b = h(this);
                c.origOrder = [];
                b.find(c.targetSelector).each(function () {
                    var d = h(this);
                    d.addClass("mix_all");
                    c.origOrder.push(d)
                });
                !c.mixing && "undefined" !== typeof a && (h(c.filterSelector).removeClass("active"), h(c.filterSelector + '[data-filter="' + a + '"]').addClass("active"), "all" == a && (a = "mix_all"), c.filter = a, f(a, null, null, b, c))
            })
        }
    };
    h.fn.mixitup = function (a, b) {
        if (e[a]) {
            return e[a].apply(this, Array.prototype.slice.call(arguments, 1))
        }
        if ("object" === typeof a || !a) {
            return e.init.apply(this, arguments)
        }
    };
    h.fn.removeStyle = function (a) {
        return this.each(function () {
            var c = h(this);
            a = a.replace(/\s+/g, "");
            var b = a.split(",");
            h.each(b, function () {
                var d = RegExp(this.toString() + "[^;]+;?", "g");
                c.attr("style", function (k, l) {
                    if (l) {
                        return l.replace(d, "")
                    }
                })
            })
        })
    };
    Array.prototype.compare = function (a) {
        if (this.length != a.length) {
            return !1
        }
        for (var b = 0; b < a.length; b++) {
            if (this[b].compare && !this[b].compare(a[b]) || this[b] !== a[b]) {
                return !1
            }
        }
        return !0
    }
})(jQuery);
(function (f) {
    var d = f.scrollTo = function (c, a, b) {
        f(window).scrollTo(c, a, b)
    };
    d.defaults = {
        axis: "xy",
        duration: parseFloat(f.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    d.window = function (a) {
        return f(window)._scrollable()
    };
    f.fn._scrollable = function () {
        return this.map(function () {
            var c = this,
                b = !c.nodeName || f.inArray(c.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!b) {
                return c
            }
            var a = (c.contentWindow || c).document || c.ownerDocument || c;
            return /webkit/i.test(navigator.userAgent) || a.compatMode == "BackCompat" ? a.body : a.documentElement
        })
    };
    f.fn.scrollTo = function (a, b, c) {
        if (typeof b == "object") {
            c = b;
            b = 0
        }
        if (typeof c == "function") {
            c = {
                onAfter: c
            }
        }
        if (a == "max") {
            a = 9000000000
        }
        c = f.extend({}, d.defaults, c);
        b = b || c.duration;
        c.queue = c.queue && c.axis.length > 1;
        if (c.queue) {
            b /= 2
        }
        c.offset = e(c.offset);
        c.over = e(c.over);
        return this._scrollable().each(function () {
            if (a == null) {
                return
            }
            var i = this,
                p = f(i),
                r = a,
                n, q = {}, o = p.is("html,body");
            switch (typeof r) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(r)) {
                    r = e(r);
                    break
                }
                r = f(r, this);
                if (!r.length) {
                    return
                }
            case "object":
                if (r.is || r.style) {
                    n = (r = f(r)).offset()
                }
            }
            f.each(c.axis.split(""), function (m, k) {
                var w = k == "x" ? "Left" : "Top",
                    v = w.toLowerCase(),
                    l = "scroll" + w,
                    x = i[l],
                    j = d.max(i, k);
                if (n) {
                    q[l] = n[v] + (o ? 0 : x - p.offset()[v]);
                    if (c.margin) {
                        q[l] -= parseInt(r.css("margin" + w)) || 0;
                        q[l] -= parseInt(r.css("border" + w + "Width")) || 0
                    }
                    q[l] += c.offset[v] || 0;
                    if (c.over[v]) {
                        q[l] += r[k == "x" ? "width" : "height"]() * c.over[v]
                    }
                } else {
                    var g = r[v];
                    q[l] = g.slice && g.slice(-1) == "%" ? parseFloat(g) / 100 * j : g
                } if (c.limit && /^\d+$/.test(q[l])) {
                    q[l] = q[l] <= 0 ? 0 : Math.min(q[l], j)
                }
                if (!m && c.queue) {
                    if (x != q[l]) {
                        h(c.onAfterFirst)
                    }
                    delete q[l]
                }
            });
            h(c.onAfter);

            function h(g) {
                p.animate(q, b, c.easing, g && function () {
                    g.call(this, a, c)
                })
            }
        }).end()
    };
    d.max = function (b, c) {
        var n = c == "x" ? "Width" : "Height",
            a = "scroll" + n;
        if (!f(b).is("html,body")) {
            return b[a] - f(b)[n.toLowerCase()]()
        }
        var o = "client" + n,
            l = b.ownerDocument.documentElement,
            m = b.ownerDocument.body;
        return Math.max(l[a], m[a]) - Math.min(l[o], m[o])
    };

    function e(a) {
        return typeof a == "object" ? a : {
            top: a,
            left: a
        }
    }
})(jQuery);
(function (b) {
    b("html").addClass("stylish-select");
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (g) {
            if (this === void 0 || this === null) {
                throw new TypeError()
            }
            var a = Object(this),
                h = a.length >>> 0;
            if (h === 0) {
                return -1
            }
            var j = 0;
            if (arguments.length > 0) {
                j = Number(arguments[1]);
                if (j !== j) {
                    j = 0
                } else {
                    if (j !== 0 && j !== (1 / 0) && j !== -(1 / 0)) {
                        j = (j > 0 || -1) * Math.floor(Math.abs(j))
                    }
                }
            }
            if (j >= h) {
                return -1
            }
            var i = j >= 0 ? j : Math.max(h - Math.abs(j), 0);
            for (; i < h; i++) {
                if (i in a && a[i] === g) {
                    return i
                }
            }
            return -1
        }
    }
    b.fn.extend({
        getSetSSValue: function (a) {
            if (a) {
                b(this).val(a).change();
                return this
            } else {
                return b(this).find(":selected").val()
            }
        },
        resetSS: function () {
            var a = b(this).data("ssOpts");
            $this = b(this);
            $this.next().remove();
            $this.unbind(".sSelect").sSelect(a)
        }
    });
    b.fn.sSelect = function (a) {
        return this.each(function () {
            var T = {
                defaultText: "Please select",
                animationSpeed: 0,
                ddMaxHeight: "",
                containerClass: ""
            };
            var U = b.extend(T, a),
                F = b(this),
                I = b('<div class="selectedTxt"></div>'),
                L = b('<div class="newListSelected ' + U.containerClass + (F.is(":disabled") ? "newListDisabled" : "") + '"></div>'),
                af = b('<div class="SSContainerDivWrapper" style="visibility:hidden;"></div>'),
                R = b('<ul class="newList"></ul>'),
                N = -1,
                ad = -1,
                P = [],
                Y = false,
                V = false,
                K;
            b(this).data("ssOpts", a);
            L.insertAfter(F);
            L.attr("tabindex", F.attr("tabindex") || "0");
            I.prependTo(L);
            R.appendTo(L);
            R.wrap(af);
            af = R.parent();
            F.hide();
            if (F.is(":disabled")) {
                return
            }
            I.data("ssReRender", !I.is(":visible"));

            function ac(e, c) {
                var f = b(e).text(),
                    g = b(e).val(),
                    d = b(e).is(":disabled");
                if (!d && !b(e).parents().is(":disabled")) {
                    P.push(f.charAt(0).toLowerCase())
                }
                c.append(b("<li><a" + (d ? ' class="newListItemDisabled"' : "") + ' href="JavaScript:void(0);">' + f + "</a></li>").data({
                    key: g,
                    selected: b(e).is(":selected")
                }))
            }
            F.children().each(function () {
                if (b(this).is("option")) {
                    ac(this, R)
                } else {
                    var c = b(this).attr("label"),
                        d = b('<li class="newListOptionTitle ' + (b(this).is(":disabled") ? "newListOptionDisabled" : "") + '">' + c + "</li>"),
                        e = b("<ul></ul>");
                    d.appendTo(R);
                    e.appendTo(d);
                    b(this).children().each(function () {
                        ac(this, e)
                    })
                }
            });
            K = R.find("li a:not(.newListItemDisabled)").not(function () {
                return b(this).parents().hasClass("newListOptionDisabled")
            });
            K.each(function (c) {
                if (b(this).parent().data("selected")) {
                    U.defaultText = b(this).html();
                    N = ad = c
                }
            });
            var Z = R.height(),
                H = L.height(),
                Q = K.length;
            if (N != -1) {
                X(N)
            } else {
                I.text(U.defaultText)
            }

            function E() {
                var e = L.offset().top,
                    d = b(window).height(),
                    c = b(window).scrollTop();
                if (Z > parseInt(U.ddMaxHeight)) {
                    Z = parseInt(U.ddMaxHeight)
                }
                e = e - c;
                if (e + Z >= d) {
                    R.css({
                        height: Z
                    });
                    af.css({
                        top: "-" + Z + "px",
                        height: Z
                    });
                    F.onTop = true
                } else {
                    R.css({
                        height: Z
                    });
                    af.css({
                        top: H + "px",
                        height: Z
                    });
                    F.onTop = false
                }
            }
            E();
            b(window).bind("resize.sSelect scroll.sSelect", E);

            function O() {
                L.css("position", "relative")
            }

            function ae() {
                L.css({
                    position: "static"
                })
            }
            I.bind("click.sSelect", function (c) {
                c.stopPropagation();
                if (b(this).data("ssReRender")) {
                    Z = R.height("").height();
                    af.height("");
                    H = L.height();
                    b(this).data("ssReRender", false);
                    E()
                }
                b(".SSContainerDivWrapper").not(b(this).next()).hide().parent().css("position", "static").removeClass("newListSelFocus");
                af.toggle();
                O();
                if (N == -1) {
                    N = 0
                }
                try {
                    K.eq(N).focus()
                } catch (d) {}
            });

            function S(c, d) {
                if (c == true) {
                    ad = N;
                    F.change()
                }
                if (d == true) {
                    N = ad;
                    X(N)
                }
                af.hide();
                ae()
            }
            K.bind("click.sSelect", function (c) {
                var d = b(c.target);
                N = K.index(d);
                V = true;
                X(N, true);
                S()
            });
            K.bind("mouseenter.sSelect", function (c) {
                var d = b(c.target);
                d.addClass("newListHover")
            }).bind("mouseleave.sSelect", function (c) {
                var d = b(c.target);
                d.removeClass("newListHover")
            });

            function X(g, d) {
                if (g == -1) {
                    I.text(U.defaultText);
                    K.removeClass("hiLite")
                } else {
                    K.removeClass("hiLite").eq(g).addClass("hiLite");
                    var e = K.eq(g).text(),
                        f = K.eq(g).parent().data("key");
                    try {
                        F.val(f)
                    } catch (c) {
                        F[0].selectedIndex = g
                    }
                    I.text(e);
                    if (d == true) {
                        ad = g;
                        F.change()
                    }
                    if (af.is(":visible")) {
                        try {
                            K.eq(g).focus()
                        } catch (c) {}
                    }
                }
            }
            F.bind("change.sSelect", function (c) {
                var e = b(c.target);
                if (V == true) {
                    V = false;
                    return false
                }
                var d = e.find(":selected");
                N = e.find("option").index(d);
                X(N)
            });

            function G(c) {
                b(c).unbind("keydown.sSelect").bind("keydown.sSelect", function (e) {
                    var d = e.which;
                    V = true;
                    switch (d) {
                    case 40:
                    case 39:
                        ab();
                        return false;
                        break;
                    case 38:
                    case 37:
                        aa();
                        return false;
                        break;
                    case 33:
                    case 36:
                        M();
                        return false;
                        break;
                    case 34:
                    case 35:
                        W();
                        return false;
                        break;
                    case 13:
                    case 27:
                        S(true);
                        return false;
                        break;
                    case 9:
                        S(true);
                        J();
                        return false;
                        break
                    }
                    keyPressed = String.fromCharCode(d).toLowerCase();
                    var f = P.indexOf(keyPressed);
                    if (typeof f != "undefined") {
                        ++N;
                        N = P.indexOf(keyPressed, N);
                        if (N == -1 || N == null || Y != keyPressed) {
                            N = P.indexOf(keyPressed)
                        }
                        X(N);
                        Y = keyPressed;
                        return false
                    }
                })
            }

            function ab() {
                if (N < (Q - 1)) {
                    ++N;
                    X(N)
                }
            }

            function aa() {
                if (N > 0) {
                    --N;
                    X(N)
                }
            }

            function M() {
                N = 0;
                X(N)
            }

            function W() {
                N = Q - 1;
                X(N)
            }
            L.bind("click.sSelect", function (c) {
                c.stopPropagation();
                G(this)
            });
            L.bind("focus.sSelect", function () {
                b(this).addClass("newListSelFocus");
                G(this)
            });
            L.bind("blur.sSelect", function () {
                b(this).removeClass("newListSelFocus")
            });
            b(document).bind("click.sSelect", function () {
                L.removeClass("newListSelFocus");
                if (af.is(":visible")) {
                    S(false, true)
                } else {
                    S(false)
                }
            });

            function J() {
                var c = b("body").find("button,input,textarea,select"),
                    d = c.index(F);
                if (d > -1 && (d + 1) < c.length) {
                    c.eq(d + 1).focus()
                }
                return false
            }
            F.focus(function () {
                F.next().focus()
            });
            I.bind("mouseenter.sSelect", function (c) {
                var d = b(c.target);
                d.parent().addClass("newListSelHover")
            }).bind("mouseleave.sSelect", function (c) {
                var d = b(c.target);
                d.parent().removeClass("newListSelHover")
            });
            af.css({
                left: "0",
                display: "none",
                visibility: "visible"
            })
        })
    }
})(jQuery);
(function (b) {
    b.tools = b.tools || {
        version: "v1.2.7"
    }, b.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            fadeIE: !1,
            position: ["top", "center"],
            offset: [0, 0],
            relative: !1,
            cancelDefault: !0,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        },
        addEffect: function (e, g, f) {
            c[e] = [g, f]
        }
    };
    var c = {
        toggle: [
            function (h) {
                var e = this.getConf(),
                    f = this.getTip(),
                    g = e.opacity;
                g < 1 && f.css({
                    opacity: g
                }), f.show(), h.call()
            },
            function (e) {
                this.getTip().hide(), e.call()
            }
        ],
        fade: [
            function (f) {
                var e = this.getConf();
                !b.browser.msie || e.fadeIE ? this.getTip().fadeTo(e.fadeInSpeed, e.opacity, f) : (this.getTip().show(), f())
            },
            function (f) {
                var e = this.getConf();
                !b.browser.msie || e.fadeIE ? this.getTip().fadeOut(e.fadeOutSpeed, f) : (this.getTip().hide(), f())
            }
        ]
    };

    function d(e, g, s) {
        var i = s.relative ? e.position().top : e.offset().top,
            h = s.relative ? e.position().left : e.offset().left,
            r = s.position[0];
        i -= g.outerHeight() - s.offset[0], h += e.outerWidth() + s.offset[1], /iPad/i.test(navigator.userAgent) && (i -= b(window).scrollTop());
        var q = g.outerHeight() + e.outerHeight();
        r == "center" && (i += q / 2), r == "bottom" && (i += q), r = s.position[1];
        var f = g.outerWidth() + e.outerWidth();
        r == "center" && (h -= f / 2), r == "left" && (h -= f);
        return {
            top: i,
            left: h
        }
    }

    function a(e, n) {
        var f = this,
            E = e.add(f),
            m, k = 0,
            p = 0,
            l = e.attr("title"),
            h = e.attr("data-tooltip"),
            j = c[n.effect],
            i, g = e.is(":input"),
            r = g && e.is(":checkbox, :radio, select, :button, :submit"),
            o = e.attr("type"),
            q = n.events[o] || n.events[g ? r ? "widget" : "input" : "def"];
        if (!j) {
            throw 'Nonexistent effect "' + n.effect + '"'
        }
        q = q.split(/,\s*/);
        if (q.length != 2) {
            throw "Tooltip: bad events configuration for " + o
        }
        e.on(q[0], function (s) {
            clearTimeout(k), n.predelay ? p = setTimeout(function () {
                f.show(s)
            }, n.predelay) : f.show(s)
        }).on(q[1], function (s) {
            clearTimeout(p), n.delay ? k = setTimeout(function () {
                f.hide(s)
            }, n.delay) : f.hide(s)
        }), l && n.cancelDefault && (e.removeAttr("title"), e.data("title", l)), b.extend(f, {
            show: function (s) {
                if (!m) {
                    h ? m = b(h) : n.tip ? m = b(n.tip).eq(0) : l ? m = b(n.layout).addClass(n.tipClass).appendTo(document.body).hide().append(l) : (m = e.next(), m.length || (m = e.parent().next()));
                    if (!m.length) {
                        throw "Cannot find tooltip for " + e
                    }
                }
                if (f.isShown()) {
                    return f
                }
                m.stop(!0, !0);
                var t = d(e, m, n);
                n.tip && m.html(e.data("title")), s = b.Event(), s.type = "onBeforeShow", E.trigger(s, [t]);
                if (s.isDefaultPrevented()) {
                    return f
                }
                t = d(e, m, n), m.css({
                    position: "absolute",
                    top: t.top,
                    left: t.left
                }), i = !0, j[0].call(f, function () {
                    s.type = "onShow", i = "full", E.trigger(s)
                });
                var u = n.events.tooltip.split(/,\s*/);
                m.data("__set") || (m.off(u[0]).on(u[0], function () {
                    clearTimeout(k), clearTimeout(p)
                }), u[1] && !e.is("input:not(:checkbox, :radio), textarea") && m.off(u[1]).on(u[1], function (v) {
                    v.relatedTarget != e[0] && e.trigger(q[1].split(" ")[0])
                }), n.tip || m.data("__set", !0));
                return f
            },
            hide: function (s) {
                if (!m || !f.isShown()) {
                    return f
                }
                s = b.Event(), s.type = "onBeforeHide", E.trigger(s);
                if (!s.isDefaultPrevented()) {
                    i = !1, c[n.effect][1].call(f, function () {
                        s.type = "onHide", E.trigger(s)
                    });
                    return f
                }
            },
            isShown: function (s) {
                return s ? i == "full" : i
            },
            getConf: function () {
                return n
            },
            getTip: function () {
                return m
            },
            getTrigger: function () {
                return e
            }
        }), b.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function (s, t) {
            b.isFunction(n[t]) && b(f).on(t, n[t]), f[t] = function (u) {
                u && b(f).on(t, u);
                return f
            }
        })
    }
    b.fn.tooltip = function (f) {
        var e = this.data("tooltip");
        if (e) {
            return e
        }
        f = b.extend(!0, {}, b.tools.tooltip.conf, f), typeof f.position == "string" && (f.position = f.position.split(/,?\s/)), this.each(function () {
            e = new a(b(this), f), b(this).data("tooltip", e)
        });
        return f.api ? e : this
    }
})(jQuery);
(function (b) {
    var c = b.tools.tooltip;
    c.dynamic = {
        conf: {
            classNames: "top right bottom left"
        }
    };

    function d(g) {
        var e = b(window),
            h = e.width() + e.scrollLeft(),
            f = e.height() + e.scrollTop();
        return [g.offset().top <= e.scrollTop(), h <= g.offset().left + g.width(), f <= g.offset().top + g.height(), e.scrollLeft() >= g.offset().left]
    }

    function a(f) {
        var e = f.length;
        while (e--) {
            if (f[e]) {
                return !1
            }
        }
        return !0
    }
    b.fn.dynamic = function (h) {
        typeof h == "number" && (h = {
            speed: h
        }), h = b.extend({}, c.dynamic.conf, h);
        var g = b.extend(!0, {}, h),
            e = h.classNames.split(/\s/),
            f;
        this.each(function () {
            var j = b(this).tooltip().onBeforeShow(function (u, s) {
                var l = this.getTip(),
                    t = this.getConf();
                f || (f = [t.position[0], t.position[1], t.offset[0], t.offset[1], b.extend({}, t)]), b.extend(t, f[4]), t.position = [f[0], f[1]], t.offset = [f[2], f[3]], l.css({
                    visibility: "hidden",
                    position: "absolute",
                    top: s.top,
                    left: s.left
                }).show();
                var k = b.extend(!0, {}, g),
                    i = d(l);
                if (!a(i)) {
                    i[2] && (b.extend(t, k.top), t.position[0] = "top", l.addClass(e[0])), i[3] && (b.extend(t, k.right), t.position[1] = "right", l.addClass(e[1])), i[0] && (b.extend(t, k.bottom), t.position[0] = "bottom", l.addClass(e[2])), i[1] && (b.extend(t, k.left), t.position[1] = "left", l.addClass(e[3]));
                    if (i[0] || i[2]) {
                        t.offset[0] *= -1
                    }
                    if (i[1] || i[3]) {
                        t.offset[1] *= -1
                    }
                }
                l.css({
                    visibility: "visible"
                }).hide()
            });
            j.onBeforeShow(function () {
                var l = this.getConf(),
                    i = this.getTip();
                setTimeout(function () {
                    l.position = [f[0], f[1]], l.offset = [f[2], f[3]]
                }, 0)
            }), j.onHide(function () {
                var i = this.getTip();
                i.removeClass(h.classNames)
            }), ret = j
        });
        return h.api ? ret : this
    }
})(jQuery);
(function (c) {
    var a = c.tools.tooltip;
    c.extend(a.conf, {
        direction: "up",
        bounce: !1,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !c.browser.msie
    });
    var b = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    a.addEffect("slide", function (f) {
        var l = this.getConf(),
            e = this.getTip(),
            d = l.slideFade ? {
                opacity: l.opacity
            } : {}, k = b[l.direction] || b.up;
        d[k[1]] = k[0] + "=" + l.slideOffset, l.slideFade && e.css({
            opacity: 0
        }), e.show().animate(d, l.slideInSpeed, f)
    }, function (e) {
        var f = this.getConf(),
            g = f.slideOffset,
            d = f.slideFade ? {
                opacity: 0
            } : {}, h = b[f.direction] || b.up,
            m = "" + h[0];
        f.bounce && (m = m == "+" ? "-" : "+"), d[h[1]] = m + "=" + g, this.getTip().animate(d, f.slideOutSpeed, function () {
            c(this).hide(), e.call()
        })
    })
})(jQuery);
(function (d) {
    var c = "waitForImages";
    d.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
    };
    d.expr[":"].uncached = function (b) {
        if (!d(b).is('img[src!=""]')) {
            return false
        }
        var a = new Image();
        a.src = b.src;
        return !a.complete
    };
    d.fn.waitForImages = function (a, i, b) {
        var h = 0;
        var j = 0;
        if (d.isPlainObject(arguments[0])) {
            b = arguments[0].waitForAll;
            i = arguments[0].each;
            a = arguments[0].finished
        }
        a = a || d.noop;
        i = i || d.noop;
        b = !! b;
        if (!d.isFunction(a) || !d.isFunction(i)) {
            throw new TypeError("An invalid callback was supplied.")
        }
        return this.each(function () {
            var f = d(this);
            var g = [];
            var e = d.waitForImages.hasImageProperties || [];
            var l = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            if (b) {
                f.find("*").andSelf().each(function () {
                    var k = d(this);
                    if (k.is("img:uncached")) {
                        g.push({
                            src: k.attr("src"),
                            element: k[0]
                        })
                    }
                    d.each(e, function (s, t) {
                        var r = k.css(t);
                        var q;
                        if (!r) {
                            return true
                        }
                        while (q = l.exec(r)) {
                            g.push({
                                src: q[2],
                                element: k[0]
                            })
                        }
                    })
                })
            } else {
                f.find("img:uncached").each(function () {
                    g.push({
                        src: this.src,
                        element: this
                    })
                })
            }
            h = g.length;
            j = 0;
            if (h === 0) {
                a.call(f[0])
            }
            d.each(g, function (k, p) {
                var o = new Image();
                d(o).bind("load." + c + " error." + c, function (m) {
                    j++;
                    i.call(p.element, j, h, m.type == "load");
                    if (j == h) {
                        a.call(f[0]);
                        return false
                    }
                });
                o.src = p.src
            })
        })
    }
}(jQuery));
window.Modernizr = function (E, d, K) {
    function k(M) {
        F.cssText = M
    }

    function b(N, M) {
        return k(B.join(N + ";") + (M || ""))
    }

    function m(N, M) {
        return typeof N === M
    }

    function u(N, M) {
        return !!~("" + N).indexOf(M)
    }

    function o(P, O) {
        for (var N in P) {
            var M = P[N];
            if (!u(M, "-") && F[M] !== K) {
                return O == "pfx" ? M : !0
            }
        }
        return !1
    }

    function t(O, Q, N) {
        for (var M in O) {
            var P = Q[O[M]];
            if (P !== K) {
                return N === !1 ? O[M] : m(P, "function") ? P.bind(N || Q) : P
            }
        }
        return !1
    }

    function p(O, Q, N) {
        var P = O.charAt(0).toUpperCase() + O.slice(1),
            M = (O + " " + e.join(P + " ") + P).split(" ");
        return m(Q, "string") || m(Q, "undefined") ? o(M, Q) : (M = (O + " " + g.join(P + " ") + P).split(" "), t(M, Q, N))
    }

    function n() {
        y.input = function (O) {
            for (var N = 0, M = O.length; N < M; N++) {
                A[O[N]] = O[N] in G
            }
            return A.list && (A.list = !! d.createElement("datalist") && !! E.HTMLDataListElement), A
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), y.inputtypes = function (M) {
            for (var O = 0, P, N, Q, R = M.length; O < R; O++) {
                G.setAttribute("type", N = M[O]), P = G.type !== "text", P && (G.value = h, G.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(N) && G.style.WebkitAppearance !== K ? (J.appendChild(G), Q = d.defaultView, P = Q.getComputedStyle && Q.getComputedStyle(G, null).WebkitAppearance !== "textfield" && G.offsetHeight !== 0, J.removeChild(G)) : /^(search|tel)$/.test(N) || (/^(url|email)$/.test(N) ? P = G.checkValidity && G.checkValidity() === !1 : P = G.value != h)), H[M[O]] = !! P
            }
            return H
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var w = "2.6.2",
        y = {}, I = !0,
        J = d.documentElement,
        D = "modernizr",
        v = d.createElement(D),
        F = v.style,
        G = d.createElement("input"),
        h = ":)",
        j = {}.toString,
        B = " -webkit- -moz- -o- -ms- ".split(" "),
        C = "Webkit Moz O ms",
        e = C.split(" "),
        g = C.toLowerCase().split(" "),
        x = {
            svg: "http://www.w3.org/2000/svg"
        }, z = {}, H = {}, A = {}, q = [],
        r = q.slice,
        a, L = function (R, M, W, P) {
            var V, O, Q, N, U = d.createElement("div"),
                S = d.body,
                T = S || d.createElement("body");
            if (parseInt(W, 10)) {
                while (W--) {
                    Q = d.createElement("div"), Q.id = P ? P[W] : D + (W + 1), U.appendChild(Q)
                }
            }
            return V = ["�", '<style id="s', D, '">', R, "</style>"].join(""), U.id = D, (S ? U : T).innerHTML += V, T.appendChild(U), S || (T.style.background = "", T.style.overflow = "hidden", N = J.style.overflow, J.style.overflow = "hidden", J.appendChild(T)), O = M(U, R), S ? U.parentNode.removeChild(U) : (T.parentNode.removeChild(T), J.style.overflow = N), !! O
        }, c = function (M) {
            var O = E.matchMedia || E.msMatchMedia;
            if (O) {
                return O(M).matches
            }
            var N;
            return L("@media " + M + " { #" + D + " { position: absolute; } }", function (P) {
                N = (E.getComputedStyle ? getComputedStyle(P, null) : P.currentStyle)["position"] == "absolute"
            }), N
        }, l = function () {
            function M(P, Q) {
                Q = Q || d.createElement(N[P] || "div"), P = "on" + P;
                var O = P in Q;
                return O || (Q.setAttribute || (Q = d.createElement("div")), Q.setAttribute && Q.removeAttribute && (Q.setAttribute(P, ""), O = m(Q[P], "function"), m(Q[P], "undefined") || (Q[P] = K), Q.removeAttribute(P))), Q = null, O
            }
            var N = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return M
        }(),
        f = {}.hasOwnProperty,
        s;
    !m(f, "undefined") && !m(f.call, "undefined") ? s = function (N, M) {
        return f.call(N, M)
    } : s = function (N, M) {
        return M in N && m(N.constructor.prototype[M], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (O) {
        var P = this;
        if (typeof P != "function") {
            throw new TypeError
        }
        var N = r.call(arguments, 1),
            M = function () {
                if (this instanceof M) {
                    var R = function () {};
                    R.prototype = P.prototype;
                    var S = new R,
                        Q = P.apply(S, N.concat(r.call(arguments)));
                    return Object(Q) === Q ? Q : S
                }
                return P.apply(O, N.concat(r.call(arguments)))
            };
        return M
    }), z.flexbox = function () {
        return p("flexWrap")
    }, z.canvas = function () {
        var M = d.createElement("canvas");
        return !!M.getContext && !! M.getContext("2d")
    }, z.canvastext = function () {
        return !!y.canvas && !! m(d.createElement("canvas").getContext("2d").fillText, "function")
    }, z.webgl = function () {
        return !!E.WebGLRenderingContext
    }, z.touch = function () {
        var M;
        return "ontouchstart" in E || E.DocumentTouch && d instanceof DocumentTouch ? M = !0 : L(["@media (", B.join("touch-enabled),("), D, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (N) {
            M = N.offsetTop === 9
        }), M
    }, z.geolocation = function () {
        return "geolocation" in navigator
    }, z.postmessage = function () {
        return !!E.postMessage
    }, z.websqldatabase = function () {
        return !!E.openDatabase
    }, z.indexedDB = function () {
        return !!p("indexedDB", E)
    }, z.hashchange = function () {
        return l("hashchange", E) && (d.documentMode === K || d.documentMode > 7)
    }, z.history = function () {
        return !!E.history && !! history.pushState
    }, z.draganddrop = function () {
        var M = d.createElement("div");
        return "draggable" in M || "ondragstart" in M && "ondrop" in M
    }, z.websockets = function () {
        return "WebSocket" in E || "MozWebSocket" in E
    }, z.rgba = function () {
        return k("background-color:rgba(150,255,150,.5)"), u(F.backgroundColor, "rgba")
    }, z.hsla = function () {
        return k("background-color:hsla(120,40%,100%,.5)"), u(F.backgroundColor, "rgba") || u(F.backgroundColor, "hsla")
    }, z.multiplebgs = function () {
        return k("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(F.background)
    }, z.backgroundsize = function () {
        return p("backgroundSize")
    }, z.borderimage = function () {
        return p("borderImage")
    }, z.borderradius = function () {
        return p("borderRadius")
    }, z.boxshadow = function () {
        return p("boxShadow")
    }, z.textshadow = function () {
        return d.createElement("div").style.textShadow === ""
    }, z.opacity = function () {
        return b("opacity:.55"), /^0.55$/.test(F.opacity)
    }, z.cssanimations = function () {
        return p("animationName")
    }, z.csscolumns = function () {
        return p("columnCount")
    }, z.cssgradients = function () {
        var O = "background-image:",
            M = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            N = "linear-gradient(left top,#9f9, white);";
        return k((O + "-webkit- ".split(" ").join(M + O) + B.join(N + O)).slice(0, -O.length)), u(F.backgroundImage, "gradient")
    }, z.cssreflections = function () {
        return p("boxReflect")
    }, z.csstransforms = function () {
        return !!p("transform")
    }, z.csstransforms3d = function () {
        var M = !! p("perspective");
        return M && "webkitPerspective" in J.style && L("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (O, N) {
            M = O.offsetLeft === 9 && O.offsetHeight === 3
        }), M
    }, z.csstransitions = function () {
        return p("transition")
    }, z.fontface = function () {
        var M;
        return L('@font-face {font-family:"font";src:url("https:///")}', function (Q, R) {
            var P = d.getElementById("smodernizr"),
                N = P.sheet || P.styleSheet,
                O = N ? N.cssRules && N.cssRules[0] ? N.cssRules[0].cssText : N.cssText || "" : "";
            M = /src/i.test(O) && O.indexOf(R.split(" ")[0]) === 0
        }), M
    }, z.generatedcontent = function () {
        var M;
        return L(["#", D, "{font:0/0 a}#", D, ':after{content:"', h, '";visibility:hidden;font:3px/1 a}'].join(""), function (N) {
            M = N.offsetHeight >= 3
        }), M
    }, z.video = function () {
        var N = d.createElement("video"),
            M = !1;
        try {
            if (M = !! N.canPlayType) {
                M = new Boolean(M), M.ogg = N.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), M.h264 = N.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), M.webm = N.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
            }
        } catch (O) {}
        return M
    }, z.audio = function () {
        var N = d.createElement("audio"),
            M = !1;
        try {
            if (M = !! N.canPlayType) {
                M = new Boolean(M), M.ogg = N.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), M.mp3 = N.canPlayType("audio/mpeg;").replace(/^no$/, ""), M.wav = N.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), M.m4a = (N.canPlayType("audio/x-m4a;") || N.canPlayType("audio/aac;")).replace(/^no$/, "")
            }
        } catch (O) {}
        return M
    }, z.localstorage = function () {
        try {
            return localStorage.setItem(D, D), localStorage.removeItem(D), !0
        } catch (M) {
            return !1
        }
    }, z.sessionstorage = function () {
        try {
            return sessionStorage.setItem(D, D), sessionStorage.removeItem(D), !0
        } catch (M) {
            return !1
        }
    }, z.webworkers = function () {
        return !!E.Worker
    }, z.applicationcache = function () {
        return !!E.applicationCache
    }, z.svg = function () {
        return !!d.createElementNS && !! d.createElementNS(x.svg, "svg").createSVGRect
    }, z.inlinesvg = function () {
        var M = d.createElement("div");
        return M.innerHTML = "<svg/>", (M.firstChild && M.firstChild.namespaceURI) == x.svg
    }, z.smil = function () {
        return !!d.createElementNS && /SVGAnimate/.test(j.call(d.createElementNS(x.svg, "animate")))
    }, z.svgclippaths = function () {
        return !!d.createElementNS && /SVGClipPath/.test(j.call(d.createElementNS(x.svg, "clipPath")))
    };
    for (var i in z) {
        s(z, i) && (a = i.toLowerCase(), y[a] = z[i](), q.push((y[a] ? "" : "no-") + a))
    }
    return y.input || n(), y.addTest = function (O, M) {
        if (typeof O == "object") {
            for (var N in O) {
                s(O, N) && y.addTest(N, O[N])
            }
        } else {
            O = O.toLowerCase();
            if (y[O] !== K) {
                return y
            }
            M = typeof M == "function" ? M() : M, typeof I != "undefined" && I && (J.className += " " + (M ? "" : "no-") + O), y[O] = M
        }
        return y
    }, k(""), v = G = null,
    function (Z, ab) {
        function N(af, ag) {
            var ah = af.createElement("p"),
                ae = af.getElementsByTagName("head")[0] || af.documentElement;
            return ah.innerHTML = "x<style>" + ag + "</style>", ae.insertBefore(ah.lastChild, ae.firstChild)
        }

        function ac() {
            var ae = V.elements;
            return typeof ae == "string" ? ae.split(" ") : ae
        }

        function ad(af) {
            var ae = S[af[X]];
            return ae || (ae = {}, R++, af[X] = R, S[R] = ae), ae
        }

        function P(ae, af, ah) {
            af || (af = ab);
            if (M) {
                return af.createElement(ae)
            }
            ah || (ah = ad(af));
            var ag;
            return ah.cache[ae] ? ag = ah.cache[ae].cloneNode() : U.test(ae) ? ag = (ah.cache[ae] = ah.createElem(ae)).cloneNode() : ag = ah.createElem(ae), ag.canHaveChildren && !Y.test(ae) ? ah.frag.appendChild(ag) : ag
        }

        function Q(ah, ae) {
            ah || (ah = ab);
            if (M) {
                return ah.createDocumentFragment()
            }
            ae = ae || ad(ah);
            var ag = ae.frag.cloneNode(),
                aj = 0,
                ai = ac(),
                af = ai.length;
            for (; aj < af; aj++) {
                ag.createElement(ai[aj])
            }
            return ag
        }

        function T(af, ae) {
            ae.cache || (ae.cache = {}, ae.createElem = af.createElement, ae.createFrag = af.createDocumentFragment, ae.frag = ae.createFrag()), af.createElement = function (ag) {
                return V.shivMethods ? P(ag, af, ae) : ae.createElem(ag)
            }, af.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + ac().join().replace(/\w+/g, function (ag) {
                return ae.createElem(ag), ae.frag.createElement(ag), 'c("' + ag + '")'
            }) + ");return n}")(V, ae.frag)
        }

        function O(af) {
            af || (af = ab);
            var ae = ad(af);
            return V.shivCSS && !aa && !ae.hasCSS && (ae.hasCSS = !! N(af, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), M || T(af, ae), af
        }
        var W = Z.html5 || {}, Y = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            U = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            aa, X = "_html5shiv",
            R = 0,
            S = {}, M;
        (function () {
            try {
                var af = ab.createElement("a");
                af.innerHTML = "<xyz></xyz>", aa = "hidden" in af, M = af.childNodes.length == 1 || function () {
                    ab.createElement("a");
                    var ag = ab.createDocumentFragment();
                    return typeof ag.cloneNode == "undefined" || typeof ag.createDocumentFragment == "undefined" || typeof ag.createElement == "undefined"
                }()
            } catch (ae) {
                aa = !0, M = !0
            }
        })();
        var V = {
            elements: W.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: W.shivCSS !== !1,
            supportsUnknownElements: M,
            shivMethods: W.shivMethods !== !1,
            type: "default",
            shivDocument: O,
            createElement: P,
            createDocumentFragment: Q
        };
        Z.html5 = V, O(ab)
    }(this, d), y._version = w, y._prefixes = B, y._domPrefixes = g, y._cssomPrefixes = e, y.mq = c, y.hasEvent = l, y.testProp = function (M) {
        return o([M])
    }, y.testAllProps = p, y.testStyles = L, y.prefixed = function (O, M, N) {
        return M ? p(O, M, N) : p(O, "pfx")
    }, J.className = J.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (I ? " js " + q.join(" ") : ""), y
}(this, this.document),
function (a, b, c) {
    function A(C) {
        return "[object Function]" == l.call(C)
    }

    function d(C) {
        return "string" == typeof C
    }

    function B() {}

    function z(C) {
        return !C || "loaded" == C || "complete" == C || "uninitialized" == C
    }

    function e() {
        var C = m.shift();
        n = 1, C ? C.t ? j(function () {
            ("c" == C.t ? u.injectCss : u.injectJs)(C.s, 0, C.a, C.x, C.e, 1)
        }, 0) : (C(), e()) : n = 0
    }

    function f(K, C, M, E, N, G, D) {
        function I(O) {
            if (!H && z(L.readyState) && (F.r = H = 1, !n && e(), L.onload = L.onreadystatechange = null, O)) {
                "img" != K && j(function () {
                    q.removeChild(L)
                }, 50);
                for (var P in w[C]) {
                    w[C].hasOwnProperty(P) && w[C][P].onload()
                }
            }
        }
        var D = D || u.errorTimeout,
            L = b.createElement(K),
            H = 0,
            J = 0,
            F = {
                t: M,
                s: C,
                e: N,
                a: G,
                x: D
            };
        1 === w[C] && (J = 1, w[C] = []), "object" == K ? L.data = C : (L.src = C, L.type = K), L.width = L.height = "0", L.onerror = L.onload = L.onreadystatechange = function () {
            I.call(this, J)
        }, m.splice(E, 0, F), "img" != K && (J || 2 === w[C] ? (q.insertBefore(L, p ? null : k), j(I, D)) : w[C].push(L))
    }

    function g(F, G, E, D, C) {
        return n = 0, G = G || "j", d(F) ? f("c" == G ? s : r, F, G, this.i++, E, D, C) : (m.splice(this.i++, 0, F), 1 == m.length && e()), this
    }

    function h() {
        var C = u;
        return C.loader = {
            load: g,
            i: 0
        }, C
    }
    var i = b.documentElement,
        j = a.setTimeout,
        k = b.getElementsByTagName("script")[0],
        l = {}.toString,
        m = [],
        n = 0,
        o = "MozAppearance" in i.style,
        p = o && !! b.createRange().compareNode,
        q = p ? i : k.parentNode,
        i = a.opera && "[object Opera]" == l.call(a.opera),
        i = !! b.attachEvent && !i,
        r = o ? "object" : i ? "script" : "img",
        s = i ? "script" : r,
        t = Array.isArray || function (C) {
            return "[object Array]" == l.call(C)
        }, v = [],
        w = {}, y = {
            timeout: function (D, C) {
                return C.length && (D.timeout = C[0]), D
            }
        }, x, u;
    u = function (E) {
        function C(L) {
            var L = L.split("!"),
                M = v.length,
                N = L.pop(),
                J = L.length,
                N = {
                    url: N,
                    origUrl: N,
                    prefixes: L
                }, K, P, O;
            for (P = 0; P < J; P++) {
                O = L[P].split("="), (K = y[O.shift()]) && (N = K(N, O))
            }
            for (P = 0; P < M; P++) {
                N = v[P](N)
            }
            return N
        }

        function F(J, M, P, O, K) {
            var L = C(J),
                N = L.autoCallback;
            L.url.split(".").pop().split("?").shift(), L.bypass || (M && (M = A(M) ? M : M[J] || M[O] || M[J.split("index.html").pop().split("?")[0]]), L.instead ? L.instead(J, M, P, O, K) : (w[L.url] ? L.noexec = !0 : w[L.url] = 1, P.load(L.url, L.forceCSS || !L.forceJS && "css" == L.url.split(".").pop().split("?").shift() ? "c" : c, L.noexec, L.attrs, L.timeout), (A(M) || A(N)) && P.load(function () {
                h(), M && M(L.origUrl, K, O), N && N(L.origUrl, K, O), w[L.url] = 2
            })))
        }

        function G(L, N) {
            function S(U, T) {
                if (U) {
                    if (d(U)) {
                        T || (M = function () {
                            var V = [].slice.call(arguments);
                            J.apply(this, V), O()
                        }), F(U, M, N, 0, K)
                    } else {
                        if (Object(U) === U) {
                            for (R in Q = function () {
                                var V = 0,
                                    W;
                                for (W in U) {
                                    U.hasOwnProperty(W) && V++
                                }
                                return V
                            }(), U) {
                                U.hasOwnProperty(R) && (!T && !--Q && (A(M) ? M = function () {
                                    var V = [].slice.call(arguments);
                                    J.apply(this, V), O()
                                } : M[R] = function (V) {
                                    return function () {
                                        var W = [].slice.call(arguments);
                                        V && V.apply(this, W), O()
                                    }
                                }(J[R])), F(U[R], M, N, R, K))
                            }
                        }
                    }
                } else {
                    !T && O()
                }
            }
            var K = !! L.test,
                P = L.load || L.both,
                M = L.callback || B,
                J = M,
                O = L.complete || B,
                Q, R;
            S(K ? L.yep : L.nope, !! P), P && S(P)
        }
        var I, D, H = this.yepnope.loader;
        if (d(E)) {
            F(E, 0, H, 0)
        } else {
            if (t(E)) {
                for (I = 0; I < E.length; I++) {
                    D = E[I], d(D) ? F(D, 0, H, 0) : t(D) ? u(D) : Object(D) === D && G(D, H)
                }
            } else {
                Object(E) === E && G(E, H)
            }
        }
    }, u.addPrefix = function (D, C) {
        y[D] = C
    }, u.addFilter = function (C) {
        v.push(C)
    }, u.errorTimeout = 10000, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", x = function () {
        b.removeEventListener("DOMContentLoaded", x, 0), b.readyState = "complete"
    }, 0)), a.yepnope = h(), a.yepnope.executeStack = e, a.yepnope.injectJs = function (F, C, G, I, E, K) {
        var J = b.createElement("script"),
            D, H, I = I || u.errorTimeout;
        J.src = F;
        for (H in G) {
            J.setAttribute(H, G[H])
        }
        C = K ? e : C || B, J.onreadystatechange = J.onload = function () {
            !D && z(J.readyState) && (D = 1, C(), J.onload = J.onreadystatechange = null)
        }, j(function () {
            D || (D = 1, C(1))
        }, I), E ? J.onload() : k.parentNode.insertBefore(J, k)
    }, a.yepnope.injectCss = function (D, C, E, H, F, G) {
        var H = b.createElement("link"),
            I, C = G ? e : C || B;
        H.href = D, H.rel = "stylesheet", H.type = "text/css";
        for (I in E) {
            H.setAttribute(I, E[I])
        }
        F || (k.parentNode.insertBefore(H, k), j(C, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
(function (f) {
    f.prettyPhoto = {
        version: "3.1.2"
    };
    f.fn.prettyPhoto = function (E) {
        E = jQuery.extend({
            animation_speed: "fast",
            slideshow: 5000,
            autoplay_slideshow: false,
            opacity: 0.8,
            show_title: true,
            allow_resize: true,
            default_width: 500,
            default_height: 344,
            counter_separator_label: "/",
            theme: "pp_default",
            horizontal_padding: 20,
            hideflash: false,
            wmode: "opaque",
            autoplay: true,
            modal: false,
            deeplinking: true,
            overlay_gallery: true,
            keyboard_shortcuts: true,
            changepicturecallback: function () {},
            callback: function () {},
            ie6_fallback: true,
            markup: '<div class="pp_pic_holder"><div class="ppt"> </div><div class="pp_top"><div class="pp_left"></div><div class="pp_middle"></div><div class="pp_right"></div></div><div class="pp_content_container"><div class="pp_left"><div class="pp_right"><div class="pp_content"><div class="pp_loaderIcon"></div><div class="pp_fade"><a href="#" class="pp_expand" title="Expand the image">Expand</a><div class="pp_hoverContainer"><a class="pp_next" href="#">next</a><a class="pp_previous" href="#">previous</a></div><div id="pp_full_res"></div><div class="pp_details"><div class="pp_nav"><a href="#" class="pp_arrow_previous">Previous</a><p class="currentTextHolder">0/0</p><a href="#" class="pp_arrow_next">Next</a></div><p class="pp_description"></p>{pp_social}<a class="pp_close" href="#">Close</a></div></div></div></div></div></div><div class="pp_bottom"><div class="pp_left"></div><div class="pp_middle"></div><div class="pp_right"></div></div></div><div class="pp_overlay"></div>',
            gallery_markup: '<div class="pp_gallery"><a href="#" class="pp_arrow_previous">Previous</a><div><ul>{gallery}</ul></div><a href="#" class="pp_arrow_next">Next</a></div>',
            image_markup: '<img id="fullResImage" src="{path}" />',
            flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup: '<div class="pp_inline">{content}</div>',
            custom_markup: "",
            social_tools: '<div class="pp_social"><div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href=' + location.href + '&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div></div>'
        }, E);
        var N = this,
            R = false,
            S, D, F, T, J, d, M = f(window).height(),
            I = f(window).width(),
            H;
        doresize = true, scroll_pos = O();
        f(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function () {
            a();
            Q()
        });
        if (E.keyboard_shortcuts) {
            f(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function (i) {
                if (typeof $pp_pic_holder != "undefined") {
                    if ($pp_pic_holder.is(":visible")) {
                        switch (i.keyCode) {
                        case 37:
                            f.prettyPhoto.changePage("previous");
                            i.preventDefault();
                            break;
                        case 39:
                            f.prettyPhoto.changePage("next");
                            i.preventDefault();
                            break;
                        case 27:
                            if (!settings.modal) {
                                f.prettyPhoto.close()
                            }
                            i.preventDefault();
                            break
                        }
                    }
                }
            })
        }
        f.prettyPhoto.initialize = function () {
            settings = E;
            if (settings.theme == "pp_default") {
                settings.horizontal_padding = 16
            }
            if (settings.ie6_fallback && f.browser.msie && parseInt(f.browser.version) == 6) {
                settings.theme = "light_square"
            }
            theRel = f(this).attr("rel");
            galleryRegExp = /\[(?:.*)\]/;
            isSet = (galleryRegExp.exec(theRel)) ? true : false;
            pp_images = (isSet) ? jQuery.map(N, function (j, i) {
                if (f(j).attr("rel").indexOf(theRel) != -1) {
                    return f(j).attr("href")
                }
            }) : f.makeArray(f(this).attr("href"));
            pp_titles = (isSet) ? jQuery.map(N, function (j, i) {
                if (f(j).attr("rel").indexOf(theRel) != -1) {
                    return (f(j).find("img").attr("alt")) ? f(j).find("img").attr("alt") : ""
                }
            }) : f.makeArray(f(this).find("img").attr("alt"));
            pp_descriptions = (isSet) ? jQuery.map(N, function (j, i) {
                if (f(j).attr("rel").indexOf(theRel) != -1) {
                    return (f(j).attr("title")) ? f(j).attr("title") : ""
                }
            }) : f.makeArray(f(this).attr("title"));
            set_position = jQuery.inArray(f(this).attr("href"), pp_images);
            rel_index = (isSet) ? set_position : f("a[rel^='" + theRel + "']").index(f(this));
            c(this);
            if (settings.allow_resize) {
                f(window).bind("scroll.prettyphoto", function () {
                    a()
                })
            }
            f.prettyPhoto.open();
            return false
        };
        f.prettyPhoto.open = function (i) {
            if (typeof settings == "undefined") {
                settings = E;
                if (f.browser.msie && f.browser.version == 6) {
                    settings.theme = "light_square"
                }
                pp_images = f.makeArray(arguments[0]);
                pp_titles = (arguments[1]) ? f.makeArray(arguments[1]) : f.makeArray("");
                pp_descriptions = (arguments[2]) ? f.makeArray(arguments[2]) : f.makeArray("");
                isSet = (pp_images.length > 1) ? true : false;
                set_position = 0;
                c(i.target)
            }
            if (f.browser.msie && f.browser.version == 6) {
                f("select").css("visibility", "hidden")
            }
            if (settings.hideflash) {
                f("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden")
            }
            P(f(pp_images).size());
            f(".pp_loaderIcon").show();
            if ($ppt.is(":hidden")) {
                $ppt.css("opacity", 0).show()
            }
            $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
            $pp_pic_holder.find(".currentTextHolder").text((set_position + 1) + settings.counter_separator_label + f(pp_images).size());
            if (pp_descriptions[set_position] != "") {
                $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))
            } else {
                $pp_pic_holder.find(".pp_description").hide()
            }
            movie_width = (parseFloat(e("width", pp_images[set_position]))) ? e("width", pp_images[set_position]) : settings.default_width.toString();
            movie_height = (parseFloat(e("height", pp_images[set_position]))) ? e("height", pp_images[set_position]) : settings.default_height.toString();
            R = false;
            if (movie_height.indexOf("%") != -1) {
                movie_height = parseFloat((f(window).height() * parseFloat(movie_height) / 100) - 150);
                R = true
            }
            if (movie_width.indexOf("%") != -1) {
                movie_width = parseFloat((f(window).width() * parseFloat(movie_width) / 100) - 150);
                R = true
            }
            $pp_pic_holder.fadeIn(function () {
                (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html(" ");
                imgPreloader = "";
                skipInjection = false;
                switch (L(pp_images[set_position])) {
                case "image":
                    imgPreloader = new Image();
                    nextImage = new Image();
                    if (isSet && set_position < f(pp_images).size() - 1) {
                        nextImage.src = pp_images[set_position + 1]
                    }
                    prevImage = new Image();
                    if (isSet && pp_images[set_position - 1]) {
                        prevImage.src = pp_images[set_position - 1]
                    }
                    $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);
                    imgPreloader.onload = function () {
                        S = G(imgPreloader.width, imgPreloader.height);
                        C()
                    };
                    imgPreloader.onerror = function () {
                        alert("Image cannot be loaded. Make sure the path is correct and image exist.");
                        f.prettyPhoto.close()
                    };
                    imgPreloader.src = pp_images[set_position];
                    break;
                case "youtube":
                    S = G(movie_width, movie_height);
                    movie = "http://www.youtube.com/embed/" + e("v", pp_images[set_position]);
                    (e("rel", pp_images[set_position])) ? movie += "?rel=" + e("rel", pp_images[set_position]) : movie += "?rel=1";
                    if (settings.autoplay) {
                        movie += "&autoplay=1"
                    }
                    toInject = settings.iframe_markup.replace(/{width}/g, S.width).replace(/{height}/g, S.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
                    break;
                case "vimeo":
                    S = G(movie_width, movie_height);
                    movie_id = pp_images[set_position];
                    var k = /http:\/\/(www\.)?vimeo.com\/(\d+)/;
                    var j = movie_id.match(k);
                    movie = "http://player.vimeo.com/video/" + j[2] + "?title=0&byline=0&portrait=0";
                    if (settings.autoplay) {
                        movie += "&autoplay=1;"
                    }
                    vimeo_width = S.width + "/embed/?moog_width=" + S.width;
                    toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, S.height).replace(/{path}/g, movie);
                    break;
                case "quicktime":
                    S = G(movie_width, movie_height);
                    S.height += 15;
                    S.contentHeight += 15;
                    S.containerHeight += 15;
                    toInject = settings.quicktime_markup.replace(/{width}/g, S.width).replace(/{height}/g, S.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
                    break;
                case "flash":
                    S = G(movie_width, movie_height);
                    flash_vars = pp_images[set_position];
                    flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length);
                    filename = pp_images[set_position];
                    filename = filename.substring(0, filename.indexOf("?"));
                    toInject = settings.flash_markup.replace(/{width}/g, S.width).replace(/{height}/g, S.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
                    break;
                case "iframe":
                    S = G(movie_width, movie_height);
                    frame_url = pp_images[set_position];
                    frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
                    toInject = settings.iframe_markup.replace(/{width}/g, S.width).replace(/{height}/g, S.height).replace(/{path}/g, frame_url);
                    break;
                case "ajax":
                    doresize = false;
                    S = G(movie_width, movie_height);
                    doresize = true;
                    skipInjection = true;
                    f.get(pp_images[set_position], function (l) {
                        toInject = settings.inline_markup.replace(/{content}/g, l);
                        $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
                        C()
                    });
                    break;
                case "custom":
                    S = G(movie_width, movie_height);
                    toInject = settings.custom_markup;
                    break;
                case "inline":
                    myClone = f(pp_images[set_position]).clone().append('<br clear="all" />').css({
                        width: settings.default_width
                    }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(f("body")).show();
                    doresize = false;
                    S = G(f(myClone).width(), f(myClone).height());
                    doresize = true;
                    f(myClone).remove();
                    toInject = settings.inline_markup.replace(/{content}/g, f(pp_images[set_position]).html());
                    break
                }
                if (!imgPreloader && !skipInjection) {
                    $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
                    C()
                }
            });
            return false
        };
        f.prettyPhoto.changePage = function (i) {
            currentGalleryPage = 0;
            if (i == "previous") {
                set_position--;
                if (set_position < 0) {
                    set_position = f(pp_images).size() - 1
                }
            } else {
                if (i == "next") {
                    set_position++;
                    if (set_position > f(pp_images).size() - 1) {
                        set_position = 0
                    }
                } else {
                    set_position = i
                }
            }
            rel_index = set_position;
            if (!doresize) {
                doresize = true
            }
            f(".pp_contract").removeClass("pp_contract").addClass("pp_expand");
            B(function () {
                f.prettyPhoto.open()
            })
        };
        f.prettyPhoto.changeGalleryPage = function (i) {
            if (i == "next") {
                currentGalleryPage++;
                if (currentGalleryPage > totalPage) {
                    currentGalleryPage = 0
                }
            } else {
                if (i == "previous") {
                    currentGalleryPage--;
                    if (currentGalleryPage < 0) {
                        currentGalleryPage = totalPage
                    }
                } else {
                    currentGalleryPage = i
                }
            }
            slide_speed = (i == "next" || i == "previous") ? settings.animation_speed : 0;
            slide_to = currentGalleryPage * (itemsPerPage * itemWidth);
            $pp_gallery.find("ul").animate({
                left: -slide_to
            }, slide_speed)
        };
        f.prettyPhoto.startSlideshow = function () {
            if (typeof H == "undefined") {
                $pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function () {
                    f.prettyPhoto.stopSlideshow();
                    return false
                });
                H = setInterval(f.prettyPhoto.startSlideshow, settings.slideshow)
            } else {
                f.prettyPhoto.changePage("next")
            }
        };
        f.prettyPhoto.stopSlideshow = function () {
            $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function () {
                f.prettyPhoto.startSlideshow();
                return false
            });
            clearInterval(H);
            H = undefined
        };
        f.prettyPhoto.close = function () {
            if ($pp_overlay.is(":animated")) {
                return
            }
            f.prettyPhoto.stopSlideshow();
            $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden");
            f("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () {
                f(this).remove()
            });
            $pp_overlay.fadeOut(settings.animation_speed, function () {
                if (f.browser.msie && f.browser.version == 6) {
                    f("select").css("visibility", "visible")
                }
                if (settings.hideflash) {
                    f("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible")
                }
                f(this).remove();
                f(window).unbind("scroll.prettyphoto");
                settings.callback();
                doresize = true;
                D = false;
                delete settings
            })
        };

        function C() {
            f(".pp_loaderIcon").hide();
            projectedTop = scroll_pos.scrollTop + ((M / 2) - (S.containerHeight / 2));
            if (projectedTop < 0) {
                projectedTop = 0
            }
            $ppt.fadeTo(settings.animation_speed, 1);
            $pp_pic_holder.find(".pp_content").animate({
                height: S.contentHeight,
                width: S.contentWidth
            }, settings.animation_speed);
            $pp_pic_holder.animate({
                top: projectedTop,
                left: (I / 2) - (S.containerWidth / 2),
                width: S.containerWidth
            }, settings.animation_speed, function () {
                $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(S.height).width(S.width);
                $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);
                if (isSet && L(pp_images[set_position]) == "image") {
                    $pp_pic_holder.find(".pp_hoverContainer").show()
                } else {
                    $pp_pic_holder.find(".pp_hoverContainer").hide()
                } if (S.resized) {
                    f("a.pp_expand,a.pp_contract").show()
                } else {
                    f("a.pp_expand").hide()
                } if (settings.autoplay_slideshow && !H && !D) {
                    f.prettyPhoto.startSlideshow()
                }
                if (settings.deeplinking) {
                    h()
                }
                settings.changepicturecallback();
                D = true
            });
            b()
        }

        function B(i) {
            $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
            $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () {
                f(".pp_loaderIcon").show();
                i()
            })
        }

        function P(i) {
            (i > 1) ? f(".pp_nav").show() : f(".pp_nav").hide()
        }

        function G(i, j) {
            resized = false;
            K(i, j);
            imageWidth = i, imageHeight = j;
            if (((d > I) || (J > M)) && doresize && settings.allow_resize && !R) {
                resized = true, fitting = false;
                while (!fitting) {
                    if ((d > I)) {
                        imageWidth = (I - 200);
                        imageHeight = (j / i) * imageWidth
                    } else {
                        if ((J > M)) {
                            imageHeight = (M - 200);
                            imageWidth = (i / j) * imageHeight
                        } else {
                            fitting = true
                        }
                    }
                    J = imageHeight, d = imageWidth
                }
                K(imageWidth, imageHeight);
                if ((d > I) || (J > M)) {
                    G(d, J)
                }
            }
            return {
                width: Math.floor(imageWidth),
                height: Math.floor(imageHeight),
                containerHeight: Math.floor(J),
                containerWidth: Math.floor(d) + (settings.horizontal_padding * 2),
                contentHeight: Math.floor(F),
                contentWidth: Math.floor(T),
                resized: resized
            }
        }

        function K(i, j) {
            i = parseFloat(i);
            j = parseFloat(j);
            $pp_details = $pp_pic_holder.find(".pp_details");
            $pp_details.width(i);
            detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"));
            $pp_details = $pp_details.clone().addClass(settings.theme).width(i).appendTo(f("body")).css({
                position: "absolute",
                top: -10000
            });
            detailsHeight += $pp_details.height();
            detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight;
            if (f.browser.msie && f.browser.version == 7) {
                detailsHeight += 8
            }
            $pp_details.remove();
            $pp_title = $pp_pic_holder.find(".ppt");
            $pp_title.width(i);
            titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom"));
            $pp_title = $pp_title.clone().appendTo(f("body")).css({
                position: "absolute",
                top: -10000
            });
            titleHeight += $pp_title.height();
            $pp_title.remove();
            F = j + detailsHeight;
            T = i;
            J = F + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height();
            d = i
        }

        function L(i) {
            if (i.match(/youtube\.com\/watch/i)) {
                return "youtube"
            } else {
                if (i.match(/vimeo\.com/i)) {
                    return "vimeo"
                } else {
                    if (i.match(/\b.mov\b/i)) {
                        return "quicktime"
                    } else {
                        if (i.match(/\b.swf\b/i)) {
                            return "flash"
                        } else {
                            if (i.match(/\biframe=true\b/i)) {
                                return "iframe"
                            } else {
                                if (i.match(/\bajax=true\b/i)) {
                                    return "ajax"
                                } else {
                                    if (i.match(/\bcustom=true\b/i)) {
                                        return "custom"
                                    } else {
                                        if (i.substr(0, 1) == "#") {
                                            return "inline"
                                        } else {
                                            return "image"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function a() {
            if (doresize && typeof $pp_pic_holder != "undefined") {
                scroll_pos = O();
                contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
                projectedTop = (M / 2) + scroll_pos.scrollTop - (contentHeight / 2);
                if (projectedTop < 0) {
                    projectedTop = 0
                }
                if (contentHeight > M) {
                    return
                }
                $pp_pic_holder.css({
                    top: projectedTop,
                    left: (I / 2) + scroll_pos.scrollLeft - (contentwidth / 2)
                })
            }
        }

        function O() {
            if (self.pageYOffset) {
                return {
                    scrollTop: self.pageYOffset,
                    scrollLeft: self.pageXOffset
                }
            } else {
                if (document.documentElement && document.documentElement.scrollTop) {
                    return {
                        scrollTop: document.documentElement.scrollTop,
                        scrollLeft: document.documentElement.scrollLeft
                    }
                } else {
                    if (document.body) {
                        return {
                            scrollTop: document.body.scrollTop,
                            scrollLeft: document.body.scrollLeft
                        }
                    }
                }
            }
        }

        function Q() {
            M = f(window).height(), I = f(window).width();
            if (typeof $pp_overlay != "undefined") {
                $pp_overlay.height(f(document).height()).width(I)
            }
        }

        function b() {
            if (isSet && settings.overlay_gallery && L(pp_images[set_position]) == "image" && (settings.ie6_fallback && !(f.browser.msie && parseInt(f.browser.version) == 6))) {
                itemWidth = 52 + 5;
                navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30;
                itemsPerPage = Math.floor((S.containerWidth - 100 - navWidth) / itemWidth);
                itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
                totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
                if (totalPage == 0) {
                    navWidth = 0;
                    $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()
                } else {
                    $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()
                }
                galleryWidth = itemsPerPage * itemWidth;
                fullGalleryWidth = pp_images.length * itemWidth;
                $pp_gallery.css("margin-left", -((galleryWidth / 2) + (navWidth / 2))).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");
                goToPage = (Math.floor(set_position / itemsPerPage) < totalPage) ? Math.floor(set_position / itemsPerPage) : totalPage;
                f.prettyPhoto.changeGalleryPage(goToPage);
                $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")
            } else {
                $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
            }
        }

        function c(j) {
            settings.markup = settings.markup.replace("{pp_social}", (settings.social_tools) ? settings.social_tools : "");
            f("body").append(settings.markup);
            $pp_pic_holder = f(".pp_pic_holder"), $ppt = f(".ppt"), $pp_overlay = f("div.pp_overlay");
            if (isSet && settings.overlay_gallery) {
                currentGalleryPage = 0;
                toInject = "";
                for (var i = 0; i < pp_images.length; i++) {
                    if (!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
                        classname = "default";
                        img_src = ""
                    } else {
                        classname = "";
                        img_src = pp_images[i]
                    }
                    toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>"
                }
                toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
                $pp_pic_holder.find("#pp_full_res").after(toInject);
                $pp_gallery = f(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li");
                $pp_gallery.find(".pp_arrow_next").click(function () {
                    f.prettyPhoto.changeGalleryPage("next");
                    f.prettyPhoto.stopSlideshow();
                    return false
                });
                $pp_gallery.find(".pp_arrow_previous").click(function () {
                    f.prettyPhoto.changeGalleryPage("previous");
                    f.prettyPhoto.stopSlideshow();
                    return false
                });
                $pp_pic_holder.find(".pp_content").hover(function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
                }, function () {
                    $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
                });
                itemWidth = 52 + 5;
                $pp_gallery_li.each(function (k) {
                    f(this).find("a").click(function () {
                        f.prettyPhoto.changePage(k);
                        f.prettyPhoto.stopSlideshow();
                        return false
                    })
                })
            }
            if (settings.slideshow) {
                $pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');
                $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
                    f.prettyPhoto.startSlideshow();
                    return false
                })
            }
            $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme);
            $pp_overlay.css({
                opacity: 0,
                height: f(document).height(),
                width: f(window).width()
            }).bind("click", function () {
                if (!settings.modal) {
                    f.prettyPhoto.close()
                }
            });
            f("a.pp_close").bind("click", function () {
                f.prettyPhoto.close();
                return false
            });
            f("a.pp_expand").bind("click", function (k) {
                if (f(this).hasClass("pp_expand")) {
                    f(this).removeClass("pp_expand").addClass("pp_contract");
                    doresize = false
                } else {
                    f(this).removeClass("pp_contract").addClass("pp_expand");
                    doresize = true
                }
                B(function () {
                    f.prettyPhoto.open()
                });
                return false
            });
            $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () {
                f.prettyPhoto.changePage("previous");
                f.prettyPhoto.stopSlideshow();
                return false
            });
            $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () {
                f.prettyPhoto.changePage("next");
                f.prettyPhoto.stopSlideshow();
                return false
            });
            a()
        }
        if (!pp_alreadyInitialized && g()) {
            pp_alreadyInitialized = true;
            hashIndex = g();
            hashRel = hashIndex;
            hashIndex = hashIndex.substring(hashIndex.indexOf("index.html") + 1, hashIndex.length - 1);
            hashRel = hashRel.substring(0, hashRel.indexOf("index.html"));
            setTimeout(function () {
                f("a[rel^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
            }, 50)
        }
        return this.unbind("click.prettyphoto").bind("click.prettyphoto", f.prettyPhoto.initialize)
    };

    function g() {
        url = location.href;
        hashtag = (url.indexOf("#!") != -1) ? decodeURI(url.substring(url.indexOf("#!") + 2, url.length)) : false;
        return hashtag
    }

    function h() {
        if (typeof theRel == "undefined") {
            return
        }
        location.hash = "!" + theRel + "/" + rel_index + "/"
    }

    function e(j, b) {
        j = j.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var d = "[\\?&]" + j + "=([^&#]*)";
        var c = new RegExp(d);
        var a = c.exec(b);
        return (a == null) ? "" : a[1]
    }
})(jQuery);
var pp_alreadyInitialized = false;