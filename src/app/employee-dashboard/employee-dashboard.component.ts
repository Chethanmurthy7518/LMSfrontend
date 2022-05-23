import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiServiceService } from '../api-service.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  toggle1=true;
  dashboard = '../../assets/images/dashboard (3).png';
  isDashboard=true;
  isProfile=false;
  resetPasswordValues: any;
  employeeId: any;
  empName:any;
  empData:any;
  empEditValue:any;
  isPasswordChanged:any
  educationDetails = [{ educationType: '', yop: '', percentage: '', universityName: '', instituteName: '', specialization: '', state: '' }];
  addressDetails = [{ addressType: '', drNo: '', street: '', locality: '', city: '', state: '', pinCode: '', landmark: '' }];
  contact = [{ contactType: '', contactNo: '' }];
  experiance = [{ doj: '', yoe: '', companyName: '', designation: '' }];
  constructor(private api:ApiServiceService, private route:Router,private authserve: AuthServiceService,) { }

  ngOnInit(): void {
    const userDetails = this.authserve.getUserDetails();
    this.employeeId = userDetails.empId;
    this.empName = userDetails.empName
    this.isPasswordChanged = userDetails.passwordChanged;
    console.log(this.isPasswordChanged);
    this.getEmployee(this.employeeId)
  }
  enableDisableDashboard() {
    this.isDashboard=true;
    this.isProfile=false
   
    this.toggle1 = !this.toggle1;
    this.dashboard = this.toggle1
      ? '../../assets/images/dashboard (3).png'
      : '../../assets/images/dashboard (2).png';
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

  logout(){
    confirm('Are you sure You want to logout')
    localStorage.clear()
    this.route.navigate(['/login']);
  }
  profile(){
    this.isDashboard=false,
    this.isProfile=true
  }
  getEmployee(id:any){
    this.api.getEmployeeById(id).subscribe((res)=>{
      console.log(res);
      this.empData=res.data
      console.log(this.empData.doj);
      
    },
    )
  }
  empEdit(data:NgForm){
    console.log(data.value);
    this.empEditValue = data.value
     // creating the education detail array
     this.educationDetails[0].educationType = this.empEditValue.educationType;
     this.educationDetails[0].yop = this.empEditValue.yop;
     this.educationDetails[0].percentage = this.empEditValue.percentage;
     this.educationDetails[0].universityName = this.empEditValue.universityName;
     this.educationDetails[0].instituteName = this.empEditValue.instituteName;
     this.educationDetails[0].specialization = this.empEditValue.specialization;
     this.educationDetails[0].state = this.empEditValue.state;
     this.empEditValue.educationDetails = this.educationDetails;

     // creating the address deatil array
    this.addressDetails[0].addressType = this.empEditValue.addressType;
    this.addressDetails[0].drNo = this.empEditValue.drNo;
    this.addressDetails[0].street = this.empEditValue.street;
    this.addressDetails[0].locality = this.empEditValue.locality;
    this.addressDetails[0].city = this.empEditValue.city;
    this.addressDetails[0].state = this.empEditValue.state;
    this.addressDetails[0].pinCode = this.empEditValue.pinCode;
    this.addressDetails[0].landmark = this.empEditValue.landmark;
    this.empEditValue.addressDetails = this.addressDetails;

    // creating experience deatil array
    this.experiance[0].doj = this.empEditValue.doj;
    this.experiance[0].yoe = this.empEditValue.yoe;
    this.experiance[0].companyName = this.empEditValue.companyName;
    this.experiance[0].designation = this.empEditValue.designation;
    this.empEditValue.experiance = this.experiance;

    // creating contact detail array
    this.contact[0].contactType = this.empEditValue.contactType;
    this.contact[0].contactNo = this.empEditValue.contactNo;
    this.empEditValue.contact = this.contact;

    console.log(this.empEditValue);

    this.api.editEmployeeDetails(this.empEditValue).subscribe((res)=>{
      console.log(res);
      
    })
  }
}
