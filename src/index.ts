import "reflect-metadata";
import { myContainer } from "../inversify.config";

import { Ion, Viewer, createWorldTerrain, createOsmBuildings, Cartesian3, HorizontalOrigin, VerticalOrigin, NearFarScalar} from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/index.css"
import { IMyClass } from "./DI/IMyClass";
import { TYPES } from "./DI/TYPES";
import Drag from "./drag.js";

// This is the default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer('cesiumContainer', {
  terrainProvider: createWorldTerrain()
});

viewer.entities.add({
    position: Cartesian3.fromDegrees(34.97024, 32.80687, 50),
    point: {
        pixelSize: 20,
      },
  });

// Add Cesium OSM Buildings, a global 3D buildings layer.
viewer.scene.primitives.add(createOsmBuildings());   

viewer.camera.flyTo({
  destination : Cartesian3.fromDegrees(34.97024, 32.80687, 50000),
});

const drag = new Drag(viewer);
drag.enable();

var myClasss = myContainer.get<IMyClass>(TYPES.IMyClass);
myClasss.doWork();