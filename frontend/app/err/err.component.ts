import { Component } from "@angular/core";

@Component({
    selector: "ns-error",
    moduleId: module.id,
    template:  `<StackLayout>
                  <Label class="p-15 text-center font-weight-bold" backgroundColor="#F69256" text="{{text}}"></Label>
                </StackLayout>`
})
export class ErrComponent {
    text: string = "ERROR";
    
}