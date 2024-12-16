export enum StatusProject {
  ATIVO = "ATIVO",
  DESATIVADO = "DESATIVADO",
}

/**
 * Enum com os tipos de entidades entityTypes
 */
export enum EntityTypes {
  PROJECT = 'PROJ',
  LEAD = 'LEAD',
}

/**
 * https://www.revopscoop.com/post/lead-stage-vs-lead-status
 * Referencia dos status do lead
 */

export enum StatusLead {
  PROSPECT = 'PROSPECT',
  OPEN = 'OPEN',
  WORKING = 'WORKING',
  DISQUALIFIED = 'DISQUALIFIED',
  NOT_A_TARGER = 'NOT A TARGET',
  QUALIFIED = 'QUALIFIED'
}