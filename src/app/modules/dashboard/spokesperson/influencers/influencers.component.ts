import { Component, Input } from '@angular/core';
import { IconInfoComponent } from '../../../../core/components/icons/info/info.component';
import { selectSpokespersonState } from '../../../../core/store/spokesperson/spokesperson.selectors';
import { AppState } from '../../../../core/store';
import { selectFilterState } from '../../../../core/store/filter/filter.selectors';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { FilterState, initialState } from '../../../../core/store/filter/filter.reducer';
import { SpokespersonState } from '../../../../core/store/spokesperson/spokesperson.reducer';
import { FilterRequestPayload } from '../../../../core/models/request.model';
import { InfluencerCount } from '../../../../core/models/influencer.model';
import { ScrollerModule } from 'primeng/scroller';
import { CommonModule } from '@angular/common';
import { ImgFallbackDirective } from '../../../../core/directive/img-fallback.directive';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { IconMicComponent } from '../../../../core/components/icons/mic/mic.component';
import { FilterService } from '../../../../core/services/filter.service';
import { InfluencerService } from '../../../../core/services/influencer.service';
import { setInfluencer } from '../../../../core/store/spokesperson/spokesperson.actions';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-influencers',
  standalone: true,
  imports: [IconMicComponent, IconInfoComponent, ScrollerModule, CommonModule, ImgFallbackDirective, SpinnerComponent, InputTextModule, ReactiveFormsModule],
  templateUrl: './influencers.component.html',
  styleUrl: './influencers.component.scss',
})
export class InfluencersComponent {
  filter: any;
  ngOnDestroy() {
    this.filter?.unsubscribe?.();
  }
  spokespersonState: Observable<SpokespersonState>;
  influencerCount: InfluencerCount[] = [];
  isLoading: boolean = false;
  page = 1;
  total = 0;
  searchForm = this.fb.group({
    query: '',
    field: 'title',
  });

  selectedInfluencer: InfluencerCount | null = null;

  constructor(
    private store: Store<AppState>,
    private filterService: FilterService,
    private influencerService: InfluencerService,
    private fb: FormBuilder
  ) {
    this.spokespersonState = this.store.select(selectSpokespersonState);
  }

  @Input() setInfluencer: any;

  fetchData = (filter: FilterRequestPayload, isSearch: boolean) => {
    this.isLoading = true;
    this.influencerService
      .getSpokepersons({...this.filterService.filter, ...filter, term: this.searchForm.get('query')?.value ?? ''})
      // @ts-ignore
      .subscribe(({ data, meta }) => {
        // if the fetch data come from search form
        if(isSearch){
          this.influencerCount = data;
        } else {
          this.influencerCount = [...this.influencerCount, ...data].filter((v) => v.doc_count > 0);
        }

        if (this.page === 1) {
          this.setInfluencer(data[0].spokesperson_name);
        }
        this.page = this.page + 1;
        this.total = meta.total_data;
      })
      .add(() => {
        this.isLoading = false;
      });
  };

  ngOnInit() {
    this.filter = this.filterService.subscribe((filter) => {
      this.page = 1;
      this.influencerCount = [];
      this.fetchData({ ...filter, page: this.page }, false);
    });

    this.searchForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((v) => {
      console.log(`search ${v.query}`)
      this.page = 1;
      this.fetchData({ page: 1, term: v.query ?? ''}, true);
    });
  }

  onClick(selectedInfluencer: InfluencerCount) {
    this.selectedInfluencer = selectedInfluencer;
    this.setInfluencer(selectedInfluencer.spokesperson_name);
  }

  onLazyLoad(event: any) {
    const h = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;

    if (h === 0 && this.influencerCount.length > 0) {
      if (this.influencerCount.length >= this.total) return;
      this.fetchData({ ...this.filterService.filter, page: this.page }, false);
    }
  }
}
