import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'name',
    'gender',
    'department',
    'salary',
    'startDate',
    'actions',
  ];

  employeeList = [
    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'Female',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },

    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'Female',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },

    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'male',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },

    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'male',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },

    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'Female',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },

    {
      name: 'Amarpa Shashanka Keerthi Kumar',
      gender: 'Female',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },

    {
      name: 'mohammad salman iqbal shaik',
      gender: 'male',
      department: ['Sales', 'HR', 'Finance'],
      salary: '10,000',
      startDate: '29 Oct 2019',
      profilePic: '/images/profilem.png',
    },
  ];
}
