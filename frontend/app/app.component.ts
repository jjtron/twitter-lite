/// <reference path="../node_modules/tns-platform-declarations/android.d.ts" />
import { Component } from "@angular/core";
import app = require("application");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    constructor () {
        app.android.startActivity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
    }
}
