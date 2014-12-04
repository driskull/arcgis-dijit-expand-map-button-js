# arcgis-dijit-expand-map-button-js

## About
This provides a button to expand the map to the full browser window and hide all your other webpage content.

[View Demo](http://driskull.github.com/arcgis-dijit-expand-map-button-js/)

## Instructions

1. Create an element within the documents body tag.
2. Give the element a class of "expand-map-hide".
3. Place all of your page content into the element. This is the content that will be hidden when the map is expanded.
4. Create another element for the button and place it where you would like.
5. Startup the widget like normal.

The map will be moved into the body of the document and the body and map will have a width and height of 100%.

### HTML

```html
  <body>
    <div class="container expand-map-hide">
      <div id="map" class="map">
        <div id="emb"></div>
      </div>
    </div>
  </body>
```
### JavaScript

```javascript
  var emb;

  require(["esri/map", "application/ExpandMapButton"], function (Map, ExpandMapButton) {

    var myMap = new Map("map", {
      center: [-56.049, 38.485],
      zoom: 3,
      basemap: "streets"
    });

    emb = new ExpandMapButton({
      expanded: false,
      map: myMap
    }, "emb");

  });
```

## Constructor

ExpandMapButton(options, srcNode);

### Constructor Options (Object)

No option is required.

|property|type|value|description|required|
|---|---|---|---|---|
|map|Map|null|Map Class|Yes|
|expanded|Boolean|false|Expand the map by default|No|
|visible|Boolean|true|Show the widget.|No|
|recenter|Boolean|true|Recenter map after expand/collapse.|No|
|recenterTimeout|Integer|500|Recenter map after expand/collapse.|No|

## Properties
|property|type|description|readonly|
|---|---|---|---|---|
|map|Map|Map Class|No|
|expanded|Boolean|Expand the map by default|No|
|visible|Boolean|Show the widget.|No|
|recenter|Boolean|Recenter map after expand/collapse.|No|
|recenterTimeout|Integer|Recenter map after expand/collapse.|No|

## Methods

### startup
startup(): Start the widget.
### destroy
destroy(): Destroy the widget.
### show
show(): Show the widget.
### hide
hide(): hide the widget.
### toggle
toggle(Boolean): expand/collapse the map.
### expand
expand(): expand the map.
### collapse
collapse(): collapse the map.

## Events
### load
Occurs when the widget is loaded.

 [New to Github? Get started here.](https://github.com/)

## Requirements

* Notepad or HTML editor
* A little background with Javascript
* Experience with the [ArcGIS Javascript API](http://www.esri.com/) would help.

## Resources

* [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Anyone and everyone is welcome to contribute.

## Licensing
Copyright 2012 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](https://raw.github.com/Esri/arcgis-dijit-sample-js/master/license.txt) file.

[](Esri Tags: ArcGIS JavaScript API Dijit module Widget Public)
[](Esri Language: JavaScript)
