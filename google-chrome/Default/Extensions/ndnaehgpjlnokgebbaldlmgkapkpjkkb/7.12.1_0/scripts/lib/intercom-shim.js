/* El código a continuación es propiedad intelectual de The Mail Track Company S.L. de Barcelona, España,
y solo debe ser utilizado y manejado bajo estos Términos: https://mailtrack.io/es/terms

The code hereafter is the intellectual property of The Mail Track Company S.L. of Barcelona, Spain
and must be used and handled only according to these Terms: https://mailtrack.io/en/terms */
!(function(e) {
    var r = {};
    function o(t) {
        if (r[t]) return r[t].exports;
        var n = (r[t] = { i: t, l: !1, exports: {} });
        return e[t].call(n.exports, n, n.exports, o), (n.l = !0), n.exports;
    }
    (o.m = e),
        (o.c = r),
        (o.d = function(t, n, e) {
            o.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: e });
        }),
        (o.r = function(t) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(t, '__esModule', { value: !0 });
        }),
        (o.t = function(n, t) {
            if ((1 & t && (n = o(n)), 8 & t)) return n;
            if (4 & t && 'object' == typeof n && n && n.__esModule) return n;
            var e = Object.create(null);
            if (
                (o.r(e),
                Object.defineProperty(e, 'default', { enumerable: !0, value: n }),
                2 & t && 'string' != typeof n)
            )
                for (var r in n)
                    o.d(
                        e,
                        r,
                        function(t) {
                            return n[t];
                        }.bind(null, r)
                    );
            return e;
        }),
        (o.n = function(t) {
            var n =
                t && t.__esModule
                    ? function() {
                          return t.default;
                      }
                    : function() {
                          return t;
                      };
            return o.d(n, 'a', n), n;
        }),
        (o.o = function(t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
        }),
        (o.p = window.MT_INTERCOM_PATH),
        o((o.s = 795));
})({
    11: function(t, n, e) {
        'use strict';
        e.d(n, 'c', function() {
            return u;
        }),
            e.d(n, 'b', function() {
                return c;
            }),
            e.d(n, 'e', function() {
                return d;
            }),
            e.d(n, 'f', function() {
                return a;
            }),
            e.d(n, 'd', function() {
                return f;
            }),
            e.d(n, 'h', function() {
                return l;
            }),
            e.d(n, 'g', function() {
                return m;
            });
        var r = /iphone|ipad|ipod|android|blackberry|opera mini|iemobile/i,
            o = [
                '.intercom-launcher-frame',
                '#intercom-container',
                '.intercom-messenger',
                '.intercom-notifications',
            ];
        function i(t) {
            try {
                if (!(t in window)) return !1;
                var n = window[t];
                return (
                    null !== n &&
                    (n.setItem('intercom-test', '0'), n.removeItem('intercom-test'), !0)
                );
            } catch (t) {
                return !1;
            }
        }
        function u() {
            return i('localStorage');
        }
        function c() {
            return !!(window.FileReader && window.File && window.FileList && window.FormData);
        }
        function d() {
            var t = s().userAgent;
            return !!t && (null !== t.match(r) && void 0 !== window.parent);
        }
        function a() {
            var t = s().vendor || '',
                n = s().userAgent || '';
            return 0 === t.indexOf('Apple') && /\sSafari\//.test(n);
        }
        function s() {
            return navigator || {};
        }
        function f(t) {
            return (
                void 0 === t && (t = s().userAgent), /iPad|iPhone|iPod/.test(t) && !window.MSStream
            );
        }
        function l() {
            return o.some(function(t) {
                var n = window.parent.document.querySelector(t);
                if (n) {
                    var e = window.getComputedStyle(n);
                    return null === e || 'none' === e.display;
                }
            });
        }
        var m = function() {
            return 'ontouchstart' in window || 0 < navigator.maxTouchPoints;
        };
        n.a = {
            hasXhr2Support: function() {
                return 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();
            },
            hasLocalStorageSupport: u,
            hasSessionStorageSupport: function() {
                return i('sessionStorage');
            },
            hasFileSupport: c,
            hasAudioSupport: function() {
                var t = document.createElement('audio');
                return !!t.canPlayType && !!t.canPlayType('audio/mpeg;').replace(/^no$/, '');
            },
            hasVisibilitySupport: function() {
                return (
                    void 0 !== document.hidden ||
                    void 0 !== document.mozHidden ||
                    void 0 !== document.msHidden ||
                    void 0 !== document.webkitHidden
                );
            },
            messengerIsVisible: function() {
                return o.some(function(t) {
                    var n = window.parent.document.querySelector(t);
                    if (n) {
                        var e = n.getBoundingClientRect();
                        return e && 0 < e.width && 0 < e.height;
                    }
                });
            },
            messengerHasDisplayNoneSet: l,
            isMobileBrowser: d,
            isIOSFirefox: function() {
                return !!s().userAgent.match('FxiOS');
            },
            isFirefox: function() {
                return !!s().userAgent.match('Firefox');
            },
            isSafari: a,
            isElectron: function() {
                var t = s().userAgent || '',
                    n = window.parent || {},
                    e = n.process && n.versions && n.versions.electron;
                return /\sElectron\//.test(t) || e;
            },
            isIE: function() {
                var t = s().userAgent || '';
                return 0 < t.indexOf('MSIE') || 0 < t.indexOf('Trident');
            },
            isEdge: function() {
                return 0 < (s().userAgent || '').indexOf('Edge');
            },
            isNativeMobile: function() {
                return s().isNativeMobile;
            },
            isChrome: function() {
                var t = window.chrome,
                    n = s().vendor,
                    e = -1 < s().userAgent.indexOf('OPR'),
                    r = -1 < s().userAgent.indexOf('Edge');
                return (
                    !!s().userAgent.match('CriOS') ||
                    (null != t && 'Google Inc.' === n && !1 === e && !1 === r)
                );
            },
            isIOS: f,
            isAndroid: function(t) {
                return (
                    void 0 === t && (t = s().userAgent),
                    t && -1 < t.toLowerCase().indexOf('android')
                );
            },
        };
    },
    12: function(t, n, e) {
        'use strict';
        e.d(n, 'a', function() {
            return r;
        }),
            e.d(n, 'l', function() {
                return o;
            }),
            e.d(n, 'm', function() {
                return i;
            }),
            e.d(n, 'B', function() {
                return c;
            }),
            e.d(n, 's', function() {
                return d;
            }),
            e.d(n, 'f', function() {
                return a;
            }),
            e.d(n, 'r', function() {
                return s;
            }),
            e.d(n, 'z', function() {
                return f;
            }),
            e.d(n, 'e', function() {
                return l;
            }),
            e.d(n, 'A', function() {
                return m;
            }),
            e.d(n, 'b', function() {
                return p;
            }),
            e.d(n, 'x', function() {
                return h;
            }),
            e.d(n, 'c', function() {
                return v;
            }),
            e.d(n, 'y', function() {
                return g;
            }),
            e.d(n, 'd', function() {
                return w;
            }),
            e.d(n, 'k', function() {
                return b;
            }),
            e.d(n, 'o', function() {
                return y;
            }),
            e.d(n, 'i', function() {
                return E;
            }),
            e.d(n, 'g', function() {
                return S;
            }),
            e.d(n, 'q', function() {
                return A;
            }),
            e.d(n, 'n', function() {
                return x;
            }),
            e.d(n, 'w', function() {
                return H;
            }),
            e.d(n, 'v', function() {
                return T;
            }),
            e.d(n, 't', function() {
                return C;
            }),
            e.d(n, 'u', function() {
                return O;
            }),
            e.d(n, 'p', function() {
                return _;
            }),
            e.d(n, 'j', function() {
                return j;
            }),
            e.d(n, 'C', function() {
                return M;
            }),
            e.d(n, 'h', function() {
                return k;
            });
        var u = e(11),
            r = { TAB: 9, ENTER: 13, ESC: 27, SPACE: 32 },
            o = function(t) {
                return t.scrollHeight - t.clientHeight - t.scrollTop;
            },
            i = function(t) {
                return t.scrollTop / (t.scrollHeight - t.clientHeight);
            },
            c = function(t, n) {
                void 0 === n && (n = 0), t && (t.scrollTop = n);
            },
            d = function(t, n) {
                void 0 === n && (n = 0);
                var e = t.scrollTop;
                return t.scrollHeight - e - t.clientHeight < n + 1;
            },
            a = function(t) {
                if (!t) return 0;
                var n = t.scrollTop;
                return t.scrollHeight - t.clientHeight - n;
            },
            s = function(t) {
                var n = t.scrollHeight;
                return t.clientHeight < n;
            },
            f = function(t) {
                var n = t.scrollHeight,
                    e = t.clientHeight;
                t.scrollTop = n - e;
            },
            l = function(t) {
                var n = t.scrollHeight,
                    e = t.clientHeight;
                if (!t.scrollBy) return f(t);
                t.scrollBy({ top: n - e, left: 0, behavior: 'smooth' });
            },
            m = function(t, n) {
                var e = t.getBoundingClientRect(),
                    r = e.bottom,
                    o = e.top,
                    i = e.height,
                    u = n.getBoundingClientRect(),
                    c = u.bottom,
                    d = u.top,
                    a = u.height;
                if (o < d || c < r) {
                    for (var s = t.offsetTop; t; ) {
                        'relative' === window.getComputedStyle(t).position &&
                            (s += t.offsetTop - t.scrollTop + t.clientTop),
                            (t = t.offsetParent);
                    }
                    n.scrollTop = s - Math.trunc(a / 2) + Math.trunc(i / 2);
                }
            },
            p = function(t, n) {
                var e = t.className.split(' ');
                e.some(function(t) {
                    return t === n;
                }) || (e.push(n), (t.className = e.join(' ').trim()));
            },
            h = function(t, n) {
                t.className = t.className
                    .split(' ')
                    .filter(function(t) {
                        return t !== n;
                    })
                    .join(' ');
            },
            v = function(t, n, e) {
                t.addEventListener
                    ? t.addEventListener(n, e)
                    : t.attachEvent && t.attachEvent('on' + n, e);
            },
            g = function(t, n, e) {
                t.removeEventListener
                    ? t.removeEventListener(n, e)
                    : t.detachEvent && t.detachEvent('on' + n, e);
            },
            w = function(t) {
                var n = t.currentTarget,
                    e = n.scrollTop,
                    r = n.scrollHeight,
                    o = n.clientHeight,
                    i = t.deltaY,
                    u = 0 < i;
                u && r - o - e < i
                    ? (n.scrollTop = r)
                    : !u && e < -i ? (n.scrollTop = 0) : t.stopPropagation();
            },
            b = function(t) {
                if (t && 'selectionStart' in t) return t.selectionStart;
            },
            y = function(t, n, e) {
                return t.slice(0, e) + n + t.slice(e);
            },
            E = function(t, n) {
                void 0 === n && (n = -1),
                    t &&
                        (t.focus(),
                        'setSelectionRange' in t && 0 <= n && t.setSelectionRange(n, n));
            };
        function S(t, r, o) {
            var i = this,
                u = t.document || t.ownerDocument;
            return function(t) {
                var n = [];
                Array.from(u.querySelectorAll(r)).forEach(function(t) {
                    return n.push(t);
                });
                for (var e = t.target; e && e !== i; ) {
                    if (-1 < n.indexOf(e)) {
                        o.call(e, t);
                        break;
                    }
                    e = e.parentNode;
                }
            };
        }
        var A = function(t) {
                return void 0 !== t.hidden
                    ? !t.hidden
                    : void 0 !== t.mozHidden
                        ? !t.mozHidden
                        : void 0 !== t.msHidden
                            ? !t.msHidden
                            : void 0 === t.webkitHidden || !t.webkitHidden;
            },
            x = function() {
                var t;
                return (
                    void 0 !== document.hidden
                        ? (t = 'visibilitychange')
                        : void 0 !== document.mozHidden
                            ? (t = 'mozvisibilitychange')
                            : void 0 !== document.msHidden
                                ? (t = 'msvisibilitychange')
                                : void 0 !== document.webkitHidden &&
                                  (t = 'webkitvisibilitychange'),
                    t
                );
            },
            H = function(t, e) {
                void 0 === e && (e = {});
                var r = document.createElement('form');
                r.setAttribute('target', '_blank'),
                    r.setAttribute('method', 'post'),
                    r.setAttribute('action', t),
                    Object.keys(e).forEach(function(t) {
                        var n = document.createElement('input');
                        (n.type = 'hidden'), (n.name = t), (n.value = e[t]), r.appendChild(n);
                    }),
                    document.body.appendChild(r),
                    r.submit(),
                    document.body.removeChild(r);
            },
            T = function(n) {
                return function(t) {
                    return (t.keyCode === r.ENTER || t.keyCode === r.SPACE) && n(t);
                };
            },
            C = function(t) {
                return (
                    t.keyCode === r.TAB &&
                    !(-1 !== ['INPUT', 'TEXTAREA', 'BUTTON'].indexOf(t.target.tagName))
                );
            },
            O = function(t) {
                if (t) return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
            },
            _ = function(t) {
                return t.keyCode === r.ESC;
            },
            j = function(t) {
                return Array.from(
                    t.querySelectorAll(
                        'button, [href], input:not([type="file"]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
                    )
                ).filter(function(t) {
                    return !t.closest('[aria-hidden="true"]');
                });
            },
            M = function(t, n, e) {
                var r, o, i;
                void 0 === e && (e = 'en'),
                    u.a.isFirefox() && (t.contentDocument.open(), t.contentDocument.close()),
                    (r = t.contentDocument),
                    (o = n),
                    void 0 === (i = e) && (i = 'en'),
                    (r.documentElement.innerHTML = o),
                    r.documentElement.setAttribute('lang', i);
            },
            k = function(t) {
                var n = document.createElement('script');
                return (n.type = 'text/javascript'), (n.charset = 'utf-8'), (n.src = t), n;
            };
    },
    249: function(t, n) {
        t.exports = {
            source_map: 'hidden-source-map',
            api_base: 'https://api-iam.intercom.io',
            public_path: window.MT_INTERCOM_PATH,
            sheets_proxy_path: 'https://intercom-sheets.com/sheets_proxy',
            sentry_proxy_path: 'https://www.intercom-reporting.com/sentry/index.html',
            install_mode_base: 'https://app.intercom.io',
            sentry_dsn: 'https://f305de69cac64a84a494556d5303dc2d@app.getsentry.com/24287',
            intersection_js: 'https://js.intercomcdn.com/intersection/assets/app.js',
            intersection_styles: 'https://js.intercomcdn.com/intersection/assets/styles.js',
            mode: 'production',
        };
    },
    795: function(t, n, e) {
        t.exports = e(822);
    },
    822: function(t, n, e) {
        'use strict';
        e.r(n);
        var r = ['turbolinks:visit', 'page:before-change'],
            o = ['turbolinks:before-cache'],
            i = ['turbolinks:load', 'page:change'];
        var u = e(12);
        window.__INTERCOM_BUNDLE_LOAD_TIME__ = Date.now();
        var c = e(249).public_path;
        var d,
            a,
            s,
            f = c + 'intercom-frame.js',
            l = c + 'intercom-vendor.js',
            m = 'Intercom',
            p = /bot|googlebot|crawler|spider|robot|crawling/i,
            h = function() {
                return window[m] && window[m].booted;
            },
            v = function() {
                var t = document.getElementById('intercom-frame');
                t && t.parentNode && t.parentNode.removeChild(t);
            },
            g = function() {
                if (!window[m]) {
                    var t = function t() {
                        for (var n = arguments.length, e = new Array(n), r = 0; r < n; r++)
                            e[r] = arguments[r];
                        t.q.push(e);
                    };
                    (t.q = []), (window[m] = t);
                }
            },
            w = function() {
                var t, n, e;
                h() ||
                    (g(),
                    (t = document.querySelector('meta[name="referrer"]')),
                    (n = t ? '<meta name="referrer" content="' + t.content + '">' : ''),
                    ((e = document.createElement('iframe')).id = 'intercom-frame'),
                    e.setAttribute(
                        'style',
                        'position: absolute !important; opacity: 0 !important; width: 1px !important; height: 1px !important; top: 0 !important; left: 0 !important; border: none !important; display: block !important; z-index: -1 !important;'
                    ),
                    e.setAttribute('aria-hidden', 'true'),
                    e.setAttribute('tabIndex', '-1'),
                    document.body.appendChild(e),
                    Object(u.C)(
                        e,
                        '<!doctype html>\n    <html lang="en">\n      <head>\n        ' +
                            n +
                            '\n      </head>\n      <body>\n      </body>\n    </html>'
                    ),
                    e.contentDocument.head.appendChild(Object(u.h)(f)),
                    e.contentDocument.head.appendChild(Object(u.h)(l)),
                    (window[m].booted = !0));
            };
        ('attachEvent' in window && !window.addEventListener) ||
            (navigator &&
                navigator.userAgent &&
                /MSIE 9\.0/.test(navigator.userAgent) &&
                window.addEventListener &&
                !window.atob) ||
            ('onpropertychange' in document &&
                window.matchMedia &&
                /MSIE 10\.0/.test(navigator.userAgent)) ||
            (navigator && navigator.userAgent && p.test(navigator.userAgent)) ||
            window.isIntercomMessengerSheet ||
            h() ||
            (w(),
            (d = w),
            (a = v),
            (s = function() {
                window[m]('shutdown', !1), delete window[m], v(), g();
            }),
            i.forEach(function(t) {
                document.addEventListener(t, d);
            }),
            o.forEach(function(t) {
                document.addEventListener(t, a);
            }),
            r.forEach(function(t) {
                document.addEventListener(t, s);
            }));
    },
});
