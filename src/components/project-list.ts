import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import Component from './base-component'
import { AutoBind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

// ProjectList class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'new' | 'active' | 'review' | 'done') {
        super('project-list', 'app', false, `${type}-projects`);


        this.assignedProjects = [];
        this.element.id = `${this.type}-projects`;

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @AutoBind
    dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain');
        switch (this.type) {
            case 'active':
                projectState.moveProject(prjId, ProjectStatus.Active);
                break;
            case "review":
                projectState.moveProject(prjId, ProjectStatus.Review);
                break;
            case "done":
                projectState.moveProject(prjId, ProjectStatus.Done);
                break;
            default:
                projectState.moveProject(prjId, ProjectStatus.New);
        }
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable',);
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects: Project[]) => {
            const revelantProjects = projects.filter(prj => {
                switch (this.type) {
                    case "new":
                        return prj.status === ProjectStatus.New;
                    case "active":
                        return prj.status === ProjectStatus.Active;
                    case "review":
                        return prj.status === ProjectStatus.Review;
                    default:
                        return prj.status === ProjectStatus.Done; 
                }
                
            });
            this.assignedProjects = revelantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const ptjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, ptjItem);
        }
    }
}
