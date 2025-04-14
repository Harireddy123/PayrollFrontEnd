// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { EmployeeService } from '../../Services/Employee/employee.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   standalone: false,
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent implements OnInit {
//   profileImages = [
//     '/images/avatar2.jpg',
//     '/images/avatar1.jpg',
//     '/images/avatar3.jpg',
//     '/images/avatar4.jpg',
//   ];

//   departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
//   salaryOptions = ['₹30,000', '₹40,000', '₹50,000', '₹60,000'];
//   days = Array.from({ length: 31 }, (_, i) => i + 1);
//   months = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ];
//   years = Array.from({ length: 30 }, (_, i) => 2000 + i);

//   selectedDate = { day: '', month: '', year: '' };
//   RegisterForm!: FormGroup;
//   constructor(
//     private employee: EmployeeService,
//     private formbuilder: FormBuilder,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.RegisterForm = this.formbuilder.group({
//       Name: [''],
//       Image: [''],
//       Gender: [''],
//       Department: [[]],
//       Salary: [''],
//       StartDate: [''],
//       Note: [''],
//     });
//   }

//   onDepartmentChange(event: any, dept: string) {
//     if (event.checked) {
//       this.RegisterForm.get('Department')?.setValue(dept);
//     } else {
//       const current = this.RegisterForm.get('Department')?.value;
//       if (current === dept) {
//         this.RegisterForm.get('Department')?.setValue('');
//       }
//     }
//   }

//   updateStartDate(value: string | number, type: 'day' | 'month' | 'year') {
//     this.selectedDate[type] = value.toString();

//     const { day, month, year } = this.selectedDate;
//     if (day && month && year) {
//       const monthIndex = this.months.indexOf(month) + 1;
//       const paddedMonth = monthIndex.toString().padStart(2, '0');
//       const paddedDay = day.toString().padStart(2, '0');
//       const isoDate = `${year}-${paddedMonth}-${paddedDay}`; // yyyy-MM-dd
//       this.RegisterForm.patchValue({ StartDate: isoDate });
//     }
//   }

//   Register() {
//     const reqData = { ...this.RegisterForm.value };

//     // Convert Salary to a number
//     if (reqData.Salary) {
//       // Remove ₹ and commas
//       const numericSalary = reqData.Salary.replace(/[₹,]/g, '');
//       reqData.Salary = parseFloat(numericSalary);
//     }

//     this.employee.Register(reqData).subscribe({
//       next: (res) => {
//         console.log('Registration Successful:', res);
//         alert('User Registered Successfully!');
//         this.router.navigate(['/dashboard']);
//       },
//       error: (err) => {
//         if (err.error?.errors) {
//           console.log('Validation Errors:');
//           for (let field in err.error.errors) {
//             console.log(`${field}: ${err.error.errors[field]}`);
//           }
//         } else {
//           console.error('Other Error:', err);
//         }
//       },
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/Employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  profileImages = [
    '/images/man2.png',
    '/images/profile1.png',
    '/images/profilem.png',
    '/images/woman.png',
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

  selectedDate = { day: '', month: '', year: '' };
  RegisterForm!: FormGroup;
  submitted = false;
  employeeId: any;
  isEditMode: boolean = false;

  constructor(
    private employee: EmployeeService,
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.RegisterForm = this.formbuilder.group({
      Name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      Image: ['', Validators.required],
      Gender: ['', Validators.required],
      Department: [[], Validators.required],
      Salary: ['', Validators.required],
      StartDate: ['', Validators.required],
      Note: ['', Validators.required],
    });

    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.employeeId;

    if (this.isEditMode) {
      this.employee.getEmployeeById(+this.employeeId).subscribe({
        next: (res: any) => {
          if (res.startDate) {
            const [day, month, year] = res.startDate.split('-');
            this.selectedDate = { day, month, year };
          }

          this.RegisterForm.patchValue({
            Name: res.name,
            Image: res.image,
            Gender: res.gender,
            Department: res.department
              ? res.department.split(',').map((d: string) => d.trim())
              : [],
            Salary: res.salary,
            StartDate: res.startDate,
            Note: res.note,
          });
        },
        error: (err: any) => {
          console.error('Failed to load employee', err);
        },
      });
    }
  }

  loadEmployeeData(id: string) {
    this.employee.getEmployeeById(+id).subscribe({
      next: (res: any) => {
        this.RegisterForm.patchValue({
          ...res,
          Department: res.department
            ? res.department.split(',').map((d: string) => d.trim())
            : [],
        });
        if (res.startDate) {
          const [day, month, year] = res.startDate.split('-');
          this.selectedDate = { day, month, year };
        }
      },
      error: (err: any) => console.error('Failed to load employee', err),
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  resetForm() {
    this.RegisterForm.reset();
    this.submitted = false;
    this.selectedDate = { day: '', month: '', year: '' };
  }

  onDepartmentChange(event: any, dept: string) {
    const current = this.RegisterForm.get('Department')?.value || [];
    if (event.checked) {
      this.RegisterForm.get('Department')?.setValue([...current, dept]);
    } else {
      this.RegisterForm.get('Department')?.setValue(
        current.filter((d: string) => d !== dept)
      );
    }
  }

  updateStartDate(value: string | number, type: 'day' | 'month' | 'year') {
    this.selectedDate[type] = value.toString();

    const { day, month, year } = this.selectedDate;
    if (day && month && year) {
      const monthIndex = this.months.indexOf(month) + 1;
      const paddedMonth = monthIndex.toString().padStart(2, '0');
      const paddedDay = day.toString().padStart(2, '0');
      const isoDate = `${year}-${paddedMonth}-${paddedDay}`; // yyyy-MM-dd
      this.RegisterForm.patchValue({ StartDate: isoDate });
    }
  }

  Register() {
    this.submitted = true;

    if (this.RegisterForm.invalid) {
      this.RegisterForm.markAllAsTouched();
      return;
    }

    const formValue = this.RegisterForm.value;

    // ✅ Convert formatted salary string like "₹40,000" to number 40000
    const sanitizedSalary = Number(formValue.Salary.replace(/[₹,]/g, ''));

    const reqData = {
      ...formValue,
      Salary: sanitizedSalary, // ✅ Send numeric value
      Department: formValue.Department.join(', '), // Convert array to comma-separated string
    };

    if (this.isEditMode) {
      this.employee.updateEmployee(this.employeeId, reqData).subscribe({
        next: () => {
          this.snackbar.open('Employee updated successfully!', 'Close', {
            duration: 1000,
          });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Update error:', err);
        },
      });
    } else {
      this.employee.Register(reqData).subscribe({
        next: (res) => {
          console.log('Registration Successful:', res);
          this.snackbar.open('User Registered Successfully!', 'Close', {
            duration: 1000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          if (err.error?.errors) {
            console.log('Validation Errors:');
            for (let field in err.error.errors) {
              console.log(`${field}: ${err.error.errors[field]}`);
            }
          } else {
            console.error('Other Error:', err);
          }
        },
      });
    }
  }
}
