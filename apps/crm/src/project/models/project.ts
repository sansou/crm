import { StatusProject } from "../../utils/status-project.enum";


export class Project {
  constructor(
    public id?: string,
    public name: string = "Initial project",
    public status: StatusProject = StatusProject.Ativo,
    public leads: String[] = [],
    public integrations: String[] = [],
    public createdAt: Date = new Date()
  ) {}

}
