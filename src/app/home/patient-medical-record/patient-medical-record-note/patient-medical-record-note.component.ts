import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';
import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../services/form.service';
import { PatientMedicalRecordHistory } from '../patient-medical-record-history/patient-medical-record-history.model';


@Component({
  selector: 'app-patient-medical-record-note',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    CKEditorModule,
    CommonModule,
  ],
  templateUrl: './patient-medical-record-note.component.html',
  styleUrl: './patient-medical-record-note.component.scss'
})
export class PatientMedicalRecordNoteComponent implements OnInit {
  Editor: typeof ClassicEditor | null = null;
  config: EditorConfig | null = null;

  readonly url = 'patient-medical-record/notes';
  noteForm! : FormGroup;
  isSubmitted = false;
  id = 0;

  @Input() medicalRecordId = 0;
  @Output() reloadHistory = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder, 
    private formService : FormService,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      patient_medical_record_id : [0, Validators.required],
      notes: [''],
      diagnosis: [''],
    });

    this.noteForm.controls['patient_medical_record_id'].setValue(this.medicalRecordId);

    loadCKEditorCloud( {
      version: '45.1.0',
      premium: false
    }).then( this._setupEditor.bind( this ) );
  }

  submit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id, value).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.clearData();
        this.reloadHistory.emit(true);
      },
      error: (error) => {
        this.toastr.error(error.error);
      }
    })
  }

  editNote(history : PatientMedicalRecordHistory) {
    const formattedData = {
      patient_medical_record_id : history.patient_medical_record_id,
      notes: history.note_data.notes,
      diagnosis: history.note_data.diagnosis
    }
    this.noteForm.patchValue(formattedData);
    this.id = history.id;
  }

  clearData() {
    this.noteForm.reset();
    this.id = 0;
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
}
