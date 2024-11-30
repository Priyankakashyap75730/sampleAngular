import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
export interface Item {
  id?: number;
  name: any;
  role:any;
  fromDate: any;
  toDate:any;
  status:string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private dbPromise: Promise<IDBPDatabase>;
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
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
    const items = await db.getAll('items');
    this.itemsSubject.next(items);
    return items;
  }
  private async refreshItems() {
    const db = await this.dbPromise;
    const items = await db.getAll('items');
    this.itemsSubject.next(items);
  }
  getItems$() {
    return this.itemsSubject.asObservable();
  }
  async addItem(item: Item): Promise<void> {
    const db = await this.dbPromise;
    await db.add('items', item);
    this.refreshItems();
  }
  async updateItem(id: number, changes: Partial<Item>): Promise<void> {
    const db = await this.dbPromise;
    const item = await db.get('items', id);
    if (item) {
      const updatedItem = { ...item, ...changes };
      await db.put('items', updatedItem);
      this.refreshItems();
    }
  }
  async deleteItem(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('items', id);
    this.refreshItems();
  }
  formatedate(date:any){
    const formatedDate=moment(new Date(date)).utc();
    return formatedDate.format();
  }
  getStatus(fromDate: string): string {
    const fromDateMoment = moment(fromDate, 'MM/DD/YYYY');
    const today = moment().startOf('day');
    if (fromDateMoment.isBefore(today)) {
      return 'previous';
    } else {
      return 'current';
    }
  }
}
