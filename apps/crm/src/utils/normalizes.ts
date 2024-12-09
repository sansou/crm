import { Project } from "../project/entities/project.entity";
import { getIdByDynamooseId } from "./utils";

function normalizeProjectIds(project: Project): Project {
  project.pk = getIdByDynamooseId(project.pk);
  project.sk = getIdByDynamooseId(project.sk);
  return project;
}