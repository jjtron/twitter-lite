import { Component, OnInit } from "@angular/core";
import { HttpsService } from "../services/https.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: `./items.component.html`
})
export class ItemsComponent implements OnInit {
    items: any[];

    constructor(private httpsService: HttpsService) { }

    ngOnInit(): void {
        this.httpsService.getTweets()
            .subscribe((res) => {
                this.items = res;
                this.items.sort(function(a, b) {
                  var dateA = new Date(a.created_at);
                  var dateB = new Date(b.created_at);
                  if (dateA > dateB) { return -1; }
                  if (dateA < dateB) { return 1; }
                  return 0;
                });
            });
    }
}
