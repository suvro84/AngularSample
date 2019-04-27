import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import {BrowserModule, ɵgetDOM} from '@angular/platform-browser'
import { APP_BASE_HREF, CommonModule, Location, LocationStrategy, HashLocationStrategy } 
             from '@angular/common';
// third party module to display toast
//import { ToastrModule } from 'toastr-ng2';
//import { ToastModule } from 'ng2-toastr/ng2-toastr';
//import { ToastrModule } from 'ngx-toastr';
//PRIMENG - Third party module
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ContactComponent } from './contact/contact.component';

import { ContactService } from './_services/index';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();
    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ContactComponent
    ],
    providers: [ContactService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions },],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        BrowserModule,
       // ToastModule.forRoot(),
      // ToastrModule.forRoot(),
        InputTextModule, DataTableModule, ButtonModule, DialogModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'}),
        RouterModule.forRoot([
            { path: '', redirectTo: 'contact', pathMatch: 'full' },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'contact' }
        ])
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
