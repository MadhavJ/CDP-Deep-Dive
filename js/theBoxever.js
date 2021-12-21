var BoxeverStorage = BoxeverStorage || {};
function initBoxeverStorage() {
    function a() {
        var a = "{}";
        if ("userDataBehavior" == s) {
            e.load("bStorage");
            try {
                a = e.getAttribute("bStorage");
            } catch (b) {}
            try {
                t = e.getAttribute("bStorage_update");
            } catch (c) {}
            f.bStorage = a;
        }
        k();
        l();
        m();
    }
    function b() {
        var v;
        clearTimeout(z);
        z = setTimeout(function () {
            if ("localStorage" == s || "globalStorage" == s) v = f.bStorage_update;
            else if ("userDataBehavior" == s) {
                e.load("bStorage");
                try {
                    v = e.getAttribute("bStorage_update");
                } catch (b) {}
            }
            if (v && v != t) {
                t = v;
                var l = q.parse(q.stringify(g.__bstorage_meta.CRC32)),
                    m;
                a();
                m = q.parse(q.stringify(g.__bstorage_meta.CRC32));
                var h,
                    d = [],
                    k = [];
                for (h in l) l.hasOwnProperty(h) && (m[h] ? l[h] != m[h] && "2." == String(l[h]).substr(0, 2) && d.push(h) : k.push(h));
                for (h in m) m.hasOwnProperty(h) && (l[h] || d.push(h));
                c(d, "updated");
                c(k, "deleted");
            }
        }, 25);
    }
    function c(a, b) {
        a = [].concat(a || []);
        if ("flushed" == b) {
            a = [];
            for (var c in r) r.hasOwnProperty(c) && a.push(c);
            b = "deleted";
        }
        c = 0;
        for (var l = a.length; c < l; c++) {
            if (r[a[c]]) for (var h = 0, f = r[a[c]].length; h < f; h++) r[a[c]][h](a[c], b);
            if (r["*"]) for (h = 0, f = r["*"].length; h < f; h++) r["*"][h](a[c], b);
        }
    }
    function d() {
        var a = (+new Date()).toString();
        "localStorage" == s || "globalStorage" == s ? (f.bStorage_update = a) : "userDataBehavior" == s && (e.setAttribute("bStorage_update", a), e.save("bStorage"));
        b();
    }
    function k() {
        if (f.bStorage)
            try {
                g = q.parse(String(f.bStorage));
            } catch (a) {
                f.bStorage = "{}";
            }
        else f.bStorage = "{}";
        w = f.bStorage ? String(f.bStorage).length : 0;
        g.__bstorage_meta || (g.__bstorage_meta = {});
        g.__bstorage_meta.CRC32 || (g.__bstorage_meta.CRC32 = {});
    }
    function n() {
        if (g.__bstorage_meta.PubSub) {
            for (var a = +new Date() - 2e3, c = 0, b = g.__bstorage_meta.PubSub.length; c < b; c++)
                if (g.__bstorage_meta.PubSub[c][0] <= a) {
                    g.__bstorage_meta.PubSub.splice(c, g.__bstorage_meta.PubSub.length - c);
                    break;
                }
            g.__bstorage_meta.PubSub.length || delete g.__bstorage_meta.PubSub;
        }
        try {
            (f.bStorage = q.stringify(g)), e && (e.setAttribute("bStorage", f.bStorage), e.save("bStorage")), (w = f.bStorage ? String(f.bStorage).length : 0);
        } catch (h) {}
    }
    function p(a) {
        if (!a || ("string" != typeof a && "number" != typeof a)) throw new TypeError("Key name must be string or numeric");
        if ("__bstorage_meta" == a) throw new TypeError("Reserved key name");
        return !0;
    }
    function l() {
        var a,
            b,
            h,
            f,
            m = Infinity,
            e = !1,
            q = [];
        clearTimeout(A);
        if (g.__bstorage_meta && "object" == typeof g.__bstorage_meta.TTL) {
            a = +new Date();
            h = g.__bstorage_meta.TTL;
            f = g.__bstorage_meta.CRC32;
            for (b in h) h.hasOwnProperty(b) && (h[b] <= a ? (delete h[b], delete f[b], delete g[b], (e = !0), q.push(b)) : h[b] < m && (m = h[b]));
            Infinity != m && (A = setTimeout(l, m - a));
            e && (n(), d(), c(q, "deleted"));
        }
    }
    function m() {
        var a;
        if (g.__bstorage_meta.PubSub) {
            var b,
                c = x;
            for (a = g.__bstorage_meta.PubSub.length - 1; 0 <= a; a--)
                if (((b = g.__bstorage_meta.PubSub[a]), b[0] > x)) {
                    var c = b[0],
                        h = b[1];
                    b = b[2];
                    if (u[h]) for (var l = 0, f = u[h].length; l < f; l++) u[h][l](h, q.parse(q.stringify(b)));
                }
            x = c;
        }
    }
    var h = window.jQuery || window.$ || (window.$ = {}),
        q = {
            parse:
                (window.JSON && (window.JSON.parse || window.JSON.decode)) ||
                (String.prototype.evalJSON &&
                    function (a) {
                        return String(a).evalJSON();
                    }) ||
                h.parseJSON ||
                h.evalJSON,
            stringify: Object.toJSON || (window.JSON && (window.JSON.stringify || window.JSON.encode)) || h.toJSON,
        };
    if (!q.parse || !q.stringify) throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var g = { __bstorage_meta: { CRC32: {} } },
        f = { bStorage: "{}" },
        e = null,
        w = 0,
        s = !1,
        r = {},
        z = !1,
        t = 0,
        u = {},
        x = +new Date(),
        A,
        y = {
            isXML: function (a) {
                return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1;
            },
            encode: function (a) {
                if (!this.isXML(a)) return !1;
                try {
                    return new XMLSerializer().serializeToString(a);
                } catch (b) {
                    try {
                        return a.xml;
                    } catch (c) {}
                }
                return !1;
            },
            decode: function (a) {
                var b =
                    ("DOMParser" in window && new DOMParser().parseFromString) ||
                    (window.ActiveXObject &&
                        function (a) {
                            var b = new ActiveXObject("Microsoft.XMLDOM");
                            b.async = "false";
                            b.loadXML(a);
                            return b;
                        });
                if (!b) return !1;
                a = b.call(("DOMParser" in window && new DOMParser()) || window, a, "text/xml");
                return this.isXML(a) ? a : !1;
            },
        };
    BoxeverStorage = {
        version: "0.4.3",
        set: function (a, b, h) {
            p(a);
            h = h || {};
            if ("undefined" == typeof b) return this.deleteKey(a), b;
            if (y.isXML(b)) b = { _is_xml: !0, xml: y.encode(b) };
            else {
                if ("function" == typeof b) return;
                b && "object" == typeof b && (b = q.parse(q.stringify(b)));
            }
            g[a] = b;
            for (var l = g.__bstorage_meta.CRC32, f = q.stringify(b), m = f.length, e = 2538058380 ^ m, d = 0, k; 4 <= m; )
                (k = (f.charCodeAt(d) & 255) | ((f.charCodeAt(++d) & 255) << 8) | ((f.charCodeAt(++d) & 255) << 16) | ((f.charCodeAt(++d) & 255) << 24)),
                    (k = 1540483477 * (k & 65535) + (((1540483477 * (k >>> 16)) & 65535) << 16)),
                    (k ^= k >>> 24),
                    (k = 1540483477 * (k & 65535) + (((1540483477 * (k >>> 16)) & 65535) << 16)),
                    (e = (1540483477 * (e & 65535) + (((1540483477 * (e >>> 16)) & 65535) << 16)) ^ k),
                    (m -= 4),
                    ++d;
            switch (m) {
                case 3:
                    e ^= (f.charCodeAt(d + 2) & 255) << 16;
                case 2:
                    e ^= (f.charCodeAt(d + 1) & 255) << 8;
                case 1:
                    (e ^= f.charCodeAt(d) & 255), (e = 1540483477 * (e & 65535) + (((1540483477 * (e >>> 16)) & 65535) << 16));
            }
            e ^= e >>> 13;
            e = 1540483477 * (e & 65535) + (((1540483477 * (e >>> 16)) & 65535) << 16);
            l[a] = "2." + ((e ^ (e >>> 15)) >>> 0);
            this.setTTL(a, h.TTL || 0);
            c(a, "updated");
            return b;
        },
        get: function (a, b) {
            p(a);
            return a in g ? (g[a] && "object" == typeof g[a] && g[a]._is_xml ? y.decode(g[a].xml) : g[a]) : "undefined" == typeof b ? null : b;
        },
        deleteKey: function (a) {
            p(a);
            return a in g ? (delete g[a], "object" == typeof g.__bstorage_meta.TTL && a in g.__bstorage_meta.TTL && delete g.__bstorage_meta.TTL[a], delete g.__bstorage_meta.CRC32[a], n(), d(), c(a, "deleted"), !0) : !1;
        },
        setTTL: function (a, b) {
            var c = +new Date();
            p(a);
            b = Number(b) || 0;
            return a in g ? (g.__bstorage_meta.TTL || (g.__bstorage_meta.TTL = {}), 0 < b ? (g.__bstorage_meta.TTL[a] = c + b) : delete g.__bstorage_meta.TTL[a], n(), l(), d(), !0) : !1;
        },
        getTTL: function (a) {
            var b = +new Date();
            p(a);
            return a in g && g.__bstorage_meta.TTL && g.__bstorage_meta.TTL[a] ? (a = g.__bstorage_meta.TTL[a] - b) || 0 : 0;
        },
        flush: function () {
            g = { __bstorage_meta: { CRC32: {} } };
            n();
            d();
            c(null, "flushed");
            return !0;
        },
        storageObj: function () {
            function a() {}
            a.prototype = g;
            return new a();
        },
        index: function () {
            var a = [],
                b;
            for (b in g) g.hasOwnProperty(b) && "__bstorage_meta" != b && a.push(b);
            return a;
        },
        storageSize: function () {
            return w;
        },
        currentBackend: function () {
            return s;
        },
        storageAvailable: function () {
            return !!s;
        },
        listenKeyChange: function (a, b) {
            p(a);
            r[a] || (r[a] = []);
            r[a].push(b);
        },
        stopListening: function (a, b) {
            p(a);
            if (r[a])
                if (b) for (var c = r[a].length - 1; 0 <= c; c--) r[a][c] == b && r[a].splice(c, 1);
                else delete r[a];
        },
        subscribe: function (a, b) {
            a = (a || "").toString();
            if (!a) throw new TypeError("Channel not defined");
            u[a] || (u[a] = []);
            u[a].push(b);
        },
        publish: function (a, b) {
            a = (a || "").toString();
            if (!a) throw new TypeError("Channel not defined");
            g.__bstorage_meta || (g.__bstorage_meta = {});
            g.__bstorage_meta.PubSub || (g.__bstorage_meta.PubSub = []);
            g.__bstorage_meta.PubSub.unshift([+new Date(), a, b]);
            n();
            d();
        },
        reInit: function () {
            a();
        },
    };
    (function () {
        var a = !1;
        if ("localStorage" in window)
            try {
                window.localStorage.setItem("_tmptest", "tmpval"), (a = !0), window.localStorage.removeItem("_tmptest");
            } catch (c) {}
        if (a)
            try {
                window.localStorage && ((f = window.localStorage), (s = "localStorage"), (t = f.bStorage_update));
            } catch (h) {}
        else if ("globalStorage" in window)
            try {
                window.globalStorage && ((f = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname]), (s = "globalStorage"), (t = f.bStorage_update));
            } catch (d) {}
        else if (((e = document.createElement("link")), e.addBehavior)) {
            e.style.behavior = "url(#default#userData)";
            document.getElementsByTagName("head")[0].appendChild(e);
            try {
                e.load("bStorage");
            } catch (g) {
                e.setAttribute("bStorage", "{}"), e.save("bStorage"), e.load("bStorage");
            }
            a = "{}";
            try {
                a = e.getAttribute("bStorage");
            } catch (q) {}
            try {
                t = e.getAttribute("bStorage_update");
            } catch (n) {}
            f.bStorage = a;
            s = "userDataBehavior";
        } else {
            e = null;
            return;
        }
        k();
        l();
        "localStorage" == s || "globalStorage" == s ? ("addEventListener" in window ? window.addEventListener("storage", b, !1) : document.attachEvent("onstorage", b)) : "userDataBehavior" == s && setInterval(b, 1e3);
        m();
        "addEventListener" in window &&
            window.addEventListener(
                "pageshow",
                function (a) {
                    a.persisted && b();
                },
                !1
            );
    })();
}
var BoxeverXML = {
        isXML: function (a) {
            return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1;
        },
        string2xml: function (a) {
            if (window.ActiveXObject) {
                var b = new ActiveXObject("Microsoft.XMLDOM");
                b.async = "false";
                b.loadXML(a);
            } else b = new DOMParser().parseFromString(a, "text/xml");
            return b;
        },
        xml2string: function (a) {
            var b = a.documentElement;
            return void 0 == b.xml ? new XMLSerializer().serializeToString(a) : b.xml;
        },
        unescape: function (a) {
            a = a.replace(/&lt;/gi, "\x3c");
            a = a.replace(/&gt;/gi, "\x3e");
            a = a.replace(/&quot;/gi, '"');
            return (a = a.replace(/&amp;/gi, "\x26"));
        },
    },
    BoxeverJSONP = {
        exec: function (a, b) {
            var c = "jsonp" + (100 * Math.random()).toString(),
                c = c.replace(/\./g, "");
            a = a.replace("callback\x3d?", "callback\x3d" + c);
            a = a.replace("cb\x3d?", "cb\x3d" + c);
            window[c] = function (a) {
                try {
                    var k = document.getElementById(c);
                    k.parentNode.removeChild(k);
                } catch (n) {}
                "string" === typeof a && ((a = BoxeverXML.unescape(a)), window.DOMParser ? (a = new DOMParser().parseFromString(a, "text/xml")) : ((k = new ActiveXObject("Microsoft.XMLDOM")), (k.async = !1), k.loadXML(a), (a = k)));
                b(a);
                try {
                    (window[c] = null), delete window[c];
                } catch (p) {}
            };
            document.getElementsByTagName("head")[0].appendChild(
                (function () {
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.charset = "UTF-8";
                    b.src = a;
                    b.async = !0;
                    b.id = c;
                    return b;
                })()
            );
        },
    },
    _boxever_settings = _boxever_settings || {},
    BoxeverJERS = BoxeverJERS || { errors: [] };
(function () {
    function a(a) {
        var d = c + "/boxever-log-js-error.js?client_key\x3d" + b + "\x26message\x3d" + encodeURIComponent(a);
        document.getElementsByTagName("head")[0].appendChild(
            (function () {
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.charset = "UTF-8";
                a.src = d;
                return a;
            })()
        );
    }
    var b,
        c,
        d = BoxeverJERS.errors;
    BoxeverJERS.errors = {
        push: function () {
            for (var b = 0; b < arguments.length; b++)
                try {
                    if ("function" === typeof arguments[b]) arguments[b]();
                    else {
                        var c = arguments[b],
                            d = {};
                        "string" === typeof c
                            ? (d.message = c)
                            : ((d.name = "undefined" !== typeof c.name && null !== c.name ? c.name.toString() : ""),
                              (d.message = "undefined" !== typeof c.message && null !== c.message ? c.message : ""),
                              (d.stack = "undefined" !== typeof c.stack && null !== c.stack ? c.stack : ""));
                        d.parent_url = document.location.href;
                        var l = JSON.stringify(d);
                        a(l);
                    }
                } catch (m) {
                    (l = { message: "Unknown error occured sending error report" }), (l = JSON.stringify(l)), a(l);
                }
        },
    };
    "[object Array]" === Object.prototype.toString.call(d) &&
        (BoxeverJERS.errors.push.apply(BoxeverJERS.errors, d),
        "undefined" !== typeof BoxeverJERS.settings &&
            ("undefined" !== typeof BoxeverJERS.settings.client_key && (b = BoxeverJERS.settings.client_key), "undefined" !== typeof BoxeverJERS.settings.client_key && (c = BoxeverJERS.settings.target)));
    this.validateSettings = function (a) {
        if (!a.hasOwnProperty("client_key")) throw Error("Configuration property 'client_key' is required");
        if (!a.hasOwnProperty("target")) throw Error("Configuration property 'target' is required");
    };
    this.initSettings = function () {
        this.validateSettings(_boxever_settings);
        b = _boxever_settings.client_key;
        c = _boxever_settings.target;
    };
    this.boxeverInit = function () {
        this.initSettings();
    };
    boxeverInit();
})();
var _boxever_error_service = _boxever_error_service || { errors: [] };
(function () {
    var a = _boxever_error_service.errors;
    "[object Array]" === Object.prototype.toString.call(a) && BoxeverJERS.errors.push.apply(BoxeverJERS.errors, a);
    _boxever_error_service = BoxeverJERS;
})();
var BoxeverCrossDomain =
        BoxeverCrossDomain ||
        (function () {
            var a,
                b,
                c = 1,
                d,
                k = this;
            return {
                postMessage: function (a, b, l) {
                    b && ((l = l || parent), k.postMessage ? l.postMessage(a, b.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : b && (l.location = b.replace(/#.*$/, "") + "#" + +new Date() + c++ + "\x26" + a));
                },
                receiveMessage: function (c, p) {
                    k.postMessage
                        ? (d && (k.removeEventListener ? k.removeEventListener("message", d, !1) : k.detachEvent("onmessage", d)),
                          c &&
                              ((d = function (a) {
                                  if (("string" === typeof p && a.origin !== p) || ("[object Function]" === Object.prototype.toString.call(p) && !1 === p(a.origin))) return !1;
                                  c(a);
                              }),
                              k.addEventListener ? k.addEventListener("message", d, !1) : k.attachEvent("onmessage", d)))
                        : (a && clearInterval(a),
                          (a = null),
                          c &&
                              (a = setInterval(function () {
                                  var a = document.location.hash,
                                      m = /^#?\d+&/;
                                  a !== b && m.test(a) && ((b = a), c({ data: a.replace(m, "") }));
                              }, 100)));
                },
            };
        })(),
    _boxeverq = _boxeverq || [];
function __boxever() {
    this.version = "1.4.8";
    this.client_key;
    this.target;
    this.cookie_name;
    this.cookie_domain;
    this.cookie_path = "/";
    this.cookie_expires_days;
    this.itp_cross_domain = this.cookies_only = !1;
    this.browser_id = "anonymous";
    this.cross_domain_origin;
    this.cross_domain_url;
    this.token_counter = 1;
    this.proxy_url = "boxever-proxy.html";
    this.token = 0;
    this.event = null;
    this.flag_ttl = 24e5;
    this.storage_ttl;
    this.isITPBrowser = !1;
    __boxeverQueue = function () {
        this.push = function () {
            for (var a = 0; a < arguments.length; a++)
                try {
                    if ("function" === typeof arguments[a]) arguments[a]();
                } catch (b) {
                    BoxeverJERS.errors.push(b);
                }
        };
    };
    this.setCookie = function (a, b, c) {
        b = encodeURI(b);
        if ("undefined" !== typeof c && null !== c) {
            var d = new Date();
            d.setDate(d.getDate() + c);
            b = b + "; expires\x3d" + d.toUTCString();
        }
        b = b + "; path\x3d" + this.cookie_path;
        !_boxever_settings.cross_domain && "undefined" !== typeof this.cookie_domain && null !== this.cookie_domain && 0 < this.cookie_domain.length && (b = b + "; domain\x3d" + this.cookie_domain);
        document.cookie = a + "\x3d" + b;
        document.cookie = a + "\x3d" + b + "; SameSite\x3dNone; Secure";
    };
    this.getCookie = function (a) {
        var b,
            c,
            d,
            k = document.cookie.split(";");
        for (b = 0; b < k.length; b++) if (((c = k[b].substr(0, k[b].indexOf("\x3d"))), (d = k[b].substr(k[b].indexOf("\x3d") + 1)), (c = c.replace(/^\s+|\s+$/g, "")), c == a)) return (d = decodeURI(d));
    };
    this.storage = null;
    this.getVersion = function () {
        return this.version;
    };
    this.getID = function () {
        return this.browser_id;
    };
    this.getClientKey = function () {
        return this.client_key;
    };
    this.getTarget = function (a) {
        return a ? this.target.split("/v")[0] + "/v" + a : this.target;
    };
    this.getCookieName = function () {
        return this.cookie_name;
    };
    this.getCookieDomain = function () {
        return this.cookie_domain;
    };
    this.getCookiePath = function () {
        return this.cookie_path;
    };
    this.getCookieExpiresDays = function () {
        return this.cookie_expires_days;
    };
    this.reset = function () {
        _boxeverq = [];
        this.storage && this.storage.removeItem(this.cookie_name);
        this.boxeverInit();
    };
    this.resetCookieName = function () {
        this.storage && this.storage.removeItem(this.cookie_name);
    };
    this.getURLParameter = function (a) {
        return decodeURIComponent((new RegExp("[?|\x26]" + a + "\x3d([^\x26;]+?)(\x26|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null;
    };
    this.checkCookieEnabled = function () {
        var a = !1;
        try {
            this.setCookie("boxever_test", "text_value", 1), (a = "text_value" === this.getCookie("boxever_test")), this.setCookie("boxever_test", "text_value", -1);
        } catch (b) {}
        return a;
    };
    this.checkStorageEnabled = function () {
        return BoxeverStorage.storageAvailable ? BoxeverStorage.storageAvailable() : !1;
    };
    this.initRegular = function () {
        var a = this.storage.getItem(this.cookie_name);
        if (void 0 != a && null != a && 0 < a.length) {
            var b = this.checkStorageEnabled() ? { TTL: this.storage_ttl } : this.cookie_expires_days;
            this.storage.setItem(this.cookie_name, a, b);
            this.browser_id = a;
            a = _boxeverq;
            _boxeverq = new __boxeverQueue();
            _boxeverq.push.apply(_boxeverq, a);
            this.initWebFlowSDK();
        } else
            this.browserCreate(
                "{}",
                function (a) {
                    try {
                        if (void 0 != a && (void 0 != a.ref || void 0 != a.browserRef)) {
                            _boxever.browser_id = a.ref || a.browserRef;
                            if (_boxever.cookies_only) _boxever.setCookie(_boxever.cookie_name, _boxever.browser_id, _boxever.cookie_expires_days);
                            else if (_boxever.isITPBrowser) _boxever.storage.setItem(_boxever.cookie_name, _boxever.browser_id, { TTL: _boxever.storage_ttl });
                            else {
                                var b = _boxever.checkStorageEnabled() ? { TTL: _boxever.storage_ttl } : _boxever.cookie_expires_days;
                                _boxever.storage.setItem(_boxever.cookie_name, _boxever.browser_id, b);
                            }
                            a = _boxeverq;
                            _boxeverq = new __boxeverQueue();
                            _boxeverq.push.apply(_boxeverq, a);
                            _boxever.initWebFlowSDK();
                        }
                    } catch (k) {
                        throw (BoxeverJERS.errors.push(k), k);
                    }
                },
                "json"
            );
    };
    this.addUTMParams = function (a) {
        var b;
        try {
            decodeURIComponent(window.location.search), (b = decodeURIComponent);
        } catch (c) {
            try {
                unescape(window.location.search), (b = unescape);
            } catch (d) {}
        }
        if (b) {
            for (var k, n = /\+/g, p = /([^&=]+)=?([^&]*)/g, l = window.location.search.substring(1), m = {}; (k = p.exec(l)); ) m[b(k[1].replace(n, " "))] = b(k[2].replace(n, " "));
            for (var h in m) if (0 == h.indexOf("utm_") || 0 == h.indexOf("UTM_") || "b_cer" === h || "utr" === h) a[h] = m[h];
        }
        return a;
    };
    this.callIfFlagIsFalse = function (a, b, c) {
        var d = !1;
        this.checkStorageEnabled() && (d = BoxeverStorage.get(a, !1));
        try {
            if (!d && (b(), this.checkStorageEnabled())) {
                var k = this.flag_ttl;
                void 0 !== c && (k = c);
                BoxeverStorage.set(a, !0, { TTL: k });
            }
        } catch (n) {
            BoxeverJERS.errors.push(n);
        }
    };
    this.eventPublish = function (a, b, c) {
        c = this.target.split("/v")[0];
        var d = this.target.split("/v")[1];
        a = this.proxy_url + "?token\x3d" + this.token_counter + "\x26baseUrl\x3d" + c + "\x26version\x3d" + d + "\x26client_key\x3d" + this.client_key + "\x26event\x3d" + encodeURIComponent(JSON.stringify(a));
        this.token_counter++;
        c = document.createElement("iframe");
        c.style.display = "none";
        c.width = "0";
        c.height = "0";
        c.src = a;
        document.body.appendChild(c);
        b();
    };
    this.isCookied = function () {
        var a = this.storage.getItem(this.cookie_name);
        return void 0 != a && null != a && 0 < a.length;
    };
    this.consume = function () {
        1 < this.token && this.initRegular();
    };
    this.onCookieConsume = function () {
        _boxever.isCookied()
            ? _boxever.consume()
            : setTimeout(function () {
                  _boxever.onCookieConsume();
              }, 10);
    };
    this.initConsumer = function () {
        var a = this.getURLParameter("token"),
            b = this.getURLParameter("event");
        if ("undefined" !== typeof a && null != a && "undefined" !== typeof b && null != b)
            if (
                ((this.token = a),
                (this.event = JSON.parse(b)),
                _boxeverq.push(function () {
                    _boxever.event.browser_id = _boxever.getID();
                    _boxever.eventCreate(_boxever.event, function (a) {}, "json");
                }),
                1 == a)
            )
                this.initRegular();
            else this.onCookieConsume();
        else BoxeverJERS.errors.push("consumer token or event is undefined or null");
    };
    this.initPublisher = function () {
        this.eventCreate = this.eventPublish;
        var a = _boxeverq;
        _boxeverq = new __boxeverQueue();
        _boxeverq.push.apply(_boxeverq, a);
    };
    this.initCrossDomain = function () {
        var a = this.storage.getItem(this.cookie_name);
        if (void 0 != a && null != a && 0 < a.length) (this.browser_id = a), (a = _boxeverq), (_boxeverq = new __boxeverQueue()), _boxeverq.push.apply(_boxeverq, a), this.initWebFlowSDK();
        else if (this.checkCookieEnabled()) {
            var a = this.cross_domain_origin,
                b = this.cross_domain_url,
                b = b + "?",
                b = b + "client_key\x3d" + encodeURIComponent(this.getClientKey()),
                b = b + "\x26",
                b = b + "parent_url\x3d" + encodeURIComponent(window.location);
            BoxeverCrossDomain.receiveMessage(function (a) {
                try {
                    void 0 != a &&
                        void 0 != a.data &&
                        "string" == typeof a.data &&
                        36 == a.data.length &&
                        ((_boxever.browser_id = a.data),
                        _boxever.isITPBrowser && !_boxever.cookies_only ? _boxever.storage.setItem(_boxever.getCookieName(), a.data, { TTL: _boxever.storage_ttl }) : _boxever.storage.setItem(_boxever.getCookieName(), a.data),
                        (a = _boxeverq),
                        (_boxeverq = new __boxeverQueue()),
                        _boxeverq.push.apply(_boxeverq, a),
                        _boxever.initWebFlowSDK());
                } catch (b) {
                    throw (BoxeverJERS.errors.push(b), b);
                }
            }, a);
            document.getElementsByTagName("body")[0].appendChild(
                (function () {
                    var a = document.createElement("iframe");
                    a.style.cssText = "visibility:hidden;display:none";
                    a.width = 0;
                    a.height = 0;
                    a.src = b;
                    return a;
                })()
            );
        }
    };
    this.initWebFlowSDK = function () {
        if (_boxever_settings && _boxever_settings.web_flow_target) {
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.src = _boxever_settings.web_flow_target + "/web-flow-libs/" + this.client_key + "/version.min.js";
            a.async = !0;
            document.head.appendChild(a);
        }
    };
    this.validateSettings = function (a) {
        if (!a.hasOwnProperty("client_key")) throw Error("Configuration property 'client_key' is required");
        if (!a.hasOwnProperty("target")) throw Error("Configuration property 'target' is required");
        if (!a.hasOwnProperty("cookie_domain")) throw Error("Configuration property 'cookie_domain' is required");
    };
    this.initSettings = function () {
        this.validateSettings(_boxever_settings);
        this.client_key = _boxever_settings.client_key;
        this.cookie_name = "bid_" + _boxever_settings.client_key;
        this.target = _boxever_settings.target;
        this.cookie_domain = _boxever_settings.cookie_domain;
        this.cookies_only = !!_boxever_settings.cookies_only || !1;
        this.itp_cross_domain = !!_boxever_settings.itp_cross_domain || !1;
        this.cookie_expires_days = Number(_boxever_settings.cookie_expiry_in_days) || 730;
        this.storage_ttl = 864e5 * this.cookie_expires_days;
        navigator &&
            navigator.userAgent &&
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
            ((_boxever.isITPBrowser = 12 <= Number(navigator.userAgent.split("Version/").pop().substr(0, 2))),
            _boxever.isITPBrowser && this.itp_cross_domain && (_boxever_settings.cross_domain = { url: "https://api.boxever.com/v1.2/boxever-cross-domain.html", origin: "https://api.boxever.com" }));
        "undefined" != typeof _boxever_settings.publisher
            ? "undefined" != typeof _boxever_settings.publisher.url && (this.proxy_url = _boxever_settings.publisher.url)
            : "undefined" !== typeof _boxever_settings.cross_domain &&
              ("undefined" != typeof _boxever_settings.cross_domain.origin && (this.cross_domain_origin = _boxever_settings.cross_domain.origin),
              "undefined" != typeof _boxever_settings.cross_domain.url && (this.cross_domain_url = _boxever_settings.cross_domain.url));
        !this.checkCookieEnabled() || (!this.cookies_only && _boxever.isITPBrowser)
            ? (initBoxeverStorage(),
              (this.storage = {
                  setItem: function (a, b, c) {
                      BoxeverStorage.set(a, b, c);
                  },
                  getItem: function (a, b) {
                      return BoxeverStorage.get(a, b);
                  },
                  removeItem: function (a) {
                      return BoxeverStorage.deleteKey(a);
                  },
              }))
            : (this.storage = {
                  setItem: function (a, b, c) {
                      _boxever.setCookie(a, b, c);
                  },
                  getItem: function (a) {
                      return _boxever.getCookie(a);
                  },
                  removeItem: function (a) {
                      _boxever.setCookie(a, "", -1);
                      return !0;
                  },
              });
    };
    this.boxeverInit = function () {
        try {
            if ((this.initSettings(), this.storage || "undefined" != typeof _boxever_settings.publisher))
                "undefined" != typeof _boxever_settings.publisher
                    ? this.initPublisher()
                    : "undefined" != typeof _boxever_settings.consumer
                    ? this.initConsumer()
                    : "undefined" !== typeof _boxever_settings.cross_domain
                    ? this.initCrossDomain()
                    : this.initRegular();
        } catch (a) {
            throw (BoxeverJERS.errors.push(a), a);
        }
    };
}
var Boxever = Boxever || new __boxever();
(function (a) {
    a.get = function (a, c) {
        "" === c && (c = "BoxeverUtils.consoleLogData");
        BoxeverJSONP.exec(a + "\x26callback\x3d?", c);
    };
    a.post = function (b, c, d) {
        "" === d && (d = "BoxeverUtils.consoleLogData");
        var k = "",
            k = BoxeverXML.isXML(c) ? BoxeverXML.xml2string(c) : "string" === typeof c && "\x3c" == c.charAt(0) ? c : "string" === typeof c && "{" == c.charAt(0) ? JSON.stringify(JSON.parse(c)) : JSON.stringify(c);
        b = -1 == b.indexOf("?") ? b + "?" : b + "\x26";
        b = b + "message\x3d" + encodeURIComponent(k) + "\x26callback\x3d?";
        "1.3" === a.getTarget().split("/v").pop() && -1 !== b.indexOf("create.json")
            ? fetch(b)
                  .then(function (a) {
                      return a.json();
                  })
                  .then(function (a) {
                      d(a);
                  })
            : BoxeverJSONP.exec(b, d);
    };
})(Boxever);
(function (a) {
    function b(b, c, h, d, g, f) {
        var e = a.getTarget(),
            e = e + "/" + b,
            e = e + "/create.",
            e = e + d,
            e = e + "?",
            e = e + "client_key\x3d" + a.getClientKey();
        "undefined" != typeof g && (e = e + "\x26boxever_version\x3d" + g);
        "undefined" != typeof f && (e = e + "\x26content_version\x3d" + f);
        a.post(e, c, function (b) {
            try {
                if ("NOT_FOUND" === b.status && "Invalid browser id/ref specified" === b.error_msg) {
                    var c = "Resetting cookie name for browser id/ref " + a.getID() + " for client_key " + a.getClientKey();
                    a.resetCookieName();
                    BoxeverJERS.errors.push(c);
                }
            } catch (e) {}
            h(b);
        });
    }
    function c(b, c, h, d, g) {
        var f = a.getTarget(),
            f = f + "/" + b,
            f = f + "/create.",
            f = f + g,
            f = f + "?",
            f = f + "client_key\x3d" + a.getClientKey(),
            f = f + "\x26",
            f = f + "api_token\x3d" + h;
        a.post(f, c, d);
    }
    function d(b, c, h, d, g) {
        var f = a.getTarget(),
            f = f + "/" + b,
            f = f + "/",
            f = f + c,
            f = f + "/show.",
            f = f + g,
            f = f + "?",
            f = f + "client_key\x3d" + a.getClientKey(),
            f = f + "\x26",
            f = f + "api_token\x3d" + h;
        a.get(f, d);
    }
    function k(b, c, h, d, g) {
        var f = a.getTarget(),
            f = f + "/" + b,
            f = f + "/search.",
            f = f + g,
            f = f + "?",
            f = f + "client_key\x3d" + a.getClientKey(),
            f = f + "\x26",
            f = f + "api_token\x3d" + h;
        null !== c && 0 < c.indexOf("\x3d") && ((h = c.indexOf("\x3d")), (b = encodeURIComponent(c.substring(0, h))), (c = encodeURIComponent(c.substring(h).replace("\x3d", ""))), (f += "\x26"), (f = f + b + "\x3d" + c));
        a.get(f, d);
    }
    function n(b, c, h, d, g, f) {
        var e = a.getTarget(),
            e = e + "/" + b,
            e = e + "/",
            e = e + c,
            e = e + "/update.",
            e = e + f,
            e = e + "?",
            e = e + "client_key\x3d" + a.getClientKey(),
            e = e + "\x26",
            e = e + "api_token\x3d" + d;
        a.post(e, h, g);
    }
    function p(b, c, h, d, g, f) {
        var e = a.getTarget(),
            e = e + "/" + b,
            e = e + "/",
            e = e + c;
        null !== h && 0 < h.length && (e = e + "/" + encodeURIComponent(h));
        e += "/delete.";
        e += f;
        e += "?";
        e = e + "client_key\x3d" + a.getClientKey();
        e += "\x26";
        e = e + "api_token\x3d" + d;
        a.get(e, g);
    }
    a.pingCreate = function (a, c, h) {
        b("ping", a, c, h);
    };
    a.eventCreate = function (a, c, h) {
        b("event", a, c, h, "1.4.8", "undefined" != typeof _boxever_content_version ? _boxever_content_version : void 0);
    };
    a.eventShow = function (a, b, c, k) {
        d("event", a, b, c, k);
    };
    a.eventSearch = function (a, b, c, d) {
        k("event", a, b, c, d);
    };
    a.browserCreate = function (a, c, h) {
        b("browser", a, c, h);
    };
    a.browserShow = function (a, b, c, k) {
        d("browser", a, b, c, k);
    };
    a.customerCreate = function (a, b, h, d) {
        c("customer", a, b, h, d);
    };
    a.customerShow = function (a, b, c, k) {
        d("customer", a, b, c, k);
    };
    a.customerUpdate = function (a, b, c, d, g) {
        n("customer", a, b, c, d, g);
    };
    a.customerDelete = function (a, b, c, d, g) {
        p("customer", a, b, c, d, g);
    };
    a.customerSearch = function (a, b, c, d) {
        k("customer", a, b, c, d);
    };
    a.customerDataCreate = function (a, b, h, d) {
        c("customerdata", a, b, h, d);
    };
    a.customerDataShow = function (a, b, c, k) {
        d("customerdata", a, b, c, k);
    };
    a.customerDataUpdate = function (a, b, c, d, g) {
        n("customerdata", a, b, c, d, g);
    };
    a.customerDataDelete = function (a, b, c, d, g) {
        p("customerdata", a, b, c, d, g);
    };
    a.campaignCreate = function (a, c, d) {
        b("campaign", a, c, d);
    };
    a.campaignShow = function (a, b, c) {
        d("campaign", ref, api_token, b, c);
    };
    a.campaignSearch = function (a, b, c, d) {
        k("campaign", a, b, c, d);
    };
    a.auditShow = function (a, b, c, k) {
        d("audit", a, b, c, k);
    };
    a.auditSearch = function (a, b, c, d) {
        k("audit", a, b, c, d);
    };
    a.profileCreate = function (a, c, d, k) {
        b("profile", a, d, k);
    };
    a.profileShow = function (a, b, c, k) {
        d("profile", a, b, c, k);
    };
    a.profileUpdate = function (a, b, c, d, g) {
        n("profile", b, a, c, d, g);
    };
    a.profileSearch = function (a, b, c, d) {
        k("profile", a, b, c, d);
    };
})(Boxever);
(function (a) {
    function b(b, d, k) {
        var n = a.getTarget("2"),
            n = n + "/" + b;
        a.post(n, d, k);
    }
    a.flowExecutionCreate = function (a, d) {
        b("flowExecutions", a, d);
    };
    a.callFlows = function (a, d) {
        b("callFlows", a, d);
    };
})(Boxever);
var _boxever = Boxever;
_boxever.boxeverInit();
