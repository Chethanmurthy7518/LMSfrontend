import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {

  primaryInfoValue:any
  secondaryInfoValue:any
  educationDetailValueArr=[]
   educationDetailValue={"educationDetails":[]}
  // educationDetails={}
  addressDetailValueArr=[]
   addressDetailValue={"addressDetails":[]}
  addressDetails:any=[]
  bankDetailValue:any
   technicalSkillsValue={"technicalSkills":[]}
  technicalSkills:any=[]
  technicalSkillsValueArr=[]
  experienceDetailValue={"experiance":[]}
  experiance:any=[]
  experienceDetailValueArr=[]
  contactsDetailValue={"contact":[]}
  contact:any=[]
  contactsDetailValueArr=[]
  mergedValue:any

   //education Form
   //education Form

  public educationForms:any
    //address Form
    

   //address Form
   public addressForms:any
   //technical Form
   public technicalForms:any
   //experience Form
   public experienceForms:any
   //contact Form
   public contactForms:any

  constructor(private adminService:ApiServiceService, private fb:FormBuilder) { }

  ngOnInit():void {

    //education detail form
    this.educationForms=new FormArray([
      new FormGroup({
        educationType:new FormControl("",[Validators.required]),
        yop:new FormControl("",[Validators.required]),
        percentage:new FormControl("",[Validators.required]),
        universityName:new FormControl("",[Validators.required]),
        instituteName:new FormControl("",[Validators.required]),
        specialization:new FormControl("",[Validators.required]),
        state:new FormControl("",[Validators.required]),
      })
    ])

    //address detail form
    this.addressForms=new FormArray([
      new FormGroup({
        addressType:new FormControl("",[Validators.required]),
        drNo:new FormControl("",[Validators.required]),
        street:new FormControl("",[Validators.required]),
        locality:new FormControl("",[Validators.required]),
        city:new FormControl("",[Validators.required]),
        state:new FormControl("",[Validators.required]),
        pinCode:new FormControl("",[Validators.required]),
        landmark:new FormControl("",[Validators.required]),
      })
    ])

   //technical detail form
   this.technicalForms=new FormArray([
    new FormGroup({
      skill:new FormControl("",[Validators.required]),
      skillRating:new FormControl("",[Validators.required]),
      yoeSkills:new FormControl("",[Validators.required]),
    })
   ])

   //experience detail form
   this.experienceForms=new FormArray([
    new FormGroup({
      companyName:new FormControl("",[Validators.required]),
      eYoe:new FormControl("",[Validators.required]),
      eDoj:new FormControl("",[Validators.required]),
      dor:new FormControl("",[Validators.required]),
      eDesignation:new FormControl("",[Validators.required]),
      eLocation:new FormControl("",[Validators.required]),
      
    })
   ])

  //  contact detail form
  this.contactForms=new FormArray([
    new FormGroup({
      contactType:new FormControl("",[Validators.required]),
      contactNo:new FormControl("",[Validators.required]),
    })
  ])


    
  }
  //adding and deleting education forms
  addEducation(){
    this.educationForms.insert(this.educationForms.length,this.educationDetailForm)
  }
  deleteEducation(){
    this.educationForms.removeAt(this.educationForms.length-1)
  }

  //adding and deleting address forms
  addAddress(){
    this.addressForms.insert(this.addressForms.length,this.addressDetailForm)
  }
  deleteAddress(){
    this.addressForms.removeAt(this.addressForms.length-1)
  }

  //adding and deleteting technical details forms
  addTechnical(){
     this.technicalForms.insert(this.technicalForms.length,this.technicalSkillsForm)
  }
  deleteTechnical(){
     this.technicalForms.removeAt(this.technicalForms.length-1)
  }

  //adding and deleting experience forms
  addExperience(){
    this.experienceForms.insert(this.experienceForms.length,this.experienceForm)
  }
  deleteExperience(){
    this.experienceForms.removeAt(this.experienceForms.length-1)
  }

  //adding and deleting contact forms
  addContact(){
    this.contactForms.insert(this.contactForms.length,this.contactsForm)
  }
  deleteContact(){
    this.contactForms.removeAt(this.contactForms.length-1)
  }

  //Primary Info Form
  primaryInfoForm=new FormGroup({
    empName:new FormControl("",[Validators.required]),
    empId:new FormControl("",[Validators.required]),
    dob:new FormControl("",[Validators.required]),
    doj:new FormControl("",[Validators.required]),
    emailId:new FormControl("",[Validators.required]),
    bloodg:new FormControl("",[Validators.required]),
    designation:new FormControl("",[Validators.required]),
    gender:new FormControl("",[Validators.required]),
    nationality:new FormControl("",[Validators.required]),
    empStatus:new FormControl("",[Validators.required]),

  })
  get empName():any{
    return this.empName.get("empName");
  }
  get empId():any{
    return this.empId.get("empId");
  }
  get dob():any{
    return this.dob.get("dob");
  }
  get doj():any{
    return this.doj.get("doj");
  }
  get emailId():any{
    return this.emailId.get("emailId");
  }
  get bloodg():any{
    return this.bloodg.get("bloodg");
  }
  get designation():any{
    return this.designation.get("designation");
  }
  get gender():any{
    return this.gender.get("gender");
  }
  get nationality():any{
    return this.nationality.get("nationality");
  }
  get empStatus():any{
    return this.empStatus.get("empStatus");
  }

  primaryInfo(){
     console.log(this.primaryInfoForm.value);
     this.primaryInfoValue=this.primaryInfoForm.value
     
  }

  //Secondary Info Form

  secondaryInfoForm=new FormGroup({
    panNo:new FormControl("",[Validators.required]),
    aadharNo:new FormControl("",[Validators.required]),
    fatherName:new FormControl("",[Validators.required]),
    motherName:new FormControl("",[Validators.required]),
    spouseName:new FormControl("",[Validators.required]),
    passportNo:new FormControl("",[Validators.required]),
    maritalStatus:new FormControl("",[Validators.required]),

  })

  get panNo():any{
    return this.panNo.get("panNo");
  }
  get aadharNo():any{
    return this.aadharNo.get("aadharNo");
  }
  get fatherName():any{
    return this.fatherName.get("fatherName");
  }
  get motherName():any{
    return this.fatherName.get("motherName");
  }
  get spouseName():any{
    return this.spouseName.get("spouseName");
  }
  get passportNo():any{
    return this.passportNo.get("passportNo");
  }
  get maritalStatus():any{
    return this.maritalStatus.get("maritalStatus");
  }



  secondaryInfo(){
    console.log(this.secondaryInfoForm.value);
    this.secondaryInfoValue=this.secondaryInfoForm.value
    
  }

  //Education Detail Form


  educationDetailForm=new FormGroup({
    educationType:new FormControl("",[Validators.required]),
    yop:new FormControl("",[Validators.required]),
    percentage:new FormControl("",[Validators.required]),
    universityName:new FormControl("",[Validators.required]),
    instituteName:new FormControl("",[Validators.required]),
    specialization:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),

  })

  get educationType():any{
    return this.educationType.get("educationType");
  }
  get yop():any{
    return this.yop.get("yop");
  }
  get percentage():any{
    return this.percentage.get("percentage");
  }
  get universityName():any{
    return this.universityName.get("universityName");
  }
  get instituteName():any{
    return this.instituteName.get("instituteName");
  }
  get specialization():any{
    return this.specialization.get("specialization");
  }
  get state():any{
    return this.state.get("state");
  }

  educationDetail(){
    console.log(this.educationForms.value);
    this.educationDetailValue.educationDetails=this.educationForms.value
    console.log(this.educationDetailValue);
    

    
    
    
    // this.educationDetailValueArr.push(this.educationDetailForm.value)
    // console.log(this.educationDetailValueArr);
    
    
  }




  //Address Detail Form

  addressDetailForm=new FormGroup({
    addressType:new FormControl("",[Validators.required]),
    drNo:new FormControl("",[Validators.required]),
    street:new FormControl("",[Validators.required]),
    locality:new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),
    pinCode:new FormControl("",[Validators.required]),
    landmark:new FormControl("",[Validators.required]),
  })

  get addressType():any{
    return this.addressType.get("addressType");
  }
  get drNo():any{
    return this.drNo.get("drNo");
  }
  get street():any{
    return this.street.get("street");
  }
  get locality():any{
    return this.locality.get("locality");
  }
  get city():any{
    return this.city.get("city");
  }
  get empState():any{
    return this.empState.get("empState");
  }
  get pinCode():any{
    return this.state.get("pinCode");
  }
  get landmark():any{
    return this.landmark.get("landmark");
  }

  addressDetail(){
    console.log(this.addressForms.value);
    this.addressDetails=this.addressForms.value
    // this.addressDetailValueArr.push(this.addressDetailForm.value)
     this.addressDetailValue.addressDetails= this.addressForms.value
  }

//bank detail form

bankDetailForm=new FormGroup({
  accountNo:new FormControl("",[Validators.required]),
  bankName:new FormControl("",[Validators.required]),
  accountType:new FormControl("",[Validators.required]),
  branch:new FormControl("",[Validators.required]),
  bState:new FormControl("",[Validators.required]),
  ifscCode:new FormControl("",[Validators.required]),
  
})

get accountNo():any{
  return this.accountNo.get("accountNo");
}
get bankName():any{
  return this.bankName.get("bankName");
}
get accountType():any{
  return this.accountType.get("accountType");
}
get ifscCode():any{
  return this.ifscCode.get("ifscCode");
}
get branch():any{
  return this.branch.get("branch");
}
get bState():any{
  return this.bState.get("bState");
}

bankDetail(){
  console.log(this.bankDetailForm.value);
  this.bankDetailValue=this.bankDetailForm.value
  
}


//technical skills
technicalSkillsForm=new FormGroup({
  skill:new FormControl("",[Validators.required]),
  skillRating:new FormControl("",[Validators.required]),
  yoeSkills:new FormControl("",[Validators.required]),

})

get skill():any{
  return this.skill.get("skill");
}
get skillRating():any{
  return this.skillRating.get("skillRating");
}
get yoeSkills():any{
  return this.yoeSkills.get("yoeSkills");
}

getTechnicalSkills(){
  console.log(this.technicalForms.value);
  this.technicalSkills=this.technicalForms.value
  // this.technicalSkillsValueArr.push(this.technicalSkillsForm.value)
   this.technicalSkillsValue.technicalSkills=this.technicalForms.value
  
}


//Experience detail Form

experienceForm=new FormGroup({
  companyName:new FormControl("",[Validators.required]),
  eYoe:new FormControl("",[Validators.required]),
  eDoj:new FormControl("",[Validators.required]),
  dor:new FormControl("",[Validators.required]),
  eDesignation:new FormControl("",[Validators.required]),
  eLocation:new FormControl("",[Validators.required]),
  
})

get companyName():any{
  return this.companyName.get("companyName");
}
get eYoe():any{
  return this.eYoe.get("eYoe");
}
get eDoj():any{
  return this.eDoj.get("eDoj");
}
get dor():any{
  return this.dor.get("dor");
}
get eDesignation():any{
  return this.eDesignation.get("eDesignation");
}
get eLocation():any{
  return this.eLocation.get("eLocation");
}

experienceDetail(){
  console.log(this.experienceForms.value);
  this.experiance=this.experienceForms.value
  // this.experienceDetailValueArr.push(this.experienceForm.value)
  this.experienceDetailValue.experiance=this.experienceForms.value
  
}


//contact detail form

contactsForm=new FormGroup({
  contactType:new FormControl("",[Validators.required]),
  contactNo:new FormControl("",[Validators.required]),
})

get contactType():any{
  return this.contactType.get("contactType");
}
get contactNo():any{
  return this.contactNo.get("contactNo");
}

contactDetail(){
  console.log(this.contactForms.value);
  // this.contact=this.contactForms.value
  // this.contactsDetailValueArr.push(this.contactsForm.value)
  this.contactsDetailValue.contact=this.contactForms.value
  this.mergedValue=Object.assign({},
    this.primaryInfoValue,
    this.secondaryInfoValue,
    this.educationDetailValue,
    this.addressDetailValue,
    this.bankDetailValue,
    this.technicalSkillsValue,
    this.experienceDetailValue,
    this.contactsDetailValue)
    console.log(this.mergedValue);
    this.adminService.registerEmployee(this.mergedValue).subscribe((res)=>{
      console.log(res);
      
    })

}


}
