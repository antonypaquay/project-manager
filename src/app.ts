class ProjectInput {
    templateElement: HTMLTemplateElement;
    rootElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.rootElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';
        this.attach();
    }

    private attach() {
        this.rootElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const pjtInput = new ProjectInput();