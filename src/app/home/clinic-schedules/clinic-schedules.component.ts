import { Component, OnInit, ViewChild } from '@angular/core';
import { generateTimeSlots, TimeSlot } from '../../utils/time-slots.util';
import { Select2 } from 'ng-select2-component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ClinicSchedule } from './clinic-schedule.model';
import { FormService } from '../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-clinic-schedules',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select2
  ],
  templateUrl: './clinic-schedules.component.html',
  styleUrl: './clinic-schedules.component.scss'
})
export class ClinicSchedulesComponent implements OnInit {
  url = 'clinic-schedules';
  clinicId = 0;
  timeSlots: TimeSlot[];
  scheduleForm!: FormGroup;

  daysOfWeek = [
    {day_of_week: "1", name : 'MON', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true},
    {day_of_week: "2", name : 'TUE', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true},
    {day_of_week: "3", name : 'WED', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true},
    {day_of_week: "4", name : 'THU', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true},
    {day_of_week: "5", name : 'FRI', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true},
    {day_of_week: "6", name : 'SAT', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true},
    {day_of_week: "0", name : 'SUN', start_time: '12:00 AM' , end_time : '10:30 PM', checked : true}, 
  ];

  @ViewChild('submitButton', { static: false }) submitButton: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private formService: FormService,
    private authService: AuthService,
    public homeService: HomeService,
    private toastr : ToastrService,
    private spinnerService: NgxSpinnerService 
  ) {
    this.timeSlots = generateTimeSlots('00:00', '24:00', 15);
    this.clinicId = this.authService.getUser().clinic_id;
  }

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      schedule: this.fb.array([]),
    });

    this.loadData();
  }

  loadData() {
    this.spinnerService.show();
    const scheduleFormArray = this.scheduleForm.get('schedule') as FormArray;
    scheduleFormArray.clear();

    this.apiService.get(`${this.url}/${this.clinicId}`).subscribe((res : any) => {
      const schedules = res['data'];

      this.daysOfWeek.forEach((entry) => {
        const backendData = schedules.filter((sche : ClinicSchedule) => { return sche.day_of_week == entry.day_of_week});
        if (backendData.length > 0) {
          entry = backendData[0];
          entry.checked = true;
        } else {
          entry.checked = false;
        }

        scheduleFormArray.push(
          this.fb.group({
            day_of_week: [entry.day_of_week],
            checked: [entry.checked],
            start_time: [entry.start_time],
            end_time: [entry.end_time],
          })
        );
        
        this.spinnerService.hide();
      });
    });
  }

  get schedule() {
    return (this.scheduleForm.get('schedule') as FormArray).controls;
  }

  submit(value : any) {
    this.submitButton.nativeElement.blur();

    this.apiService.post(`${this.url}/check-record/${this.clinicId}`, value).subscribe({
      next : (res : any) => {
        if (res['success']) {
          this.apiService.post(`${this.url}/${this.clinicId}`, value).subscribe((res : any) => {
            this.toastr.success(res['message']);
          });
        }
      },
      error : () => {
        this.formService.showConfirmModal('messages.flash.some_doctors').subscribe(confirmed => {
          if (confirmed) {
            this.apiService.post(`${this.url}/${this.clinicId}`, value).subscribe((res : any) => {
              this.toastr.success(res['message']);
            });
          }
        })
      }
    });
  }

}
