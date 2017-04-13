import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { HttpsService } from "./services/https.service";
import { FileService } from "./services/file.service";
import { ItemsComponent } from "./items/items.component";
import { LeadersComponent } from "./leaders/leaders.component";
import { MenuComponent } from "./menu/menu.component";
import { ErrComponent } from "./err/err.component";

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
        MenuComponent,
        ErrComponent
    ],
    providers: [
        HttpsService,
        FileService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
