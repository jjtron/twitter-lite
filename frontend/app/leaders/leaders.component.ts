import { Component } from "@angular/core";
import { HttpsService } from "../services/https.service";
import { DialogContent } from "./dialog.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Router } from '@angular/router';

@Component({
    selector: "ns-leaders",
    moduleId: module.id,
    template:  `<StackLayout orientation="vertical" width="210" height="250" backgroundColor="lightgray">
                    <ListPicker #picker class="p-15" *ngIf="leaders.length !== 0"
                                    [items]="leaders"
                                    [selectedIndex]="index"
                                    (selectedIndexChange)="selectedIndexChanged(picker)">
                    </ListPicker>
                    <Button class="btn btn-primary btn-active" text="Go" (tap)="onTap()"></Button>
                </StackLayout>`
})
export class LeadersComponent {
    leaders: string[];
    picked: string;
    index: number;

    constructor(private httpsService: HttpsService, 
                private modalService: ModalDialogService,
                private router: Router) {
        this.httpsService.getLeaders();
    }

    ngOnInit (): void {
        this.httpsService.leaders.subscribe((leaders) => {
            this.index = 1;
            this.leaders = leaders;
        });    
    }
    
    selectedIndexChanged(picker) {
        this.index = picker.selectedIndex;
    }

    onTap () {
        this.router.navigate(['/items', {user: this.index}]);
    }
}
