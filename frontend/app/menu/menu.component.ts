import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "twtr-lite-menu",
    template:  `<GridLayout columns="*,*">
                    <Button col="0" (tap)="addLeaders()" horizontalAlignment="left" class="capital-case" text="Add Leader(s)" margin="2"></Button>
                    <Button col="1" (tap)="deleteLeaders()" horizontalAlignment="right" class="capital-case" text="Delete Leader(s)" margin="2"></Button>
                </GridLayout>`
})
export class MenuComponent {

    @Output() add = new EventEmitter();
    @Output() delete = new EventEmitter();

    addLeaders () {
        this.add.next();   
    }

    deleteLeaders () {
        this.delete.next();     
    }
}
