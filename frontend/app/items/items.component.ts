import { Component, OnInit } from "@angular/core";
import { HttpsService } from "../services/https.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: `./items.component.html`
})
export class ItemsComponent implements OnInit {
    items: any[];
    username: string;

    constructor(
        private httpsService: HttpsService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit(): void {

        this.route.url.subscribe((url: any) => {
            this.username = url[0].parameters.user;
            this.httpsService.getTweets(this.username)
                .subscribe(
                    (res) => {
                        try {
                            if (res.hasOwnProperty('isBoom')) {
                                throw new Error(res.output.statusCode + ', ' + res.message);
                            } else {
                                this.items = res;
                            }
                            this.items.sort(function(a, b) {
                              var dateA = new Date(a.created_at);
                              var dateB = new Date(b.created_at);
                              if (dateA > dateB) { return -1; }
                              if (dateA < dateB) { return 1; }
                              return 0;
                            });
                        } catch (error) {
                            this.router.navigate(['/leaders', { error: error.message }]);
                        }
                    },
                    () => {
                        this.router.navigate(['/leaders', { error: 'Server response error' }]);
                    });
        });
    }
}
