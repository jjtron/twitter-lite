import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { HttpsService } from "../services/https.service";
import { DialogContent } from "./dialog.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

@Component({
    selector: "ns-leaders",
    moduleId: module.id,
    template:  `<StackLayout orientation="vertical" width="210" height="210" backgroundColor="lightgray">
                    <ListView [items]="leaders" class="list-group">
                        <ng-template let-item="item">
                            <Label [text]="item" height="200"></Label>
                        </ng-template>
                    </ListView>
                </StackLayout>`
})
export class LeadersComponent implements OnInit {
    leaders: string[];

    constructor(private httpsService: HttpsService, 
                private modalService: ModalDialogService,
                private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        this.httpsService.getLeaders();
        this.httpsService.leaders.subscribe((leaders) => {
            this.leaders = leaders;
            this.show();
        });
    }

    show() {
        let options: ModalDialogOptions = {
            context: { promptMsg: "This is the prompt message!" },
            fullscreen: true,
            viewContainerRef: this.viewContainerRef
        };
    
        this.modalService.showModal(DialogContent, options);
    }
}
