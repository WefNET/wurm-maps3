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
import { Circle as CircleStyle, Fill, Stroke, Style, RegularShape, Text, Icon } from "ol/style.js";

@Injectable({
    providedIn: 'root'
})
export class StyleService {
    private knockedOutWhite = "rgba(255, 255, 255, 0.2)";
    private notFuckingAroundYellow = "rgb(255, 255, 0)";

    constructor() { }

    drawingElementStyle(): Style {
        return new Style({
            fill: new Fill({
                color: this.knockedOutWhite
            }),
            stroke: new Stroke({
                color: this.notFuckingAroundYellow,
                width: 2
            }),
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: this.notFuckingAroundYellow,
                })
            })
        })
    }

    deedStyleFunction(feature, resolution) {
        let fontSize: number = resolution <= 0.125 ? 16 : 12;
        let name: string = feature.get('name');

        let notes: string = feature.get('notes');
        let isMarket: boolean = notes != null ? notes.toLowerCase().indexOf("market") >= 0 : false;

        let opacity = resolution < 1 ? resolution + 0.25 : 1;

        return [
            new Style({
                image: new RegularShape({
                    points: 4,
                    radius: (11 / resolution) + 4,
                    angle: Math.PI / 4,
                    fill: new Fill({
                        color: `rgba( 255, 245, 87 , ${opacity})`
                    }),
                    stroke: new Stroke({
                        color: isMarket ? "Orange" : "transparent",
                        width: isMarket ? 1 / resolution : 0,
                    })
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: resolution < 4 ? feature.get('name') : '',
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new Fill({
                        color: "White"
                    }),
                    stroke: new Stroke({
                        color: "Black",
                        width: 1
                    })
                })
            })
        ]
    }

    deedStyleFunctionHarmony(feature, resolution) {
        let fontSize: number = resolution <= 0.125 ? 16 : 12;
        let name: string = feature.get('name');

        if (name === 'Lost In the Woods') {
            console.log("Harm deed styler reso", resolution);
        }

        let notes: string = feature.get('notes');
        let isMarket: boolean = notes != null ? notes.toLowerCase().indexOf("market") >= 0 : false;

        // resolution based opacity of deeds
        let opacity = resolution < 1 ? resolution + 0.25 : 1;

        return [
            new Style({
                image: new RegularShape({
                    points: 4,
                    radius: (6 / resolution),
                    angle: Math.PI / 4,
                    fill: new Fill({
                        color: `rgba( 255, 245, 87 , ${opacity})`
                    }),
                    stroke: new Stroke({
                        color: isMarket ? "Orange" : "transparent",
                        width: isMarket ? 1 / resolution : 0,
                    })
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: resolution < 1 ? feature.get('name') : '',
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new Fill({
                        color: "White"
                    }),
                    stroke: new Stroke({
                        color: "Black",
                        width: 1
                    })
                })
            })
        ]
    }

    startingTownStyleFunction(feature, resolution) {
        var name = feature.get('name');

        return [
            new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                }),
                text: new Text({
                    font: '14px Calibri,sans-serif',
                    text: name,
                    exceedLength: true,
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new Fill({
                        color: '#FFF'
                    }),
                    stroke: new Stroke({
                        color: '#000',
                        width: 1,
                        offsetY: 1,
                        offsetX: 2
                    })
                })
            })
        ]
    }

    startingTownStyleFunctionHarmony(feature, resolution) {
        let fontSize: number = resolution <= 0.125 ? 16 : 12;

        return [
            new Style({
                image: new RegularShape({
                    points: 4,
                    radius: (11 / resolution) + 4,
                    angle: Math.PI / 4,
                    fill: new Fill({
                        color: "rgba(0, 0, 255, 0.4)"
                    }),
                    stroke: new Stroke({
                        color: "rgba(0, 0, 255, 1)",
                        width: 1
                    })
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: resolution < 5 ? feature.get('name') : '',
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new Fill({
                        color: "White"
                    }),
                    stroke: new Stroke({
                        color: "Black",
                        width: 1
                    })
                })
            })
        ]
    }

    bridgeStyleFunction(feature, resolution) {
        let fontSize: number = resolution <= 0.125 ? 16 : 12;

        var bridgeName = feature.get('name') != null ? feature.get('name') : '';
        var bWidth = 2;

        return [
            new Style({
                stroke: new Stroke({
                    width: (4 / resolution) * bWidth,
                    color: "rgba(255, 0, 255, 0.4)",
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: resolution < 8 ? bridgeName : '',
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new Fill({
                        color: "White"
                    }),
                    stroke: new Stroke({
                        color: 'Black',
                        width: 1
                    })
                })
            }),
        ]
    }

    canalStyleFunction(feature, resolution) {
        var isCanal = feature.get('isCanal');
        var isTunnel = feature.get('isTunnel');
        var allBoats = feature.get('allBoats')

        let fontSize: number = resolution <= 0.125 ? 16 : 12;

        let canalName = feature.get('name') != null ? feature.get('name') : '';
        let canalText: string = `${canalName} `;

        if (isCanal === true && isTunnel === true) {
            canalText += `(${isCanal === true ? 'Canal /' : ''} ${isTunnel === true ? 'Tunnel /' : ''} ${allBoats === true ? 'All Boats' : 'Knarrs only'})`;
        }
        else if (isCanal === true && isTunnel === false) {
            canalText += `(${isCanal === true ? 'Canal /' : ''} ${allBoats === true ? 'All Boats' : 'Knarrs only'})`;
        }
        else if (isCanal === false && isTunnel === true) {
            canalText += `(Tunnel)`;
        }

        return [
            new Style({
                stroke: new Stroke({
                    width: 11 / resolution,
                    color: "rgba(0, 191, 255, 0.4)",
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: resolution < 8 ? canalText : '',
                    textBaseline: 'middle',
                    textAlign: 'center',
                    // offsetY: 12,
                    fill: new Fill({
                        // color: '#FFF'
                        color: "White"
                    }),
                    stroke: new Stroke({
                        color: 'Black',
                        width: 1
                    })
                })
            }),

        ]
    }

    canalStyleFunctionHarmony(feature, resolution) {
        var isCanal = feature.get('isCanal');
        var isTunnel = feature.get('isTunnel');
        var allBoats = feature.get('allBoats')

        let fontSize: number = resolution <= 0.125 ? 16 : 12;

        let canalName = feature.get('name') != null ? feature.get('name') : '';
        let canalText: string = `${canalName} `;

        if (isCanal === true && isTunnel === true) {
            canalText += `\n(${isCanal === true ? 'Canal /' : ''} ${isTunnel === true ? 'Tunnel /' : ''} ${allBoats === true ? 'All Boats' : 'Knarrs only'})`;
        }
        else if (isCanal === true && isTunnel === false) {
            canalText += `\n(${isCanal === true ? 'Canal /' : ''} ${allBoats === true ? 'All Boats' : 'Knarrs only'})`;
        }
        else if (isCanal === false && isTunnel === true) {
            canalText += `\n(Tunnel)`;
        }

        return [
            new Style({
                stroke: new Stroke({
                    width: 2 / resolution,
                    color: "rgba(0, 191, 255, 0.4)",
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: resolution < 0.25 ? canalText : '',
                    textBaseline: 'middle',
                    textAlign: 'center',
                    // offsetY: 12,
                    fill: new Fill({
                        // color: '#FFF'
                        color: "White"
                    }),
                    stroke: new Stroke({
                        color: 'Black',
                        width: 1
                    })
                })
            }),

        ]
    }

    gridStyleFunction(feature, resolution) {

        var fontSize = (14 / resolution) + 16;

        if (resolution >= 16) {
            fontSize = 8;
        }

        return [
            new Style({
                stroke: new Stroke({
                    color: 'rgba(103, 207, 230, 0.6)',
                    width: 2
                }),
                text: new Text({
                    font: '' + fontSize + 'px Calibri,sans-serif',
                    text: feature.get('name'),
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fill: new Fill({
                        color: 'rgba(103, 207, 230, 0.6)',
                    }),
                    stroke: new Stroke({
                        color: 'rgba(103, 207, 230, 0.6)',
                        width: 1,
                    })
                })
            })
        ]
    }

    landmarkStyleFunction(feature, resolution) {
        let fontSize: number = resolution <= 0.125 ? 16 : 12;

        let name: string = feature.get('name');
        let type: string = feature.get('type');

        if (type === 'BodyOfWater') {
            return [
                new Style({
                    text: new Text({
                        font: "" + fontSize + "px 'IM Fell English SC', serif",
                        text: resolution <= 1 ? name : '',
                        textBaseline: 'middle',
                        textAlign: 'center',
                        fill: new Fill({
                            color: "rgba(255, 0, 0, 0.9)"
                        }),
                    })
                })
            ]
        }

        if (type === 'Obelisk') {

            const obe = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAb0lEQVQ4jcWQSw6AIAwFRxNugufwUt4WNu7FK+CmC9JQQ43GlzTl0w6vwIdagV2yWwE4gU1y8AIWIMk6A9EqnAcASfZuQG4cuAFRAR6N8JqD2z/oqQC1E8cooHrO9QilKdbBiAvrdfN+cjRbfT/rAilOIm8zKT9iAAAAAElFTkSuQmCC';

            return [
                new Style({
                    image: new Icon({
                        opacity: 1,
                        src: obe,
                        scale: 1 / resolution
                    })
                })
            ];
        }

        // return [
        //     new Style({
        //         image: new RegularShape({
        //             points: 4,
        //             radius: (11 / resolution) + 4,
        //             angle: Math.PI / 4,
        //             fill: new Fill({
        //                 color: "rgba(255, 0, 0, 0.4)"
        //             }),
        //         }),
        //         text: new Text({
        //             font: '' + fontSize + 'px Calibri,sans-serif',
        //             text: resolution < 4 ? feature.get('name') : '',
        //             textBaseline: 'middle',
        //             textAlign: 'center',
        //             fill: new Fill({
        //                 color: "White"
        //             }),
        //             stroke: new Stroke({
        //                 color: "Black",
        //                 width: 1
        //             })
        //         })
        //     })
        // ]
    }
}
