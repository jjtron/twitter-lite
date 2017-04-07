import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { HttpsService } from "./services/https.service";
import { ItemsComponent } from "./items/items.component";
import { LeadersComponent } from "./leaders/leaders.component";
//import { DialogContent } from "./leaders/dialog.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        LeadersComponent,
        //DialogContent
    ],
    //entryComponents: [DialogContent],
    providers: [
        HttpsService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
