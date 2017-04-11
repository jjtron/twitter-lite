import { Injectable } from "@angular/core";
import * as fs from "file-system";
import { Observable, BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class FileService {
    
    public leadersFile: any;
    public leaders: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
    public documents: any;
    public persistedFile: string = 'persistedFile.json';
    
    constructor() {
        this.documents = fs.knownFolders.documents();
    }

    getLeaders () {
        
        let file = fs.path.join(this.documents.path, this.persistedFile);
        if (!fs.File.exists(file)) {
            let fileNew = fs.knownFolders.documents().getFile(this.persistedFile);
            fileNew.writeText(JSON.stringify(new Array('realDonaldTrump')));
        }
        
        new Promise((resolve, reject) => {
            this.documents.getFile(this.persistedFile)
                .readText()
                .then((content) => {
                    try {
                        resolve(JSON.parse(content));
                    } catch (err) {
                        reject();
                        throw new Error('Could not parse JSON file');
                    }
                });
        })
        .then((jsonObj) => {
            let data = Object.keys(jsonObj).map((k) => {
                return jsonObj[k];
            });
            setTimeout(() => {
                this.leaders.next(data);
            }, 0);
        });
    }
    
    addLeader(leader: string) {
        
        let file = fs.knownFolders.documents().getFile(this.persistedFile);
        let currentData;
        file.readText().then(function(content) {
            return currentData = JSON.parse(content);
        })
        .then((currentData) => {
            currentData.push(leader);
            return currentData;
        })
        .then((currentData) => {
            return file.writeText(JSON.stringify(currentData));
        })
        .then(() => {
            return file.readText();
        })
        .then(function(content) {
            return JSON.parse(content);
        })
        .then((data) => {
            this.leaders.next(data);
        });
    }
}