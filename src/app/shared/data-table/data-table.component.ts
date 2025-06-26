import { Component, computed, EventEmitter, Input, Output, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, map, switchMap, tap } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HomeService } from '../../home/home.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import moment from 'moment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-data-table',
  imports: [
    BsDatepickerModule,
    CommonModule,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() url = '';
  @Input() headers = [];
  @Input() actionTemplate!: TemplateRef<any>;
  @Input() searchTemplate!: TemplateRef<any>;
  @Input() filterTemplate!: TemplateRef<any>;
  @Input() addTemplate!: TemplateRef<any>;
  @Input() columnCustomTemplates! : Record<string, any>;
  @Input() showClinicFilterTemplate = true;
  @Input() showSearchTemplate = true;
  @Input() defaultTrackingColumn = 'id';
  @Input() showFilterDateRange = false;
  @Input() showPagination = true;

  @Output() dateRangeChange = new EventEmitter<Date[]>();
  @Output() clinicChange = new EventEmitter<number>();

  refreshKey = signal<number>(0);
  sortColumnName = signal<string>('');
  sortColumnOrder = signal<string>('');
  itemPerPage = signal<number>(10);
  totalPages = signal<number>(0);
  page = signal<number>(1);
  searchString = signal<string>('');
  clinicId = signal<number>(0);
  filterOptions = signal<any>({});
  dateRange = signal<Date[]>([]);

  sortData = computed(() => ({
    column : this.sortColumnName(),
    order : this.sortColumnOrder(),
    page: this.page(),
    itemPerPage : this.itemPerPage(),
    searchString: this.searchString(),
    refreshKey : this.refreshKey(),
    clinicId : this.clinicId(),
    dateRange : this.dateRange(),
    filterOptions : this.filterOptions()
  }));

  totalItemInPage = computed(() => { return this.data()?.length ?? 0});
  totalItem = signal(0);

  data = toSignal(
    toObservable(this.sortData).pipe(
      debounceTime(500),
      switchMap((params) => this.getData(params))
    )
  );

  itemPerPages = signal<number[]>([10, 25, 50]);
  pages = signal<number[]>([]);
  
  ranges: IRange[] = [
    {
      value: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()],
      name: 'all',
      label: 'js.all'
    },
    {
      value: [new Date(), new Date()],
      name: 'today',
      label: 'js.today'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date().setDate(new Date().getDate() - 1))],
      name: 'yesterday',
      label: 'js.yesterday'
    },
    {
      value: [
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6)),
      ],
      name: 'this_week',
      label: 'js.this_week'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 29)), new Date()],
      name: 'last_30_days',
      label: 'js.last_30_days'
    },
    {
      value: [
        new Date(new Date().setDate(1)), // Start of this month
        new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)),
      ],
      name: 'this_month',
      label: 'js.this_month'
    },
    {
      value: [
        new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)),
        new Date(new Date(new Date().setMonth(new Date().getMonth())).setDate(0))
      ],
      name: 'last_month',
      label: 'js.last_month'
    }
  ];

  constructor(
    public apiService: ApiService,
    private authService: AuthService,
    public homeService: HomeService,
    private translateService: TranslateService
  ) {
    this.clinicId.set(this.authService.getUser().clinic_id);

    this.translateService.get(['js.last_month', 'js.this_month', 'js.last_30_days', 'js.this_week', 'js.all', 'js.today', 'js.yesterday']).subscribe(translation => {
      this.ranges.forEach(range => {
        range.label = translation[range.label];
      })
    });
  }

  setOrder(column: 'string', sortable = false) {
    if (!sortable) {
      return;
    }

    if (this.sortColumnName() != column) {
      this.sortColumnName.set(column);
      this.sortColumnOrder.set('asc');
    } else {
      const value = this.sortColumnOrder() == 'asc' ? 'desc' : 'asc';
      this.sortColumnOrder.set(value);
    }
  }

  renderPagination(data: any) {
    if (!this.showPagination) {
      return;
    }
    this.totalPages.set(data.totalPages);
    this.totalItem.set(data.total);
    this.pages.set(Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  }

  selectPage(p: number): void {
    if (p !== this.page()) {
      this.page.set(p);
    }
  }

  changeItemPerPage(event: any) {
    const value = event.target.value;
    this.itemPerPage.set(value);
  }

  getData(params : any)  {
    const searchParams = new URLSearchParams();
    if (params.column) searchParams.set('orderBy', params.column);
    if (params.order) searchParams.set('order', params.order);
    if (params.searchString) searchParams.set('search', params.searchString);
    if (params.itemPerPage) searchParams.set('limit', params.itemPerPage);
    if (params.page) searchParams.set('page', params.page);

    if ((this.showClinicFilterTemplate && params.clinicId)) searchParams.set('clinic_id', params.clinicId);

    if (this.showFilterDateRange && params.dateRange) {
      const startDate = moment(params.dateRange[0]).format('YYYY-MM-DD');
      const endDate = moment(params.dateRange[1]).format('YYYY-MM-DD');
      searchParams.set('start_date', startDate);
      searchParams.set('end_date', endDate);
    }

    // Extend filter option from UI
    Object.keys(this.filterOptions()).forEach(key => {
      const value = this.filterOptions()[key];
      if (value && value >= 0) {
        searchParams.set(key, value);
      }
    });

    const url = this.url + '?' + searchParams.toString();
    return this.apiService.get(url).pipe(
      tap((data : any) => { this.renderPagination(data.pagination)}),
      map((data : any) => { return data.data })
    );
  }


  setClinicFilter(clinicId: number) {
    this.clinicId.set(clinicId);
  }
  
  setDateFilter(name: string) {
    const days = this.ranges.filter(range => { return range.name === name})
    if (days.length > 0) {
      const day = days[0];
      this.dateRange.set(day.value);
    }
  }

  handleSearchChange (element: HTMLInputElement) {
    this.searchString.set(element.value);
  }

  handleFilterChange(value : any) {
    this.filterOptions.set(value);
    this.reloadData();
  }

  reloadData() {
    // Trigger reload data
    this.refreshKey.update(key => key + 1);
  }

  getClinicId() {
    return this.clinicId();
  }

  getDateRange() {
    return this.dateRange();
  }
  
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
  }
}

interface IRange {
  value: Date[];
  name: string;
  label: string;
}
