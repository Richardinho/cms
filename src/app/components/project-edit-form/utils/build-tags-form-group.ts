import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { tagData } from '../../../services/article.service';

export const buildTagsFormGroup = (...tags) => {

	return tagData.reduce((result, tag) => {
		return {
			...result,
			[tag]: new FormControl(tags.includes(tag))
		};
	}, {});

};
