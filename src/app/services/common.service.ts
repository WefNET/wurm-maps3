import { Injectable } from '@angular/core';

import OlMap from "ol/Map";
import OlXYZ from "ol/source/XYZ";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import OlTileLayer from "ol/layer/Tile";
import OlView from "ol/View";
import OLTileGrid from "ol/tilegrid/TileGrid";
import OLControl from "ol/control";
import { defaults as defaultControls } from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import FullScreen from "ol/control/FullScreen.js";
import { format } from "ol/coordinate.js";
import Draw from "ol/interaction/Draw.js";
import Snap from "ol/interaction/Snap.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  mousePositionControl(): MousePosition {
    return new MousePosition({
      coordinateFormat: function (coordinate) {
        return format(coordinate, "{x}, {y}", 0);
      },
      className: "custom-mouse-position",
      target: document.getElementById("mouse-position"),
      undefinedHTML: "undefined"
    });
  }
}
