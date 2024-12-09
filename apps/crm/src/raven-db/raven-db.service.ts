import { Injectable } from '@nestjs/common';
import DocumentStore from 'ravendb';
import { Project } from '../project/models/project';
import { Lead } from '../lead/models/leads';

@Injectable()
export class RavenDbService {
  private store: DocumentStore;

  constructor(){
    this.store = new DocumentStore('http://localhost:8080', 'crm');
    this.store.initialize();
    this.store.conventions.registerEntityType(Project);
    this.store.conventions.registerEntityType(Lead);
  }

  getSession() {
    return this.store.openSession();
  }

  getBulkInsert(){
    return this.store.bulkInsert();
  }

  async getDocumentById(id: string) {
    const session = this.store.openSession();
    return await session.load(id);
  }

}
