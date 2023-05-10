//  Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

//  RXJS
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

//  models
import { AppState } from '../../model';

//  actions
import { updateMetadataRequest, metadataRequest } from '../../actions';

//  selectors
import { selectMetadata } from '../../selectors/metadata.selector';
import { selectShowLoader } from '../../selectors/show-loader.selector';

// TODO: should it be called MetadataPageComponent?
@Component({
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  // TODO: put a type on Observable
  metadata$: Observable<any>;
  showLoader$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  public formGroup: FormGroup = new FormGroup({
    githubUrl: new FormControl(''),
  });

  update() {
    const metadata = {
      metadata: { github_url: this.formGroup.value.githubUrl },
    };
    // TODO: inline action
    const action = updateMetadataRequest(metadata);
    this.store.dispatch(action);
  }

  ngOnInit() {
    this.showLoader$ = this.store.pipe(select(selectShowLoader));

    this.metadata$ = this.store.pipe(select(selectMetadata));
    this.metadata$.subscribe((metadata) => {
      this.formGroup.patchValue({ githubUrl: metadata.github_url });
    });

    this.store.dispatch(metadataRequest());
  }
}
