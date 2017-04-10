import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: "twtr-lite-menu",
    template:  `<GridLayout columns="*,*">
                    <Button col="0" horizontalAlignment="left" class="capital-case" text="Add Leader(s)" margin="2"></Button>
                    <Button col="1" horizontalAlignment="right" class="capital-case" text="Delete Leader(s)" margin="2"></Button>
                </GridLayout>`
})
export class MenuComponent {
}
