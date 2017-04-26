import { Component } from "@angular/core";
import { HttpsService } from "../services/https.service";
import { FileService } from "../services/file.service";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Router, NavigationEnd, ActivatedRoute,  } from '@angular/router';
import * as dialogs from "ui/dialogs";

@Component({
    selector: "ns-leaders",
    moduleId: module.id,
    templateUrl: `./leaders.component.html`
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
