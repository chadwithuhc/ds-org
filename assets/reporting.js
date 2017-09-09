function $SanitizeProvider() {
    this.$get = [
        "$$sanitizeUri",
        function(e) {
            return function(t) {
                var n = [];
                return htmlParser(t, htmlSanitizeWriter(n, function(t, n) {
                    return !/^unsafe/.test(e(t, n))
                })),
                n.join("")
            }
        }
    ]
}
function sanitizeText(e) {
    var t = [],
        n = htmlSanitizeWriter(t, angular.noop);
    return n.chars(e),
    t.join("")
}
function makeMap(e, t) {
    var n,
        r = {},
        i = e.split(",");
    for (n = 0; n < i.length; n++)
        r[t
                ? angular.lowercase(i[n])
                : i[n]] = !0;
    return r
}
function htmlParser(e, t) {
    function n(e, n, i, o) {
        if (n = angular.lowercase(n), blockElements[n])
            for (; u.last() && inlineElements[u.last()];)
                r("", u.last());
    optionalEndTagElements[n] && u.last() == n && r("", n),
        o = voidElements[n] || !!o,
        o || u.push(n);
        var a = {};
        i.replace(ATTR_REGEXP, function(e, t, n, r, i) {
            var o = n || r || i || "";
            a[t] = decodeEntities(o)
        }),
        t.start && t.start(n, a, o)
    }
    function r(e, n) {
        var r,
            i = 0;
        if (n = angular.lowercase(n))
            for (i = u.length - 1; i >= 0 && u[i] != n; i--)
            ;
            if (i >= 0) {
                for (r = u.length - 1; r >= i; r--)
                    t.end && t.end(u[r]);
                u.length = i
            }
        }
    "string" != typeof e && (e = null === e || "undefined" == typeof e
        ? ""
        : "" + e);
    var i,
        o,
        a,
        s,
        u = [],
        l = e;
    for (u.last = function() {
        return u[u.length - 1]
    }; e;) {
        if (s = "", o = !0, u.last() && specialElements[u.last()]
            ? (e = e.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*" + u.last() + "[^>]*>", "i"), function(e, n) {
                return n = n.replace(COMMENT_REGEXP, "$1").replace(CDATA_REGEXP, "$1"),
                t.chars && t.chars(decodeEntities(n)),
                ""
            }), r("", u.last()))
            : (0 === e.indexOf("<!--")
                ? (i = e.indexOf("--", 4), i >= 0 && e.lastIndexOf("-->", i) === i && (t.comment && t.comment(e.substring(4, i)), e = e.substring(i + 3), o = !1))
                : DOCTYPE_REGEXP.test(e)
                    ? (a = e.match(DOCTYPE_REGEXP), a && (e = e.replace(a[0], ""), o = !1))
                    : BEGING_END_TAGE_REGEXP.test(e)
                        ? (a = e.match(END_TAG_REGEXP), a && (e = e.substring(a[0].length), a[0].replace(END_TAG_REGEXP, r), o = !1))
                        : BEGIN_TAG_REGEXP.test(e) && (a = e.match(START_TAG_REGEXP), a
                            ? (a[4] && (e = e.substring(a[0].length), a[0].replace(START_TAG_REGEXP, n)), o = !1)
                            : (s += "<", e = e.substring(1))), o && (i = e.indexOf("<"), s += 0 > i
                ? e
                : e.substring(0, i), e = 0 > i
                ? ""
                : e.substring(i), t.chars && t.chars(decodeEntities(s)))), e == l)
            throw $sanitizeMinErr("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
        l = e
    }
    r()
}
function decodeEntities(e) {
    return e
        ? (hiddenPre.innerHTML = e.replace(/</g, "&lt;"), hiddenPre.textContent)
        : ""
}
function encodeEntities(e) {
    return e.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(e) {
        var t = e.charCodeAt(0),
            n = e.charCodeAt(1);
        return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";"
    }).replace(NON_ALPHANUMERIC_REGEXP, function(e) {
        return "&#" + e.charCodeAt(0) + ";"
    }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function htmlSanitizeWriter(e, t) {
    var n = !1,
        r = angular.bind(e, e.push);
    return {
        start: function(e, i, o) {
            e = angular.lowercase(e),
            !n && specialElements[e] && (n = e),
            n || validElements[e] !== !0 || (r("<"), r(e), angular.forEach(i, function(n, i) {
                var o = angular.lowercase(i),
                    a = "img" === e && "src" === o || "background" === o;
                validAttrs[o] !== !0 || uriAttrs[o] === !0 && !t(n, a) || (r(" "), r(i), r('="'), r(encodeEntities(n)), r('"'))
            }), r(o
                ? "/>"
                : ">"))
        },
        end: function(e) {
            e = angular.lowercase(e),
            n || validElements[e] !== !0 || (r("</"), r(e), r(">")),
            e == n && (n = !1)
        },
        chars: function(e) {
            n || r(encodeEntities(e))
        }
    }
}
!function(e, t, n) {
    "use strict";
    function r(e) {
        return function() {
            var t,
                n = arguments[0];
            for (t = "[" + (e
                ? e + ":"
                : "") + n + "] http://errors.angularjs.org/1.4.8/" + (e
                ? e + "/"
                : "") + n, n = 1; n < arguments.length; n++) {
                t = t + (1 == n
                    ? "?"
                    : "&") + "p" + (n - 1) + "=";
                var r,
                    i = encodeURIComponent;
                r = arguments[n],
                r = "function" == typeof r
                    ? r.toString().replace(/ \{[\s\S]*$/, "")
                    : "undefined" == typeof r
                        ? "undefined"
                        : "string" != typeof r
                            ? JSON.stringify(r)
                            : r,
                t += i(r)
            }
            return Error(t)
        }
    }
    function i(e) {
        if (null == e || k(e))
            return !1;
        if (ni(e) || x(e) || _r && e instanceof _r)
            return !0;
        var t = "length" in Object(e) && e.length;
        return S(t) && (t >= 0 && t - 1 in e || "function" == typeof e.item)
    }
    function o(e, t, n) {
        var r,
            a;
        if (e)
            if (E(e))
                for (r in e)
                    "prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r, e);
        else if (ni(e) || i(e)) {
                var s = "object" != typeof e;
                for (r = 0, a = e.length; a > r; r++)
                    (s || r in e) && t.call(n, e[r], r, e)
            }
        else if (e.forEach && e.forEach !== o)
            e.forEach(t, n, e);
        else if (w(e))
            for (r in e)
                t.call(n, e[r], r, e);
            else if ("function" == typeof e.hasOwnProperty)
                for (r in e)
                    e.hasOwnProperty(r) && t.call(n, e[r], r, e);
    else
            for (r in e)
                zr.call(e, r) && t.call(n, e[r], r, e);
    return e
    }
    function a(e, t, n) {
        for (var r = Object.keys(e).sort(), i = 0; i < r.length; i++)
            t.call(n, e[r[i]], r[i]);
        return r
    }
    function s(e) {
        return function(t, n) {
            e(n, t)
        }
    }
    function u() {
        return++ ei
    }
    function l(e, t, n) {
        for (var r = e.$$hashKey, i = 0, o = t.length; o > i; ++i) {
            var a = t[i];
            if (b(a) || E(a))
                for (var s = Object.keys(a), u = 0, c = s.length; c > u; u++) {
                    var f = s[u],
                        p = a[f];
                    n && b(p)
                        ? C(p)
                            ? e[f] = new Date(p.valueOf())
                            : A(p)
                                ? e[f] = new RegExp(p)
                                : p.nodeName
                                    ? e[f] = p.cloneNode(!0)
                                    : V(p)
                                        ? e[f] = p.clone()
                                        : (b(e[f]) || (e[f] = ni(p)
                                            ? []
                                            : {}), l(e[f], [p], !0))
                        : e[f] = p
                }
            }
        return r
            ? e.$$hashKey = r
            : delete e.$$hashKey,
        e
    }
    function c(e) {
        return l(e, Wr.call(arguments, 1), !1)
    }
    function f(e) {
        return l(e, Wr.call(arguments, 1), !0)
    }
    function p(e) {
        return parseInt(e, 10)
    }
    function h(e, t) {
        return c(Object.create(e), t)
    }
    function d() {}
    function $(e) {
        return e
    }
    function m(e) {
        return function() {
            return e
        }
    }
    function v(e) {
        return E(e.toString) && e.toString !== Kr
    }
    function g(e) {
        return "undefined" == typeof e
    }
    function y(e) {
        return "undefined" != typeof e
    }
    function b(e) {
        return null !== e && "object" == typeof e
    }
    function w(e) {
        return null !== e && "object" == typeof e && !Qr(e)
    }
    function x(e) {
        return "string" == typeof e
    }
    function S(e) {
        return "number" == typeof e
    }
    function C(e) {
        return "[object Date]" === Kr.call(e)
    }
    function E(e) {
        return "function" == typeof e
    }
    function A(e) {
        return "[object RegExp]" === Kr.call(e)
    }
    function k(e) {
        return e && e.window === e
    }
    function O(e) {
        return e && e.$evalAsync && e.$watch
    }
    function T(e) {
        return "boolean" == typeof e
    }
    function P(e) {
        return e && S(e.length) && ri.test(Kr.call(e))
    }
    function V(e) {
        return !(!e || !(e.nodeName || e.prop && e.attr && e.find))
    }
    function M(e) {
        var t = {};
        e = e.split(",");
        var n;
        for (n = 0; n < e.length; n++)
            t[e[n]] = !0;
        return t
    }
    function D(e) {
        return Hr(e.nodeName || e[0] && e[0].nodeName)
    }
    function j(e, t) {
        var n = e.indexOf(t);
        return n >= 0 && e.splice(n, 1),
        n
    }
    function N(e, t) {
        function n(e, t) {
            var n,
                i = t.$$hashKey;
            if (ni(e)) {
                n = 0;
                for (var o = e.length; o > n; n++)
                    t.push(r(e[n]))
            } else if (w(e))
                for (n in e)
                    t[n] = r(e[n]);
                else if (e && "function" == typeof e.hasOwnProperty)
                    for (n in e)
                        e.hasOwnProperty(n) && (t[n] = r(e[n]));
        else
                for (n in e)
                    zr.call(e, n) && (t[n] = r(e[n]));
        return i
                ? t.$$hashKey = i
                : delete t.$$hashKey,
            t
        }
        function r(e) {
            if (!b(e))
                return e;
            var t = i.indexOf(e);
            if (-1 !== t)
                return a[t];
            if (k(e) || O(e))
                throw Yr("cpws");
            var r,
                t = !1;
            return ni(e)
                ? (r = [], t = !0)
                : P(e)
                    ? r = new e.constructor(e)
                    : C(e)
                        ? r = new Date(e.getTime())
                        : A(e)
                            ? (r = new RegExp(e.source, e.toString().match(/[^\/]*$/)[0]), r.lastIndex = e.lastIndex)
                            : E(e.cloneNode)
                                ? r = e.cloneNode(!0)
                                : (r = Object.create(Qr(e)), t = !0),
            i.push(e),
            a.push(r),
            t
                ? n(e, r)
                : r
        }
        var i = [],
            a = [];
        if (t) {
            if (P(t))
                throw Yr("cpta");
            if (e === t)
                throw Yr("cpi");
            return ni(t)
                ? t.length = 0
                : o(t, function(e, n) {
                    "$$hashKey" !== n && delete t[n]
                }),
            i.push(e),
            a.push(t),
            n(e, t)
        }
        return r(e)
    }
    function R(e, t) {
        if (ni(e)) {
            t = t || [];
            for (var n = 0, r = e.length; r > n; n++)
                t[n] = e[n]
        } else if (b(e))
            for (n in t = t || {}, e)
                ("$" !== n.charAt(0) || "$" !== n.charAt(1)) && (t[n] = e[n]);
    return t || e
    }
    function I(e, t) {
        if (e === t)
            return !0;
        if (null === e || null === t)
            return !1;
        if (e !== e && t !== t)
            return !0;
        var n,
            r = typeof e;
        if (r == typeof t && "object" == r) {
            if (!ni(e)) {
                if (C(e))
                    return C(t)
                        ? I(e.getTime(), t.getTime())
                        : !1;
                if (A(e))
                    return A(t)
                        ? e.toString() == t.toString()
                        : !1;
                if (O(e) || O(t) || k(e) || k(t) || ni(t) || C(t) || A(t))
                    return !1;
                r = lt();
                for (n in e)
                    if ("$" !== n.charAt(0) && !E(e[n])) {
                        if (!I(e[n], t[n]))
                            return !1;
                        r[n] = !0
                    }
                for (n in t)
                    if (!(n in r) && "$" !== n.charAt(0) && y(t[n]) && !E(t[n]))
                        return !1;
            return !0
            }
            if (!ni(t))
                return !1;
            if ((r = e.length) == t.length) {
                for (n = 0; r > n; n++)
                    if (!I(e[n], t[n]))
                        return !1;
            return !0
            }
        }
        return !1
    }
    function F(e, t, n) {
        return e.concat(Wr.call(t, n))
    }
    function q(e, t) {
        var n = 2 < arguments.length
            ? Wr.call(arguments, 2)
            : [];
        return !E(t) || t instanceof RegExp
            ? t
            : n.length
                ? function() {
                    return arguments.length
                        ? t.apply(e, F(n, arguments, 0))
                        : t.apply(e, n)
                }
                : function() {
                    return arguments.length
                        ? t.apply(e, arguments)
                        : t.call(e)
                }
    }
    function _(e, r) {
        var i = r;
        return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1)
            ? i = n
            : k(r)
                ? i = "$WINDOW"
                : r && t === r
                    ? i = "$DOCUMENT"
                    : O(r) && (i = "$SCOPE"),
        i
    }
    function U(e, t) {
        return "undefined" == typeof e
            ? n
            : (S(t) || (t = t
                ? 2
                : null), JSON.stringify(e, _, t))
    }
    function B(e) {
        return x(e)
            ? JSON.parse(e)
            : e
    }
    function L(e, t) {
        var n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(n)
            ? t
            : n
    }
    function H(e, t, n) {
        n = n
            ? -1
            : 1;
        var r = L(t, e.getTimezoneOffset());
        return t = e,
        e = n * (r - e.getTimezoneOffset()),
        t = new Date(t.getTime()),
        t.setMinutes(t.getMinutes() + e),
        t
    }
    function z(e) {
        e = _r(e).clone();
        try {
            e.empty()
        } catch (t) {}
        var n = _r("<div>").append(e).html();
        try {
            return e[0].nodeType === fi
                ? Hr(n)
                : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
                    return "<" + Hr(t)
                })
        } catch (r) {
            return Hr(n)
        }
    }
    function G(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {}
    }
    function W(e) {
        var t = {};
        return o((e || "").split("&"), function(e) {
            var n,
                r,
                i;
            e && (r = e = e.replace(/\+/g, "%20"), n = e.indexOf("="), -1 !== n && (r = e.substring(0, n), i = e.substring(n + 1)), r = G(r), y(r) && (i = y(i)
                ? G(i)
                : !0, zr.call(t, r)
                ? ni(t[r])
                    ? t[r].push(i)
                    : t[r] = [t[r], i]
                : t[r] = i))
        }),
        t
    }
    function X(e) {
        var t = [];
        return o(e, function(e, n) {
            ni(e)
                ? o(e, function(e) {
                    t.push(K(n, !0) + (!0 === e
                        ? ""
                        : "=" + K(e, !0)))
                })
                : t.push(K(n, !0) + (!0 === e
                    ? ""
                    : "=" + K(e, !0)))
        }),
        t.length
            ? t.join("&")
            : ""
    }
    function J(e) {
        return K(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }
    function K(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, t
            ? "%20"
            : "+")
    }
    function Q(e, t) {
        var n,
            r,
            i = ui.length;
        for (r = 0; i > r; ++r)
            if (n = ui[r] + t, x(n = e.getAttribute(n)))
                return n;
    return null
    }
    function Y(e, t) {
        var n,
            r,
            i = {};
        o(ui, function(t) {
            t += "app",
            !n && e.hasAttribute && e.hasAttribute(t) && (n = e, r = e.getAttribute(t))
        }),
        o(ui, function(t) {
            t += "app";
            var i;
            !n && (i = e.querySelector("[" + t.replace(":", "\\:") + "]")) && (n = i, r = i.getAttribute(t))
        }),
        n && (i.strictDi = null !== Q(n, "strict-di"), t(n, r
            ? [r]
            : [], i))
    }
    function Z(n, r, i) {
        b(i) || (i = {}),
        i = c({
            strictDi: !1
        }, i);
        var a = function() {
                if (n = _r(n), n.injector()) {
                    var e = n[0] === t
                        ? "document"
                        : z(n);
                    throw Yr("btstrpd", e.replace(/</, "&lt;").replace(/>/, "&gt;"))
                }
                return r = r || [],
                r.unshift([
                    "$provide",
                    function(e) {
                        e.value("$rootElement", n)
                    }
                ]),
                i.debugInfoEnabled && r.push([
                    "$compileProvider",
                    function(e) {
                        e.debugInfoEnabled(!0)
                    }
                ]),
                r.unshift("ng"),
                e = qt(r, i.strictDi),
                e.invoke([
                    "$rootScope",
                    "$rootElement",
                    "$compile",
                    "$injector",
                    function(e, t, n, r) {
                        e.$apply(function() {
                            t.data("$injector", r),
                            n(t)(e)
                        })
                    }
                ]),
                e
            },
            s = /^NG_ENABLE_DEBUG_INFO!/,
            u = /^NG_DEFER_BOOTSTRAP!/;
        return e && s.test(e.name) && (i.debugInfoEnabled = !0, e.name = e.name.replace(s, "")),
        e && !u.test(e.name)
            ? a()
            : (e.name = e.name.replace(u, ""), Zr.resumeBootstrap = function(e) {
                return o(e, function(e) {
                    r.push(e)
                }),
                a()
            },
            E(Zr.resumeDeferredBootstrap) && Zr.resumeDeferredBootstrap(),
            void 0)
    }
    function et() {
        e.name = "NG_ENABLE_DEBUG_INFO!" + e.name,
        e.location.reload()
    }
    function tt(e) {
        if (e = Zr.element(e).injector(), !e)
            throw Yr("test");
        return e.get("$$testability")
    }
    function nt(e, t) {
        return t = t || "_",
        e.replace(li, function(e, n) {
            return (n
                ? t
                : "") + e.toLowerCase()
        })
    }
    function rt() {
        var t;
        if (!ci) {
            var r = si();
            (Ur = g(r)
                ? e.jQuery
                : r
                    ? e[r]
                    : n) && Ur.fn.on
                ? (_r = Ur, c(Ur.fn, {
                    scope: Ei.scope,
                    isolateScope: Ei.isolateScope,
                    controller: Ei.controller,
                    injector: Ei.injector,
                    inheritedData: Ei.inheritedData
                }), t = Ur.cleanData, Ur.cleanData = function(e) {
                    var n;
                    if (ti)
                        ti = !1;
                    else
                        for (var r, i = 0; null != (r = e[i]); i++)
                            (n = Ur._data(r, "events")) && n.$destroy && Ur(r).triggerHandler("$destroy");
                t(e)
                })
                : _r = $t,
            Zr.element = _r,
            ci = !0
        }
    }
    function it(e, t, n) {
        if (!e)
            throw Yr("areq", t || "?", n || "required");
        return e
    }
    function ot(e, t, n) {
        return n && ni(e) && (e = e[e.length - 1]),
        it(E(e), t, "not a function, got " + (e && "object" == typeof e
            ? e.constructor.name || "Object"
            : typeof e)),
        e
    }
    function at(e, t) {
        if ("hasOwnProperty" === e)
            throw Yr("badname", t)
    }
    function st(e, t, n) {
        if (!t)
            return e;
        t = t.split(".");
        for (var r, i = e, o = t.length, a = 0; o > a; a++)
            r = t[a],
            e && (e = (i = e)[r]);
        return !n && E(e)
            ? q(i, e)
            : e
    }
    function ut(e) {
        for (var t, n = e[0], r = e[e.length - 1], i = 1; n !== r && (n = n.nextSibling); i++)
            (t || e[i] !== n) && (t || (t = _r(Wr.call(e, 0, i))), t.push(n));
        return t || e
    }
    function lt() {
        return Object.create(null)
    }
    function ct(e) {
        function t(e, t, n) {
            return e[t] || (e[t] = n())
        }
        var n = r("$injector"),
            i = r("ng");
        return e = t(e, "angular", Object),
        e.$$minErr = e.$$minErr || r,
        t(e, "module", function() {
            var e = {};
            return function(r, o, a) {
                if ("hasOwnProperty" === r)
                    throw i("badname", "module");
                return o && e.hasOwnProperty(r) && (e[r] = null),
                t(e, r, function() {
                    function e(e, t, n, r) {
                        return r || (r = i),
                        function() {
                            return r[n || "push"]([e, t, arguments]),
                            c
                        }
                    }
                    function t(e, t) {
                        return function(n, o) {
                            return o && E(o) && (o.$$moduleName = r),
                            i.push([e, t, arguments]),
                            c
                        }
                    }
                    if (!o)
                        throw n("nomod", r);
                    var i = [],
                        s = [],
                        u = [],
                        l = e("$injector", "invoke", "push", s),
                        c = {
                            _invokeQueue: i,
                            _configBlocks: s,
                            _runBlocks: u,
                            requires: o,
                            name: r,
                            provider: t("$provide", "provider"),
                            factory: t("$provide", "factory"),
                            service: t("$provide", "service"),
                            value: e("$provide", "value"),
                            constant: e("$provide", "constant", "unshift"),
                            decorator: t("$provide", "decorator"),
                            animation: t("$animateProvider", "register"),
                            filter: t("$filterProvider", "register"),
                            controller: t("$controllerProvider", "register"),
                            directive: t("$compileProvider", "directive"),
                            config: l,
                            run: function(e) {
                                return u.push(e),
                                this
                            }
                        };
                    return a && l(a),
                    c
                })
            }
        })
    }
    function ft(t) {
        c(t, {
            bootstrap: Z,
            copy: N,
            extend: c,
            merge: f,
            equals: I,
            element: _r,
            forEach: o,
            injector: qt,
            noop: d,
            bind: q,
            toJson: U,
            fromJson: B,
            identity: $,
            isUndefined: g,
            isDefined: y,
            isString: x,
            isFunction: E,
            isObject: b,
            isNumber: S,
            isElement: V,
            isArray: ni,
            version: pi,
            isDate: C,
            lowercase: Hr,
            uppercase: Gr,
            callbacks: {
                counter: 0
            },
            getTestability: tt,
            $$minErr: r,
            $$csp: ai,
            reloadWithDebugInfo: et
        }),
        (Br = ct(e))("ng", ["ngLocale"], [
            "$provide",
            function(e) {
                e.provider({$$sanitizeUri: Kn}),
                e.provider("$compile", Xt).directive({
                    a: Co,
                    input: _o,
                    textarea: _o,
                    form: Oo,
                    script: Oa,
                    select: Va,
                    style: Da,
                    option: Ma,
                    ngBind: Lo,
                    ngBindHtml: zo,
                    ngBindTemplate: Ho,
                    ngClass: Wo,
                    ngClassEven: Jo,
                    ngClassOdd: Xo,
                    ngCloak: Ko,
                    ngController: Qo,
                    ngForm: To,
                    ngHide: xa,
                    ngIf: ea,
                    ngInclude: ta,
                    ngInit: ra,
                    ngNonBindable: $a,
                    ngPluralize: ya,
                    ngRepeat: ba,
                    ngShow: wa,
                    ngStyle: Sa,
                    ngSwitch: Ca,
                    ngSwitchWhen: Ea,
                    ngSwitchDefault: Aa,
                    ngOptions: ga,
                    ngTransclude: ka,
                    ngModel: pa,
                    ngList: ia,
                    ngChange: Go,
                    pattern: Na,
                    ngPattern: Na,
                    required: ja,
                    ngRequired: ja,
                    minlength: Ia,
                    ngMinlength: Ia,
                    maxlength: Ra,
                    ngMaxlength: Ra,
                    ngValue: Bo,
                    ngModelOptions: da
                }).directive({ngInclude: na}).directive(Eo).directive(Yo),
                e.provider({
                    $anchorScroll: _t,
                    $animate: Fi,
                    $animateCss: qi,
                    $$animateQueue: Ii,
                    $$AnimateRunner: Ri,
                    $browser: zt,
                    $cacheFactory: Gt,
                    $controller: Yt,
                    $document: Zt,
                    $exceptionHandler: en,
                    $filter: cr,
                    $$forceReflow: Hi,
                    $interpolate: hn,
                    $interval: dn,
                    $http: ln,
                    $httpParamSerializer: nn,
                    $httpParamSerializerJQLike: rn,
                    $httpBackend: fn,
                    $xhrFactory: cn,
                    $location: An,
                    $log: kn,
                    $parse: Hn,
                    $rootScope: Jn,
                    $q: zn,
                    $$q: Gn,
                    $sce: er,
                    $sceDelegate: Zn,
                    $sniffer: tr,
                    $templateCache: Wt,
                    $templateRequest: nr,
                    $$testability: rr,
                    $timeout: ir,
                    $window: sr,
                    $$rAF: Xn,
                    $$jqLite: Nt,
                    $$HashMap: Ti,
                    $$cookieReader: lr
                })
            }
        ])
    }
    function pt(e) {
        return e.replace($i, function(e, t, n, r) {
            return r
                ? n.toUpperCase()
                : n
        }).replace(mi, "Moz$1")
    }
    function ht(e) {
        return e = e.nodeType,
        1 === e || !e || 9 === e
    }
    function dt(e, t) {
        var n,
            r,
            i = t.createDocumentFragment(),
            a = [];
        if (bi.test(e)) {
            for (n = n || i.appendChild(t.createElement("div")), r = (wi.exec(e) || ["", ""])[1].toLowerCase(),
            r = Si[r] || Si._default,
            n.innerHTML = r[1] + e.replace(xi, "<$1></$2>") + r[2],
            r = r[0]; r--;)
                n = n.lastChild;
            a = F(a, n.childNodes),
            n = i.firstChild,
            n.textContent = ""
        } else
            a.push(t.createTextNode(e));
        return i.textContent = "",
        i.innerHTML = "",
        o(a, function(e) {
            i.appendChild(e)
        }),
        i
    }
    function $t(e) {
        if (e instanceof $t)
            return e;
        var n;
        if (x(e) && (e = ii(e), n = !0), !(this instanceof $t)) {
            if (n && "<" != e.charAt(0))
                throw gi("nosel");
            return new $t(e)
        }
        if (n) {
            n = t;
            var r;
            e = (r = yi.exec(e))
                ? [n.createElement(r[1])]
                : (r = dt(e, n))
                    ? r.childNodes
                    : []
        }
        Et(this, e)
    }
    function mt(e) {
        return e.cloneNode(!0)
    }
    function vt(e, t) {
        if (t || yt(e), e.querySelectorAll)
            for (var n = e.querySelectorAll("*"), r = 0, i = n.length; i > r; r++)
                yt(n[r])
    }
    function gt(e, t, n, r) {
        if (y(r))
            throw gi("offargs");
        var i = (r = bt(e)) && r.events,
            a = r && r.handle;
        if (a)
            if (t) {
                var s = function(t) {
                    var r = i[t];
                    y(n) && j(r || [], n),
                    y(n) && r && 0 < r.length || (e.removeEventListener(t, a, !1), delete i[t])
                };
                o(t.split(" "), function(e) {
                    s(e),
                    vi[e] && s(vi[e])
                })
            } else
                for (t in i)
                    "$destroy" !== t && e.removeEventListener(t, a, !1),
                    delete i[t]
    }
    function yt(e, t) {
        var r = e.ng339,
            i = r && hi[r];
        i && (t
            ? delete i.data[t]
            : (i.handle && (i.events.$destroy && i.handle({}, "$destroy"), gt(e)), delete hi[r], e.ng339 = n))
    }
    function bt(e, t) {
        var r = e.ng339,
            r = r && hi[r];
        return t && !r && (e.ng339 = r = ++di, r = hi[r] = {
            events: {},
            data: {},
            handle: n
        }),
        r
    }
    function wt(e, t, n) {
        if (ht(e)) {
            var r = y(n),
                i = !r && t && !b(t),
                o = !t;
            if (e = (e = bt(e, !i)) && e.data, r)
                e[t] = n;
            else {
                if (o)
                    return e;
                if (i)
                    return e && e[t];
                c(e, t)
            }
        }
    }
    function xt(e, t) {
        return e.getAttribute
            ? -1 < (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ")
            : !1
    }
    function St(e, t) {
        t && e.setAttribute && o(t.split(" "), function(t) {
            e.setAttribute("class", ii((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ii(t) + " ", " ")))
        })
    }
    function Ct(e, t) {
        if (t && e.setAttribute) {
            var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            o(t.split(" "), function(e) {
                e = ii(e),
                -1 === n.indexOf(" " + e + " ") && (n += e + " ")
            }),
            e.setAttribute("class", ii(n))
        }
    }
    function Et(e, t) {
        if (t)
            if (t.nodeType)
                e[e.length++] = t;
            else {
                var n = t.length;
                if ("number" == typeof n && t.window !== t) {
                    if (n)
                        for (var r = 0; n > r; r++)
                            e[e.length++] = t[r]
                } else
                    e[e.length++] = t
            }
        }
    function At(e, t) {
        return kt(e, "$" + (t || "ngController") + "Controller")
    }
    function kt(e, t, n) {
        for (9 == e.nodeType && (e = e.documentElement), t = ni(t)
            ? t
            : [t]; e;) {
            for (var r = 0, i = t.length; i > r; r++)
                if (y(n = _r.data(e, t[r])))
                    return n;
        e = e.parentNode || 11 === e.nodeType && e.host
        }
    }
    function Ot(e) {
        for (vt(e, !0); e.firstChild;)
            e.removeChild(e.firstChild)
    }
    function Tt(e, t) {
        t || vt(e);
        var n = e.parentNode;
        n && n.removeChild(e)
    }
    function Pt(t, n) {
        n = n || e,
        "complete" === n.document.readyState
            ? n.setTimeout(t)
            : _r(n).on("load", t)
    }
    function Vt(e, t) {
        var n = Ai[t.toLowerCase()];
        return n && ki[D(e)] && n
    }
    function Mt(e, t) {
        var n = function(n, r) {
            n.isDefaultPrevented = function() {
                return n.defaultPrevented
            };
            var i = t[r || n.type],
                o = i
                    ? i.length
                    : 0;
            if (o) {
                if (g(n.immediatePropagationStopped)) {
                    var a = n.stopImmediatePropagation;
                    n.stopImmediatePropagation = function() {
                        n.immediatePropagationStopped = !0,
                        n.stopPropagation && n.stopPropagation(),
                        a && a.call(n)
                    }
                }
                n.isImmediatePropagationStopped = function() {
                    return !0 === n.immediatePropagationStopped
                };
                var s = i.specialHandlerWrapper || Dt;
                o > 1 && (i = R(i));
                for (var u = 0; o > u; u++)
                    n.isImmediatePropagationStopped() || s(e, n, i[u])
            }
        };
        return n.elem = e,
        n
    }
    function Dt(e, t, n) {
        n.call(e, t)
    }
    function jt(e, t, n) {
        var r = t.relatedTarget;
        r && (r === e || Ci.call(e, r)) || n.call(e, t)
    }
    function Nt() {
        this.$get = function() {
            return c($t, {
                hasClass: function(e, t) {
                    return e.attr && (e = e[0]),
                    xt(e, t)
                },
                addClass: function(e, t) {
                    return e.attr && (e = e[0]),
                    Ct(e, t)
                },
                removeClass: function(e, t) {
                    return e.attr && (e = e[0]),
                    St(e, t)
                }
            })
        }
    }
    function Rt(e, t) {
        var n = e && e.$$hashKey;
        return n
            ? ("function" == typeof n && (n = e.$$hashKey()), n)
            : (n = typeof e, n = "function" == n || "object" == n && null !== e
                ? e.$$hashKey = n + ":" + (t || u)()
                : n + ":" + e)
    }
    function It(e, t) {
        if (t) {
            var n = 0;
            this.nextUid = function() {
                return++ n
            }
        }
        o(e, this.put, this)
    }
    function Ft(e) {
        return (e = e.toString().replace(Di, "").match(Pi))
            ? "function(" + (e[1] || "").replace(/[\s\r\n]+/, " ") + ")"
            : "fn"
    }
    function qt(e, t) {
        function r(e) {
            return function(t, n) {
                return b(t)
                    ? (o(t, s(e)), void 0)
                    : e(t, n)
            }
        }
        function i(e, t) {
            if (at(e, "service"), (E(t) || ni(t)) && (t = $.instantiate(t)), !t.$get)
                throw ji("pget", e);
            return d[e + "Provider"] = t
        }
        function a(e, t) {
            return function() {
                var n = y.invoke(t, this);
                if (g(n))
                    throw ji("undef", e);
                return n
            }
        }
        function u(e, t, n) {
            return i(e, {
                $get: !1 !== n
                    ? a(e, t)
                    : t
            })
        }
        function l(e) {
            it(g(e) || ni(e), "modulesToLoad", "not an array");
            var t,
                n = [];
            return o(e, function(e) {
                function r(e) {
                    var t,
                        n;
                    for (t = 0, n = e.length; n > t; t++) {
                        var r = e[t],
                            i = $.get(r[0]);
                        i[r[1]].apply(i, r[2])
                    }
                }
                if (!h.get(e)) {
                    h.put(e, !0);
                    try {
                        x(e)
                            ? (t = Br(e), n = n.concat(l(t.requires)).concat(t._runBlocks), r(t._invokeQueue), r(t._configBlocks))
                            : E(e)
                                ? n.push($.invoke(e))
                                : ni(e)
                                    ? n.push($.invoke(e))
                                    : ot(e, "module")
                    } catch (i) {
                        throw ni(e) && (e = e[e.length - 1]),
                        i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack),
                        ji("modulerr", e, i.stack || i.message || i)
                    }
                }
            }),
            n
        }
        function c(e, n) {
            function r(t, r) {
                if (e.hasOwnProperty(t)) {
                    if (e[t] === f)
                        throw ji("cdep", t + " <- " + p.join(" <- "));
                    return e[t]
                }
                try {
                    return p.unshift(t),
                    e[t] = f,
                    e[t] = n(t, r)
                } catch (i) {
                    throw e[t] === f && delete e[t],
                    i
                } finally {
                    p.shift()
                }
            }
            function i(e, n, i, o) {
                "string" == typeof i && (o = i, i = null);
                var a,
                    s,
                    u,
                    l = [],
                    c = qt.$$annotate(e, t, o);
                for (s = 0, a = c.length; a > s; s++) {
                    if (u = c[s], "string" != typeof u)
                        throw ji("itkn", u);
                    l.push(i && i.hasOwnProperty(u)
                        ? i[u]
                        : r(u, o))
                }
                return ni(e) && (e = e[a]),
                e.apply(n, l)
            }
            return {
                invoke: i,
                instantiate: function(e, t, n) {
                    var r = Object.create((ni(e)
                        ? e[e.length - 1]
                        : e).prototype || null);
                    return e = i(e, r, t, n),
                    b(e) || E(e)
                        ? e
                        : r
                },
                get: r,
                annotate: qt.$$annotate,
                has: function(t) {
                    return d.hasOwnProperty(t + "Provider") || e.hasOwnProperty(t)
                }
            }
        }
        t = !0 === t;
        var f = {},
            p = [],
            h = new It([], !0),
            d = {
                $provide: {
                    provider: r(i),
                    factory: r(u),
                    service: r(function(e, t) {
                        return u(e, [
                            "$injector",
                            function(e) {
                                return e.instantiate(t)
                            }
                        ])
                    }),
                    value: r(function(e, t) {
                        return u(e, m(t), !1)
                    }),
                    constant: r(function(e, t) {
                        at(e, "constant"),
                        d[e] = t,
                        v[e] = t
                    }),
                    decorator: function(e, t) {
                        var n = $.get(e + "Provider"),
                            r = n.$get;
                        n.$get = function() {
                            var e = y.invoke(r, n);
                            return y.invoke(t, null, {$delegate: e})
                        }
                    }
                }
            },
            $ = d.$injector = c(d, function(e, t) {
                throw Zr.isString(t) && p.push(t),
                ji("unpr", p.join(" <- "))
            }),
            v = {},
            y = v.$injector = c(v, function(e, t) {
                var r = $.get(e + "Provider", t);
                return y.invoke(r.$get, r, n, e)
            });
        return o(l(e), function(e) {
            e && y.invoke(e)
        }),
        y
    }
    function _t() {
        var e = !0;
        this.disableAutoScrolling = function() {
            e = !1
        },
        this.$get = [
            "$window",
            "$location",
            "$rootScope",
            function(t, n, r) {
                function i(e) {
                    var t = null;
                    return Array.prototype.some.call(e, function(e) {
                        return "a" === D(e)
                            ? (t = e, !0)
                            : void 0
                    }),
                    t
                }
                function o(e) {
                    if (e) {
                        e.scrollIntoView();
                        var n;
                        n = a.yOffset,
                        E(n)
                            ? n = n()
                            : V(n)
                                ? (n = n[0], n = "fixed" !== t.getComputedStyle(n).position
                                    ? 0
                                    : n.getBoundingClientRect().bottom)
                                : S(n) || (n = 0),
                        n && (e = e.getBoundingClientRect().top, t.scrollBy(0, e - n))
                    } else
                        t.scrollTo(0, 0)
                }
                function a(e) {
                    e = x(e)
                        ? e
                        : n.hash();
                    var t;
                    e
                        ? (t = s.getElementById(e))
                            ? o(t)
                            : (t = i(s.getElementsByName(e)))
                                ? o(t)
                                : "top" === e && o(null)
                        : o(null)
                }
                var s = t.document;
                return e && r.$watch(function() {
                    return n.hash()
                }, function(e, t) {
                    e === t && "" === e || Pt(function() {
                        r.$evalAsync(a)
                    })
                }),
                a
            }
        ]
    }
    function Ut(e, t) {
        return e || t
            ? e
                ? t
                    ? (ni(e) && (e = e.join(" ")), ni(t) && (t = t.join(" ")), e + " " + t)
                    : e
                : t
            : ""
    }
    function Bt(e) {
        x(e) && (e = e.split(" "));
        var t = lt();
        return o(e, function(e) {
            e.length && (t[e] = !0)
        }),
        t
    }
    function Lt(e) {
        return b(e)
            ? e
            : {}
    }
    function Ht(e, t, n, r) {
        function i(e) {
            try {
                e.apply(null, Wr.call(arguments, 1))
            } finally {
                if (m--, 0 === m)
                    for (; v.length;)
                        try {
                            v.pop()()
                        } catch (t) {
                            n.error(t)
                        }
                    }
        }
        function a() {
            S = null,
            s(),
            u()
        }
        function s() {
            e : {
                try {
                    y = f.state;
                    break e
                } catch (e) {}
                y = void 0
            }
            y = g(y)
                ? null
                : y,
            I(y, A) && (y = A),
            A = y
        }
        function u() {
            (w !== l.url() || b !== y) && (w = l.url(), b = y, o(C, function(e) {
                e(l.url(), y)
            }))
        }
        var l = this,
            c = e.location,
            f = e.history,
            p = e.setTimeout,
            h = e.clearTimeout,
            $ = {};
        l.isMock = !1;
        var m = 0,
            v = [];
        l.$$completeOutstandingRequest = i,
        l.$$incOutstandingRequestCount = function() {
            m++
        },
        l.notifyWhenNoOutstandingRequests = function(e) {
            0 === m
                ? e()
                : v.push(e)
        };
        var y,
            b,
            w = c.href,
            x = t.find("base"),
            S = null;
        s(),
        b = y,
        l.url = function(t, n, i) {
            if (g(i) && (i = null), c !== e.location && (c = e.location), f !== e.history && (f = e.history), t) {
                var o = b === i;
                if (w === t && (!r.history || o))
                    return l;
                var a = w && yn(w) === yn(t);
                return w = t,
                b = i,
                !r.history || a && o
                    ? ((!a || S) && (S = t), n
                        ? c.replace(t)
                        : a
                            ? (n = c, i = t.indexOf("#"), i = -1 === i
                                ? ""
                                : t.substr(i), n.hash = i)
                            : c.href = t, c.href !== t && (S = t))
                    : (f[n
                            ? "replaceState"
                            : "pushState"](i, "", t), s(), b = y),
                l
            }
            return S || c.href.replace(/%27/g, "'")
        },
        l.state = function() {
            return y
        };
        var C = [],
            E = !1,
            A = null;
        l.onUrlChange = function(t) {
            return E || (r.history && _r(e).on("popstate", a), _r(e).on("hashchange", a), E = !0),
            C.push(t),
            t
        },
        l.$$applicationDestroyed = function() {
            _r(e).off("hashchange popstate", a)
        },
        l.$$checkUrlChange = u,
        l.baseHref = function() {
            var e = x.attr("href");
            return e
                ? e.replace(/^(https?\:)?\/\/[^\/]*/, "")
                : ""
        },
        l.defer = function(e, t) {
            var n;
            return m++,
            n = p(function() {
                delete $[n],
                i(e)
            }, t || 0),
            $[n] = !0,
            n
        },
        l.defer.cancel = function(e) {
            return $[e]
                ? (delete $[e], h(e), i(d), !0)
                : !1
        }
    }
    function zt() {
        this.$get = [
            "$window",
            "$log",
            "$sniffer",
            "$document",
            function(e, t, n, r) {
                return new Ht(e, r, t, n)
            }
        ]
    }
    function Gt() {
        this.$get = function() {
            function e(e, n) {
                function i(e) {
                    e != p && (h
                        ? h == e && (h = e.n)
                        : h = e, o(e.n, e.p), o(e, p), p = e, p.n = null)
                }
                function o(e, t) {
                    e != t && (e && (e.p = t), t && (t.n = e))
                }
                if (e in t)
                    throw r("$cacheFactory")("iid", e);
                var a = 0,
                    s = c({}, n, {id: e}),
                    u = lt(),
                    l = n && n.capacity || Number.MAX_VALUE,
                    f = lt(),
                    p = null,
                    h = null;
                return t[e] = {
                    put: function(e, t) {
                        if (!g(t)) {
                            if (l < Number.MAX_VALUE) {
                                var n = f[e] || (f[e] = {
                                    key: e
                                });
                                i(n)
                            }
                            return e in u || a++,
                            u[e] = t,
                            a > l && this.remove(h.key),
                            t
                        }
                    },
                    get: function(e) {
                        if (l < Number.MAX_VALUE) {
                            var t = f[e];
                            if (!t)
                                return;
                            i(t)
                        }
                        return u[e]
                    },
                    remove: function(e) {
                        if (l < Number.MAX_VALUE) {
                            var t = f[e];
                            if (!t)
                                return;
                            t == p && (p = t.p),
                            t == h && (h = t.n),
                            o(t.n, t.p),
                            delete f[e]
                        }
                        e in u && (delete u[e], a--)
                    },
                    removeAll: function() {
                        u = lt(),
                        a = 0,
                        f = lt(),
                        p = h = null
                    },
                    destroy: function() {
                        f = s = u = null,
                        delete t[e]
                    },
                    info: function() {
                        return c({}, s, {size: a})
                    }
                }
            }
            var t = {};
            return e.info = function() {
                var e = {};
                return o(t, function(t, n) {
                    e[n] = t.info()
                }),
                e
            },
            e.get = function(e) {
                return t[e]
            },
            e
        }
    }
    function Wt() {
        this.$get = [
            "$cacheFactory",
            function(e) {
                return e("templates")
            }
        ]
    }
    function Xt(e, r) {
        function i(e, t, n) {
            var r = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
                i = {};
            return o(e, function(e, o) {
                var a = e.match(r);
                if (!a)
                    throw _i("iscp", t, o, e, n
                        ? "controller bindings definition"
                        : "isolate scope definition");
                i[o] = {
                    mode: a[1][0],
                    collection: "*" === a[2],
                    optional: "?" === a[3],
                    attrName: a[4] || o
                }
            }),
            i
        }
        function a(e) {
            var t = e.charAt(0);
            if (!t || t !== Hr(t))
                throw _i("baddir", e);
            if (e !== e.trim())
                throw _i("baddir", e)
        }
        var u = {},
            l = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
            f = /(([\w\-]+)(?:\:([^;]+))?;?)/,
            p = M("ngSrc,ngSrcset,src,srcset"),
            v = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
            w = /^(on[a-z]+|formaction)$/;
        this.directive = function C(t, n) {
            return at(t, "directive"),
            x(t)
                ? (a(t), it(n, "directiveFactory"), u.hasOwnProperty(t) || (u[t] = [], e.factory(t + "Directive", [
                    "$injector",
                    "$exceptionHandler",
                    function(e, n) {
                        var r = [];
                        return o(u[t], function(o, a) {
                            try {
                                var s = e.invoke(o);
                                E(s)
                                    ? s = {
                                        compile: m(s)
                                    }
                                    : !s.compile && s.link && (s.compile = m(s.link)),
                                s.priority = s.priority || 0,
                                s.index = a,
                                s.name = s.name || t,
                                s.require = s.require || s.controller && s.name,
                                s.restrict = s.restrict || "EA";
                                var u = s,
                                    l = s,
                                    c = s.name,
                                    f = {
                                        isolateScope: null,
                                        bindToController: null
                                    };
                                if (b(l.scope) && (!0 === l.bindToController
                                    ? (f.bindToController = i(l.scope, c, !0), f.isolateScope = {})
                                    : f.isolateScope = i(l.scope, c, !1)), b(l.bindToController) && (f.bindToController = i(l.bindToController, c, !0)), b(f.bindToController)) {
                                    var p = l.controller,
                                        h = l.controllerAs;
                                    if (!p)
                                        throw _i("noctrl", c);
                                    var d;
                                    e : if (h && x(h))
                                        d = h;
                                    else {
                                        if (x(p)) {
                                            var $ = Li.exec(p);
                                            if ($) {
                                                d = $[3];
                                                break e
                                            }
                                        }
                                        d = void 0
                                    }
                                    if (!d)
                                        throw _i("noident", c)
                                }
                                var v = u.$$bindings = f;
                                b(v.isolateScope) && (s.$$isolateBindings = v.isolateScope),
                                s.$$moduleName = o.$$moduleName,
                                r.push(s)
                            } catch (g) {
                                n(g)
                            }
                        }),
                        r
                    }
                ])), u[t].push(n))
                : o(t, s(C)),
            this
        },
        this.aHrefSanitizationWhitelist = function(e) {
            return y(e)
                ? (r.aHrefSanitizationWhitelist(e), this)
                : r.aHrefSanitizationWhitelist()
        },
        this.imgSrcSanitizationWhitelist = function(e) {
            return y(e)
                ? (r.imgSrcSanitizationWhitelist(e), this)
                : r.imgSrcSanitizationWhitelist()
        };
        var S = !0;
        this.debugInfoEnabled = function(e) {
            return y(e)
                ? (S = e, this)
                : S
        },
        this.$get = [
            "$injector",
            "$interpolate",
            "$exceptionHandler",
            "$templateRequest",
            "$parse",
            "$controller",
            "$rootScope",
            "$document",
            "$sce",
            "$animate",
            "$$sanitizeUri",
            function(e, r, i, a, s, m, y, C, A, k, T) {
                function P(e, t) {
                    try {
                        e.addClass(t)
                    } catch (n) {}
                }
                function V(e, t, n, r, i) {
                    e instanceof _r || (e = _r(e)),
                    o(e, function(t, n) {
                        t.nodeType == fi && t.nodeValue.match(/\S+/) && (e[n] = _r(t).wrap("<span></span>").parent()[0])
                    });
                    var a = M(e, t, e, n, r, i);
                    V.$$addScopeClass(e);
                    var s = null;
                    return function(t, n, r) {
                        it(t, "scope"),
                        i && i.needsNewScope && (t = t.$parent.$new()),
                        r = r || {};
                        var o = r.parentBoundTranscludeFn,
                            u = r.transcludeControllers;
                        if (r = r.futureParentElement, o && o.$$boundTransclude && (o = o.$$boundTransclude), s || (s = (r = r && r[0])
                            ? "foreignobject" !== D(r) && r.toString().match(/SVG/)
                                ? "svg"
                                : "html"
                            : "html"), r = "html" !== s
                            ? _r(K(s, _r("<div>").append(e).html()))
                            : n
                                ? Ei.clone.call(e)
                                : e, u)
                            for (var l in u)
                                r.data("$" + l + "Controller", u[l].instance);
                    return V.$$addScopeInfo(r, t),
                        n && n(r, t),
                        a && a(t, r, r, o),
                        r
                    }
                }
                function M(e, t, r, i, o, a) {
                    function s(e, r, i, o) {
                        var a,
                            s,
                            u,
                            l,
                            c,
                            f,
                            d;
                        if (p)
                            for (d = Array(r.length), l = 0; l < h.length; l += 3)
                                a = h[l],
                                d[a] = r[a];
                    else
                            d = r;
                        for (l = 0, c = h.length; c > l;)
                            s = d[h[l++]],
                            r = h[l++],
                            a = h[l++],
                            r
                                ? (r.scope
                                    ? (u = e.$new(), V.$$addScopeInfo(_r(s), u))
                                    : u = e, f = r.transcludeOnThisElement
                                    ? N(e, r.transclude, o)
                                    : !r.templateOnThisElement && o
                                        ? o
                                        : !o && t
                                            ? N(e, t)
                                            : null, r(a, u, s, i, f))
                                : a && a(e, s.childNodes, n, o)
                        }
                    for (var u, l, c, f, p, h = [], d = 0; d < e.length; d++)
                        u = new ot,
                        l = R(e[d], [], u, 0 === d
                            ? i
                            : n, o),
                        (a = l.length
                            ? _(l, e[d], u, t, r, null, [], [], a)
                            : null) && a.scope && V.$$addScopeClass(u.$$element),
                        u = a && a.terminal || !(c = e[d].childNodes) || !c.length
                            ? null
                            : M(c, a
                                ? (a.transcludeOnThisElement || !a.templateOnThisElement) && a.transclude
                                : t),
                        (a || u) && (h.push(d, a, u), f = !0, p = p || a),
                        a = null;
                    return f
                        ? s
                        : null
                }
                function N(e, t, n) {
                    return function(r, i, o, a, s) {
                        return r || (r = e.$new(!1, s), r.$$transcluded = !0),
                        t(r, i, {
                            parentBoundTranscludeFn: n,
                            transcludeControllers: o,
                            futureParentElement: a
                        })
                    }
                }
                function R(e, t, n, r, i) {
                    var o,
                        a = n.$attr;
                    switch (e.nodeType) {
                        case 1:
                            B(t, Jt(D(e)), "E", r, i);
                            for (var s, u, c, p = e.attributes, h = 0, d = p && p.length; d > h; h++) {
                                var $ = !1,
                                    m = !1;
                                s = p[h],
                                o = s.name,
                                u = ii(s.value),
                                s = Jt(o),
                                (c = ct.test(s)) && (o = o.replace(Ui, "").substr(8).replace(/_(.)/g, function(e, t) {
                                    return t.toUpperCase()
                                })),
                                (s = s.match(ft)) && L(s[1]) && ($ = o, m = o.substr(0, o.length - 5) + "end", o = o.substr(0, o.length - 6)),
                                s = Jt(o.toLowerCase()),
                                a[s] = o,
                                (c || !n.hasOwnProperty(s)) && (n[s] = u, Vt(e, s) && (n[s] = !0)),
                                Y(e, t, u, s, c),
                                B(t, s, "A", r, i, $, m)
                            }
                            if (e = e.className, b(e) && (e = e.animVal), x(e) && "" !== e)
                                for (; o = f.exec(e);)
                                    s = Jt(o[2]),
                                    B(t, s, "C", r, i) && (n[s] = ii(o[3])),
                                    e = e.substr(o.index + o[0].length);
                        break;
                        case fi:
                            if (11 === qr)
                                for (; e.parentNode && e.nextSibling && e.nextSibling.nodeType === fi;)
                                    e.nodeValue += e.nextSibling.nodeValue,
                                    e.parentNode.removeChild(e.nextSibling);
                        J(t, e.nodeValue);
                            break;
                        case 8:
                            try {
                                (o = l.exec(e.nodeValue)) && (s = Jt(o[1]), B(t, s, "M", r, i) && (n[s] = ii(o[2])))
                            } catch (v) {}
                    }
                    return t.sort(W),
                    t
                }
                function F(e, t, n) {
                    var r = [],
                        i = 0;
                    if (t && e.hasAttribute && e.hasAttribute(t)) {
                        do
                            {
                                if(!e)
                                    throw _i("uterdir", t, n);
                        1 == e.nodeType && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--),
                            r.push(e),
                            e = e.nextSibling
                        } while (i > 0)
                    } else
                        r.push(e);
                    return _r(r)
                }
                function q(e, t, n) {
                    return function(r, i, o, a, s) {
                        return i = F(i[0], t, n),
                        e(r, i, o, a, s)
                    }
                }
                function _(e, r, o, a, s, u, l, c, f) {
                    function p(e, t, n, r) {
                        e && (n && (e = q(e, n, r)), e.require = g.require, e.directiveName = y, (T === g || g.$$isolateScope) && (e = et(e, {
                            isolateScope: !0
                        })), l.push(e)),
                        t && (n && (t = q(t, n, r)), t.require = g.require, t.directiveName = y, (T === g || g.$$isolateScope) && (t = et(t, {
                            isolateScope: !0
                        })), c.push(t))
                    }
                    function h(e, t, n, r) {
                        var i;
                        if (x(t)) {
                            var o = t.match(v);
                            t = t.substring(o[0].length);
                            var a = o[1] || o[3],
                                o = "?" === o[2];
                            if ("^^" === a
                                ? n = n.parent()
                                : i = (i = r && r[t]) && i.instance, i || (r = "$" + t + "Controller", i = a
                                ? n.inheritedData(r)
                                : n.data(r)), !i && !o)
                                throw _i("ctreq", t, e)
                        } else if (ni(t))
                            for (i = [], a = 0, o = t.length; o > a; a++)
                                i[a] = h(e, t[a], n, r);
                    return i || null
                    }
                    function d(e, t, n, r, i, o) {
                        var a,
                            s = lt();
                        for (a in r) {
                            var u = r[a],
                                l = {
                                    $scope: u === T || u.$$isolateScope
                                        ? i
                                        : o,
                                    $element: e,
                                    $attrs: t,
                                    $transclude: n
                                },
                                c = u.controller;
                            "@" == c && (c = t[u.name]),
                            l = m(c, l, !0, u.controllerAs),
                            s[u.name] = l,
                            N || e.data("$" + u.name + "Controller", l.instance)
                        }
                        return s
                    }
                    function $(e, t, i, a, s) {
                        function u(e, t, r) {
                            var i;
                            return O(e) || (r = t, t = e, e = n),
                            N && (i = m),
                            r || (r = N
                                ? g.parent()
                                : g),
                            s(e, t, i, r, C)
                        }
                        var f,
                            p,
                            $,
                            m,
                            v,
                            g,
                            y;
                        r === i
                            ? (a = o, g = o.$$element)
                            : (g = _r(i), a = new ot(g, o)),
                        $ = t,
                        T
                            ? p = t.$new(!0)
                            : A && ($ = t.$parent),
                        s && (v = u, v.$$boundTransclude = s),
                        k && (m = d(g, a, v, k, p, t)),
                        T && (V.$$addScopeInfo(g, p, !0, !(P && (P === T || P === T.$$originalDirective))), V.$$addScopeClass(g, !0), p.$$isolateBindings = T.$$isolateBindings, (y = rt(t, a, p, p.$$isolateBindings, T)) && p.$on("$destroy", y));
                        for (var b in m) {
                            y = k[b];
                            var w = m[b],
                                x = y.$$bindings.bindToController;
                            w.identifier && x && (f = rt($, a, w.instance, x, y));
                            var S = w();
                            S !== w.instance && (w.instance = S, g.data("$" + y.name + "Controller", S), f && f(), f = rt($, a, w.instance, x, y))
                        }
                        for (B = 0, L = l.length; L > B; B++)
                            f = l[B],
                            tt(f, f.isolateScope
                                ? p
                                : t, g, a, f.require && h(f.directiveName, f.require, g, m), v);
                        var C = t;
                        for (T && (T.template || null === T.templateUrl) && (C = p), e && e(C, i.childNodes, n, s), B = c.length - 1; B >= 0; B--)
                            f = c[B],
                            tt(f, f.isolateScope
                                ? p
                                : t, g, a, f.require && h(f.directiveName, f.require, g, m), v)
                        }
                    f = f || {};
                    for (var g, y, w, S, C = -Number.MAX_VALUE, A = f.newScopeDirective, k = f.controllerDirectives, T = f.newIsolateScopeDirective, P = f.templateDirective, M = f.nonTlbTranscludeDirective, D = !1, j = !1, N = f.hasElementTranscludeDirective, I = o.$$element = _r(r), _ = a, B = 0, L = e.length; L > B; B++) {
                        g = e[B];
                        var W = g.$$start,
                            J = g.$$end;
                        if (W && (I = F(r, W, J)), w = n, C > g.priority)
                            break;
                        if ((w = g.scope) && (g.templateUrl || (b(w)
                            ? (X("new/isolated scope", T || A, g, I), T = g)
                            : X("new/isolated scope", T, g, I)), A = A || g), y = g.name, !g.templateUrl && g.controller && (w = g.controller, k = k || lt(), X("'" + y + "' controller", k[y], g, I), k[y] = g), (w = g.transclude) && (D = !0, g.$$tlb || (X("transclusion", M, g, I), M = g), "element" == w
                            ? (N = !0, C = g.priority, w = I, I = o.$$element = _r(t.createComment(" " + y + ": " + o[y] + " ")), r = I[0], Z(s, Wr.call(w, 0), r), _ = V(w, a, C, u && u.name, {nonTlbTranscludeDirective: M}))
                            : (w = _r(mt(r)).contents(), I.empty(), _ = V(w, a, n, n, {
                                needsNewScope: g.$$isolateScope || g.$$newScope
                            }))), g.template)
                            if (j = !0, X("template", P, g, I), P = g, w = E(g.template)
                                ? g.template(I, o)
                                : g.template, w = ut(w), g.replace) {
                                if (u = g, w = bi.test(w)
                                    ? Qt(K(g.templateNamespace, ii(w)))
                                    : [], r = w[0], 1 != w.length || 1 !== r.nodeType)
                                    throw _i("tplrt", y, "");
                                Z(s, I, r),
                                w = {
                                    $attr: {}
                                };
                                var Q = R(r, [], w),
                                    Y = e.splice(B + 1, e.length - (B + 1));
                                (T || A) && U(Q, T, A),
                                e = e.concat(Q).concat(Y),
                                H(o, w),
                                L = e.length
                            } else
                                I.html(w);
                    if (g.templateUrl)
                            j = !0,
                            X("template", P, g, I),
                            P = g,
                            g.replace && (u = g),
                            $ = G(e.splice(B, e.length - B), I, o, s, D && _, l, c, {
                                controllerDirectives: k,
                                newScopeDirective: A !== g && A,
                                newIsolateScopeDirective: T,
                                templateDirective: P,
                                nonTlbTranscludeDirective: M
                            }),
                            L = e.length;
                        else if (g.compile)
                            try {
                                S = g.compile(I, o, _),
                                E(S)
                                    ? p(null, S, W, J)
                                    : S && p(S.pre, S.post, W, J)
                            } catch (nt) {
                                i(nt, z(I))
                            }
                        g.terminal && ($.terminal = !0, C = Math.max(C, g.priority))
                    }
                    return $.scope = A && !0 === A.scope,
                    $.transcludeOnThisElement = D,
                    $.templateOnThisElement = j,
                    $.transclude = _,
                    f.hasElementTranscludeDirective = N,
                    $
                }
                function U(e, t, n) {
                    for (var r = 0, i = e.length; i > r; r++)
                        e[r] = h(e[r], {
                            $$isolateScope: t,
                            $$newScope: n
                        })
                }
                function B(t, n, r, o, a, s, l) {
                    if (n === a)
                        return null;
                    if (a = null, u.hasOwnProperty(n)) {
                        var c;
                        n = e.get(n + "Directive");
                        for (var f = 0, p = n.length; p > f; f++)
                            try {
                                c = n[f],
                                (g(o) || o > c.priority) && -1 != c.restrict.indexOf(r) && (s && (c = h(c, {
                                    $$start: s,
                                    $$end: l
                                })), t.push(c), a = c)
                            } catch (d) {
                                i(d)
                            }
                        }
                    return a
                }
                function L(t) {
                    if (u.hasOwnProperty(t))
                        for (var n = e.get(t + "Directive"), r = 0, i = n.length; i > r; r++)
                            if (t = n[r], t.multiElement)
                                return !0;
                return !1
                }
                function H(e, t) {
                    var n = t.$attr,
                        r = e.$attr,
                        i = e.$$element;
                    o(e, function(r, i) {
                        "$" != i.charAt(0) && (t[i] && t[i] !== r && (r += ("style" === i
                            ? ";"
                            : " ") + t[i]), e.$set(i, r, !0, n[i]))
                    }),
                    o(t, function(t, o) {
                        "class" == o
                            ? (P(i, t), e["class"] = (e["class"]
                                ? e["class"] + " "
                                : "") + t)
                            : "style" == o
                                ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style
                                    ? e.style + ";"
                                    : "") + t)
                                : "$" == o.charAt(0) || e.hasOwnProperty(o) || (e[o] = t, r[o] = n[o])
                    })
                }
                function G(e, t, n, r, i, s, u, l) {
                    var c,
                        f,
                        p = [],
                        d = t[0],
                        $ = e.shift(),
                        m = h($, {
                            templateUrl: null,
                            transclude: null,
                            replace: null,
                            $$originalDirective: $
                        }),
                        v = E($.templateUrl)
                            ? $.templateUrl(t, n)
                            : $.templateUrl,
                        g = $.templateNamespace;
                    return t.empty(),
                    a(v).then(function(a) {
                        var h,
                            y;
                        if (a = ut(a), $.replace) {
                            if (a = bi.test(a)
                                ? Qt(K(g, ii(a)))
                                : [], h = a[0], 1 != a.length || 1 !== h.nodeType)
                                throw _i("tplrt", $.name, v);
                            a = {
                                $attr: {}
                            },
                            Z(r, t, h);
                            var w = R(h, [], a);
                            b($.scope) && U(w, !0),
                            e = w.concat(e),
                            H(n, a)
                        } else
                            h = d,
                            t.html(a);
                        for (e.unshift(m), c = _(e, h, n, i, t, $, s, u, l), o(r, function(e, n) {
                            e == h && (r[n] = t[0])
                        }), f = M(t[0].childNodes, i); p.length;) {
                            a = p.shift(),
                            y = p.shift();
                            var x = p.shift(),
                                S = p.shift(),
                                w = t[0];
                            if (!a.$$destroyed) {
                                if (y !== d) {
                                    var C = y.className;
                                    l.hasElementTranscludeDirective && $.replace || (w = mt(h)),
                                    Z(x, _r(y), w),
                                    P(_r(w), C)
                                }
                                y = c.transcludeOnThisElement
                                    ? N(a, c.transclude, S)
                                    : S,
                                c(f, a, w, r, y)
                            }
                        }
                        p = null
                    }),
                    function(e, t, n, r, i) {
                        e = i,
                        t.$$destroyed || (p
                            ? p.push(t, n, r, e)
                            : (c.transcludeOnThisElement && (e = N(t, c.transclude, i)), c(f, t, n, r, e)))
                    }
                }
                function W(e, t) {
                    var n = t.priority - e.priority;
                    return 0 !== n
                        ? n
                        : e.name !== t.name
                            ? e.name < t.name
                                ? -1
                                : 1
                            : e.index - t.index
                }
                function X(e, t, n, r) {
                    function i(e) {
                        return e
                            ? " (module: " + e + ")"
                            : ""
                    }
                    if (t)
                        throw _i("multidir", t.name, i(t.$$moduleName), n.name, i(n.$$moduleName), e, z(r))
                }
                function J(e, t) {
                    var n = r(t, !0);
                    n && e.push({
                        priority: 0,
                        compile: function(e) {
                            e = e.parent();
                            var t = !!e.length;
                            return t && V.$$addBindingClass(e),
                            function(e, r) {
                                var i = r.parent();
                                t || V.$$addBindingClass(i),
                                V.$$addBindingInfo(i, n.expressions),
                                e.$watch(n, function(e) {
                                    r[0].nodeValue = e
                                })
                            }
                        }
                    })
                }
                function K(e, n) {
                    switch (e = Hr(e || "html")) {
                        case "svg":
                        case "math":
                            var r = t.createElement("div");
                            return r.innerHTML = "<" + e + ">" + n + "</" + e + ">",
                            r.childNodes[0].childNodes;
                        default:
                            return n
                    }
                }
                function Q(e, t) {
                    if ("srcdoc" == t)
                        return A.HTML;
                    var n = D(e);
                    return "xlinkHref" == t || "form" == n && "action" == t || "img" != n && ("src" == t || "ngSrc" == t)
                        ? A.RESOURCE_URL
                        : void 0
                }
                function Y(e, t, n, i, o) {
                    var a = Q(e, i);
                    o = p[i] || o;
                    var s = r(n, !0, a, o);
                    if (s) {
                        if ("multiple" === i && "select" === D(e))
                            throw _i("selmulti", z(e));
                        t.push({
                            priority: 100,
                            compile: function() {
                                return {
                                    pre: function(e, t, u) {
                                        if (t = u.$$observers || (u.$$observers = lt()), w.test(i))
                                            throw _i("nodomevents");
                                        var l = u[i];
                                        l !== n && (s = l && r(l, !0, a, o), n = l),
                                        s && (u[i] = s(e), (t[i] || (t[i] = [])).$$inter = !0, (u.$$observers && u.$$observers[i].$$scope || e).$watch(s, function(e, t) {
                                            "class" === i && e != t
                                                ? u.$updateClass(e, t)
                                                : u.$set(i, e)
                                        }))
                                    }
                                }
                            }
                        })
                    }
                }
                function Z(e, n, r) {
                    var i,
                        o,
                        a = n[0],
                        s = n.length,
                        u = a.parentNode;
                    if (e)
                        for (i = 0, o = e.length; o > i; i++)
                            if (e[i] == a) {
                                e[i++] = r,
                                o = i + s - 1;
                                for (var l = e.length; l > i; i++, o++)
                                    l > o
                                        ? e[i] = e[o]
                                        : delete e[i];
                                e.length -= s - 1,
                                e.context === a && (e.context = r);
                                break
                            }
                        for (u && u.replaceChild(r, a), e = t.createDocumentFragment(), e.appendChild(a), _r.hasData(a) && (_r.data(r, _r.data(a)), Ur
                        ? (ti = !0, Ur.cleanData([a]))
                        : delete _r.cache[a[_r.expando]]), a = 1, s = n.length; s > a; a++)
                        u = n[a],
                        _r(u).remove(),
                        e.appendChild(u),
                        delete n[a];
                    n[0] = r,
                    n.length = 1
                }
                function et(e, t) {
                    return c(function() {
                        return e.apply(null, arguments)
                    }, e, t)
                }
                function tt(e, t, n, r, o, a) {
                    try {
                        e(t, n, r, o, a)
                    } catch (s) {
                        i(s, z(n))
                    }
                }
                function rt(e, t, n, i, a) {
                    var u = [];
                    return o(i, function(i, o) {
                        var l,
                            c,
                            f,
                            p,
                            h = i.attrName,
                            $ = i.optional;
                        switch (i.mode) {
                            case "@":
                                $ || zr.call(t, h) || (n[o] = t[h] = void 0),
                                t.$observe(h, function(e) {
                                    x(e) && (n[o] = e)
                                }),
                                t.$$observers[h].$$scope = e,
                                x(t[h]) && (n[o] = r(t[h])(e));
                                break;
                            case "=":
                                if (!zr.call(t, h)) {
                                    if ($)
                                        break;
                                    t[h] = void 0
                                }
                                if ($ && !t[h])
                                    break;
                                c = s(t[h]),
                                p = c.literal
                                    ? I
                                    : function(e, t) {
                                        return e === t || e !== e && t !== t
                                    },
                                f = c.assign || function() {
                                    throw l = n[o] = c(e),
                                    _i("nonassign", t[h], a.name)
                                },
                                l = n[o] = c(e),
                                $ = function(t) {
                                    return p(t, n[o]) || (p(t, l)
                                        ? f(e, t = n[o])
                                        : n[o] = t),
                                    l = t
                                },
                                $.$stateful = !0,
                                $ = i.collection
                                    ? e.$watchCollection(t[h], $)
                                    : e.$watch(s(t[h], $), null, c.literal),
                                u.push($);
                                break;
                            case "&":
                                if (c = t.hasOwnProperty(h)
                                    ? s(t[h])
                                    : d, c === d && $)
                                    break;
                                n[o] = function(t) {
                                    return c(e, t)
                                }
                        }
                    }),
                    u.length && function() {
                        for (var e = 0, t = u.length; t > e; ++e)
                            u[e]()
                    }
                }
                var ot = function(e, t) {
                    if (t) {
                        var n,
                            r,
                            i,
                            o = Object.keys(t);
                        for (n = 0, r = o.length; r > n; n++)
                            i = o[n],
                            this[i] = t[i]
                    } else
                        this.$attr = {};
                    this.$$element = e
                };
                ot.prototype = {
                    $normalize: Jt,
                    $addClass: function(e) {
                        e && 0 < e.length && k.addClass(this.$$element, e)
                    },
                    $removeClass: function(e) {
                        e && 0 < e.length && k.removeClass(this.$$element, e)
                    },
                    $updateClass: function(e, t) {
                        var n = Kt(e, t);
                        n && n.length && k.addClass(this.$$element, n),
                        (n = Kt(t, e)) && n.length && k.removeClass(this.$$element, n)
                    },
                    $set: function(e, t, n, r) {
                        var a = Vt(this.$$element[0], e),
                            s = Oi[e],
                            u = e;
                        if (a
                            ? (this.$$element.prop(e, t), r = a)
                            : s && (this[s] = t, u = s), this[e] = t, r
                            ? this.$attr[e] = r
                            : (r = this.$attr[e]) || (this.$attr[e] = r = nt(e, "-")), a = D(this.$$element), "a" === a && "href" === e || "img" === a && "src" === e)
                            this[e] = t = T(t, "src" === e);
                        else if ("img" === a && "srcset" === e) {
                            for (var a = "", s = ii(t), l = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, l = /\s/.test(s)
                                ? l
                                : /(,)/, s = s.split(l), l = Math.floor(s.length / 2), c = 0; l > c; c++)
                                var f = 2 * c,
                                a = a + T(ii(s[f]), !0),
                                a = a + (" " + ii(s[f + 1]));
                            s = ii(s[2 * c]).split(/\s/),
                            a += T(ii(s[0]), !0),
                            2 === s.length && (a += " " + ii(s[1])),
                            this[e] = t = a
                        }
                        !1 !== n && (null === t || g(t)
                            ? this.$$element.removeAttr(r)
                            : this.$$element.attr(r, t)),
                        (e = this.$$observers) && o(e[u], function(e) {
                            try {
                                e(t)
                            } catch (n) {
                                i(n)
                            }
                        })
                    },
                    $observe: function(e, t) {
                        var n = this,
                            r = n.$$observers || (n.$$observers = lt()),
                            i = r[e] || (r[e] = []);
                        return i.push(t),
                        y.$evalAsync(function() {
                            i.$$inter || !n.hasOwnProperty(e) || g(n[e]) || t(n[e])
                        }),
                        function() {
                            j(i, t)
                        }
                    }
                };
                var at = r.startSymbol(),
                    st = r.endSymbol(),
                    ut = "{{" == at || "}}" == st
                        ? $
                        : function(e) {
                            return e.replace(/\{\{/g, at).replace(/}}/g, st)
                        },
                    ct = /^ngAttr[A-Z]/,
                    ft = /^(.+)Start$/;
                return V.$$addBindingInfo = S
                    ? function(e, t) {
                        var n = e.data("$binding") || [];
                        ni(t)
                            ? n = n.concat(t)
                            : n.push(t),
                        e.data("$binding", n)
                    }
                    : d,
                V.$$addBindingClass = S
                    ? function(e) {
                        P(e, "ng-binding")
                    }
                    : d,
                V.$$addScopeInfo = S
                    ? function(e, t, n, r) {
                        e.data(n
                            ? r
                                ? "$isolateScopeNoTemplate"
                                : "$isolateScope"
                            : "$scope", t)
                    }
                    : d,
                V.$$addScopeClass = S
                    ? function(e, t) {
                        P(e, t
                            ? "ng-isolate-scope"
                            : "ng-scope")
                    }
                    : d,
                V
            }
        ]
    }
    function Jt(e) {
        return pt(e.replace(Ui, ""))
    }
    function Kt(e, t) {
        var n = "",
            r = e.split(/\s+/),
            i = t.split(/\s+/),
            o = 0;
        e : for (; o < r.length; o++) {
            for (var a = r[o], s = 0; s < i.length; s++)
                if (a == i[s])
                    continue e;
        n += (0 < n.length
                ? " "
                : "") + a
        }
        return n
    }
    function Qt(e) {
        e = _r(e);
        var t = e.length;
        if (1 >= t)
            return e;
        for (; t--;)
            8 === e[t].nodeType && Xr.call(e, t, 1);
        return e
    }
    function Yt() {
        var e = {},
            t = !1;
        this.register = function(t, n) {
            at(t, "controller"),
            b(t)
                ? c(e, t)
                : e[t] = n
        },
        this.allowGlobals = function() {
            t = !0
        },
        this.$get = [
            "$injector",
            "$window",
            function(i, o) {
                function a(e, t, n, i) {
                    if (!e || !b(e.$scope))
                        throw r("$controller")("noscp", i, t);
                    e.$scope[t] = n
                }
                return function(r, s, u, l) {
                    var f,
                        p,
                        h;
                    if (u = !0 === u, l && x(l) && (h = l), x(r)) {
                        if (l = r.match(Li), !l)
                            throw Bi("ctrlfmt", r);
                        p = l[1],
                        h = h || l[3],
                        r = e.hasOwnProperty(p)
                            ? e[p]
                            : st(s.$scope, p, !0) || (t
                                ? st(o, p, !0)
                                : n),
                        ot(r, p, !0)
                    }
                    return u
                        ? (u = (ni(r)
                            ? r[r.length - 1]
                            : r).prototype, f = Object.create(u || null), h && a(s, h, f, p || r.name), c(function() {
                            var e = i.invoke(r, f, s, p);
                            return e !== f && (b(e) || E(e)) && (f = e, h && a(s, h, f, p || r.name)),
                            f
                        }, {
                            instance: f,
                            identifier: h
                        }))
                        : (f = i.instantiate(r, s, p), h && a(s, h, f, p || r.name), f)
                }
            }
        ]
    }
    function Zt() {
        this.$get = [
            "$window",
            function(e) {
                return _r(e.document)
            }
        ]
    }
    function en() {
        this.$get = [
            "$log",
            function(e) {
                return function() {
                    e.error.apply(e, arguments)
                }
            }
        ]
    }
    function tn(e) {
        return b(e)
            ? C(e)
                ? e.toISOString()
                : U(e)
            : e
    }
    function nn() {
        this.$get = function() {
            return function(e) {
                if (!e)
                    return "";
                var t = [];
                return a(e, function(e, n) {
                    null === e || g(e) || (ni(e)
                        ? o(e, function(e) {
                            t.push(K(n) + "=" + K(tn(e)))
                        })
                        : t.push(K(n) + "=" + K(tn(e))))
                }),
                t.join("&")
            }
        }
    }
    function rn() {
        this.$get = function() {
            return function(e) {
                function t(e, r, i) {
                    null === e || g(e) || (ni(e)
                        ? o(e, function(e, n) {
                            t(e, r + "[" + (b(e)
                                ? n
                                : "") + "]")
                        })
                        : b(e) && !C(e)
                            ? a(e, function(e, n) {
                                t(e, r + (i
                                    ? ""
                                    : "[") + n + (i
                                    ? ""
                                    : "]"))
                            })
                            : n.push(K(r) + "=" + K(tn(e))))
                }
                if (!e)
                    return "";
                var n = [];
                return t(e, "", !0),
                n.join("&")
            }
        }
    }
    function on(e, t) {
        if (x(e)) {
            var n = e.replace(Ji, "").trim();
            if (n) {
                var r = t("Content-Type");
                (r = r && 0 === r.indexOf(zi)) || (r = (r = n.match(Wi)) && Xi[r[0]].test(n)),
                r && (e = B(n))
            }
        }
        return e
    }
    function an(e) {
        var t,
            n = lt();
        return x(e)
            ? o(e.split("\n"), function(e) {
                t = e.indexOf(":");
                var r = Hr(ii(e.substr(0, t)));
                e = ii(e.substr(t + 1)),
                r && (n[r] = n[r]
                    ? n[r] + ", " + e
                    : e)
            })
            : b(e) && o(e, function(e, t) {
                var r = Hr(t),
                    i = ii(e);
                r && (n[r] = n[r]
                    ? n[r] + ", " + i
                    : i)
            }),
        n
    }
    function sn(e) {
        var t;
        return function(n) {
            return t || (t = an(e)),
            n
                ? (n = t[Hr(n)], void 0 === n && (n = null), n)
                : t
        }
    }
    function un(e, t, n, r) {
        return E(r)
            ? r(e, t, n)
            : (o(r, function(r) {
                e = r(e, t, n)
            }), e)
    }
    function ln() {
        var e = this.defaults = {
                transformResponse: [on],
                transformRequest: [function(e) {
                        return b(e) && "[object File]" !== Kr.call(e) && "[object Blob]" !== Kr.call(e) && "[object FormData]" !== Kr.call(e)
                            ? U(e)
                            : e
                    }
                ],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: R(Gi),
                    put: R(Gi),
                    patch: R(Gi)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                paramSerializer: "$httpParamSerializer"
            },
            t = !1;
        this.useApplyAsync = function(e) {
            return y(e)
                ? (t = !!e, this)
                : t
        };
        var i = !0;
        this.useLegacyPromiseExtensions = function(e) {
            return y(e)
                ? (i = !!e, this)
                : i
        };
        var a = this.interceptors = [];
        this.$get = [
            "$httpBackend",
            "$$cookieReader",
            "$cacheFactory",
            "$rootScope",
            "$q",
            "$injector",
            function(s, u, l, f, p, h) {
                function d(t) {
                    function a(e) {
                        var t = c({}, e);
                        return t.data = un(e.data, e.headers, e.status, u.transformResponse),
                        e = e.status,
                        e >= 200 && 300 > e
                            ? t
                            : p.reject(t)
                    }
                    function s(e, t) {
                        var n,
                            r = {};
                        return o(e, function(e, i) {
                            E(e)
                                ? (n = e(t), null != n && (r[i] = n))
                                : r[i] = e
                        }),
                        r
                    }
                    if (!Zr.isObject(t))
                        throw r("$http")("badreq", t);
                    var u = c({
                        method: "get",
                        transformRequest: e.transformRequest,
                        transformResponse: e.transformResponse,
                        paramSerializer: e.paramSerializer
                    }, t);
                    u.headers = function(t) {
                        var n,
                            r,
                            i,
                            o = e.headers,
                            a = c({}, t.headers),
                            o = c({}, o.common, o[Hr(t.method)]);
                        e : for (n in o) {
                            r = Hr(n);
                            for (i in a)
                                if (Hr(i) === r)
                                    continue e;
                        a[n] = o[n]
                        }
                        return s(a, R(t))
                    }(t),
                    u.method = Gr(u.method),
                    u.paramSerializer = x(u.paramSerializer)
                        ? h.get(u.paramSerializer)
                        : u.paramSerializer;
                    var l = [
                            function(t) {
                                var r = t.headers,
                                    i = un(t.data, sn(r), n, t.transformRequest);
                                return g(i) && o(r, function(e, t) {
                                    "content-type" === Hr(t) && delete r[t]
                                }),
                                g(t.withCredentials) && !g(e.withCredentials) && (t.withCredentials = e.withCredentials),
                                $(t, i).then(a, a)
                            },
                            n
                        ],
                        f = p.when(u);
                    for (o(w, function(e) {
                        (e.request || e.requestError) && l.unshift(e.request, e.requestError),
                        (e.response || e.responseError) && l.push(e.response, e.responseError)
                    }); l.length;) {
                        t = l.shift();
                        var d = l.shift(),
                            f = f.then(t, d)
                    }
                    return i
                        ? (f.success = function(e) {
                            return ot(e, "fn"),
                            f.then(function(t) {
                                e(t.data, t.status, t.headers, u)
                            }),
                            f
                        },
                        f.error = function(e) {
                            return ot(e, "fn"),
                            f.then(null, function(t) {
                                e(t.data, t.status, t.headers, u)
                            }),
                            f
                        })
                        : (f.success = Qi("success"), f.error = Qi("error")),
                    f
                }
                function $(r, i) {
                    function o(e, n, r, i) {
                        function o() {
                            a(n, e, r, i)
                        }
                        h && (e >= 200 && 300 > e
                            ? h.put(C, [e, n, an(r), i])
                            : h.remove(C)),
                        t
                            ? f.$applyAsync(o)
                            : (o(), f.$$phase || f.$apply())
                    }
                    function a(e, t, n, i) {
                        t = t >= -1
                            ? t
                            : 0,
                        (t >= 200 && 300 > t
                            ? w.resolve
                            : w.reject)({data: e, status: t, headers: sn(n), config: r, statusText: i})
                    }
                    function l(e) {
                        a(e.data, e.status, R(e.headers()), e.statusText)
                    }
                    function c() {
                        var e = d.pendingRequests.indexOf(r);
                        -1 !== e && d.pendingRequests.splice(e, 1)
                    }
                    var h,
                        $,
                        w = p.defer(),
                        x = w.promise,
                        S = r.headers,
                        C = m(r.url, r.paramSerializer(r.params));
                    return d.pendingRequests.push(r),
                    x.then(c, c),
                    !r.cache && !e.cache || !1 === r.cache || "GET" !== r.method && "JSONP" !== r.method || (h = b(r.cache)
                        ? r.cache
                        : b(e.cache)
                            ? e.cache
                            : v),
                    h && ($ = h.get(C), y($)
                        ? $ && E($.then)
                            ? $.then(l, l)
                            : ni($)
                                ? a($[1], $[0], R($[2]), $[3])
                                : a($, 200, {}, "OK")
                        : h.put(C, x)),
                    g($) && (($ = ar(r.url)
                        ? u()[r.xsrfCookieName || e.xsrfCookieName]
                        : n) && (S[r.xsrfHeaderName || e.xsrfHeaderName] = $), s(r.method, C, i, o, S, r.timeout, r.withCredentials, r.responseType)),
                    x
                }
                function m(e, t) {
                    return 0 < t.length && (e += (-1 == e.indexOf("?")
                        ? "?"
                        : "&") + t),
                    e
                }
                var v = l("$http");
                e.paramSerializer = x(e.paramSerializer)
                    ? h.get(e.paramSerializer)
                    : e.paramSerializer;
                var w = [];
                return o(a, function(e) {
                    w.unshift(x(e)
                        ? h.get(e)
                        : h.invoke(e))
                }),
                d.pendingRequests = [],
                function() {
                    o(arguments, function(e) {
                        d[e] = function(t, n) {
                            return d(c({}, n || {}, {
                                method: e,
                                url: t
                            }))
                        }
                    })
                }("get", "delete", "head", "jsonp"),
                function() {
                    o(arguments, function(e) {
                        d[e] = function(t, n, r) {
                            return d(c({}, r || {}, {
                                method: e,
                                url: t,
                                data: n
                            }))
                        }
                    })
                }("post", "put", "patch"),
                d.defaults = e,
                d
            }
        ]
    }
    function cn() {
        this.$get = function() {
            return function() {
                return new e.XMLHttpRequest
            }
        }
    }
    function fn() {
        this.$get = [
            "$browser",
            "$window",
            "$document",
            "$xhrFactory",
            function(e, t, n, r) {
                return pn(e, r, e.defer, t.angular.callbacks, n[0])
            }
        ]
    }
    function pn(e, t, n, r, i) {
        function a(e, t, n) {
            var o = i.createElement("script"),
                a = null;
            return o.type = "text/javascript",
            o.src = e,
            o.async = !0,
            a = function(e) {
                o.removeEventListener("load", a, !1),
                o.removeEventListener("error", a, !1),
                i.body.removeChild(o),
                o = null;
                var s = -1,
                    u = "unknown";
                e && ("load" !== e.type || r[t].called || (e = {
                    type: "error"
                }), u = e.type, s = "error" === e.type
                    ? 404
                    : 200),
                n && n(s, u)
            },
            o.addEventListener("load", a, !1),
            o.addEventListener("error", a, !1),
            i.body.appendChild(o),
            a
        }
        return function(i, s, u, l, c, f, p, h) {
            function $() {
                b && b(),
                w && w.abort()
            }
            function m(t, r, i, o, a) {
                y(S) && n.cancel(S),
                b = w = null,
                t(r, i, o, a),
                e.$$completeOutstandingRequest(d)
            }
            if (e.$$incOutstandingRequestCount(), s = s || e.url(), "jsonp" == Hr(i)) {
                var v = "_" + (r.counter++).toString(36);
                r[v] = function(e) {
                    r[v].data = e,
                    r[v].called = !0
                };
                var b = a(s.replace("JSON_CALLBACK", "angular.callbacks." + v), v, function(e, t) {
                    m(l, e, r[v].data, "", t),
                    r[v] = d
                })
            } else {
                var w = t(i, s);
                if (w.open(i, s, !0), o(c, function(e, t) {
                    y(e) && w.setRequestHeader(t, e)
                }), w.onload = function() {
                    var e = w.statusText || "",
                        t = "response" in w
                            ? w.response
                            : w.responseText,
                        n = 1223 === w.status
                            ? 204
                            : w.status;
                    0 === n && (n = t
                        ? 200
                        : "file" == or(s).protocol
                            ? 404
                            : 0),
                    m(l, n, t, w.getAllResponseHeaders(), e)
                },
                i = function() {
                    m(l, -1, null, null, "")
                },
                w.onerror = i,
                w.onabort = i,
                p && (w.withCredentials = !0),
                h)
                    try {
                        w.responseType = h
                    } catch (x) {
                        if ("json" !== h)
                            throw x
                    }
                w.send(g(u)
                    ? null
                    : u)
            }
            if (f > 0)
                var S = n($, f);
            else
                f && E(f.then) && f.then($)
        }
    }
    function hn() {
        var e = "{{",
            t = "}}";
        this.startSymbol = function(t) {
            return t
                ? (e = t, this)
                : e
        },
        this.endSymbol = function(e) {
            return e
                ? (t = e, this)
                : t
        },
        this.$get = [
            "$parse",
            "$exceptionHandler",
            "$sce",
            function(n, r, i) {
                function o(e) {
                    return "\\\\\\" + e
                }
                function a(n) {
                    return n.replace(f, e).replace(p, t)
                }
                function s(o, s, f, p) {
                    function h(e) {
                        try {
                            var t = e;
                            e = f
                                ? i.getTrusted(f, t)
                                : i.valueOf(t);
                            var n;
                            if (p && !y(e))
                                n = e;
                            else if (null == e)
                                n = "";
                            else {
                                switch (typeof e) {
                                    case "string":
                                        break;
                                    case "number":
                                        e = "" + e;
                                        break;
                                    default:
                                        e = U(e)
                                }
                                n = e
                            }
                            return n
                        } catch (a) {
                            r(Yi.interr(o, a))
                        }
                    }
                    p = !!p;
                    for (var d, $, m = 0, v = [], b = [], w = o.length, x = [], S = []; w > m;) {
                        if (-1 == (d = o.indexOf(e, m)) || -1 == ($ = o.indexOf(t, d + u))) {
                            m !== w && x.push(a(o.substring(m)));
                            break
                        }
                        m !== d && x.push(a(o.substring(m, d))),
                        m = o.substring(d + u, $),
                        v.push(m),
                        b.push(n(m, h)),
                        m = $ + l,
                        S.push(x.length),
                        x.push("")
                    }
                    if (f && 1 < x.length && Yi.throwNoconcat(o), !s || v.length) {
                        var C = function(e) {
                            for (var t = 0, n = v.length; n > t; t++) {
                                if (p && g(e[t]))
                                    return;
                                x[S[t]] = e[t]
                            }
                            return x.join("")
                        };
                        return c(function(e) {
                            var t = 0,
                                n = v.length,
                                i = Array(n);
                            try {
                                for (; n > t; t++)
                                    i[t] = b[t](e);
                                return C(i)
                            } catch (a) {
                                r(Yi.interr(o, a))
                            }
                        }, {
                            exp: o,
                            expressions: v,
                            $$watchDelegate: function(e, t) {
                                var n;
                                return e.$watchGroup(b, function(r, i) {
                                    var o = C(r);
                                    E(t) && t.call(this, o, r !== i
                                        ? n
                                        : o, e),
                                    n = o
                                })
                            }
                        })
                    }
                }
                var u = e.length,
                    l = t.length,
                    f = new RegExp(e.replace(/./g, o), "g"),
                    p = new RegExp(t.replace(/./g, o), "g");
                return s.startSymbol = function() {
                    return e
                },
                s.endSymbol = function() {
                    return t
                },
                s
            }
        ]
    }
    function dn() {
        this.$get = [
            "$rootScope",
            "$window",
            "$q",
            "$$q",
            function(e, t, n, r) {
                function i(i, a, s, u) {
                    var l = 4 < arguments.length,
                        c = l
                            ? Wr.call(arguments, 4)
                            : [],
                        f = t.setInterval,
                        p = t.clearInterval,
                        h = 0,
                        d = y(u) && !u,
                        $ = (d
                            ? r
                            : n).defer(),
                        m = $.promise;
                    return s = y(s)
                        ? s
                        : 0,
                    m.then(null, null, l
                        ? function() {
                            i.apply(null, c)
                        }
                        : i),
                    m.$$intervalId = f(function() {
                        $.notify(h++),
                        s > 0 && h >= s && ($.resolve(h), p(m.$$intervalId), delete o[m.$$intervalId]),
                        d || e.$apply()
                    }, a),
                    o[m.$$intervalId] = $,
                    m
                }
                var o = {};
                return i.cancel = function(e) {
                    return e && e.$$intervalId in o
                        ? (o[e.$$intervalId].reject("canceled"), t.clearInterval(e.$$intervalId), delete o[e.$$intervalId], !0)
                        : !1
                },
                i
            }
        ]
    }
    function $n(e) {
        e = e.split("/");
        for (var t = e.length; t--;)
            e[t] = J(e[t]);
        return e.join("/")
    }
    function mn(e, t) {
        var n = or(e);
        t.$$protocol = n.protocol,
        t.$$host = n.hostname,
        t.$$port = p(n.port) || eo[n.protocol] || null
    }
    function vn(e, t) {
        var n = "/" !== e.charAt(0);
        n && (e = "/" + e);
        var r = or(e);
        t.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0)
            ? r.pathname.substring(1)
            : r.pathname),
        t.$$search = W(r.search),
        t.$$hash = decodeURIComponent(r.hash),
        t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
    }
    function gn(e, t) {
        return 0 === t.indexOf(e)
            ? t.substr(e.length)
            : void 0
    }
    function yn(e) {
        var t = e.indexOf("#");
        return -1 == t
            ? e
            : e.substr(0, t)
    }
    function bn(e) {
        return e.replace(/(#.+)|#$/, "$1")
    }
    function wn(e, t, n) {
        this.$$html5 = !0,
        n = n || "",
        mn(e, this),
        this.$$parse = function(e) {
            var n = gn(t, e);
            if (!x(n))
                throw to("ipthprfx", e, t);
            vn(n, this),
            this.$$path || (this.$$path = "/"),
            this.$$compose()
        },
        this.$$compose = function() {
            var e = X(this.$$search),
                n = this.$$hash
                    ? "#" + J(this.$$hash)
                    : "";
            this.$$url = $n(this.$$path) + (e
                ? "?" + e
                : "") + n,
            this.$$absUrl = t + this.$$url.substr(1)
        },
        this.$$parseLinkUrl = function(r, i) {
            if (i && "#" === i[0])
                return this.hash(i.slice(1)),
                !0;
            var o,
                a;
            return y(o = gn(e, r))
                ? (a = o, a = y(o = gn(n, o))
                    ? t + (gn("/", o) || o)
                    : e + a)
                : y(o = gn(t, r))
                    ? a = t + o
                    : t == r + "/" && (a = t),
            a && this.$$parse(a),
            !!a
        }
    }
    function xn(e, t, n) {
        mn(e, this),
        this.$$parse = function(r) {
            var i,
                o = gn(e, r) || gn(t, r);
            g(o) || "#" !== o.charAt(0)
                ? this.$$html5
                    ? i = o
                    : (i = "", g(o) && (e = r, this.replace()))
                : (i = gn(n, o), g(i) && (i = o)),
            vn(i, this),
            r = this.$$path;
            var o = e,
                a = /^\/[A-Z]:(\/.*)/;
            0 === i.indexOf(o) && (i = i.replace(o, "")),
            a.exec(i) || (r = (i = a.exec(r))
                ? i[1]
                : r),
            this.$$path = r,
            this.$$compose()
        },
        this.$$compose = function() {
            var t = X(this.$$search),
                r = this.$$hash
                    ? "#" + J(this.$$hash)
                    : "";
            this.$$url = $n(this.$$path) + (t
                ? "?" + t
                : "") + r,
            this.$$absUrl = e + (this.$$url
                ? n + this.$$url
                : "")
        },
        this.$$parseLinkUrl = function(t) {
            return yn(e) == yn(t)
                ? (this.$$parse(t), !0)
                : !1
        }
    }
    function Sn(e, t, n) {
        this.$$html5 = !0,
        xn.apply(this, arguments),
        this.$$parseLinkUrl = function(r, i) {
            if (i && "#" === i[0])
                return this.hash(i.slice(1)),
                !0;
            var o,
                a;
            return e == yn(r)
                ? o = r
                : (a = gn(t, r))
                    ? o = e + n + a
                    : t === r + "/" && (o = t),
            o && this.$$parse(o),
            !!o
        },
        this.$$compose = function() {
            var t = X(this.$$search),
                r = this.$$hash
                    ? "#" + J(this.$$hash)
                    : "";
            this.$$url = $n(this.$$path) + (t
                ? "?" + t
                : "") + r,
            this.$$absUrl = e + n + this.$$url
        }
    }
    function Cn(e) {
        return function() {
            return this[e]
        }
    }
    function En(e, t) {
        return function(n) {
            return g(n)
                ? this[e]
                : (this[e] = t(n), this.$$compose(), this)
        }
    }
    function An() {
        var e = "",
            t = {
                enabled: !1,
                requireBase: !0,
                rewriteLinks: !0
            };
        this.hashPrefix = function(t) {
            return y(t)
                ? (e = t, this)
                : e
        },
        this.html5Mode = function(e) {
            return T(e)
                ? (t.enabled = e, this)
                : b(e)
                    ? (T(e.enabled) && (t.enabled = e.enabled), T(e.requireBase) && (t.requireBase = e.requireBase), T(e.rewriteLinks) && (t.rewriteLinks = e.rewriteLinks), this)
                    : t
        },
        this.$get = [
            "$rootScope",
            "$browser",
            "$sniffer",
            "$rootElement",
            "$window",
            function(n, r, i, o, a) {
                function s(e, t, n) {
                    var i = l.url(),
                        o = l.$$state;
                    try {
                        r.url(e, t, n),
                        l.$$state = r.state()
                    } catch (a) {
                        throw l.url(i),
                        l.$$state = o,
                        a
                    }
                }
                function u(e, t) {
                    n.$broadcast("$locationChangeSuccess", l.absUrl(), e, l.$$state, t)
                }
                var l,
                    c;
                c = r.baseHref();
                var f,
                    p = r.url();
                if (t.enabled) {
                    if (!c && t.requireBase)
                        throw to("nobase");
                    f = p.substring(0, p.indexOf("/", p.indexOf("//") + 2)) + (c || "/"),
                    c = i.history
                        ? wn
                        : Sn
                } else
                    f = yn(p),
                    c = xn;
                var h = f.substr(0, yn(f).lastIndexOf("/") + 1);
                l = new c(f, h, "#" + e),
                l.$$parseLinkUrl(p, p),
                l.$$state = r.state();
                var d = /^\s*(javascript|mailto):/i;
                o.on("click", function(e) {
                    if (t.rewriteLinks && !e.ctrlKey && !e.metaKey && !e.shiftKey && 2 != e.which && 2 != e.button) {
                        for (var i = _r(e.target); "a" !== D(i[0]);)
                            if (i[0] === o[0] || !(i = i.parent())[0])
                                return;
                    var s = i.prop("href"),
                            u = i.attr("href") || i.attr("xlink:href");
                        b(s) && "[object SVGAnimatedString]" === s.toString() && (s = or(s.animVal).href),
                        d.test(s) || !s || i.attr("target") || e.isDefaultPrevented() || !l.$$parseLinkUrl(s, u) || (e.preventDefault(), l.absUrl() != r.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                    }
                }),
                bn(l.absUrl()) != bn(p) && r.url(l.absUrl(), !0);
                var $ = !0;
                return r.onUrlChange(function(e, t) {
                    g(gn(h, e))
                        ? a.location.href = e
                        : (n.$evalAsync(function() {
                            var r,
                                i = l.absUrl(),
                                o = l.$$state;
                            e = bn(e),
                            l.$$parse(e),
                            l.$$state = t,
                            r = n.$broadcast("$locationChangeStart", e, i, t, o).defaultPrevented,
                            l.absUrl() === e && (r
                                ? (l.$$parse(i), l.$$state = o, s(i, !1, o))
                                : ($ = !1, u(i, o)))
                        }), n.$$phase || n.$digest())
                }),
                n.$watch(function() {
                    var e = bn(r.url()),
                        t = bn(l.absUrl()),
                        o = r.state(),
                        a = l.$$replace,
                        c = e !== t || l.$$html5 && i.history && o !== l.$$state;
                    ($ || c) && ($ = !1, n.$evalAsync(function() {
                        var t = l.absUrl(),
                            r = n.$broadcast("$locationChangeStart", t, e, l.$$state, o).defaultPrevented;
                        l.absUrl() === t && (r
                            ? (l.$$parse(e), l.$$state = o)
                            : (c && s(t, a, o === l.$$state
                                ? null
                                : l.$$state), u(e, o)))
                    })),
                    l.$$replace = !1
                }),
                l
            }
        ]
    }
    function kn() {
        var e = !0,
            t = this;
        this.debugEnabled = function(t) {
            return y(t)
                ? (e = t, this)
                : e
        },
        this.$get = [
            "$window",
            function(n) {
                function r(e) {
                    return e instanceof Error && (e.stack
                        ? e = e.message && -1 === e.stack.indexOf(e.message)
                            ? "Error: " + e.message + "\n" + e.stack
                            : e.stack
                        : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)),
                    e
                }
                function i(e) {
                    var t = n.console || {},
                        i = t[e] || t.log || d;
                    e = !1;
                    try {
                        e = !!i.apply
                    } catch (a) {}
                    return e
                        ? function() {
                            var e = [];
                            return o(arguments, function(t) {
                                e.push(r(t))
                            }),
                            i.apply(t, e)
                        }
                        : function(e, t) {
                            i(e, null == t
                                ? ""
                                : t)
                        }
                }
                return {
                    log: i("log"),
                    info: i("info"),
                    warn: i("warn"),
                    error: i("error"),
                    debug: function() {
                        var n = i("debug");
                        return function() {
                            e && n.apply(t, arguments)
                        }
                    }()
                }
            }
        ]
    }
    function On(e, t) {
        if ("__defineGetter__" === e || "__defineSetter__" === e || "__lookupGetter__" === e || "__lookupSetter__" === e || "__proto__" === e)
            throw ro("isecfld", t);
        return e
    }
    function Tn(e, t) {
        if (e += "", !x(e))
            throw ro("iseccst", t);
        return e
    }
    function Pn(e, t) {
        if (e) {
            if (e.constructor === e)
                throw ro("isecfn", t);
            if (e.window === e)
                throw ro("isecwindow", t);
            if (e.children && (e.nodeName || e.prop && e.attr && e.find))
                throw ro("isecdom", t);
            if (e === Object)
                throw ro("isecobj", t)
        }
        return e
    }
    function Vn(e, t) {
        if (e) {
            if (e.constructor === e)
                throw ro("isecfn", t);
            if (e === io || e === oo || e === ao)
                throw ro("isecff", t)
        }
    }
    function Mn(e, t) {
        if (e && (e === 0..constructor || e === (!1).constructor || e === "".constructor || e === {}.constructor || e === [].constructor || e === Function.constructor))
            throw ro("isecaf", t)
    }
    function Dn(e, t) {
        return "undefined" != typeof e
            ? e
            : t
    }
    function jn(e, t) {
        return "undefined" == typeof e
            ? t
            : "undefined" == typeof t
                ? e
                : e + t
    }
    function Nn(e, t) {
        var n,
            r;
        switch (e.type) {
            case co.Program:
                n = !0,
                o(e.body, function(e) {
                    Nn(e.expression, t),
                    n = n && e.expression.constant
                }),
                e.constant = n;
                break;
            case co.Literal:
                e.constant = !0,
                e.toWatch = [];
                break;
            case co.UnaryExpression:
                Nn(e.argument, t),
                e.constant = e.argument.constant,
                e.toWatch = e.argument.toWatch;
                break;
            case co.BinaryExpression:
                Nn(e.left, t),
                Nn(e.right, t),
                e.constant = e.left.constant && e.right.constant,
                e.toWatch = e.left.toWatch.concat(e.right.toWatch);
                break;
            case co.LogicalExpression:
                Nn(e.left, t),
                Nn(e.right, t),
                e.constant = e.left.constant && e.right.constant,
                e.toWatch = e.constant
                    ? []
                    : [e];
                break;
            case co.ConditionalExpression:
                Nn(e.test, t),
                Nn(e.alternate, t),
                Nn(e.consequent, t),
                e.constant = e.test.constant && e.alternate.constant && e.consequent.constant,
                e.toWatch = e.constant
                    ? []
                    : [e];
                break;
            case co.Identifier:
                e.constant = !1,
                e.toWatch = [e];
                break;
            case co.MemberExpression:
                Nn(e.object, t),
                e.computed && Nn(e.property, t),
                e.constant = e.object.constant && (!e.computed || e.property.constant),
                e.toWatch = [e];
                break;
            case co.CallExpression:
                n = e.filter
                    ? !t(e.callee.name).$stateful
                    : !1,
                r = [],
                o(e.arguments, function(e) {
                    Nn(e, t),
                    n = n && e.constant,
                    e.constant || r.push.apply(r, e.toWatch)
                }),
                e.constant = n,
                e.toWatch = e.filter && !t(e.callee.name).$stateful
                    ? r
                    : [e];
                break;
            case co.AssignmentExpression:
                Nn(e.left, t),
                Nn(e.right, t),
                e.constant = e.left.constant && e.right.constant,
                e.toWatch = [e];
                break;
            case co.ArrayExpression:
                n = !0,
                r = [],
                o(e.elements, function(e) {
                    Nn(e, t),
                    n = n && e.constant,
                    e.constant || r.push.apply(r, e.toWatch)
                }),
                e.constant = n,
                e.toWatch = r;
                break;
            case co.ObjectExpression:
                n = !0,
                r = [],
                o(e.properties, function(e) {
                    Nn(e.value, t),
                    n = n && e.value.constant,
                    e.value.constant || r.push.apply(r, e.value.toWatch)
                }),
                e.constant = n,
                e.toWatch = r;
                break;
            case co.ThisExpression:
                e.constant = !1,
                e.toWatch = []
        }
    }
    function Rn(e) {
        if (1 == e.length) {
            e = e[0].expression;
            var t = e.toWatch;
            return 1 !== t.length
                ? t
                : t[0] !== e
                    ? t
                    : n
        }
    }
    function In(e) {
        return e.type === co.Identifier || e.type === co.MemberExpression
    }
    function Fn(e) {
        return 1 === e.body.length && In(e.body[0].expression)
            ? {
                type: co.AssignmentExpression,
                left: e.body[0].expression,
                right: {
                    type: co.NGValueParameter
                },
                operator: "="
            }
            : void 0
    }
    function qn(e) {
        return 0 === e.body.length || 1 === e.body.length && (e.body[0].expression.type === co.Literal || e.body[0].expression.type === co.ArrayExpression || e.body[0].expression.type === co.ObjectExpression)
    }
    function _n(e, t) {
        this.astBuilder = e,
        this.$filter = t
    }
    function Un(e, t) {
        this.astBuilder = e,
        this.$filter = t
    }
    function Bn(e) {
        return "constructor" == e
    }
    function Ln(e) {
        return E(e.valueOf)
            ? e.valueOf()
            : po.call(e)
    }
    function Hn() {
        var e = lt(),
            t = lt();
        this.$get = [
            "$filter",
            function(r) {
                function i(e, t) {
                    return null == e || null == t
                        ? e === t
                        : "object" == typeof e && (e = Ln(e), "object" == typeof e)
                            ? !1
                            : e === t || e !== e && t !== t
                }
                function a(e, t, r, o, a) {
                    var s,
                        u = o.inputs;
                    if (1 === u.length) {
                        var l = i,
                            u = u[0];
                        return e.$watch(function(e) {
                            var t = u(e);
                            return i(t, l) || (s = o(e, n, n, [t]), l = t && Ln(t)),
                            s
                        }, t, r, a)
                    }
                    for (var c = [], f = [], p = 0, h = u.length; h > p; p++)
                        c[p] = i,
                        f[p] = null;
                    return e.$watch(function(e) {
                        for (var t = !1, r = 0, a = u.length; a > r; r++) {
                            var l = u[r](e);
                            (t || (t = !i(l, c[r]))) && (f[r] = l, c[r] = l && Ln(l))
                        }
                        return t && (s = o(e, n, n, f)),
                        s
                    }, t, r, a)
                }
                function s(e, t, n, r) {
                    var i,
                        o;
                    return i = e.$watch(function(e) {
                        return r(e)
                    }, function(e, n, r) {
                        o = e,
                        E(t) && t.apply(this, arguments),
                        y(e) && r.$$postDigest(function() {
                            y(o) && i()
                        })
                    }, n)
                }
                function u(e, t, n, r) {
                    function i(e) {
                        var t = !0;
                        return o(e, function(e) {
                            y(e) || (t = !1)
                        }),
                        t
                    }
                    var a,
                        s;
                    return a = e.$watch(function(e) {
                        return r(e)
                    }, function(e, n, r) {
                        s = e,
                        E(t) && t.call(this, e, n, r),
                        i(e) && r.$$postDigest(function() {
                            i(s) && a()
                        })
                    }, n)
                }
                function l(e, t, n, r) {
                    var i;
                    return i = e.$watch(function(e) {
                        return r(e)
                    }, function() {
                        E(t) && t.apply(this, arguments),
                        i()
                    }, n)
                }
                function c(e, t) {
                    if (!t)
                        return e;
                    var n = e.$$watchDelegate,
                        r = !1,
                        n = n !== u && n !== s
                            ? function(n, i, o, a) {
                                return o = r && a
                                    ? a[0]
                                    : e(n, i, o, a),
                                t(o, n, i)
                            }
                            : function(n, r, i, o) {
                                return i = e(n, r, i, o),
                                n = t(i, n, r),
                                y(i)
                                    ? n
                                    : i
                            };
                    return e.$$watchDelegate && e.$$watchDelegate !== a
                        ? n.$$watchDelegate = e.$$watchDelegate
                        : t.$stateful || (n.$$watchDelegate = a, r = !e.inputs, n.inputs = e.inputs
                            ? e.inputs
                            : [e]),
                    n
                }
                var f = ai().noUnsafeEval,
                    p = {
                        csp: f,
                        expensiveChecks: !1
                    },
                    h = {
                        csp: f,
                        expensiveChecks: !0
                    };
                return function(n, i, o) {
                    var f,
                        $,
                        m;
                    switch (typeof n) {
                        case "string":
                            m = n = n.trim();
                            var v = o
                                ? t
                                : e;
                            return f = v[m],
                            f || (":" === n.charAt(0) && ":" === n.charAt(1) && ($ = !0, n = n.substring(2)), o = o
                                ? h
                                : p, f = new lo(o), f = new fo(f, r, o).parse(n), f.constant
                                ? f.$$watchDelegate = l
                                : $
                                    ? f.$$watchDelegate = f.literal
                                        ? u
                                        : s
                                    : f.inputs && (f.$$watchDelegate = a), v[m] = f),
                            c(f, i);
                        case "function":
                            return c(n, i);
                        default:
                            return d
                    }
                }
            }
        ]
    }
    function zn() {
        this.$get = [
            "$rootScope",
            "$exceptionHandler",
            function(e, t) {
                return Wn(function(t) {
                    e.$evalAsync(t)
                }, t)
            }
        ]
    }
    function Gn() {
        this.$get = [
            "$browser",
            "$exceptionHandler",
            function(e, t) {
                return Wn(function(t) {
                    e.defer(t)
                }, t)
            }
        ]
    }
    function Wn(e, t) {
        function i(e, t, n) {
            function r(t) {
                return function(n) {
                    i || (i = !0, t.call(e, n))
                }
            }
            var i = !1;
            return [r(t), r(n)]
        }
        function a() {
            this.$$state = {
                status: 0
            }
        }
        function s(e, t) {
            return function(n) {
                t.call(e, n)
            }
        }
        function u(r) {
            !r.processScheduled && r.pending && (r.processScheduled = !0, e(function() {
                var e,
                    i,
                    o;
                o = r.pending,
                r.processScheduled = !1,
                r.pending = n;
                for (var a = 0, s = o.length; s > a; ++a) {
                    i = o[a][0],
                    e = o[a][r.status];
                    try {
                        E(e)
                            ? i.resolve(e(r.value))
                            : 1 === r.status
                                ? i.resolve(r.value)
                                : i.reject(r.value)
                    } catch (u) {
                        i.reject(u),
                        t(u)
                    }
                }
            }))
        }
        function l() {
            this.promise = new a,
            this.resolve = s(this, this.resolve),
            this.reject = s(this, this.reject),
            this.notify = s(this, this.notify)
        }
        var f = r("$q", TypeError);
        c(a.prototype, {
            then: function(e, t, n) {
                if (g(e) && g(t) && g(n))
                    return this;
                var r = new l;
                return this.$$state.pending = this.$$state.pending || [],
                this.$$state.pending.push([r, e, t, n]),
                0 < this.$$state.status && u(this.$$state),
                r.promise
            },
            "catch": function(e) {
                return this.then(null, e)
            },
            "finally": function(e, t) {
                return this.then(function(t) {
                    return h(t, !0, e)
                }, function(t) {
                    return h(t, !1, e)
                }, t)
            }
        }),
        c(l.prototype, {
            resolve: function(e) {
                this.promise.$$state.status || (e === this.promise
                    ? this.$$reject(f("qcycle", e))
                    : this.$$resolve(e))
            },
            $$resolve: function(e) {
                var n,
                    r;
                r = i(this, this.$$resolve, this.$$reject);
                try {
                    (b(e) || E(e)) && (n = e && e.then),
                    E(n)
                        ? (this.promise.$$state.status = -1, n.call(e, r[0], r[1], this.notify))
                        : (this.promise.$$state.value = e, this.promise.$$state.status = 1, u(this.promise.$$state))
                } catch (o) {
                    r[1](o),
                    t(o)
                }
            },
            reject: function(e) {
                this.promise.$$state.status || this.$$reject(e)
            },
            $$reject: function(e) {
                this.promise.$$state.value = e,
                this.promise.$$state.status = 2,
                u(this.promise.$$state)
            },
            notify: function(n) {
                var r = this.promise.$$state.pending;
                0 >= this.promise.$$state.status && r && r.length && e(function() {
                    for (var e, i, o = 0, a = r.length; a > o; o++) {
                        i = r[o][0],
                        e = r[o][3];
                        try {
                            i.notify(E(e)
                                ? e(n)
                                : n)
                        } catch (s) {
                            t(s)
                        }
                    }
                })
            }
        });
        var p = function(e, t) {
                var n = new l;
                return t
                    ? n.resolve(e)
                    : n.reject(e),
                n.promise
            },
            h = function(e, t, n) {
                var r = null;
                try {
                    E(n) && (r = n())
                } catch (i) {
                    return p(i, !1)
                }
                return r && E(r.then)
                    ? r.then(function() {
                        return p(e, t)
                    }, function(e) {
                        return p(e, !1)
                    })
                    : p(e, t)
            },
            d = function(e, t, n, r) {
                var i = new l;
                return i.resolve(e),
                i.promise.then(t, n, r)
            },
            $ = function m(e) {
                if (!E(e))
                    throw f("norslvr", e);
                if (!(this instanceof m))
                    return new m(e);
                var t = new l;
                return e(function(e) {
                    t.resolve(e)
                }, function(e) {
                    t.reject(e)
                }),
                t.promise
            };
        return $.defer = function() {
            return new l
        },
        $.reject = function(e) {
            var t = new l;
            return t.reject(e),
            t.promise
        },
        $.when = d,
        $.resolve = d,
        $.all = function(e) {
            var t = new l,
                n = 0,
                r = ni(e)
                    ? []
                    : {};
            return o(e, function(e, i) {
                n++,
                d(e).then(function(e) {
                    r.hasOwnProperty(i) || (r[i] = e, --n || t.resolve(r))
                }, function(e) {
                    r.hasOwnProperty(i) || t.reject(e)
                })
            }),
            0 === n && t.resolve(r),
            t.promise
        },
        $
    }
    function Xn() {
        this.$get = [
            "$window",
            "$timeout",
            function(e, t) {
                var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame,
                    r = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame,
                    i = !!n,
                    o = i
                        ? function(e) {
                            var t = n(e);
                            return function() {
                                r(t)
                            }
                        }
                        : function(e) {
                            var n = t(e, 16.66, !1);
                            return function() {
                                t.cancel(n)
                            }
                        };
                return o.supported = i,
                o
            }
        ]
    }
    function Jn() {
        function e(e) {
            function t() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null,
                this.$$listeners = {},
                this.$$listenerCount = {},
                this.$$watchersCount = 0,
                this.$id = ++ei,
                this.$$ChildScope = null
            }
            return t.prototype = e,
            t
        }
        var t = 10,
            n = r("$rootScope"),
            a = null,
            s = null;
        this.digestTtl = function(e) {
            return arguments.length && (t = e),
            t
        },
        this.$get = [
            "$injector",
            "$exceptionHandler",
            "$parse",
            "$browser",
            function(r, u, l, c) {
                function f(e) {
                    e.currentScope.$$destroyed = !0
                }
                function p(e) {
                    9 === qr && (e.$$childHead && p(e.$$childHead), e.$$nextSibling && p(e.$$nextSibling)),
                    e.$parent = e.$$nextSibling = e.$$prevSibling = e.$$childHead = e.$$childTail = e.$root = e.$$watchers = null
                }
                function h() {
                    this.$id = ++ei,
                    this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null,
                    this.$root = this,
                    this.$$destroyed = !1,
                    this.$$listeners = {},
                    this.$$listenerCount = {},
                    this.$$watchersCount = 0,
                    this.$$isolateBindings = null
                }
                function $(e) {
                    if (S.$$phase)
                        throw n("inprog", S.$$phase);
                    S.$$phase = e
                }
                function m(e, t) {
                    do
                        e.$$watchersCount += t;
                    while (e = e.$parent)
                }
                function v(e, t, n) {
                    do
                        e.$$listenerCount[n] -= t,
                        0 === e.$$listenerCount[n] && delete e.$$listenerCount[n];
                    while (e = e.$parent)
                }
                function y() {}
                function w() {
                    for (; k.length;)
                        try {
                            k.shift()()
                        } catch (e) {
                            u(e)
                        }
                    s = null
                }
                function x() {
                    null === s && (s = c.defer(function() {
                        S.$apply(w)
                    }))
                }
                h.prototype = {
                    constructor: h,
                    $new: function(t, n) {
                        var r;
                        return n = n || this,
                        t
                            ? (r = new h, r.$root = this.$root)
                            : (this.$$ChildScope || (this.$$ChildScope = e(this)), r = new this.$$ChildScope),
                        r.$parent = n,
                        r.$$prevSibling = n.$$childTail,
                        n.$$childHead
                            ? (n.$$childTail.$$nextSibling = r, n.$$childTail = r)
                            : n.$$childHead = n.$$childTail = r,
                        (t || n != this) && r.$on("$destroy", f),
                        r
                    },
                    $watch: function(e, t, n, r) {
                        var i = l(e);
                        if (i.$$watchDelegate)
                            return i.$$watchDelegate(this, t, n, i, e);
                        var o = this,
                            s = o.$$watchers,
                            u = {
                                fn: t,
                                last: y,
                                get: i,
                                exp: r || e,
                                eq: !!n
                            };
                        return a = null,
                        E(t) || (u.fn = d),
                        s || (s = o.$$watchers = []),
                        s.unshift(u),
                        m(this, 1),
                        function() {
                            0 <= j(s, u) && m(o, -1),
                            a = null
                        }
                    },
                    $watchGroup: function(e, t) {
                        function n() {
                            u = !1,
                            l
                                ? (l = !1, t(i, i, s))
                                : t(i, r, s)
                        }
                        var r = Array(e.length),
                            i = Array(e.length),
                            a = [],
                            s = this,
                            u = !1,
                            l = !0;
                        if (!e.length) {
                            var c = !0;
                            return s.$evalAsync(function() {
                                c && t(i, i, s)
                            }),
                            function() {
                                c = !1
                            }
                        }
                        return 1 === e.length
                            ? this.$watch(e[0], function(e, n, o) {
                                i[0] = e,
                                r[0] = n,
                                t(i, e === n
                                    ? i
                                    : r, o)
                            })
                            : (o(e, function(e, t) {
                                var o = s.$watch(e, function(e, o) {
                                    i[t] = e,
                                    r[t] = o,
                                    u || (u = !0, s.$evalAsync(n))
                                });
                                a.push(o)
                            }), function() {
                                for (; a.length;)
                                    a.shift()()
                            })
                    },
                    $watchCollection: function(e, t) {
                        function n(e) {
                            r = e;
                            var t,
                                n,
                                a,
                                s;
                            if (!g(r)) {
                                if (b(r))
                                    if (i(r))
                                        for (o !== p && (o = p, $ = o.length = 0, c++), e = r.length, $ !== e && (c++, o.length = $ = e), t = 0; e > t; t++)
                                            s = o[t],
                                            a = r[t],
                                            n = s !== s && a !== a,
                                            n || s === a || (c++, o[t] = a);
                                else {
                                        o !== h && (o = h = {}, $ = 0, c++),
                                        e = 0;
                                    for (t in r)
                                        zr.call(r, t) && (e++, a = r[t], s = o[t], t in o
                                            ? (n = s !== s && a !== a, n || s === a || (c++, o[t] = a))
                                            : ($++, o[t] = a, c++));
                                    if ($ > e)
                                        for (t in c++, o)
                                            zr.call(r, t) || ($--, delete o[t])
                                } else
                                    o !== r && (o = r, c++);
                                return c
                            }
                        }
                        n.$stateful = !0;
                        var r,
                            o,
                            a,
                            s = this,
                            u = 1 < t.length,
                            c = 0,
                            f = l(e, n),
                            p = [],
                            h = {},
                            d = !0,
                            $ = 0;
                        return this.$watch(f, function() {
                            if (d
                                ? (d = !1, t(r, r, s))
                                : t(r, a, s), u)
                                if (b(r))
                                    if (i(r)) {
                                        a = Array(r.length);
                                        for (var e = 0; e < r.length; e++)
                                            a[e] = r[e]
                                    }
                                else
                                for (e in a = {}, r)
                                    zr.call(r, e) && (a[e] = r[e]);
                        else
                                a = r
                        })
                    },
                    $digest: function() {
                        var e,
                            r,
                            i,
                            o,
                            l,
                            f,
                            p,
                            h,
                            d,
                            m = t,
                            v = [];
                        $("$digest"),
                        c.$$checkUrlChange(),
                        this === S && null !== s && (c.defer.cancel(s), w()),
                        a = null;
                        do
                            {
                                for(f = !1, p = this; C.length;) {
                                    try {
                                        d = C.shift(),
                                        d.scope.$eval(d.expression, d.locals)
                                    } catch (g) {
                                        u(g)
                                    }
                                    a = null
                                }
                            e : do
                                {
                                    if(o = p.$$watchers)
                                        for (l = o.length; l--;)
                                            try {
                                                if (e = o[l])
                                                    if ((r = e.get(p)) === (i = e.last) || (e.eq
                                                        ? I(r, i)
                                                        : "number" == typeof r && "number" == typeof i && isNaN(r) && isNaN(i))) {
                                                        if (e === a) {
                                                            f = !1;
                                                            break e
                                                        }
                                                    } else
                                                        f = !0,
                                                        a = e,
                                                        e.last = e.eq
                                                            ? N(r, null)
                                                            : r,
                                                        e.fn(r, i === y
                                                            ? r
                                                            : i, p),
                                                        5 > m && (h = 4 - m, v[h] || (v[h] = []), v[h].push({
                                                            msg: E(e.exp)
                                                                ? "fn: " + (e.exp.name || e.exp.toString())
                                                                : e.exp,
                                                            newVal: r,
                                                            oldVal: i
                                                        }))
                                            } catch (b) {
                                                u(b)
                                            }
                                        if (!(o = p.$$watchersCount && p.$$childHead || p !== this && p.$$nextSibling))
                                    for (; p !== this && !(o = p.$$nextSibling);)
                                        p = p.$parent
                            } while (p = o);
                            if ((f || C.length) && !m--)
                                throw S.$$phase = null,
                                n("infdig", t, v)
                        } while (f || C.length);
                        for (S.$$phase = null; A.length;)
                            try {
                                A.shift()()
                            } catch (x) {
                                u(x)
                            }
                        },
                    $destroy: function() {
                        if (!this.$$destroyed) {
                            var e = this.$parent;
                            this.$broadcast("$destroy"),
                            this.$$destroyed = !0,
                            this === S && c.$$applicationDestroyed(),
                            m(this, -this.$$watchersCount);
                            for (var t in this.$$listenerCount)
                                v(this, this.$$listenerCount[t], t);
                            e && e.$$childHead == this && (e.$$childHead = this.$$nextSibling),
                            e && e.$$childTail == this && (e.$$childTail = this.$$prevSibling),
                            this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling),
                            this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling),
                            this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = d,
                            this.$on = this.$watch = this.$watchGroup = function() {
                                return d
                            },
                            this.$$listeners = {},
                            this.$$nextSibling = null,
                            p(this)
                        }
                    },
                    $eval: function(e, t) {
                        return l(e)(this, t)
                    },
                    $evalAsync: function(e, t) {
                        S.$$phase || C.length || c.defer(function() {
                            C.length && S.$digest()
                        }),
                        C.push({scope: this, expression: e, locals: t})
                    },
                    $$postDigest: function(e) {
                        A.push(e)
                    },
                    $apply: function(e) {
                        try {
                            $("$apply");
                            try {
                                return this.$eval(e)
                            } finally {
                                S.$$phase = null
                            }
                        } catch (t) {
                            u(t)
                        } finally {
                            try {
                                S.$digest()
                            } catch (n) {
                                throw u(n),
                                n
                            }
                        }
                    },
                    $applyAsync: function(e) {
                        function t() {
                            n.$eval(e)
                        }
                        var n = this;
                        e && k.push(t),
                        x()
                    },
                    $on: function(e, t) {
                        var n = this.$$listeners[e];
                        n || (this.$$listeners[e] = n = []),
                        n.push(t);
                        var r = this;
                        do
                            r.$$listenerCount[e] || (r.$$listenerCount[e] = 0),
                            r.$$listenerCount[e]++;
                        while (r = r.$parent);
                        var i = this;
                        return function() {
                            var r = n.indexOf(t);
                            -1 !== r && (n[r] = null, v(i, 1, e))
                        }
                    },
                    $emit: function(e) {
                        var t,
                            n,
                            r,
                            i = [],
                            o = this,
                            a = !1,
                            s = {
                                name: e,
                                targetScope: o,
                                stopPropagation: function() {
                                    a = !0
                                },
                                preventDefault: function() {
                                    s.defaultPrevented = !0
                                },
                                defaultPrevented: !1
                            },
                            l = F([s], arguments, 1);
                        do
                            {
                                for(t = o.$$listeners[e] || i, s.currentScope = o, n = 0, r = t.length; r > n; n++)
                                    if (t[n])
                                        try {
                                            t[n].apply(null, l)
                                        } catch (c) {
                                            u(c)
                                        }
                                    else
                                t.splice(n, 1),
                                n--,
                                r--;
                            if (a)
                                return s.currentScope = null,
                                s;
                            o = o.$parent
                        } while (o);
                        return s.currentScope = null,
                        s
                    },
                    $broadcast: function(e) {
                        var t = this,
                            n = this,
                            r = {
                                name: e,
                                targetScope: this,
                                preventDefault: function() {
                                    r.defaultPrevented = !0
                                },
                                defaultPrevented: !1
                            };
                        if (!this.$$listenerCount[e])
                            return r;
                        for (var i, o, a = F([r], arguments, 1); t = n;) {
                            for (r.currentScope = t, n = t.$$listeners[e] || [], i = 0, o = n.length; o > i; i++)
                                if (n[i])
                                    try {
                                        n[i].apply(null, a)
                                    } catch (s) {
                                        u(s)
                                    }
                                else
                                n.splice(i, 1),
                                i--,
                                o--;
                            if (!(n = t.$$listenerCount[e] && t.$$childHead || t !== this && t.$$nextSibling))
                                for (; t !== this && !(n = t.$$nextSibling);)
                                    t = t.$parent
                        }
                        return r.currentScope = null,
                        r
                    }
                };
                var S = new h,
                    C = S.$$asyncQueue = [],
                    A = S.$$postDigestQueue = [],
                    k = S.$$applyAsyncQueue = [];
                return S
            }
        ]
    }
    function Kn() {
        var e = /^\s*(https?|ftp|mailto|tel|file):/,
            t = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(t) {
            return y(t)
                ? (e = t, this)
                : e
        },
        this.imgSrcSanitizationWhitelist = function(e) {
            return y(e)
                ? (t = e, this)
                : t
        },
        this.$get = function() {
            return function(n, r) {
                var i,
                    o = r
                        ? t
                        : e;
                return i = or(n).href,
                "" === i || i.match(o)
                    ? n
                    : "unsafe:" + i
            }
        }
    }
    function Qn(e) {
        if ("self" === e)
            return e;
        if (x(e)) {
            if (-1 < e.indexOf("***"))
                throw ho("iwcard", e);
            return e = oi(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"),
            new RegExp("^" + e + "$")
        }
        if (A(e))
            return new RegExp("^" + e.source + "$");
        throw ho("imatcher")
    }
    function Yn(e) {
        var t = [];
        return y(e) && o(e, function(e) {
            t.push(Qn(e))
        }),
        t
    }
    function Zn() {
        this.SCE_CONTEXTS = $o;
        var e = ["self"],
            t = [];
        this.resourceUrlWhitelist = function(t) {
            return arguments.length && (e = Yn(t)),
            e
        },
        this.resourceUrlBlacklist = function(e) {
            return arguments.length && (t = Yn(e)),
            t
        },
        this.$get = [
            "$injector",
            function(n) {
                function r(e, t) {
                    return "self" === e
                        ? ar(t)
                        : !!e.exec(t.href)
                }
                function i(e) {
                    var t = function(e) {
                        this.$$unwrapTrustedValue = function() {
                            return e
                        }
                    };
                    return e && (t.prototype = new e),
                    t.prototype.valueOf = function() {
                        return this.$$unwrapTrustedValue()
                    },
                    t.prototype.toString = function() {
                        return this.$$unwrapTrustedValue().toString()
                    },
                    t
                }
                var o = function() {
                    throw ho("unsafe")
                };
                n.has("$sanitize") && (o = n.get("$sanitize"));
                var a = i(),
                    s = {};
                return s[$o.HTML] = i(a),
                s[$o.CSS] = i(a),
                s[$o.URL] = i(a),
                s[$o.JS] = i(a),
                s[$o.RESOURCE_URL] = i(s[$o.URL]), {
                    trustAs: function(e, t) {
                        var n = s.hasOwnProperty(e)
                            ? s[e]
                            : null;
                        if (!n)
                            throw ho("icontext", e, t);
                        if (null === t || g(t) || "" === t)
                            return t;
                        if ("string" != typeof t)
                            throw ho("itype", e);
                        return new n(t)
                    },
                    getTrusted: function(n, i) {
                        if (null === i || g(i) || "" === i)
                            return i;
                        var a = s.hasOwnProperty(n)
                            ? s[n]
                            : null;
                        if (a && i instanceof a)
                            return i.$$unwrapTrustedValue();
                        if (n === $o.RESOURCE_URL) {
                            var u,
                                l,
                                a = or(i.toString()),
                                c = !1;
                            for (u = 0, l = e.length; l > u; u++)
                                if (r(e[u], a)) {
                                    c = !0;
                                    break
                                }
                            if (c)
                                for (u = 0, l = t.length; l > u; u++)
                                    if (r(t[u], a)) {
                                        c = !1;
                                        break
                                    }
                                if (c)
                                return i;
                            throw ho("insecurl", i.toString())
                        }
                        if (n === $o.HTML)
                            return o(i);
                        throw ho("unsafe")
                    },
                    valueOf: function(e) {
                        return e instanceof a
                            ? e.$$unwrapTrustedValue()
                            : e
                    }
                }
            }
        ]
    }
    function er() {
        var e = !0;
        this.enabled = function(t) {
            return arguments.length && (e = !!t),
            e
        },
        this.$get = [
            "$parse",
            "$sceDelegate",
            function(t, n) {
                if (e && 8 > qr)
                    throw ho("iequirks");
                var r = R($o);
                r.isEnabled = function() {
                    return e
                },
                r.trustAs = n.trustAs,
                r.getTrusted = n.getTrusted,
                r.valueOf = n.valueOf,
                e || (r.trustAs = r.getTrusted = function(e, t) {
                    return t
                },
                r.valueOf = $),
                r.parseAs = function(e, n) {
                    var i = t(n);
                    return i.literal && i.constant
                        ? i
                        : t(n, function(t) {
                            return r.getTrusted(e, t)
                        })
                };
                var i = r.parseAs,
                    a = r.getTrusted,
                    s = r.trustAs;
                return o($o, function(e, t) {
                    var n = Hr(t);
                    r[pt("parse_as_" + n)] = function(t) {
                        return i(e, t)
                    },
                    r[pt("get_trusted_" + n)] = function(t) {
                        return a(e, t)
                    },
                    r[pt("trust_as_" + n)] = function(t) {
                        return s(e, t)
                    }
                }),
                r
            }
        ]
    }
    function tr() {
        this.$get = [
            "$window",
            "$document",
            function(e, t) {
                var n,
                    r = {},
                    i = p((/android (\d+)/.exec(Hr((e.navigator || {}).userAgent)) || [])[1]),
                    o = /Boxee/i.test((e.navigator || {}).userAgent),
                    a = t[0] || {},
                    s = /^(Moz|webkit|ms)(?=[A-Z])/,
                    u = a.body && a.body.style,
                    l = !1,
                    c = !1;
                if (u) {
                    for (var f in u)
                        if (l = s.exec(f)) {
                            n = l[0],
                            n = n.substr(0, 1).toUpperCase() + n.substr(1);
                            break
                        }
                    n || (n = "WebkitOpacity" in u && "webkit"),
                    l = !!("transition" in u || n + "Transition" in u),
                    c = !!("animation" in u || n + "Animation" in u),
                    !i || l && c || (l = x(u.webkitTransition), c = x(u.webkitAnimation))
                }
                return {
                    history: !(!e.history || !e.history.pushState || 4 > i || o),
                    hasEvent: function(e) {
                        if ("input" === e && 11 >= qr)
                            return !1;
                        if (g(r[e])) {
                            var t = a.createElement("div");
                            r[e] = "on" + e in t
                        }
                        return r[e]
                    },
                    csp: ai(),
                    vendorPrefix: n,
                    transitions: l,
                    animations: c,
                    android: i
                }
            }
        ]
    }
    function nr() {
        this.$get = [
            "$templateCache",
            "$http",
            "$q",
            "$sce",
            function(e, t, n, r) {
                function i(o, a) {
                    i.totalPendingRequests++,
                    x(o) && e.get(o) || (o = r.getTrustedResourceUrl(o));
                    var s = t.defaults && t.defaults.transformResponse;
                    return ni(s)
                        ? s = s.filter(function(e) {
                            return e !== on
                        })
                        : s === on && (s = null),
                    t.get(o, {
                        cache: e,
                        transformResponse: s
                    })["finally"](function() {
                        i.totalPendingRequests--
                    }).then(function(t) {
                        return e.put(o, t.data),
                        t.data
                    }, function(e) {
                        if (!a)
                            throw _i("tpload", o, e.status, e.statusText);
                        return n.reject(e)
                    })
                }
                return i.totalPendingRequests = 0,
                i
            }
        ]
    }
    function rr() {
        this.$get = [
            "$rootScope",
            "$browser",
            "$location",
            function(e, t, n) {
                return {
                    findBindings: function(e, t, n) {
                        e = e.getElementsByClassName("ng-binding");
                        var r = [];
                        return o(e, function(e) {
                            var i = Zr.element(e).data("$binding");
                            i && o(i, function(i) {
                                n
                                    ? new RegExp("(^|\\s)" + oi(t) + "(\\s|\\||$)").test(i) && r.push(e)
                                    : -1 != i.indexOf(t) && r.push(e)
                            })
                        }),
                        r
                    },
                    findModels: function(e, t, n) {
                        for (var r = [
                            "ng-", "data-ng-", "ng\\:"
                        ], i = 0; i < r.length; ++i) {
                            var o = e.querySelectorAll("[" + r[i] + "model" + (n
                                ? "="
                                : "*=") + '"' + t + '"]');
                            if (o.length)
                                return o
                        }
                    },
                    getLocation: function() {
                        return n.url()
                    },
                    setLocation: function(t) {
                        t !== n.url() && (n.url(t), e.$digest())
                    },
                    whenStable: function(e) {
                        t.notifyWhenNoOutstandingRequests(e)
                    }
                }
            }
        ]
    }
    function ir() {
        this.$get = [
            "$rootScope",
            "$browser",
            "$q",
            "$$q",
            "$exceptionHandler",
            function(e, t, n, r, i) {
                function o(o, s, u) {
                    E(o) || (u = s, s = o, o = d);
                    var l,
                        c = Wr.call(arguments, 3),
                        f = y(u) && !u,
                        p = (f
                            ? r
                            : n).defer(),
                        h = p.promise;
                    return l = t.defer(function() {
                        try {
                            p.resolve(o.apply(null, c))
                        } catch (t) {
                            p.reject(t),
                            i(t)
                        } finally {
                            delete a[h.$$timeoutId]
                        }
                        f || e.$apply()
                    }, s),
                    h.$$timeoutId = l,
                    a[l] = p,
                    h
                }
                var a = {};
                return o.cancel = function(e) {
                    return e && e.$$timeoutId in a
                        ? (a[e.$$timeoutId].reject("canceled"), delete a[e.$$timeoutId], t.defer.cancel(e.$$timeoutId))
                        : !1
                },
                o
            }
        ]
    }
    function or(e) {
        return qr && (mo.setAttribute("href", e), e = mo.href),
        mo.setAttribute("href", e), {
            href: mo.href,
            protocol: mo.protocol
                ? mo.protocol.replace(/:$/, "")
                : "",
            host: mo.host,
            search: mo.search
                ? mo.search.replace(/^\?/, "")
                : "",
            hash: mo.hash
                ? mo.hash.replace(/^#/, "")
                : "",
            hostname: mo.hostname,
            port: mo.port,
            pathname: "/" === mo.pathname.charAt(0)
                ? mo.pathname
                : "/" + mo.pathname
        }
    }
    function ar(e) {
        return e = x(e)
            ? or(e)
            : e,
        e.protocol === vo.protocol && e.host === vo.host
    }
    function sr() {
        this.$get = m(e)
    }
    function ur(e) {
        function t(e) {
            try {
                return decodeURIComponent(e)
            } catch (t) {
                return e
            }
        }
        var n = e[0] || {},
            r = {},
            i = "";
        return function() {
            var e,
                o,
                a,
                s,
                u;
            if (e = n.cookie || "", e !== i)
                for (i = e, e = i.split("; "), r = {}, a = 0; a < e.length; a++)
                    o = e[a],
                    s = o.indexOf("="),
                    s > 0 && (u = t(o.substring(0, s)), g(r[u]) && (r[u] = t(o.substring(s + 1))));
        return r
        }
    }
    function lr() {
        this.$get = ur
    }
    function cr(e) {
        function t(n, r) {
            if (b(n)) {
                var i = {};
                return o(n, function(e, n) {
                    i[n] = t(n, e)
                }),
                i
            }
            return e.factory(n + "Filter", r)
        }
        this.register = t,
        this.$get = [
            "$injector",
            function(e) {
                return function(t) {
                    return e.get(t + "Filter")
                }
            }
        ],
        t("currency", $r),
        t("date", Cr),
        t("filter", fr),
        t("json", Er),
        t("limitTo", Ar),
        t("lowercase", xo),
        t("number", mr),
        t("orderBy", kr),
        t("uppercase", So)
    }
    function fr() {
        return function(e, t, n) {
            if (!i(e)) {
                if (null == e)
                    return e;
                throw r("filter")("notarray", e)
            }
            var o;
            switch (dr(t)) {
                case "function":
                    break;
                case "boolean":
                case "null":
                case "number":
                case "string":
                    o = !0;
                case "object":
                    t = pr(t, n, o);
                    break;
                default:
                    return e
            }
            return Array.prototype.filter.call(e, t)
        }
    }
    function pr(e, t, n) {
        var r = b(e) && "$" in e;
        return !0 === t
            ? t = I
            : E(t) || (t = function(e, t) {
                return g(e)
                    ? !1
                    : null === e || null === t
                        ? e === t
                        : b(t) || b(e) && !v(e)
                            ? !1
                            : (e = Hr("" + e), t = Hr("" + t), -1 !== e.indexOf(t))
            }),
        function(i) {
            return r && !b(i)
                ? hr(i, e.$, t, !1)
                : hr(i, e, t, n)
        }
    }
    function hr(e, t, n, r, i) {
        var o = dr(e),
            a = dr(t);
        if ("string" === a && "!" === t.charAt(0))
            return !hr(e, t.substring(1), n, r);
        if (ni(e))
            return e.some(function(e) {
                return hr(e, t, n, r)
            });
        switch (o) {
            case "object":
                var s;
                if (r) {
                    for (s in e)
                        if ("$" !== s.charAt(0) && hr(e[s], t, n, !0))
                            return !0;
                return i
                        ? !1
                        : hr(e, t, n, !1)
                }
                if ("object" === a) {
                    for (s in t)
                        if (i = t[s], !E(i) && !g(i) && (o = "$" === s, !hr(o
                            ? e
                            : e[s], i, n, o, o)))
                            return !1;
                return !0
                }
                return n(e, t);
            case "function":
                return !1;
            default:
                return n(e, t)
        }
    }
    function dr(e) {
        return null === e
            ? "null"
            : typeof e
    }
    function $r(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n, r) {
            return g(n) && (n = t.CURRENCY_SYM),
            g(r) && (r = t.PATTERNS[1].maxFrac),
            null == e
                ? e
                : vr(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, r).replace(/\u00A4/g, n)
        }
    }
    function mr(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n) {
            return null == e
                ? e
                : vr(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
        }
    }
    function vr(e, t, n, r, i) {
        if (b(e))
            return "";
        var o = 0 > e;
        e = Math.abs(e);
        var a = 1 / 0 === e;
        if (!a && !isFinite(e))
            return "";
        var s = e + "",
            u = "",
            l = !1,
            c = [];
        if (a && (u = "âˆž"), !a && -1 !== s.indexOf("e")) {
            var f = s.match(/([\d\.]+)e(-?)(\d+)/);
            f && "-" == f[2] && f[3] > i + 1
                ? e = 0
                : (u = s, l = !0)
        }
        if (a || l)
            i > 0 && 1 > e && (u = e.toFixed(i), e = parseFloat(u), u = u.replace(go, r));
        else {
            a = (s.split(go)[1] || "").length,
            g(i) && (i = Math.min(Math.max(t.minFrac, a), t.maxFrac)),
            e =+ (Math.round(+ (e.toString() + "e" + i)).toString() + "e" + -i);
            var a = ("" + e).split(go),
                s = a[0],
                a = a[1] || "",
                f = 0,
                p = t.lgSize,
                h = t.gSize;
            if (s.length >= p + h)
                for (f = s.length - p, l = 0; f > l; l++)
                    0 === (f - l) % h && 0 !== l && (u += n),
                    u += s.charAt(l);
        for (l = f; l < s.length; l++)
                0 === (s.length - l) % p && 0 !== l && (u += n),
                u += s.charAt(l);
            for (; a.length < i;)
                a += "0";
            i && "0" !== i && (u += r + a.substr(0, i))
        }
        return 0 === e && (o = !1),
        c.push(o
            ? t.negPre
            : t.posPre, u, o
            ? t.negSuf
            : t.posSuf),
        c.join("")
    }
    function gr(e, t, n) {
        var r = "";
        for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;)
            e = "0" + e;
        return n && (e = e.substr(e.length - t)),
        r + e
    }
    function yr(e, t, n, r) {
        return n = n || 0,
        function(i) {
            return i = i["get" + e](),
            (n > 0 || i > -n) && (i += n),
            0 === i && -12 == n && (i = 12),
            gr(i, t, r)
        }
    }
    function br(e, t) {
        return function(n, r) {
            var i = n["get" + e](),
                o = Gr(t
                    ? "SHORT" + e
                    : e);
            return r[o][i]
        }
    }
    function wr(e) {
        var t = new Date(e, 0, 1).getDay();
        return new Date(e, 0, (4 >= t
            ? 5
            : 12) - t)
    }
    function xr(e) {
        return function(t) {
            var n = wr(t.getFullYear());
            return t =+ new Date(t.getFullYear(), t.getMonth(), t.getDate() + (4 - t.getDay())) - + n,
            t = 1 + Math.round(t / 6048e5),
            gr(t, e)
        }
    }
    function Sr(e, t) {
        return 0 >= e.getFullYear()
            ? t.ERAS[0]
            : t.ERAS[1]
    }
    function Cr(e) {
        function t(e) {
            var t;
            if (t = e.match(n)) {
                e = new Date(0);
                var r = 0,
                    i = 0,
                    o = t[8]
                        ? e.setUTCFullYear
                        : e.setFullYear,
                    a = t[8]
                        ? e.setUTCHours
                        : e.setHours;
                t[9] && (r = p(t[9] + t[10]), i = p(t[9] + t[11])),
                o.call(e, p(t[1]), p(t[2]) - 1, p(t[3])),
                r = p(t[4] || 0) - r,
                i = p(t[5] || 0) - i,
                o = p(t[6] || 0),
                t = Math.round(1e3 * parseFloat("0." + (t[7] || 0))),
                a.call(e, r, i, o, t)
            }
            return e
        }
        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(n, r, i) {
            var a,
                s,
                u = "",
                l = [];
            if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, x(n) && (n = wo.test(n)
                ? p(n)
                : t(n)), S(n) && (n = new Date(n)), !C(n) || !isFinite(n.getTime()))
                return n;
            for (; r;)
                (s = bo.exec(r))
                    ? (l = F(l, s, 1), r = l.pop())
                    : (l.push(r), r = null);
            var c = n.getTimezoneOffset();
            return i && (c = L(i, n.getTimezoneOffset()), n = H(n, i, !0)),
            o(l, function(t) {
                a = yo[t],
                u += a
                    ? a(n, e.DATETIME_FORMATS, c)
                    : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }),
            u
        }
    }
    function Er() {
        return function(e, t) {
            return g(t) && (t = 2),
            U(e, t)
        }
    }
    function Ar() {
        return function(e, t, n) {
            return t = 1 / 0 === Math.abs(Number(t))
                ? Number(t)
                : p(t),
            isNaN(t)
                ? e
                : (S(e) && (e = e.toString()), ni(e) || x(e)
                    ? (n = !n || isNaN(n)
                        ? 0
                        : p(n), n = 0 > n
                        ? Math.max(0, e.length + n)
                        : n, t >= 0
                        ? e.slice(n, n + t)
                        : 0 === n
                            ? e.slice(t, e.length)
                            : e.slice(Math.max(0, n + t), n))
                    : e)
        }
    }
    function kr(e) {
        function t(t, n) {
            return n = n
                ? -1
                : 1,
            t.map(function(t) {
                var r = 1,
                    i = $;
                if (E(t))
                    i = t;
                else if (x(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (r = "-" == t.charAt(0)
                    ? -1
                    : 1, t = t.substring(1)), "" !== t && (i = e(t), i.constant)))
                    var o = i(),
                        i = function(e) {
                            return e[o]
                        };
                return {get: i, descending: n} /* removed *n */
            })
        }
        function n(e) {
            switch (typeof e) {
                case "number":
                case "boolean":
                case "string":
                    return !0;
                default:
                    return !1
            }
        }
        return function(e, r, o) {
            if (!i(e))
                return e;
            ni(r) || (r = [r]),
            0 === r.length && (r = ["+"]);
            var a = t(r, o);
            return a.push({
                get: function() {
                    return {}
                },
                descending: o
                    ? -1
                    : 1
            }),
            e = Array.prototype.map.call(e, function(e, t) {
                return {
                    value: e,
                    predicateValues: a.map(function(r) {
                        var i = r.get(e);
                        return r = typeof i,
                        null === i
                            ? (r = "string", i = "null")
                            : "string" === r
                                ? i = i.toLowerCase()
                                : "object" === r && ("function" == typeof i.valueOf && (i = i.valueOf(), n(i)) || v(i) && (i = i.toString(), n(i)) || (i = t)), {
                            value: i,
                            type: r
                        }
                    })
                }
            }),
            e.sort(function(e, t) {
                for (var n = 0, r = 0, i = a.length; i > r; ++r) {
                    var n = e.predicateValues[r],
                        o = t.predicateValues[r],
                        s = 0;
                    if (n.type === o.type
                        ? n.value !== o.value && (s = n.value < o.value
                            ? -1
                            : 1)
                        : s = n.type < o.type
                            ? -1
                            : 1, n = s * a[r].descending)
                        break
                }
                return n
            }),
            e = e.map(function(e) {
                return e.value
            })
        }
    }
    function Or(e) {
        return E(e) && (e = {
            link: e
        }),
        e.restrict = e.restrict || "AC",
        m(e)
    }
    function Tr(e, t, r, i, a) {
        var s = this,
            u = [];
        s.$error = {},
        s.$$success = {},
        s.$pending = n,
        s.$name = a(t.name || t.ngForm || "")(r),
        s.$dirty = !1,
        s.$pristine = !0,
        s.$valid = !0,
        s.$invalid = !1,
        s.$submitted = !1,
        s.$$parentForm = Ao,
        s.$rollbackViewValue = function() {
            o(u, function(e) {
                e.$rollbackViewValue()
            })
        },
        s.$commitViewValue = function() {
            o(u, function(e) {
                e.$commitViewValue()
            })
        },
        s.$addControl = function(e) {
            at(e.$name, "input"),
            u.push(e),
            e.$name && (s[e.$name] = e),
            e.$$parentForm = s
        },
        s.$$renameControl = function(e, t) {
            var n = e.$name;
            s[n] === e && delete s[n],
            s[t] = e,
            e.$name = t
        },
        s.$removeControl = function(e) {
            e.$name && s[e.$name] === e && delete s[e.$name],
            o(s.$pending, function(t, n) {
                s.$setValidity(n, null, e)
            }),
            o(s.$error, function(t, n) {
                s.$setValidity(n, null, e)
            }),
            o(s.$$success, function(t, n) {
                s.$setValidity(n, null, e)
            }),
            j(u, e),
            e.$$parentForm = Ao
        },
        Ir({
            ctrl: this,
            $element: e,
            set: function(e, t, n) {
                var r = e[t];
                r
                    ? -1 === r.indexOf(n) && r.push(n)
                    : e[t] = [n]
            },
            unset: function(e, t, n) {
                var r = e[t];
                r && (j(r, n), 0 === r.length && delete e[t])
            },
            $animate: i
        }),
        s.$setDirty = function() {
            i.removeClass(e, sa),
            i.addClass(e, ua),
            s.$dirty = !0,
            s.$pristine = !1,
            s.$$parentForm.$setDirty()
        },
        s.$setPristine = function() {
            i.setClass(e, sa, ua + " ng-submitted"),
            s.$dirty = !1,
            s.$pristine = !0,
            s.$submitted = !1,
            o(u, function(e) {
                e.$setPristine()
            })
        },
        s.$setUntouched = function() {
            o(u, function(e) {
                e.$setUntouched()
            })
        },
        s.$setSubmitted = function() {
            i.addClass(e, "ng-submitted"),
            s.$submitted = !0,
            s.$$parentForm.$setSubmitted()
        }
    }
    function Pr(e) {
        e.$formatters.push(function(t) {
            return e.$isEmpty(t)
                ? t
                : t.toString()
        })
    }
    function Vr(e, t, n, r, i, o) {
        var a = Hr(t[0].type);
        if (!i.android) {
            var s = !1;
            t.on("compositionstart", function() {
                s = !0
            }),
            t.on("compositionend", function() {
                s = !1,
                u()
            })
        }
        var u = function(e) {
            if (l && (o.defer.cancel(l), l = null), !s) {
                var i = t.val();
                e = e && e.type,
                "password" === a || n.ngTrim && "false" === n.ngTrim || (i = ii(i)),
                (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, e)
            }
        };
        if (i.hasEvent("input"))
            t.on("input", u);
        else {
            var l,
                c = function(e, t, n) {
                    l || (l = o.defer(function() {
                        l = null,
                        t && t.value === n || u(e)
                    }))
                };
            t.on("keydown", function(e) {
                var t = e.keyCode;
                91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || c(e, this, this.value)
            }),
            i.hasEvent("paste") && t.on("paste cut", c)
        }
        t.on("change", u),
        r.$render = function() {
            var e = r.$isEmpty(r.$viewValue)
                ? ""
                : r.$viewValue;
            t.val() !== e && t.val(e)
        }
    }
    function Mr(e, t) {
        return function(n, r) {
            var i,
                a;
            if (C(n))
                return n;
            if (x(n)) {
                if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), Po.test(n))
                    return new Date(n);
                if (e.lastIndex = 0, i = e.exec(n))
                    return i.shift(),
                    a = r
                        ? {
                            yyyy: r.getFullYear(),
                            MM: r.getMonth() + 1,
                            dd: r.getDate(),
                            HH: r.getHours(),
                            mm: r.getMinutes(),
                            ss: r.getSeconds(),
                            sss: r.getMilliseconds() / 1e3
                        }
                : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                },
                o(i, function(e, n) {
                    n < t.length && (a[t[n]] =+ e)
                }),
                new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0)
            }
            return 0 / 0
        }
    }
    function Dr(e, t, r, i) {
        return function(o, a, s, u, l, c, f) {
            function p(e) {
                return e && !(e.getTime && e.getTime() !== e.getTime())
            }
            function h(e) {
                return y(e) && !C(e)
                    ? r(e) || n
                    : e
            }
            jr(o, a, s, u),
            Vr(o, a, s, u, l, c);
            var d,
                $ = u && u.$options && u.$options.timezone;
            if (u.$$parserName = e, u.$parsers.push(function(e) {
                return u.$isEmpty(e)
                    ? null
                    : t.test(e)
                        ? (e = r(e, d), $ && (e = H(e, $)), e)
                        : n
            }), u.$formatters.push(function(e) {
                if (e && !C(e))
                    throw ca("datefmt", e);
                return p(e)
                    ? ((d = e) && $ && (d = H(d, $, !0)), f("date")(e, i, $))
                    : (d = null, "")
            }), y(s.min) || s.ngMin) {
                var m;
                u.$validators.min = function(e) {
                    return !p(e) || g(m) || r(e) >= m
                },
                s.$observe("min", function(e) {
                    m = h(e),
                    u.$validate()
                })
            }
            if (y(s.max) || s.ngMax) {
                var v;
                u.$validators.max = function(e) {
                    return !p(e) || g(v) || r(e) <= v
                },
                s.$observe("max", function(e) {
                    v = h(e),
                    u.$validate()
                })
            }
        }
    }
    function jr(e, t, r, i) {
        (i.$$hasNativeValidators = b(t[0].validity)) && i.$parsers.push(function(e) {
            var r = t.prop("validity") || {};
            return r.badInput && !r.typeMismatch
                ? n
                : e
        })
    }
    function Nr(e, t, n, r, i) {
        if (y(r)) {
            if (e = e(r), !e.constant)
                throw ca("constexpr", n, r);
            return e(t)
        }
        return i
    }
    function Rr(e, t) {
        return e = "ngClass" + e,
        [
            "$animate",
            function(n) {
                function r(e, t) {
                    var n = [],
                        r = 0;
                    e : for (; r < e.length; r++) {
                        for (var i = e[r], o = 0; o < t.length; o++)
                            if (i == t[o])
                                continue e;
                    n.push(i)
                    }
                    return n
                }
                function i(e) {
                    var t = [];
                    return ni(e)
                        ? (o(e, function(e) {
                            t = t.concat(i(e))
                        }), t)
                        : x(e)
                            ? e.split(" ")
                            : b(e)
                                ? (o(e, function(e, n) {
                                    e && (t = t.concat(n.split(" ")))
                                }), t)
                                : e
                }
                return {
                    restrict: "AC",
                    link: function(a, s, u) {
                        function l(e, t) {
                            var n = s.data("$classCounts") || lt(),
                                r = [];
                            return o(e, function(e) {
                                (t > 0 || n[e]) && (n[e] = (n[e] || 0) + t, n[e] ===+ (t > 0) && r.push(e))
                            }),
                            s.data("$classCounts", n),
                            r.join(" ")
                        }
                        function c(e) {
                            if (!0 === t || a.$index % 2 === t) {
                                var o = i(e || []);
                                if (f) {
                                    if (!I(e, f)) {
                                        var c = i(f),
                                            p = r(o, c),
                                            o = r(c, o),
                                            p = l(p, 1),
                                            o = l(o, -1);
                                        p && p.length && n.addClass(s, p),
                                        o && o.length && n.removeClass(s, o)
                                    }
                                } else {
                                    var p = l(o, 1);
                                    u.$addClass(p)
                                }
                            }
                            f = R(e)
                        }
                        var f;
                        a.$watch(u[e], c, !0),
                        u.$observe("class", function() {
                            c(a.$eval(u[e]))
                        }),
                        "ngClass" !== e && a.$watch("$index", function(n, r) {
                            var o = 1 & n;
                            if (o !== (1 & r)) {
                                var s = i(a.$eval(u[e]));
                                o === t
                                    ? (o = l(s, 1), u.$addClass(o))
                                    : (o = l(s, -1), u.$removeClass(o))
                            }
                        })
                    }
                }
            }
        ]
    }
    function Ir(e) {
        function t(e, t) {
            t && !a[e]
                ? (l.addClass(o, e), a[e] = !0)
                : !t && a[e] && (l.removeClass(o, e), a[e] = !1)
        }
        function r(e, n) {
            e = e
                ? "-" + nt(e, "-")
                : "",
            t(oa + e, !0 === n),
            t(aa + e, !1 === n)
        }
        var i = e.ctrl,
            o = e.$element,
            a = {},
            s = e.set,
            u = e.unset,
            l = e.$animate;
        a[aa] = !(a[oa] = o.hasClass(oa)),
        i.$setValidity = function(e, o, a) {
            g(o)
                ? (i.$pending || (i.$pending = {}), s(i.$pending, e, a))
                : (i.$pending && u(i.$pending, e, a), Fr(i.$pending) && (i.$pending = n)),
            T(o)
                ? o
                    ? (u(i.$error, e, a), s(i.$$success, e, a))
                    : (s(i.$error, e, a), u(i.$$success, e, a))
                : (u(i.$error, e, a), u(i.$$success, e, a)),
            i.$pending
                ? (t(la, !0), i.$valid = i.$invalid = n, r("", null))
                : (t(la, !1), i.$valid = Fr(i.$error), i.$invalid = !i.$valid, r("", i.$valid)),
            o = i.$pending && i.$pending[e]
                ? n
                : i.$error[e]
                    ? !1
                    : i.$$success[e]
                        ? !0
                        : null,
            r(e, o),
            i.$$parentForm.$setValidity(e, o, i)
        }
    }
    function Fr(e) {
        if (e)
            for (var t in e)
                if (e.hasOwnProperty(t))
                    return !1;
    return !0
    }
    var qr,
        _r,
        Ur,
        Br,
        Lr = /^\/(.+)\/([a-z]*)$/,
        Hr = function(e) {
            return x(e)
                ? e.toLowerCase()
                : e
        },
        zr = Object.prototype.hasOwnProperty,
        Gr = function(e) {
            return x(e)
                ? e.toUpperCase()
                : e
        },
        Wr = [].slice,
        Xr = [].splice,
        Jr = [].push,
        Kr = Object.prototype.toString,
        Qr = Object.getPrototypeOf,
        Yr = r("ng"),
        Zr = e.angular || (e.angular = {}),
        ei = 0;
    qr = t.documentMode,
    d.$inject = [],
    $.$inject = [];
    var ti,
        ni = Array.isArray,
        ri = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/,
        ii = function(e) {
            return x(e)
                ? e.trim()
                : e
        },
        oi = function(e) {
            return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
        },
        ai = function() {
            if (!y(ai.rules)) {
                var e = t.querySelector("[ng-csp]") || t.querySelector("[data-ng-csp]");
                if (e) {
                    var n = e.getAttribute("ng-csp") || e.getAttribute("data-ng-csp");
                    ai.rules = {
                        noUnsafeEval: !n || -1 !== n.indexOf("no-unsafe-eval"),
                        noInlineStyle: !n || -1 !== n.indexOf("no-inline-style")
                    }
                } else {
                    e = ai;
                    try {
                        new Function(""),
                        n = !1
                    } catch (r) {
                        n = !0
                    }
                    e.rules = {
                        noUnsafeEval: n,
                        noInlineStyle: !1
                    }
                }
            }
            return ai.rules
        },
        si = function() {
            if (y(si.name_))
                return si.name_;
            var e,
                n,
                r,
                i,
                o = ui.length;
            for (n = 0; o > n; ++n)
                if (r = ui[n], e = t.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
                    i = e.getAttribute(r + "jq");
                    break
                }
            return si.name_ = i
        },
        ui = [
            "ng-", "data-ng-", "ng:", "x-ng-"
        ],
        li = /[A-Z]/g,
        ci = !1,
        fi = 3,
        pi = {
            full: "1.4.8",
            major: 1,
            minor: 4,
            dot: 8,
            codeName: "ice-manipulation"
        };
    $t.expando = "ng339";
    var hi = $t.cache = {},
        di = 1;
    $t._data = function(e) {
        return this.cache[e[this.expando]] || {}
    };
    var $i = /([\:\-\_]+(.))/g,
        mi = /^moz([A-Z])/,
        vi = {
            mouseleave: "mouseout",
            mouseenter: "mouseover"
        },
        gi = r("jqLite"),
        yi = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        bi = /<|&#?\w+;/,
        wi = /<([\w:-]+)/,
        xi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        Si = {
            option: [
                1, '<select multiple="multiple">', "</select>"
            ],
            thead: [
                1, "<table>", "</table>"
            ],
            col: [
                2, "<table><colgroup>", "</colgroup></table>"
            ],
            tr: [
                2, "<table><tbody>", "</tbody></table>"
            ],
            td: [
                3, "<table><tbody><tr>", "</tr></tbody></table>"
            ],
            _default: [0, "", ""]
        };
    Si.optgroup = Si.option,
    Si.tbody = Si.tfoot = Si.colgroup = Si.caption = Si.thead,
    Si.th = Si.td;
    var Ci = Node.prototype.contains || function(e) {
            return !!(16 & this.compareDocumentPosition(e))
        },
        Ei = $t.prototype = {
            ready: function(n) {
                function r() {
                    i || (i = !0, n())
                }
                var i = !1;
                "complete" === t.readyState
                    ? setTimeout(r)
                    : (this.on("DOMContentLoaded", r), $t(e).on("load", r))
            },
            toString: function() {
                var e = [];
                return o(this, function(t) {
                    e.push("" + t)
                }),
                "[" + e.join(", ") + "]"
            },
            eq: function(e) {
                return e >= 0
                    ? _r(this[e])
                    : _r(this[this.length + e])
            },
            length: 0,
            push: Jr,
            sort: [].sort,
            splice: [].splice
        },
        Ai = {};
    o("multiple selected checked disabled readOnly required open".split(" "), function(e) {
        Ai[Hr(e)] = e
    });
    var ki = {};
    o("input select option textarea button form details".split(" "), function(e) {
        ki[e] = !0
    });
    var Oi = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    o({
        data: wt,
        removeData: yt,
        hasData: function(e) {
            for (var t in hi[e.ng339])
                return !0;
            return !1
        }
    }, function(e, t) {
        $t[t] = e
    }),
    o({
        data: wt,
        inheritedData: kt,
        scope: function(e) {
            return _r.data(e, "$scope") || kt(e.parentNode || e, ["$isolateScope", "$scope"])
        },
        isolateScope: function(e) {
            return _r.data(e, "$isolateScope") || _r.data(e, "$isolateScopeNoTemplate")
        },
        controller: At,
        injector: function(e) {
            return kt(e, "$injector")
        },
        removeAttr: function(e, t) {
            e.removeAttribute(t)
        },
        hasClass: xt,
        css: function(e, t, n) {
            return t = pt(t),
            y(n)
                ? (e.style[t] = n, void 0)
                : e.style[t]
        },
        attr: function(e, t, r) {
            var i = e.nodeType;
            if (i !== fi && 2 !== i && 8 !== i)
                if (i = Hr(t), Ai[i]) {
                    if (!y(r))
                        return e[t] || (e.attributes.getNamedItem(t) || d).specified
                            ? i
                            : n;
                    r
                        ? (e[t] = !0, e.setAttribute(t, i))
                        : (e[t] = !1, e.removeAttribute(i))
                }
            else if (y(r))
                e.setAttribute(t, r);
            else if (e.getAttribute)
                return e = e.getAttribute(t, 2),
                null === e
                    ? n
                    : e
            },
        prop: function(e, t, n) {
            return y(n)
                ? (e[t] = n, void 0)
                : e[t]
        },
        text: function() {
            function e(e, t) {
                if (g(t)) {
                    var n = e.nodeType;
                    return 1 === n || n === fi
                        ? e.textContent
                        : ""
                }
                e.textContent = t
            }
            return e.$dv = "",
            e
        }(),
        val: function(e, t) {
            if (g(t)) {
                if (e.multiple && "select" === D(e)) {
                    var n = [];
                    return o(e.options, function(e) {
                        e.selected && n.push(e.value || e.text)
                    }),
                    0 === n.length
                        ? null
                        : n
                }
                return e.value
            }
            e.value = t
        },
        html: function(e, t) {
            return g(t)
                ? e.innerHTML
                : (vt(e, !0), e.innerHTML = t, void 0)
        },
        empty: Ot
    }, function(e, t) {
        $t.prototype[t] = function(t, n) {
            var r,
                i,
                o = this.length;
            if (e !== Ot && g(2 == e.length && e !== xt && e !== At
                ? t
                : n)) {
                if (b(t)) {
                    for (r = 0; o > r; r++)
                        if (e === wt)
                            e(this[r], t);
                        else
                            for (i in t)
                                e(this[r], i, t[i]);
                return this
                }
                for (r = e.$dv, o = g(r)
                    ? Math.min(o, 1)
                    : o, i = 0; o > i; i++) {
                    var a = e(this[i], t, n);
                    r = r
                        ? r + a
                        : a
                }
                return r
            }
            for (r = 0; o > r; r++)
                e(this[r], t, n);
            return this
        }
    }),
    o({
        removeData: yt,
        on: function(e, t, r, i) {
            if (y(i))
                throw gi("onargs");
            if (ht(e)) {
                i = bt(e, !0);
                var o = i.events,
                    a = i.handle;
                a || (a = i.handle = Mt(e, o)),
                i = 0 <= t.indexOf(" ")
                    ? t.split(" ")
                    : [t];
                for (var s = i.length, u = function(t, n, i) {
                    var s = o[t];
                    s || (s = o[t] = [], s.specialHandlerWrapper = n, "$destroy" === t || i || e.addEventListener(t, a, !1)),
                    s.push(r)
                }; s--;)
                    t = i[s],
                    vi[t]
                        ? (u(vi[t], jt), u(t, n, !0))
                        : u(t)
                }
        },
        off: gt,
        one: function(e, t, n) {
            e = _r(e),
            e.on(t, function r() {
                e.off(t, n),
                e.off(t, r)
            }),
            e.on(t, n)
        },
        replaceWith: function(e, t) {
            var n,
                r = e.parentNode;
            vt(e),
            o(new $t(t), function(t) {
                n
                    ? r.insertBefore(t, n.nextSibling)
                    : r.replaceChild(t, e),
                n = t
            })
        },
        children: function(e) {
            var t = [];
            return o(e.childNodes, function(e) {
                1 === e.nodeType && t.push(e)
            }),
            t
        },
        contents: function(e) {
            return e.contentDocument || e.childNodes || []
        },
        append: function(e, t) {
            var n = e.nodeType;
            if (1 === n || 11 === n) {
                t = new $t(t);
                for (var n = 0, r = t.length; r > n; n++)
                    e.appendChild(t[n])
            }
        },
        prepend: function(e, t) {
            if (1 === e.nodeType) {
                var n = e.firstChild;
                o(new $t(t), function(t) {
                    e.insertBefore(t, n)
                })
            }
        },
        wrap: function(e, t) {
            t = _r(t).eq(0).clone()[0];
            var n = e.parentNode;
            n && n.replaceChild(t, e),
            t.appendChild(e)
        },
        remove: Tt,
        detach: function(e) {
            Tt(e, !0)
        },
        after: function(e, t) {
            var n = e,
                r = e.parentNode;
            t = new $t(t);
            for (var i = 0, o = t.length; o > i; i++) {
                var a = t[i];
                r.insertBefore(a, n.nextSibling),
                n = a
            }
        },
        addClass: Ct,
        removeClass: St,
        toggleClass: function(e, t, n) {
            t && o(t.split(" "), function(t) {
                var r = n;
                g(r) && (r = !xt(e, t)),
                (r
                    ? Ct
                    : St)(e, t)
            })
        },
        parent: function(e) {
            return (e = e.parentNode) && 11 !== e.nodeType
                ? e
                : null
        },
        next: function(e) {
            return e.nextElementSibling
        },
        find: function(e, t) {
            return e.getElementsByTagName
                ? e.getElementsByTagName(t)
                : []
        },
        clone: mt,
        triggerHandler: function(e, t, n) {
            var r,
                i,
                a = t.type || t,
                s = bt(e);
            (s = (s = s && s.events) && s[a]) && (r = {
                preventDefault: function() {
                    this.defaultPrevented = !0
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0
                },
                isImmediatePropagationStopped: function() {
                    return !0 === this.immediatePropagationStopped
                },
                stopPropagation: d,
                type: a,
                target: e
            }, t.type && (r = c(r, t)), t = R(s), i = n
                ? [r].concat(n)
                : [r], o(t, function(t) {
                r.isImmediatePropagationStopped() || t.apply(e, i)
            }))
        }
    }, function(e, t) {
        $t.prototype[t] = function(t, n, r) {
            for (var i, o = 0, a = this.length; a > o; o++)
                g(i)
                    ? (i = e(this[o], t, n, r), y(i) && (i = _r(i)))
                    : Et(i, e(this[o], t, n, r));
            return y(i)
                ? i
                : this
        },
        $t.prototype.bind = $t.prototype.on,
        $t.prototype.unbind = $t.prototype.off
    }),
    It.prototype = {
        put: function(e, t) {
            this[Rt(e, this.nextUid)] = t
        },
        get: function(e) {
            return this[Rt(e, this.nextUid)]
        },
        remove: function(e) {
            var t = this[e = Rt(e, this.nextUid)];
            return delete this[e],
            t
        }
    };
    var Ti = [function() {
                this.$get = [function() {
                        return It
                    }
                ]
            }
        ],
        Pi = /^[^\(]*\(\s*([^\)]*)\)/m,
        Vi = /,/,
        Mi = /^\s*(_?)(\S+?)\1\s*$/,
        Di = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        ji = r("$injector");
    qt.$$annotate = function(e, t, n) {
        var r;
        if ("function" == typeof e) {
            if (!(r = e.$inject)) {
                if (r = [], e.length) {
                    if (t)
                        throw x(n) && n || (n = e.name || Ft(e)),
                        ji("strictdi", n);
                    t = e.toString().replace(Di, ""),
                    t = t.match(Pi),
                    o(t[1].split(Vi), function(e) {
                        e.replace(Mi, function(e, t, n) {
                            r.push(n)
                        })
                    })
                }
                e.$inject = r
            }
        } else
            ni(e)
                ? (t = e.length - 1, ot(e[t], "fn"), r = e.slice(0, t))
                : ot(e, "fn", !0);
        return r
    };
    var Ni = r("$animate"),
        Ri = function() {
            this.$get = [
                "$q",
                "$$rAF",
                function(e, t) {
                    function n() {}
                    return n.all = d,
                    n.chain = d,
                    n.prototype = {
                        end: d,
                        cancel: d,
                        resume: d,
                        pause: d,
                        complete: d,
                        then: function(n, r) {
                            return e(function(e) {
                                t(function() {
                                    e()
                                })
                            }).then(n, r)
                        }
                    },
                    n
                }
            ]
        },
        Ii = function() {
            var e = new It,
                t = [];
            this.$get = [
                "$$AnimateRunner",
                "$rootScope",
                function(n, r) {
                    function i(e, t, n) {
                        var r = !1;
                        return t && (t = x(t)
                            ? t.split(" ")
                            : ni(t)
                                ? t
                                : [], o(t, function(t) {
                            t && (r = !0, e[t] = n)
                        })),
                        r
                    }
                    function a() {
                        o(t, function(t) {
                            var n = e.get(t);
                            if (n) {
                                var r = Bt(t.attr("class")),
                                    i = "",
                                    a = "";
                                o(n, function(e, t) {
                                    e !== !!r[t] && (e
                                        ? i += (i.length
                                            ? " "
                                            : "") + t
                                        : a += (a.length
                                            ? " "
                                            : "") + t)
                                }),
                                o(t, function(e) {
                                    i && Ct(e, i),
                                    a && St(e, a)
                                }),
                                e.remove(t)
                            }
                        }),
                        t.length = 0
                    }
                    return {
                        enabled: d,
                        on: d,
                        off: d,
                        pin: d,
                        push: function(o, s, u, l) {
                            return l && l(),
                            u = u || {},
                            u.from && o.css(u.from),
                            u.to && o.css(u.to),
                            (u.addClass || u.removeClass) && (s = u.addClass, l = u.removeClass, u = e.get(o) || {}, s = i(u, s, !0), l = i(u, l, !1), (s || l) && (e.put(o, u), t.push(o), 1 === t.length && r.$$postDigest(a))),
                            new n
                        }
                    }
                }
            ]
        },
        Fi = [
            "$provide",
            function(e) {
                var t = this;
                this.$$registeredAnimations = Object.create(null),
                this.register = function(n, r) {
                    if (n && "." !== n.charAt(0))
                        throw Ni("notcsel", n);
                    var i = n + "-animation";
                    t.$$registeredAnimations[n.substr(1)] = i,
                    e.factory(i, r)
                },
                this.classNameFilter = function(e) {
                    if (1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp
                        ? e
                        : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))
                        throw Ni("nongcls", "ng-animate");
                    return this.$$classNameFilter
                },
                this.$get = [
                    "$$animateQueue",
                    function(e) {
                        function t(e, t, n) {
                            if (n) {
                                var r;
                                e : {
                                    for(r = 0; r < n.length; r++) {
                                        var i = n[r];
                                        if (1 === i.nodeType) {
                                            r = i;
                                            break e
                                        }
                                    }
                                    r = void 0
                                }
                                !r || r.parentNode || r.previousElementSibling || (n = null)
                            }
                            n
                                ? n.after(e)
                                : t.prepend(e)
                        }
                        return {
                            on: e.on,
                            off: e.off,
                            pin: e.pin,
                            enabled: e.enabled,
                            cancel: function(e) {
                                e.end && e.end()
                            },
                            enter: function(n, r, i, o) {
                                return r = r && _r(r),
                                i = i && _r(i),
                                r = r || i.parent(),
                                t(n, r, i),
                                e.push(n, "enter", Lt(o))
                            },
                            move: function(n, r, i, o) {
                                return r = r && _r(r),
                                i = i && _r(i),
                                r = r || i.parent(),
                                t(n, r, i),
                                e.push(n, "move", Lt(o))
                            },
                            leave: function(t, n) {
                                return e.push(t, "leave", Lt(n), function() {
                                    t.remove()
                                })
                            },
                            addClass: function(t, n, r) {
                                return r = Lt(r),
                                r.addClass = Ut(r.addclass, n),
                                e.push(t, "addClass", r)
                            },
                            removeClass: function(t, n, r) {
                                return r = Lt(r),
                                r.removeClass = Ut(r.removeClass, n),
                                e.push(t, "removeClass", r)
                            },
                            setClass: function(t, n, r, i) {
                                return i = Lt(i),
                                i.addClass = Ut(i.addClass, n),
                                i.removeClass = Ut(i.removeClass, r),
                                e.push(t, "setClass", i)
                            },
                            animate: function(t, n, r, i, o) {
                                return o = Lt(o),
                                o.from = o.from
                                    ? c(o.from, n)
                                    : n,
                                o.to = o.to
                                    ? c(o.to, r)
                                    : r,
                                o.tempClasses = Ut(o.tempClasses, i || "ng-inline-animate"),
                                e.push(t, "animate", o)
                            }
                        }
                    }
                ]
            }
        ],
        qi = function() {
            this.$get = [
                "$$rAF",
                "$q",
                function(e, t) {
                    var n = function() {};
                    return n.prototype = {
                        done: function(e) {
                            this.defer && this.defer[!0 === e
                                    ? "reject"
                                    : "resolve"]()
                        },
                        end: function() {
                            this.done()
                        },
                        cancel: function() {
                            this.done(!0)
                        },
                        getPromise: function() {
                            return this.defer || (this.defer = t.defer()),
                            this.defer.promise
                        },
                        then: function(e, t) {
                            return this.getPromise().then(e, t)
                        },
                        "catch": function(e) {
                            return this.getPromise()["catch"](e)
                        },
                        "finally": function(e) {
                            return this.getPromise()["finally"](e)
                        }
                    },
                    function(t, r) {
                        function i() {
                            return e(function() {
                                r.addClass && (t.addClass(r.addClass), r.addClass = null),
                                r.removeClass && (t.removeClass(r.removeClass), r.removeClass = null),
                                r.to && (t.css(r.to), r.to = null),
                                o || a.done(),
                                o = !0
                            }),
                            a
                        }
                        r.cleanupStyles && (r.from = r.to = null),
                        r.from && (t.css(r.from), r.from = null);
                        var o,
                            a = new n;
                        return {start: i, end: i}
                    }
                }
            ]
        },
        _i = r("$compile");
    Xt.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Ui = /^((?:x|data)[\:\-_])/i,
        Bi = r("$controller"),
        Li = /^(\S+)(\s+as\s+(\w+))?$/,
        Hi = function() {
            this.$get = [
                "$document",
                function(e) {
                    return function(t) {
                        return t
                            ? !t.nodeType && t instanceof _r && (t = t[0])
                            : t = e[0].body,
                        t.offsetWidth + 1
                    }
                }
            ]
        },
        zi = "application/json",
        Gi = {
            "Content-Type": zi + ";charset=utf-8"
        },
        Wi = /^\[|^\{(?!\{)/,
        Xi = {
            "[": /]$/,
            "{": /}$/
        },
        Ji = /^\)\]\}',?\n/,
        Ki = r("$http"),
        Qi = function(e) {
            return function() {
                throw Ki("legacy", e)
            }
        },
        Yi = Zr.$interpolateMinErr = r("$interpolate");
    Yi.throwNoconcat = function(e) {
        throw Yi("noconcat", e)
    },
    Yi.interr = function(e, t) {
        return Yi("interr", e, t.toString())
    };
    var Zi = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        eo = {
            http: 80,
            https: 443,
            ftp: 21
        },
        to = r("$location"),
        no = {
            $$html5: !1,
            $$replace: !1,
            absUrl: Cn("$$absUrl"),
            url: function(e) {
                if (g(e))
                    return this.$$url;
                var t = Zi.exec(e);
                return (t[1] || "" === e) && this.path(decodeURIComponent(t[1])),
                (t[2] || t[1] || "" === e) && this.search(t[3] || ""),
                this.hash(t[5] || ""),
                this
            },
            protocol: Cn("$$protocol"),
            host: Cn("$$host"),
            port: Cn("$$port"),
            path: En("$$path", function(e) {
                return e = null !== e
                    ? e.toString()
                    : "",
                "/" == e.charAt(0)
                    ? e
                    : "/" + e
            }),
            search: function(e, t) {
                switch (arguments.length) {
                    case 0:
                        return this.$$search;
                    case 1:
                        if (x(e) || S(e))
                            e = e.toString(),
                            this.$$search = W(e);
                        else {
                            if (!b(e))
                                throw to("isrcharg");
                            e = N(e, {}),
                            o(e, function(t, n) {
                                null == t && delete e[n]
                            }),
                            this.$$search = e
                        }
                        break;
                    default:
                        g(t) || null === t
                            ? delete this.$$search[e]
                            : this.$$search[e] = t
                }
                return this.$$compose(),
                this
            },
            hash: En("$$hash", function(e) {
                return null !== e
                    ? e.toString()
                    : ""
            }),
            replace: function() {
                return this.$$replace = !0,
                this
            }
        };
    o([
        Sn, xn, wn
    ], function(e) {
        e.prototype = Object.create(no),
        e.prototype.state = function(t) {
            if (!arguments.length)
                return this.$$state;
            if (e !== wn || !this.$$html5)
                throw to("nostate");
            return this.$$state = g(t)
                ? null
                : t,
            this
        }
    });
    var ro = r("$parse"),
        io = Function.prototype.call,
        oo = Function.prototype.apply,
        ao = Function.prototype.bind,
        so = lt();
    o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(e) {
        so[e] = !0
    });
    var uo = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        lo = function(e) {
            this.options = e
        };
    lo.prototype = {
        constructor: lo,
        lex: function(e) {
            for (this.text = e, this.index = 0, this.tokens = []; this.index < this.text.length;)
                if (e = this.text.charAt(this.index), '"' === e || "'" === e)
                    this.readString(e);
                else if (this.isNumber(e) || "." === e && this.isNumber(this.peek()))
                    this.readNumber();
                else if (this.isIdent(e))
                    this.readIdent();
                else if (this.is(e, "(){}[].,;:?"))
                    this.tokens.push({index: this.index, text: e}),
                    this.index++;
                else if (this.isWhitespace(e))
                    this.index++;
                else {
                    var t = e + this.peek(),
                        n = t + this.peek(2),
                        r = so[t],
                        i = so[n];
                    so[e] || r || i
                        ? (e = i
                            ? n
                            : r
                                ? t
                                : e, this.tokens.push({
                            index: this.index,
                            text: e,
                            operator: !0
                        }), this.index += e.length)
                        : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
            return this.tokens
        },
        is: function(e, t) {
            return -1 !== t.indexOf(e)
        },
        peek: function(e) {
            return e = e || 1,
            this.index + e < this.text.length
                ? this.text.charAt(this.index + e)
                : !1
        },
        isNumber: function(e) {
            return e >= "0" && "9" >= e && "string" == typeof e
        },
        isWhitespace: function(e) {
            return " " === e || "\r" === e || "	" === e || "\n" === e || "" === e || "Â " === e
        },
        isIdent: function(e) {
            return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
        },
        isExpOperator: function(e) {
            return "-" === e || "+" === e || this.isNumber(e)
        },
        throwError: function(e, t, n) {
            throw n = n || this.index,
            t = y(t)
                ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]"
                : " " + n,
            ro("lexerr", e, t, this.text)
        },
        readNumber: function() {
            for (var e = "", t = this.index; this.index < this.text.length;) {
                var n = Hr(this.text.charAt(this.index));
                if ("." == n || this.isNumber(n))
                    e += n;
                else {
                    var r = this.peek();
                    if ("e" == n && this.isExpOperator(r))
                        e += n;
                    else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1))
                        e += n;
                    else {
                        if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1))
                            break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            this.tokens.push({
                index: t,
                text: e,
                constant: !0,
                value: Number(e)
            })
        },
        readIdent: function() {
            for (var e = this.index; this.index < this.text.length;) {
                var t = this.text.charAt(this.index);
                if (!this.isIdent(t) && !this.isNumber(t))
                    break;
                this.index++
            }
            this.tokens.push({
                index: e,
                text: this.text.slice(e, this.index),
                identifier: !0
            })
        },
        readString: function(e) {
            var t = this.index;
            this.index++;
            for (var n = "", r = e, i = !1; this.index < this.text.length;) {
                var o = this.text.charAt(this.index),
                    r = r + o;
                if (i)
                    "u" === o
                        ? (i = this.text.substring(this.index + 1, this.index + 5), i.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + i + "]"), this.index += 4, n += String.fromCharCode(parseInt(i, 16)))
                        : n += uo[o] || o,
                    i = !1;
                else if ("\\" === o)
                    i = !0;
                else {
                    if (o === e)
                        return this.index++,
                        this.tokens.push({
                            index: t,
                            text: r,
                            constant: !0,
                            value: n
                        }),
                        void 0;
                    n += o
                }
                this.index++
            }
            this.throwError("Unterminated quote", t)
        }
    };
    var co = function(e, t) {
        this.lexer = e,
        this.options = t
    };
    co.Program = "Program",
    co.ExpressionStatement = "ExpressionStatement",
    co.AssignmentExpression = "AssignmentExpression",
    co.ConditionalExpression = "ConditionalExpression",
    co.LogicalExpression = "LogicalExpression",
    co.BinaryExpression = "BinaryExpression",
    co.UnaryExpression = "UnaryExpression",
    co.CallExpression = "CallExpression",
    co.MemberExpression = "MemberExpression",
    co.Identifier = "Identifier",
    co.Literal = "Literal",
    co.ArrayExpression = "ArrayExpression",
    co.Property = "Property",
    co.ObjectExpression = "ObjectExpression",
    co.ThisExpression = "ThisExpression",
    co.NGValueParameter = "NGValueParameter",
    co.prototype = {
        ast: function(e) {
            return this.text = e,
            this.tokens = this.lexer.lex(e),
            e = this.program(),
            0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]),
            e
        },
        program: function() {
            for (var e = [];;)
                if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && e.push(this.expressionStatement()), !this.expect(";"))
                    return {type: co.Program, body: e}
                },
        expressionStatement: function() {
            return {type: co.ExpressionStatement, expression: this.filterChain()}
        },
        filterChain: function() {
            for (var e = this.expression(); this.expect("|");)
                e = this.filter(e);
            return e
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var e = this.ternary();
            return this.expect("=") && (e = {
                type: co.AssignmentExpression,
                left: e,
                right: this.assignment(),
                operator: "="
            }),
            e
        },
        ternary: function() {
            var e,
                t,
                n = this.logicalOR();
            return this.expect("?") && (e = this.expression(), this.consume(":"))
                ? (t = this.expression(), {
                    type: co.ConditionalExpression,
                    test: n,
                    alternate: e,
                    consequent: t
                })
                : n
        },
        logicalOR: function() {
            for (var e = this.logicalAND(); this.expect("||");)
                e = {
                    type: co.LogicalExpression,
                    operator: "||",
                    left: e,
                    right: this.logicalAND()
                };
            return e
        },
        logicalAND: function() {
            for (var e = this.equality(); this.expect("&&");)
                e = {
                    type: co.LogicalExpression,
                    operator: "&&",
                    left: e,
                    right: this.equality()
                };
            return e
        },
        equality: function() {
            for (var e, t = this.relational(); e = this.expect("==", "!=", "===", "!==");)
                t = {
                    type: co.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.relational()
                };
            return t
        },
        relational: function() {
            for (var e, t = this.additive(); e = this.expect("<", ">", "<=", ">=");)
                t = {
                    type: co.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.additive()
                };
            return t
        },
        additive: function() {
            for (var e, t = this.multiplicative(); e = this.expect("+", "-");)
                t = {
                    type: co.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.multiplicative()
                };
            return t
        },
        multiplicative: function() {
            for (var e, t = this.unary(); e = this.expect("*", "/", "%");)
                t = {
                    type: co.BinaryExpression,
                    operator: e.text,
                    left: t,
                    right: this.unary()
                };
            return t
        },
        unary: function() {
            var e;
            return (e = this.expect("+", "-", "!"))
                ? {
                    type: co.UnaryExpression,
                    operator: e.text,
                    prefix: !0,
                    argument: this.unary()
                }
                : this.primary()
        },
        primary: function() {
            var e;
            this.expect("(")
                ? (e = this.filterChain(), this.consume(")"))
                : this.expect("[")
                    ? e = this.arrayDeclaration()
                    : this.expect("{")
                        ? e = this.object()
                        : this.constants.hasOwnProperty(this.peek().text)
                            ? e = N(this.constants[this.consume().text])
                            : this.peek().identifier
                                ? e = this.identifier()
                                : this.peek().constant
                                    ? e = this.constant()
                                    : this.throwError("not a primary expression", this.peek());
            for (var t; t = this.expect("(", "[", ".");)
                "(" === t.text
                    ? (e = {
                        type: co.CallExpression,
                        callee: e,
                        arguments: this.parseArguments()
                    }, this.consume(")"))
                    : "[" === t.text
                        ? (e = {
                            type: co.MemberExpression,
                            object: e,
                            property: this.expression(),
                            computed: !0
                        }, this.consume("]"))
                        : "." === t.text
                            ? e = {
                                type: co.MemberExpression,
                                object: e,
                                property: this.identifier(),
                                computed: !1
                            }
            : this.throwError("IMPOSSIBLE");
            return e
        },
        filter: function(e) {
            e = [e];
            for (var t = {
                type: co.CallExpression,
                callee: this.identifier(),
                arguments: e,
                filter: !0
            }; this.expect(":");)
                e.push(this.expression());
            return t
        },
        parseArguments: function() {
            var e = [];
            if (")" !== this.peekToken().text)
                do
                    e.push(this.expression());
        while (this.expect(","))
            ;
            return e
        },
        identifier: function() {
            var e = this.consume();
            return e.identifier || this.throwError("is not a valid identifier", e), {
                type: co.Identifier,
                name: e.text
            }
        },
        constant: function() {
            return {type: co.Literal, value: this.consume().value}
        },
        arrayDeclaration: function() {
            var e = [];
            if ("]" !== this.peekToken().text)
                do
                    {
                        if(this.peek("]"))
                            break;
                e.push(this.expression())
                }
            while (this.expect(","))
            ;
            return this.consume("]"), {
                type: co.ArrayExpression,
                elements: e
            }
        },
        object: function() {
            var e,
                t = [];
            if ("}" !== this.peekToken().text)
                do
                    {
                        if(this.peek("}"))
                            break;
                e = {
                        type: co.Property,
                        kind: "init"
                    },
                    this.peek().constant
                        ? e.key = this.constant()
                        : this.peek().identifier
                            ? e.key = this.identifier()
                            : this.throwError("invalid key", this.peek()),
                    this.consume(":"),
                    e.value = this.expression(),
                    t.push(e)
                }
            while (this.expect(","))
            ;
            return this.consume("}"), {
                type: co.ObjectExpression,
                properties: t
            }
        },
        throwError: function(e, t) {
            throw ro("syntax", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
        },
        consume: function(e) {
            if (0 === this.tokens.length)
                throw ro("ueoe", this.text);
            var t = this.expect(e);
            return t || this.throwError("is unexpected, expecting [" + e + "]", this.peek()),
            t
        },
        peekToken: function() {
            if (0 === this.tokens.length)
                throw ro("ueoe", this.text);
            return this.tokens[0]
        },
        peek: function(e, t, n, r) {
            return this.peekAhead(0, e, t, n, r)
        },
        peekAhead: function(e, t, n, r, i) {
            if (this.tokens.length > e) {
                e = this.tokens[e];
                var o = e.text;
                if (o === t || o === n || o === r || o === i || !(t || n || r || i))
                    return e
            }
            return !1
        },
        expect: function(e, t, n, r) {
            return (e = this.peek(e, t, n, r))
                ? (this.tokens.shift(), e)
                : !1
        },
        constants: {
            "true": {
                type: co.Literal,
                value: !0
            },
            "false": {
                type: co.Literal,
                value: !1
            },
            "null": {
                type: co.Literal,
                value: null
            },
            undefined: {
                type: co.Literal,
                value: n
            },
            "this": {
                type: co.ThisExpression
            }
        }
    },
    _n.prototype = {
        compile: function(e, t) {
            var r = this,
                i = this.astBuilder.ast(e);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: t,
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            },
            Nn(i, r.$filter);
            var a,
                s = "";
            return this.stage = "assign",
            (a = Fn(i)) && (this.state.computing = "assign", s = this.nextId(), this.recurse(a, s), this.return_(s), s = "fn.assign=" + this.generateFunction("assign", "s,v,l")),
            a = Rn(i.body),
            r.stage = "inputs",
            o(a, function(e, t) {
                var n = "fn" + t;
                r.state[n] = {
                    vars: [],
                    body: [],
                    own: {}
                },
                r.state.computing = n;
                var i = r.nextId();
                r.recurse(e, i),
                r.return_(i),
                r.state.inputs.push(n),
                e.watchId = t
            }),
            this.state.computing = "fn",
            this.stage = "main",
            this.recurse(i),
            s = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + s + this.watchFns() + "return fn;",
            s = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", s)(this.$filter, On, Pn, Vn, Tn, Mn, Dn, jn, e),
            this.state = this.stage = n,
            s.literal = qn(i),
            s.constant = i.constant,
            s
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var e = [],
                t = this.state.inputs,
                n = this;
            return o(t, function(t) {
                e.push("var " + t + "=" + n.generateFunction(t, "s"))
            }),
            t.length && e.push("fn.inputs=[" + t.join(",") + "];"),
            e.join("")
        },
        generateFunction: function(e, t) {
            return "function(" + t + "){" + this.varsPrefix(e) + this.body(e) + "};"
        },
        filterPrefix: function() {
            var e = [],
                t = this;
            return o(this.state.filters, function(n, r) {
                e.push(n + "=$filter(" + t.escape(r) + ")")
            }),
            e.length
                ? "var " + e.join(",") + ";"
                : ""
        },
        varsPrefix: function(e) {
            return this.state[e].vars.length
                ? "var " + this.state[e].vars.join(",") + ";"
                : ""
        },
        body: function(e) {
            return this.state[e].body.join("")
        },
        recurse: function(e, t, r, i, a, s) {
            var u,
                l,
                c,
                f,
                p = this;
            if (i = i || d, !s && y(e.watchId))
                t = t || this.nextId(),
                this.if_("i", this.lazyAssign(t, this.computedMember("i", e.watchId)), this.lazyRecurse(e, t, r, i, a, !0));
            else
                switch (e.type) {
                    case co.Program:
                        o(e.body, function(t, r) {
                            p.recurse(t.expression, n, n, function(e) {
                                l = e
                            }),
                            r !== e.body.length - 1
                                ? p.current().body.push(l, ";")
                                : p.return_(l)
                        });
                        break;
                    case co.Literal:
                        f = this.escape(e.value),
                        this.assign(t, f),
                        i(f);
                        break;
                    case co.UnaryExpression:
                        this.recurse(e.argument, n, n, function(e) {
                            l = e
                        }),
                        f = e.operator + "(" + this.ifDefined(l, 0) + ")",
                        this.assign(t, f),
                        i(f);
                        break;
                    case co.BinaryExpression:
                        this.recurse(e.left, n, n, function(e) {
                            u = e
                        }),
                        this.recurse(e.right, n, n, function(e) {
                            l = e
                        }),
                        f = "+" === e.operator
                            ? this.plus(u, l)
                            : "-" === e.operator
                                ? this.ifDefined(u, 0) + e.operator + this.ifDefined(l, 0)
                                : "(" + u + ")" + e.operator + "(" + l + ")",
                        this.assign(t, f),
                        i(f);
                        break;
                    case co.LogicalExpression:
                        t = t || this.nextId(),
                        p.recurse(e.left, t),
                        p.if_("&&" === e.operator
                            ? t
                            : p.not(t), p.lazyRecurse(e.right, t)),
                        i(t);
                        break;
                    case co.ConditionalExpression:
                        t = t || this.nextId(),
                        p.recurse(e.test, t),
                        p.if_(t, p.lazyRecurse(e.alternate, t), p.lazyRecurse(e.consequent, t)),
                        i(t);
                        break;
                    case co.Identifier:
                        t = t || this.nextId(),
                        r && (r.context = "inputs" === p.stage
                            ? "s"
                            : this.assign(this.nextId(), this.getHasOwnProperty("l", e.name) + "?l:s"), r.computed = !1, r.name = e.name),
                        On(e.name),
                        p.if_("inputs" === p.stage || p.not(p.getHasOwnProperty("l", e.name)), function() {
                            p.if_("inputs" === p.stage || "s", function() {
                                a && 1 !== a && p.if_(p.not(p.nonComputedMember("s", e.name)), p.lazyAssign(p.nonComputedMember("s", e.name), "{}")),
                                p.assign(t, p.nonComputedMember("s", e.name))
                            })
                        }, t && p.lazyAssign(t, p.nonComputedMember("l", e.name))),
                        (p.state.expensiveChecks || Bn(e.name)) && p.addEnsureSafeObject(t),
                        i(t);
                        break;
                    case co.MemberExpression:
                        u = r && (r.context = this.nextId()) || this.nextId(),
                        t = t || this.nextId(),
                        p.recurse(e.object, u, n, function() {
                            p.if_(p.notNull(u), function() {
                                e.computed
                                    ? (l = p.nextId(), p.recurse(e.property, l), p.getStringValue(l), p.addEnsureSafeMemberName(l), a && 1 !== a && p.if_(p.not(p.computedMember(u, l)), p.lazyAssign(p.computedMember(u, l), "{}")), f = p.ensureSafeObject(p.computedMember(u, l)), p.assign(t, f), r && (r.computed = !0, r.name = l))
                                    : (On(e.property.name), a && 1 !== a && p.if_(p.not(p.nonComputedMember(u, e.property.name)), p.lazyAssign(p.nonComputedMember(u, e.property.name), "{}")), f = p.nonComputedMember(u, e.property.name), (p.state.expensiveChecks || Bn(e.property.name)) && (f = p.ensureSafeObject(f)), p.assign(t, f), r && (r.computed = !1, r.name = e.property.name))
                            }, function() {
                                p.assign(t, "undefined")
                            }),
                            i(t)
                        }, !!a);
                        break;
                    case co.CallExpression:
                        t = t || this.nextId(),
                        e.filter
                            ? (l = p.filter(e.callee.name), c = [], o(e.arguments, function(e) {
                                var t = p.nextId();
                                p.recurse(e, t),
                                c.push(t)
                            }), f = l + "(" + c.join(",") + ")", p.assign(t, f), i(t))
                            : (l = p.nextId(), u = {}, c = [], p.recurse(e.callee, l, u, function() {
                                p.if_(p.notNull(l), function() {
                                    p.addEnsureSafeFunction(l),
                                    o(e.arguments, function(e) {
                                        p.recurse(e, p.nextId(), n, function(e) {
                                            c.push(p.ensureSafeObject(e))
                                        })
                                    }),
                                    u.name
                                        ? (p.state.expensiveChecks || p.addEnsureSafeObject(u.context), f = p.member(u.context, u.name, u.computed) + "(" + c.join(",") + ")")
                                        : f = l + "(" + c.join(",") + ")",
                                    f = p.ensureSafeObject(f),
                                    p.assign(t, f)
                                }, function() {
                                    p.assign(t, "undefined")
                                }),
                                i(t)
                            }));
                        break;
                    case co.AssignmentExpression:
                        if (l = this.nextId(), u = {}, !In(e.left))
                            throw ro("lval");
                        this.recurse(e.left, n, u, function() {
                            p.if_(p.notNull(u.context), function() {
                                p.recurse(e.right, l),
                                p.addEnsureSafeObject(p.member(u.context, u.name, u.computed)),
                                p.addEnsureSafeAssignContext(u.context),
                                f = p.member(u.context, u.name, u.computed) + e.operator + l,
                                p.assign(t, f),
                                i(t || f)
                            })
                        }, 1);
                        break;
                    case co.ArrayExpression:
                        c = [],
                        o(e.elements, function(e) {
                            p.recurse(e, p.nextId(), n, function(e) {
                                c.push(e)
                            })
                        }),
                        f = "[" + c.join(",") + "]",
                        this.assign(t, f),
                        i(f);
                        break;
                    case co.ObjectExpression:
                        c = [],
                        o(e.properties, function(e) {
                            p.recurse(e.value, p.nextId(), n, function(t) {
                                c.push(p.escape(e.key.type === co.Identifier
                                    ? e.key.name
                                    : "" + e.key.value) + ":" + t)
                            })
                        }),
                        f = "{" + c.join(",") + "}",
                        this.assign(t, f),
                        i(f);
                        break;
                    case co.ThisExpression:
                        this.assign(t, "s"),
                        i("s");
                        break;
                    case co.NGValueParameter:
                        this.assign(t, "v"),
                        i("v")
                }
            },
        getHasOwnProperty: function(e, t) {
            var n = e + "." + t,
                r = this.current().own;
            return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, e + "&&(" + this.escape(t) + " in " + e + ")")),
            r[n]
        },
        assign: function(e, t) {
            return e
                ? (this.current().body.push(e, "=", t, ";"), e)
                : void 0
        },
        filter: function(e) {
            return this.state.filters.hasOwnProperty(e) || (this.state.filters[e] = this.nextId(!0)),
            this.state.filters[e]
        },
        ifDefined: function(e, t) {
            return "ifDefined(" + e + "," + this.escape(t) + ")"
        },
        plus: function(e, t) {
            return "plus(" + e + "," + t + ")"
        },
        return_: function(e) {
            this.current().body.push("return ", e, ";")
        },
        if_: function(e, t, n) {
            if (!0 === e)
                t();
            else {
                var r = this.current().body;
                r.push("if(", e, "){"),
                t(),
                r.push("}"),
                n && (r.push("else{"), n(), r.push("}"))
            }
        },
        not: function(e) {
            return "!(" + e + ")"
        },
        notNull: function(e) {
            return e + "!=null"
        },
        nonComputedMember: function(e, t) {
            return e + "." + t
        },
        computedMember: function(e, t) {
            return e + "[" + t + "]"
        },
        member: function(e, t, n) {
            return n
                ? this.computedMember(e, t)
                : this.nonComputedMember(e, t)
        },
        addEnsureSafeObject: function(e) {
            this.current().body.push(this.ensureSafeObject(e), ";")
        },
        addEnsureSafeMemberName: function(e) {
            this.current().body.push(this.ensureSafeMemberName(e), ";")
        },
        addEnsureSafeFunction: function(e) {
            this.current().body.push(this.ensureSafeFunction(e), ";")
        },
        addEnsureSafeAssignContext: function(e) {
            this.current().body.push(this.ensureSafeAssignContext(e), ";")
        },
        ensureSafeObject: function(e) {
            return "ensureSafeObject(" + e + ",text)"
        },
        ensureSafeMemberName: function(e) {
            return "ensureSafeMemberName(" + e + ",text)"
        },
        ensureSafeFunction: function(e) {
            return "ensureSafeFunction(" + e + ",text)"
        },
        getStringValue: function(e) {
            this.assign(e, "getStringValue(" + e + ",text)")
        },
        ensureSafeAssignContext: function(e) {
            return "ensureSafeAssignContext(" + e + ",text)"
        },
        lazyRecurse: function(e, t, n, r, i, o) {
            var a = this;
            return function() {
                a.recurse(e, t, n, r, i, o)
            }
        },
        lazyAssign: function(e, t) {
            var n = this;
            return function() {
                n.assign(e, t)
            }
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        },
        escape: function(e) {
            if (x(e))
                return "'" + e.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (S(e))
                return e.toString();
            if (!0 === e)
                return "true";
            if (!1 === e)
                return "false";
            if (null === e)
                return "null";
            if ("undefined" == typeof e)
                return "undefined";
            throw ro("esc")
        },
        nextId: function(e, t) {
            var n = "v" + this.state.nextId++;
            return e || this.current().vars.push(n + (t
                ? "=" + t
                : "")),
            n
        },
        current: function() {
            return this.state[this.state.computing]
        }
    },
    Un.prototype = {
        compile: function(e, t) {
            var n = this,
                r = this.astBuilder.ast(e);
            this.expression = e,
            this.expensiveChecks = t,
            Nn(r, n.$filter);
            var i,
                a;
            (i = Fn(r)) && (a = this.recurse(i)),
            i = Rn(r.body);
            var s;
            i && (s = [], o(i, function(e, t) {
                var r = n.recurse(e);
                e.input = r,
                s.push(r),
                e.watchId = t
            }));
            var u = [];
            return o(r.body, function(e) {
                u.push(n.recurse(e.expression))
            }),
            i = 0 === r.body.length
                ? function() {}
                : 1 === r.body.length
                    ? u[0]
                    : function(e, t) {
                        var n;
                        return o(u, function(r) {
                            n = r(e, t)
                        }),
                        n
                    },
            a && (i.assign = function(e, t, n) {
                return a(e, n, t)
            }),
            s && (i.inputs = s),
            i.literal = qn(r),
            i.constant = r.constant,
            i
        },
        recurse: function(e, t, r) {
            var i,
                a,
                s,
                u = this;
            if (e.input)
                return this.inputs(e.input, e.watchId);
            switch (e.type) {
                case co.Literal:
                    return this.value(e.value, t);
                case co.UnaryExpression:
                    return a = this.recurse(e.argument),
                    this["unary" + e.operator](a, t);
                case co.BinaryExpression:
                    return i = this.recurse(e.left),
                    a = this.recurse(e.right),
                    this["binary" + e.operator](i, a, t);
                case co.LogicalExpression:
                    return i = this.recurse(e.left),
                    a = this.recurse(e.right),
                    this["binary" + e.operator](i, a, t);
                case co.ConditionalExpression:
                    return this["ternary?:"](this.recurse(e.test), this.recurse(e.alternate), this.recurse(e.consequent), t);
                case co.Identifier:
                    return On(e.name, u.expression),
                    u.identifier(e.name, u.expensiveChecks || Bn(e.name), t, r, u.expression);
                case co.MemberExpression:
                    return i = this.recurse(e.object, !1, !!r),
                    e.computed || (On(e.property.name, u.expression), a = e.property.name),
                    e.computed && (a = this.recurse(e.property)),
                    e.computed
                        ? this.computedMember(i, a, t, r, u.expression)
                        : this.nonComputedMember(i, a, u.expensiveChecks, t, r, u.expression);
                case co.CallExpression:
                    return s = [],
                    o(e.arguments, function(e) {
                        s.push(u.recurse(e))
                    }),
                    e.filter && (a = this.$filter(e.callee.name)),
                    e.filter || (a = this.recurse(e.callee, !0)),
                    e.filter
                        ? function(e, r, i, o) {
                            for (var u = [], l = 0; l < s.length; ++l)
                                u.push(s[l](e, r, i, o));
                            return e = a.apply(n, u, o),
                            t
                                ? {
                                    context: n,
                                    name: n,
                                    value: e
                                }
                                : e
                        }
                        : function(e, n, r, i) {
                            var o,
                                l = a(e, n, r, i);
                            if (null != l.value) {
                                Pn(l.context, u.expression),
                                Vn(l.value, u.expression),
                                o = [];
                                for (var c = 0; c < s.length; ++c)
                                    o.push(Pn(s[c](e, n, r, i), u.expression));
                                o = Pn(l.value.apply(l.context, o), u.expression)
                            }
                            return t
                                ? {
                                    value: o
                                }
                                : o
                        };
                case co.AssignmentExpression:
                    return i = this.recurse(e.left, !0, 1),
                    a = this.recurse(e.right),
                    function(e, n, r, o) {
                        var s = i(e, n, r, o);
                        return e = a(e, n, r, o),
                        Pn(s.value, u.expression),
                        Mn(s.context),
                        s.context[s.name] = e,
                        t
                            ? {
                                value: e
                            }
                            : e
                    };
                case co.ArrayExpression:
                    return s = [],
                    o(e.elements, function(e) {
                        s.push(u.recurse(e))
                    }),
                    function(e, n, r, i) {
                        for (var o = [], a = 0; a < s.length; ++a)
                            o.push(s[a](e, n, r, i));
                        return t
                            ? {
                                value: o
                            }
                            : o
                    };
                case co.ObjectExpression:
                    return s = [],
                    o(e.properties, function(e) {
                        s.push({
                            key: e.key.type === co.Identifier
                                ? e.key.name
                                : "" + e.key.value,
                            value: u.recurse(e.value)
                        })
                    }),
                    function(e, n, r, i) {
                        for (var o = {}, a = 0; a < s.length; ++a)
                            o[s[a].key] = s[a].value(e, n, r, i);
                        return t
                            ? {
                                value: o
                            }
                            : o
                    };
                case co.ThisExpression:
                    return function(e) {
                        return t
                            ? {
                                value: e
                            }
                            : e
                    };
                case co.NGValueParameter:
                    return function(e, n, r) {
                        return t
                            ? {
                                value: r
                            }
                            : r
                    }
            }
        },
        "unary+": function(e, t) {
            return function(n, r, i, o) {
                return n = e(n, r, i, o),
                n = y(n) ?+ n : 0,
                t
                    ? {
                        value: n
                    }
                    : n
            }
        },
        "unary-": function(e, t) {
            return function(n, r, i, o) {
                return n = e(n, r, i, o),
                n = y(n)
                    ? -n
                    : 0,
                t
                    ? {
                        value: n
                    }
                    : n
            }
        },
        "unary!": function(e, t) {
            return function(n, r, i, o) {
                return n = !e(n, r, i, o),
                t
                    ? {
                        value: n
                    }
                    : n
            }
        },
        "binary+": function(e, t, n) {
            return function(r, i, o, a) {
                var s = e(r, i, o, a);
                return r = t(r, i, o, a),
                s = jn(s, r),
                n
                    ? {
                        value: s
                    }
                    : s
            }
        },
        "binary-": function(e, t, n) {
            return function(r, i, o, a) {
                var s = e(r, i, o, a);
                return r = t(r, i, o, a),
                s = (y(s)
                    ? s
                    : 0) - (y(r)
                    ? r
                    : 0),
                n
                    ? {
                        value: s
                    }
                    : s
            }
        },
        "binary*": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) * t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary/": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) / t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary%": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) % t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary===": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) === t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary!==": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) !== t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary==": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) == t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary!=": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) != t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary<": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) < t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary>": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) > t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary<=": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) <= t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary>=": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) >= t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary&&": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) && t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "binary||": function(e, t, n) {
            return function(r, i, o, a) {
                return r = e(r, i, o, a) || t(r, i, o, a),
                n
                    ? {
                        value: r
                    }
                    : r
            }
        },
        "ternary?:": function(e, t, n, r) {
            return function(i, o, a, s) {
                return i = e(i, o, a, s)
                    ? t(i, o, a, s)
                    : n(i, o, a, s),
                r
                    ? {
                        value: i
                    }
                    : i
            }
        },
        value: function(e, t) {
            return function() {
                return t
                    ? {
                        context: n,
                        name: n,
                        value: e
                    }
                    : e
            }
        },
        identifier: function(e, t, r, i, o) {
            return function(a, s) {
                return a = s && e in s
                    ? s
                    : a,
                i && 1 !== i && a && !a[e] && (a[e] = {}),
                s = a
                    ? a[e]
                    : n,
                t && Pn(s, o),
                r
                    ? {
                        context: a,
                        name: e,
                        value: s
                    }
                    : s
            }
        },
        computedMember: function(e, t, n, r, i) {
            return function(o, a, s, u) {
                var l,
                    c,
                    f = e(o, a, s, u);
                return null != f && (l = t(o, a, s, u), l = Tn(l), On(l, i), r && 1 !== r && f && !f[l] && (f[l] = {}), c = f[l], Pn(c, i)),
                n
                    ? {
                        context: f,
                        name: l,
                        value: c
                    }
                    : c
            }
        },
        nonComputedMember: function(e, t, r, i, o, a) {
            return function(s, u, l, c) {
                return s = e(s, u, l, c),
                o && 1 !== o && s && !s[t] && (s[t] = {}),
                u = null != s
                    ? s[t]
                    : n,
                (r || Bn(t)) && Pn(u, a),
                i
                    ? {
                        context: s,
                        name: t,
                        value: u
                    }
                    : u
            }
        },
        inputs: function(e, t) {
            return function(n, r, i, o) {
                return o
                    ? o[t]
                    : e(n, r, i)
            }
        }
    };
    var fo = function(e, t, n) {
        this.lexer = e,
        this.$filter = t,
        this.options = n,
        this.ast = new co(this.lexer),
        this.astCompiler = n.csp
            ? new Un(this.ast, t)
            : new _n(this.ast, t)
    };
    fo.prototype = {
        constructor: fo,
        parse: function(e) {
            return this.astCompiler.compile(e, this.options.expensiveChecks)
        }
    },
    lt(),
    lt();
    var po = Object.prototype.valueOf,
        ho = r("$sce"),
        $o = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        _i = r("$compile"),
        mo = t.createElement("a"),
        vo = or(e.location.href);
    ur.$inject = ["$document"],
    cr.$inject = ["$provide"],
    $r.$inject = ["$locale"],
    mr.$inject = ["$locale"];
    var go = ".",
        yo = {
            yyyy: yr("FullYear", 4),
            yy: yr("FullYear", 2, 0, !0),
            y: yr("FullYear", 1),
            MMMM: br("Month"),
            MMM: br("Month", !0),
            MM: yr("Month", 2, 1),
            M: yr("Month", 1, 1),
            dd: yr("Date", 2),
            d: yr("Date", 1),
            HH: yr("Hours", 2),
            H: yr("Hours", 1),
            hh: yr("Hours", 2, -12),
            h: yr("Hours", 1, -12),
            mm: yr("Minutes", 2),
            m: yr("Minutes", 1),
            ss: yr("Seconds", 2),
            s: yr("Seconds", 1),
            sss: yr("Milliseconds", 3),
            EEEE: br("Day"),
            EEE: br("Day", !0),
            a: function(e, t) {
                return 12 > e.getHours()
                    ? t.AMPMS[0]
                    : t.AMPMS[1]
            },
            Z: function(e, t, n) {
                return e = -1 * n,
                e = (e >= 0
                    ? "+"
                    : "") + (gr(Math[e > 0
                        ? "floor"
                        : "ceil"](e / 60), 2) + gr(Math.abs(e % 60), 2))
            },
            ww: xr(2),
            w: xr(1),
            G: Sr,
            GG: Sr,
            GGG: Sr,
            GGGG: function(e, t) {
                return 0 >= e.getFullYear()
                    ? t.ERANAMES[0]
                    : t.ERANAMES[1]
            }
        },
        bo = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
        wo = /^\-?\d+$/;
    Cr.$inject = ["$locale"];
    var xo = m(Hr),
        So = m(Gr);
    kr.$inject = ["$parse"];
    var Co = m({
            restrict: "E",
            compile: function(e, t) {
                return t.href || t.xlinkHref
                    ? void 0
                    : function(e, t) {
                        if ("a" === t[0].nodeName.toLowerCase()) {
                            var n = "[object SVGAnimatedString]" === Kr.call(t.prop("href"))
                                ? "xlink:href"
                                : "href";
                            t.on("click", function(e) {
                                t.attr(n) || e.preventDefault()
                            })
                        }
                    }
            }
        }),
        Eo = {};
    o(Ai, function(e, t) {
        function n(e, n, i) {
            e.$watch(i[r], function(e) {
                i.$set(t, !!e)
            })
        }
        if ("multiple" != e) {
            var r = Jt("ng-" + t),
                i = n;
            "checked" === e && (i = function(e, t, i) {
                i.ngModel !== i[r] && n(e, t, i)
            }),
            Eo[r] = function() {
                return {restrict: "A", priority: 100, link: i}
            }
        }
    }),
    o(Oi, function(e, t) {
        Eo[t] = function() {
            return {
                priority: 100,
                link: function(e, n, r) {
                    return "ngPattern" === t && "/" == r.ngPattern.charAt(0) && (n = r.ngPattern.match(Lr))
                        ? (r.$set("ngPattern", new RegExp(n[1], n[2])), void 0)
                        : (e.$watch(r[t], function(e) {
                            r.$set(t, e)
                        }), void 0)
                }
            }
        }
    }),
    o([
        "src", "srcset", "href"
    ], function(e) {
        var t = Jt("ng-" + e);
        Eo[t] = function() {
            return {
                priority: 99,
                link: function(n, r, i) {
                    var o = e,
                        a = e;
                    "href" === e && "[object SVGAnimatedString]" === Kr.call(r.prop("href")) && (a = "xlinkHref", i.$attr[a] = "xlink:href", o = null),
                    i.$observe(t, function(t) {
                        t
                            ? (i.$set(a, t), qr && o && r.prop(o, i[a]))
                            : "href" === e && i.$set(a, null)
                    })
                }
            }
        }
    });
    var Ao = {
        $addControl: d,
        $$renameControl: function(e, t) {
            e.$name = t
        },
        $removeControl: d,
        $setValidity: d,
        $setDirty: d,
        $setPristine: d,
        $setSubmitted: d
    };
    Tr.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
    var ko = function(e) {
            return [
                "$timeout",
                "$parse",
                function(t, r) {
                    function i(e) {
                        return "" === e
                            ? r('this[""]').assign
                            : r(e).assign || d
                    }
                    return {
                        name: "form",
                        restrict: e
                            ? "EAC"
                            : "E",
                        require: [
                            "form", "^^?form"
                        ],
                        controller: Tr,
                        compile: function(r, o) {
                            r.addClass(sa).addClass(oa);
                            var a = o.name
                                ? "name"
                                : e && o.ngForm
                                    ? "ngForm"
                                    : !1;
                            return {
                                pre: function(e, r, o, s) {
                                    var u = s[0];
                                    if (!("action" in o)) {
                                        var l = function(t) {
                                            e.$apply(function() {
                                                u.$commitViewValue(),
                                                u.$setSubmitted()
                                            }),
                                            t.preventDefault()
                                        };
                                        r[0].addEventListener("submit", l, !1),
                                        r.on("$destroy", function() {
                                            t(function() {
                                                r[0].removeEventListener("submit", l, !1)
                                            }, 0, !1)
                                        })
                                    }
                                    (s[1] || u.$$parentForm).$addControl(u);
                                    var f = a
                                        ? i(u.$name)
                                        : d;
                                    a && (f(e, u), o.$observe(a, function(t) {
                                        u.$name !== t && (f(e, n), u.$$parentForm.$$renameControl(u, t), (f = i(u.$name))(e, u))
                                    })),
                                    r.on("$destroy", function() {
                                        u.$$parentForm.$removeControl(u),
                                        f(e, n),
                                        c(u, Ao)
                                    })
                                }
                            }
                        }
                    }
                }
            ]
        },
        Oo = ko(),
        To = ko(!0),
        Po = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        Vo = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/,
        Mo = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        Do = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
        jo = /^(\d{4})-(\d{2})-(\d{2})$/,
        No = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        Ro = /^(\d{4})-W(\d\d)$/,
        Io = /^(\d{4})-(\d\d)$/,
        Fo = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        qo = {
            text: function(e, t, n, r, i, o) {
                Vr(e, t, n, r, i, o),
                Pr(r)
            },
            date: Dr("date", jo, Mr(jo, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
            "datetime-local": Dr("datetimelocal", No, Mr(No, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
            time: Dr("time", Fo, Mr(Fo, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
            week: Dr("week", Ro, function(e, t) {
                if (C(e))
                    return e;
                if (x(e)) {
                    Ro.lastIndex = 0;
                    var n = Ro.exec(e);
                    if (n) {
                        var r =+ n[1],
                            i =+ n[2],
                            o = n = 0,
                            a = 0,
                            s = 0,
                            u = wr(r),
                            i = 7 * (i - 1);
                        return t && (n = t.getHours(), o = t.getMinutes(), a = t.getSeconds(), s = t.getMilliseconds()),
                        new Date(r, 0, u.getDate() + i, n, o, a, s)
                    }
                }
                return 0 / 0
            }, "yyyy-Www"),
            month: Dr("month", Io, Mr(Io, ["yyyy", "MM"]), "yyyy-MM"),
            number: function(e, t, r, i, o, a) {
                if (jr(e, t, r, i), Vr(e, t, r, i, o, a), i.$$parserName = "number", i.$parsers.push(function(e) {
                    return i.$isEmpty(e)
                        ? null
                        : Do.test(e)
                            ? parseFloat(e)
                            : n
                }), i.$formatters.push(function(e) {
                    if (!i.$isEmpty(e)) {
                        if (!S(e))
                            throw ca("numfmt", e);
                        e = e.toString()
                    }
                    return e
                }), y(r.min) || r.ngMin) {
                    var s;
                    i.$validators.min = function(e) {
                        return i.$isEmpty(e) || g(s) || e >= s
                    },
                    r.$observe("min", function(e) {
                        y(e) && !S(e) && (e = parseFloat(e, 10)),
                        s = S(e) && !isNaN(e)
                            ? e
                            : n,
                        i.$validate()
                    })
                }
                if (y(r.max) || r.ngMax) {
                    var u;
                    i.$validators.max = function(e) {
                        return i.$isEmpty(e) || g(u) || u >= e
                    },
                    r.$observe("max", function(e) {
                        y(e) && !S(e) && (e = parseFloat(e, 10)),
                        u = S(e) && !isNaN(e)
                            ? e
                            : n,
                        i.$validate()
                    })
                }
            },
            url: function(e, t, n, r, i, o) {
                Vr(e, t, n, r, i, o),
                Pr(r),
                r.$$parserName = "url",
                r.$validators.url = function(e, t) {
                    var n = e || t;
                    return r.$isEmpty(n) || Vo.test(n)
                }
            },
            email: function(e, t, n, r, i, o) {
                Vr(e, t, n, r, i, o),
                Pr(r),
                r.$$parserName = "email",
                r.$validators.email = function(e, t) {
                    var n = e || t;
                    return r.$isEmpty(n) || Mo.test(n)
                }
            },
            radio: function(e, t, n, r) {
                g(n.name) && t.attr("name", ++ei),
                t.on("click", function(e) {
                    t[0].checked && r.$setViewValue(n.value, e && e.type)
                }),
                r.$render = function() {
                    t[0].checked = n.value == r.$viewValue
                },
                n.$observe("value", r.$render)
            },
            checkbox: function(e, t, n, r, i, o, a, s) {
                var u = Nr(s, e, "ngTrueValue", n.ngTrueValue, !0),
                    l = Nr(s, e, "ngFalseValue", n.ngFalseValue, !1);
                t.on("click", function(e) {
                    r.$setViewValue(t[0].checked, e && e.type)
                }),
                r.$render = function() {
                    t[0].checked = r.$viewValue
                },
                r.$isEmpty = function(e) {
                    return !1 === e
                },
                r.$formatters.push(function(e) {
                    return I(e, u)
                }),
                r.$parsers.push(function(e) {
                    return e
                        ? u
                        : l
                })
            },
            hidden: d,
            button: d,
            submit: d,
            reset: d,
            file: d
        },
        _o = [
            "$browser",
            "$sniffer",
            "$filter",
            "$parse",
            function(e, t, n, r) {
                return {
                    restrict: "E",
                    require: ["?ngModel"],
                    link: {
                        pre: function(i, o, a, s) {
                            s[0] && (qo[Hr(a.type)] || qo.text)(i, o, a, s[0], t, e, n, r)
                        }
                    }
                }
            }
        ],
        Uo = /^(true|false|\d+)$/,
        Bo = function() {
            return {
                restrict: "A",
                priority: 100,
                compile: function(e, t) {
                    return Uo.test(t.ngValue)
                        ? function(e, t, n) {
                            n.$set("value", e.$eval(n.ngValue))
                        }
                        : function(e, t, n) {
                            e.$watch(n.ngValue, function(e) {
                                n.$set("value", e)
                            })
                        }
                }
            }
        },
        Lo = [
            "$compile",
            function(e) {
                return {
                    restrict: "AC",
                    compile: function(t) {
                        return e.$$addBindingClass(t),
                        function(t, n, r) {
                            e.$$addBindingInfo(n, r.ngBind),
                            n = n[0],
                            t.$watch(r.ngBind, function(e) {
                                n.textContent = g(e)
                                    ? ""
                                    : e
                            })
                        }
                    }
                }
            }
        ],
        Ho = [
            "$interpolate",
            "$compile",
            function(e, t) {
                return {
                    compile: function(n) {
                        return t.$$addBindingClass(n),
                        function(n, r, i) {
                            n = e(r.attr(i.$attr.ngBindTemplate)),
                            t.$$addBindingInfo(r, n.expressions),
                            r = r[0],
                            i.$observe("ngBindTemplate", function(e) {
                                r.textContent = g(e)
                                    ? ""
                                    : e
                            })
                        }
                    }
                }
            }
        ],
        zo = [
            "$sce",
            "$parse",
            "$compile",
            function(e, t, n) {
                return {
                    restrict: "A",
                    compile: function(r, i) {
                        var o = t(i.ngBindHtml),
                            a = t(i.ngBindHtml, function(e) {
                                return (e || "").toString()
                            });
                        return n.$$addBindingClass(r),
                        function(t, r, i) {
                            n.$$addBindingInfo(r, i.ngBindHtml),
                            t.$watch(a, function() {
                                r.html(e.getTrustedHtml(o(t)) || "")
                            })
                        }
                    }
                }
            }
        ],
        Go = m({
            restrict: "A",
            require: "ngModel",
            link: function(e, t, n, r) {
                r.$viewChangeListeners.push(function() {
                    e.$eval(n.ngChange)
                })
            }
        }),
        Wo = Rr("", !0),
        Xo = Rr("Odd", 0),
        Jo = Rr("Even", 1),
        Ko = Or({
            compile: function(e, t) {
                t.$set("ngCloak", n),
                e.removeClass("ng-cloak")
            }
        }),
        Qo = [function() {
                return {
                    restrict: "A",
                    scope: !0,
                    controller: "@",
                    priority: 500
                }
            }
        ],
        Yo = {},
        Zo = {
            blur: !0,
            focus: !0
        };
    o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(e) {
        var t = Jt("ng-" + e);
        Yo[t] = [
            "$parse",
            "$rootScope",
            function(n, r) {
                return {
                    restrict: "A",
                    compile: function(i, o) {
                        var a = n(o[t], null, !0);
                        return function(t, n) {
                            n.on(e, function(n) {
                                var i = function() {
                                    a(t, {$event: n})
                                };
                                Zo[e] && r.$$phase
                                    ? t.$evalAsync(i)
                                    : t.$apply(i)
                            })
                        }
                    }
                }
            }
        ]
    });
    var ea = [
            "$animate",
            function(e) {
                return {
                    multiElement: !0,
                    transclude: "element",
                    priority: 600,
                    terminal: !0,
                    restrict: "A",
                    $$tlb: !0,
                    link: function(n, r, i, o, a) {
                        var s,
                            u,
                            l;
                        n.$watch(i.ngIf, function(n) {
                            n
                                ? u || a(function(n, o) {
                                    u = o,
                                    n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " "),
                                    s = {
                                        clone: n
                                    },
                                    e.enter(n, r.parent(), r)
                                })
                                : (l && (l.remove(), l = null), u && (u.$destroy(), u = null), s && (l = ut(s.clone), e.leave(l).then(function() {
                                    l = null
                                }), s = null))
                        })
                    }
                }
            }
        ],
        ta = [
            "$templateRequest",
            "$anchorScroll",
            "$animate",
            function(e, t, n) {
                return {
                    restrict: "ECA",
                    priority: 400,
                    terminal: !0,
                    transclude: "element",
                    controller: Zr.noop,
                    compile: function(r, i) {
                        var o = i.ngInclude || i.src,
                            a = i.onload || "",
                            s = i.autoscroll;
                        return function(r, i, u, l, c) {
                            var f,
                                p,
                                h,
                                d = 0,
                                $ = function() {
                                    p && (p.remove(), p = null),
                                    f && (f.$destroy(), f = null),
                                    h && (n.leave(h).then(function() {
                                        p = null
                                    }), p = h, h = null)
                                };
                            r.$watch(o, function(o) {
                                var u = function() {
                                        !y(s) || s && !r.$eval(s) || t()
                                    },
                                    p = ++d;
                                o
                                    ? (e(o, !0).then(function(e) {
                                        if (p === d) {
                                            var t = r.$new();
                                            l.template = e,
                                            e = c(t, function(e) {
                                                $(),
                                                n.enter(e, null, i).then(u)
                                            }),
                                            f = t,
                                            h = e,
                                            f.$emit("$includeContentLoaded", o),
                                            r.$eval(a)
                                        }
                                    }, function() {
                                        p === d && ($(), r.$emit("$includeContentError", o))
                                    }), r.$emit("$includeContentRequested", o))
                                    : ($(), l.template = null)
                            })
                        }
                    }
                }
            }
        ],
        na = [
            "$compile",
            function(e) {
                return {
                    restrict: "ECA",
                    priority: -400,
                    require: "ngInclude",
                    link: function(n, r, i, o) {
                        /SVG/.test(r[0].toString())
                            ? (r.empty(), e(dt(o.template, t).childNodes)(n, function(e) {
                                r.append(e)
                            }, {futureParentElement: r}))
                            : (r.html(o.template), e(r.contents())(n))
                    }
                }
            }
        ],
        ra = Or({
            priority: 450,
            compile: function() {
                return {
                    pre: function(e, t, n) {
                        e.$eval(n.ngInit)
                    }
                }
            }
        }),
        ia = function() {
            return {
                restrict: "A",
                priority: 100,
                require: "ngModel",
                link: function(e, t, r, i) {
                    var a = t.attr(r.$attr.ngList) || ", ",
                        s = "false" !== r.ngTrim,
                        u = s
                            ? ii(a)
                            : a;
                    i.$parsers.push(function(e) {
                        if (!g(e)) {
                            var t = [];
                            return e && o(e.split(u), function(e) {
                                e && t.push(s
                                    ? ii(e)
                                    : e)
                            }),
                            t
                        }
                    }),
                    i.$formatters.push(function(e) {
                        return ni(e)
                            ? e.join(a)
                            : n
                    }),
                    i.$isEmpty = function(e) {
                        return !e || !e.length
                    }
                }
            }
        },
        oa = "ng-valid",
        aa = "ng-invalid",
        sa = "ng-pristine",
        ua = "ng-dirty",
        la = "ng-pending",
        ca = r("ngModel"),
        fa = [
            "$scope",
            "$exceptionHandler",
            "$attrs",
            "$element",
            "$parse",
            "$animate",
            "$timeout",
            "$rootScope",
            "$q",
            "$interpolate",
            function(e, t, r, i, a, s, u, l, c, f) {
                this.$modelValue = this.$viewValue = Number.NaN,
                this.$$rawModelValue = n,
                this.$validators = {},
                this.$asyncValidators = {},
                this.$parsers = [],
                this.$formatters = [],
                this.$viewChangeListeners = [],
                this.$untouched = !0,
                this.$touched = !1,
                this.$pristine = !0,
                this.$dirty = !1,
                this.$valid = !0,
                this.$invalid = !1,
                this.$error = {},
                this.$$success = {},
                this.$pending = n,
                this.$name = f(r.name || "", !1)(e),
                this.$$parentForm = Ao;
                var p,
                    h = a(r.ngModel),
                    $ = h.assign,
                    m = h,
                    v = $,
                    b = null,
                    w = this;
                this.$$setOptions = function(e) {
                    if ((w.$options = e) && e.getterSetter) {
                        var t = a(r.ngModel + "()"),
                            n = a(r.ngModel + "($$$p)");
                        m = function(e) {
                            var n = h(e);
                            return E(n) && (n = t(e)),
                            n
                        },
                        v = function(e) {
                            E(h(e))
                                ? n(e, {$$$p: w.$modelValue})
                                : $(e, w.$modelValue)
                        }
                    } else if (!h.assign)
                        throw ca("nonassign", r.ngModel, z(i))
                },
                this.$render = d,
                this.$isEmpty = function(e) {
                    return g(e) || "" === e || null === e || e !== e
                };
                var x = 0;
                Ir({
                    ctrl: this,
                    $element: i,
                    set: function(e, t) {
                        e[t] = !0
                    },
                    unset: function(e, t) {
                        delete e[t]
                    },
                    $animate: s
                }),
                this.$setPristine = function() {
                    w.$dirty = !1,
                    w.$pristine = !0,
                    s.removeClass(i, ua),
                    s.addClass(i, sa)
                },
                this.$setDirty = function() {
                    w.$dirty = !0,
                    w.$pristine = !1,
                    s.removeClass(i, sa),
                    s.addClass(i, ua),
                    w.$$parentForm.$setDirty()
                },
                this.$setUntouched = function() {
                    w.$touched = !1,
                    w.$untouched = !0,
                    s.setClass(i, "ng-untouched", "ng-touched")
                },
                this.$setTouched = function() {
                    w.$touched = !0,
                    w.$untouched = !1,
                    s.setClass(i, "ng-touched", "ng-untouched")
                },
                this.$rollbackViewValue = function() {
                    u.cancel(b),
                    w.$viewValue = w.$$lastCommittedViewValue,
                    w.$render()
                },
                this.$validate = function() {
                    if (!S(w.$modelValue) || !isNaN(w.$modelValue)) {
                        var e = w.$$rawModelValue,
                            t = w.$valid,
                            r = w.$modelValue,
                            i = w.$options && w.$options.allowInvalid;
                        w.$$runValidators(e, w.$$lastCommittedViewValue, function(o) {
                            i || t === o || (w.$modelValue = o
                                ? e
                                : n, w.$modelValue !== r && w.$$writeModelToScope())
                        })
                    }
                },
                this.$$runValidators = function(e, t, r) {
                    function i() {
                        var n = !0;
                        return o(w.$validators, function(r, i) {
                            var o = r(e, t);
                            n = n && o,
                            s(i, o)
                        }),
                        n
                            ? !0
                            : (o(w.$asyncValidators, function(e, t) {
                                s(t, null)
                            }), !1)
                    }
                    function a() {
                        var r = [],
                            i = !0;
                        o(w.$asyncValidators, function(o, a) {
                            var u = o(e, t);
                            if (!u || !E(u.then))
                                throw ca("$asyncValidators", u);
                            s(a, n),
                            r.push(u.then(function() {
                                s(a, !0)
                            }, function() {
                                i = !1,
                                s(a, !1)
                            }))
                        }),
                        r.length
                            ? c.all(r).then(function() {
                                u(i)
                            }, d)
                            : u(!0)
                    }
                    function s(e, t) {
                        l === x && w.$setValidity(e, t)
                    }
                    function u(e) {
                        l === x && r(e)
                    }
                    x++;
                    var l = x;
                    (function() {
                        var e = w.$$parserName || "parse";
                        return g(p)
                            ? (s(e, null), !0)
                            : (p || (o(w.$validators, function(e, t) {
                                s(t, null)
                            }), o(w.$asyncValidators, function(e, t) {
                                s(t, null)
                            })), s(e, p), p)
                    })()
                        ? i()
                            ? a()
                            : u(!1)
                        : u(!1)
                },
                this.$commitViewValue = function() {
                    var e = w.$viewValue;
                    u.cancel(b),
                    (w.$$lastCommittedViewValue !== e || "" === e && w.$$hasNativeValidators) && (w.$$lastCommittedViewValue = e, w.$pristine && this.$setDirty(), this.$$parseAndValidate())
                },
                this.$$parseAndValidate = function() {
                    var t = w.$$lastCommittedViewValue;
                    if (p = g(t)
                        ? n
                        : !0)
                        for (var r = 0; r < w.$parsers.length; r++)
                            if (t = w.$parsers[r](t), g(t)) {
                                p = !1;
                                break
                            }
                        S(w.$modelValue) && isNaN(w.$modelValue) && (w.$modelValue = m(e));
                    var i = w.$modelValue,
                        o = w.$options && w.$options.allowInvalid;
                    w.$$rawModelValue = t,
                    o && (w.$modelValue = t, w.$modelValue !== i && w.$$writeModelToScope()),
                    w.$$runValidators(t, w.$$lastCommittedViewValue, function(e) {
                        o || (w.$modelValue = e
                            ? t
                            : n, w.$modelValue !== i && w.$$writeModelToScope())
                    })
                },
                this.$$writeModelToScope = function() {
                    v(e, w.$modelValue),
                    o(w.$viewChangeListeners, function(e) {
                        try {
                            e()
                        } catch (n) {
                            t(n)
                        }
                    })
                },
                this.$setViewValue = function(e, t) {
                    w.$viewValue = e,
                    w.$options && !w.$options.updateOnDefault || w.$$debounceViewValueCommit(t)
                },
                this.$$debounceViewValueCommit = function(t) {
                    var n = 0,
                        r = w.$options;
                    r && y(r.debounce) && (r = r.debounce, S(r)
                        ? n = r
                        : S(r[t])
                            ? n = r[t]
                            : S(r["default"]) && (n = r["default"])),
                    u.cancel(b),
                    n
                        ? b = u(function() {
                            w.$commitViewValue()
                        }, n)
                        : l.$$phase
                            ? w.$commitViewValue()
                            : e.$apply(function() {
                                w.$commitViewValue()
                            })
                },
                e.$watch(function() {
                    var t = m(e);
                    if (t !== w.$modelValue && (w.$modelValue === w.$modelValue || t === t)) {
                        w.$modelValue = w.$$rawModelValue = t,
                        p = n;
                        for (var r = w.$formatters, i = r.length, o = t; i--;)
                            o = r[i](o);
                        w.$viewValue !== o && (w.$viewValue = w.$$lastCommittedViewValue = o, w.$render(), w.$$runValidators(t, o, d))
                    }
                    return t
                })
            }
        ],
        pa = [
            "$rootScope",
            function(e) {
                return {
                    restrict: "A",
                    require: [
                        "ngModel", "^?form", "^?ngModelOptions"
                    ],
                    controller: fa,
                    priority: 1,
                    compile: function(t) {
                        return t.addClass(sa).addClass("ng-untouched").addClass(oa), {
                            pre: function(e, t, n, r) {
                                var i = r[0];
                                t = r[1] || i.$$parentForm,
                                i.$$setOptions(r[2] && r[2].$options),
                                t.$addControl(i),
                                n.$observe("name", function(e) {
                                    i.$name !== e && i.$$parentForm.$$renameControl(i, e)
                                }),
                                e.$on("$destroy", function() {
                                    i.$$parentForm.$removeControl(i)
                                })
                            },
                            post: function(t, n, r, i) {
                                var o = i[0];
                                o.$options && o.$options.updateOn && n.on(o.$options.updateOn, function(e) {
                                    o.$$debounceViewValueCommit(e && e.type)
                                }),
                                n.on("blur", function() {
                                    o.$touched || (e.$$phase
                                        ? t.$evalAsync(o.$setTouched)
                                        : t.$apply(o.$setTouched))
                                })
                            }
                        }
                    }
                }
            }
        ],
        ha = /(\s+|^)default(\s+|$)/,
        da = function() {
            return {
                restrict: "A",
                controller: [
                    "$scope",
                    "$attrs",
                    function(e, t) {
                        var n = this;
                        this.$options = N(e.$eval(t.ngModelOptions)),
                        y(this.$options.updateOn)
                            ? (this.$options.updateOnDefault = !1, this.$options.updateOn = ii(this.$options.updateOn.replace(ha, function() {
                                return n.$options.updateOnDefault = !0,
                                " "
                            })))
                            : this.$options.updateOnDefault = !0
                    }
                ]
            }
        },
        $a = Or({
            terminal: !0,
            priority: 1e3
        }),
        ma = r("ngOptions"),
        va = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
        ga = [
            "$compile",
            "$parse",
            function(e, n) {
                function r(e, t, r) {
                    function o(e, t, n, r, i) {
                        this.selectValue = e,
                        this.viewValue = t,
                        this.label = n,
                        this.group = r,
                        this.disabled = i
                    }
                    function a(e) {
                        var t;
                        if (!l && i(e))
                            t = e;
                        else {
                            t = [];
                            for (var n in e)
                                e.hasOwnProperty(n) && "$" !== n.charAt(0) && t.push(n)
                        }
                        return t
                    }
                    var s = e.match(va);
                    if (!s)
                        throw ma("iexp", e, z(t));
                    var u = s[5] || s[7],
                        l = s[6];
                    e = / as /.test(s[0]) && s[1];
                    var c = s[9];
                    t = n(s[2]
                        ? s[1]
                        : u);
                    var f = e && n(e) || t,
                        p = c && n(c),
                        h = c
                            ? function(e, t) {
                                return p(r, t)
                            }
                            : function(e) {
                                return Rt(e)
                            },
                        d = function(e, t) {
                            return h(e, b(e, t))
                        },
                        $ = n(s[2] || s[1]),
                        m = n(s[3] || ""),
                        v = n(s[4] || ""),
                        g = n(s[8]),
                        y = {},
                        b = l
                            ? function(e, t) {
                                return y[l] = t,
                                y[u] = e,
                                y
                            }
                            : function(e) {
                                return y[u] = e,
                                y
                            };
                    return {
                        trackBy: c,
                        getTrackByValue: d,
                        getWatchables: n(g, function(e) {
                            var t = [];
                            e = e || [];
                            for (var n = a(e), i = n.length, o = 0; i > o; o++) {
                                var u = e === n
                                        ? o
                                        : n[o],
                                    l = b(e[u], u),
                                    u = h(e[u], l);
                                t.push(u),
                                (s[2] || s[1]) && (u = $(r, l), t.push(u)),
                                s[4] && (l = v(r, l), t.push(l))
                            }
                            return t
                        }),
                        getOptions: function() {
                            for (var e = [], t = {}, n = g(r) || [], i = a(n), s = i.length, u = 0; s > u; u++) {
                                var l = n === i
                                        ? u
                                        : i[u],
                                    p = b(n[l], l),
                                    y = f(r, p),
                                    l = h(y, p),
                                    w = $(r, p),
                                    x = m(r, p),
                                    p = v(r, p),
                                    y = new o(l, y, w, x, p);
                                e.push(y),
                                t[l] = y
                            }
                            return {
                                items: e,
                                selectValueMap: t,
                                getOptionFromViewValue: function(e) {
                                    return t[d(e)]
                                },
                                getViewValueFromOption: function(e) {
                                    return c
                                        ? Zr.copy(e.viewValue)
                                        : e.viewValue
                                }
                            }
                        }
                    }
                }
                var a = t.createElement("option"),
                    s = t.createElement("optgroup");
                return {
                    restrict: "A",
                    terminal: !0,
                    require: [
                        "select", "?ngModel"
                    ],
                    link: {
                        pre: function(e, t, n, r) {
                            r[0].registerOption = d
                        },
                        post: function(t, n, i, u) {
                            function l(e, t) {
                                e.element = t,
                                t.disabled = e.disabled,
                                e.label !== t.label && (t.label = e.label, t.textContent = e.label),
                                e.value !== t.value && (t.value = e.selectValue)
                            }
                            function c(e, t, n, r) {
                                return t && Hr(t.nodeName) === n
                                    ? n = t
                                    : (n = r.cloneNode(!1), t
                                        ? e.insertBefore(n, t)
                                        : e.appendChild(n)),
                                n
                            }
                            function f(e) {
                                for (var t; e;)
                                    t = e.nextSibling,
                                    Tt(e),
                                    e = t
                            }
                            function p(e) {
                                var t = m && m[0],
                                    n = w && w[0];
                                if (t || n)
                                    for (; e && (e === t || e === n || 8 === e.nodeType || "" === e.value);)
                                        e = e.nextSibling;
                            return e
                            }
                            function h() {
                                var e = x && $.readValue();
                                x = S.getOptions();
                                var t = {},
                                    r = n[0].firstChild;
                                if (b && n.prepend(m), r = p(r), x.items.forEach(function(e) {
                                    var i,
                                        o;
                                    e.group
                                        ? (i = t[e.group], i || (i = c(n[0], r, "optgroup", s), r = i.nextSibling, i.label = e.group, i = t[e.group] = {
                                            groupElement: i,
                                            currentOptionElement: i.firstChild
                                        }), o = c(i.groupElement, i.currentOptionElement, "option", a), l(e, o), i.currentOptionElement = o.nextSibling)
                                        : (o = c(n[0], r, "option", a), l(e, o), r = o.nextSibling)
                                }), Object.keys(t).forEach(function(e) {
                                    f(t[e].currentOptionElement)
                                }), f(r), d.$render(), !d.$isEmpty(e)) {
                                    var i = $.readValue();
                                    (S.trackBy
                                        ? I(e, i)
                                        : e === i) || (d.$setViewValue(i), d.$render())
                                }
                            }
                            var d = u[1];
                            if (d) {
                                var $ = u[0];
                                u = i.multiple;
                                for (var m, v = 0, g = n.children(), y = g.length; y > v; v++)
                                    if ("" === g[v].value) {
                                        m = g.eq(v);
                                        break
                                    }
                                var b = !!m,
                                    w = _r(a.cloneNode(!1));
                                w.val("?");
                                var x,
                                    S = r(i.ngOptions, n, t);
                                u
                                    ? (d.$isEmpty = function(e) {
                                        return !e || 0 === e.length
                                    },
                                    $.writeValue = function(e) {
                                        x.items.forEach(function(e) {
                                            e.element.selected = !1
                                        }),
                                        e && e.forEach(function(e) {
                                            (e = x.getOptionFromViewValue(e)) && !e.disabled && (e.element.selected = !0)
                                        })
                                    },
                                    $.readValue = function() {
                                        var e = n.val() || [],
                                            t = [];
                                        return o(e, function(e) {
                                            (e = x.selectValueMap[e]) && !e.disabled && t.push(x.getViewValueFromOption(e))
                                        }),
                                        t
                                    },
                                    S.trackBy && t.$watchCollection(function() {
                                        return ni(d.$viewValue)
                                            ? d.$viewValue.map(function(e) {
                                                return S.getTrackByValue(e)
                                            })
                                            : void 0
                                    }, function() {
                                        d.$render()
                                    }))
                                    : ($.writeValue = function(e) {
                                        var t = x.getOptionFromViewValue(e);
                                        t && !t.disabled
                                            ? n[0].value !== t.selectValue && (w.remove(), b || m.remove(), n[0].value = t.selectValue, t.element.selected = !0, t.element.setAttribute("selected", "selected"))
                                            : null === e || b
                                                ? (w.remove(), b || n.prepend(m), n.val(""), m.prop("selected", !0), m.attr("selected", !0))
                                                : (b || m.remove(), n.prepend(w), n.val("?"), w.prop("selected", !0), w.attr("selected", !0))
                                    },
                                    $.readValue = function() {
                                        var e = x.selectValueMap[n.val()];
                                        return e && !e.disabled
                                            ? (b || m.remove(), w.remove(), x.getViewValueFromOption(e))
                                            : null
                                    },
                                    S.trackBy && t.$watch(function() {
                                        return S.getTrackByValue(d.$viewValue)
                                    }, function() {
                                        d.$render()
                                    })),
                                b
                                    ? (m.remove(), e(m)(t),
                                    m.removeClass("ng-scope"))
                                    : m = _r(a.cloneNode(!1)),
                                h(),
                                t.$watchCollection(S.getWatchables, h)
                            }
                        }
                    }
                }
            }
        ],
        ya = [
            "$locale",
            "$interpolate",
            "$log",
            function(e, t, n) {
                var r = /{}/g,
                    i = /^when(Minus)?(.+)$/;
                return {
                    link: function(a, s, u) {
                        function l(e) {
                            s.text(e || "")
                        }
                        var c,
                            f = u.count,
                            p = u.$attr.when && s.attr(u.$attr.when),
                            h = u.offset || 0,
                            $ = a.$eval(p) || {},
                            m = {},
                            v = t.startSymbol(),
                            y = t.endSymbol(),
                            b = v + f + "-" + h + y,
                            w = Zr.noop;
                        o(u, function(e, t) {
                            var n = i.exec(t);
                            n && (n = (n[1]
                                ? "-"
                                : "") + Hr(n[2]), $[n] = s.attr(u.$attr[t]))
                        }),
                        o($, function(e, n) {
                            m[n] = t(e.replace(r, b))
                        }),
                        a.$watch(f, function(t) {
                            var r = parseFloat(t),
                                i = isNaN(r);
                            i || r in $ || (r = e.pluralCat(r - h)),
                            r === c || i && S(c) && isNaN(c) || (w(), i = m[r], g(i)
                                ? (null != t && n.debug("ngPluralize: no rule defined for '" + r + "' in " + p), w = d, l())
                                : w = a.$watch(i, l), c = r)
                        })
                    }
                }
            }
        ],
        ba = [
            "$parse",
            "$animate",
            function(e, a) {
                var s = r("ngRepeat"),
                    u = function(e, t, n, r, i, o, a) {
                        e[n] = r,
                        i && (e[i] = o),
                        e.$index = t,
                        e.$first = 0 === t,
                        e.$last = t === a - 1,
                        e.$middle = !(e.$first || e.$last),
                        e.$odd = !(e.$even = 0 === (1 & t))
                    };
                return {
                    restrict: "A",
                    multiElement: !0,
                    transclude: "element",
                    priority: 1e3,
                    terminal: !0,
                    $$tlb: !0,
                    compile: function(r, l) {
                        var c = l.ngRepeat,
                            f = t.createComment(" end ngRepeat: " + c + " "),
                            p = c.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                        if (!p)
                            throw s("iexp", c);
                        var h = p[1],
                            d = p[2],
                            $ = p[3],
                            m = p[4],
                            p = h.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
                        if (!p)
                            throw s("iidexp", h);
                        var v = p[3] || p[1],
                            g = p[2];
                        if ($ && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test($) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test($)))
                            throw s("badident", $);
                        var y,
                            b,
                            w,
                            x,
                            S = {
                                $id: Rt
                            };
                        return m
                            ? y = e(m)
                            : (w = function(e, t) {
                                return Rt(t)
                            },
                            x = function(e) {
                                return e
                            }),
                        function(e, t, r, l, p) {
                            y && (b = function(t, n, r) {
                                return g && (S[g] = t),
                                S[v] = n,
                                S.$index = r,
                                y(e, S)
                            });
                            var h = lt();
                            e.$watchCollection(d, function(r) {
                                var l,
                                    d,
                                    m,
                                    y,
                                    S,
                                    C,
                                    E,
                                    A,
                                    k,
                                    O,
                                    T = t[0],
                                    P = lt();
                                if ($ && (e[$] = r), i(r))
                                    A = r,
                                    d = b || w;
                                else
                                    for (O in d = b || x, A = [], r)
                                        zr.call(r, O) && "$" !== O.charAt(0) && A.push(O);
                            for (y = A.length, O = Array(y), l = 0; y > l; l++)
                                    if (S = r === A
                                        ? l
                                        : A[l], C = r[S], E = d(S, C, l), h[E])
                                        k = h[E],
                                        delete h[E],
                                        P[E] = k,
                                        O[l] = k;
                                    else {
                                        if (P[E])
                                            throw o(O, function(e) {
                                                e && e.scope && (h[e.id] = e)
                                            }),
                                            s("dupes", c, E, C);
                                        O[l] = {
                                            id: E,
                                            scope: n,
                                            clone: n
                                        },
                                        P[E] = !0
                                    }
                                for (m in h) {
                                    if (k = h[m], E = ut(k.clone), a.leave(E), E[0].parentNode)
                                        for (l = 0, d = E.length; d > l; l++)
                                            E[l].$$NG_REMOVED = !0;
                                k.scope.$destroy()
                                }
                                for (l = 0; y > l; l++)
                                    if (S = r === A
                                        ? l
                                        : A[l], C = r[S], k = O[l], k.scope) {
                                        m = T;
                                        do
                                            m = m.nextSibling;
                                        while (m && m.$$NG_REMOVED);
                                        k.clone[0] != m && a.move(ut(k.clone), null, _r(T)),
                                        T = k.clone[k.clone.length - 1],
                                        u(k.scope, l, v, C, g, S, y)
                                    }
                                else
                                    p(function(e, t) {
                                        k.scope = t;
                                        var n = f.cloneNode(!1);
                                        e[e.length++] = n,
                                        a.enter(e, null, _r(T)),
                                        T = n,
                                        k.clone = e,
                                        P[k.id] = k,
                                        u(k.scope, l, v, C, g, S, y)
                                    });
                                h = P
                            })
                        }
                    }
                }
            }
        ],
        wa = [
            "$animate",
            function(e) {
                return {
                    restrict: "A",
                    multiElement: !0,
                    link: function(t, n, r) {
                        t.$watch(r.ngShow, function(t) {
                            e[t
                                    ? "removeClass"
                                    : "addClass"](n, "ng-hide", {tempClasses: "ng-hide-animate"})
                        })
                    }
                }
            }
        ],
        xa = [
            "$animate",
            function(e) {
                return {
                    restrict: "A",
                    multiElement: !0,
                    link: function(t, n, r) {
                        t.$watch(r.ngHide, function(t) {
                            e[t
                                    ? "addClass"
                                    : "removeClass"](n, "ng-hide", {tempClasses: "ng-hide-animate"})
                        })
                    }
                }
            }
        ],
        Sa = Or(function(e, t, n) {
            e.$watch(n.ngStyle, function(e, n) {
                n && e !== n && o(n, function(e, n) {
                    t.css(n, "")
                }),
                e && t.css(e)
            }, !0)
        }),
        Ca = [
            "$animate",
            function(e) {
                return {
                    require: "ngSwitch",
                    controller: [
                        "$scope",
                        function() {
                            this.cases = {}
                        }
                    ],
                    link: function(n, r, i, a) {
                        var s = [],
                            u = [],
                            l = [],
                            c = [],
                            f = function(e, t) {
                                return function() {
                                    e.splice(t, 1)
                                }
                            };
                        n.$watch(i.ngSwitch || i.on, function(n) {
                            var r,
                                i;
                            for (r = 0, i = l.length; i > r; ++r)
                                e.cancel(l[r]);
                            for (r = l.length = 0, i = c.length; i > r; ++r) {
                                var p = ut(u[r].clone);
                                c[r].$destroy(),
                                (l[r] = e.leave(p)).then(f(l, r))
                            }
                            u.length = 0,
                            c.length = 0,
                            (s = a.cases["!" + n] || a.cases["?"]) && o(s, function(n) {
                                n.transclude(function(r, i) {
                                    c.push(i);
                                    var o = n.element;
                                    r[r.length++] = t.createComment(" end ngSwitchWhen: "),
                                    u.push({clone: r}),
                                    e.enter(r, o.parent(), o)
                                })
                            })
                        })
                    }
                }
            }
        ],
        Ea = Or({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(e, t, n, r, i) {
                r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [],
                r.cases["!" + n.ngSwitchWhen].push({transclude: i, element: t})
            }
        }),
        Aa = Or({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(e, t, n, r, i) {
                r.cases["?"] = r.cases["?"] || [],
                r.cases["?"].push({transclude: i, element: t})
            }
        }),
        ka = Or({
            restrict: "EAC",
            link: function(e, t, n, i, o) {
                if (!o)
                    throw r("ngTransclude")("orphan", z(t));
                o(function(e) {
                    t.empty(),
                    t.append(e)
                })
            }
        }),
        Oa = [
            "$templateCache",
            function(e) {
                return {
                    restrict: "E",
                    terminal: !0,
                    compile: function(t, n) {
                        "text/ng-template" == n.type && e.put(n.id, t[0].text)
                    }
                }
            }
        ],
        Ta = {
            $setViewValue: d,
            $render: d
        },
        Pa = [
            "$element",
            "$scope",
            "$attrs",
            function(e, r) {
                var i = this,
                    o = new It;
                i.ngModelCtrl = Ta,
                i.unknownOption = _r(t.createElement("option")),
                i.renderUnknownOption = function(t) {
                    t = "? " + Rt(t) + " ?",
                    i.unknownOption.val(t),
                    e.prepend(i.unknownOption),
                    e.val(t)
                },
                r.$on("$destroy", function() {
                    i.renderUnknownOption = d
                }),
                i.removeUnknownOption = function() {
                    i.unknownOption.parent() && i.unknownOption.remove()
                },
                i.readValue = function() {
                    return i.removeUnknownOption(),
                    e.val()
                },
                i.writeValue = function(t) {
                    i.hasOption(t)
                        ? (i.removeUnknownOption(), e.val(t), "" === t && i.emptyOption.prop("selected", !0))
                        : null == t && i.emptyOption
                            ? (i.removeUnknownOption(), e.val(""))
                            : i.renderUnknownOption(t)
                },
                i.addOption = function(e, t) {
                    at(e, '"option value"'),
                    "" === e && (i.emptyOption = t);
                    var n = o.get(e) || 0;
                    o.put(e, n + 1),
                    i.ngModelCtrl.$render(),
                    t[0].hasAttribute("selected") && (t[0].selected = !0)
                },
                i.removeOption = function(e) {
                    var t = o.get(e);
                    t && (1 === t
                        ? (o.remove(e), "" === e && (i.emptyOption = n))
                        : o.put(e, t - 1))
                },
                i.hasOption = function(e) {
                    return !!o.get(e)
                },
                i.registerOption = function(e, t, n, r, o) {
                    if (r) {
                        var a;
                        n.$observe("value", function(e) {
                            y(a) && i.removeOption(a),
                            a = e,
                            i.addOption(e, t)
                        })
                    } else
                        o
                            ? e.$watch(o, function(e, r) {
                                n.$set("value", e),
                                r !== e && i.removeOption(r),
                                i.addOption(e, t)
                            })
                            : i.addOption(n.value, t);
                    t.on("$destroy", function() {
                        i.removeOption(n.value),
                        i.ngModelCtrl.$render()
                    })
                }
            }
        ],
        Va = function() {
            return {
                restrict: "E",
                require: [
                    "select", "?ngModel"
                ],
                controller: Pa,
                priority: 1,
                link: {
                    pre: function(e, t, n, r) {
                        var i = r[1];
                        if (i) {
                            var a = r[0];
                            if (a.ngModelCtrl = i, i.$render = function() {
                                a.writeValue(i.$viewValue)
                            },
                            t.on("change", function() {
                                e.$apply(function() {
                                    i.$setViewValue(a.readValue())
                                })
                            }),
                            n.multiple) {
                                a.readValue = function() {
                                    var e = [];
                                    return o(t.find("option"), function(t) {
                                        t.selected && e.push(t.value)
                                    }),
                                    e
                                },
                                a.writeValue = function(e) {
                                    var n = new It(e);
                                    o(t.find("option"), function(e) {
                                        e.selected = y(n.get(e.value))
                                    })
                                };
                                var s,
                                    u = 0 / 0;
                                e.$watch(function() {
                                    u !== i.$viewValue || I(s, i.$viewValue) || (s = R(i.$viewValue), i.$render()),
                                    u = i.$viewValue
                                }),
                                i.$isEmpty = function(e) {
                                    return !e || 0 === e.length
                                }
                            }
                        }
                    }
                }
            }
        },
        Ma = [
            "$interpolate",
            function(e) {
                return {
                    restrict: "E",
                    priority: 100,
                    compile: function(t, n) {
                        if (y(n.value))
                            var r = e(n.value, !0);
                        else {
                            var i = e(t.text(), !0);
                            i || n.$set("value", t.text())
                        }
                        return function(e, t, n) {
                            var o = t.parent();
                            (o = o.data("$selectController") || o.parent().data("$selectController")) && o.registerOption(e, t, n, r, i)
                        }
                    }
                }
            }
        ],
        Da = m({
            restrict: "E",
            terminal: !1
        }),
        ja = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, n, r) {
                    r && (n.required = !0, r.$validators.required = function(e, t) {
                        return !n.required || !r.$isEmpty(t)
                    },
                    n.$observe("required", function() {
                        r.$validate()
                    }))
                }
            }
        },
        Na = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, i, o) {
                    if (o) {
                        var a,
                            s = i.ngPattern || i.pattern;
                        i.$observe("pattern", function(e) {
                            if (x(e) && 0 < e.length && (e = new RegExp("^" + e + "$")), e && !e.test)
                                throw r("ngPattern")("noregexp", s, e, z(t));
                            a = e || n,
                            o.$validate()
                        }),
                        o.$validators.pattern = function(e, t) {
                            return o.$isEmpty(t) || g(a) || a.test(t)
                        }
                    }
                }
            }
        },
        Ra = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, n, r) {
                    if (r) {
                        var i = -1;
                        n.$observe("maxlength", function(e) {
                            e = p(e),
                            i = isNaN(e)
                                ? -1
                                : e,
                            r.$validate()
                        }),
                        r.$validators.maxlength = function(e, t) {
                            return 0 > i || r.$isEmpty(t) || t.length <= i
                        }
                    }
                }
            }
        },
        Ia = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(e, t, n, r) {
                    if (r) {
                        var i = 0;
                        n.$observe("minlength", function(e) {
                            i = p(e) || 0,
                            r.$validate()
                        }),
                        r.$validators.minlength = function(e, t) {
                            return r.$isEmpty(t) || t.length >= i
                        }
                    }
                }
            }
        };
    e.angular.bootstrap
        ? console.log("WARNING: Tried to load angular more than once.")
        : (rt(), ft(Zr), Zr.module("ngLocale", [], [
            "$provide",
            function(e) {
                function t(e) {
                    e += "";
                    var t = e.indexOf(".");
                    return -1 == t
                        ? 0
                        : e.length - t - 1
                }
                e.value("$locale", {
                    DATETIME_FORMATS: {
                        AMPMS: [
                            "AM", "PM"
                        ],
                        DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                        ERANAMES: [
                            "Before Christ", "Anno Domini"
                        ],
                        ERAS: [
                            "BC", "AD"
                        ],
                        FIRSTDAYOFWEEK: 6,
                        MONTH: "January February March April May June July August September October November December".split(" "),
                        SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                        SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                        WEEKENDRANGE: [
                            5, 6
                        ],
                        fullDate: "EEEE, MMMM d, y",
                        longDate: "MMMM d, y",
                        medium: "MMM d, y h:mm:ss a",
                        mediumDate: "MMM d, y",
                        mediumTime: "h:mm:ss a",
                        "short": "M/d/yy h:mm a",
                        shortDate: "M/d/yy",
                        shortTime: "h:mm a"
                    },
                    NUMBER_FORMATS: {
                        CURRENCY_SYM: "$",
                        DECIMAL_SEP: ".",
                        GROUP_SEP: ",",
                        PATTERNS: [
                            {
                                gSize: 3,
                                lgSize: 3,
                                maxFrac: 3,
                                minFrac: 0,
                                minInt: 1,
                                negPre: "-",
                                negSuf: "",
                                posPre: "",
                                posSuf: ""
                            }, {
                                gSize: 3,
                                lgSize: 3,
                                maxFrac: 2,
                                minFrac: 2,
                                minInt: 1,
                                negPre: "-Â¤",
                                negSuf: "",
                                posPre: "Â¤",
                                posSuf: ""
                            }
                        ]
                    },
                    id: "en-us",
                    pluralCat: function(e, r) {
                        var i = 0 | e,
                            o = r;
                        return n === o && (o = Math.min(t(e), 3)),
                        Math.pow(10, o),
                        1 == i && 0 == o
                            ? "one"
                            : "other"
                    }
                })
            }
        ]), _r(t).ready(function() {
            Y(t, Z)
        }))
}(window, document),
!window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
var $sanitizeMinErr = angular.$$minErr("$sanitize"),
    START_TAG_REGEXP = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
    END_TAG_REGEXP = /^<\/\s*([\w:-]+)[^>]*>/,
    ATTR_REGEXP = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
    BEGIN_TAG_REGEXP = /^</,
    BEGING_END_TAGE_REGEXP = /^<\//,
    COMMENT_REGEXP = /<!--(.*?)-->/g,
    DOCTYPE_REGEXP = /<!DOCTYPE([^>]*?)>/i,
    CDATA_REGEXP = /<!\[CDATA\[(.*?)]]>/g,
    SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g,
    voidElements = makeMap("area,br,col,hr,img,wbr"),
    optionalEndTagBlockElements = makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
    optionalEndTagInlineElements = makeMap("rp,rt"),
    optionalEndTagElements = angular.extend({}, optionalEndTagInlineElements, optionalEndTagBlockElements),
    blockElements = angular.extend({}, optionalEndTagBlockElements, makeMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
    inlineElements = angular.extend({}, optionalEndTagInlineElements, makeMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
    svgElements = makeMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"),
    specialElements = makeMap("script,style"),
    validElements = angular.extend({}, voidElements, blockElements, inlineElements, optionalEndTagElements, svgElements),
    uriAttrs = makeMap("background,cite,href,longdesc,src,usemap,xlink:href"),
    htmlAttrs = makeMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
    svgAttrs = makeMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0),
    validAttrs = angular.extend({}, uriAttrs, svgAttrs, htmlAttrs),
    hiddenPre = document.createElement("pre");
angular.module("ngSanitize", []).provider("$sanitize", $SanitizeProvider),
function(e, t) {
    "use strict";
    function n(e, t, n) {
        if (!e)
            throw ngMinErr("areq", t || "?", n || "required");
        return e
    }
    function r(e, t) {
        return e || t
            ? e
                ? t
                    ? (I(e) && (e = e.join(" ")), I(t) && (t = t.join(" ")), e + " " + t)
                    : e
                : t
            : ""
    }
    function i(e) {
        var t = {};
        return e && (e.to || e.from) && (t.to = e.to, t.from = e.from),
        t
    }
    function o(e, t, n) {
        var r = "";
        return e = I(e)
            ? e
            : e && F(e) && e.length
                ? e.split(/\s+/)
                : [],
        R(e, function(e, i) {
            e && 0 < e.length && (r += i > 0
                ? " "
                : "", r += n
                ? t + e
                : e + t)
        }),
        r
    }
    function a(e) {
        if (e instanceof N)
            switch (e.length) {
                case 0:
                    return [];
                case 1:
                    if (1 === e[0].nodeType)
                        return e;
                    break;
                default:
                    return N(s(e))
            }
        return 1 === e.nodeType
            ? N(e)
            : void 0
    }
    function s(e) {
        if (!e[0])
            return e;
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (1 == n.nodeType)
                return n
        }
    }
    function u(e, t, n) {
        R(t, function(t) {
            e.addClass(t, n)
        })
    }
    function l(e, t, n) {
        R(t, function(t) {
            e.removeClass(t, n)
        })
    }
    function c(e) {
        return function(t, n) {
            n.addClass && (u(e, t, n.addClass), n.addClass = null),
            n.removeClass && (l(e, t, n.removeClass), n.removeClass = null)
        }
    }
    function f(e) {
        if (e = e || {}, !e.$$prepared) {
            var t = e.domOperation || D;
            e.domOperation = function() {
                e.$$domOperationFired = !0,
                t(),
                t = D
            },
            e.$$prepared = !0
        }
        return e
    }
    function p(e, t) {
        h(e, t),
        d(e, t)
    }
    function h(e, t) {
        t.from && (e.css(t.from), t.from = null)
    }
    function d(e, t) {
        t.to && (e.css(t.to), t.to = null)
    }
    function $(e, t, n) {
        var r = (t.addClass || "") + " " + (n.addClass || ""),
            i = (t.removeClass || "") + " " + (n.removeClass || "");
        return e = m(e.attr("class"), r, i),
        n.preparationClasses && (t.preparationClasses = x(n.preparationClasses, t.preparationClasses), delete n.preparationClasses),
        r = t.domOperation !== D
            ? t.domOperation
            : null,
        j(t, n),
        r && (t.domOperation = r),
        t.addClass = e.addClass
            ? e.addClass
            : null,
        t.removeClass = e.removeClass
            ? e.removeClass
            : null,
        t
    }
    function m(e, t, n) {
        function r(e) {
            F(e) && (e = e.split(" "));
            var t = {};
            return R(e, function(e) {
                e.length && (t[e] = !0)
            }),
            t
        }
        var i = {};
        e = r(e),
        t = r(t),
        R(t, function(e, t) {
            i[t] = 1
        }),
        n = r(n),
        R(n, function(e, t) {
            i[t] = 1 === i[t]
                ? null
                : -1
        });
        var o = {
            addClass: "",
            removeClass: ""
        };
        return R(i, function(t, n) {
            var r,
                i;
            1 === t
                ? (r = "addClass", i = !e[n])
                : -1 === t && (r = "removeClass", i = e[n]),
            i && (o[r].length && (o[r] += " "), o[r] += n)
        }),
        o
    }
    function v(e) {
        return e instanceof t.element
            ? e[0]
            : e
    }
    function g(e, t, n) {
        var r = "";
        t && (r = o(t, "ng-", !0)),
        n.addClass && (r = x(r, o(n.addClass, "-add"))),
        n.removeClass && (r = x(r, o(n.removeClass, "-remove"))),
        r.length && (n.preparationClasses = r, e.addClass(r))
    }
    function y(e, t) {
        var n = t
            ? "-" + t + "s"
            : "";
        return w(e, [G, n]),
        [G, n]
    }
    function b(e, t) {
        var n = t
                ? "paused"
                : "",
            r = V + "PlayState";
        return w(e, [r, n]),
        [r, n]
    }
    function w(e, t) {
        e.style[t[0]] = t[1]
    }
    function x(e, t) {
        return e
            ? t
                ? e + " " + t
                : e
            : t
    }
    function S(e, t, n) {
        var r = Object.create(null),
            i = e.getComputedStyle(t) || {};
        return R(n, function(e, t) {
            var n = i[e];
            if (n) {
                var o = n.charAt(0);
                ("-" === o || "+" === o || o >= 0) && (n = C(n)),
                0 === n && (n = null),
                r[t] = n
            }
        }),
        r
    }
    function C(e) {
        var t = 0;
        return e = e.split(/\s*,\s*/),
        R(e, function(e) {
            "s" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)),
            e = parseFloat(e) || 0,
            t = t
                ? Math.max(e, t)
                : e
        }),
        t
    }
    function E(e) {
        return 0 === e || null != e
    }
    function A(e, t) {
        var n = T,
            r = e + "s";
        return t
            ? n += "Duration"
            : r += " linear all",
        [n, r]
    }
    function k() {
        var e = Object.create(null);
        return {
            flush: function() {
                e = Object.create(null)
            },
            count: function(t) {
                return (t = e[t])
                    ? t.total
                    : 0
            },
            get: function(t) {
                return (t = e[t]) && t.value
            },
            put: function(t, n) {
                e[t]
                    ? e[t].total ++: e[t] = {
                        total: 1,
                        value: n
                    }
            }
        }
    }
    function O(e, t, n) {
        R(n, function(n) {
            e[n] = U(e[n])
                ? e[n]
                : t.style.getPropertyValue(n)
        })
    }
    var T,
        P,
        V,
        M,
        D = t.noop,
        j = t.extend,
        N = t.element,
        R = t.forEach,
        I = t.isArray,
        F = t.isString,
        q = t.isObject,
        _ = t.isUndefined,
        U = t.isDefined,
        B = t.isFunction,
        L = t.isElement;
    _(e.ontransitionend) && U(e.onwebkittransitionend)
        ? (T = "WebkitTransition", P = "webkitTransitionEnd transitionend")
        : (T = "transition", P = "transitionend"),
    _(e.onanimationend) && U(e.onwebkitanimationend)
        ? (V = "WebkitAnimation", M = "webkitAnimationEnd animationend")
        : (V = "animation", M = "animationend");
    var H = V + "Delay",
        z = V + "Duration",
        G = T + "Delay";
    e = T + "Duration";
    var W = {
            transitionDuration: e,
            transitionDelay: G,
            transitionProperty: T + "Property",
            animationDuration: z,
            animationDelay: H,
            animationIterationCount: V + "IterationCount"
        },
        X = {
            transitionDuration: e,
            transitionDelay: G,
            animationDuration: z,
            animationDelay: H
        };
    t.module("ngAnimate", []).directive("ngAnimateChildren", [function() {
            return function(e, n, r) {
                e = r.ngAnimateChildren,
                t.isString(e) && 0 === e.length
                    ? n.data("$$ngAnimateChildren", !0)
                    : r.$observe("ngAnimateChildren", function(e) {
                        n.data("$$ngAnimateChildren", "on" === e || "true" === e)
                    })
            }
        }
    ]).factory("$$rAFScheduler", [
        "$$rAF",
        function(e) {
            function t(e) {
                r = r.concat(e),
                n()
            }
            function n() {
                if (r.length) {
                    for (var t = r.shift(), o = 0; o < t.length; o++)
                        t[o]();
                    i || e(function() {
                        i || n()
                    })
                }
            }
            var r,
                i;
            return r = t.queue = [],
            t.waitUntilQuiet = function(t) {
                i && i(),
                i = e(function() {
                    i = null,
                    t(),
                    n()
                })
            },
            t
        }
    ]).factory("$$AnimateRunner", [
        "$q",
        "$sniffer",
        "$$animateAsyncRun",
        function(e, t, n) {
            function r(e) {
                this.setHost(e),
                this._doneCallbacks = [],
                this._runInAnimationFrame = n(),
                this._state = 0
            }
            return r.chain = function(e, t) {
                function n() {
                    r === e.length
                        ? t(!0)
                        : e[r](function(e) {
                            !1 === e
                                ? t(!1)
                                : (r++, n())
                        })
                }
                var r = 0;
                n()
            },
            r.all = function(e, t) {
                function n(n) {
                    i = i && n,
                    ++r === e.length && t(i)
                }
                var r = 0,
                    i = !0;
                R(e, function(e) {
                    e.done(n)
                })
            },
            r.prototype = {
                setHost: function(e) {
                    this.host = e || {}
                },
                done: function(e) {
                    2 === this._state
                        ? e()
                        : this._doneCallbacks.push(e)
                },
                progress: D,
                getPromise: function() {
                    if (!this.promise) {
                        var t = this;
                        this.promise = e(function(e, n) {
                            t.done(function(t) {
                                !1 === t
                                    ? n()
                                    : e()
                            })
                        })
                    }
                    return this.promise
                },
                then: function(e, t) {
                    return this.getPromise().then(e, t)
                },
                "catch": function(e) {
                    return this.getPromise()["catch"](e)
                },
                "finally": function(e) {
                    return this.getPromise()["finally"](e)
                },
                pause: function() {
                    this.host.pause && this.host.pause()
                },
                resume: function() {
                    this.host.resume && this.host.resume()
                },
                end: function() {
                    this.host.end && this.host.end(),
                    this._resolve(!0)
                },
                cancel: function() {
                    this.host.cancel && this.host.cancel(),
                    this._resolve(!1)
                },
                complete: function(e) {
                    var t = this;
                    0 === t._state && (t._state = 1, t._runInAnimationFrame(function() {
                        t._resolve(e)
                    }))
                },
                _resolve: function(e) {
                    2 !== this._state && (R(this._doneCallbacks, function(t) {
                        t(e)
                    }), this._doneCallbacks.length = 0, this._state = 2)
                }
            },
            r
        }
    ]).factory("$$animateAsyncRun", [
        "$$rAF",
        function(e) {
            function t(t) {
                n.push(t),
                1 < n.length || e(function() {
                    for (var e = 0; e < n.length; e++)
                        n[e]();
                    n = []
                })
            }
            var n = [];
            return function() {
                var e = !1;
                return t(function() {
                    e = !0
                }),
                function(n) {
                    e
                        ? n()
                        : t(n)
                }
            }
        }
    ]).provider("$$animateQueue", [
        "$animateProvider",
        function(e) {
            function t(e, t, n, r) {
                return i[e].some(function(e) {
                    return e(t, n, r)
                })
            }
            function r(e, t) {
                e = e || {};
                var n = 0 < (e.addClass || "").length,
                    r = 0 < (e.removeClass || "").length;
                return t
                    ? n && r
                    : n || r
            }
            var i = this.rules = {
                skip: [],
                cancel: [],
                join: []
            };
            i.join.push(function(e, t) {
                return !t.structural && r(t.options)
            }),
            i.skip.push(function(e, t) {
                return !t.structural && !r(t.options)
            }),
            i.skip.push(function(e, t, n) {
                return "leave" == n.event && t.structural
            }),
            i.skip.push(function(e, t, n) {
                return n.structural && 2 === n.state && !t.structural
            }),
            i.cancel.push(function(e, t, n) {
                return n.structural && t.structural
            }),
            i.cancel.push(function(e, t, n) {
                return 2 === n.state && t.structural
            }),
            i.cancel.push(function(e, t, n) {
                return e = t.options,
                n = n.options,
                e.addClass && e.addClass === n.removeClass || e.removeClass && e.removeClass === n.addClass
            }),
            this.$get = [
                "$$rAF",
                "$rootScope",
                "$rootElement",
                "$document",
                "$$HashMap",
                "$$animation",
                "$$AnimateRunner",
                "$templateRequest",
                "$$jqLite",
                "$$forceReflow",
                function(i, o, u, l, h, d, m, y, b) {
                    function w() {
                        var e = !1;
                        return function(t) {
                            e
                                ? t()
                                : o.$$postDigest(function() {
                                    e = !0,
                                    t()
                                })
                        }
                    }
                    function x(e, t, n) {
                        var r = v(t),
                            i = v(e),
                            o = [];
                        return (e = D[n]) && R(e, function(e) {
                            e.node.contains(r)
                                ? o.push(e.callback)
                                : "leave" === n && e.node.contains(i) && o.push(e.callback)
                        }),
                        o
                    }
                    function S(e, n, s) {
                        function u(t, n, r, o) {
                            b(function() {
                                var t = x(h, e, n);
                                t.length && i(function() {
                                    R(t, function(t) {
                                        t(e, r, o)
                                    })
                                })
                            }),
                            t.progress(n, r, o)
                        }
                        function l(t) {
                            var n = e,
                                r = s;
                            r.preparationClasses && (n.removeClass(r.preparationClasses), r.preparationClasses = null),
                            r.activeClasses && (n.removeClass(r.activeClasses), r.activeClasses = null),
                            z(e, s),
                            p(e, s),
                            s.domOperation(),
                            y.complete(!t)
                        }
                        var c,
                            h;
                        (e = a(e)) && (c = v(e), h = e.parent()),
                        s = f(s);
                        var y = new m,
                            b = w();
                        if (I(s.addClass) && (s.addClass = s.addClass.join(" ")), s.addClass && !F(s.addClass) && (s.addClass = null), I(s.removeClass) && (s.removeClass = s.removeClass.join(" ")), s.removeClass && !F(s.removeClass) && (s.removeClass = null), s.from && !q(s.from) && (s.from = null), s.to && !q(s.to) && (s.to = null), !c)
                            return l(),
                            y;
                        var S = [c.className, s.addClass, s.removeClass].join(" ");
                        if (!H(S))
                            return l(),
                            y;
                        var A = 0 <= ["enter", "move", "leave"].indexOf(n),
                            M = !V || P.get(c),
                            S = !M && T.get(c) || {},
                            D = !!S.state;
                        if (M || D && 1 == S.state || (M = !k(e, h, n)), M)
                            return l(),
                            y;
                        if (A && C(e), M = {
                            structural: A,
                            element: e,
                            event: n,
                            close: l,
                            options: s,
                            runner: y
                        }, D) {
                            if (t("skip", e, M, S))
                                return 2 === S.state
                                    ? (l(), y)
                                    : ($(e, S.options, s), S.runner);
                            if (t("cancel", e, M, S))
                                if (2 === S.state)
                                    S.runner.end();
                                else {
                                    if (!S.structural)
                                        return $(e, S.options, M.options),
                                        S.runner;
                                    S.close()
                                }
                            else if (t("join", e, M, S)) {
                                if (2 !== S.state)
                                    return g(e, A
                                        ? n
                                        : null, s),
                                    n = M.event = S.event,
                                    s = $(e, S.options, M.options),
                                    S.runner;
                                $(e, s, {})
                            }
                        } else
                            $(e, s, {});
                        if ((D = M.structural) || (D = "animate" === M.event && 0 < Object.keys(M.options.to || {}).length || r(M.options)), !D)
                            return l(),
                            E(e),
                            y;
                        var j = (S.counter || 0) + 1;
                        return M.counter = j,
                        O(e, 1, M),
                        o.$$postDigest(function() {
                            var t = T.get(c),
                                i = !t,
                                t = t || {},
                                o = 0 < (e.parent() || []).length && ("animate" === t.event || t.structural || r(t.options));
                            i || t.counter !== j || !o
                                ? (i && (z(e, s), p(e, s)), (i || A && t.event !== n) && (s.domOperation(), y.end()), o || E(e))
                                : (n = !t.structural && r(t.options, !0)
                                    ? "setClass"
                                    : t.event, O(e, 2), t = d(e, n, t.options), t.done(function(t) {
                                    l(!t),
                                    (t = T.get(c)) && t.counter === j && E(v(e)),
                                    u(y, n, "close", {})
                                }), y.setHost(t), u(y, n, "start", {}))
                        }),
                        y
                    }
                    function C(e) {
                        e = v(e).querySelectorAll("[data-ng-animate]"),
                        R(e, function(e) {
                            var t = parseInt(e.getAttribute("data-ng-animate")),
                                n = T.get(e);
                            switch (t) {
                                case 2:
                                    n.runner.end();
                                case 1:
                                    n && T.remove(e)
                            }
                        })
                    }
                    function E(e) {
                        e = v(e),
                        e.removeAttribute("data-ng-animate"),
                        T.remove(e)
                    }
                    function A(e, t) {
                        return v(e) === v(t)
                    }
                    function k(e, t, n) {
                        n = N(l[0].body);
                        var r,
                            i = A(e, n) || "HTML" === e[0].nodeName,
                            o = A(e, u),
                            a = !1;
                        for ((e = e.data("$ngAnimatePin")) && (t = e); t && t.length && (o || (o = A(t, u)), e = t[0], 1 === e.nodeType);) {
                            var s = T.get(e) || {};
                            if (a || (a = s.structural || P.get(e)), (_(r) || !0 === r) && (e = t.data("$$ngAnimateChildren"), U(e) && (r = e)), a && !1 === r)
                                break;
                            o || (o = A(t, u), o || (e = t.data("$ngAnimatePin")) && (t = e)),
                            i || (i = A(t, n)),
                            t = t.parent()
                        }
                        return (!a || r) && o && i
                    }
                    function O(e, t, n) {
                        n = n || {},
                        n.state = t,
                        e = v(e),
                        e.setAttribute("data-ng-animate", t),
                        n = (t = T.get(e))
                            ? j(t, n)
                            : n,
                        T.put(e, n)
                    }
                    var T = new h,
                        P = new h,
                        V = null,
                        M = o.$watch(function() {
                            return 0 === y.totalPendingRequests
                        }, function(e) {
                            e && (M(), o.$$postDigest(function() {
                                o.$$postDigest(function() {
                                    null === V && (V = !0)
                                })
                            }))
                        }),
                        D = {},
                        B = e.classNameFilter(),
                        H = B
                            ? function(e) {
                                return B.test(e)
                            }
                            : function() {
                                return !0
                            },
                        z = c(b);
                    return {
                        on: function(e, t, n) {
                            t = s(t),
                            D[e] = D[e] || [],
                            D[e].push({node: t, callback: n})
                        },
                        off: function(e, t, n) {
                            function r(e, t, n) {
                                var r = s(t);
                                return e.filter(function(e) {
                                    return !(e.node === r && (!n || e.callback === n))
                                })
                            }
                            var i = D[e];
                            i && (D[e] = 1 === arguments.length
                                ? null
                                : r(i, t, n))
                        },
                        pin: function(e, t) {
                            n(L(e), "element", "not an element"),
                            n(L(t), "parentElement", "not an element"),
                            e.data("$ngAnimatePin", t)
                        },
                        push: function(e, t, n, r) {
                            return n = n || {},
                            n.domOperation = r,
                            S(e, t, n)
                        },
                        enabled: function(e, t) {
                            var n = arguments.length;
                            if (0 === n)
                                t = !!V;
                            else if (L(e)) {
                                var r = v(e),
                                    i = P.get(r);
                                1 === n
                                    ? t = !i
                                    : (t = !!t)
                                        ? i && P.remove(r)
                                        : P.put(r, !0)
                            } else
                                t = V = !!e;
                            return t
                        }
                    }
                }
            ]
        }
    ]).provider("$$animation", [
        "$animateProvider",
        function() {
            function e(e) {
                return e.data("$$animationRunner")
            }
            var t = this.drivers = [];
            this.$get = [
                "$$jqLite",
                "$rootScope",
                "$injector",
                "$$AnimateRunner",
                "$$HashMap",
                "$$rAFScheduler",
                function(n, i, o, a, s, u) {
                    function l(e) {
                        function t(e) {
                            if (e.processed)
                                return e;
                            e.processed = !0;
                            var n = e.domNode,
                                o = n.parentNode;
                            i.put(n, e);
                            for (var a; o;) {
                                if (a = i.get(o)) {
                                    a.processed || (a = t(a));
                                    break
                                }
                                o = o.parentNode
                            }
                            return (a || r).children.push(e),
                            e
                        }
                        var n,
                            r = {
                                children: []
                            },
                            i = new s;
                        for (n = 0; n < e.length; n++) {
                            var o = e[n];
                            i.put(o.domNode, e[n] = {
                                domNode: o.domNode,
                                fn: o.fn,
                                children: []
                            })
                        }
                        for (n = 0; n < e.length; n++)
                            t(e[n]);
                        return function(e) {
                            var t,
                                n = [],
                                r = [];
                            for (t = 0; t < e.children.length; t++)
                                r.push(e.children[t]);
                            e = r.length;
                            var i = 0,
                                o = [];
                            for (t = 0; t < r.length; t++) {
                                var a = r[t];
                                0 >= e && (e = i, i = 0, n.push(o), o = []),
                                o.push(a.fn),
                                a.children.forEach(function(e) {
                                    i++,
                                    r.push(e)
                                }),
                                e--
                            }
                            return o.length && n.push(o),
                            n
                        }(r)
                    }
                    var h = [],
                        d = c(n);
                    return function(s, c, $) {
                        function m(e) {
                            e = e.hasAttribute("ng-animate-ref")
                                ? [e]
                                : e.querySelectorAll("[ng-animate-ref]");
                            var t = [];
                            return R(e, function(e) {
                                var n = e.getAttribute("ng-animate-ref");
                                n && n.length && t.push(e)
                            }),
                            t
                        }
                        function g(e) {
                            var t = [],
                                n = {};
                            R(e, function(e, r) {
                                var i = v(e.element),
                                    o = 0 <= ["enter", "move"].indexOf(e.event),
                                    i = e.structural
                                        ? m(i)
                                        : [];
                                if (i.length) {
                                    var a = o
                                        ? "to"
                                        : "from";
                                    R(i, function(e) {
                                        var t = e.getAttribute("ng-animate-ref");
                                        n[t] = n[t] || {},
                                        n[t][a] = {
                                            animationID: r,
                                            element: N(e)
                                        }
                                    })
                                } else
                                    t.push(e)
                            });
                            var r = {},
                                i = {};
                            return R(n, function(n) {
                                var o = n.from,
                                    a = n.to;
                                if (o && a) {
                                    var s = e[o.animationID],
                                        u = e[a.animationID],
                                        l = o.animationID.toString();
                                    if (!i[l]) {
                                        var c = i[l] = {
                                            structural: !0,
                                            beforeStart: function() {
                                                s.beforeStart(),
                                                u.beforeStart()
                                            },
                                            close: function() {
                                                s.close(),
                                                u.close()
                                            },
                                            classes: y(s.classes, u.classes),
                                            from: s,
                                            to: u,
                                            anchors: []
                                        };
                                        c.classes.length
                                            ? t.push(c)
                                            : (t.push(s), t.push(u))
                                    }
                                    i[l].anchors.push({out: o.element, "in": a.element})
                                } else
                                    o = o
                                        ? o.animationID
                                        : a.animationID,
                                    a = o.toString(),
                                    r[a] || (r[a] = !0, t.push(e[o]))
                            }),
                            t
                        }
                        function y(e, t) {
                            e = e.split(" "),
                            t = t.split(" ");
                            for (var n = [], r = 0; r < e.length; r++) {
                                var i = e[r];
                                if ("ng-" !== i.substring(0, 3))
                                    for (var o = 0; o < t.length; o++)
                                        if (i === t[o]) {
                                            n.push(i);
                                            break
                                        }
                                    }
                            return n.join(" ")
                        }
                        function b(e) {
                            for (var n = t.length - 1; n >= 0; n--) {
                                var r = t[n];
                                if (o.has(r) && (r = o.get(r)(e)))
                                    return r
                            }
                        }
                        function w(t, n) {
                            t.from && t.to
                                ? (e(t.from.element).setHost(n), e(t.to.element).setHost(n))
                                : e(t.element).setHost(n)
                        }
                        function x() {
                            var t = e(s);
                            !t || "leave" === c && $.$$domOperationFired || t.end()
                        }
                        function S(e) {
                            s.off("$destroy", x),
                            s.removeData("$$animationRunner"),
                            d(s, $),
                            p(s, $),
                            $.domOperation(),
                            k && n.removeClass(s, k),
                            s.removeClass("ng-animate"),
                            E.complete(!e)
                        }
                        $ = f($);
                        var C = 0 <= ["enter", "move", "leave"].indexOf(c),
                            E = new a({
                                end: function() {
                                    S()
                                },
                                cancel: function() {
                                    S(!0)
                                }
                            });
                        if (!t.length)
                            return S(),
                            E;
                        s.data("$$animationRunner", E);
                        var A = r(s.attr("class"), r($.addClass, $.removeClass)),
                            k = $.tempClasses;
                        return k && (A += " " + k, $.tempClasses = null),
                        h.push({
                            element: s,
                            classes: A,
                            event: c,
                            structural: C,
                            options: $,
                            beforeStart: function() {
                                s.addClass("ng-animate"),
                                k && n.addClass(s, k)
                            },
                            close: S
                        }),
                        s.on("$destroy", x),
                        1 < h.length
                            ? E
                            : (i.$$postDigest(function() {
                                var t = [];
                                R(h, function(n) {
                                    e(n.element)
                                        ? t.push(n)
                                        : n.close()
                                }),
                                h.length = 0;
                                var n = g(t),
                                    r = [];
                                R(n, function(t) {
                                    r.push({
                                        domNode: v(t.from
                                            ? t.from.element
                                            : t.element),
                                        fn: function() {
                                            t.beforeStart();
                                            var n,
                                                r = t.close;
                                            if (e(t.anchors
                                                ? t.from.element || t.to.element
                                                : t.element)) {
                                                var i = b(t);
                                                i && (n = i.start)
                                            }
                                            n
                                                ? (n = n(), n.done(function(e) {
                                                    r(!e)
                                                }), w(t, n))
                                                : r()
                                        }
                                    })
                                }),
                                u(l(r))
                            }), E)
                    }
                }
            ]
        }
    ]).provider("$animateCss", [
        "$animateProvider",
        function() {
            var e = k(),
                t = k();
            this.$get = [
                "$window",
                "$$jqLite",
                "$$AnimateRunner",
                "$timeout",
                "$$forceReflow",
                "$sniffer",
                "$$rAFScheduler",
                "$animate",
                function(n, r, a, s, u, l, $, m) {
                    function g(e, t) {
                        var n = e.parentNode;
                        return (n.$$ngAnimateParentKey || (n.$$ngAnimateParentKey = ++N)) + "-" + e.getAttribute("class") + "-" + t
                    }
                    function x(i, a, s, u) {
                        var l;
                        return 0 < e.count(s) && (l = t.get(s), l || (a = o(a, "-stagger"), r.addClass(i, a), l = S(n, i, u), l.animationDuration = Math.max(l.animationDuration, 0), l.transitionDuration = Math.max(l.transitionDuration, 0), r.removeClass(i, a), t.put(s, l))),
                        l || {}
                    }
                    function C(n) {
                        F.push(n),
                        $.waitUntilQuiet(function() {
                            e.flush(),
                            t.flush();
                            for (var n = u(), r = 0; r < F.length; r++)
                                F[r](n);
                            F.length = 0
                        })
                    }
                    function k(t, r, i) {
                        return r = e.get(i),
                        r || (r = S(n, t, W), "infinite" === r.animationIterationCount && (r.animationIterationCount = 1)),
                        e.put(i, r),
                        t = r,
                        i = t.animationDelay,
                        r = t.transitionDelay,
                        t.maxDelay = i && r
                            ? Math.max(i, r)
                            : i || r,
                        t.maxDuration = Math.max(t.animationDuration * t.animationIterationCount, t.transitionDuration),
                        t
                    }
                    var j = c(r),
                        N = 0,
                        F = [];
                    return function(t, n) {
                        function u() {
                            $()
                        }
                        function c() {
                            $(!0)
                        }
                        function $(e) {
                            U || L && B || (U = !0, B = !1, n.$$skipPreparationClasses || r.removeClass(t, at), r.removeClass(t, ut), b(_, !1), y(_, !1), R(et, function(e) {
                                _.style[e[0]] = ""
                            }), j(t, n), p(t, n), Object.keys(q).length && R(q, function(e, t) {
                                e
                                    ? _.style.setProperty(t, e)
                                    : _.style.removeProperty(t)
                            }), n.onDone && n.onDone(), W && W.complete(!e))
                        }
                        function S(e) {
                            dt.blockTransition && y(_, e),
                            dt.blockKeyframeAnimation && b(_, !!e)
                        }
                        function N() {
                            return W = new a({end: u, cancel: c}),
                            C(D),
                            $(), {
                                $$willAnimate: !1,
                                start: function() {
                                    return W
                                },
                                end: u
                            }
                        }
                        function F() {
                            function e() {
                                if (!U) {
                                    if (S(!1), R(et, function(e) {
                                        _.style[e[0]] = e[1]
                                    }), j(t, n), r.addClass(t, ut), dt.recalculateTimingStyles) {
                                        if (st = _.className + " " + at, lt = g(_, st), pt = k(_, st, lt), ht = pt.maxDelay, K = Math.max(ht, 0), Y = pt.maxDuration, 0 === Y)
                                            return $(),
                                            void 0;
                                        dt.hasTransitions = 0 < pt.transitionDuration,
                                        dt.hasAnimations = 0 < pt.animationDuration
                                    }
                                    if (dt.applyAnimationDelay && (ht = "boolean" != typeof n.delay && E(n.delay)
                                        ? parseFloat(n.delay)
                                        : ht, K = Math.max(ht, 0), pt.animationDelay = ht, $t = [
                                        H, ht + "s"
                                    ], et.push($t), _.style[$t[0]] = $t[1]), Q = 1e3 * K, Z = 1e3 * Y, n.easing) {
                                        var e,
                                            l = n.easing;
                                        dt.hasTransitions && (e = T + "TimingFunction", et.push([e, l]), _.style[e] = l),
                                        dt.hasAnimations && (e = V + "TimingFunction", et.push([e, l]), _.style[e] = l)
                                    }
                                    pt.transitionDuration && u.push(P),
                                    pt.animationDuration && u.push(M),
                                    a = Date.now();
                                    var c = Q + 1.5 * Z;
                                    e = a + c;
                                    var l = t.data("$$animateCss") || [],
                                        f = !0;
                                    if (l.length) {
                                        var p = l[0];
                                        (f = e > p.expectedEndTime)
                                            ? s.cancel(p.timer)
                                            : l.push($)
                                    }
                                    f && (c = s(i, c, !1), l[0] = {
                                        timer: c,
                                        expectedEndTime: e
                                    }, l.push($), t.data("$$animateCss", l)),
                                    t.on(u.join(" "), o),
                                    n.to && (n.cleanupStyles && O(q, _, Object.keys(n.to)), d(t, n))
                                }
                            }
                            function i() {
                                var e = t.data("$$animateCss");
                                if (e) {
                                    for (var n = 1; n < e.length; n++)
                                        e[n]();
                                    t.removeData("$$animateCss")
                                }
                            }
                            function o(e) {
                                e.stopPropagation();
                                var t = e.originalEvent || e;
                                e = t.$manualTimeStamp || t.timeStamp || Date.now(),
                                t = parseFloat(t.elapsedTime.toFixed(3)),
                                Math.max(e - a, 0) >= Q && t >= Y && (L = !0, $())
                            }
                            if (!U)
                                if (_.parentNode) {
                                    var a,
                                        u = [],
                                        l = function(e) {
                                            if (L)
                                                B && e && (B = !1, $());
                                            else if (B = !e, pt.animationDuration)
                                                if (e = b(_, B), B)
                                                    et.push(e);
                                                else {
                                                    var t = et,
                                                        n = t.indexOf(e);
                                                    e >= 0 && t.splice(n, 1)
                                                }
                                            },
                                        c = ft > 0 && (pt.transitionDuration && 0 === ct.transitionDuration || pt.animationDuration && 0 === ct.animationDuration) && Math.max(ct.animationDelay, ct.transitionDelay);
                                    c
                                        ? s(e, Math.floor(c * ft * 1e3), !1)
                                        : e(),
                                    J.resume = function() {
                                        l(!0)
                                    },
                                    J.pause = function() {
                                        l(!1)
                                    }
                                } else
                                    $()
                        }
                        var q = {},
                            _ = v(t);
                        if (!_ || !_.parentNode || !m.enabled())
                            return N();
                        n = f(n);
                        var U,
                            B,
                            L,
                            W,
                            J,
                            K,
                            Q,
                            Y,
                            Z,
                            et = [],
                            tt = t.attr("class"),
                            nt = i(n);
                        if (0 === n.duration || !l.animations && !l.transitions)
                            return N();
                        var rt = n.event && I(n.event)
                                ? n.event.join(" ")
                                : n.event,
                            it = "",
                            ot = "";
                        rt && n.structural
                            ? it = o(rt, "ng-", !0)
                            : rt && (it = rt),
                        n.addClass && (ot += o(n.addClass, "-add")),
                        n.removeClass && (ot.length && (ot += " "), ot += o(n.removeClass, "-remove")),
                        n.applyClassesEarly && ot.length && j(t, n);
                        var at = [it, ot].join(" ").trim(),
                            st = tt + " " + at,
                            ut = o(at, "-active"),
                            tt = nt.to && 0 < Object.keys(nt.to).length;
                        if (!(0 < (n.keyframeStyle || "").length || tt || at))
                            return N();
                        var lt,
                            ct;
                        0 < n.stagger
                            ? (nt = parseFloat(n.stagger), ct = {
                                transitionDelay: nt,
                                animationDelay: nt,
                                transitionDuration: 0,
                                animationDuration: 0
                            })
                            : (lt = g(_, st), ct = x(_, at, lt, X)),
                        n.$$skipPreparationClasses || r.addClass(t, at),
                        n.transitionStyle && (nt = [
                            T, n.transitionStyle
                        ], w(_, nt), et.push(nt)),
                        0 <= n.duration && (nt = 0 < _.style[T].length, nt = A(n.duration, nt), w(_, nt), et.push(nt)),
                        n.keyframeStyle && (nt = [
                            V, n.keyframeStyle
                        ], w(_, nt), et.push(nt));
                        var ft = ct
                            ? 0 <= n.staggerIndex
                                ? n.staggerIndex
                                : e.count(lt)
                            : 0;
                        (rt = 0 === ft) && !n.skipBlocking && y(_, 9999);
                        var pt = k(_, st, lt),
                            ht = pt.maxDelay;
                        K = Math.max(ht, 0),
                        Y = pt.maxDuration;
                        var dt = {};
                        if (dt.hasTransitions = 0 < pt.transitionDuration, dt.hasAnimations = 0 < pt.animationDuration, dt.hasTransitionAll = dt.hasTransitions && "all" == pt.transitionProperty, dt.applyTransitionDuration = tt && (dt.hasTransitions && !dt.hasTransitionAll || dt.hasAnimations && !dt.hasTransitions), dt.applyAnimationDuration = n.duration && dt.hasAnimations, dt.applyTransitionDelay = E(n.delay) && (dt.applyTransitionDuration || dt.hasTransitions), dt.applyAnimationDelay = E(n.delay) && dt.hasAnimations, dt.recalculateTimingStyles = 0 < ot.length, (dt.applyTransitionDuration || dt.applyAnimationDuration) && (Y = n.duration
                            ? parseFloat(n.duration)
                            : Y, dt.applyTransitionDuration && (dt.hasTransitions = !0, pt.transitionDuration = Y, nt = 0 < _.style[T + "Property"].length, et.push(A(Y, nt))), dt.applyAnimationDuration && (dt.hasAnimations = !0, pt.animationDuration = Y, et.push([
                            z, Y + "s"
                        ]))), 0 === Y && !dt.recalculateTimingStyles)
                            return N();
                        if (null != n.delay) {
                            var $t = parseFloat(n.delay);
                            dt.applyTransitionDelay && et.push([
                                G, $t + "s"
                            ]),
                            dt.applyAnimationDelay && et.push([
                                H, $t + "s"
                            ])
                        }
                        return null == n.duration && 0 < pt.transitionDuration && (dt.recalculateTimingStyles = dt.recalculateTimingStyles || rt),
                        Q = 1e3 * K,
                        Z = 1e3 * Y,
                        n.skipBlocking || (dt.blockTransition = 0 < pt.transitionDuration, dt.blockKeyframeAnimation = 0 < pt.animationDuration && 0 < ct.animationDelay && 0 === ct.animationDuration),
                        n.from && (n.cleanupStyles && O(q, _, Object.keys(n.from)), h(t, n)),
                        dt.blockTransition || dt.blockKeyframeAnimation
                            ? S(Y)
                            : n.skipBlocking || y(_, !1), {
                            $$willAnimate: !0,
                            end: u,
                            start: function() {
                                return U
                                    ? void 0
                                    : (J = {
                                        end: u,
                                        cancel: c,
                                        resume: null,
                                        pause: null
                                    }, W = new a(J), C(F), W)
                            }
                        }
                    }
                }
            ]
        }
    ]).provider("$$animateCssDriver", [
        "$$animationProvider",
        function(e) {
            e.drivers.push("$$animateCssDriver"),
            this.$get = [
                "$animateCss",
                "$rootScope",
                "$$AnimateRunner",
                "$rootElement",
                "$sniffer",
                "$$jqLite",
                "$document",
                function(e, t, n, r, i, o, a) {
                    function s(e) {
                        return e.replace(/\bng-\S+\b/g, "")
                    }
                    function u(e, t) {
                        return F(e) && (e = e.split(" ")),
                        F(t) && (t = t.split(" ")),
                        e.filter(function(e) {
                            return -1 === t.indexOf(e)
                        }).join(" ")
                    }
                    function l(t, r, i) {
                        function o(e) {
                            var t = {},
                                n = v(e).getBoundingClientRect();
                            return R([
                                "width", "height", "top", "left"
                            ], function(e) {
                                var r = n[e];
                                switch (e) {
                                    case "top":
                                        r += h.scrollTop;
                                        break;
                                    case "left":
                                        r += h.scrollLeft
                                }
                                t[e] = Math.floor(r) + "px"
                            }),
                            t
                        }
                        function a() {
                            var t = s(i.attr("class") || ""),
                                n = u(t, f),
                                t = u(f, t),
                                n = e(c, {
                                    to: o(i),
                                    addClass: "ng-anchor-in " + n,
                                    removeClass: "ng-anchor-out " + t,
                                    delay: !0
                                });
                            return n.$$willAnimate
                                ? n
                                : null
                        }
                        function l() {
                            c.remove(),
                            r.removeClass("ng-animate-shim"),
                            i.removeClass("ng-animate-shim")
                        }
                        var c = N(v(r).cloneNode(!0)),
                            f = s(c.attr("class") || "");
                        r.addClass("ng-animate-shim"),
                        i.addClass("ng-animate-shim"),
                        c.addClass("ng-anchor"),
                        d.append(c);
                        var p;
                        if (t = function() {
                            var t = e(c, {
                                addClass: "ng-anchor-out",
                                delay: !0,
                                from: o(r)
                            });
                            return t.$$willAnimate
                                ? t
                                : null
                        }(),
                        !t && (p = a(), !p))
                            return l();
                        var $ = t || p;
                        return {
                            start: function() {
                                function e() {
                                    r && r.end()
                                }
                                var t,
                                    r = $.start();
                                return r.done(function() {
                                    return r = null,
                                    !p && (p = a())
                                        ? (r = p.start(), r.done(function() {
                                            r = null,
                                            l(),
                                            t.complete()
                                        }), r)
                                        : (l(), t.complete(), void 0)
                                }),
                                t = new n({end: e, cancel: e})
                            }
                        }
                    }
                    function f(e, t, r, i) {
                        var o = p(e, D),
                            a = p(t, D),
                            s = [];
                        return R(i, function(e) {
                            (e = l(r, e.out, e["in"])) && s.push(e)
                        }),
                        o || a || 0 !== s.length
                            ? {
                                start: function() {
                                    function e() {
                                        R(t, function(e) {
                                            e.end()
                                        })
                                    }
                                    var t = [];
                                    o && t.push(o.start()),
                                    a && t.push(a.start()),
                                    R(s, function(e) {
                                        t.push(e.start())
                                    });
                                    var r = new n({end: e, cancel: e});
                                    return n.all(t, function(e) {
                                        r.complete(e)
                                    }),
                                    r
                                }
                            }
                            : void 0
                    }
                    function p(t) {
                        var n = t.element,
                            r = t.options || {};
                        return t.structural && (r.event = t.event, r.structural = !0, r.applyClassesEarly = !0, "leave" === t.event && (r.onDone = r.domOperation)),
                        r.preparationClasses && (r.event = x(r.event, r.preparationClasses)),
                        t = e(n, r),
                        t.$$willAnimate
                            ? t
                            : null
                    }
                    if (!i.animations && !i.transitions)
                        return D;
                    var h = a[0].body;
                    t = v(r);
                    var d = N(t.parentNode && 11 === t.parentNode.nodeType || h.contains(t)
                        ? t
                        : h);
                    return c(o),
                    function(e) {
                        return e.from && e.to
                            ? f(e.from, e.to, e.classes, e.anchors)
                            : p(e)
                    }
                }
            ]
        }
    ]).provider("$$animateJs", [
        "$animateProvider",
        function(e) {
            this.$get = [
                "$injector",
                "$$AnimateRunner",
                "$$jqLite",
                function(t, n, r) {
                    function i(n) {
                        n = I(n)
                            ? n
                            : n.split(" ");
                        for (var r = [], i = {}, o = 0; o < n.length; o++) {
                            var a = n[o],
                                s = e.$$registeredAnimations[a];
                            s && !i[a] && (r.push(t.get(s)), i[a] = !0)
                        }
                        return r
                    }
                    var o = c(r);
                    return function(e, t, r, a) {
                        function s() {
                            a.domOperation(),
                            o(e, a)
                        }
                        function u(e, t, r, i, o) {
                            switch (r) {
                                case "animate":
                                    t = [t, i.from, i.to, o];
                                    break;
                                case "setClass":
                                    t = [t, $, m, o];
                                    break;
                                case "addClass":
                                    t = [t, $, o];
                                    break;
                                case "removeClass":
                                    t = [t, m, o];
                                    break;
                                default:
                                    t = [t, o]
                            }
                            if (t.push(i), e = e.apply(e, t))
                                if (B(e.start) && (e = e.start()), e instanceof n)
                                    e.done(o);
                                else if (B(e))
                                    return e;
                        return D
                        }
                        function l(e, t, r, i, o) {
                            var a = [];
                            return R(i, function(i) {
                                var s = i[o];
                                s && a.push(function() {
                                    var i,
                                        o,
                                        a = !1,
                                        l = function(e) {
                                            a || (a = !0, (o || D)(e),
                                            i.complete(!e))
                                        };
                                    return i = new n({
                                        end: function() {
                                            l()
                                        },
                                        cancel: function() {
                                            l(!0)
                                        }
                                    }),
                                    o = u(s, e, t, r, function(e) {
                                        l(!1 === e)
                                    }),
                                    i
                                })
                            }),
                            a
                        }
                        function c(e, t, r, i, o) {
                            var a = l(e, t, r, i, o);
                            if (0 === a.length) {
                                var s,
                                    u;
                                "beforeSetClass" === o
                                    ? (s = l(e, "removeClass", r, i, "beforeRemoveClass"), u = l(e, "addClass", r, i, "beforeAddClass"))
                                    : "setClass" === o && (s = l(e, "removeClass", r, i, "removeClass"), u = l(e, "addClass", r, i, "addClass")),
                                s && (a = a.concat(s)),
                                u && (a = a.concat(u))
                            }
                            return 0 !== a.length
                                ? function(e) {
                                    var t = [];
                                    return a.length && R(a, function(e) {
                                        t.push(e())
                                    }),
                                    t.length
                                        ? n.all(t, e)
                                        : e(),
                                    function(e) {
                                        R(t, function(t) {
                                            e
                                                ? t.cancel()
                                                : t.end()
                                        })
                                    }
                                }
                                : void 0
                        }
                        3 === arguments.length && q(r) && (a = r, r = null),
                        a = f(a),
                        r || (r = e.attr("class") || "", a.addClass && (r += " " + a.addClass), a.removeClass && (r += " " + a.removeClass));
                        var h,
                            d,
                            $ = a.addClass,
                            m = a.removeClass,
                            v = i(r);
                        if (v.length) {
                            var g,
                                y;
                            "leave" == t
                                ? (y = "leave", g = "afterLeave")
                                : (y = "before" + t.charAt(0).toUpperCase() + t.substr(1), g = t),
                            "enter" !== t && "move" !== t && (h = c(e, t, a, v, y)),
                            d = c(e, t, a, v, g)
                        }
                        return h || d
                            ? {
                                start: function() {
                                    function t(t) {
                                        o = !0,
                                        s(),
                                        p(e, a),
                                        u.complete(t)
                                    }
                                    var r,
                                        i = [];
                                    h && i.push(function(e) {
                                        r = h(e)
                                    }),
                                    i.length
                                        ? i.push(function(e) {
                                            s(),
                                            e(!0)
                                        })
                                        : s(),
                                    d && i.push(function(e) {
                                        r = d(e)
                                    });
                                    var o = !1,
                                        u = new n({
                                            end: function() {
                                                o || ((r || D)(void 0),
                                                t(void 0))
                                            },
                                            cancel: function() {
                                                o || ((r || D)(!0),
                                                t(!0))
                                            }
                                        });
                                    return n.chain(i, t),
                                    u
                                }
                            }
                            : void 0
                    }
                }
            ]
        }
    ]).provider("$$animateJsDriver", [
        "$$animationProvider",
        function(e) {
            e.drivers.push("$$animateJsDriver"),
            this.$get = [
                "$$animateJs",
                "$$AnimateRunner",
                function(e, t) {
                    function n(t) {
                        return e(t.element, t.event, t.classes, t.options)
                    }
                    return function(e) {
                        if (!e.from || !e.to)
                            return n(e);
                        var r = n(e.from),
                            i = n(e.to);
                        return r || i
                            ? {
                                start: function() {
                                    function e() {
                                        return function() {
                                            R(n, function(e) {
                                                e.end()
                                            })
                                        }
                                    }
                                    var n = [];
                                    r && n.push(r.start()),
                                    i && n.push(i.start()),
                                    t.all(n, function(e) {
                                        o.complete(e)
                                    });
                                    var o = new t({end: e(), cancel: e()});
                                    return o
                                }
                            }
                            : void 0
                    }
                }
            ]
        }
    ])
}(window, window.angular),
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
function(e, t, n) {
    "use strict";
    function r(e, t) {
        return q(new(q(function() {}, {prototype: e})), t)
    }
    function i(e) {
        return F(arguments, function(t) {
            t !== e && F(t, function(t, n) {
                e.hasOwnProperty(n) || (e[n] = t)
            })
        }),
        e
    }
    function o(e, t) {
        var n = [];
        for (var r in e.path) {
            if (e.path[r] !== t.path[r])
                break;
            n.push(e.path[r])
        }
        return n
    }
    function a(e) {
        if (Object.keys)
            return Object.keys(e);
        var t = [];
        return F(e, function(e, n) {
            t.push(n)
        }),
        t
    }
    function s(e, t) {
        if (Array.prototype.indexOf)
            return e.indexOf(t, Number(arguments[2]) || 0);
        var n = e.length >>> 0,
            r = Number(arguments[2]) || 0;
        for (r = 0 > r
            ? Math.ceil(r)
            : Math.floor(r), 0 > r && (r += n); n > r; r++)
            if (r in e && e[r] === t)
                return r;
    return -1
    }
    function u(e, t, n, r) {
        var i,
            u = o(n, r),
            l = {},
            c = [];
        for (var f in u)
            if (u[f].params && (i = a(u[f].params), i.length))
                for (var p in i)
                    s(c, i[p]) >= 0 || (c.push(i[p]), l[i[p]] = e[i[p]]);
    return q({}, l, t)
    }
    function l(e, t, n) {
        if (!n) {
            n = [];
            for (var r in e)
                n.push(r)
        }
        for (var i = 0; i < n.length; i++) {
            var o = n[i];
            if (e[o] != t[o])
                return !1
        }
        return !0
    }
    function c(e, t) {
        var n = {};
        return F(e, function(e) {
            n[e] = t[e]
        }),
        n
    }
    function f(e) {
        var t = {},
            n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        return F(n, function(n) {
            n in e && (t[n] = e[n])
        }),
        t
    }
    function p(e) {
        var t = {},
            n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var r in e)
            -1 == s(n, r) && (t[r] = e[r]);
        return t
    }
    function h(e, t) {
        var n = I(e),
            r = n
                ? []
                : {};
        return F(e, function(e, i) {
            t(e, i) && (r[n
                    ? r.length
                    : i] = e)
        }),
        r
    }
    function d(e, t) {
        var n = I(e)
            ? []
            : {};
        return F(e, function(e, r) {
            n[r] = t(e, r)
        }),
        n
    }
    function $(e, t) {
        var r = 1,
            o = 2,
            u = {},
            l = [],
            c = u,
            f = q(e.when(u), {
                $$promises: u,
                $$values: u
            });
        this.study = function(u) {
            function h(e, n) {
                if (g[n] !== o) {
                    if (v.push(n), g[n] === r)
                        throw v.splice(0, s(v, n)),
                        new Error("Cyclic dependency: " + v.join(" -> "));
                    if (g[n] = r, N(e))
                        m.push(n, [function() {
                                return t.get(e)
                            }
                        ], l);
                    else {
                        var i = t.annotate(e);
                        F(i, function(e) {
                            e !== n && u.hasOwnProperty(e) && h(u[e], e)
                        }),
                        m.push(n, e, i)
                    }
                    v.pop(),
                    g[n] = o
                }
            }
            function d(e) {
                return R(e) && e.then && e.$$promises
            }
            if (!R(u))
                throw new Error("'invocables' must be an object");
            var $ = a(u || {}),
                m = [],
                v = [],
                g = {};
            return F(u, h),
            u = v = g = null,
            function(r, o, a) {
                function s() {
                    --b || (w || i(y, o.$$values), v.$$values = y, v.$$promises = v.$$promises || !0, delete v.$$inheritedValues, h.resolve(y))
                }
                function u(e) {
                    v.$$failure = e,
                    h.reject(e)
                }
                function l(n, i, o) {
                    function l(e) {
                        f.reject(e),
                        u(e)
                    }
                    function c() {
                        if (!D(v.$$failure))
                            try {
                                f.resolve(t.invoke(i, a, y)),
                                f.promise.then(function(e) {
                                    y[n] = e,
                                    s()
                                }, l)
                            } catch (e) {
                                l(e)
                            }
                        }
                    var f = e.defer(),
                        p = 0;
                    F(o, function(e) {
                        g.hasOwnProperty(e) && !r.hasOwnProperty(e) && (p++, g[e].then(function(t) {
                            y[e] = t,
                            --p || c()
                        }, l))
                    }),
                    p || c(),
                    g[n] = f.promise
                }
                if (d(r) && a === n && (a = o, o = r, r = null), r) {
                    if (!R(r))
                        throw new Error("'locals' must be an object")
                } else
                    r = c;
                if (o) {
                    if (!d(o))
                        throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                } else
                    o = f;
                var h = e.defer(),
                    v = h.promise,
                    g = v.$$promises = {},
                    y = q({}, r),
                    b = 1 + m.length / 3,
                    w = !1;
                if (D(o.$$failure))
                    return u(o.$$failure),
                    v;
                o.$$inheritedValues && i(y, p(o.$$inheritedValues, $)),
                q(g, o.$$promises),
                o.$$values
                    ? (w = i(y, p(o.$$values, $)), v.$$inheritedValues = p(o.$$values, $), s())
                    : (o.$$inheritedValues && (v.$$inheritedValues = p(o.$$inheritedValues, $)), o.then(s, u));
                for (var x = 0, S = m.length; S > x; x += 3)
                    r.hasOwnProperty(m[x])
                        ? s()
                        : l(m[x], m[x + 1], m[x + 2]);
                return v
            }
        },
        this.resolve = function(e, t, n, r) {
            return this.study(e)(t, n, r)
        }
    }
    function m(e, t, n) {
        this.fromConfig = function(e, t, n) {
            return D(e.template)
                ? this.fromString(e.template, t)
                : D(e.templateUrl)
                    ? this.fromUrl(e.templateUrl, t)
                    : D(e.templateProvider)
                        ? this.fromProvider(e.templateProvider, t, n)
                        : null
        },
        this.fromString = function(e, t) {
            return j(e)
                ? e(t)
                : e
        },
        this.fromUrl = function(n, r) {
            return j(n) && (n = n(r)),
            null == n
                ? null
                : e.get(n, {
                    cache: t,
                    headers: {
                        Accept: "text/html"
                    }
                }).then(function(e) {
                    return e.data
                })
        },
        this.fromProvider = function(e, t, r) {
            return n.invoke(e, null, r || {
                params: t
            })
        }
    }
    function v(e, t, i) {
        function o(t, n, r, i) {
            if (m.push(t), d[t])
                return d[t];
            if (!/^\w+(-+\w+)*(?:\[\])?$/.test(t))
                throw new Error("Invalid parameter name '" + t + "' in pattern '" + e + "'");
            if ($[t])
                throw new Error("Duplicate parameter name '" + t + "' in pattern '" + e + "'");
            return $[t] = new U.Param(t, n, r, i),
            $[t]
        }
        function a(e, t, n, r) {
            var i = [
                    "", ""
                ],
                o = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!t)
                return o;
            switch (n) {
                case !1:
                    i = [
                        "(", ")" + (r
                            ? "?"
                            : "")
                    ];
                    break;
                case !0:
                    i = ["?(", ")?"];
                    break;
                default:
                    i = [
                        "(" + n + "|",
                        ")?"
                    ]
            }
            return o + i[0] + t + i[1]
        }
        function s(i, o) {
            var a,
                s,
                u,
                l,
                c;
            return a = i[2] || i[3],
            c = t.params[a],
            u = e.substring(p, i.index),
            s = o
                ? i[4]
                : i[4] || ("*" == i[1]
                    ? ".*"
                    : null),
            l = U.type(s || "string") || r(U.type("string"), {
                pattern: new RegExp(s, t.caseInsensitive
                    ? "i"
                    : n)
            }), {
                id: a,
                regexp: s,
                segment: u,
                type: l,
                cfg: c
            }
        }
        t = q({
            params: {}
        }, R(t)
            ? t
            : {});
        var u,
            l = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
            c = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
            f = "^",
            p = 0,
            h = this.segments = [],
            d = i
                ? i.params
                : {},
            $ = this.params = i
                ? i.params.$$new()
                : new U.ParamSet,
            m = [];
        this.source = e;
        for (var v, g, y; (u = l.exec(e)) && (v = s(u, !1), !(v.segment.indexOf("?") >= 0));)
            g = o(v.id, v.type, v.cfg, "path"),
            f += a(v.segment, g.type.pattern.source, g.squash, g.isOptional),
            h.push(v.segment),
            p = l.lastIndex;
        y = e.substring(p);
        var b = y.indexOf("?");
        if (b >= 0) {
            var w = this.sourceSearch = y.substring(b);
            if (y = y.substring(0, b), this.sourcePath = e.substring(0, p + b), w.length > 0)
                for (p = 0; u = c.exec(w);)
                    v = s(u, !0),
                    g = o(v.id, v.type, v.cfg, "search"),
                    p = l.lastIndex
        } else
            this.sourcePath = e,
            this.sourceSearch = "";
        f += a(y) + (t.strict === !1
            ? "/?"
            : "") + "$",
        h.push(y),
        this.regexp = new RegExp(f, t.caseInsensitive
            ? "i"
            : n),
        this.prefix = h[0],
        this.$$paramNames = m
    }
    function g(e) {
        q(this, e)
    }
    function y() {
        function e(e) {
            return null != e
                ? e.toString().replace(/\//g, "%2F")
                : e
        }
        function i(e) {
            return null != e
                ? e.toString().replace(/%2F/g, "/")
                : e
        }
        function o() {
            return {strict: $, caseInsensitive: p}
        }
        function u(e) {
            return j(e) || I(e) && j(e[e.length - 1])
        }
        function l() {
            for (; x.length;) {
                var e = x.shift();
                if (e.pattern)
                    throw new Error("You cannot override a type's .pattern at runtime.");
                t.extend(b[e.name], f.invoke(e.def))
            }
        }
        function c(e) {
            q(this, e || {})
        }
        U = this;
        var f,
            p = !1,
            $ = !0,
            m = !1,
            b = {},
            w = !0,
            x = [],
            S = {
                string: {
                    encode: e,
                    decode: i,
                    is: function(e) {
                        return null == e || !D(e) || "string" == typeof e
                    },
                    pattern: /[^/]*/
                },
                "int": {
                    encode: e,
                    decode: function(e) {
                        return parseInt(e, 10)
                    },
                    is: function(e) {
                        return D(e) && this.decode(e.toString()) === e
                    },
                    pattern: /\d+/
                },
                bool: {
                    encode: function(e) {
                        return e
                            ? 1
                            : 0
                    },
                    decode: function(e) {
                        return 0 !== parseInt(e, 10)
                    },
                    is: function(e) {
                        return e === !0 || e === !1
                    },
                    pattern: /0|1/
                },
                date: {
                    encode: function(e) {
                        return this.is(e)
                            ? [
                                e.getFullYear(),
                                ("0" + (e.getMonth() + 1)).slice(-2),
                                ("0" + e.getDate()).slice(-2)
                            ].join("-")
                            : n
                    },
                    decode: function(e) {
                        if (this.is(e))
                            return e;
                        var t = this.capture.exec(e);
                        return t
                            ? new Date(t[1], t[2] - 1, t[3])
                            : n
                    },
                    is: function(e) {
                        return e instanceof Date && !isNaN(e.valueOf())
                    },
                    equals: function(e, t) {
                        return this.is(e) && this.is(t) && e.toISOString() === t.toISOString()
                    },
                    pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                    capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
                },
                json: {
                    encode: t.toJson,
                    decode: t.fromJson,
                    is: t.isObject,
                    equals: t.equals,
                    pattern: /[^/]*/
                },
                any: {
                    encode: t.identity,
                    decode: t.identity,
                    equals: t.equals,
                    pattern: /.*/
                }
            };
        y.$$getDefaultValue = function(e) {
            if (!u(e.value))
                return e.value;
            if (!f)
                throw new Error("Injectable functions cannot be called at configuration time");
            return f.invoke(e.value)
        },
        this.caseInsensitive = function(e) {
            return D(e) && (p = e),
            p
        },
        this.strictMode = function(e) {
            return D(e) && ($ = e),
            $
        },
        this.defaultSquashPolicy = function(e) {
            if (!D(e))
                return m;
            if (e !== !0 && e !== !1 && !N(e))
                throw new Error("Invalid squash policy: " + e + ". Valid policies: false, true, arbitrary-string");
            return m = e,
            e
        },
        this.compile = function(e, t) {
            return new v(e, q(o(), t))
        },
        this.isMatcher = function(e) {
            if (!R(e))
                return !1;
            var t = !0;
            return F(v.prototype, function(n, r) {
                j(n) && (t = t && D(e[r]) && j(e[r]))
            }),
            t
        },
        this.type = function(e, t, n) {
            if (!D(t))
                return b[e];
            if (b.hasOwnProperty(e))
                throw new Error("A type named '" + e + "' has already been defined.");
            return b[e] = new g(q({
                name: e
            }, t)),
            n && (x.push({name: e, def: n}), w || l()),
            this
        },
        F(S, function(e, t) {
            b[t] = new g(q({
                name: t
            }, e))
        }),
        b = r(b, {}),
        this.$get = [
            "$injector",
            function(e) {
                return f = e,
                w = !1,
                l(),
                F(S, function(e, t) {
                    b[t] || (b[t] = new g(e))
                }),
                this
            }
        ],
        this.Param = function(e, t, r, i) {
            function o(e) {
                var t = R(e)
                        ? a(e)
                        : [],
                    n = -1 === s(t, "value") && -1 === s(t, "type") && -1 === s(t, "squash") && -1 === s(t, "array");
                return n && (e = {
                    value: e
                }),
                e.$$fn = u(e.value)
                    ? e.value
                    : function() {
                        return e.value
                    },
                e
            }
            function l(t, n, r) {
                if (t.type && n)
                    throw new Error("Param '" + e + "' has two type configurations.");
                return n
                    ? n
                    : t.type
                        ? t.type instanceof g
                            ? t.type
                            : new g(t.type)
                        : "config" === r
                            ? b.any
                            : b.string
            }
            function c() {
                var t = {
                        array: "search" === i
                            ? "auto"
                            : !1
                    },
                    n = e.match(/\[\]$/)
                        ? {
                            array: !0
                        }
                        : {};
                return q(t, n, r).array
            }
            function p(e, t) {
                var n = e.squash;
                if (!t || n === !1)
                    return !1;
                if (!D(n) || null == n)
                    return m;
                if (n === !0 || N(n))
                    return n;
                throw new Error("Invalid squash policy: '" + n + "'. Valid policies: false, true, or arbitrary string")
            }
            function $(e, t, r, i) {
                var o,
                    a,
                    u = [
                        {
                            from: "",
                            to: r || t
                                ? n
                                : ""
                        }, {
                            from: null,
                            to: r || t
                                ? n
                                : ""
                        }
                    ];
                return o = I(e.replace)
                    ? e.replace
                    : [],
                N(i) && o.push({from: i, to: n}),
                a = d(o, function(e) {
                    return e.from
                }),
                h(u, function(e) {
                    return -1 === s(a, e.from)
                }).concat(o)
            }
            function v() {
                if (!f)
                    throw new Error("Injectable functions cannot be called at configuration time");
                var e = f.invoke(r.$$fn);
                if (null !== e && e !== n && !x.type.is(e))
                    throw new Error("Default value (" + e + ") for parameter '" + x.id + "' is not an instance of Type (" + x.type.name + ")");
                return e
            }
            function y(e) {
                function t(e) {
                    return function(t) {
                        return t.from === e
                    }
                }
                function n(e) {
                    var n = d(h(x.replace, t(e)), function(e) {
                        return e.to
                    });
                    return n.length
                        ? n[0]
                        : e
                }
                return e = n(e),
                D(e)
                    ? x.type.$normalize(e)
                    : v()
            }
            function w() {
                return "{Param:" + e + " " + t + " squash: '" + E + "' optional: " + C + "}"
            }
            var x = this;
            r = o(r),
            t = l(r, t, i);
            var S = c();
            t = S
                ? t.$asArray(S, "search" === i)
                : t,
            "string" !== t.name || S || "path" !== i || r.value !== n || (r.value = "");
            var C = r.value !== n,
                E = p(r, C),
                A = $(r, S, C, E);
            q(this, {
                id: e,
                type: t,
                location: i,
                array: S,
                squash: E,
                replace: A,
                isOptional: C,
                value: y,
                dynamic: n,
                config: r,
                toString: w
            })
        },
        c.prototype = {
            $$new: function() {
                return r(this, q(new c, {$$parent: this}))
            },
            $$keys: function() {
                for (var e = [], t = [], n = this, r = a(c.prototype); n;)
                    t.push(n),
                    n = n.$$parent;
                return t.reverse(),
                F(t, function(t) {
                    F(a(t), function(t) {
                        -1 === s(e, t) && -1 === s(r, t) && e.push(t)
                    })
                }),
                e
            },
            $$values: function(e) {
                var t = {},
                    n = this;
                return F(n.$$keys(), function(r) {
                    t[r] = n[r].value(e && e[r])
                }),
                t
            },
            $$equals: function(e, t) {
                var n = !0,
                    r = this;
                return F(r.$$keys(), function(i) {
                    var o = e && e[i],
                        a = t && t[i];
                    r[i].type.equals(o, a) || (n = !1)
                }),
                n
            },
            $$validates: function(e) {
                var r,
                    i,
                    o,
                    a,
                    s,
                    u = this.$$keys();
                for (r = 0; r < u.length && (i = this[u[r]], o = e[u[r]], o !== n && null !== o || !i.isOptional); r++) {
                    if (a = i.type.$normalize(o), !i.type.is(a))
                        return !1;
                    if (s = i.type.encode(a), t.isString(s) && !i.type.pattern.exec(s))
                        return !1
                }
                return !0
            },
            $$parent: n
        },
        this.ParamSet = c
    }
    function b(e, r) {
        function i(e) {
            var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);
            return null != t
                ? t[1].replace(/\\(.)/g, "$1")
                : ""
        }
        function o(e, t) {
            return e.replace(/\$(\$|\d{1,2})/, function(e, n) {
                return t["$" === n
                        ? 0
                        : Number(n)]
            })
        }
        function a(e, t, n) {
            if (!n)
                return !1;
            var r = e.invoke(t, t, {$match: n});
            return D(r)
                ? r
                : !0
        }
        function s(r, i, o, a) {
            function s(e, t, n) {
                return "/" === $
                    ? e
                    : t
                        ? $.slice(0, -1) + e
                        : n
                            ? $.slice(1) + e
                            : e
            }
            function p(e) {
                function t(e) {
                    var t = e(o, r);
                    return t
                        ? (N(t) && r.replace().url(t), !0)
                        : !1
                }
                if (!e || !e.defaultPrevented) {
                    d && r.url() === d,
                    d = n;
                    var i,
                        a = l.length;
                    for (i = 0; a > i; i++)
                        if (t(l[i]))
                            return;
                c && t(c)
                }
            }
            function h() {
                return u = u || i.$on("$locationChangeSuccess", p)
            }
            var d,
                $ = a.baseHref(),
                m = r.url();
            return f || h(), {
                sync: function() {
                    p()
                },
                listen: function() {
                    return h()
                },
                update: function(e) {
                    return e
                        ? void(m = r.url())
                        : void(r.url() !== m && (r.url(m), r.replace()))
                },
                push: function(e, t, i) {
                    var o = e.format(t || {});
                    null !== o && t && t["#"] && (o += "#" + t["#"]),
                    r.url(o),
                    d = i && i.$$avoidResync
                        ? r.url()
                        : n,
                    i && i.replace && r.replace()
                },
                href: function(n, i, o) {
                    if (!n.validates(i))
                        return null;
                    var a = e.html5Mode();
                    t.isObject(a) && (a = a.enabled);
                    var u = n.format(i);
                    if (o = o || {}, a || null === u || (u = "#" + e.hashPrefix() + u), null !== u && i && i["#"] && (u += "#" + i["#"]), u = s(u, a, o.absolute), !o.absolute || !u)
                        return u;
                    var l = !a && u
                            ? "/"
                            : "",
                        c = r.port();
                    return c = 80 === c || 443 === c
                        ? ""
                        : ":" + c,
                    [
                        r.protocol(),
                        "://",
                        r.host(),
                        c,
                        l,
                        u
                    ].join("")
                }
            }
        }
        var u,
            l = [],
            c = null,
            f = !1;
        this.rule = function(e) {
            if (!j(e))
                throw new Error("'rule' must be a function");
            return l.push(e),
            this
        },
        this.otherwise = function(e) {
            if (N(e)) {
                var t = e;
                e = function() {
                    return t
                }
            } else if (!j(e))
                throw new Error("'rule' must be a function");
            return c = e,
            this
        },
        this.when = function(e, t) {
            var n,
                s = N(t);
            if (N(e) && (e = r.compile(e)), !s && !j(t) && !I(t))
                throw new Error("invalid 'handler' in when()");
            var u = {
                    matcher: function(e, t) {
                        return s && (n = r.compile(t), t = [
                            "$match",
                            function(e) {
                                return n.format(e)
                            }
                        ]),
                        q(function(n, r) {
                            return a(n, t, e.exec(r.path(), r.search()))
                        }, {
                            prefix: N(e.prefix)
                                ? e.prefix
                                : ""
                        })
                    },
                    regex: function(e, t) {
                        if (e.global || e.sticky)
                            throw new Error("when() RegExp must not be global or sticky");
                        return s && (n = t, t = [
                            "$match",
                            function(e) {
                                return o(n, e)
                            }
                        ]),
                        q(function(n, r) {
                            return a(n, t, e.exec(r.path()))
                        }, {prefix: i(e)})
                    }
                },
                l = {
                    matcher: r.isMatcher(e),
                    regex: e instanceof RegExp
                };
            for (var c in l)
                if (l[c])
                    return this.rule(u[c](e, t));
        throw new Error("invalid 'what' in when()")
        },
        this.deferIntercept = function(e) {
            e === n && (e = !0),
            f = e
        },
        this.$get = s,
        s.$inject = ["$location", "$rootScope", "$injector", "$browser"]
    }
    function w(e, i) {
        function o(e) {
            return 0 === e.indexOf(".") || 0 === e.indexOf("^")
        }
        function p(e, t) {
            if (!e)
                return n;
            var r = N(e),
                i = r
                    ? e
                    : e.name,
                a = o(i);
            if (a) {
                if (!t)
                    throw new Error("No reference point given for path '" + i + "'");
                t = p(t);
                for (var s = i.split("."), u = 0, l = s.length, c = t; l > u; u++)
                    if ("" !== s[u] || 0 !== u) {
                        if ("^" !== s[u])
                            break;
                        if (!c.parent)
                            throw new Error("Path '" + i + "' not valid for state '" + t.name + "'");
                        c = c.parent
                    }
                else
                    c = t;
                s = s.slice(u).join("."),
                i = c.name + (c.name && s
                    ? "."
                    : "") + s
            }
            var f = E[i];
            return !f || !r && (r || f !== e && f.self !== e)
                ? n
                : f
        }
        function h(e, t) {
            A[e] || (A[e] = []),
            A[e].push(t)
        }
        function $(e) {
            for (var t = A[e] || []; t.length;)
                m(t.shift())
        }
        function m(t) {
            t = r(t, {
                self: t,
                resolve: t.resolve || {},
                toString: function() {
                    return this.name
                }
            });
            var n = t.name;
            if (!N(n) || n.indexOf("@") >= 0)
                throw new Error("State must have a valid name");
            if (E.hasOwnProperty(n))
                throw new Error("State '" + n + "'' is already defined");
            var i = -1 !== n.indexOf(".")
                ? n.substring(0, n.lastIndexOf("."))
                : N(t.parent)
                    ? t.parent
                    : R(t.parent) && N(t.parent.name)
                        ? t.parent.name
                        : "";
            if (i && !E[i])
                return h(i, t.self);
            for (var o in O)
                j(O[o]) && (t[o] = O[o](t, O.$delegates[o]));
            return E[n] = t,
            !t[k] && t.url && e.when(t.url, [
                "$match",
                "$stateParams",
                function(e, n) {
                    C.$current.navigable == t && l(e, n) || C.transitionTo(t, e, {
                        inherit: !0,
                        location: !1
                    })
                }
            ]),
            $(n),
            t
        }
        function v(e) {
            return e.indexOf("*") > -1
        }
        function g(e) {
            for (var t = e.split("."), n = C.$current.name.split("."), r = 0, i = t.length; i > r; r++)
                "*" === t[r] && (n[r] = "*");
            return "**" === t[0] && (n = n.slice(s(n, t[1])), n.unshift("**")),
            "**" === t[t.length - 1] && (n.splice(s(n, t[t.length - 2]) + 1, Number.MAX_VALUE), n.push("**")),
            t.length != n.length
                ? !1
                : n.join("") === t.join("")
        }
        function y(e, t) {
            return N(e) && !D(t)
                ? O[e]
                : j(t) && N(e)
                    ? (O[e] && !O.$delegates[e] && (O.$delegates[e] = O[e]), O[e] = t, this)
                    : this
        }
        function b(e, t) {
            return R(e)
                ? t = e
                : t.name = e,
            m(t),
            this
        }
        function w(e, i, o, s, f, h, $) {
            function m(t, n, r, o) {
                var a = e.$broadcast("$stateNotFound", t, n, r);
                if (a.defaultPrevented)
                    return $.update(),
                    A;
                if (!a.retry)
                    return null;
                if (o.$retry)
                    return $.update(),
                    O;
                var s = C.transition = i.when(a.retry);
                return s.then(function() {
                    return s !== C.transition
                        ? b
                        : (t.options.$retry = !0, C.transitionTo(t.to, t.toParams, t.options))
                }, function() {
                    return A
                }),
                $.update(),
                s
            }
            function y(e, n, r, a, u, l) {
                function p() {
                    var n = [];
                    return F(e.views, function(r, i) {
                        var a = r.resolve && r.resolve !== e.resolve
                            ? r.resolve
                            : {};
                        a.$template = [function() {
                                return o.load(i, {
                                    view: r,
                                    locals: u.globals,
                                    params: h,
                                    notify: l.notify
                                }) || ""
                            }
                        ],
                        n.push(f.resolve(a, u.globals, u.resolve, e).then(function(n) {
                            if (j(r.controllerProvider) || I(r.controllerProvider)) {
                                var o = t.extend({}, a, u.globals);
                                n.$$controller = s.invoke(r.controllerProvider, null, o)
                            } else
                                n.$$controller = r.controller;
                            n.$$state = e,
                            n.$$controllerAs = r.controllerAs,
                            u[i] = n
                        }))
                    }),
                    i.all(n).then(function() {
                        return u.globals
                    })
                }
                var h = r
                        ? n
                        : c(e.params.$$keys(), n),
                    d = {
                        $stateParams: h
                    };
                u.resolve = f.resolve(e.resolve, d, u.resolve, e);
                var $ = [u.resolve.then(function(e) {
                        u.globals = e
                    })];
                return a && $.push(a),
                i.all($).then(p).then(function() {
                    return u
                })
            }
            var b = i.reject(new Error("transition superseded")),
                w = i.reject(new Error("transition prevented")),
                A = i.reject(new Error("transition aborted")),
                O = i.reject(new Error("transition failed"));
            return S.locals = {
                resolve: null,
                globals: {
                    $stateParams: {}
                }
            },
            C = {
                params: {},
                current: S.self,
                $current: S,
                transition: null
            },
            C.reload = function(e) {
                return C.transitionTo(C.current, h, {
                    reload: e || !0,
                    inherit: !1,
                    notify: !0
                })
            },
            C.go = function(e, t, n) {
                return C.transitionTo(e, t, q({
                    inherit: !0,
                    relative: C.$current
                }, n))
            },
            C.transitionTo = function(t, n, o) {
                n = n || {},
                o = q({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, o || {});
                var a,
                    l = C.$current,
                    f = C.params,
                    d = l.path,
                    v = p(t, o.relative),
                    g = n["#"];
                if (!D(v)) {
                    var E = {
                            to: t,
                            toParams: n,
                            options: o
                        },
                        A = m(E, l.self, f, o);
                    if (A)
                        return A;
                    if (t = E.to, n = E.toParams, o = E.options, v = p(t, o.relative), !D(v)) {
                        if (!o.relative)
                            throw new Error("No such state '" + t + "'");
                        throw new Error("Could not resolve '" + t + "' from state '" + o.relative + "'")
                    }
                }
                if (v[k])
                    throw new Error("Cannot transition to abstract state '" + t + "'");
                if (o.inherit && (n = u(h, n || {}, C.$current, v)), !v.params.$$validates(n))
                    return O;
                n = v.params.$$values(n),
                t = v;
                var T = t.path,
                    P = 0,
                    V = T[P],
                    M = S.locals,
                    j = [];
                if (o.reload) {
                    if (N(o.reload) || R(o.reload)) {
                        if (R(o.reload) && !o.reload.name)
                            throw new Error("Invalid reload state object");
                        var I = o.reload === !0
                            ? d[0]
                            : p(o.reload);
                        if (o.reload && !I)
                            throw new Error("No such reload state '" + (N(o.reload)
                                ? o.reload
                                : o.reload.name) + "'");
                        for (; V && V === d[P] && V !== I;)
                            M = j[P] = V.locals,
                            P++,
                            V = T[P]
                    }
                } else
                    for (; V && V === d[P] && V.ownParams.$$equals(n, f);)
                        M = j[P] = V.locals,
                        P++,
                        V = T[P];
            if (x(t, n, l, f, M, o))
                    return g && (n["#"] = g),
                    C.params = n,
                    _(C.params, h),
                    o.location && t.navigable && t.navigable.url && ($.push(t.navigable.url, n, {
                        $$avoidResync: !0,
                        replace: "replace" === o.location
                    }), $.update(!0)),
                    C.transition = null,
                    i.when(C.current);
                if (n = c(t.params.$$keys(), n || {}), o.notify && e.$broadcast("$stateChangeStart", t.self, n, l.self, f).defaultPrevented)
                    return e.$broadcast("$stateChangeCancel", t.self, n, l.self, f),
                    $.update(),
                    w;
                for (var F = i.when(M), U = P; U < T.length; U++, V = T[U])
                    M = j[U] = r(M),
                    F = y(V, n, V === t, F, M, o);
                var B = C.transition = F.then(function() {
                    var r,
                        i,
                        a;
                    if (C.transition !== B)
                        return b;
                    for (r = d.length - 1; r >= P; r--)
                        a = d[r],
                        a.self.onExit && s.invoke(a.self.onExit, a.self, a.locals.globals),
                        a.locals = null;
                    for (r = P; r < T.length; r++)
                        i = T[r],
                        i.locals = j[r],
                        i.self.onEnter && s.invoke(i.self.onEnter, i.self, i.locals.globals);
                    return g && (n["#"] = g),
                    C.transition !== B
                        ? b
                        : (C.$current = t, C.current = t.self, C.params = n, _(C.params, h), C.transition = null, o.location && t.navigable && $.push(t.navigable.url, t.navigable.locals.globals.$stateParams, {
                            $$avoidResync: !0,
                            replace: "replace" === o.location
                        }), o.notify && e.$broadcast("$stateChangeSuccess", t.self, n, l.self, f), $.update(!0), C.current)
                }, function(r) {
                    return C.transition !== B
                        ? b
                        : (C.transition = null, a = e.$broadcast("$stateChangeError", t.self, n, l.self, f, r), a.defaultPrevented || $.update(), i.reject(r))
                });
                return B
            },
            C.is = function(e, t, r) {
                r = q({
                    relative: C.$current
                }, r || {});
                var i = p(e, r.relative);
                return D(i)
                    ? C.$current !== i
                        ? !1
                        : t
                            ? l(i.params.$$values(t), h)
                            : !0
                    : n
            },
            C.includes = function(e, t, r) {
                if (r = q({
                    relative: C.$current
                }, r || {}), N(e) && v(e)) {
                    if (!g(e))
                        return !1;
                    e = C.$current.name
                }
                var i = p(e, r.relative);
                return D(i)
                    ? D(C.$current.includes[i.name])
                        ? t
                            ? l(i.params.$$values(t), h, a(t))
                            : !0
                        : !1
                    : n
            },
            C.href = function(e, t, r) {
                r = q({
                    lossy: !0,
                    inherit: !0,
                    absolute: !1,
                    relative: C.$current
                }, r || {});
                var i = p(e, r.relative);
                if (!D(i))
                    return null;
                r.inherit && (t = u(h, t || {}, C.$current, i));
                var o = i && r.lossy
                    ? i.navigable
                    : i;
                return o && o.url !== n && null !== o.url
                    ? $.href(o.url, c(i.params.$$keys().concat("#"), t || {}), {absolute: r.absolute})
                    : null
            },
            C.get = function(e, t) {
                if (0 === arguments.length)
                    return d(a(E), function(e) {
                        return E[e].self
                    });
                var n = p(e, t || C.$current);
                return n && n.self
                    ? n.self
                    : null
            },
            C
        }
        function x(e, t, n, r, i, o) {
            function a(e, t, n) {
                function r(t) {
                    return "search" != e.params[t].location
                }
                var i = e.params.$$keys().filter(r),
                    o = f.apply({}, [e.params].concat(i)),
                    a = new U.ParamSet(o);
                return a.$$equals(t, n)
            }
            return !o.reload && e === n && (i === n.locals || e.self.reloadOnSearch === !1 && a(n, r, t))
                ? !0
                : void 0
        }
        var S,
            C,
            E = {},
            A = {},
            k = "abstract",
            O = {
                parent: function(e) {
                    if (D(e.parent) && e.parent)
                        return p(e.parent);
                    var t = /^(.+)\.[^.]+$/.exec(e.name);
                    return t
                        ? p(t[1])
                        : S
                },
                data: function(e) {
                    return e.parent && e.parent.data && (e.data = e.self.data = q({}, e.parent.data, e.data)),
                    e.data
                },
                url: function(e) {
                    var t = e.url,
                        n = {
                            params: e.params || {}
                        };
                    if (N(t))
                        return "^" == t.charAt(0)
                            ? i.compile(t.substring(1), n)
                            : (e.parent.navigable || S).url.concat(t, n);
                    if (!t || i.isMatcher(t))
                        return t;
                    throw new Error("Invalid url '" + t + "' in state '" + e + "'")
                },
                navigable: function(e) {
                    return e.url
                        ? e
                        : e.parent
                            ? e.parent.navigable
                            : null
                },
                ownParams: function(e) {
                    var t = e.url && e.url.params || new U.ParamSet;
                    return F(e.params || {}, function(e, n) {
                        t[n] || (t[n] = new U.Param(n, null, e, "config"))
                    }),
                    t
                },
                params: function(e) {
                    return e.parent && e.parent.params
                        ? q(e.parent.params.$$new(), e.ownParams)
                        : new U.ParamSet
                },
                views: function(e) {
                    var t = {};
                    return F(D(e.views)
                        ? e.views
                        : {
                            "": e
                        }, function(n, r) {
                        r.indexOf("@") < 0 && (r += "@" + e.parent.name),
                        t[r] = n
                    }),
                    t
                },
                path: function(e) {
                    return e.parent
                        ? e.parent.path.concat(e)
                        : []
                },
                includes: function(e) {
                    var t = e.parent
                        ? q({}, e.parent.includes)
                        : {};
                    return t[e.name] = !0,
                    t
                },
                $delegates: {}
            };
        S = m({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }),
        S.navigable = null,
        this.decorator = y,
        this.state = b,
        this.$get = w,
        w.$inject = [
            "$rootScope",
            "$q",
            "$view",
            "$injector",
            "$resolve",
            "$stateParams",
            "$urlRouter",
            "$location",
            "$urlMatcherFactory"
        ]
    }
    function x() {
        function e(e, t) {
            return {
                load: function(n, r) {
                    var i,
                        o = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                    return r = q(o, r),
                    r.view && (i = t.fromConfig(r.view, r.params, r.locals)),
                    i && r.notify && e.$broadcast("$viewContentLoading", r),
                    i
                }
            }
        }
        this.$get = e,
        e.$inject = ["$rootScope", "$templateFactory"]
    }
    function S() {
        var e = !1;
        this.useAnchorScroll = function() {
            e = !0
        },
        this.$get = [
            "$anchorScroll",
            "$timeout",
            function(t, n) {
                return e
                    ? t
                    : function(e) {
                        return n(function() {
                            e[0].scrollIntoView()
                        }, 0, !1)
                    }
            }
        ]
    }
    function C(e, n, r, i) {
        function o() {
            return n.has
                ? function(e) {
                    return n.has(e)
                        ? n.get(e)
                        : null
                }
                : function(e) {
                    try {
                        return n.get(e)
                    } catch (t) {
                        return null
                    }
                }
        }
        function a(e, t) {
            var n = function() {
                return {
                    enter: function(e, t, n) {
                        t.after(e),
                        n()
                    },
                    leave: function(e, t) {
                        e.remove(),
                        t()
                    }
                }
            };
            if (l)
                return {
                    enter: function(e, t, n) {
                        var r = l.enter(e, null, t, n);
                        r && r.then && r.then(n)
                    },
                    leave: function(e, t) {
                        var n = l.leave(e, t);
                        n && n.then && n.then(t)
                    }
                };
            if (u) {
                var r = u && u(t, e);
                return {
                    enter: function(e, t, n) {
                        r.enter(e, null, t),
                        n()
                    },
                    leave: function(e, t) {
                        r.leave(e),
                        t()
                    }
                }
            }
            return n()
        }
        var s = o(),
            u = s("$animator"),
            l = s("$animate"),
            c = {
                restrict: "ECA",
                terminal: !0,
                priority: 400,
                transclude: "element",
                compile: function(n, o, s) {
                    return function(n, o, u) {
                        function l() {
                            f && (f.remove(), f = null),
                            h && (h.$destroy(), h = null),
                            p && (v.leave(p, function() {
                                f = null
                            }), f = p, p = null)
                        }
                        function c(a) {
                            var c,
                                f = A(n, u, o, i),
                                g = f && e.$current && e.$current.locals[f];
                            if (a || g !== d) {
                                c = n.$new(),
                                d = e.$current.locals[f];
                                var y = s(c, function(e) {
                                    v.enter(e, o, function() {
                                        h && h.$emit("$viewContentAnimationEnded"),
                                        (t.isDefined(m) && !m || n.$eval(m)) && r(e)
                                    }),
                                    l()
                                });
                                p = y,
                                h = c,
                                h.$emit("$viewContentLoaded"),
                                h.$eval($)
                            }
                        }
                        var f,
                            p,
                            h,
                            d,
                            $ = u.onload || "",
                            m = u.autoscroll,
                            v = a(u, n);
                        n.$on("$stateChangeSuccess", function() {
                            c(!1)
                        }),
                        n.$on("$viewContentLoading", function() {
                            c(!1)
                        }),
                        c(!0)
                    }
                }
            };
        return c
    }
    function E(e, t, n, r) {
        return {
            restrict: "ECA",
            priority: -400,
            compile: function(i) {
                var o = i.html();
                return function(i, a, s) {
                    var u = n.$current,
                        l = A(i, s, a, r),
                        c = u && u.locals[l];
                    if (c) {
                        a.data("$uiView", {
                            name: l,
                            state: c.$$state
                        }),
                        a.html(c.$template
                            ? c.$template
                            : o);
                        var f = e(a.contents());
                        if (c.$$controller) {
                            c.$scope = i,
                            c.$element = a;
                            var p = t(c.$$controller, c);
                            c.$$controllerAs && (i[c.$$controllerAs] = p),
                            a.data("$ngControllerController", p),
                            a.children().data("$ngControllerController", p)
                        }
                        f(i)
                    }
                }
            }
        }
    }
    function A(e, t, n, r) {
        var i = r(t.uiView || t.name || "")(e),
            o = n.inheritedData("$uiView");
        return i.indexOf("@") >= 0
            ? i
            : i + "@" + (o
                ? o.state.name
                : "")
    }
    function k(e, t) {
        var n,
            r = e.match(/^\s*({[^}]*})\s*$/);
        if (r && (e = t + "(" + r[1] + ")"), n = e.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !n || 4 !== n.length)
            throw new Error("Invalid state ref '" + e + "'");
        return {
            state: n[1],
            paramExpr: n[3] || null
        }
    }
    function O(e) {
        var t = e.parent().inheritedData("$uiView");
        return t && t.state && t.state.name
            ? t.state
            : void 0
    }
    function T(e, n) {
        var r = ["location", "inherit", "reload", "absolute"];
        return {
            restrict: "A",
            require: [
                "?^uiSrefActive", "?^uiSrefActiveEq"
            ],
            link: function(i, o, a, s) {
                var u = k(a.uiSref, e.current.name),
                    l = null,
                    c = O(o) || e.$current,
                    f = "[object SVGAnimatedString]" === Object.prototype.toString.call(o.prop("href"))
                        ? "xlink:href"
                        : "href",
                    p = null,
                    h = "A" === o.prop("tagName").toUpperCase(),
                    d = "FORM" === o[0].nodeName,
                    $ = d
                        ? "action"
                        : f,
                    m = !0,
                    v = {
                        relative: c,
                        inherit: !0
                    },
                    g = i.$eval(a.uiSrefOpts) || {};
                t.forEach(r, function(e) {
                    e in g && (v[e] = g[e])
                });
                var y = function(n) {
                    if (n && (l = t.copy(n)), m) {
                        p = e.href(u.state, l, v);
                        var r = s[1] || s[0];
                        return r && r.$$addStateInfo(u.state, l),
                        null === p
                            ? (m = !1, !1)
                            : void a.$set($, p)
                    }
                };
                u.paramExpr && (i.$watch(u.paramExpr, function(e) {
                    e !== l && y(e)
                }, !0), l = t.copy(i.$eval(u.paramExpr))),
                y(),
                d || o.bind("click", function(t) {
                    var r = t.which || t.button;
                    if (!(r > 1 || t.ctrlKey || t.metaKey || t.shiftKey || o.attr("target"))) {
                        var i = n(function() {
                            e.go(u.state, l, v)
                        });
                        t.preventDefault();
                        var a = h && !p
                            ? 1
                            : 0;
                        t.preventDefault = function() {
                            a-- <= 0 && n.cancel(i)
                        }
                    }
                })
            }
        }
    }
    function P(e, t, n) {
        return {
            restrict: "A",
            controller: [
                "$scope",
                "$element",
                "$attrs",
                function(t, r, i) {
                    function o() {
                        a()
                            ? r.addClass(u)
                            : r.removeClass(u)
                    }
                    function a() {
                        for (var e = 0; e < l.length; e++)
                            if (s(l[e].state, l[e].params))
                                return !0;
                    return !1
                    }
                    function s(t, n) {
                        return "undefined" != typeof i.uiSrefActiveEq
                            ? e.is(t.name, n)
                            : e.includes(t.name, n)
                    }
                    var u,
                        l = [];
                    u = n(i.uiSrefActiveEq || i.uiSrefActive || "", !1)(t),
                    this.$$addStateInfo = function(t, n) {
                        var i = e.get(t, O(r));
                        l.push({
                            state: i || {
                                name: t
                            },
                            params: n
                        }),
                        o()
                    },
                    t.$on("$stateChangeSuccess", o)
                }
            ]
        }
    }
    function V(e) {
        var t = function(t) {
            return e.is(t)
        };
        return t.$stateful = !0,
        t
    }
    function M(e) {
        var t = function(t) {
            return e.includes(t)
        };
        return t.$stateful = !0,
        t
    }
    var D = t.isDefined,
        j = t.isFunction,
        N = t.isString,
        R = t.isObject,
        I = t.isArray,
        F = t.forEach,
        q = t.extend,
        _ = t.copy;
    t.module("ui.router.util", ["ng"]),
    t.module("ui.router.router", ["ui.router.util"]),
    t.module("ui.router.state", ["ui.router.router", "ui.router.util"]),
    t.module("ui.router", ["ui.router.state"]),
    t.module("ui.router.compat", ["ui.router"]),
    $.$inject = [
        "$q", "$injector"
    ],
    t.module("ui.router.util").service("$resolve", $),
    m.$inject = [
        "$http", "$templateCache", "$injector"
    ],
    t.module("ui.router.util").service("$templateFactory", m);
    var U;
    v.prototype.concat = function(e, t) {
        var n = {
            caseInsensitive: U.caseInsensitive(),
            strict: U.strictMode(),
            squash: U.defaultSquashPolicy()
        };
        return new v(this.sourcePath + e + this.sourceSearch, q(n, t), this)
    },
    v.prototype.toString = function() {
        return this.source
    },
    v.prototype.exec = function(e, t) {
        function n(e) {
            function t(e) {
                return e.split("").reverse().join("")
            }
            function n(e) {
                return e.replace(/\\-/g, "-")
            }
            var r = t(e).split(/-(?!\\)/),
                i = d(r, t);
            return d(i, n).reverse()
        }
        var r = this.regexp.exec(e);
        if (!r)
            return null;
        t = t || {};
        var i,
            o,
            a,
            s = this.parameters(),
            u = s.length,
            l = this.segments.length - 1,
            c = {};
        if (l !== r.length - 1)
            throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (i = 0; l > i; i++) {
            a = s[i];
            var f = this.params[a],
                p = r[i + 1];
            for (o = 0; o < f.replace; o++)
                f.replace[o].from === p && (p = f.replace[o].to);
            p && f.array === !0 && (p = n(p)),
            c[a] = f.value(p)
        }
        for (; u > i; i++)
            a = s[i],
            c[a] = this.params[a].value(t[a]);
        return c
    },
    v.prototype.parameters = function(e) {
        return D(e)
            ? this.params[e] || null
            : this.$$paramNames
    },
    v.prototype.validates = function(e) {
        return this.params.$$validates(e)
    },
    v.prototype.format = function(e) {
        function t(e) {
            return encodeURIComponent(e).replace(/-/g, function(e) {
                return "%5C%" + e.charCodeAt(0).toString(16).toUpperCase()
            })
        }
        e = e || {};
        var n = this.segments,
            r = this.parameters(),
            i = this.params;
        if (!this.validates(e))
            return null;
        var o,
            a = !1,
            s = n.length - 1,
            u = r.length,
            l = n[0];
        for (o = 0; u > o; o++) {
            var c = s > o,
                f = r[o],
                p = i[f],
                h = p.value(e[f]),
                $ = p.isOptional && p.type.equals(p.value(), h),
                m = $
                    ? p.squash
                    : !1,
                v = p.type.encode(h);
            if (c) {
                var g = n[o + 1];
                if (m === !1)
                    null != v && (l += I(v)
                        ? d(v, t).join("-")
                        : encodeURIComponent(v)),
                    l += g;
                else if (m === !0) {
                    var y = l.match(/\/$/)
                        ? /\/?(.*)/
                        : /(.*)/;
                    l += g.match(y)[1]
                } else
                    N(m) && (l += m + g)
            } else {
                if (null == v || $ && m !== !1)
                    continue;
                I(v) || (v = [v]),
                v = d(v, encodeURIComponent).join("&" + f + "="),
                l += (a
                    ? "&"
                    : "?") + (f + "=" + v),
                a = !0
            }
        }
        return l
    },
    g.prototype.is = function() {
        return !0
    },
    g.prototype.encode = function(e) {
        return e
    },
    g.prototype.decode = function(e) {
        return e
    },
    g.prototype.equals = function(e, t) {
        return e == t
    },
    g.prototype.$subPattern = function() {
        var e = this.pattern.toString();
        return e.substr(1, e.length - 2)
    },
    g.prototype.pattern = /.*/,
    g.prototype.toString = function() {
        return "{Type:" + this.name + "}"
    },
    g.prototype.$normalize = function(e) {
        return this.is(e)
            ? e
            : this.decode(e)
    },
    g.prototype.$asArray = function(e, t) {
        function r(e, t) {
            function r(e, t) {
                return function() {
                    return e[t].apply(e, arguments)
                }
            }
            function i(e) {
                return I(e)
                    ? e
                    : D(e)
                        ? [e]
                        : []
            }
            function o(e) {
                switch (e.length) {
                    case 0:
                        return n;
                    case 1:
                        return "auto" === t
                            ? e[0]
                            : e;
                    default:
                        return e
                }
            }
            function a(e) {
                return !e
            }
            function s(e, t) {
                return function(n) {
                    n = i(n);
                    var r = d(n, e);
                    return t === !0
                        ? 0 === h(r, a).length
                        : o(r)
                }
            }
            function u(e) {
                return function(t, n) {
                    var r = i(t),
                        o = i(n);
                    if (r.length !== o.length)
                        return !1;
                    for (var a = 0; a < r.length; a++)
                        if (!e(r[a], o[a]))
                            return !1;
                return !0
                }
            }
            this.encode = s(r(e, "encode")),
            this.decode = s(r(e, "decode")),
            this.is = s(r(e, "is"), !0),
            this.equals = u(r(e, "equals")),
            this.pattern = e.pattern,
            this.$normalize = s(r(e, "$normalize")),
            this.name = e.name,
            this.$arrayMode = t
        }
        if (!e)
            return this;
        if ("auto" === e && !t)
            throw new Error("'auto' array mode is for query parameters only");
        return new r(this, e)
    },
    t.module("ui.router.util").provider("$urlMatcherFactory", y),
    t.module("ui.router.util").run(["$urlMatcherFactory", function() {}]),
    b.$inject = [
        "$locationProvider", "$urlMatcherFactoryProvider"
    ],
    t.module("ui.router.router").provider("$urlRouter", b),
    w.$inject = [
        "$urlRouterProvider", "$urlMatcherFactoryProvider"
    ],
    t.module("ui.router.state").value("$stateParams", {}).provider("$state", w),
    x.$inject = [],
    t.module("ui.router.state").provider("$view", x),
    t.module("ui.router.state").provider("$uiViewScroll", S),
    C.$inject = [
        "$state", "$injector", "$uiViewScroll", "$interpolate"
    ],
    E.$inject = [
        "$compile", "$controller", "$state", "$interpolate"
    ],
    t.module("ui.router.state").directive("uiView", C),
    t.module("ui.router.state").directive("uiView", E),
    T.$inject = [
        "$state", "$timeout"
    ],
    P.$inject = [
        "$state", "$stateParams", "$interpolate"
    ],
    t.module("ui.router.state").directive("uiSref", T).directive("uiSrefActive", P).directive("uiSrefActiveEq", P),
    V.$inject = ["$state"],
    M.$inject = ["$state"],
    t.module("ui.router.state").filter("isState", V).filter("includedByState", M)
}(window, window.angular),
angular.module("rt.select2", []).value("select2Config", {}).factory("select2Stack", function() {
    var e = [];
    return {
        $register: function(t) {
            e.push(t)
        },
        $unregister: function(t) {
            var n = e.indexOf(t);
            -1 !== n && e.splice(n, 1)
        },
        closeAll: function() {
            e.forEach(function(e) {
                e.close()
            })
        }
    }
}).directive("select2", [
    "$rootScope",
    "$timeout",
    "$parse",
    "$filter",
    "select2Config",
    "select2Stack",
    function(e, t, n, r, i, o) {
        "use strict";
        function a(e) {
            var t = [];
            for (var n in e)
                e.hasOwnProperty(n) && t.push(n);
            return t.sort()
        }
        var s = r("filter"),
            u = {},
            l = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;
        return i && angular.extend(u, i), {
            require: "ngModel",
            priority: 1,
            restrict: "E",
            template: '<input type="hidden"></input>',
            replace: !0,
            link: function(e, r, i, c) {
                function f(t) {
                    if (m) {
                        var n = m(e);
                        if (n)
                            return s(t, n)
                    }
                    return t
                }
                function p(e) {
                    $
                        ? h(function(t) {
                            for (var n = [], r = 0; r < t.length; r++) {
                                var i = t[r],
                                    o = c.$viewValue || [];
                                o.indexOf(i.id) > -1 && n.push(i)
                            }
                            e(n)
                        })
                        : h(function() {
                            e(v[c.$viewValue] || {
                                obj: {}
                            })
                        })
                }
                var h,
                    d = angular.extend({}, u, e.$eval(i.options)),
                    $ = angular.isDefined(i.multiple) || d.multiple;
                d.multiple = $,
                $ && (c.$isEmpty = function(e) {
                    return !e || 0 === e.length
                }),
                i.placeholder && (d.placeholder = i.placeholder);
                var m = n(i.optionsFilter),
                    v = {};
                if (i.s2Options) {
                    var g;
                    if (!(g = i.s2Options.match(l)))
                        throw new Error("Invalid s2Options encountered!");
                    var y = n(g[2] || g[1]),
                        b = n(g[7]),
                        w = g[4] || g[6],
                        x = n(g[2]
                            ? g[1]
                            : w),
                        S = g[5];
                    h = function(t) {
                        v = {};
                        for (var n = f(b(e)), r = (S
                            ? a(n)
                            : n) || [], i = [], o = 0; o < r.length; o++) {
                            var s = {},
                                u = o;
                            S && (u = r[o], s[S] = u),
                            s[w] = n[u];
                            var l = x(e, s),
                                c = y(e, s) || "";
                            v[l] = {
                                id: l,
                                text: c,
                                obj: n[u]
                            },
                            i.push(v[l])
                        }
                        t(i)
                    },
                    d.query = function(t) {
                        for (var n = f(b(e)), r = (S
                            ? a(n)
                            : n) || [], i = [], o = 0; o < r.length; o++) {
                            var s = {},
                                u = o;
                            S && (u = r[o], s[S] = u),
                            s[w] = n[u];
                            var l = x(e, s),
                                c = y(e, s) || "";
                            d.matcher(t.term, c) && i.push({id: l, text: c, obj: n[u]})
                        }
                        t.callback({results: i})
                    },
                    e.$watch(g[7], function() {
                        c.$render()
                    })
                } else {
                    if (!d.query)
                        throw new Error("You need to supply a query function!");
                    var C = d.query;
                    d.query = function(e) {
                        var t = e.callback;
                        e.callback = function(e) {
                            for (var n = 0; n < e.results.length; n++) {
                                var r = e.results[n];
                                v[r.id] = r
                            }
                            t(e)
                        },
                        C(e)
                    },
                    h = function(e) {
                        d.query({
                            term: "",
                            callback: function(t) {
                                e(t.results)
                            }
                        })
                    }
                }
                if (c.$render = function() {
                    p(function(e) {
                        $
                            ? r.select2("data", e)
                            : r.select2("val", e.id)
                    })
                },
                d.initSelection) {
                    var E = d.initSelection;
                    d.initSelection = function(e, t) {
                        E(e, function(e) {
                            v[e.id] = e,
                            t(e)
                        })
                    }
                } else
                    d.initSelection = function(e, t) {
                        p(t)
                    };
                var A = {
                    close: function() {
                        r.select2("close")
                    }
                };
                o.$register(A),
                e.$on("destroy", function() {
                    o.$unregister(A)
                }),
                t(function() {
                    r.select2(d),
                    r.on("change", function(t) {
                        e.$apply(function() {
                            var e;
                            if ($) {
                                for (var n = [], r = 0; r < t.val.length; r++)
                                    e = v[t.val[r]],
                                    e && n.push(e.id);
                                c.$setViewValue(n)
                            } else
                                e = v[t.val],
                                c.$setViewValue(e
                                    ? e.id
                                    : null);
                            c.$render()
                        })
                    }),
                    r.on("select2-close", function() {
                        var e = r.data("select2");
                        e.search && e.search.blur()
                    }),
                    r.on("select2-blur", function() {
                        c.$touched || e.$apply(c.$setTouched)
                    }),
                    c.$render()
                })
            }
        }
    }
]),
angular.module("ds-reporting", ["ui.router", "rt.select2", "ngSanitize", "ngAnimate"]).constant("Errors", {noQueryParams: "No query params"}).config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    function(e, t, n) {
        return n.otherwise("/"),
        e.state("reports", {
            url: "/",
            controller: "ReportingCtrl",
            templateProvider: function() {
                return document.getElementById("ReportingHome").innerHTML
            }
        }).state("reports.form", {
            url: "form",
            controller: "ReportingFormCtrl",
            templateProvider: function() {
                return document.getElementById("ReportingForm").innerHTML
            },
            params: {
                query: null
            }
        }).state("reports.myReports", {
            url: "my-reports",
            controller: "MyReportsCtrl",
            templateProvider: function() {
                return document.getElementById("MyReports").innerHTML
            },
            resolve: {
                results: [
                    "$http",
                    "user",
                    function(e, t) {
                        return t.loggedIn && t.isPro
                            ? e.get("/domestic-violence-reports/custom.json").then(function(e) {
                                return e.data
                            })
                            : []
                    }
                ]
            }
        }).state("results", {
            url: "/results",
            controller: "ReportingResultsCtrl",
            templateProvider: function() {
                return document.getElementById("ReportingResults").innerHTML
            },
            params: {
                query: null
            },
            resolve: {
                results: [
                    "$http",
                    "$stateParams",
                    "$q",
                    "Errors",
                    "query",
                    function(e, t, n, r, i) {
                        return t.query || true
                            ? e.get("./results.json", t.query || i).then(function(e) {
                                return e.data
                            })
                            : n.reject(r.noQueryParams)
                    }
                ],
                myReports: [
                    "$http",
                    "user",
                    function(e, t) {
                        return t.loggedIn && t.isPro
                            ? e.get("/domestic-violence-reports/custom.json").then(function(e) {
                                return e.data
                            })
                            : []
                    }
                ],
                previousState: [
                    "$state",
                    function(e) {
                        return {name: e.current.name, params: e.params}
                    }
                ]
            },
            onEnter: function() {
                scrollTo(0, 0)
            }
        }),
        t.html5Mode(!1)
    }
]).run([
    "$rootScope",
    "$state",
    "Errors",
    function(e, t, n) {
        e.loading = !0,
        e.showLoader = function() {
            e.loading = !0
        },
        e.hideLoader = function() {
            e.loading = !1
        },
        e.isLoading = function() {
            return e.loading || t.transition
        },
        e.$on("$stateChangeError", function(e, r, i, o, a, s) {
            s === n.noQueryParams && t.go("reports.form")
        })
    }
]),
angular.module("ds-reporting").controller("ReportingCtrl", [
    "$scope",
    "$state",
    function(e, t) {
        t.is("reports") && t.go("reports.form")
    }
]),
angular.module("ds-reporting").controller("ReportingFormCtrl", [
    "$scope",
    "$state",
    "$log",
    "GeographyData",
    "TopicData",
    function(e, t, n, r, i) {
        if (e.hideLoader(), e.GeographyData = r, e.TopicData = i, e.submitted = !1, e.openInNewTab = !1, e.errors = {
            geography: !1,
            topicOfStudy: !1
        }, e.selectedValues = t.params.query
            ? t.params.query
            : {
                geographyType: null,
                geographyValue: null,
                geographyFilter: null,
                topicOfStudy: null,
                topicOfStudyServiceId: null,
                topicOfStudyUtilizationId: null,
                rurality: "all",
                programType: "all"
            }, "district" === e.selectedValues.geographyType) {
            var o = e.selectedValues.geographyValue.split("|");
            o.length
                ? e.selectedValues.geographyFilter = o[0]
                : (e.selectedValues.geographyType = null, e.selectedValues.geographyValue = null)
        }
        e.switchGeography = function(t) {
            e.selectedValues.geographyType = t,
            e.clearGeographyFilter(),
            e.clearGeographyValue()
        },
        e.clearGeography = function() {
            e.selectedValues.geographyType = null,
            e.clearGeographyFilter(),
            e.clearGeographyValue()
        },
        e.clearGeographyFilter = function() {
            e.selectedValues.geographyFilter = null
        },
        e.clearGeographyValue = function() {
            e.selectedValues.geographyValue = null
        },
        e.isGeographyType = function(t) {
            return e.selectedValues.geographyType === t
        },
        e.hasGeographyValue = function() {
            return !!e.selectedValues.geographyValue
        },
        e.hasGeographyFilter = function() {
            return !!e.selectedValues.geographyFilter
        },
        e.formatMultiSelection = function(t) {
            return e.selectedValues.geographyValue = t.id,
            e.dummy = null,
            !1
        },
        e.formatDistrictStateSelection = function(t) {
            return e.selectedValues.geographyFilter = t.id,
            e.dummy = null,
            !1
        },
        e.formatServiceSelection = function(t) {
            return e.selectedValues.topicOfStudyServiceId = t.id,
            e.dummy = null,
            !1
        },
        e.formatUtilizationSelection = function(t) {
            return e.selectedValues.topicOfStudyUtilizationId = t.id,
            e.dummy = null,
            !1
        },
        e.formatInputTooShortCity = function() {
            return "Please type the name of the city"
        },
        e.select2Matcher = function(e, t) {
            return new RegExp("^" + e.toUpperCase()).test(t.toUpperCase())
        },
        e.isTopicOfStudy = function(t) {
            return e.selectedValues.topicOfStudy === t
        },
        e.switchTopicOfStudy = function(t) {
            e.selectedValues.topicOfStudy = t
        },
        e.clearTopicOfStudy = function() {
            e.selectedValues.topicOfStudyServiceId = null,
            e.selectedValues.topicOfStudyUtilizationId = null,
            e.selectedValues.topicOfStudy = null
        },
        e.clearTopicOfStudyValue = function() {
            "service" === e.selectedValues.topicOfStudy
                ? e.selectedValues.topicOfStudyServiceId = null
                : "utilization" === e.selectedValues.topicOfStudy
                    ? e.selectedValues.topicOfStudyUtilizationId = null
                    : e.selectedValues.topicOfStudy = null
        },
        e.hasTopicOfStudyValue = function() {
            return "service" === e.selectedValues.topicOfStudy
                ? e.selectedValues.topicOfStudyServiceId
                : "utilization" === e.selectedValues.topicOfStudy
                    ? e.selectedValues.topicOfStudyUtilizationId
                    : !!e.selectedValues.topicOfStudy
        },
        e.isSelectedRurality = function(t) {
            return e.selectedValues.rurality === t
        },
        e.switchRurality = function(t) {
            e.selectedValues.rurality = t
        },
        e.isSelectedProgramType = function(t) {
            return e.selectedValues.programType === t
        },
        e.switchProgramType = function(t) {
            e.selectedValues.programType = t
        },
        e.validate = function() {
            n.log("Query", e.selectedValues),
            e.submitted = !0,
            (e.errors.geography = !e.hasGeographyValue())
                ? a()
                : (e.errors.topicOfStudy = !e.hasTopicOfStudyValue())
                    ? a()
                    : e.openInNewTab && false
                        ? $("#newWindowForm").submit()
                        : t.go("results", {query: e.selectedValues})
        };
        var a = function() {
            setTimeout(function() {
                $(".error-inline").eq(0).focus()
            })
        }
    }
]),
angular.module("ds-reporting").controller("ReportingResultsCtrl", [
    "$scope",
    "$state",
    "results",
    "Lang",
    "Formatters",
    "user",
    "myReports",
    "previousState",
    function(e, t, n, r, i, o, a, s) {
        e.hideLoader(),
        e.user = o,
        e.results = n,
        e.aggregateRowCount = 2,
        e.hoveredRowId = null,
        e.hoveredAggregateRowId = null,
        e.sortBy = null,
        e.sortByResultGroup = null,
        e.Lang = r,
        e.Formatters = i,
        setTimeout(function() {
            $(".reports__grid").dsStickyHeaders({
                headerSelector: ".sticky-header",
                headerStyles: {
                    position: "absolute"
                },
                position: "fixed",
                scrollZoneTop: 0,
                scrollZoneBottom: 100,
                adjustmentCalculator: function() {
                    return $(".top-header").outerHeight(!0)
                }
            })
        }, 0),
        e.getReportClassesFromResults = function(t) {
            return angular.extend(e.getDynamicClassName(t.query.topicOfStudy, "reports__[value]-report"), e.getDynamicClassName(t.query.geographyType, "reports__[value]-report"), e.getDynamicClassName(t.data.length, "reports__grid-columns-[value]"))
        },
        e.getGroupResults = function(e, t) {
            var n = 0;
            for (n; n < e.length; n++)
                if (e[n].id === t)
                    return [e[n]];
        return e.length
                ? e.slice(0, 1)
                : []
        },
        e.isQueryColumn = function(e) {
            return JSON.stringify(e) === JSON.stringify(n.query)
        },
        e.getColumnTitle = function(e) {
            return "district" == e.geographyType
                ? i.getFormattedGeographyFromQuery(e)
                : "All " + i.getFormattedGeographyFromQuery(e)
        },
        e.isAggregateRow = function(t) {
            return t <= e.aggregateRowCount
        },
        e.isRowHighlighted = function(t) {
            return e.hoveredRowId === t
        },
        e.mouseOverRow = function(t) {
            e.hoveredRowId = t
        },
        e.mouseOutRow = function() {
            e.hoveredRowId = null
        },
        e.isAggregateRowHighlighted = function(t) {
            return e.hoveredAggregateRowId === t
        },
        e.mouseOverAggregateRow = function(t) {
            e.hoveredAggregateRowId = t
        },
        e.mouseOutAggregateRow = function() {
            e.hoveredAggregateRowId = null
        },
        e.wrapLabelName = function(e) {
            return e.replace(/\(([^)]+)\)/g, '<span class="subtext">($1)</span>')
        },
        e.getFormattedResultsValue = function(e, t) {
            var n = t.property;
            return e.hasOwnProperty(n + "Formatted")
                ? e[n + "Formatted"]
                : e.hasOwnProperty(n)
                    ? e[n]
                    : "&nbsp;"
        },
        e.toggleSort = function(t, n) {
            if (t.sortable) {
                var r = t.property;
                e.sortByResultGroup !== n
                    ? (e.sortByResultGroup = n, e.sortBy = r)
                    : e.sortBy = e.sortBy === r
                        ? "-" + r
                        : r
            }
        },
        e.getColumnTitleClasses = function(t, n) {
            var r = {};
            return t.sortable
                ? (r["button--sort"] = !0, e.sortByResultGroup === n && (e.sortBy === t.property && (r["button--sort-up"] = !0), e.sortBy === "-" + t.property && (r["button--sort-down"] = !0)), r)
                : (r["button--sort-empty"] = !0, r)
        },
        e.getDynamicClassName = function(e, t) {
            var n = {};
            return t = t || "",
            n[t.replace("[value]", e)] = !0,
            n
        },
        e.addToMyReports = function(t) {
            $.post("/domestic-violence-reports/custom.json", {query: JSON.stringify(t)}).then(function(t) {
                a.push(t),
                e.$digest()
            })
        },
        e.isInMyReports = function(e) {
            if (!a.length)
                return !1;
            var t = !1;
            return angular.forEach(a, function(n) {
                JSON.stringify(e) === JSON.stringify(n.query) && (t = !0)
            }),
            t
        },
        e.isPreviousState = function(e) {
            return s.name === e
        };
        var u = !1;
        angular.forEach(n.columns, function(t) {
            !u && t.defaultSort && n.data.length && (e.toggleSort(t, n.data[0].id), u = !0)
        })
    }
]),
angular.module("ds-reporting").service("Lang", [function() {
        var e = function(e) {
                return this.hasOwnProperty(e)
                    ? this[e]
                    : null
            },
            t = {
                demographics_served: "Demographics",
                distinctive_population_served: "Distinctive Populations",
                languages_spoken: "Languages",
                spending: "Spending",
                service: "Services",
                utilization: "Utilization",
                get: e
            },
            n = {
                urban: "Urban",
                U: "Urban",
                suburban: "Suburban",
                S: "Suburban",
                rural: "Rural",
                R: "Rural",
                get: e
            },
            r = {
                beds: "Beds",
                hotline_report: "Hotline Report",
                population_served: "Population Served",
                population_turned_away: "Population Turned Away",
                get: e
            },
            i = {
                primary: "Primary purpose DV",
                multi: "Multipurpose / Other",
                get: e
            };
        return {geography: null, topicOfStudy: t, utilization: r, rurality: n, programType: i}
    }
]),
angular.module("ds-reporting").service("Formatters", [
    "GeographyData",
    "TopicData",
    "Lang",
    function(e, t, n) {
        return {
            numberOrdinal: e.numberOrdinal,
            getFormattedGeographyFromQuery: function(t) {
                switch (t.geographyType) {
                    case "city":
                        return e.getCityInfo(t.geographyValue).name;
                    case "state":
                        return e.getStateInfo(t.geographyValue).name;
                    case "nation":
                        return e.getCountryName(t.geographyValue);
                    case "district":
                        return e.getDistrictInfo(t.geographyValue).name + " of " + e.getDistrictInfo(t.geographyValue).state;
                    default:
                        return ""
                }
            },
            getFormattedFilterFromQuery: function(e) {
                var t = [];
                return e.rurality && "all" !== e.rurality && t.push(n.rurality.get(e.rurality)),
                e.programType && "all" !== e.programType && t.push(n.programType.get(e.programType)),
                t.join(", ")
            },
            getFormattedTopicOfStudyFromQuery: function(e) {
                return e.topicOfStudyServiceId
                    ? t.getServiceById(e.topicOfStudyServiceId).title
                    : e.topicOfStudyUtilizationId
                        ? [
                            "Utilization",
                            t.getUtilizationById(e.topicOfStudyUtilizationId).title
                        ].join(" - ")
                        : n.topicOfStudy.get(e.topicOfStudy)
            }
        }
    }
]),
angular.module("ds-reporting").controller("MyReportsCtrl", [
    "$scope",
    "$state",
    "Formatters",
    "Lang",
    "results",
    "user",
    function(e, t, n, r, i, o) {
        e.hideLoader(),
        e.Lang = r,
        e.Formatters = n,
        e.user = o,
        e.results = i,
        e.sortBy = null,
        e.getFormattedFilterFromQuery = function(e) {
            var t = '<span class="table-basic__muted-value">none</span>';
            return n.getFormattedFilterFromQuery(e) || t
        },
        e.generateReport = function(e) {
            t.go("results", {query: e})
        },
        e.destroySavedReport = function(t) {
            confirm("Would you like to remove this report?") && $.ajax({
                url: "/domestic-violence-reports/custom/" + t,
                type: "DELETE"
            }).then(function(n, r) {
                if ("success" === r) {
                    var i;
                    angular.forEach(e.results, function(e, n) {
                        e.id === t && (i = n)
                    }),
                    e.results.splice(i, 1),
                    e.$apply()
                }
            })
        },
        e.toggleSort = function(t) {
            e.sortBy = e.sortBy === t
                ? "-" + t
                : t
        },
        e.getColumnTitleClasses = function(t) {
            var n = {};
            return e.sortBy === t && (n["button--sort-up"] = !0),
            e.sortBy === "-" + t && (n["button--sort-down"] = !0),
            n
        },
        angular.forEach(e.results, function(t) {
            t.geographyFormattedValue = n.getFormattedGeographyFromQuery(t.query),
            t.topicOfStudyFormattedValue = n.getFormattedTopicOfStudyFromQuery(t.query),
            t.filtersFormattedValue = e.getFormattedFilterFromQuery(t.query)
        })
    }
]),
angular.module("ds-reporting").directive("focusOnCondition", [
    "$timeout",
    function(e) {
        var t = function(e) {
            if (!e.focusOnCondition && "" != e.focusOnCondition)
                throw "FocusOnCondition missing attribute to evaluate"
        };
        return {
            restrict: "A",
            link: function(n, r, i) {
                t(i);
                var o;
                n.$watch(i.focusOnCondition, function(t) {
                    (o = t) && e(function() {
                        if (o) {
                            var e = $(r).data();
                            e && e.select2
                                ? $(r).select2("open")
                                : r.focus()
                        }
                    }, parseInt(i.focusDelay || 0, 10))
                })
            }
        }
    }
]);
