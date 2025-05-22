import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from '../../../environments/environment';

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
export class ImageUploadComponent implements ControlValueAccessor, OnChanges {
  @Input() defaultImage = 'https://cms-testing.myclnq.com/web/media/avatars/male.png';
  @Input() currentImage: string | null = null;
  @Input() imageId = 'imageUploadFile';

  @Output() imageSelected = new EventEmitter<string>(); // Emits base64 string

  apiUrl = environment.apiUrl;

  file: any= null;

  previewUrl: string | ArrayBuffer | null = this.defaultImage;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentImage']) {
      if (this.currentImage) {
        this.previewUrl = `${this.apiUrl}${this.currentImage}`;
      } else {
        this.previewUrl = this.defaultImage;
      }
    }
  }

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
