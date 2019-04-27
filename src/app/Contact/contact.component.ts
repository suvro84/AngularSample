import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/index';
import { ContactService } from '../_services/index';

//import { ToastrService } from 'toastr-ng2';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ng2-toastr/ng2-toastr';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class ContactInfo implements Contact {
    constructor(public contactId?, public firstName?, public lastName?, public email?, public phone?) { }
}

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

    private rowData: any[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newContact: boolean;
    contact: Contact = new ContactInfo();
    contacts: Contact[];
    public editContactId: any;
    public fullname: string;

    // constructor(private contactService: ContactService, private toastrService: ToastrService) {

    // }
    constructor(private contactService: ContactService) {

    }
    ngOnInit() {
        this.editContactId = 0;
        this.loadData();
    }

    loadData() {
        this.contactService.getContacts()
            .subscribe(res => {
                this.rowData = res.result;
            });
    }

    showDialogToAdd() {
        this.newContact = true;
        this.editContactId = 0;
        this.contact = new ContactInfo();
        this.displayDialog = true;
    }


    showDialogToEdit(contact: Contact) {
        this.newContact = false;
        this.contact = new ContactInfo();
        this.contact.contactId = contact.contactId;
        this.contact.firstName = contact.firstName;
        this.contact.lastName = contact.lastName;
        this.contact.email = contact.email;
        this.contact.phone = contact.phone;
        this.displayDialog = true;
    }

    onRowSelect(event) {
    }

    save() {
        this.contactService.saveContact(this.contact)
            .subscribe(response => {
                // this.contact.contactId > 0 ? this.toastrService.success('Data updated Successfully') :
                //     this.toastrService.success('Data inserted Successfully');
                this.contact.contactId > 0 ? alert('Data updated Successfully') :
               alert('Data inserted Successfully');
                this.loadData();
            });
        this.displayDialog = false;
    }

    cancel() {
        this.contact = new ContactInfo();
        this.displayDialog = false;
    }


    showDialogToDelete(contact: Contact) {
        this.fullname = contact.firstName + ' ' + contact.lastName;
        this.editContactId = contact.contactId;
        this.displayDeleteDialog = true;
    }

    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.contactService.deleteContact(this.editContactId)
                .subscribe(response => {
                    this.editContactId = 0;
                    this.loadData();
                });
            //this.toastrService.error('Data Deleted Successfully');
            alert('Data Deleted Successfully');
        }
        this.displayDeleteDialog = false;
    }
}
