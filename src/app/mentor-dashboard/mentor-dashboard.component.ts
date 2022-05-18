import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { AuthServiceService } from '../services/auth-service.service';
interface BatchData {
  id: number;
  no: number;
  batchId: string;
  batchName: string;
  mentorName: string;
  technologies: Array<any>;
  startDate: string;
  endDate: string;
  status: string;
  employeesId: string;
}

interface EmployeeList {
  id: number;
  no: number;
  empId: string;
  empName: string;
  mockTaken: string;
  mockRating: string;
  empStatus: string;
}
@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css'],
})
export class MentorDashboardComponent implements OnInit {
  toggle1 = true;
  toggle2 = true;
  group = '../../assets/images/group (1).png';
  dashboard = '../../assets/images/dashboard (3).png';
  isBatch = false;
  isDashboard = false;
  isEmployee = false;
  isEmployeeData = false;
  batchStrength: any;
  date = new Date().toDateString();
  isAttendance = false;
  mentorlist: any;
  empId: any;
  empName: any;
  employeeId: any;
  resetPasswordValues: any;
  mockRatingValues: any;
  isPasswordChanged: any;
  allEmployees: any;

  maleEmployees: any = 0;
  femaleEmployees: any = 0;

  poySeventeen: any = 0;
  poyEighteen: any = 0;
  poyNinteen: any = 0;
  poyTwenty: any = 0;
  poyTwentyOne: any = 0;
  poyTwentyTwo: any = 0;

  constructor(
    private api: ApiServiceService,
    private authserve: AuthServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const userDetails = this.authserve.getUserDetails();
    this.employeeId = userDetails.empId;
    this.isPasswordChanged = userDetails.passwordChanged;
    console.log(this.isPasswordChanged);
    this.empName = this.authserve.getUserDetails().mentorName;
    this.getBatchByEmpId();
    this.getAllMentors();
    this.getAllEMployees();
  }

  logout() {
    alert('Are you sure you want logout');
    localStorage.clear();
    this.route.navigate(['/login']);
  }
  enableDisableGroup() {
    this.isDashboard = false;
    this.isBatch = true;
    (this.toggle2 = true),
      (this.dashboard = this.toggle2
        ? '../../assets/images/dashboard (3).png'
        : '../../assets/images/dashboard (2).png');

    this.toggle1 = !this.toggle1;
    this.group = this.toggle1
      ? '../../assets/images/group (1).png'
      : '../../assets/images/group (2).png';
  }
  enableDisableDashboard() {
    this.isDashboard = true;
    this.isBatch = false;
    this.isEmployee = false;
    this.isEmployeeData = false;
    (this.toggle1 = true),
      (this.group = this.toggle1
        ? '../../assets/images/group (1).png'
        : '../../assets/images/group (2).png');

    this.toggle2 = !this.toggle2;
    this.dashboard = this.toggle2
      ? '../../assets/images/dashboard (3).png'
      : '../../assets/images/dashboard (2).png';

    for (let emp of this.allEmployees) {
      if (emp.gender === 'male') {
        this.maleEmployees++;
      } else {
        this.femaleEmployees++;
      }
    }
    localStorage.setItem('maleEmployees', this.maleEmployees);
    localStorage.setItem('femaleEmployees', this.femaleEmployees);

    for (let aemp of this.allEmployees) {
      // console.log(emp.educationDetails);
      for(let emp of aemp.educationDetails){
        console.log(emp);
        
        if (emp.yop === '2017') {
          this.poySeventeen++;
        } else if (emp.yop === '2018') {
          this.poyEighteen++;
        } else if (emp.yop === '2019') {
          this.poyNinteen++;
        } else if (emp.yop === '2020') {
          this.poyTwenty++;
        } else if (emp.yop === '2021') {
          this.poyTwentyOne++;
        } else if (emp.yop === '2022') {
          this.poyTwentyTwo++;
        }
      }
      
    }
    
    localStorage.setItem('poySeventeen', this.poySeventeen);
    localStorage.setItem('poyEighteen', this.poyEighteen);
    localStorage.setItem('poyNinteen', this.poyNinteen);
    localStorage.setItem('poyTwenty', this.poyTwenty);
    localStorage.setItem('poyTwentyOne', this.poyTwentyOne);
    localStorage.setItem('poyTwentyTwo', this.poyTwentyTwo);
  }
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfBatchData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfBatchData.forEach((data, index) =>
          this.updateCheckedSet(data.id, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfBatchData: readonly BatchData[] = [];
  listOfBatch: readonly BatchData[] = [];
  listOfEmployeeData: readonly EmployeeList[] = [];
  listOfEmp: readonly EmployeeList[] = [];
  empRating: any;
  EmployeeDataWithRatings: [] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfBatchData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onChangeinRequestTable($event: readonly BatchData[]): void {
    this.listOfBatchData = $event;
    this.refreshCheckedStatus();
  }
  onChangeinEmployeelist($event: readonly EmployeeList[]): void {
    this.listOfEmployeeData = $event;
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    this.checked = this.listOfBatchData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfBatchData.some((item) => this.setOfCheckedId.has(item.id)) &&
      !this.checked;
  }

  getBatchByEmpId() {
    // console.log("UserDeatails",this.userDetails.empId);
    this.api.getBatchBYEmpId().subscribe((res) => {
      console.log(res);
      this.listOfBatch = res.data;
      for (let i = 0; i < this.listOfBatch.length; i++) {
        console.log(this.listOfBatch[i].employeesId.length);
        this.batchStrength = this.listOfBatch[i].employeesId.length;
      }
    });
  }

  onAttendance() {
    this.isAttendance = true;
  }
  onarrow(id: any) {
    console.log('onArrow');

    this.isEmployee = true;
    this.isBatch = false;
    this.getEmployeesOfBatch(id);
  }
  batch() {
    this.isBatch = true;
    this.isEmployee = false;
  }

  getEmployeesOfBatch(id: any) {
    this.api.getEmployeesOfBatch(id).subscribe((res) => {
      console.log('Employees', res);
      this.listOfEmp = res.data;
      for (let i = 0; i < this.listOfEmp.length; i++) {
        this.getEmployeeRatings(this.listOfEmp[i].empId);
      }
    });
  }

  getAllMentors() {
    this.api.getAllMentors().subscribe((res) => {
      // console.log(res);
      this.mentorlist = res.data;
      console.log(this.mentorlist);
    });
  }

  getAllEMployees() {
    this.api.getallEmployees().subscribe((res) => {
      this.allEmployees = res.data;
      console.log(this.allEmployees);
    });
  }

  getEmployeeRatings(id: any) {
    this.api.getMockRatings(id).subscribe((res) => {
      console.log('Rating', res);
      this.empRating = res.data;
      console.log(this.empRating);
    });
  }

  // Form to create mock
  createMockForm = new FormGroup({
    mockNo: new FormControl('', [Validators.required]),
    technologies: new FormControl('', [Validators.required]),
    panel: new FormControl('', [Validators.required]),
    dateTime: new FormControl('', [Validators.required]),
  });

  createMock() {
    console.log(this.createMockForm.value);
    this.api.createMock(this.createMockForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  onRating(id: any) {
    console.log(id);
    this.empId = id;
  }

  //Mock Rating form
  mockRatingForm = new FormGroup({
    mockType: new FormControl('', [Validators.required]),
    mockTakenBy: new FormControl('', [Validators.required]),
    technology: new FormControl('', [Validators.required]),
    practicalKnowledge: new FormControl('', [Validators.required]),
    theoreticalKnowledge: new FormControl('', [Validators.required]),
    feedback: new FormControl('', [Validators.required]),
    detailedFeedback: new FormControl('', [Validators.required]),
  });

  giveRating() {
    console.log(this.mockRatingForm.value);
    this.mockRatingValues = this.mockRatingForm.value;
    this.mockRatingValues.empId = this.empId;
    console.log(this.mockRatingValues);
    this.api.giveRating(this.mockRatingValues).subscribe((res) => {
      console.log(res);
    });
  }
  resetPassForm = new FormGroup({
    epassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  });

  resetPassword() {
    console.log(this.resetPassForm.value);
    this.resetPasswordValues = this.resetPassForm.value;

    this.resetPasswordValues.empId = this.employeeId;
    this.api.resetPassword(this.resetPasswordValues).subscribe((res) => {
      console.log(res);
      if (!res.error) {
        this.route.navigate(['/login']);
      } else {
        console.log(res.error);
      }
    });
  }

  onarrowEmp(data: any) {
    console.log(data);
    (this.isBatch = false),
      (this.isEmployee = false),
      (this.isEmployeeData = true);
  }
  employee() {
    (this.isBatch = false),
      (this.isEmployee = true),
      (this.isEmployeeData = false);
  }
}
