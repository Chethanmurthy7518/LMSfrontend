import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { AttendanceserviceService } from '../services/attendanceservice.service';
import { AuthServiceService } from '../services/auth-service.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
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

interface EmployeeData {
  empId: string;
  empName: string;
}
interface MockData {
  empId: string;
  feedback: string;
  detailedFeedback: string;
  mockTakenBy: string;
  mockType: string;
}
interface AttendanceData{
  empId:string;
  batchId:string;
  session:any;
}
@Component({
  selector: 'app-mentor-dashboard',
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css'],
})
export class MentorDashboardComponent implements OnInit {
  visible: boolean = false;
  toggle1 = true;
  toggle2 = true;
  group = '../../assets/images/group (1).png';
  dashboard = '../../assets/images/dashboard (3).png';
  isBatch = false;
  isDashboard = false;
  isEmployee = false;
  isEmployeeData = false;
  batchStrength: any;
  batchFilter: any;
  employeeFilter: any;
  date = new Date().toDateString();
  isAttendance = false;
  mentorlist: any;
  empId: any;
  empName: any;
  employeeId: any;
  dataToDashBoard: any;
  resetPasswordValues: any;
  mockRatingValues: any;
  isPasswordChanged: any;
  allEmployees: any;
  employeeData: any;
  maleEmployees: any = 0;
  femaleEmployees: any = 0;

  poySeventeen: any = 0;
  poyEighteen: any = 0;
  poyNinteen: any = 0;
  poyTwenty: any = 0;
  poyTwentyOne: any = 0;
  poyTwentyTwo: any = 0;
  attendanceData: any = {};
  session: any = {};
  empIdAttendance: any;
  id: any;
  eduBE: any = 0;
  eduPG: any = 0;
  eduBEcse: any = 0;
  eduPHD: any = 0;
  fresher: any = 0;
  oneYear: any = 0;
  twoYears: any = 0;
  threeYears: any = 0;
  fourYears: any = 0;
  fiveYears: any = 0;
  batchId:any;
  constructor(
    private api: ApiServiceService,
    private authserve: AuthServiceService,
    private route: Router,
    private attendanceapi: AttendanceserviceService
  ) {}

  ngOnInit(): void {
    const userDetails = this.authserve.getUserDetails();
    this.employeeId = userDetails.empId;
    this.batchId = userDetails.batchId
    this.isPasswordChanged = userDetails.passwordChanged;
    console.log(this.isPasswordChanged);
    this.empName = this.authserve.getUserDetails().mentorName;
    this.getBatchByEmpId();
    this.getAllMentors();
    this.getAllEMployees();
    this.getEmployeesOfBatch(this.batchId)
  }
  Absconded: any = 'Absconded';
  Terminated: any = 'Terminated';
  Active: any = 'Active';
  Dropout:any='Dropout'
  editEmployeeData = { empId: '', empStatus: '' };
  editEmptStatus(data: any, id: any) {
    //  console.log(data);
    this.editEmployeeData.empId = id;
    this.editEmployeeData.empStatus=data
    console.log(this.editEmployeeData);
    this.api.editEmployeeStatus(this.editEmployeeData).subscribe((res)=>{
      console.log(res);
    })
  }

  clickMe(): void {
    this.visible = false;
  }
  change(value: boolean): void {
    console.log(value);
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
  mockData: any;
  mergeData: any;
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
  attendance(id: any) {
    this.getEmployeesOfBatch(id);
  }

  attendanceEmp(data: any) {
    // console.log(data);
    this.empIdAttendance = data.empId;
  }
  OnattendanceSubmit(data: any) {
    // console.log(data);
    this.session = data;

    // console.log(this.session);
    this.attendanceData.empId = this.empIdAttendance;
    this.attendanceData.session = this.session;
    console.log(this.attendanceData);

    this.takeAttendance(this.attendanceData);
  }
  takeAttendance(data: any) {
    console.log('payload', data);

    this.attendanceapi.takeAttendance(data).subscribe((res) => {
      console.log(res);
    });
  }
  onarrow(id: any) {
    console.log('onArrow');
    console.log(id);
    
    this.isEmployee = true;
    this.isBatch = false;
    // this.getEmployeesOfBatch(id);
    this.getEmployeeWithMockData(id);
  }
  batch() {
    this.isBatch = true;
    this.isEmployee = false;
  }
  
  AbscondedValue:any=0;
  TerminatedValue:any=0;
  ActiveValue:any=0;
  DropoutValue:any=0;
  PercentageValue:any;
  getEmployeesOfBatch(id: any) {
    this.api.getEmployeesOfBatch(id).subscribe((res) => {
      // console.log('Employees', res.data);
      // this.dataToDashBoard = res.data;
      // this.listOfEmp = res.data;
      for(let i=0;i<res.data.length;i++){
          console.log("RESPONSE",res.data[i].empStatus);
          if(res.data[i].empStatus === 'Absconded'){
            this.AbscondedValue++
          }
          if(res.data[i].empStatus === 'Terminated'){
            this.TerminatedValue++
          }
          if(res.data[i].empStatus === 'Active'){
            this.ActiveValue++
          }
          if(res.data[i].empStatus === 'Dropout'){
            this.DropoutValue++
          }
      }
      console.log("Batchstrength",this.batchStrength);
      
      this.PercentageValue = (this.AbscondedValue+this.TerminatedValue+this.DropoutValue/this.batchStrength)*100
      // console.log("Absconded",this.ActiveValue);
      
    });
  }
  EmployeeWithMockData: any;
  EmployeeData: EmployeeData[] = [];
  EmployeeMockData: MockData[] = [];
  EmployeeAttendanceData:AttendanceData[]=[];
  MergedData: any;
  DataArray: any = [];
  getEmployeeWithMockData(id: any) {
    this.api.getEmployeeWithMock(id).subscribe((res) => {
      console.log(res);
      this.EmployeeWithMockData = res.data;
      this.EmployeeData = this.EmployeeWithMockData.EmployeeData;
      this.EmployeeMockData = this.EmployeeWithMockData.mockData;
     this.EmployeeAttendanceData = this.EmployeeWithMockData.attendanceData;
     console.log("AttendanceData",this.EmployeeAttendanceData);
     
      console.log('EmployeeData', this.EmployeeData);
      console.log('MockData', this.EmployeeMockData);
      for (let i = 0; i < this.EmployeeData.length; i++) {
        let index = this.EmployeeMockData?.map((item) => item.empId).indexOf(
          this.EmployeeData[i].empId
        );
        console.log(index);
        this.MergedData = {
          ...this.EmployeeData[i],
          ...this.EmployeeMockData[index],
        };
        this.DataArray.push(this.MergedData);
      }
      console.log('Mergeed Data', this.DataArray);
      this.listOfEmp = this.DataArray;
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
    this.employeeData = data;
  }
  employee() {
    (this.isBatch = false),
      (this.isEmployee = true),
      (this.isEmployeeData = false);
  }
  downloadEmployeeData(){
    console.log("EmployeeData");
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Employee data',
      useBom: true,
      noDownload: false,
      headers: ["", "", ""]
    };
   
    new ngxCsv(this.EmployeeData, "EmployeeData", options);
    
  }
  downloadMockData(){
    console.log("MockData");
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Employees Mock data',
      useBom: true,
      noDownload: false,
      headers: ["_ID", "Employee Id", "Batch Id","Mock Type","Mpock Taken By","Technology","Theoretical score","Practical score","Feedback","Detailed Feedback","Version"]
    };
    new ngxCsv(this.EmployeeMockData, "MockData", options);

  }
  downloadEmployeeAttendance(){
    console.log("Attendance Data");
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Employees Attendance data',
      useBom: true,
      noDownload: false,
      headers: ["_ID", "Employee ID", "Employee Name","Attendance","Date and Time","Version"]
    };
    new ngxCsv(this.EmployeeAttendanceData, "Employees Attendance", options);
  }
}
