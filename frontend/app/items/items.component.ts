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

    constructor(
        private httpsService: HttpsService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit(): void {

        this.route.url.subscribe((url: any) => { 
            this.httpsService.getTweets(url[0].parameters.user)
                .subscribe(
                    (res) => {
                        try {
                            if (res.hasOwnProperty('errors')) {
                                let e = res.errors[0];
                                throw new Error('code: ' + e.code + ', ' + e.message);
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
                    (error) => {
                        console.log('error');
                    });
        });
    }
}
