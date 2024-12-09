import { Lead } from "../lead/entities/leads.entity";
import { Project } from "../project/entities/project.entity";
import { getIdByDynamooseId } from "./utils";

export function normalizeProjectIds(project: Project): Project {
  project.pk = getIdByDynamooseId(project.pk);
  project.sk = getIdByDynamooseId(project.sk);
  return project;
}

export function normalizeProjectIdsForList(projects: Project[]): Project[] {
  projects.forEach(proj => {
    proj.pk = getIdByDynamooseId(proj.pk);
    proj.sk = getIdByDynamooseId(proj.sk);
  })
  return projects;
}

export function normalizeLeadIds(lead: Lead): Lead {
  lead.pk = getIdByDynamooseId(lead.pk);
  lead.sk = getIdByDynamooseId(lead.sk);
  return lead;
}

export function normalizeLeadIdsForList(leads: Lead[]): Lead[] {
  leads.forEach(lead => {
    lead.pk = getIdByDynamooseId(lead.pk);
    lead.sk = getIdByDynamooseId(lead.sk);
  })
  return leads;
}