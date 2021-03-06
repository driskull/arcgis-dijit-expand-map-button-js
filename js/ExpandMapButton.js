define([
    "dojo/Evented",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/a11yclick",
    "dijit/_TemplatedMixin",
    "dojo/on",
    "dojo/text!application/templates/ExpandMapButton.html",
    "dojo/i18n!application/nls/ExpandMapButton",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dojo/domReady!"
],
  function (
    // make sure these are arranged in the same order as above
    Evented,
    declare, lang,
    _WidgetBase, a11yclick, _TemplatedMixin,
    on,
    dijitTemplate,
    i18n,
    domStyle, domClass, domAttr, domConstruct
  ) {
    return declare("esri.dijit.ExpandMapButton", [_WidgetBase, _TemplatedMixin, Evented], {
      // my html template string
      templateString: dijitTemplate,

      // default options
      options: {
        map: null,
        visible: true,
        expanded: false,
        recenter: false,
        recenterTimeout: 500
      },

      /* ---------------- */
      /* Lifecycle methods */
      /* ---------------- */
      constructor: function (options, srcRefNode) {
        // css classes
        this.css = {
          expandMap: "expand-map-button",
          toggle: "toggle",
          expanded: "map-expanded"
        };
        // language
        this._i18n = i18n;
        // mix in settings and defaults
        var defaults = lang.mixin({}, this.options, options);
        // create the DOM for this widget
        this.domNode = srcRefNode;
        // set properties
        this.set("map", defaults.map);
        this.set("visible", defaults.visible);
        this.set("expanded", defaults.expanded);
        this.set("recenter", defaults.recenter);
        this.set("recenterTimeout", defaults.recenterTimeout);
        // watch for changes
        this.watch("visible", this._visible);
        this.watch("expanded", this._stateChanged);
      },
      // _TemplatedMixin implements buildRendering() for you. Use this to override
      // buildRendering: function() {},
      // called after buildRendering() is finished
      postCreate: function () {
        // own this accessible click event button
        // Custom press, release, and click synthetic events which trigger on a left mouse click, touch, or space/enter keyup.
        this.own(on(this.buttonNode, a11yclick, lang.hitch(this, function () {
          this.toggle(!this.expanded);
        })));
        // get parent node of map
        if (this.map && this.map.container) {
          this._parentNode = this.map.container.parentNode;
        }
      },
      // start widget. called by user
      startup: function () {
        // set visibility
        this._visible();
        // map not defined
        if (!this.map) {
          console.log("map required");
          this.destroy();
          return;
        }
        // when map is loaded
        if (this.map.loaded) {
          this._init();
        } else {
          on.once(this.map, "load", lang.hitch(this, function () {
            this._init();
          }));
        }
      },
      /* ---------------- */
      /* Public Functions */
      /* ---------------- */
      show: function () {
        this.set("visible", true);
      },
      hide: function () {
        this.set("visible", false);
      },
      expand: function () {
        this.toggle(true);
      },
      collapse: function () {
        this.toggle(false);
      },
      toggle: function (value) {
        // set state
        if (typeof value === "undefined") {
          value = !this.expanded;
        }
        // change class
        domClass.toggle(window.document.body, this.css.expanded, value);
        // handle stuff
        this._stateChanged();
      },
      /* ---------------- */
      /* Private Functions */
      /* ---------------- */
      _init: function () {
        // set expanded state
        this.toggle(this.expanded);
        // set loaded
        this.set("loaded", true);
        // emit event
        this.emit("load", {});
      },
      _visible: function () {
        if (this.visible) {
          domStyle.set(this.domNode, "display", "block");
        } else {
          domStyle.set(this.domNode, "display", "none");
        }
      },
      _recenter: function () {
        if (this.recenter && this._recenterPoint) {
          // reset center point
          setTimeout(lang.hitch(this, function () {
            this.map.centerAt(this._recenterPoint).then(lang.hitch(this, function () {
              this._recenterPoint = null;
            }));
          }), this.recenterTimeout);
        }
      },
      _stateChanged: function () {
        if (!this._recenterPoint) {
          // save center point
          this._recenterPoint = this.map.extent.getCenter();
        }
        // determine expanded state
        var state = domClass.contains(window.document.body, this.css.expanded);
        // set expanded status
        this.set("expanded", state);
        // if expanded
        if (state) {
          domAttr.set(this.buttonNode, "title", this._i18n.collapse);
          domConstruct.place(this.map.container, window.document.body);
        } else {
          domAttr.set(this.buttonNode, "title", this._i18n.expand);
          domConstruct.place(this.map.container, this._parentNode);
        }
        // resize map
        this.map.resize(true);
        // recenter map
        this._recenter();
      }
    });
  });