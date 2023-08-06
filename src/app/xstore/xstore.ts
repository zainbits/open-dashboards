import { makeObservable, observable, action } from 'mobx';

export interface QueryItem {
  qid: number;
  method: string;
  path: string;
}

class QueryStore {
  objectList: QueryItem[] = [
    { qid: 1, method: 'put', path: '' },
    { qid: 2, method: '', path: '' },
  ];

  constructor() {
    makeObservable(this, {
      objectList: observable,
      addQuery: action,
      deleteQuery: action,
      handleChange: action,
    });
  }

  addQuery = () => {
    this.objectList.push({ qid: Date.now(), method: '', path: '' });
  };

  deleteQuery = (qid: number) => {
    this.objectList = this.objectList.filter((obj) => obj.qid !== qid);
  };

  handleChange = (qid: number, method: string, path: string) => {
    this.objectList = this.objectList.map((obj) =>
      obj.qid === qid ? { ...obj, method, path } : obj
    );
  };
}

export const queryStore = new QueryStore();
