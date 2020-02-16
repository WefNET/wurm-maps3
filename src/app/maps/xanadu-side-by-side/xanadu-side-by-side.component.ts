import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';

import OlMap from "ol/Map";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import OlTileLayer from "ol/layer/Tile";
// import OlLayerGroup from 'ol/layer/Group';
import LayerGroup from 'ol/layer/Group';
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
    selector: "app-xanadu-side-by-side",
    templateUrl: "./xanadu-side-by-side.component.html",
    styleUrls: ["./../maps.scss"]
})

export class XanaduSideBySideComponent implements OnInit {
    map: OlMap;
    view: OlView;

    map2: OlMap;
    view2: OlView;

    terrainJan2020Layer: OlTileLayer;
    terrainJan2019Layer: OlTileLayer;
    
    mapMinZoom = 0;
    mapMaxZoom = 5;
    mapMaxResolution = 1.0;
    tileExtent = [0.0, -8192.0, 8192.0, 0.0];

    mapResolutions = [];
    tileGrid: OLTileGrid;

    constructor(private common: CommonService,
        private styles: StyleService,
        private layersService: LayersService,
        private sheetsService: SheetsService,
        private title: Title,
        private messageService: MessageService) {

        for (var z = 0; z <= this.mapMaxZoom; z++) {
            this.mapResolutions.push(
                Math.pow(2, this.mapMaxZoom - z) * this.mapMaxResolution
            );
        }

        title.setTitle("Xanadu - WurmOnlineMaps.com");
    }

    ngOnInit() {
        this.tileGrid = new OLTileGrid({
            extent: this.tileExtent,
            minZoom: this.mapMinZoom,
            resolutions: this.mapResolutions
        });

        this.terrainJan2019Layer = this.layersService.XanaduJan2019TerrainLayer(this.tileGrid);
        this.terrainJan2020Layer = this.layersService.XanaduTerrainLayer(this.tileGrid);

        this.view = new OlView({
            zoom: 2,
            center: [4096, -4096],
            maxResolution: this.tileGrid.getResolution(this.mapMinZoom)
        });

        this.renderMapWithLayers();
    }

    renderMapWithLayers() {
        
        this.map = new OlMap({
            target: "map",
            layers: [
                new LayerGroup({
                    'title': 'Base maps',
                    layers: [
                        this.terrainJan2020Layer,
                    ]
                }),
            ],
            view: this.view,
        });

        this.map2 = new OlMap({
            target: "map2",
            layers: [
                new LayerGroup({
                    'title': 'Base maps',
                    layers: [
                        this.terrainJan2019Layer,
                    ]
                }),
            ],
            view: this.view,
        });
    }
}
