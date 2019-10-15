/*
 *  converts a FormData object into a POJSO
 *
 *  For testing. There must be a native way of doing this!
 */

//  FormData doesn't seem to support entries() !
export const formDataToObj = (formData: any): any => {
  const obj = {};

  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }

  return obj;
};
