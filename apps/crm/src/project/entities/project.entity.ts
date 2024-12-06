import { Integration } from "../../integration/entities/integration.entity";


export interface Project {
  id: string,
  name: string,
  integrations: Integration[]
}
