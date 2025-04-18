import { Component, computed, ContentChild, Input, OnInit, signal, TemplateRef } from '@angular/core';
import { DataTableService } from './data-table.service';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-data-table',
  imports: [
    CommonModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() url = '';
  @Input() headers = [];
  @Input() actionTemplate!: TemplateRef<any>;
  @Input() searchTemplate!: TemplateRef<any>;
  @Input() columnCustomTemplates! : { [key: string]: any; };

  sortColumnName = signal<string>('');
  sortColumnOrder = signal<string>('');
  itemPerPage = signal<number>(10);
  totalPages = signal<number>(0);
  page = signal<number>(1);
  searchString = signal<string>('');

  sortData = computed(() => ({
      column : this.sortColumnName(),
      order : this.sortColumnOrder(),
      page: this.page(),
      itemPerPage : this.itemPerPage(),
      searchString: this.searchString()
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


  constructor(
    public dataService: DataTableService,
  ) {
    
  }

  setOrder(column: 'string', sortable = false) {
    if (!sortable) {
      return;
    }

    if (this.sortColumnName() != column) {
      this.sortColumnName.set(column);
      this.sortColumnOrder.set('asc');
    } else {
      let value = this.sortColumnOrder() == 'asc' ? 'desc' : 'asc';
      this.sortColumnOrder.set(value);
    }
  }

  renderPagination(data: any) {
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
    let value = event.target.value;
    this.itemPerPage.set(value);
  }

  getData(params : any)  {
    const searchParams = new URLSearchParams();
    if (params.column) searchParams.set('orderBy', params.column);
    if (params.order) searchParams.set('order', params.order);
    if (params.searchString) searchParams.set('search', params.searchString);
    if (params.itemPerPage) searchParams.set('limit', params.itemPerPage);
    if (params.page) searchParams.set('page', params.page);

    let url = this.url + '?' + searchParams.toString();
    return this.dataService.get(url).pipe(
      tap((data : any) => { this.renderPagination(data.pagination)}),
      map((data : any) => { return data.data })
    );
  }

  // Arrow functions (=>) preserve the outer context of this
  handleInputChange = (element: HTMLInputElement) => {
    this.searchString.set(element.value);
  }
}
