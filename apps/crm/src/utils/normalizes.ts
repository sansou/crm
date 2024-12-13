import { Lead } from "../lead/entities/leads.entity";
import { Project } from "../project/entities/project.entity";
import { getIdByDynamooseId } from "./utils";

export function normalizeProjectIds(project: Project): Project {
  project.primaryKey = getIdByDynamooseId(project.primaryKey);
  project.sortKey = getIdByDynamooseId(project.sortKey);
  return project;
}

export function normalizeProjectIdsForList(projects: Project[]): Project[] {
  projects.forEach(proj => {
    proj.primaryKey = getIdByDynamooseId(proj.primaryKey);
    proj.sortKey = getIdByDynamooseId(proj.sortKey);
  })
  return projects;
}

export function normalizeLeadIds(lead: Lead): Lead {
  lead.primaryKey = getIdByDynamooseId(lead.primaryKey);
  lead.sortKey = getIdByDynamooseId(lead.sortKey);
  return lead;
}

export function normalizeLeadIdsForList(leads: Lead[]): Lead[] {
  leads.forEach(lead => {
    lead.primaryKey = getIdByDynamooseId(lead.primaryKey);
    lead.sortKey = getIdByDynamooseId(lead.sortKey);
  })
  return leads;
}