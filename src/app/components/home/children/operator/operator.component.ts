import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  @ViewChild('name') name: any;
  @ViewChild('surname') surname: any;
  @ViewChild('email') email: any;
  @ViewChild('password') password: any;
  @ViewChild('serialNumber') serialNumber: any;

  user: User;
  userList: User[];

  isModify = false;
  id_user: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      console.log(data);
      this.userList = data;
    });
  }

  saveUser(name: string, surname: string, email: string, password: string, serialNumber: string) {
    this.user = {
      name,
      surname,
      email,
      password,
      serialNumber,
      role: 'operator'
    };
    this.userService.saveUser(this.user).subscribe(data => {
      console.log(data);
      this.userList.push(data);
      this.name.nativeElement.value = null;
      this.surname.nativeElement.value = null;
      this.email.nativeElement.value = null;
      this.password.nativeElement.value = null;
      this.serialNumber.nativeElement.value = null;

    });
  }

  modifyUser(id: number, name: string, surname: string, email: string, password: string, serialNumber: string) {
    this.id_user = id;
    this.name.nativeElement.value = name;
    this.surname.nativeElement.value = surname;
    this.email.nativeElement.value = email;
    this.password.nativeElement.value = password;
    this.serialNumber.nativeElement.value = serialNumber;

    this.isModify = true;
  }

  deleteUser(id: number, myindex: number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log('Eliminato', data);
      this.userList.splice(myindex, 1);
    });
  }

  modify(name: string, surname: string, email: string, password: string, serialNumber: string) {
    this.user = {
      id: this.id_user,
      name,
      surname,
      email,
      password,
      serialNumber,
    };
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data);
      this.name.nativeElement.value = null;
      this.surname.nativeElement.value = null;
      this.email.nativeElement.value = null;
      this.password.nativeElement.value = null;
      this.serialNumber.nativeElement.value = null;

      this.isModify = false;
      this.getAllUser();
    });
  }

  annulla() {
    this.name.nativeElement.value = null;
    this.surname.nativeElement.value = null;
    this.email.nativeElement.value = null;
    this.password.nativeElement.value = null;
    this.serialNumber.nativeElement.value = null;

    this.isModify = false;
  }
}
