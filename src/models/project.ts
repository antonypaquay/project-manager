// Project Type
export enum ProjectStatus { New, Active, Review, Done }

export class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus) {
    }
}
