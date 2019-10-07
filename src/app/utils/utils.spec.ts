import { formDataToObj } from './utils';

describe('formDataToObj()', () => {
  it('should create POJSO from FormData object', () => {
    const formData = new FormData();

    formData.append('foo', 'this is foo');
    formData.append('bar', 'this is bar');

    expect(formDataToObj(formData)).toEqual({
      'foo': 'this is foo',
      'bar': 'this is bar',
    });
  });
});


