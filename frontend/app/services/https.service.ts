import { Injectable, NgZone } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HttpsService {

    constructor(private http: Http, private zone: NgZone) {}

    getTweets (user: string) {
        return this.http.get(
            'http://localhost:8080/' + user,
            { headers: this.getHeaders () }
        )
        .map((res) => {
            try {
                return res.json();
            } catch (e) {
                throw 'Cannot JSON.parse response';    
            }
        });
    }
        
    getHeaders (): any {
        let headers: any = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
        headers.append('Accept-Language','en-US,en;q=0.8');
        headers.append('Accept-Encoding', 'gzip, deflate, sdch, br');
        headers.append('Cache-Control', 'max-age=0');
        headers.append('Connection', 'keep-alive');
        return headers;
    }
}
