import { createReducer, on } from '@ngrx/store';
import { AppState, Project } from '../model';
import {
  saveProject,
  editProject,
  projectsResponse,
  projectSavedResponse,
  projectDeletedResponse,
  createProjectRequest,
  createNewProjectResponse,
  deleteLocalProject,
} from '../actions/projects.action';

let latestId = 1;

// TODO:replace with nanoid
const createId = () => {
  latestId++;
  return '_' + latestId;
};

const initialState = null;

export const projectsResponseReducer = (state: Array<Project>, action: any) => {
  return action.projects;
};

export const editProjectReducer = (state: any, action: any) => {
  return state.map((project) => {
    if (project.id === action.id) {
      return {
        ...project,
        underEdit: action.edit,
      };
    }

    return project;
  });
};

export const saveProjectReducer = (state: any, action: any) => {
  return state.map((project) => {
    if (project.id === action?.project?.id) {
      return { ...project, ...action.project };
    }

    return project;
  });
};

export const projectSavedResponseReducer = (state: any, action: any) => {
  return state.map((project) => {
    if (project.id === action?.id) {
      return {
        ...project,
        // When project changes are saved on the server, we want to
        // signal that the edit is over and we can close the form
        underEdit: false,
      };
    }

    return project;
  });
};

export const deleteProjectResponseReducer = (state: any, action: any) => {
  return state.filter((project) => {
    if (project.id !== action?.id) {
      return project;
    }
  });
};

export const createProjectRequestReducer = (state: any, action: any) => {
  const newProject: Project = {
    id: createId(),
    title: '',
    href: '',
    tag1: '',
    tag2: '',
    tag3: '',
    underEdit: true,
    published: false,
  };

  return [newProject, ...state];
};

export const createNewProjectResponseReducer = (state: any, action: any) => {
  return state.map((project) => {
    if (project.id === action.currentId) {
      return {
        ...action.project,
        published: Boolean(parseInt(action.project.published, 10)),
        underEdit: false,
      };
    }

    return project;
  });
};

const _projectsReducer = createReducer(
  initialState,
  on(projectsResponse, projectsResponseReducer),
  on(editProject, editProjectReducer),
  on(saveProject, saveProjectReducer),
  on(projectSavedResponse, projectSavedResponseReducer),
  // delete project when we get a successful response from the server
  on(projectDeletedResponse, deleteProjectResponseReducer),
  on(createProjectRequest, createProjectRequestReducer),
  on(createNewProjectResponse, createNewProjectResponseReducer),
  on(deleteLocalProject, deleteProjectResponseReducer)
);

export function projectsReducer(state: AppState, action: any) {
  return _projectsReducer(state, action);
}
