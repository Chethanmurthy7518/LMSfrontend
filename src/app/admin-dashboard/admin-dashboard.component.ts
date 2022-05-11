import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, NgForm } from '@angular/forms';
import { Router } from 'express';

interface Batchdata {
  id: number;
  no: number;
  batchId: string;
  batchName: string;
  mentorName: string;
  technologies: string;
  startDate: string;
  endDate: string;
  status: string;
}
interface Mentordata{
  id:number;
  no:number;
  mentorName:string;
  empId:string;
  emailId:string;
  skills:string;


}
interface EmployeeData{
  id:number;
  no:number;
  empId:string;
  empName:string;
  yop:string;
  percentage:string;
  experiance:string;
  contact:string
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  batchfilter:any;
  mentorfilter:any;
  requestfilter:any;
  addBatchValue: any;
  isBatch:boolean=false
  isMentor:boolean=false
  isRequest:boolean=false
  batchArr: any[] = [];
  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  group = '../../assets/images/group (1).png';
  team = '../../assets/images/team (4).png';
  user = '../../assets/images/add-user (2).png';
  editedData: any;
  mentorDetail: any;
  allEmployees:any;
  constructor() { }

  ngOnInit(): void {
    this.listOfBatch = new Array(10).fill(0).map((_, index) => ({
      id: index,
      no: index,
      batchId: 'B21',
      batchName: 'Angular',
      mentorName: 'Chethan',
      technologies: 'Angular',
      startDate: '12/12/1',
      endDate: '12/12/1',
      status: 'To be Started',
    }));
    this.listOfMentor = new Array(10).fill(0).map((_, index) => ({
      id: index,
      no: index,
      mentorName:"Chethan",
      empId:"TYC0921168",
      emailId:"chethan670@gmail.com",
      skills:"Angular"
    }));

    this.listOfEmp = new Array(10).fill(0).map((_, index) => ({
      id: index,
      no: index,
      empName:"Employee",
      empId:"TYC00092344",
      yop:'14/01/2017',
      percentage:"62%",
      experiance:"Fresher",
      contact:"9900765445"
    }));
  }
  enableDisableGroup() {
    this.isBatch=!this.isBatch;
    this.isMentor=false;
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
    this.isBatch=false,
    this.isMentor=!this.isMentor,
    this.isRequest=false,
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
    this.isBatch=false,
    this.isMentor=false,
    this.isRequest=!this.isRequest,
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
  listOfMentorData:readonly Mentordata[]=[];
  listOfMentor:readonly Mentordata[]=[];
  listOfEmpData:readonly EmployeeData[]=[];
  listOfEmp:readonly EmployeeData[]=[];
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
    if(this.isBatch === true){
      this.listOfBatchData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
    }
    if(this.isMentor === true){
       this.listOfMentorData.forEach((item)=>
       this.updateCheckedSet(item.id,value));
       this.refreshCheckedStatus();
    }
    if(this.isRequest === true){
      this.listOfEmpData.forEach((item)=>
      this.updateCheckedSet(item.id,value));
      this.refreshCheckedStatus()
    }
  }

  onChangeinBatchTable($event: readonly Batchdata[]): void {
    this.listOfBatchData = $event;
    this.refreshCheckedStatus();
  }
  onChangeinMentorTable($event: readonly Mentordata[]):void{
    this.listOfMentorData = $event;
    this.refreshCheckedStatus();
  }
  onChangeinRequestTable($event: readonly EmployeeData[]):void{
    this.listOfEmpData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfBatchData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfBatchData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
  // Form to add new batch
  addBatchForm=new FormGroup({
    batchName:new FormControl("",[Validators.required]),
    mentorName:new FormControl("",[Validators.required]),
    batchId:new FormControl("",[Validators.required]),
    empId:new FormControl("",[Validators.required]),
    technologies:new FormControl("",[Validators.required]),
    startDate:new FormControl("",[Validators.required]),
    endDate:new FormControl("",[Validators.required]),
    status:new FormControl("",[Validators.required]),
  })
  addBatch(){
    console.log(this.addBatchForm.value); 
    this.addBatchValue=this.addBatchForm.value
    console.log(this.addBatchValue);
    // this.batchArr.push(this.addBatchValue)
    // this.adminService.addBatchDetail(this.addBatchValue).subscribe((res)=>{
    //     console.log(res);
        
    // })
    
  }

 // editing the batch
 editBatch(form:NgForm){
  console.log(form.value);
  this.editedData=form.value
  console.log(this.editedData);
  
  // this.adminService.editBatchDetail(this.editedData).subscribe((res)=>
  // {
  //   console.log(res);
  // })
}

//Form to add new mentor
addMentor(form:NgForm){
  console.log(form.value);
  this.mentorDetail=form.value
  console.log(this.mentorDetail);
  
  // this.adminService.addMentorDetail(this.mentorDetail).subscribe((res)=>{
  //   console.log(res);
    
  // })
}

//editing the mentor
editMentor(form:NgForm){
  console.log(form.value);
  // this.adminService.editMentorDetail(form.value).subscribe((res)=>{
  //   console.log(res); 
  // })  
}

//approve employee
approveEmp(form:NgForm){
  console.log(form.value);
  // this.adminService.employeeApproval(form.value).subscribe((res)=>{
  //   console.log(res);
  //    })  
}


}
