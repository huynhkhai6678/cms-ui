import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../../../services/form.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Permission } from '../permission.model';
import { Role } from '../role.model';

@Component({
  selector: 'app-role-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss'
})
export class RoleModalComponent implements OnInit {
  url = 'roles';
  title = '';
  id = 0;
  leftList = [];
  rightList = [];

  roleForm! : FormGroup;
  isSubmitted = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private formService : FormService
  ) {}

  ngOnInit(): void {

    this.roleForm = this.fb.group({
      display_name: ['', [Validators.required]],
      permission_ids: [[], [Validators.required]],
    });

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      this.leftList = response['left_list'];
      this.rightList = response['right_list'];

      if (response['data']) {
        const role : Role = response['data'];
        const permissionArray = response['data']['permissions'].map((permission : Permission) => { return permission.id });

        this.roleForm.controls['display_name'].setValue(role.display_name);
        this.roleForm.controls['permission_ids'].setValue(permissionArray);
      }
    });
  }

  checkAll(event : Event) {
    const input = event.target as HTMLInputElement;
    let permissionArray : number[] = [];
    if (input.checked) { 
      this.leftList.forEach((permission) => { permissionArray.push(permission['id']) });
      this.rightList.forEach((permission) => { permissionArray.push(permission['id']) })
    } else {
      permissionArray = [];
    }

    this.roleForm.controls['permission_ids'].setValue(permissionArray);
  }

  onPermissionChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const permissionId = Number(input.value);
    const permissionArray: number[] = this.roleForm.value.permission_ids;
  
    if (input.checked) {
      if (!permissionArray.includes(permissionId)) {
        permissionArray.push(permissionId);
      }
    } else {
      const index = permissionArray.indexOf(permissionId);
      if (index >= 0) {
        permissionArray.splice(index, 1);
      }
    }
  
    this.roleForm.controls['permission_ids'].setValue(permissionArray);
  }

  submit(value : any, valid : boolean) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.bsModalRef.hide();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
