import { FormGroup } from '@angular/forms';

const MAX_NUM_TAGS = 3;

export const tagsValidator = (control: FormGroup) => {
  const numberSelected = Object.keys(control.controls).reduce(
    (numberSelected, key) => {
      const selected = control?.controls[key]?.value;

      if (selected) {
        return numberSelected + 1;
      }

      return numberSelected;
    },
    0
  );

  if (numberSelected > MAX_NUM_TAGS) {
    return {
      error: 'not allowed more than 3 selected',
    };
  }

  return null;
};

export const isNewProject = (id: string | number) => {
  return ('' + id).startsWith('_');
};
