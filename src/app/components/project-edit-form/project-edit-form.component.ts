//  Angular
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

//  RXJS
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//  models
import { Project, AppState } from '../../model';

//  actions
import {
  editProject,
  saveProject,
  deleteLocalProject,
  saveNewProjectRequest,
} from '../../actions';

//  services
import { tagData } from '../../services/article.service';

//  utils
import { tagsValidator, isNewProject } from './utils/tags.validator';
import { formDataToProject } from './utils/form-data-to-project';
import { buildTagsFormGroup } from './utils/build-tags-form-group';

@Component({
  selector: 'app-project-edit-form',
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.scss'],
})
export class ProjectEditFormComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  @Input()
  project: Project;

  newProject: boolean;

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.project.title, Validators.required),
      href: new FormControl(this.project.href, Validators.required),
      published: new FormControl(this.project.published),
      tags: new FormGroup(
        buildTagsFormGroup(
          this.project.tag1,
          this.project.tag2,
          this.project.tag3
        ),
        tagsValidator
      ),
    });

    this.newProject = isNewProject(this.project.id);
  }

  save() {
    const metadata = {
      project: formDataToProject(this.form.value, this.project.id),
    };

    const action = saveProject(metadata);

    this.store.dispatch(action);
  }

  saveNewProject() {
    const metadata = {
      project: formDataToProject(this.form.value, this.project.id),
    };

    const action = saveNewProjectRequest(metadata);

    this.store.dispatch(action);
  }

  cancel() {
    const metadata = {
      id: this.project.id,
      edit: false,
    };

    const action = editProject(metadata);

    this.store.dispatch(action);
  }

  cancelNewProject() {
    const metadata = {
      id: this.project.id,
    };

    const action = deleteLocalProject(metadata);

    this.store.dispatch(action);
  }

  get tagList() {
    return tagData;
  }

  get tags() {
    return this.form.get('tags');
  }

  get title() {
    return this.form.get('title');
  }

  get href() {
    return this.form.get('href');
  }

  get formDisabled() {
    return this.form.invalid;
  }
}
