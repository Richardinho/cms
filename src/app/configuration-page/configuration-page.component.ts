import { Component, OnInit } from '@angular/core';
import { AppState } from '../model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { metadataRequest } from './actions/metadata.action';
import { updateMetadataRequest } from './actions/update-metadata.action';
import { selectMetadata } from './selectors/metadata.selector';
import { selectShowLoader } from './selectors/show-loader.selector';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators } from '@angular/forms';

@Component({
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss'],
})
export class ConfigurationPageComponent implements OnInit {
  metadata$: Observable<any>;
  showLoader$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  public formGroup: FormGroup = new FormGroup({
    githubUrl: new FormControl('lalala'),
  });

  update() {
    this.store.dispatch(updateMetadataRequest({ metadata: { github_url: this.formGroup.value.githubUrl }}));
  }

  ngOnInit() {
    this.metadata$ = this.store.pipe(select(selectMetadata));
    this.showLoader$ = this.store.pipe(select(selectShowLoader));

    this.metadata$.subscribe(metadata => {
      this.formGroup
        .patchValue({ githubUrl: metadata.github_url })
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.store.dispatch(metadataRequest());
    });
  }
}

