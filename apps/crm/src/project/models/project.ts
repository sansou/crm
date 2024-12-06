import { Integration } from "../../integration/entities/integration";


export class Project {
  constructor(
    public id: string = null,
    public name: string = "project initial",
    public integrations: Integration[] = []
  ) {}

}
