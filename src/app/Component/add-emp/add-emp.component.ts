import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  standalone: false,
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.scss',
})
export class AddEmpComponent implements OnInit {
  profileImages = [
    '/images/profilem.png',
    '/images/profilem.png',
    '/images/profilem.png',
    '/images/profilem.png',
  ];

  departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  salaryOptions = ['₹30,000', '₹40,000', '₹50,000', '₹60,000'];
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  years = Array.from({ length: 30 }, (_, i) => 2000 + i);

  registerForm!: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      name: [''],
      profileImage: [''],
      gender: [''],
      department: [''],
      salary: [''],
      startDate: [''],
      notes: [''],
    });
  }

  Register() {
    let reqData = {
      name: this.registerForm.value.name,
      profileImage: this.registerForm.value.profileImage,
      gender: this.registerForm.value.gender,
      department: this.registerForm.value.department,
      salary: this.registerForm.value.salary,
      startDate: this.registerForm.value.startDate,
      notes: this.registerForm.value.notes,
    };
    this.userService.reg(reqData).subscribe((result: any) => {
      console.log(result);
    });
  }
}
