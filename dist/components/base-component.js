export default class Component {
    constructor(templateId, rootElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.rootElement = document.getElementById(rootElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.rootElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
//# sourceMappingURL=base-component.js.map