import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import OlMap from "ol/Map";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import OlTileLayer from "ol/layer/Tile";
import OlLayerGroup from 'ol/layer/Group';
import OlView from "ol/View";
import OLTileGrid from "ol/tilegrid/TileGrid";
import OLControl from "ol/control";
import { defaults as defaultControls } from "ol/control.js";
import MousePosition from "ol/control/MousePosition.js";
import FullScreen from "ol/control/FullScreen.js";
import Draw from "ol/interaction/Draw.js";
import Snap from "ol/interaction/Snap.js";

import LayerSwitcher from 'ol-layerswitcher';

import { MessageService } from 'primeng/api';

import { CommonService } from './../../services/common.service';
import { StyleService } from './../../services/style.service';
import { LayersService } from './../../services/layers.service';
import { SheetsService } from './../../services/sheets.service';

import { IBoringDeed, IBridge, ICanal } from './../../models/models';

@Component({
    selector: 'app-harmony',
    templateUrl: './harmony.component.html',
    styleUrls: ['./../maps.scss']
})
export class HarmonyComponent implements OnInit {
    displaySidebar: boolean;
    displayFindADeed: boolean;

    map: OlMap;
    view: OlView;

    inGameJuly2020Layer: OlTileLayer;

    overlayGroup: OlLayerGroup;

    controls: OLControl[];
    layerSwitcherControl: LayerSwitcher;
    mousePositionControl: MousePosition;
    FullScreenControl: FullScreen;

    // var mapExtent = [0.00000000, -1240.00000000, 1840.00000000, 0.00000000];
    // var mapMinZoom = 0;
    // var mapMaxZoom = 3;
    // var mapMaxResolution = 1.00000000;
    // var tileExtent = [0.00000000, -1240.00000000, 1840.00000000, 0.00000000];

    mapMinZoom = 0;
    mapMaxZoom = 5;
    mapMaxResolution = 0.25000000;
    tileExtent = [0.00000000, -1240.00000000, 1840.00000000, 0.00000000];

    mapResolutions = [];
    tileGrid: OLTileGrid;

    // drawing stuff
    drawingSource: VectorSource;
    drawingVector: VectorLayer;
    displayDrawingTools = false;
    tools = [
        { label: "None", value: "None" },
        { label: "Point", value: "Point" },
        { label: "LineString", value: "LineString" },
        { label: "Polygon", value: "Polygon" },
        { label: "Circle", value: "Circle" },
        { label: "Clear All", value: "Clear" }
    ];
    draw: Draw;
    snap: Snap;

    deeds: IBoringDeed[] = [];
    bridges: IBridge[] = [];
    canals: ICanal[] = [];

    constructor(private common: CommonService,
        private styles: StyleService,
        private layersService: LayersService,
        private sheetsService: SheetsService,
        private title: Title) {

        for (var z = 0; z <= this.mapMaxZoom; z++) {
            this.mapResolutions.push(
                Math.pow(2, this.mapMaxZoom - z) * this.mapMaxResolution
            );
        }

        title.setTitle("Harmony - WurmOnlineMaps.com");
    }

    ngOnInit() {
        this.layerSwitcherControl = new LayerSwitcher();
        this.mousePositionControl = this.common.mousePositionControl();
        this.FullScreenControl = new FullScreen();

        this.tileGrid = new OLTileGrid({
            extent: this.tileExtent,
            minZoom: this.mapMinZoom,
            resolutions: this.mapResolutions
        });

        this.inGameJuly2020Layer = this.layersService.HarmonyInGameLayer(this.tileGrid);

        this.drawingSource = new VectorSource();
        this.drawingVector = new VectorLayer({
            name: "Drawing Layer",
            source: this.drawingSource,
            style: this.styles.drawingElementStyle()
        });

        this.view = new OlView({
            zoom: 2,
            center: [936, -606],
            maxResolution: this.tileGrid.getResolution(this.mapMinZoom)
        });

        this.renderMapWithLayers();
        this.getData();

    }

    renderMapWithLayers() {
        this.overlayGroup = new OlLayerGroup({
            title: 'Overlays',
            layers: [
            ]
        });

        this.map = new OlMap({
            target: "map",
            controls: defaultControls().extend([
                this.layerSwitcherControl,
                this.mousePositionControl,
                this.FullScreenControl,
            ]),
            layers: [
                new OlLayerGroup({
                    'title': 'Base maps',
                    layers: [
                        this.inGameJuly2020Layer,
                        this.drawingVector
                    ]
                }),
                this.overlayGroup
            ],
            view: this.view
        });
    }

    getData() {
        this.sheetsService.getHarmonyData()
      .subscribe(data => {

        // // grid
        // const gridVectorSource = this.layersService.PristineGridVectorSource();

        // var gridVector = new VectorLayer({
        //   source: gridVectorSource,
        //   title: 'Grid',
        //   visible: false,
        //   style: this.styles.gridStyleFunction
        // })

        // this.overlayGroup.getLayers().push(gridVector);

        // // canale 
        // var canals = data["valueRanges"][1].values;

        // canals.forEach(canal => {
        //   var c = new ICanal();

        //   c.Name = canal[0];
        //   c.X1 = canal[1];
        //   c.Y1 = 0 - Number(canal[2]);
        //   c.X2 = canal[3];
        //   c.Y2 = 0 - Number(canal[4]);
        //   c.IsCanal = canal[5] == "TRUE";
        //   c.IsTunnel = canal[6] == "TRUE";
        //   c.AllBoats = canal[7] == "TRUE";

        //   this.canals.push(c);
        // });

        // const canalVectorSource = this.layersService.sharedCanalsVectorSource(this.canals);

        // var canalVector = new VectorLayer({
        //   source: canalVectorSource,
        //   title: 'Canals',
        //   style: this.styles.canalStyleFunction
        // })

        // this.overlayGroup.getLayers().push(canalVector);

        // // bridges
        // var bridges = data["valueRanges"][2].values;

        // bridges.forEach(bridge => {
        //   var b = new IBridge();

        //   b.Name = bridge[0];
        //   b.X1 = bridge[1];
        //   b.Y1 = 0 - Number(bridge[2]);
        //   b.X2 = bridge[3];
        //   b.Y2 = 0 - Number(bridge[4]);

        //   this.bridges.push(b);
        // });

        // const bridgeVectorSource = this.layersService.sharedBridgesVectorSource(this.bridges);

        // var bridgeVector = new VectorLayer({
        //   source: bridgeVectorSource,
        //   title: 'Bridges',
        //   style: this.styles.bridgeStyleFunction
        // })

        // this.overlayGroup.getLayers().push(bridgeVector);

        // deeds
        var deeds = data["valueRanges"][0].values;

        deeds.forEach(deed => {
          var d = new IBoringDeed();

          d.name = deed[0];
          d.x = Number(deed[1]);
          d.y = 0 - Number(deed[2]);
          d.notes = deed[3];

          this.deeds.push(d);
        });

        this.deeds.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        })

        const deedVectorSource = this.layersService.sharedDeedsVectorSource(this.deeds);

        var deedVector = new VectorLayer({
          source: deedVectorSource,
          title: 'Deeds',
          style: this.styles.deedStyleFunctionHarmony
        })

        this.overlayGroup.getLayers().push(deedVector);

        // starting deeds
        const startingDeedsVectorSource = this.layersService.HarmonyStartingTownsVectorSource();

        var startingDeedsVector = new VectorLayer({
          source: startingDeedsVectorSource,
          title: 'Startin\' Deeds',
          style: this.styles.startingTownStyleFunctionHarmony
        })

        this.overlayGroup.getLayers().push(startingDeedsVector);

      });
    }

    //#region Drawing Tools
    showDrawingTools() {
        this.displayDrawingTools = !this.displayDrawingTools;
    }

    selectTool(event: Event) {
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.snap);

        let tool: string = this.tools[event["index"]].value;

        if (tool === "None") {
            // oh well
        } else {
            if (tool === "Clear") {
                this.drawingSource.clear();
            } else {
                this.addInteractions(tool);
            }
        }
    }

    addInteractions = function (selectedDrawingTool: string) {
        this.draw = new Draw({
            source: this.drawingSource,
            type: selectedDrawingTool,
        });

        this.map.addInteraction(this.draw);
        this.snap = new Snap({ source: this.drawingSource });

        this.map.addInteraction(this.snap);
    };
    //#endregion

}