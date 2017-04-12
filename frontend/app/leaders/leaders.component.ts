import { Component } from "@angular/core";
import { HttpsService } from "../services/https.service";
import { FileService } from "../services/file.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import * as dialogs from "ui/dialogs";

@Component({
    selector: "ns-leaders",
    moduleId: module.id,
    template:  `<GridLayout columns="*" rows="auto, *" >
                    <twtr-lite-menu row="0"
                            (add)="addLeaders()"
                            (delete)="deleteLeaders()"></twtr-lite-menu>
                    <StackLayout    orientation="vertical"
                                    row="1"
                                    width="210"
                                    height="250"
                                    backgroundColor="lightgray">
                        <ListPicker #picker class="p-15"
                                    *ngIf="leaders.length !== 0"
                                    [items]="leaders"
                                    [selectedIndex]="index"
                                    (selectedIndexChange)="selectedIndexChanged(picker)">
                        </ListPicker>
                        <Button class="btn btn-primary btn-active" text="Go" (tap)="onTap()"></Button>
                    </StackLayout>
                </GridLayout>`
})
export class LeadersComponent {
    leaders: string[];
    picked: string;
    index: number = 0;

    constructor(private httpsService: HttpsService,
                private fileService: FileService, 
                private modalService: ModalDialogService,
                private router: Router) {
        this.fileService.getLeaders();
    }

    ngOnInit (): void {
        this.fileService.leaders.subscribe((leaders) => {
            this.index = leaders.length - 1;
            this.leaders = leaders;
        });
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd && e.url === '/leaders') {
                let tmp = this.index;
                this.index = 0;
                setTimeout(() => { this.index = tmp; }, 0);
            }
        });
    }
    
    selectedIndexChanged(picker) {
        this.index = picker.selectedIndex;
    }

    onTap () {
        this.router.navigate(['/items', {user: this.leaders[this.index]}]);
    }

    addLeaders () {
        let options = {
            title: "I want to follow ...",
            inputType: dialogs.inputType.text,
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        };
        dialogs.prompt(options).then((result: dialogs.PromptResult) => {
            this.fileService.addLeader(result.text);
        });
    }

    deleteLeaders () {
        let options = {
            title: "Race selection",
            message: "Choose your race",
            cancelButtonText: "Cancel",
            actions: this.leaders
        };
        dialogs.action(options).then((result) => {
            console.log(result);
        });  
    }
}
