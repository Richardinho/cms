import { Project } from '../../model';

export const transformDataToProjects = (data: any): Array<Project> => {
  if (Array.isArray(data)) {
    return data.map((item: any): Project => {
      return {
        id: item.id,
        title: item.title,
        href: item.href,
        tag1: item.tag1 || '',
        tag2: item.tag2 || '',
        tag3: item.tag3 || '',
        underEdit: false,
        published: Boolean(parseInt(item.published)),
      };
    });
  }

  return [] as Array<Project>;
};
