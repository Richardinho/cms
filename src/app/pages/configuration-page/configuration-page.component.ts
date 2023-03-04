import { Component, OnInit } from '@angular/core';
import { AppState } from '../../model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { metadataRequest } from '../../actions/metadata.action';
import { updateMetadataRequest } from '../../actions/update-metadata.action';

import { selectMetadata } from '../../selectors/metadata.selector';
import { selectShowLoader } from '../../selectors/show-loader.selector';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

// should it be called MetadataPageComponent?
@Component({
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
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
    const action = updateMetadataRequest(metadata);
    this.store.dispatch(action);
  }

  ngOnInit() {
    // configure loader component
    this.showLoader$ = this.store.pipe(select(selectShowLoader));

    // when metadata in store is updated, update form
    this.metadata$ = this.store.pipe(select(selectMetadata));
    this.metadata$.subscribe((metadata) => {
      this.formGroup.patchValue({ githubUrl: metadata.github_url });
    });

    //  dispatch action to request metadata from server
    this.store.dispatch(metadataRequest());
  }
}
