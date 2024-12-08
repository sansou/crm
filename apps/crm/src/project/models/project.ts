import { Integration } from "../../integration/models/integration";
import { Lead } from "../../lead/models/leads";
import { StatusProject } from "../../utils/status-project.enum";


export class Project {
  constructor(
    public id?: string,
    public name: string = "Initial project",
    public status: StatusProject = StatusProject.Ativo,
    public leads: Lead[] = [],
    public integrations: Integration[] = [],
    public createdAt: Date = new Date()
  ) {}

}
