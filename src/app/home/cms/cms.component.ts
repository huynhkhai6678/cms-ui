import { Component, OnInit } from '@angular/core';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';
import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { Cms } from './cms.model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cms',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule,
    TranslatePipe,
    ImageUploadComponent
  ],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export class CmsComponent implements OnInit {
  aboutImage1 = '';
  aboutImage2 = '';
  aboutImage3 = '';
  data! : Cms;

  Editor: typeof ClassicEditor | null = null;
  config: EditorConfig | null = null;

  cmsForm! : FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private authService: AuthService,
    public homeService : HomeService,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.cmsForm = this.fb.group({
      about_image_1: ['', [Validators.required]],
      about_image_2: ['', [Validators.required]],
      about_image_3: [true, [Validators.required]],
      about_title: ['', [Validators.required]],
      about_experience: ['', [Validators.required]],
      about_short_description : ['', [Validators.required, Validators.max(800)]],
      terms_conditions: ['', [Validators.required]],
      privacy_policy: ['', [Validators.required]]
    });

    this.getData();

    loadCKEditorCloud( {
      version: '45.1.0',
      premium: false
    }).then( this._setupEditor.bind( this ) );
  }

  private _setupEditor ( cloud: CKEditorCloudResult<{ version: '45.1.0', premium: true }> ) {
      const {
        ClassicEditor,
        AccessibilityHelp,
        Autoformat,
        AutoImage,
        Autosave,
        Base64UploadAdapter,
        Bold,
        Essentials,
        Heading,
        Indent,
        IndentBlock,
        Italic,
        Paragraph,
        SelectAll,
        TextTransformation,
        TodoList,
        Underline,
        SimpleUploadAdapter,
        SourceEditing,
        GeneralHtmlSupport,
        Undo
      } = cloud.CKEditor;
  
      this.Editor = ClassicEditor;
      this.config = {
          licenseKey: environment.ckeditorKey,
          plugins: [ 
            AccessibilityHelp,
            Autoformat,
            AutoImage,
            Autosave,
            Base64UploadAdapter,
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Paragraph,
            SelectAll,
            TextTransformation,
            TodoList,
            Underline,
            SimpleUploadAdapter,
            SourceEditing,
            GeneralHtmlSupport,
            Undo
          ],
          htmlSupport: {
              allow: [ 
                  {
                      name: 'div',
                      styles: true
                  },
              ],
              disallow: [ /* HTML features to disallow. */ ]
          },
          toolbar: [ 
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'sourceEditing'
          ],
          heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
          },
          image: {
              toolbar: [
                  'toggleImageCaption',
                  'imageTextAlternative',
                  '|',
                  'imageStyle:inline',
                  'imageStyle:wrapText',
                  'imageStyle:breakText',
                  '|',
                  'resizeImage'
              ]
          },
          list: {
              properties: {
                  styles: true,
                  startIndex: true,
                  reversed: true
              }
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
          },
          simpleUpload: {
            uploadUrl: `${environment.apiUrl}/cms/upload-image`,
          }
      };
  }

  getData() {
    const user = this.authService.getUser();
    this.apiService.get(`cms/${user.clinic_id}`).subscribe((res :any) => {
      this.data = res['data'];
      this.cmsForm.patchValue(this.data);
    });
  }

  submit(value : any, valid : boolean) {
    if (!valid) {
      return;
    }

    const user = this.authService.getUser();
    this.apiService.postFileWithParams(`cms/${user.clinic_id}`, value).subscribe((res :any) => {
      this.toastr.success(res['message']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
