import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ItemsComponent } from "./items/items.component"
import { LeadersComponent } from "./leaders/leaders.component";

const routes: Routes = [
    { path: "", redirectTo: "/leaders", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "leaders", component: LeadersComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }