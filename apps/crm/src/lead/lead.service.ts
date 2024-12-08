import { Injectable, NotFoundException } from '@nestjs/common';
import { RavenDbService } from '../raven-db/raven-db.service';
import { IDocumentSession } from 'ravendb';
import { Lead } from './models/leads';
import { UpdateLeadDto } from './models/update-lead.dto';

@Injectable()
export class LeadService {
  constructor(
    private readonly dbService: RavenDbService
  ) { }

  async add(lead: Lead) {
    let session: IDocumentSession;
    try {
      session = this.dbService.getSession();
      await session.store<Lead>(lead);
      await session.saveChanges();
      return {
        ...lead,
        id: session.advanced.getDocumentId(lead)
      };
    } finally {
      session.dispose();
    }
  }

  async findById(id: string) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      const lead = await session.load<Lead>(id);
      if (!lead) throw new NotFoundException("Project not found");
      return lead;
    } finally {
      session.dispose();
    }
  }

  async findAllByProject(projId: string) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();
      const leads = await session.query<Lead>({ collection: 'leads' }).whereEquals('projectId', projId).all();
      return leads;
    } finally {
      session.dispose();
    }
  }

  async update(id: string, updateDto: UpdateLeadDto) {
    let session: IDocumentSession;

    try {
      session = this.dbService.getSession();

      const project = await session.load<Lead>("leads/" + id);
      const updatedFields = Object.keys(updateDto);
      //atualiza apenas os campos que vieram
      updatedFields.forEach((key) => {
        if (updateDto[key] !== undefined) {
          project[key] = updateDto[key];
        }
      });

      await session.saveChanges();
    } finally {
      session.dispose();
    }
  }

  delete(id: string) {
    let session: IDocumentSession;

    try {
      const session = this.dbService.getSession();
      session.delete<Lead>("leads" + id);
      session.saveChanges();
    } finally {
      session.dispose();
    }
  }

}
