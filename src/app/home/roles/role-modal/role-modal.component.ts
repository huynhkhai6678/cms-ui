import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Permission } from '../permission.model';
import { Role } from '../role.model';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-role-modal',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss'
})
export class RoleModalComponent extends BaseComponent implements OnInit {
  override url = 'roles';
  readonly fb = inject(FormBuilder);

  leftList =  signal<Permission[]>([]);
  rightList = signal<Permission[]>([]);
  roleForm! : FormGroup;

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      display_name: ['', [Validators.required]],
      permission_ids: [[], [Validators.required]],
    });

    this.formService.getInitData(`${this.url}/${this.id}`).subscribe((response : any) => {
      this.leftList.set(response['left_list']);
      this.rightList.set(response['right_list']);

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
      this.leftList().forEach((permission) => { permissionArray.push(permission['id']) });
      this.rightList().forEach((permission) => { permissionArray.push(permission['id']) })
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
}
