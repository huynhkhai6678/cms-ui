import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SettingGeneralComponent } from "./setting-general/setting-general.component";
import { SettingContactInformationComponent } from "./setting-contact-information/setting-contact-information.component";

@Component({
  selector: 'app-settings',
  imports: [
    TabsModule,
    TranslatePipe,
    SettingGeneralComponent,
    SettingContactInformationComponent
],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild(SettingGeneralComponent) generalComponent!: SettingGeneralComponent;
  @ViewChild(SettingContactInformationComponent) contactComponent!: SettingContactInformationComponent;

  ngAfterViewInit(): void {
    this.generalComponent.loadData();
  }
}
