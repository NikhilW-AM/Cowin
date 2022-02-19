import { Component, OnInit } from '@angular/core';
import { FetchcowindataService } from '../fetchcowindata.service';

@Component({
  selector: 'app-vaccination-center-finder',
  templateUrl: './vaccination-center-finder.component.html',
  styleUrls: ['./vaccination-center-finder.component.css']
})
export class VaccinationCenterFinderComponent implements OnInit {

  pin?:string | undefined
  page:number | string = 1
  dataCount : number | string = 3
  myDate:Date = new Date()
  stateId?:number
  districtId?:any
  statesArray?:any = []
  districtArray?:any = []
  allDataByDistrictId?:any = []
  districtData :any[] = []
  dateArray:any[] =[]
  changeField = true
  data1:any=[]
  data2:any=[]
  data3:any=[]

  toggleClass: boolean = false;
  constructor( private _fetch:FetchcowindataService) { }
  
  ngOnInit(): void {    
    this.getStates()
    this.getDate()
  }

  getDate()
  {
    this.dateArray = []
    this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate())))
    for(let i=0; i<2; i++)
    {
      this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate()+1)))
    }
    console.log(this.dateArray);
  }
  changeTab(bool:boolean)
  { 
    this.changeField = bool
  }

  getStates()
  {
    this._fetch.getStateData().subscribe((data) => {
      this.statesArray = data
      //console.log(this.statesArray);
    })
  }

  getStateId(val:any)
  {
    this.stateId = val.target.value
    this._fetch.getDistrictData(this.stateId).subscribe((data) =>{
      this.districtArray = data      
    })

    this.myDate = new Date()
    this.dateArray = []
    this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate())))
    this.getDate()
  }

  getDistrictId(val:any)
  {
    this.districtId = val.target.value
    //console.log(this.districtId);
    this.myDate = new Date()
    this.getDate()
  }

  getAllData()
  {
      this._fetch.slotUsingDistrictId(this.districtId,this.myDate).subscribe((data) =>{
        this.allDataByDistrictId = data,
        this.districtData = this.allDataByDistrictId.sessions   
        console.log(this.districtData);
             
        this.dataCount  = this.districtData.length 
      })
      this.allArrayByDistrictId()
  } 
  allArrayByDistrictId()
  {
      this._fetch.slotUsingDistrictId(this.districtId,this.dateArray[0]).subscribe( (data)=>{this.data1 = data})
      
      this._fetch.slotUsingDistrictId(this.districtId,this.dateArray[1]).subscribe( (data)=>{this.data2 = data})
      
      this._fetch.slotUsingDistrictId(this.districtId,this.dateArray[2]).subscribe( (data)=>{this.data3 = data})     
  }
  nextDate()
  {
    this.dateArray = []
    this.dateArray.push(new Date(this.myDate.setDate(this.myDate.getDate()+1)))
    this.getDate()
    if(this.dateArray && this.districtId)
    {
      this.getAllData()
    }
    if(this.dateArray && this.pin)
    {
      this.getPin(this.pin)
    }
  }
  previousDate()
  {
    this.dateArray = []
    let date = new Date()
    this.myDate = new Date(this.myDate.setDate(this.myDate.getDate()-5))
    console.log(this.myDate);
    
    if(this.myDate.getTime()<date.getTime())
    {
      this.myDate = new Date()
      this.getDate()
    }
    else
    {
      this.getDate()
    }
    if(this.dateArray && this.districtId)
    {
      this.getAllData()
    }
    if(this.dateArray && this.pin)
    {
      this.getPin(this.pin)
    } 
  }

  getPin(value:string)
  {
    this.pin = value  
    this._fetch.slotUsingPin(this.pin,this.myDate).subscribe((data) =>{
      this.allDataByDistrictId = data,
      this.districtData = this.allDataByDistrictId.sessions
      this.dataCount  = this.districtData.length 
    })  
    this._fetch.slotUsingPin(this.pin,this.dateArray[0]).subscribe( (data)=>{this.data1 = data})
      
      this._fetch.slotUsingPin(this.pin,this.dateArray[1]).subscribe( (data)=>{this.data2 = data})
      
      this._fetch.slotUsingPin(this.pin,this.dateArray[2]).subscribe( (data)=>{this.data3 = data}) 
  }

  
}
