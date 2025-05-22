import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';
import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ClinicDocumentSetting } from './clinic-document-setting.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-clinic-document-setting',
  imports: [
    FormsModule,
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './clinic-document-setting.component.html',
  styleUrl: './clinic-document-setting.component.scss'
})
export class ClinicDocumentSettingComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder, 
  ) {}

  Editor: typeof ClassicEditor | null = null;
  config: EditorConfig | null = null;

  data! : ClinicDocumentSetting;
  documentForm! : FormGroup;

  ngOnInit(): void {
    loadCKEditorCloud( {
      version: '45.1.0',
      premium: false
    }).then( this._setupEditor.bind( this ) );

    this.getData();

    this.documentForm = this.fb.group({
      header: [''],
      transaction_receipt_template: [''],
      medical_certificate_template: [''],
      transaction_invoice_template: ['']
    });
  }

  private _setupEditor ( cloud: CKEditorCloudResult<{ version: '45.1.0', premium: true }> ) {
    const {
      ClassicEditor,
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
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
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Paragraph,
          SelectAll,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
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
          'link',
          'insertImage',
          'insertTable',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
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
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        simpleUpload: {
          uploadUrl: `${environment.apiUrl}/clinic-document-setting/upload-image`,
        }
    };
  }

  getData() {
    const user = this.authService.getUser();
    this.apiService.get(`clinic-document-setting/${user.clinic_id}`).subscribe((res :any) => {
      this.data = res['data'];
      this.documentForm.patchValue(this.data);
    });
  }

  submit(value : any, valid : boolean) {
    if (!valid) {
      return;
    }

    const user = this.authService.getUser();
    this.apiService.post(`clinic-document-setting/${user.clinic_id}`, value).subscribe((res :any) => {
      this.data = res['data'];
      this.documentForm.patchValue(this.data);
      this.scrollToTop();
    });
  }

  cancel() {
    this.documentForm.patchValue(this.data);
    this.scrollToTop()
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
