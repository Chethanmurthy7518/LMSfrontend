import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { ApiServiceService } from '../api-service.service';
import { ThemePalette } from '@angular/material/core';

import { Router } from '@angular/router';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}
interface Batchdata {
  id: number;
  no: number;
  batchId: string;
  batchName: string;
  mentorName: string;
  technologies: Array<any>;
  startDate: string;
  endDate: string;
  status: string;
}
interface Mentordata {
  id: number;
  no: number;
  mentorName: string;
  empId: string;
  emailId: string;
  skills: string;
}
interface EmployeeData {
  id: number;
  no: number;
  empId: string;
  empName: string;
  yop: string;
  percentage: string;
  experiance: string;
  contact: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  batchfilter: any;
  mentorfilter: any;
  requestfilter: any;
  addBatchValue: any;
  isBatch: boolean = false;
  isMentor: boolean = false;
  isRequest: boolean = false;
  batchArr: any[] = [];
  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  group = '../../assets/images/group (1).png';
  team = '../../assets/images/team (4).png';
  user = '../../assets/images/add-user (2).png';
  editedData: any;
  mentorDetail: any;
  allEmployees: any;
  mentorDataToEdit: any;
  EmployeeData: any;
  EmployeePendingData: any[] = [];
  constructor(private apiserv: ApiServiceService, private route: Router) {}

  ngOnInit(): void {
    this.getallEmployees();
  }
  enableDisableGroup() {
    this.getallBatch();
    this.isBatch = !this.isBatch;
    this.isMentor = false;
    this.isRequest = false;
    (this.toggle2 = true),
      (this.team = this.toggle2
        ? '../../assets/images/team (4).png'
        : '../../assets/images/team (3).png');
    this.toggle3 = true;
    this.user = this.toggle3
      ? '../../assets/images/add-user (2).png'
      : '../../assets/images/add-user.png';
    this.toggle1 = !this.toggle1;
    this.group = this.toggle1
      ? '../../assets/images/group (1).png'
      : '../../assets/images/group (2).png';
  }
  enableDisableTeam() {
    this.getallMentors();
    (this.isBatch = false),
      (this.isMentor = !this.isMentor),
      (this.isRequest = false),
      (this.toggle1 = true),
      (this.group = this.toggle1
        ? '../../assets/images/group (1).png'
        : '../../assets/images/group (2).png');
    this.toggle3 = true;
    this.user = this.toggle3
      ? '../../assets/images/add-user (2).png'
      : '../../assets/images/add-user.png';
    this.toggle2 = !this.toggle2;
    this.team = this.toggle2
      ? '../../assets/images/team (4).png'
      : '../../assets/images/team (3).png';
  }
  enableDisableUser() {
    (this.isBatch = false),
      (this.isMentor = false),
      (this.isRequest = !this.isRequest),
      (this.toggle1 = true),
      (this.group = this.toggle1
        ? '../../assets/images/group (1).png'
        : '../../assets/images/group (2).png');
    this.toggle2 = true;
    this.team = this.toggle2
      ? '../../assets/images/team (4).png'
      : '../../assets/images/team (3).png';
    this.toggle3 = !this.toggle3;
    this.user = this.toggle3
      ? '../../assets/images/add-user (2).png'
      : '../../assets/images/add-user.png';
  }
  isVisible = false;
  isOkLoading = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
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
  listOfBatchData: readonly Batchdata[] = [];
  listOfBatch: readonly Batchdata[] = [];
  listOfMentorData: readonly Mentordata[] = [];
  listOfMentor: readonly Mentordata[] = [];
  listOfEmpData: readonly EmployeeData[] = [];
  listOfEmp: readonly EmployeeData[] = [];
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
    if (this.isBatch === true) {
      this.listOfBatchData.forEach((item) =>
        this.updateCheckedSet(item.id, value)
      );
      this.refreshCheckedStatus();
    }
    if (this.isMentor === true) {
      this.listOfMentorData.forEach((item) =>
        this.updateCheckedSet(item.id, value)
      );
      this.refreshCheckedStatus();
    }
    if (this.isRequest === true) {
      this.listOfEmpData.forEach((item) =>
        this.updateCheckedSet(item.id, value)
      );
      this.refreshCheckedStatus();
    }
  }

  onChangeinBatchTable($event: readonly Batchdata[]): void {
    this.listOfBatchData = $event;
    this.refreshCheckedStatus();
  }
  onChangeinMentorTable($event: readonly Mentordata[]): void {
    this.listOfMentorData = $event;
    this.refreshCheckedStatus();
  }
  onChangeinRequestTable($event: readonly EmployeeData[]): void {
    this.listOfEmpData = $event;
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
  // Form to add new batch
  addBatchForm = new FormGroup({
    batchName: new FormControl('', [Validators.required]),
    mentorName: new FormControl('', [Validators.required]),
    batchId: new FormControl('', [Validators.required]),
    empId: new FormControl('', [Validators.required]),
    technologies: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  getallBatch() {
    this.apiserv.getAllBatches().subscribe((res) => {
      console.log(res);
      this.listOfBatch = res.data;
    });
  }
  addBatch() {
    // console.log(this.addBatchForm.value);
    this.addBatchValue = this.addBatchForm.value;
    console.log(this.addBatchValue);
    // this.batchArr.push(this.addBatchValue)
    this.apiserv.registerBatch(this.addBatchValue).subscribe((res) => {
      console.log(res);
      this.getallBatch();
    });
  }

  // editing the batch
  editBatch(form: NgForm) {
    // console.log(form.value);
    this.editedData = form.value;
    console.log(this.editedData);
    this.apiserv.editBatch(this.editedData).subscribe((res) => {
      console.log(res);
    });
  }
  callfunc() {
    this.getallBatch();
  }

  //Delete Batch
  deleteBatch(id: any) {
    console.log(id);
    this.apiserv.deleteBatch(id).subscribe((res) => {
      console.log(res);
      this.getallBatch();
    });
  }

  //Get All Mentors
  getallMentors() {
    this.apiserv.getAllMentors().subscribe((res) => {
      console.log(res);
      this.listOfMentor = res.data;
    });
  }

  //Form to add new mentor
  addMentor(form: NgForm) {
    // console.log(form.value);
    this.mentorDetail = form.value;
    console.log(this.mentorDetail);
    this.apiserv.addMentor(this.mentorDetail).subscribe((res) => {
      console.log(res);
      this.getallMentors();
    });
  }

  //OnClick of Mentor Edit
  onMentorEdit(data: any) {
    console.log(data);
    this.mentorDataToEdit = data;
  }

  //editing the mentor
  editMentor(form: NgForm) {
    console.log(form.value);
    // this.adminService.editMentorDetail(form.value).subscribe((res)=>{
    //   console.log(res);
    // })
  }

  //delete Mentor

  deleteMentor(id: any) {
    console.log(id);
    this.apiserv.mentorDelete(id).subscribe((res) => {
      console.log(res);
      this.getallMentors();
    });
  }

  //getAllEmployees
  getallEmployees() {
    this.apiserv.getallEmployees().subscribe((res) => {
      console.log(res.data);
      this.EmployeeData = res.data;
      for (let i = 0; i < this.EmployeeData.length; i++) {
        //  console.log(this.EmployeeData[i].approveStatus);
        if (this.EmployeeData[i].approveStatus === 'pending') {
          console.log(this.EmployeeData[i]);
          this.EmployeePendingData.push(this.EmployeeData[i]);
          console.log(this.EmployeePendingData);
          this.listOfEmp = this.EmployeePendingData;
        }
      }
    });
  }

  //approve employee
  approveEmp(form: NgForm) {
    console.log(form.value);
    this.apiserv.approveEmp(form.value).subscribe((res) => {
      console.log(res);
    });
  }

  onReject(id: any) {
    console.log(id);
    localStorage.setItem('empToReject', id);
  }
  //Reject employee
  rejectEmp(form: NgForm) {
    // console.log(form.value);
    const formData = form.value;
    const empId = localStorage.getItem('empToReject');
    // console.log(empId);
    formData.empId = empId;
    console.log(formData);
    this.apiserv.rejectEmp(formData).subscribe((res) => {
      console.log(res);
    });
  }

  logout() {
    alert('Are you sure you want Logout');
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
