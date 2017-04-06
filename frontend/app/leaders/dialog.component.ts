import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "modal-content",
    template: `
    <StackLayout margin="24" horizontalAlignment="center" verticalAlignment="center">
        <Label [text]="prompt"></Label>
        <StackLayout orientation="horizontal" marginTop="12">
        <Button text="ok" (tap)="close('OK')"></Button>
        <Button text="cancel" (tap)="close('Cancel')"></Button>
        </StackLayout>
    </StackLayout>
  `
})

export class DialogContent {
    public prompt: string;
    constructor(private params: ModalDialogParams) {
        this.prompt = params.context.promptMsg;
    }

    public close(result: string) {
        this.params.closeCallback(result);
  }
}