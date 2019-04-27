import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Contact } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class ContactService {

    private _getContactsUrl = "/Contact/GetContacts";
    public _saveUrl: string = '/Contact/SaveContact/';
    public _updateUrl: string = '/Contact/UpdateContact/';
    public _deleteByIdUrl: string = '/Contact/DeleteContactByID/';

    constructor(private http: Http) { }

    getContacts() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getContactsUrl = this._getContactsUrl;
        return this.http.get(getContactsUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    //Post Savd and Update operation
    saveContact(contact: Contact): Observable<string> {
        let body = JSON.stringify(contact);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._saveUrl, body, options)
            .map(res => res.json().message)
            .catch(this.handleError);
    }

    //Delete Operation
    deleteContact(id: number): Observable<string> {
        //debugger
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id

        return this.http.delete(deleteByIdUrl)
            .map(response => response.json().message)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }

}
