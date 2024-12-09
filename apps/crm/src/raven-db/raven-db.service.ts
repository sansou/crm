import { Injectable } from '@nestjs/common';
import DocumentStore from 'ravendb';

@Injectable()
export class RavenDbService {
  private store: DocumentStore;

  constructor(){
    this.store = new DocumentStore('http://localhost:8080', 'crm');
    this.store.initialize();

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
