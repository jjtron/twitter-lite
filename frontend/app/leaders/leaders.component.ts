import { Component } from "@angular/core";
import { HttpsService } from "../services/https.service";
import { FileService } from "../services/file.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Router, NavigationEnd, ActivatedRoute,  } from '@angular/router';
import * as dialogs from "ui/dialogs";

@Component({
    selector: "ns-leaders",
    moduleId: module.id,
    template:  `<GridLayout columns="*" rows="auto, auto, *" >

                    <twtr-lite-menu row="0"
                            (add)="addLeaders()"
                            (delete)="deleteLeaders()"></twtr-lite-menu>

                    <Label class="error-message" row="1" width="210" *ngIf="error"
                           text="{{error}}" textWrap="true" backgroundColor="red"></Label>

                    <StackLayout    orientation="vertical"
                                    row="2"
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
    error: string = null;

    constructor(private httpsService: HttpsService,
                private fileService: FileService, 
                private modalService: ModalDialogService,
                private router: Router,
                private route: ActivatedRoute) {
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
        this.route.url.subscribe((url: any) => {
            if (url[0].parameters.error) {
                this.error = url[0].parameters.error;
            }
        });
    }
    
    selectedIndexChanged(picker) {
        this.index = picker.selectedIndex;
    }

    onTap () {
        this.error = null;
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
