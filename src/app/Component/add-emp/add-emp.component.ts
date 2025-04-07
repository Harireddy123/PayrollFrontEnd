import { Component } from '@angular/core';

@Component({
  selector: 'app-add-emp',
  standalone: false,
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.scss',
})
export class AddEmpComponent {
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
}
