import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  imports: [
    CommonModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor {
  @Input() defaultImage: string = 'https://cms-testing.myclnq.com/web/media/avatars/male.png';
  @Input() currentImage: string | null = null;
  @Input() imageId: string = 'imageUploadFile';

  @Output() imageSelected = new EventEmitter<string>(); // Emits base64 string

  file: any= null;
  previewUrl: string | ArrayBuffer | null = this.defaultImage;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: File | null): void {
    this.file = obj;
    if (!obj) {
      this.previewUrl = this.defaultImage;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.onChange(this.file); // pass file back to form control
      this.onTouched();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
