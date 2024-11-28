import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
export interface Item {
  id?: number;
  name: string;
  fromDate: string;
  toDate:string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private dbPromise: Promise<IDBPDatabase>;
  constructor() {
    this.dbPromise = openDB('MyDatabase', 1, {
      upgrade(db) {
         if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  async getAllItems(): Promise<Item[]> {
    const db = await this.dbPromise;
    return db.getAll('items');
  }
  async addItem(item: Item): Promise<any> {
    const db = await this.dbPromise;
    return db.add('items', item);
  }
}
