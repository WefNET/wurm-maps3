import { Injectable } from '@angular/core';

import OlMap from "ol/Map";
import OlXYZ from "ol/source/XYZ";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
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
import ImageLayer from 'ol/layer/Image';
import ImageStatic from 'ol/source/ImageStatic';
import Projection from 'ol/proj/Projection';

import { IBoringDeed, IBridge, ICanal, ILandmark } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class LayersService {

  xanaduStartingTowns = [
    {
      "Name": "Summerholt",
      "Coords": [[6582, -2231], [6622, -2231], [6622, -2272], [6582, -2272]]
    },
    {
      "Name": "Greymead",
      "Coords": [[4680, -3030], [4721, -3030], [4721, -3071], [4680, -3071]]
    },
    {
      "Name": "Whitefay",
      "Coords": [[5639, -3041], [5662, -3041], [5662, -3060], [5639, -3060]]
    },
    {
      "Name": "Glasshollow",
      "Coords": [[1559, -766], [1600, -766], [1600, -808], [1559, -808]]
    },
    {
      "Name": "Newspring",
      "Coords": [[862, -7208], [903, -7208], [903, -7250], [862, -7250]]
    },
    {
      "Name": "Esteron",
      "Coords": [[7391, -6416], [7428, -6416], [7428, -6453], [7391, -6452]]
    },
    {
      "Name": "Linton",
      "Coords": [[1805, -4146], [1845, -4146], [1845, -4186], [1805, -4186]]
    },
    {
      "Name": "Lormere",
      "Coords": [[3460, -6416], [3501, -6416], [3501, -6457], [3460, -6457]]
    },
    {
      "Name": "Vrock Landing",
      "Coords": [[2702, -2221], [2742, -2221], [2742, -2261], [2702, -2261]]
    }
  ];
  pristineStartingTowns = [
    {
      "Name": "Blossom",
      "Coords": [[869, -688], [869, -719], [838, -719], [838, -688]]
    },
  ];
  harmonyStartingTowns = [
    // {
    //   "Name": "Heartland",
    //   "Coords": [[992, -722], [992, -722], [999, -730], [999, -730]]
    // },
    {
      "Name": "Harmony Bay",
      "X": 996, 
      "Y": -725,
    },
    {
      "Name": "Heartland",
      "X": 792, 
      "Y": -419,
    },
  ];
  constructor() { }

  //#region Shared
  sharedBridgesVectorSource(bridges: IBridge[]): VectorSource {
    var bridgesVectorSource = new VectorSource();

    for (let bridge of bridges) {

      var bridgeFeature = new Feature({
        geometry: new LineString([[bridge.X1, bridge.Y1], [bridge.X2, bridge.Y2]]),
        name: bridge.Name,
      });

      bridgesVectorSource.addFeature(bridgeFeature);
    }

    return bridgesVectorSource;
  }

  sharedCanalsVectorSource(canals: ICanal[]): VectorSource {
    var canalSources = new VectorSource();

    for (let canal of canals) {
      var canalFeature = new Feature({
        geometry: new LineString([[canal.X1, canal.Y1], [canal.X2, canal.Y2]]),
        name: canal.Name,
        isCanal: canal.IsCanal,
        isTunnel: canal.IsTunnel,
        allBoats: canal.AllBoats,
      });

      canalSources.addFeature(canalFeature);
    }

    return canalSources;
  }

  sharedLandmarkVectorSource(landmarks: ILandmark[]): VectorSource {
    var landmarksSrc = new VectorSource();

    for (let l of landmarks) {

      var landmarkFeature = new Feature({
        geometry: new Point([l.X1, l.Y1]),
        type: l.LandmarkType,
        name: l.Name
      });

      landmarksSrc.addFeature(landmarkFeature);
    }

    return landmarksSrc;
  }

  sharedDeedsVectorSource(deeds: IBoringDeed[]): VectorSource {
    var deedsSrc = new VectorSource();
    deedsSrc.ratio = 1;

    for (let deed of deeds) {

      if (deed.name == "Summerholt" ||
        deed.name == "Greymead" ||
        deed.name == "Whitefay" ||
        deed.name == "Glasshollow" ||
        deed.name == "Newspring" ||
        deed.name == "Esteron" ||
        deed.name == "Linton" ||
        deed.name == "Lormere" ||
        deed.name == "Vrock Landing") {
        continue;
      }

      var deedFeature = new Feature({
        geometry: new Point([deed.x, deed.y]),
        name: deed.name,
        notes: deed.notes
      });

      deedsSrc.addFeature(deedFeature);
    }

    return deedsSrc;
  }

  //#endregion Shared

  //#region Xanadu
  XanaduJan2019TerrainLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: "http://wurmonlinemaps.com/assets/xanadu/jan2019/terrain/{z}/{x}/{y}.png",
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: true,
      type: 'base',
      title: "Terrain (2019 Jan)"
    });
  }

  XanaduTerrainLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: 'https://wurmmaptiles.blob.core.windows.net/xan2020terrain/xanadu-terrain_200111-031655/{z}/{x}/{y}.png',
      tileGrid: tileGrid,
    });

    return new OlTileLayer({
      source: source,
      visible: true,
      type: 'base',
      title: "Terrain (2020 Jan)",
    });
  }

  XanaduTopoLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: 'https://wurmmaptiles.blob.core.windows.net/xan2020topo/xanadu-topographical_200111-031542/{z}/{x}/{y}.png',
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: false,
      type: 'base',
      title: "Topographical (2020 Jan)"
    });
  }

  XanaduIsoLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: 'https://wurmmaptiles.blob.core.windows.net/xan2020iso/xanadu-isometric_200111-031806/{z}/{x}/{y}.png',
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: false,
      type: 'base',
      title: "Isometric (2020 Jan)"
    });
  }

  XanaduRoutesLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: 'https://wurmmaptiles.blob.core.windows.net/xan2020routes/routes/{z}/{x}/{y}.png',
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: false,
      type: 'base',
      title: "Routes (2020 Jan)"
    });
  }

  XanaduStartingTownsVectorSource(): VectorSource {
    var startingTownsSource = new VectorSource();

    for (let town of this.xanaduStartingTowns) {

      var startingTownFeature = new Feature({
        geometry: new Polygon([town.Coords]),
        name: town.Name
      });

      startingTownsSource.addFeature(startingTownFeature);
    }

    return startingTownsSource;
  }

  XanaduGridVectorSource(): VectorSource {

    var gridSrc = new VectorSource();

    var gridJSON = [];

    // horiz
    for (var x = 0; x < 20; x++) {
      var y = -((x * 410) + 362);
      gridJSON.push({
        "StartX": 0, "StartY": y, "EndX": 8192, "EndY": y
      });

      var horizLineFeature = new Feature({
        geometry: new LineString([[0, y], [8192, y]]),
        name: ""
      });

      gridSrc.addFeature(horizLineFeature);
    }

    // vertical
    for (var y = 0; y < 20; y++) {
      var x = (y * 410) + 362;
      gridJSON.push({
        "StartX": x, "StartY": 0, "EndX": x, "EndY": -8192
      });

      var vertLineFeature = new Feature({
        geometry: new LineString([[x, 0], [x, -8192]]),
        name: ""
      });

      gridSrc.addFeature(vertLineFeature);
    }

    // grid text
    var gridPoints = [];
    var gridX = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"];

    for (var x = 0; x < 20; x++) {
      var yC = -(x * 410) + 50;

      for (var y = 0; y < 20; y++) {
        var xC = (y * 410) - 40;

        var yDisplay = y + 7;
        var gridID = gridX[x] + " " + yDisplay;
        gridPoints.push({ "cX": xC, "cY": yC, "GridID": gridID });

        var gridNameFeature = new Feature({
          geometry: new Point([xC + 205, yC - 205]),
          name: gridID
        });

        gridSrc.addFeature(gridNameFeature);
      }
    }

    return gridSrc;
  }

  //#endregion Xanadu

  //#region Pristine
  PristineJan2019TerrainLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: "https://wurmmaptiles.blob.core.windows.net/pristine2020terr/pristine-terrain_200111-031509/{z}/{x}/{y}.png",
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: true,
      type: 'base',
      title: "Terrain (2020 Jan)"
    });
  }

  PristineJan2019TopoLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: "https://wurmmaptiles.blob.core.windows.net/pristine2020topo/pristine-topographical_200111-031507/{z}/{x}/{y}.png",
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: false,
      type: 'base',
      title: "Topological (2020 Jan)"
    });
  }

  PristineJan2019IsoLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: "https://wurmmaptiles.blob.core.windows.net/pristine2020iso/pristine-isometric_200111-031512/{z}/{x}/{y}.png",
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: true,
      type: 'base',
      title: "Isometric (2019 Jan)"
    });
  }

  PristineStartingTownsVectorSource(): VectorSource {
    var startingTownsSource = new VectorSource();

    for (let town of this.pristineStartingTowns) {

      var startingTownFeature = new Feature({
        geometry: new Polygon([town.Coords]),
        name: town.Name
      });

      startingTownsSource.addFeature(startingTownFeature);
    }

    return startingTownsSource;
  }

  PristineGridVectorSource(): VectorSource {
    var gridSrc = new VectorSource();

    var gridJSON = [];

    // horiz
    for (var x = 0; x < 20; x++) {
      var y = -((x * 102) + 87);
      gridJSON.push({
        "StartX": 0, "StartY": y, "EndX": 2048, "EndY": y
      });

      var horizLineFeature = new Feature({
        geometry: new LineString([[0, y], [2048, y]]),
        name: ""
      });

      gridSrc.addFeature(horizLineFeature);
    }

    // vertical
    for (var y = 0; y < 20; y++) {
      var x = (y * 102) + 92;
      gridJSON.push({
        "StartX": x, "StartY": 0, "EndX": x, "EndY": -2084
      });

      var vertLineFeature = new Feature({
        geometry: new LineString([[x, 0], [x, -2048]]),
        name: ""
      });

      gridSrc.addFeature(vertLineFeature);
    }

    // grid text
    var gridPoints = [];
    var gridX = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"];

    for (var x = 0; x < 20; x++) {
      var yC = -((x * 102) + 87)

      for (var y = 0; y < 20; y++) {
        var xC = (y * 102) + 92;

        var yDisplay = y + 7;
        var gridID = gridX[x] + " " + yDisplay;
        gridPoints.push({ "cX": xC, "cY": yC, "GridID": gridID });

        var gridNameFeature = new Feature({
          geometry: new Point([xC - 51, yC + 51]),
          name: gridID
        });

        gridSrc.addFeature(gridNameFeature);
      }
    }

    return gridSrc;
  }

  //#endregion Pristine

  //#region Harmony 
  HarmonyInGameLayer(tileGrid: OLTileGrid): OlTileLayer {
    var source = new OlXYZ({
      url: "https://wurmmaptiles.blob.core.windows.net//harmonyingame/Harmony4/{z}/{x}/{y}.png",
      tileGrid: tileGrid
    });

    return new OlTileLayer({
      source: source,
      visible: true,
      type: 'base',
      title: "In Game (2020 July)"
    });
  }

  HarmonyStartingTownsVectorSource(): VectorSource {
    var startingTownsSource = new VectorSource();
    startingTownsSource.ratio = 1;

    for (let town of this.harmonyStartingTowns) {
      var deedFeature = new Feature({
        geometry: new Point([town.X, town.Y]),
        name: town.Name,
      });

      startingTownsSource.addFeature(deedFeature);
    }

    return startingTownsSource;
  }

  //#endregion Harmony   
}

