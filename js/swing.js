!function(t) {
    function e(i) {
        if (n[i])
            return n[i].exports;
        var r = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(r.exports, r, r.exports, e),
        r.loaded = !0,
        r.exports
    }
    var n = {};
    return e.m = t,
    e.c = n,
    e.p = "",
    e(0)
}([function(t, e, n) {
    (function(t) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(1)
          , o = i(r)
          , s = n(6)
          , u = i(s);
        t.gajus = t.gajus || {},
        t.gajus.Swing = {
            Stack: o["default"],
            Card: u["default"]
        },
        e.Stack = o["default"],
        e.Card = u["default"]
    }
    ).call(e, function() {
        return this
    }())
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(2)
      , o = i(r)
      , s = n(3)
      , u = i(s)
      , a = n(6)
      , c = i(a)
      , h = n(10)
      , l = i(h)
      , f = void 0;
    f = function(t) {
        var e = void 0
          , n = void 0
          , i = void 0
          , r = void 0
          , s = void 0;
        return e = function() {
            s = {},
            r = new u["default"].SpringSystem,
            n = o["default"](),
            i = []
        }
        ,
        e(),
        s.getConfig = function() {
            return t
        }
        ,
        s.getSpringSystem = function() {
            return r
        }
        ,
        s.on = function(t, e) {
            n.on(t, e)
        }
        ,
        s.createCard = function(t) {
            var e = void 0
              , r = void 0;
            return e = c["default"](s, t),
            r = ["throwout", "throwoutend", "throwoutleft", "throwoutright", "throwin", "throwinend", "dragstart", "dragmove", "dragend"],
            r.forEach(function(t) {
                e.on(t, function(e) {
                    n.trigger(t, e)
                })
            }),
            i.push({
                element: t,
                card: e
            }),
            e
        }
        ,
        s.getCard = function(t) {
            var e = void 0;
            return e = l["default"].find(i, {
                element: t
            }),
            e ? e.card : null
        }
        ,
        s.destroyCard = function(t) {
            return l["default"].remove(i, t)
        }
        ,
        s
    }
    ,
    e["default"] = f,
    t.exports = e["default"]
}
, function(t, e) {
    (function(e) {
        /**
	* @link https://github.com/gajus/sister for the canonical source repository
	* @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
	*/
        function n() {
            var t = {}
              , e = {};
            return t.on = function(t, n) {
                var i = {
                    name: t,
                    handler: n
                };
                return e[t] = e[t] || [],
                e[t].unshift(i),
                i
            }
            ,
            t.off = function(t) {
                var n = e[t.name].indexOf(t);
                -1 != n && e[t.name].splice(n, 1)
            }
            ,
            t.trigger = function(t, n) {
                var i, r = e[t];
                if (r)
                    for (i = r.length; i--; )
                        r[i].handler(n)
            }
            ,
            t
        }
        e.gajus = e.gajus || {},
        e.gajus.Sister = n,
        t.exports = n
    }
    ).call(e, function() {
        return this
    }())
}
, function(t, e, n) {
    (function(t, n) {
        !function() {
            function i(t, e) {
                var n = t.indexOf(e);
                -1 != n && t.splice(n, 1)
            }
            var r = {}
              , o = r.util = {}
              , s = Array.prototype.concat
              , u = Array.prototype.slice;
            o.bind = function(t, e) {
                var n = u.call(arguments, 2);
                return function() {
                    t.apply(e, s.call(n, u.call(arguments)))
                }
            }
            ,
            o.extend = function(t, e) {
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n])
            }
            ;
            var a = r.SpringSystem = function(t) {
                this._springRegistry = {},
                this._activeSprings = [],
                this.listeners = [],
                this._idleSpringIndices = [],
                this.looper = t || new f,
                this.looper.springSystem = this
            }
            ;
            o.extend(a.prototype, {
                _springRegistry: null ,
                _isIdle: !0,
                _lastTimeMillis: -1,
                _activeSprings: null ,
                listeners: null ,
                _idleSpringIndices: null ,
                setLooper: function(t) {
                    this.looper = t,
                    t.springSystem = this
                },
                createSpring: function(t, e) {
                    var n;
                    return n = void 0 === t || void 0 === e ? l.DEFAULT_ORIGAMI_SPRING_CONFIG : l.fromOrigamiTensionAndFriction(t, e),
                    this.createSpringWithConfig(n)
                },
                createSpringWithBouncinessAndSpeed: function(t, e) {
                    var n;
                    return n = void 0 === t || void 0 === e ? l.DEFAULT_ORIGAMI_SPRING_CONFIG : l.fromBouncinessAndSpeed(t, e),
                    this.createSpringWithConfig(n)
                },
                createSpringWithConfig: function(t) {
                    var e = new c(this);
                    return this.registerSpring(e),
                    e.setSpringConfig(t),
                    e
                },
                getIsIdle: function() {
                    return this._isIdle
                },
                getSpringById: function(t) {
                    return this._springRegistry[t]
                },
                getAllSprings: function() {
                    var t = [];
                    for (var e in this._springRegistry)
                        this._springRegistry.hasOwnProperty(e) && t.push(this._springRegistry[e]);
                    return t
                },
                registerSpring: function(t) {
                    this._springRegistry[t.getId()] = t
                },
                deregisterSpring: function(t) {
                    i(this._activeSprings, t),
                    delete this._springRegistry[t.getId()]
                },
                advance: function(t, e) {
                    for (; this._idleSpringIndices.length > 0; )
                        this._idleSpringIndices.pop();
                    for (var n = 0, i = this._activeSprings.length; i > n; n++) {
                        var r = this._activeSprings[n];
                        r.systemShouldAdvance() ? r.advance(t / 1e3, e / 1e3) : this._idleSpringIndices.push(this._activeSprings.indexOf(r))
                    }
                    for (; this._idleSpringIndices.length > 0; ) {
                        var o = this._idleSpringIndices.pop();
                        o >= 0 && this._activeSprings.splice(o, 1)
                    }
                },
                loop: function(t) {
                    var e;
                    -1 === this._lastTimeMillis && (this._lastTimeMillis = t - 1);
                    var n = t - this._lastTimeMillis;
                    this._lastTimeMillis = t;
                    var i = 0
                      , r = this.listeners.length;
                    for (i = 0; r > i; i++)
                        e = this.listeners[i],
                        e.onBeforeIntegrate && e.onBeforeIntegrate(this);
                    for (this.advance(t, n),
                    0 === this._activeSprings.length && (this._isIdle = !0,
                    this._lastTimeMillis = -1),
                    i = 0; r > i; i++)
                        e = this.listeners[i],
                        e.onAfterIntegrate && e.onAfterIntegrate(this);
                    this._isIdle || this.looper.run()
                },
                activateSpring: function(t) {
                    var e = this._springRegistry[t];
                    -1 == this._activeSprings.indexOf(e) && this._activeSprings.push(e),
                    this.getIsIdle() && (this._isIdle = !1,
                    this.looper.run())
                },
                addListener: function(t) {
                    this.listeners.push(t)
                },
                removeListener: function(t) {
                    i(this.listeners, t)
                },
                removeAllListeners: function() {
                    this.listeners = []
                }
            });
            var c = r.Spring = function _(t) {
                this._id = "s" + _._ID++,
                this._springSystem = t,
                this.listeners = [],
                this._currentState = new h,
                this._previousState = new h,
                this._tempState = new h
            }
            ;
            o.extend(c, {
                _ID: 0,
                MAX_DELTA_TIME_SEC: .064,
                SOLVER_TIMESTEP_SEC: .001
            }),
            o.extend(c.prototype, {
                _id: 0,
                _springConfig: null ,
                _overshootClampingEnabled: !1,
                _currentState: null ,
                _previousState: null ,
                _tempState: null ,
                _startValue: 0,
                _endValue: 0,
                _wasAtRest: !0,
                _restSpeedThreshold: .001,
                _displacementFromRestThreshold: .001,
                listeners: null ,
                _timeAccumulator: 0,
                _springSystem: null ,
                destroy: function() {
                    this.listeners = [],
                    this.frames = [],
                    this._springSystem.deregisterSpring(this)
                },
                getId: function() {
                    return this._id
                },
                setSpringConfig: function(t) {
                    return this._springConfig = t,
                    this
                },
                getSpringConfig: function() {
                    return this._springConfig
                },
                setCurrentValue: function(t, e) {
                    return this._startValue = t,
                    this._currentState.position = t,
                    e || this.setAtRest(),
                    this.notifyPositionUpdated(!1, !1),
                    this
                },
                getStartValue: function() {
                    return this._startValue
                },
                getCurrentValue: function() {
                    return this._currentState.position
                },
                getCurrentDisplacementDistance: function() {
                    return this.getDisplacementDistanceForState(this._currentState)
                },
                getDisplacementDistanceForState: function(t) {
                    return Math.abs(this._endValue - t.position)
                },
                setEndValue: function(t) {
                    if (this._endValue == t && this.isAtRest())
                        return this;
                    this._startValue = this.getCurrentValue(),
                    this._endValue = t,
                    this._springSystem.activateSpring(this.getId());
                    for (var e = 0, n = this.listeners.length; n > e; e++) {
                        var i = this.listeners[e]
                          , r = i.onSpringEndStateChange;
                        r && r(this)
                    }
                    return this
                },
                getEndValue: function() {
                    return this._endValue
                },
                setVelocity: function(t) {
                    return t === this._currentState.velocity ? this : (this._currentState.velocity = t,
                    this._springSystem.activateSpring(this.getId()),
                    this)
                },
                getVelocity: function() {
                    return this._currentState.velocity
                },
                setRestSpeedThreshold: function(t) {
                    return this._restSpeedThreshold = t,
                    this
                },
                getRestSpeedThreshold: function() {
                    return this._restSpeedThreshold
                },
                setRestDisplacementThreshold: function(t) {
                    this._displacementFromRestThreshold = t
                },
                getRestDisplacementThreshold: function() {
                    return this._displacementFromRestThreshold
                },
                setOvershootClampingEnabled: function(t) {
                    return this._overshootClampingEnabled = t,
                    this
                },
                isOvershootClampingEnabled: function() {
                    return this._overshootClampingEnabled
                },
                isOvershooting: function() {
                    var t = this._startValue
                      , e = this._endValue;
                    return this._springConfig.tension > 0 && (e > t && this.getCurrentValue() > e || t > e && this.getCurrentValue() < e)
                },
                advance: function(t, e) {
                    var n = this.isAtRest();
                    if (!n || !this._wasAtRest) {
                        var i = e;
                        e > c.MAX_DELTA_TIME_SEC && (i = c.MAX_DELTA_TIME_SEC),
                        this._timeAccumulator += i;
                        for (var r, o, s, u, a, h, l, f, p, d, v = this._springConfig.tension, g = this._springConfig.friction, m = this._currentState.position, _ = this._currentState.velocity, y = this._tempState.position, T = this._tempState.velocity; this._timeAccumulator >= c.SOLVER_TIMESTEP_SEC; )
                            this._timeAccumulator -= c.SOLVER_TIMESTEP_SEC,
                            this._timeAccumulator < c.SOLVER_TIMESTEP_SEC && (this._previousState.position = m,
                            this._previousState.velocity = _),
                            r = _,
                            o = v * (this._endValue - y) - g * _,
                            y = m + r * c.SOLVER_TIMESTEP_SEC * .5,
                            T = _ + o * c.SOLVER_TIMESTEP_SEC * .5,
                            s = T,
                            u = v * (this._endValue - y) - g * T,
                            y = m + s * c.SOLVER_TIMESTEP_SEC * .5,
                            T = _ + u * c.SOLVER_TIMESTEP_SEC * .5,
                            a = T,
                            h = v * (this._endValue - y) - g * T,
                            y = m + a * c.SOLVER_TIMESTEP_SEC * .5,
                            T = _ + h * c.SOLVER_TIMESTEP_SEC * .5,
                            l = T,
                            f = v * (this._endValue - y) - g * T,
                            p = 1 / 6 * (r + 2 * (s + a) + l),
                            d = 1 / 6 * (o + 2 * (u + h) + f),
                            m += p * c.SOLVER_TIMESTEP_SEC,
                            _ += d * c.SOLVER_TIMESTEP_SEC;
                        this._tempState.position = y,
                        this._tempState.velocity = T,
                        this._currentState.position = m,
                        this._currentState.velocity = _,
                        this._timeAccumulator > 0 && this._interpolate(this._timeAccumulator / c.SOLVER_TIMESTEP_SEC),
                        (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) && (this._springConfig.tension > 0 ? (this._startValue = this._endValue,
                        this._currentState.position = this._endValue) : (this._endValue = this._currentState.position,
                        this._startValue = this._endValue),
                        this.setVelocity(0),
                        n = !0);
                        var S = !1;
                        this._wasAtRest && (this._wasAtRest = !1,
                        S = !0);
                        var E = !1;
                        n && (this._wasAtRest = !0,
                        E = !0),
                        this.notifyPositionUpdated(S, E)
                    }
                },
                notifyPositionUpdated: function(t, e) {
                    for (var n = 0, i = this.listeners.length; i > n; n++) {
                        var r = this.listeners[n];
                        t && r.onSpringActivate && r.onSpringActivate(this),
                        r.onSpringUpdate && r.onSpringUpdate(this),
                        e && r.onSpringAtRest && r.onSpringAtRest(this)
                    }
                },
                systemShouldAdvance: function() {
                    return !this.isAtRest() || !this.wasAtRest()
                },
                wasAtRest: function() {
                    return this._wasAtRest
                },
                isAtRest: function() {
                    return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || 0 === this._springConfig.tension)
                },
                setAtRest: function() {
                    return this._endValue = this._currentState.position,
                    this._tempState.position = this._currentState.position,
                    this._currentState.velocity = 0,
                    this
                },
                _interpolate: function(t) {
                    this._currentState.position = this._currentState.position * t + this._previousState.position * (1 - t),
                    this._currentState.velocity = this._currentState.velocity * t + this._previousState.velocity * (1 - t)
                },
                getListeners: function() {
                    return this.listeners
                },
                addListener: function(t) {
                    return this.listeners.push(t),
                    this
                },
                removeListener: function(t) {
                    return i(this.listeners, t),
                    this
                },
                removeAllListeners: function() {
                    return this.listeners = [],
                    this
                },
                currentValueIsApproximately: function(t) {
                    return Math.abs(this.getCurrentValue() - t) <= this.getRestDisplacementThreshold()
                }
            });
            var h = function() {}
            ;
            o.extend(h.prototype, {
                position: 0,
                velocity: 0
            });
            var l = r.SpringConfig = function(t, e) {
                this.tension = t,
                this.friction = e
            }
              , f = r.AnimationLooper = function() {
                this.springSystem = null ;
                var t = this
                  , e = function() {
                    t.springSystem.loop(Date.now())
                }
                ;
                this.run = function() {
                    o.onFrame(e)
                }
            }
            ;
            r.SimulationLooper = function(t) {
                this.springSystem = null ;
                var e = 0
                  , n = !1;
                t = t || 16.667,
                this.run = function() {
                    if (!n) {
                        for (n = !0; !this.springSystem.getIsIdle(); )
                            this.springSystem.loop(e += t);
                        n = !1
                    }
                }
            }
            ,
            r.SteppingSimulationLooper = function(t) {
                this.springSystem = null ;
                var e = 0;
                this.run = function() {}
                ,
                this.step = function(t) {
                    this.springSystem.loop(e += t)
                }
            }
            ;
            var p = r.OrigamiValueConverter = {
                tensionFromOrigamiValue: function(t) {
                    return 3.62 * (t - 30) + 194
                },
                origamiValueFromTension: function(t) {
                    return (t - 194) / 3.62 + 30
                },
                frictionFromOrigamiValue: function(t) {
                    return 3 * (t - 8) + 25
                },
                origamiFromFriction: function(t) {
                    return (t - 25) / 3 + 8
                }
            }
              , d = r.BouncyConversion = function(t, e) {
                this.bounciness = t,
                this.speed = e;
                var n = this.normalize(t / 1.7, 0, 20);
                n = this.projectNormal(n, 0, .8);
                var i = this.normalize(e / 1.7, 0, 20);
                this.bouncyTension = this.projectNormal(i, .5, 200),
                this.bouncyFriction = this.quadraticOutInterpolation(n, this.b3Nobounce(this.bouncyTension), .01)
            }
            ;
            o.extend(d.prototype, {
                normalize: function(t, e, n) {
                    return (t - e) / (n - e)
                },
                projectNormal: function(t, e, n) {
                    return e + t * (n - e)
                },
                linearInterpolation: function(t, e, n) {
                    return t * n + (1 - t) * e
                },
                quadraticOutInterpolation: function(t, e, n) {
                    return this.linearInterpolation(2 * t - t * t, e, n)
                },
                b3Friction1: function(t) {
                    return 7e-4 * Math.pow(t, 3) - .031 * Math.pow(t, 2) + .64 * t + 1.28
                },
                b3Friction2: function(t) {
                    return 44e-6 * Math.pow(t, 3) - .006 * Math.pow(t, 2) + .36 * t + 2
                },
                b3Friction3: function(t) {
                    return 4.5e-7 * Math.pow(t, 3) - 332e-6 * Math.pow(t, 2) + .1078 * t + 5.84
                },
                b3Nobounce: function(t) {
                    var e = 0;
                    return e = 18 >= t ? this.b3Friction1(t) : t > 18 && 44 >= t ? this.b3Friction2(t) : this.b3Friction3(t)
                }
            }),
            o.extend(l, {
                fromOrigamiTensionAndFriction: function(t, e) {
                    return new l(p.tensionFromOrigamiValue(t),p.frictionFromOrigamiValue(e))
                },
                fromBouncinessAndSpeed: function(t, e) {
                    var n = new r.BouncyConversion(t,e);
                    return this.fromOrigamiTensionAndFriction(n.bouncyTension, n.bouncyFriction)
                },
                coastingConfigWithOrigamiFriction: function(t) {
                    return new l(0,p.frictionFromOrigamiValue(t))
                }
            }),
            l.DEFAULT_ORIGAMI_SPRING_CONFIG = l.fromOrigamiTensionAndFriction(40, 7),
            o.extend(l.prototype, {
                friction: 0,
                tension: 0
            });
            var v = {};
            o.hexToRGB = function(t) {
                if (v[t])
                    return v[t];
                t = t.replace("#", ""),
                3 === t.length && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
                var e = t.match(/.{2}/g)
                  , n = {
                    r: parseInt(e[0], 16),
                    g: parseInt(e[1], 16),
                    b: parseInt(e[2], 16)
                };
                return v[t] = n,
                n
            }
            ,
            o.rgbToHex = function(t, e, n) {
                return t = t.toString(16),
                e = e.toString(16),
                n = n.toString(16),
                t = t.length < 2 ? "0" + t : t,
                e = e.length < 2 ? "0" + e : e,
                n = n.length < 2 ? "0" + n : n,
                "#" + t + e + n
            }
            ;
            var g = r.MathUtil = {
                mapValueInRange: function(t, e, n, i, r) {
                    var o = n - e
                      , s = r - i
                      , u = (t - e) / o;
                    return i + u * s
                },
                interpolateColor: function(t, e, n, i, r, s) {
                    i = void 0 === i ? 0 : i,
                    r = void 0 === r ? 1 : r,
                    e = o.hexToRGB(e),
                    n = o.hexToRGB(n);
                    var u = Math.floor(o.mapValueInRange(t, i, r, e.r, n.r))
                      , a = Math.floor(o.mapValueInRange(t, i, r, e.g, n.g))
                      , c = Math.floor(o.mapValueInRange(t, i, r, e.b, n.b));
                    return s ? "rgb(" + u + "," + a + "," + c + ")" : o.rgbToHex(u, a, c)
                },
                degreesToRadians: function(t) {
                    return t * Math.PI / 180
                },
                radiansToDegrees: function(t) {
                    return 180 * t / Math.PI
                }
            };
            o.extend(o, g);
            var m;
            "undefined" != typeof window && (m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
                window.setTimeout(t, 1e3 / 60)
            }
            ),
            m || "undefined" == typeof t || "node" !== t.title || (m = n),
            o.onFrame = function(t) {
                return m(t)
            }
            ,
            o.extend(e, r)
        }()
    }
    ).call(e, n(4), n(5).setImmediate)
}
, function(t, e) {
    function n() {
        c = !1,
        s.length ? a = s.concat(a) : h = -1,
        a.length && i()
    }
    function i() {
        if (!c) {
            var t = setTimeout(n);
            c = !0;
            for (var e = a.length; e; ) {
                for (s = a,
                a = []; ++h < e; )
                    s[h].run();
                h = -1,
                e = a.length
            }
            s = null ,
            c = !1,
            clearTimeout(t)
        }
    }
    function r(t, e) {
        this.fun = t,
        this.array = e
    }
    function o() {}
    var s, u = t.exports = {}, a = [], c = !1, h = -1;
    u.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n];
        a.push(new r(t,e)),
        1 !== a.length || c || setTimeout(i, 0)
    }
    ,
    r.prototype.run = function() {
        this.fun.apply(null , this.array)
    }
    ,
    u.title = "browser",
    u.browser = !0,
    u.env = {},
    u.argv = [],
    u.version = "",
    u.versions = {},
    u.on = o,
    u.addListener = o,
    u.once = o,
    u.off = o,
    u.removeListener = o,
    u.removeAllListeners = o,
    u.emit = o,
    u.binding = function(t) {
        throw new Error("process.binding is not supported")
    }
    ,
    u.cwd = function() {
        return "/"
    }
    ,
    u.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }
    ,
    u.umask = function() {
        return 0
    }
}
, function(t, e, n) {
    (function(t, i) {
        function r(t, e) {
            this._id = t,
            this._clearFn = e
        }
        var o = n(4).nextTick
          , s = Function.prototype.apply
          , u = Array.prototype.slice
          , a = {}
          , c = 0;
        e.setTimeout = function() {
            return new r(s.call(setTimeout, window, arguments),clearTimeout)
        }
        ,
        e.setInterval = function() {
            return new r(s.call(setInterval, window, arguments),clearInterval)
        }
        ,
        e.clearTimeout = e.clearInterval = function(t) {
            t.close()
        }
        ,
        r.prototype.unref = r.prototype.ref = function() {}
        ,
        r.prototype.close = function() {
            this._clearFn.call(window, this._id)
        }
        ,
        e.enroll = function(t, e) {
            clearTimeout(t._idleTimeoutId),
            t._idleTimeout = e
        }
        ,
        e.unenroll = function(t) {
            clearTimeout(t._idleTimeoutId),
            t._idleTimeout = -1
        }
        ,
        e._unrefActive = e.active = function(t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                t._onTimeout && t._onTimeout()
            }, e))
        }
        ,
        e.setImmediate = "function" == typeof t ? t : function(t) {
            var n = c++
              , i = arguments.length < 2 ? !1 : u.call(arguments, 1);
            return a[n] = !0,
            o(function() {
                a[n] && (i ? t.apply(null , i) : t.call(null ),
                e.clearImmediate(n))
            }),
            n
        }
        ,
        e.clearImmediate = "function" == typeof i ? i : function(t) {
            delete a[t]
        }
    }
    ).call(e, n(5).setImmediate, n(5).clearImmediate)
}
, function(t, e, n) {
    (function(i) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = n(2)
          , s = r(o)
          , u = n(7)
          , a = r(u)
          , c = n(3)
          , h = r(c)
          , l = n(9)
          , f = r(l)
          , p = n(10)
          , d = r(p)
          , v = n(75)
          , g = r(v)
          , m = void 0;
        m = function(t, e) {
            var n = void 0
              , r = void 0
              , o = void 0
              , u = void 0
              , c = void 0
              , l = void 0
              , f = void 0
              , p = void 0
              , v = void 0
              , _ = void 0
              , y = void 0
              , T = void 0
              , S = void 0
              , E = void 0
              , w = void 0
              , I = void 0
              , x = void 0
              , b = void 0
              , A = void 0;
            return o = function() {
                n = {},
                r = m.makeConfig(t.getConfig()),
                f = s["default"](),
                w = t.getSpringSystem(),
                I = w.createSpring(250, 10),
                x = w.createSpring(500, 20),
                v = {},
                _ = {
                    x: 0,
                    y: 0
                },
                I.setRestSpeedThreshold(.05),
                I.setRestDisplacementThreshold(.05),
                x.setRestSpeedThreshold(.05),
                x.setRestDisplacementThreshold(.05),
                b = r.throwOutDistance(r.minThrowOutDistance, r.maxThrowOutDistance),
                S = new a["default"].Manager(e,{
                    recognizers: [[a["default"].Pan, {
                        threshold: 2
                    }]]
                }),
                m.appendToParent(e),
                f.on("panstart", function() {
                    m.appendToParent(e),
                    f.trigger("dragstart", {
                        target: e
                    }),
                    u = 0,
                    c = 0,
                    p = !0,
                    function t() {
                        p && (l(),
                        g["default"](t))
                    }()
                }),
                f.on("panmove", function(t) {
                    u = t.deltaX,
                    c = t.deltaY
                }),
                f.on("panend", function(t) {
                    var i = void 0
                      , o = void 0;
                    p = !1,
                    i = _.x + t.deltaX,
                    o = _.y + t.deltaY,
                    r.isThrowOut(i, e, r.throwOutConfidence(i, e)) ? n.throwOut(i, o) : n.throwIn(i, o),
                    f.trigger("dragend", {
                        target: e
                    })
                }),
                d["default"].isTouchDevice() ? (e.addEventListener("touchstart", function() {
                    f.trigger("panstart")
                }),
                function() {
                    var t = void 0;
                    e.addEventListener("touchstart", function() {
                        t = !0
                    }),
                    e.addEventListener("touchend", function() {
                        t = !1
                    }),
                    i.addEventListener("touchmove", function(e) {
                        t && e.preventDefault()
                    })
                }()) : e.addEventListener("mousedown", function() {
                    f.trigger("panstart")
                }),
                S.on("panmove", function(t) {
                    f.trigger("panmove", t)
                }),
                S.on("panend", function(t) {
                    f.trigger("panend", t)
                }),
                I.addListener({
                    onSpringUpdate: function(t) {
                        var e = void 0
                          , n = void 0
                          , i = void 0;
                        e = t.getCurrentValue(),
                        n = h["default"].MathUtil.mapValueInRange(e, 0, 1, v.fromX, 0),
                        i = h["default"].MathUtil.mapValueInRange(e, 0, 1, v.fromY, 0),
                        E(n, i)
                    },
                    onSpringAtRest: function() {
                        f.trigger("throwinend", {
                            target: e
                        })
                    }
                }),
                x.addListener({
                    onSpringUpdate: function(t) {
                        var e = void 0
                          , n = void 0
                          , i = void 0;
                        e = t.getCurrentValue(),
                        n = h["default"].MathUtil.mapValueInRange(e, 0, 1, v.fromX, b * v.direction),
                        i = v.fromY,
                        E(n, i)
                    },
                    onSpringAtRest: function() {
                        f.trigger("throwoutend", {
                            target: e
                        })
                    }
                }),
                l = function() {
                    var t = void 0
                      , n = void 0
                      , i = void 0;
                    (u !== y || c !== T) && (y = u,
                    T = c,
                    n = _.x + u,
                    i = _.y + c,
                    t = r.rotation(n, i, e, r.maxRotation),
                    r.transform(e, n, i, t),
                    f.trigger("dragmove", {
                        target: e,
                        throwOutConfidence: r.throwOutConfidence(n, e),
                        throwDirection: 0 > n ? m.DIRECTION_LEFT : m.DIRECTION_RIGHT
                    }))
                }
                ,
                E = function(t, n) {
                    var i = void 0;
                    i = r.rotation(t, n, e, r.maxRotation),
                    _.x = t || 0,
                    _.y = n || 0,
                    m.transform(e, t, n, i)
                }
                ,
                A = function(t, n, i) {
                    if (v.fromX = n,
                    v.fromY = i,
                    v.direction = v.fromX < 0 ? m.DIRECTION_LEFT : m.DIRECTION_RIGHT,
                    t === m.THROW_IN)
                        I.setCurrentValue(0).setAtRest().setEndValue(1),
                        f.trigger("throwin", {
                            target: e,
                            throwDirection: v.direction
                        });
                    else {
                        if (t !== m.THROW_OUT)
                            throw new Error("Invalid throw event.");
                        x.setCurrentValue(0).setAtRest().setVelocity(100).setEndValue(1),
                        f.trigger("throwout", {
                            target: e,
                            throwDirection: v.direction
                        }),
                        v.direction === m.DIRECTION_LEFT ? f.trigger("throwoutleft", {
                            target: e,
                            throwDirection: v.direction
                        }) : f.trigger("throwoutright", {
                            target: e,
                            throwDirection: v.direction
                        })
                    }
                }
            }
            ,
            o(),
            n.on = f.on,
            n.trigger = f.trigger,
            n.throwIn = function(t, e) {
                A(m.THROW_IN, t, e)
            }
            ,
            n.throwOut = function(t, e) {
                A(m.THROW_OUT, t, e)
            }
            ,
            n.destroy = function() {
                S.destroy(),
                I.destroy(),
                x.destroy(),
                t.destroyCard(n)
            }
            ,
            n
        }
        ,
        m.makeConfig = function() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]
              , e = void 0;
            return e = {
                isThrowOut: m.isThrowOut,
                throwOutConfidence: m.throwOutConfidence,
                throwOutDistance: m.throwOutDistance,
                minThrowOutDistance: 400,
                maxThrowOutDistance: 500,
                rotation: m.rotation,
                maxRotation: 20,
                transform: m.transform
            },
            d["default"].assign({}, e, t)
        }
        ,
        m.transform = function(t, e, n, i) {
            t.style[f["default"]("transform")] = "translate3d(0, 0, 0) translate(" + e + "px, " + n + "px) rotate(" + i + "deg)"
        }
        ,
        m.appendToParent = function(t) {
            var e = void 0
              , n = void 0
              , i = void 0;
            e = t.parentNode,
            n = d["default"].elementChildren(e),
            i = n.indexOf(t),
            i + 1 !== n.length && (e.removeChild(t),
            e.appendChild(t))
        }
        ,
        m.throwOutConfidence = function(t, e) {
            return Math.min(Math.abs(t) / e.offsetWidth, 1)
        }
        ,
        m.isThrowOut = function(t, e, n) {
            return 1 === n
        }
        ,
        m.throwOutDistance = function(t, e) {
            return d["default"].random(t, e)
        }
        ,
        m.rotation = function(t, e, n, i) {
            var r = void 0
              , o = void 0
              , s = void 0;
            return r = Math.min(Math.max(t / n.offsetWidth, -1), 1),
            s = (e > 0 ? 1 : -1) * Math.min(Math.abs(e) / 100, 1),
            o = r * s * i
        }
        ,
        m.DIRECTION_LEFT = -1,
        m.DIRECTION_RIGHT = 1,
        m.THROW_IN = "in",
        m.THROW_OUT = "out",
        e["default"] = m,
        t.exports = e["default"]
    }
    ).call(e, function() {
        return this
    }())
}
, function(t, e, n) {
    var i;
    /*! Hammer.JS - v2.0.4 - 2014-09-28
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2014 Jorik Tangelder;
	 * Licensed under the MIT license */
    !function(r, o, s, u) {
        "use strict";
        function a(t, e, n) {
            return setTimeout(d(t, n), e)
        }
        function c(t, e, n) {
            return Array.isArray(t) ? (h(t, n[e], n),
            !0) : !1
        }
        function h(t, e, n) {
            var i;
            if (t)
                if (t.forEach)
                    t.forEach(e, n);
                else if (t.length !== u)
                    for (i = 0; i < t.length; )
                        e.call(n, t[i], i, t),
                        i++;
                else
                    for (i in t)
                        t.hasOwnProperty(i) && e.call(n, t[i], i, t)
        }
        function l(t, e, n) {
            for (var i = Object.keys(e), r = 0; r < i.length; )
                (!n || n && t[i[r]] === u) && (t[i[r]] = e[i[r]]),
                r++;
            return t
        }
        function f(t, e) {
            return l(t, e, !0)
        }
        function p(t, e, n) {
            var i, r = e.prototype;
            i = t.prototype = Object.create(r),
            i.constructor = t,
            i._super = r,
            n && l(i, n)
        }
        function d(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        function v(t, e) {
            return typeof t == dt ? t.apply(e ? e[0] || u : u, e) : t
        }
        function g(t, e) {
            return t === u ? e : t
        }
        function m(t, e, n) {
            h(S(e), function(e) {
                t.addEventListener(e, n, !1)
            })
        }
        function _(t, e, n) {
            h(S(e), function(e) {
                t.removeEventListener(e, n, !1)
            })
        }
        function y(t, e) {
            for (; t; ) {
                if (t == e)
                    return !0;
                t = t.parentNode
            }
            return !1
        }
        function T(t, e) {
            return t.indexOf(e) > -1
        }
        function S(t) {
            return t.trim().split(/\s+/g)
        }
        function E(t, e, n) {
            if (t.indexOf && !n)
                return t.indexOf(e);
            for (var i = 0; i < t.length; ) {
                if (n && t[i][n] == e || !n && t[i] === e)
                    return i;
                i++
            }
            return -1
        }
        function w(t) {
            return Array.prototype.slice.call(t, 0)
        }
        function I(t, e, n) {
            for (var i = [], r = [], o = 0; o < t.length; ) {
                var s = e ? t[o][e] : t[o];
                E(r, s) < 0 && i.push(t[o]),
                r[o] = s,
                o++
            }
            return n && (i = e ? i.sort(function(t, n) {
                return t[e] > n[e]
            }) : i.sort()),
            i
        }
        function x(t, e) {
            for (var n, i, r = e[0].toUpperCase() + e.slice(1), o = 0; o < ft.length; ) {
                if (n = ft[o],
                i = n ? n + r : e,
                i in t)
                    return i;
                o++
            }
            return u
        }
        function b() {
            return _t++
        }
        function A(t) {
            var e = t.ownerDocument;
            return e.defaultView || e.parentWindow
        }
        function R(t, e) {
            var n = this;
            this.manager = t,
            this.callback = e,
            this.element = t.element,
            this.target = t.options.inputTarget,
            this.domHandler = function(e) {
                v(t.options.enable, [t]) && n.handler(e)
            }
            ,
            this.init()
        }
        function O(t) {
            var e, n = t.options.inputClass;
            return new (e = n ? n : St ? q : Et ? H : Tt ? B : X)(t,C)
        }
        function C(t, e, n) {
            var i = n.pointers.length
              , r = n.changedPointers.length
              , o = e & Rt && i - r === 0
              , s = e & (Ct | Mt) && i - r === 0;
            n.isFirst = !!o,
            n.isFinal = !!s,
            o && (t.session = {}),
            n.eventType = e,
            M(t, n),
            t.emit("hammer.input", n),
            t.recognize(n),
            t.session.prevInput = n
        }
        function M(t, e) {
            var n = t.session
              , i = e.pointers
              , r = i.length;
            n.firstInput || (n.firstInput = V(e)),
            r > 1 && !n.firstMultiple ? n.firstMultiple = V(e) : 1 === r && (n.firstMultiple = !1);
            var o = n.firstInput
              , s = n.firstMultiple
              , u = s ? s.center : o.center
              , a = e.center = j(i);
            e.timeStamp = mt(),
            e.deltaTime = e.timeStamp - o.timeStamp,
            e.angle = z(u, a),
            e.distance = N(u, a),
            D(n, e),
            e.offsetDirection = L(e.deltaX, e.deltaY),
            e.scale = s ? U(s.pointers, i) : 1,
            e.rotation = s ? W(s.pointers, i) : 0,
            F(n, e);
            var c = t.element;
            y(e.srcEvent.target, c) && (c = e.srcEvent.target),
            e.target = c
        }
        function D(t, e) {
            var n = e.center
              , i = t.offsetDelta || {}
              , r = t.prevDelta || {}
              , o = t.prevInput || {};
            (e.eventType === Rt || o.eventType === Ct) && (r = t.prevDelta = {
                x: o.deltaX || 0,
                y: o.deltaY || 0
            },
            i = t.offsetDelta = {
                x: n.x,
                y: n.y
            }),
            e.deltaX = r.x + (n.x - i.x),
            e.deltaY = r.y + (n.y - i.y)
        }
        function F(t, e) {
            var n, i, r, o, s = t.lastInterval || e, a = e.timeStamp - s.timeStamp;
            if (e.eventType != Mt && (a > At || s.velocity === u)) {
                var c = s.deltaX - e.deltaX
                  , h = s.deltaY - e.deltaY
                  , l = P(a, c, h);
                i = l.x,
                r = l.y,
                n = gt(l.x) > gt(l.y) ? l.x : l.y,
                o = L(c, h),
                t.lastInterval = e
            } else
                n = s.velocity,
                i = s.velocityX,
                r = s.velocityY,
                o = s.direction;
            e.velocity = n,
            e.velocityX = i,
            e.velocityY = r,
            e.direction = o
        }
        function V(t) {
            for (var e = [], n = 0; n < t.pointers.length; )
                e[n] = {
                    clientX: vt(t.pointers[n].clientX),
                    clientY: vt(t.pointers[n].clientY)
                },
                n++;
            return {
                timeStamp: mt(),
                pointers: e,
                center: j(e),
                deltaX: t.deltaX,
                deltaY: t.deltaY
            }
        }
        function j(t) {
            var e = t.length;
            if (1 === e)
                return {
                    x: vt(t[0].clientX),
                    y: vt(t[0].clientY)
                };
            for (var n = 0, i = 0, r = 0; e > r; )
                n += t[r].clientX,
                i += t[r].clientY,
                r++;
            return {
                x: vt(n / e),
                y: vt(i / e)
            }
        }
        function P(t, e, n) {
            return {
                x: e / t || 0,
                y: n / t || 0
            }
        }
        function L(t, e) {
            return t === e ? Dt : gt(t) >= gt(e) ? t > 0 ? Ft : Vt : e > 0 ? jt : Pt
        }
        function N(t, e, n) {
            n || (n = Wt);
            var i = e[n[0]] - t[n[0]]
              , r = e[n[1]] - t[n[1]];
            return Math.sqrt(i * i + r * r)
        }
        function z(t, e, n) {
            n || (n = Wt);
            var i = e[n[0]] - t[n[0]]
              , r = e[n[1]] - t[n[1]];
            return 180 * Math.atan2(r, i) / Math.PI
        }
        function W(t, e) {
            return z(e[1], e[0], Ut) - z(t[1], t[0], Ut)
        }
        function U(t, e) {
            return N(e[0], e[1], Ut) / N(t[0], t[1], Ut)
        }
        function X() {
            this.evEl = qt,
            this.evWin = Yt,
            this.allow = !0,
            this.pressed = !1,
            R.apply(this, arguments)
        }
        function q() {
            this.evEl = Gt,
            this.evWin = Bt,
            R.apply(this, arguments),
            this.store = this.manager.session.pointerEvents = []
        }
        function Y() {
            this.evTarget = Zt,
            this.evWin = Jt,
            this.started = !1,
            R.apply(this, arguments)
        }
        function k(t, e) {
            var n = w(t.touches)
              , i = w(t.changedTouches);
            return e & (Ct | Mt) && (n = I(n.concat(i), "identifier", !0)),
            [n, i]
        }
        function H() {
            this.evTarget = Qt,
            this.targetIds = {},
            R.apply(this, arguments)
        }
        function G(t, e) {
            var n = w(t.touches)
              , i = this.targetIds;
            if (e & (Rt | Ot) && 1 === n.length)
                return i[n[0].identifier] = !0,
                [n, n];
            var r, o, s = w(t.changedTouches), u = [], a = this.target;
            if (o = n.filter(function(t) {
                return y(t.target, a)
            }),
            e === Rt)
                for (r = 0; r < o.length; )
                    i[o[r].identifier] = !0,
                    r++;
            for (r = 0; r < s.length; )
                i[s[r].identifier] && u.push(s[r]),
                e & (Ct | Mt) && delete i[s[r].identifier],
                r++;
            return u.length ? [I(o.concat(u), "identifier", !0), u] : void 0
        }
        function B() {
            R.apply(this, arguments);
            var t = d(this.handler, this);
            this.touch = new H(this.manager,t),
            this.mouse = new X(this.manager,t)
        }
        function $(t, e) {
            this.manager = t,
            this.set(e)
        }
        function Z(t) {
            if (T(t, oe))
                return oe;
            var e = T(t, se)
              , n = T(t, ue);
            return e && n ? se + " " + ue : e || n ? e ? se : ue : T(t, re) ? re : ie
        }
        function J(t) {
            this.id = b(),
            this.manager = null ,
            this.options = f(t || {}, this.defaults),
            this.options.enable = g(this.options.enable, !0),
            this.state = ae,
            this.simultaneous = {},
            this.requireFail = []
        }
        function K(t) {
            return t & pe ? "cancel" : t & le ? "end" : t & he ? "move" : t & ce ? "start" : ""
        }
        function Q(t) {
            return t == Pt ? "down" : t == jt ? "up" : t == Ft ? "left" : t == Vt ? "right" : ""
        }
        function tt(t, e) {
            var n = e.manager;
            return n ? n.get(t) : t
        }
        function et() {
            J.apply(this, arguments)
        }
        function nt() {
            et.apply(this, arguments),
            this.pX = null ,
            this.pY = null
        }
        function it() {
            et.apply(this, arguments)
        }
        function rt() {
            J.apply(this, arguments),
            this._timer = null ,
            this._input = null
        }
        function ot() {
            et.apply(this, arguments)
        }
        function st() {
            et.apply(this, arguments)
        }
        function ut() {
            J.apply(this, arguments),
            this.pTime = !1,
            this.pCenter = !1,
            this._timer = null ,
            this._input = null ,
            this.count = 0
        }
        function at(t, e) {
            return e = e || {},
            e.recognizers = g(e.recognizers, at.defaults.preset),
            new ct(t,e)
        }
        function ct(t, e) {
            e = e || {},
            this.options = f(e, at.defaults),
            this.options.inputTarget = this.options.inputTarget || t,
            this.handlers = {},
            this.session = {},
            this.recognizers = [],
            this.element = t,
            this.input = O(this),
            this.touchAction = new $(this,this.options.touchAction),
            ht(this, !0),
            h(e.recognizers, function(t) {
                var e = this.add(new t[0](t[1]));
                t[2] && e.recognizeWith(t[2]),
                t[3] && e.requireFailure(t[3])
            }, this)
        }
        function ht(t, e) {
            var n = t.element;
            h(t.options.cssProps, function(t, i) {
                n.style[x(n.style, i)] = e ? t : ""
            })
        }
        function lt(t, e) {
            var n = o.createEvent("Event");
            n.initEvent(t, !0, !0),
            n.gesture = e,
            e.target.dispatchEvent(n)
        }
        var ft = ["", "webkit", "moz", "MS", "ms", "o"]
          , pt = o.createElement("div")
          , dt = "function"
          , vt = Math.round
          , gt = Math.abs
          , mt = Date.now
          , _t = 1
          , yt = /mobile|tablet|ip(ad|hone|od)|android/i
          , Tt = "ontouchstart"in r
          , St = x(r, "PointerEvent") !== u
          , Et = Tt && yt.test(navigator.userAgent)
          , wt = "touch"
          , It = "pen"
          , xt = "mouse"
          , bt = "kinect"
          , At = 25
          , Rt = 1
          , Ot = 2
          , Ct = 4
          , Mt = 8
          , Dt = 1
          , Ft = 2
          , Vt = 4
          , jt = 8
          , Pt = 16
          , Lt = Ft | Vt
          , Nt = jt | Pt
          , zt = Lt | Nt
          , Wt = ["x", "y"]
          , Ut = ["clientX", "clientY"];
        R.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && m(this.element, this.evEl, this.domHandler),
                this.evTarget && m(this.target, this.evTarget, this.domHandler),
                this.evWin && m(A(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && _(this.element, this.evEl, this.domHandler),
                this.evTarget && _(this.target, this.evTarget, this.domHandler),
                this.evWin && _(A(this.element), this.evWin, this.domHandler)
            }
        };
        var Xt = {
            mousedown: Rt,
            mousemove: Ot,
            mouseup: Ct
        }
          , qt = "mousedown"
          , Yt = "mousemove mouseup";
        p(X, R, {
            handler: function(t) {
                var e = Xt[t.type];
                e & Rt && 0 === t.button && (this.pressed = !0),
                e & Ot && 1 !== t.which && (e = Ct),
                this.pressed && this.allow && (e & Ct && (this.pressed = !1),
                this.callback(this.manager, e, {
                    pointers: [t],
                    changedPointers: [t],
                    pointerType: xt,
                    srcEvent: t
                }))
            }
        });
        var kt = {
            pointerdown: Rt,
            pointermove: Ot,
            pointerup: Ct,
            pointercancel: Mt,
            pointerout: Mt
        }
          , Ht = {
            2: wt,
            3: It,
            4: xt,
            5: bt
        }
          , Gt = "pointerdown"
          , Bt = "pointermove pointerup pointercancel";
        r.MSPointerEvent && (Gt = "MSPointerDown",
        Bt = "MSPointerMove MSPointerUp MSPointerCancel"),
        p(q, R, {
            handler: function(t) {
                var e = this.store
                  , n = !1
                  , i = t.type.toLowerCase().replace("ms", "")
                  , r = kt[i]
                  , o = Ht[t.pointerType] || t.pointerType
                  , s = o == wt
                  , u = E(e, t.pointerId, "pointerId");
                r & Rt && (0 === t.button || s) ? 0 > u && (e.push(t),
                u = e.length - 1) : r & (Ct | Mt) && (n = !0),
                0 > u || (e[u] = t,
                this.callback(this.manager, r, {
                    pointers: e,
                    changedPointers: [t],
                    pointerType: o,
                    srcEvent: t
                }),
                n && e.splice(u, 1))
            }
        });
        var $t = {
            touchstart: Rt,
            touchmove: Ot,
            touchend: Ct,
            touchcancel: Mt
        }
          , Zt = "touchstart"
          , Jt = "touchstart touchmove touchend touchcancel";
        p(Y, R, {
            handler: function(t) {
                var e = $t[t.type];
                if (e === Rt && (this.started = !0),
                this.started) {
                    var n = k.call(this, t, e);
                    e & (Ct | Mt) && n[0].length - n[1].length === 0 && (this.started = !1),
                    this.callback(this.manager, e, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: wt,
                        srcEvent: t
                    })
                }
            }
        });
        var Kt = {
            touchstart: Rt,
            touchmove: Ot,
            touchend: Ct,
            touchcancel: Mt
        }
          , Qt = "touchstart touchmove touchend touchcancel";
        p(H, R, {
            handler: function(t) {
                var e = Kt[t.type]
                  , n = G.call(this, t, e);
                n && this.callback(this.manager, e, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: wt,
                    srcEvent: t
                })
            }
        }),
        p(B, R, {
            handler: function(t, e, n) {
                var i = n.pointerType == wt
                  , r = n.pointerType == xt;
                if (i)
                    this.mouse.allow = !1;
                else if (r && !this.mouse.allow)
                    return;
                e & (Ct | Mt) && (this.mouse.allow = !0),
                this.callback(t, e, n)
            },
            destroy: function() {
                this.touch.destroy(),
                this.mouse.destroy()
            }
        });
        var te = x(pt.style, "touchAction")
          , ee = te !== u
          , ne = "compute"
          , ie = "auto"
          , re = "manipulation"
          , oe = "none"
          , se = "pan-x"
          , ue = "pan-y";
        $.prototype = {
            set: function(t) {
                t == ne && (t = this.compute()),
                ee && (this.manager.element.style[te] = t),
                this.actions = t.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var t = [];
                return h(this.manager.recognizers, function(e) {
                    v(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                }),
                Z(t.join(" "))
            },
            preventDefaults: function(t) {
                if (!ee) {
                    var e = t.srcEvent
                      , n = t.offsetDirection;
                    if (this.manager.session.prevented)
                        return void e.preventDefault();
                    var i = this.actions
                      , r = T(i, oe)
                      , o = T(i, ue)
                      , s = T(i, se);
                    return r || o && n & Lt || s && n & Nt ? this.preventSrc(e) : void 0
                }
            },
            preventSrc: function(t) {
                this.manager.session.prevented = !0,
                t.preventDefault()
            }
        };
        var ae = 1
          , ce = 2
          , he = 4
          , le = 8
          , fe = le
          , pe = 16
          , de = 32;
        J.prototype = {
            defaults: {},
            set: function(t) {
                return l(this.options, t),
                this.manager && this.manager.touchAction.update(),
                this
            },
            recognizeWith: function(t) {
                if (c(t, "recognizeWith", this))
                    return this;
                var e = this.simultaneous;
                return t = tt(t, this),
                e[t.id] || (e[t.id] = t,
                t.recognizeWith(this)),
                this
            },
            dropRecognizeWith: function(t) {
                return c(t, "dropRecognizeWith", this) ? this : (t = tt(t, this),
                delete this.simultaneous[t.id],
                this)
            },
            requireFailure: function(t) {
                if (c(t, "requireFailure", this))
                    return this;
                var e = this.requireFail;
                return t = tt(t, this),
                -1 === E(e, t) && (e.push(t),
                t.requireFailure(this)),
                this
            },
            dropRequireFailure: function(t) {
                if (c(t, "dropRequireFailure", this))
                    return this;
                t = tt(t, this);
                var e = E(this.requireFail, t);
                return e > -1 && this.requireFail.splice(e, 1),
                this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(t) {
                return !!this.simultaneous[t.id]
            },
            emit: function(t) {
                function e(e) {
                    n.manager.emit(n.options.event + (e ? K(i) : ""), t)
                }
                var n = this
                  , i = this.state;
                le > i && e(!0),
                e(),
                i >= le && e(!0)
            },
            tryEmit: function(t) {
                return this.canEmit() ? this.emit(t) : void (this.state = de)
            },
            canEmit: function() {
                for (var t = 0; t < this.requireFail.length; ) {
                    if (!(this.requireFail[t].state & (de | ae)))
                        return !1;
                    t++
                }
                return !0
            },
            recognize: function(t) {
                var e = l({}, t);
                return v(this.options.enable, [this, e]) ? (this.state & (fe | pe | de) && (this.state = ae),
                this.state = this.process(e),
                void (this.state & (ce | he | le | pe) && this.tryEmit(e))) : (this.reset(),
                void (this.state = de))
            },
            process: function(t) {},
            getTouchAction: function() {},
            reset: function() {}
        },
        p(et, J, {
            defaults: {
                pointers: 1
            },
            attrTest: function(t) {
                var e = this.options.pointers;
                return 0 === e || t.pointers.length === e
            },
            process: function(t) {
                var e = this.state
                  , n = t.eventType
                  , i = e & (ce | he)
                  , r = this.attrTest(t);
                return i && (n & Mt || !r) ? e | pe : i || r ? n & Ct ? e | le : e & ce ? e | he : ce : de
            }
        }),
        p(nt, et, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: zt
            },
            getTouchAction: function() {
                var t = this.options.direction
                  , e = [];
                return t & Lt && e.push(ue),
                t & Nt && e.push(se),
                e
            },
            directionTest: function(t) {
                var e = this.options
                  , n = !0
                  , i = t.distance
                  , r = t.direction
                  , o = t.deltaX
                  , s = t.deltaY;
                return r & e.direction || (e.direction & Lt ? (r = 0 === o ? Dt : 0 > o ? Ft : Vt,
                n = o != this.pX,
                i = Math.abs(t.deltaX)) : (r = 0 === s ? Dt : 0 > s ? jt : Pt,
                n = s != this.pY,
                i = Math.abs(t.deltaY))),
                t.direction = r,
                n && i > e.threshold && r & e.direction
            },
            attrTest: function(t) {
                return et.prototype.attrTest.call(this, t) && (this.state & ce || !(this.state & ce) && this.directionTest(t))
            },
            emit: function(t) {
                this.pX = t.deltaX,
                this.pY = t.deltaY;
                var e = Q(t.direction);
                e && this.manager.emit(this.options.event + e, t),
                this._super.emit.call(this, t)
            }
        }),
        p(it, et, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [oe]
            },
            attrTest: function(t) {
                return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & ce)
            },
            emit: function(t) {
                if (this._super.emit.call(this, t),
                1 !== t.scale) {
                    var e = t.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + e, t)
                }
            }
        }),
        p(rt, J, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [ie]
            },
            process: function(t) {
                var e = this.options
                  , n = t.pointers.length === e.pointers
                  , i = t.distance < e.threshold
                  , r = t.deltaTime > e.time;
                if (this._input = t,
                !i || !n || t.eventType & (Ct | Mt) && !r)
                    this.reset();
                else if (t.eventType & Rt)
                    this.reset(),
                    this._timer = a(function() {
                        this.state = fe,
                        this.tryEmit()
                    }, e.time, this);
                else if (t.eventType & Ct)
                    return fe;
                return de
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(t) {
                this.state === fe && (t && t.eventType & Ct ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = mt(),
                this.manager.emit(this.options.event, this._input)))
            }
        }),
        p(ot, et, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [oe]
            },
            attrTest: function(t) {
                return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & ce)
            }
        }),
        p(st, et, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: Lt | Nt,
                pointers: 1
            },
            getTouchAction: function() {
                return nt.prototype.getTouchAction.call(this)
            },
            attrTest: function(t) {
                var e, n = this.options.direction;
                return n & (Lt | Nt) ? e = t.velocity : n & Lt ? e = t.velocityX : n & Nt && (e = t.velocityY),
                this._super.attrTest.call(this, t) && n & t.direction && t.distance > this.options.threshold && gt(e) > this.options.velocity && t.eventType & Ct
            },
            emit: function(t) {
                var e = Q(t.direction);
                e && this.manager.emit(this.options.event + e, t),
                this.manager.emit(this.options.event, t)
            }
        }),
        p(ut, J, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 2,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [re]
            },
            process: function(t) {
                var e = this.options
                  , n = t.pointers.length === e.pointers
                  , i = t.distance < e.threshold
                  , r = t.deltaTime < e.time;
                if (this.reset(),
                t.eventType & Rt && 0 === this.count)
                    return this.failTimeout();
                if (i && r && n) {
                    if (t.eventType != Ct)
                        return this.failTimeout();
                    var o = this.pTime ? t.timeStamp - this.pTime < e.interval : !0
                      , s = !this.pCenter || N(this.pCenter, t.center) < e.posThreshold;
                    this.pTime = t.timeStamp,
                    this.pCenter = t.center,
                    s && o ? this.count += 1 : this.count = 1,
                    this._input = t;
                    var u = this.count % e.taps;
                    if (0 === u)
                        return this.hasRequireFailures() ? (this._timer = a(function() {
                            this.state = fe,
                            this.tryEmit()
                        }, e.interval, this),
                        ce) : fe
                }
                return de
            },
            failTimeout: function() {
                return this._timer = a(function() {
                    this.state = de
                }, this.options.interval, this),
                de
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == fe && (this._input.tapCount = this.count,
                this.manager.emit(this.options.event, this._input))
            }
        }),
        at.VERSION = "2.0.4",
        at.defaults = {
            domEvents: !1,
            touchAction: ne,
            enable: !0,
            inputTarget: null ,
            inputClass: null ,
            preset: [[ot, {
                enable: !1
            }], [it, {
                enable: !1
            }, ["rotate"]], [st, {
                direction: Lt
            }], [nt, {
                direction: Lt
            }, ["swipe"]], [ut], [ut, {
                event: "doubletap",
                taps: 2
            }, ["tap"]], [rt]],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var ve = 1
          , ge = 2;
        ct.prototype = {
            set: function(t) {
                return l(this.options, t),
                t.touchAction && this.touchAction.update(),
                t.inputTarget && (this.input.destroy(),
                this.input.target = t.inputTarget,
                this.input.init()),
                this
            },
            stop: function(t) {
                this.session.stopped = t ? ge : ve
            },
            recognize: function(t) {
                var e = this.session;
                if (!e.stopped) {
                    this.touchAction.preventDefaults(t);
                    var n, i = this.recognizers, r = e.curRecognizer;
                    (!r || r && r.state & fe) && (r = e.curRecognizer = null );
                    for (var o = 0; o < i.length; )
                        n = i[o],
                        e.stopped === ge || r && n != r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(t),
                        !r && n.state & (ce | he | le) && (r = e.curRecognizer = n),
                        o++
                }
            },
            get: function(t) {
                if (t instanceof J)
                    return t;
                for (var e = this.recognizers, n = 0; n < e.length; n++)
                    if (e[n].options.event == t)
                        return e[n];
                return null
            },
            add: function(t) {
                if (c(t, "add", this))
                    return this;
                var e = this.get(t.options.event);
                return e && this.remove(e),
                this.recognizers.push(t),
                t.manager = this,
                this.touchAction.update(),
                t
            },
            remove: function(t) {
                if (c(t, "remove", this))
                    return this;
                var e = this.recognizers;
                return t = this.get(t),
                e.splice(E(e, t), 1),
                this.touchAction.update(),
                this
            },
            on: function(t, e) {
                var n = this.handlers;
                return h(S(t), function(t) {
                    n[t] = n[t] || [],
                    n[t].push(e)
                }),
                this
            },
            off: function(t, e) {
                var n = this.handlers;
                return h(S(t), function(t) {
                    e ? n[t].splice(E(n[t], e), 1) : delete n[t]
                }),
                this
            },
            emit: function(t, e) {
                this.options.domEvents && lt(t, e);
                var n = this.handlers[t] && this.handlers[t].slice();
                if (n && n.length) {
                    e.type = t,
                    e.preventDefault = function() {
                        e.srcEvent.preventDefault()
                    }
                    ;
                    for (var i = 0; i < n.length; )
                        n[i](e),
                        i++
                }
            },
            destroy: function() {
                this.element && ht(this, !1),
                this.handlers = {},
                this.session = {},
                this.input.destroy(),
                this.element = null
            }
        },
        l(at, {
            INPUT_START: Rt,
            INPUT_MOVE: Ot,
            INPUT_END: Ct,
            INPUT_CANCEL: Mt,
            STATE_POSSIBLE: ae,
            STATE_BEGAN: ce,
            STATE_CHANGED: he,
            STATE_ENDED: le,
            STATE_RECOGNIZED: fe,
            STATE_CANCELLED: pe,
            STATE_FAILED: de,
            DIRECTION_NONE: Dt,
            DIRECTION_LEFT: Ft,
            DIRECTION_RIGHT: Vt,
            DIRECTION_UP: jt,
            DIRECTION_DOWN: Pt,
            DIRECTION_HORIZONTAL: Lt,
            DIRECTION_VERTICAL: Nt,
            DIRECTION_ALL: zt,
            Manager: ct,
            Input: R,
            TouchAction: $,
            TouchInput: H,
            MouseInput: X,
            PointerEventInput: q,
            TouchMouseInput: B,
            SingleTouchInput: Y,
            Recognizer: J,
            AttrRecognizer: et,
            Tap: ut,
            Pan: nt,
            Swipe: st,
            Pinch: it,
            Rotate: ot,
            Press: rt,
            on: m,
            off: _,
            each: h,
            merge: f,
            extend: l,
            inherit: p,
            bindFn: d,
            prefixed: x
        }),
        "function" == dt && n(8) ? (i = function() {
            return at
        }
        .call(e, n, e, t),
        !(i !== u && (t.exports = i))) : "undefined" != typeof t && t.exports ? t.exports = at : r[s] = at
    }(window, document, "Hammer")
}
, function(t, e) {
    (function(e) {
        t.exports = e
    }
    ).call(e, {})
}
, function(t, e) {
    "use strict";
    function n(t) {
        return t in c ? c[t] : c[t] = i(t)
    }
    function i(t) {
        var e, n = t.replace(/-([a-z])/g, function(t, e) {
            return e.toUpperCase()
        }), i = u.length;
        if (void 0 !== s[n])
            return n;
        for (n = r(t); i--; )
            if (e = u[i] + n,
            void 0 !== s[e])
                return e;
        throw new Error("unable to prefix " + t)
    }
    function r(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }
    function o(t) {
        var e = n(t)
          , i = /([A-Z])/g;
        return i.test(e) && (e = (a.test(e) ? "-" : "") + e.replace(i, "-$1")),
        e.toLowerCase()
    }
    var s = document.createElement("p").style
      , u = "O ms Moz webkit".split(" ")
      , a = /^(o|ms|moz|webkit)/
      , c = {};
    t.exports = n,
    t.exports.dash = o
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(11)
      , o = i(r)
      , s = n(53)
      , u = i(s)
      , a = n(60)
      , c = i(a)
      , h = n(62)
      , l = i(h)
      , f = n(71)
      , p = i(f)
      , d = void 0;
    d = {},
    d.remove = o["default"],
    d.assign = u["default"],
    d.random = c["default"],
    d.find = l["default"],
    d.where = p["default"],
    d.elementChildren = function(t) {
        return d.where(t.childNodes, {
            nodeType: 1
        })
    }
    ,
    d.isTouchDevice = function() {
        return "ontouchstart"in window || navigator.msMaxTouchPoints
    }
    ,
    e["default"] = d,
    t.exports = e["default"]
}
, function(t, e, n) {
    function i(t, e, n) {
        var i = [];
        if (!t || !t.length)
            return i;
        var s = -1
          , u = []
          , a = t.length;
        for (e = r(e, n, 3); ++s < a; ) {
            var c = t[s];
            e(c, s, t) && (i.push(c),
            u.push(s))
        }
        return o(t, u),
        i
    }
    var r = n(12)
      , o = n(52);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n) {
        var i = typeof t;
        return "function" == i ? void 0 === e ? t : s(t, e, n) : null == t ? u : "object" == i ? r(t) : void 0 === e ? a(t) : o(t, e)
    }
    var r = n(13)
      , o = n(41)
      , s = n(48)
      , u = n(49)
      , a = n(50);
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        var e = o(t);
        if (1 == e.length && e[0][2]) {
            var n = e[0][0]
              , i = e[0][1];
            return function(t) {
                return null == t ? !1 : t[n] === i && (void 0 !== i || n in s(t))
            }
        }
        return function(t) {
            return r(t, e)
        }
    }
    var r = n(14)
      , o = n(38)
      , s = n(37);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n) {
        var i = e.length
          , s = i
          , u = !n;
        if (null == t)
            return !s;
        for (t = o(t); i--; ) {
            var a = e[i];
            if (u && a[2] ? a[1] !== t[a[0]] : !(a[0]in t))
                return !1
        }
        for (; ++i < s; ) {
            a = e[i];
            var c = a[0]
              , h = t[c]
              , l = a[1];
            if (u && a[2]) {
                if (void 0 === h && !(c in t))
                    return !1
            } else {
                var f = n ? n(h, l, c) : void 0;
                if (!(void 0 === f ? r(l, h, n, !0) : f))
                    return !1
            }
        }
        return !0
    }
    var r = n(15)
      , o = n(37);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n, u, a, c) {
        return t === e ? !0 : null == t || null == e || !o(t) && !s(e) ? t !== t && e !== e : r(t, e, i, n, u, a, c)
    }
    var r = n(16)
      , o = n(25)
      , s = n(26);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n, i, f, v, g) {
        var m = u(t)
          , _ = u(e)
          , y = h
          , T = h;
        m || (y = d.call(t),
        y == c ? y = l : y != l && (m = a(t))),
        _ || (T = d.call(e),
        T == c ? T = l : T != l && (_ = a(e)));
        var S = y == l
          , E = T == l
          , w = y == T;
        if (w && !m && !S)
            return o(t, e, y);
        if (!f) {
            var I = S && p.call(t, "__wrapped__")
              , x = E && p.call(e, "__wrapped__");
            if (I || x)
                return n(I ? t.value() : t, x ? e.value() : e, i, f, v, g)
        }
        if (!w)
            return !1;
        v || (v = []),
        g || (g = []);
        for (var b = v.length; b--; )
            if (v[b] == t)
                return g[b] == e;
        v.push(t),
        g.push(e);
        var A = (m ? r : s)(t, e, n, i, f, v, g);
        return v.pop(),
        g.pop(),
        A
    }
    var r = n(17)
      , o = n(19)
      , s = n(20)
      , u = n(33)
      , a = n(36)
      , c = "[object Arguments]"
      , h = "[object Array]"
      , l = "[object Object]"
      , f = Object.prototype
      , p = f.hasOwnProperty
      , d = f.toString;
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n, i, o, s, u) {
        var a = -1
          , c = t.length
          , h = e.length;
        if (c != h && !(o && h > c))
            return !1;
        for (; ++a < c; ) {
            var l = t[a]
              , f = e[a]
              , p = i ? i(o ? f : l, o ? l : f, a) : void 0;
            if (void 0 !== p) {
                if (p)
                    continue;return !1
            }
            if (o) {
                if (!r(e, function(t) {
                    return l === t || n(l, t, i, o, s, u)
                }))
                    return !1
            } else if (l !== f && !n(l, f, i, o, s, u))
                return !1
        }
        return !0
    }
    var r = n(18);
    t.exports = i
}
, function(t, e) {
    function n(t, e) {
        for (var n = -1, i = t.length; ++n < i; )
            if (e(t[n], n, t))
                return !0;
        return !1
    }
    t.exports = n
}
, function(t, e) {
    function n(t, e, n) {
        switch (n) {
        case i:
        case r:
            return +t == +e;
        case o:
            return t.name == e.name && t.message == e.message;
        case s:
            return t != +t ? e != +e : t == +e;
        case u:
        case a:
            return t == e + ""
        }
        return !1
    }
    var i = "[object Boolean]"
      , r = "[object Date]"
      , o = "[object Error]"
      , s = "[object Number]"
      , u = "[object RegExp]"
      , a = "[object String]";
    t.exports = n
}
, function(t, e, n) {
    function i(t, e, n, i, o, u, a) {
        var c = r(t)
          , h = c.length
          , l = r(e)
          , f = l.length;
        if (h != f && !o)
            return !1;
        for (var p = h; p--; ) {
            var d = c[p];
            if (!(o ? d in e : s.call(e, d)))
                return !1
        }
        for (var v = o; ++p < h; ) {
            d = c[p];
            var g = t[d]
              , m = e[d]
              , _ = i ? i(o ? m : g, o ? g : m, d) : void 0;
            if (!(void 0 === _ ? n(g, m, i, o, u, a) : _))
                return !1;
            v || (v = "constructor" == d)
        }
        if (!v) {
            var y = t.constructor
              , T = e.constructor;
            if (y != T && "constructor"in t && "constructor"in e && !("function" == typeof y && y instanceof y && "function" == typeof T && T instanceof T))
                return !1
        }
        return !0
    }
    var r = n(21)
      , o = Object.prototype
      , s = o.hasOwnProperty;
    t.exports = i
}
, function(t, e, n) {
    var i = n(22)
      , r = n(27)
      , o = n(25)
      , s = n(31)
      , u = i(Object, "keys")
      , a = u ? function(t) {
        var e = null == t ? void 0 : t.constructor;
        return "function" == typeof e && e.prototype === t || "function" != typeof t && r(t) ? s(t) : o(t) ? u(t) : []
    }
    : s;
    t.exports = a
}
, function(t, e, n) {
    function i(t, e) {
        var n = null == t ? void 0 : t[e];
        return r(n) ? n : void 0
    }
    var r = n(23);
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        return null == t ? !1 : r(t) ? h.test(a.call(t)) : o(t) && s.test(t)
    }
    var r = n(24)
      , o = n(26)
      , s = /^\[object .+?Constructor\]$/
      , u = Object.prototype
      , a = Function.prototype.toString
      , c = u.hasOwnProperty
      , h = RegExp("^" + a.call(c).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        return r(t) && u.call(t) == o
    }
    var r = n(25)
      , o = "[object Function]"
      , s = Object.prototype
      , u = s.toString;
    t.exports = i
}
, function(t, e) {
    function n(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
    }
    t.exports = n
}
, function(t, e) {
    function n(t) {
        return !!t && "object" == typeof t
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t) {
        return null != t && o(r(t))
    }
    var r = n(28)
      , o = n(30);
    t.exports = i
}
, function(t, e, n) {
    var i = n(29)
      , r = i("length");
    t.exports = r
}
, function(t, e) {
    function n(t) {
        return function(e) {
            return null == e ? void 0 : e[t]
        }
    }
    t.exports = n
}
, function(t, e) {
    function n(t) {
        return "number" == typeof t && t > -1 && t % 1 == 0 && i >= t
    }
    var i = 9007199254740991;
    t.exports = n
}
, function(t, e, n) {
    function i(t) {
        for (var e = a(t), n = e.length, i = n && t.length, c = !!i && u(i) && (o(t) || r(t)), l = -1, f = []; ++l < n; ) {
            var p = e[l];
            (c && s(p, i) || h.call(t, p)) && f.push(p)
        }
        return f
    }
    var r = n(32)
      , o = n(33)
      , s = n(34)
      , u = n(30)
      , a = n(35)
      , c = Object.prototype
      , h = c.hasOwnProperty;
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        return o(t) && r(t) && u.call(t, "callee") && !a.call(t, "callee")
    }
    var r = n(27)
      , o = n(26)
      , s = Object.prototype
      , u = s.hasOwnProperty
      , a = s.propertyIsEnumerable;
    t.exports = i
}
, function(t, e, n) {
    var i = n(22)
      , r = n(30)
      , o = n(26)
      , s = "[object Array]"
      , u = Object.prototype
      , a = u.toString
      , c = i(Array, "isArray")
      , h = c || function(t) {
        return o(t) && r(t.length) && a.call(t) == s
    }
    ;
    t.exports = h
}
, function(t, e) {
    function n(t, e) {
        return t = "number" == typeof t || i.test(t) ? +t : -1,
        e = null == e ? r : e,
        t > -1 && t % 1 == 0 && e > t
    }
    var i = /^\d+$/
      , r = 9007199254740991;
    t.exports = n
}
, function(t, e, n) {
    function i(t) {
        if (null == t)
            return [];
        a(t) || (t = Object(t));
        var e = t.length;
        e = e && u(e) && (o(t) || r(t)) && e || 0;
        for (var n = t.constructor, i = -1, c = "function" == typeof n && n.prototype === t, l = Array(e), f = e > 0; ++i < e; )
            l[i] = i + "";
        for (var p in t)
            f && s(p, e) || "constructor" == p && (c || !h.call(t, p)) || l.push(p);
        return l
    }
    var r = n(32)
      , o = n(33)
      , s = n(34)
      , u = n(30)
      , a = n(25)
      , c = Object.prototype
      , h = c.hasOwnProperty;
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        return o(t) && r(t.length) && !!O[M.call(t)]
    }
    var r = n(30)
      , o = n(26)
      , s = "[object Arguments]"
      , u = "[object Array]"
      , a = "[object Boolean]"
      , c = "[object Date]"
      , h = "[object Error]"
      , l = "[object Function]"
      , f = "[object Map]"
      , p = "[object Number]"
      , d = "[object Object]"
      , v = "[object RegExp]"
      , g = "[object Set]"
      , m = "[object String]"
      , _ = "[object WeakMap]"
      , y = "[object ArrayBuffer]"
      , T = "[object Float32Array]"
      , S = "[object Float64Array]"
      , E = "[object Int8Array]"
      , w = "[object Int16Array]"
      , I = "[object Int32Array]"
      , x = "[object Uint8Array]"
      , b = "[object Uint8ClampedArray]"
      , A = "[object Uint16Array]"
      , R = "[object Uint32Array]"
      , O = {};
    O[T] = O[S] = O[E] = O[w] = O[I] = O[x] = O[b] = O[A] = O[R] = !0,
    O[s] = O[u] = O[y] = O[a] = O[c] = O[h] = O[l] = O[f] = O[p] = O[d] = O[v] = O[g] = O[m] = O[_] = !1;
    var C = Object.prototype
      , M = C.toString;
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        return r(t) ? t : Object(t)
    }
    var r = n(25);
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        for (var e = o(t), n = e.length; n--; )
            e[n][2] = r(e[n][1]);
        return e
    }
    var r = n(39)
      , o = n(40);
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        return t === t && !r(t)
    }
    var r = n(25);
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        t = o(t);
        for (var e = -1, n = r(t), i = n.length, s = Array(i); ++e < i; ) {
            var u = n[e];
            s[e] = [u, t[u]]
        }
        return s
    }
    var r = n(21)
      , o = n(37);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e) {
        var n = u(t)
          , i = a(t) && c(e)
          , p = t + "";
        return t = f(t),
        function(u) {
            if (null == u)
                return !1;
            var a = p;
            if (u = l(u),
            (n || !i) && !(a in u)) {
                if (u = 1 == t.length ? u : r(u, s(t, 0, -1)),
                null == u)
                    return !1;
                a = h(t),
                u = l(u)
            }
            return u[a] === e ? void 0 !== e || a in u : o(e, u[a], void 0, !0)
        }
    }
    var r = n(42)
      , o = n(15)
      , s = n(43)
      , u = n(33)
      , a = n(44)
      , c = n(39)
      , h = n(45)
      , l = n(37)
      , f = n(46);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n) {
        if (null != t) {
            void 0 !== n && n in r(t) && (e = [n]);
            for (var i = 0, o = e.length; null != t && o > i; )
                t = t[e[i++]];
            return i && i == o ? t : void 0
        }
    }
    var r = n(37);
    t.exports = i
}
, function(t, e) {
    function n(t, e, n) {
        var i = -1
          , r = t.length;
        e = null == e ? 0 : +e || 0,
        0 > e && (e = -e > r ? 0 : r + e),
        n = void 0 === n || n > r ? r : +n || 0,
        0 > n && (n += r),
        r = e > n ? 0 : n - e >>> 0,
        e >>>= 0;
        for (var o = Array(r); ++i < r; )
            o[i] = t[i + e];
        return o
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t, e) {
        var n = typeof t;
        if ("string" == n && u.test(t) || "number" == n)
            return !0;
        if (r(t))
            return !1;
        var i = !s.test(t);
        return i || null != e && t in o(e)
    }
    var r = n(33)
      , o = n(37)
      , s = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/
      , u = /^\w*$/;
    t.exports = i
}
, function(t, e) {
    function n(t) {
        var e = t ? t.length : 0;
        return e ? t[e - 1] : void 0
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t) {
        if (o(t))
            return t;
        var e = [];
        return r(t).replace(s, function(t, n, i, r) {
            e.push(i ? r.replace(u, "$1") : n || t)
        }),
        e
    }
    var r = n(47)
      , o = n(33)
      , s = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g
      , u = /\\(\\)?/g;
    t.exports = i
}
, function(t, e) {
    function n(t) {
        return null == t ? "" : t + ""
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t, e, n) {
        if ("function" != typeof t)
            return r;
        if (void 0 === e)
            return t;
        switch (n) {
        case 1:
            return function(n) {
                return t.call(e, n)
            }
            ;
        case 3:
            return function(n, i, r) {
                return t.call(e, n, i, r)
            }
            ;
        case 4:
            return function(n, i, r, o) {
                return t.call(e, n, i, r, o)
            }
            ;
        case 5:
            return function(n, i, r, o, s) {
                return t.call(e, n, i, r, o, s)
            }
        }
        return function() {
            return t.apply(e, arguments)
        }
    }
    var r = n(49);
    t.exports = i
}
, function(t, e) {
    function n(t) {
        return t
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t) {
        return s(t) ? r(t) : o(t)
    }
    var r = n(29)
      , o = n(51)
      , s = n(44);
    t.exports = i
}
, function(t, e, n) {
    function i(t) {
        var e = t + "";
        return t = o(t),
        function(n) {
            return r(n, t, e)
        }
    }
    var r = n(42)
      , o = n(46);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e) {
        for (var n = t ? e.length : 0; n--; ) {
            var i = e[n];
            if (i != o && r(i)) {
                var o = i;
                s.call(t, i, 1)
            }
        }
        return t
    }
    var r = n(34)
      , o = Array.prototype
      , s = o.splice;
    t.exports = i
}
, function(t, e, n) {
    var i = n(54)
      , r = n(55)
      , o = n(57)
      , s = o(function(t, e, n) {
        return n ? i(t, e, n) : r(t, e)
    });
    t.exports = s
}
, function(t, e, n) {
    function i(t, e, n) {
        for (var i = -1, o = r(e), s = o.length; ++i < s; ) {
            var u = o[i]
              , a = t[u]
              , c = n(a, e[u], u, t, e);
            (c === c ? c === a : a !== a) && (void 0 !== a || u in t) || (t[u] = c)
        }
        return t
    }
    var r = n(21);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e) {
        return null == e ? t : r(e, o(e), t)
    }
    var r = n(56)
      , o = n(21);
    t.exports = i
}
, function(t, e) {
    function n(t, e, n) {
        n || (n = {});
        for (var i = -1, r = e.length; ++i < r; ) {
            var o = e[i];
            n[o] = t[o]
        }
        return n
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t) {
        return s(function(e, n) {
            var i = -1
              , s = null == e ? 0 : n.length
              , u = s > 2 ? n[s - 2] : void 0
              , a = s > 2 ? n[2] : void 0
              , c = s > 1 ? n[s - 1] : void 0;
            for ("function" == typeof u ? (u = r(u, c, 5),
            s -= 2) : (u = "function" == typeof c ? c : void 0,
            s -= u ? 1 : 0),
            a && o(n[0], n[1], a) && (u = 3 > s ? void 0 : u,
            s = 1); ++i < s; ) {
                var h = n[i];
                h && t(e, h, u)
            }
            return e
        })
    }
    var r = n(48)
      , o = n(58)
      , s = n(59);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n) {
        if (!s(n))
            return !1;
        var i = typeof e;
        if ("number" == i ? r(n) && o(e, n.length) : "string" == i && e in n) {
            var u = n[e];
            return t === t ? t === u : u !== u
        }
        return !1
    }
    var r = n(27)
      , o = n(34)
      , s = n(25);
    t.exports = i
}
, function(t, e) {
    function n(t, e) {
        if ("function" != typeof t)
            throw new TypeError(i);
        return e = r(void 0 === e ? t.length - 1 : +e || 0, 0),
        function() {
            for (var n = arguments, i = -1, o = r(n.length - e, 0), s = Array(o); ++i < o; )
                s[i] = n[e + i];
            switch (e) {
            case 0:
                return t.call(this, s);
            case 1:
                return t.call(this, n[0], s);
            case 2:
                return t.call(this, n[0], n[1], s)
            }
            var u = Array(e + 1);
            for (i = -1; ++i < e; )
                u[i] = n[i];
            return u[e] = s,
            t.apply(this, u)
        }
    }
    var i = "Expected a function"
      , r = Math.max;
    t.exports = n
}
, function(t, e, n) {
    function i(t, e, n) {
        n && o(t, e, n) && (e = n = void 0);
        var i = null == t
          , a = null == e;
        if (null == n && (a && "boolean" == typeof t ? (n = t,
        t = 1) : "boolean" == typeof e && (n = e,
        a = !0)),
        i && a && (e = 1,
        a = !1),
        t = +t || 0,
        a ? (e = t,
        t = 0) : e = +e || 0,
        n || t % 1 || e % 1) {
            var c = u();
            return s(t + c * (e - t + parseFloat("1e-" + ((c + "").length - 1))), e)
        }
        return r(t, e)
    }
    var r = n(61)
      , o = n(58)
      , s = Math.min
      , u = Math.random;
    t.exports = i
}
, function(t, e) {
    function n(t, e) {
        return t + i(r() * (e - t + 1))
    }
    var i = Math.floor
      , r = Math.random;
    t.exports = n
}
, function(t, e, n) {
    var i = n(63)
      , r = n(68)
      , o = r(i);
    t.exports = o
}
, function(t, e, n) {
    var i = n(64)
      , r = n(67)
      , o = r(i);
    t.exports = o
}
, function(t, e, n) {
    function i(t, e) {
        return r(t, e, o)
    }
    var r = n(65)
      , o = n(21);
    t.exports = i
}
, function(t, e, n) {
    var i = n(66)
      , r = i();
    t.exports = r
}
, function(t, e, n) {
    function i(t) {
        return function(e, n, i) {
            for (var o = r(e), s = i(e), u = s.length, a = t ? u : -1; t ? a-- : ++a < u; ) {
                var c = s[a];
                if (n(o[c], c, o) === !1)
                    break
            }
            return e
        }
    }
    var r = n(37);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e) {
        return function(n, i) {
            var u = n ? r(n) : 0;
            if (!o(u))
                return t(n, i);
            for (var a = e ? u : -1, c = s(n); (e ? a-- : ++a < u) && i(c[a], a, c) !== !1; )
                ;
            return n
        }
    }
    var r = n(28)
      , o = n(30)
      , s = n(37);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e) {
        return function(n, i, a) {
            if (i = r(i, a, 3),
            u(n)) {
                var c = s(n, i, e);
                return c > -1 ? n[c] : void 0
            }
            return o(n, i, t)
        }
    }
    var r = n(12)
      , o = n(69)
      , s = n(70)
      , u = n(33);
    t.exports = i
}
, function(t, e) {
    function n(t, e, n, i) {
        var r;
        return n(t, function(t, n, o) {
            return e(t, n, o) ? (r = i ? n : t,
            !1) : void 0
        }),
        r
    }
    t.exports = n
}
, function(t, e) {
    function n(t, e, n) {
        for (var i = t.length, r = n ? i : -1; n ? r-- : ++r < i; )
            if (e(t[r], r, t))
                return r;
        return -1
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t, e) {
        return o(t, r(e))
    }
    var r = n(13)
      , o = n(72);
    t.exports = i
}
, function(t, e, n) {
    function i(t, e, n) {
        var i = u(t) ? r : s;
        return e = o(e, n, 3),
        i(t, e)
    }
    var r = n(73)
      , o = n(12)
      , s = n(74)
      , u = n(33);
    t.exports = i
}
, function(t, e) {
    function n(t, e) {
        for (var n = -1, i = t.length, r = -1, o = []; ++n < i; ) {
            var s = t[n];
            e(s, n, t) && (o[++r] = s)
        }
        return o
    }
    t.exports = n
}
, function(t, e, n) {
    function i(t, e) {
        var n = [];
        return r(t, function(t, i, r) {
            e(t, i, r) && n.push(t)
        }),
        n
    }
    var r = n(63);
    t.exports = i
}
, function(t, e, n) {
    for (var i = n(76), r = "undefined" == typeof window ? {} : window, o = ["moz", "webkit"], s = "AnimationFrame", u = r["request" + s], a = r["cancel" + s] || r["cancelRequest" + s], c = 0; c < o.length && !u; c++)
        u = r[o[c] + "Request" + s],
        a = r[o[c] + "Cancel" + s] || r[o[c] + "CancelRequest" + s];
    if (!u || !a) {
        var h = 0
          , l = 0
          , f = []
          , p = 1e3 / 60;
        u = function(t) {
            if (0 === f.length) {
                var e = i()
                  , n = Math.max(0, p - (e - h));
                h = n + e,
                setTimeout(function() {
                    var t = f.slice(0);
                    f.length = 0;
                    for (var e = 0; e < t.length; e++)
                        if (!t[e].cancelled)
                            try {
                                t[e].callback(h)
                            } catch (n) {
                                setTimeout(function() {
                                    throw n
                                }, 0)
                            }
                }, Math.round(n))
            }
            return f.push({
                handle: ++l,
                callback: t,
                cancelled: !1
            }),
            l
        }
        ,
        a = function(t) {
            for (var e = 0; e < f.length; e++)
                f[e].handle === t && (f[e].cancelled = !0)
        }
    }
    t.exports = function(t) {
        return u.call(r, t)
    }
    ,
    t.exports.cancel = function() {
        a.apply(r, arguments)
    }
}
, function(t, e, n) {
    (function(e) {
        (function() {
            var n, i, r;
            "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function() {
                return performance.now()
            }
            : "undefined" != typeof e && null !== e && e.hrtime ? (t.exports = function() {
                return (n() - r) / 1e6
            }
            ,
            i = e.hrtime,
            n = function() {
                var t;
                return t = i(),
                1e9 * t[0] + t[1]
            }
            ,
            r = n()) : Date.now ? (t.exports = function() {
                return Date.now() - r
            }
            ,
            r = Date.now()) : (t.exports = function() {
                return (new Date).getTime() - r
            }
            ,
            r = (new Date).getTime())
        }
        ).call(this)
    }
    ).call(e, n(4))
}
]);
//# sourceMappingURL=swing.js.map
