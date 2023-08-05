import { makeAutoObservable } from "mobx";

export interface QueryModel {
  qid: string;
  method: string;
  path: string;
}

type QueryList = QueryModel[];

class QueryStore {
  queryList: QueryList = [
    {
      qid: this.formatDateTime(),
      method: "GET",
      path: "_cat/indices?format=json",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  formatDateTime() {
    const formattedDateTime: string = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 14);
    return formattedDateTime;
  }

  addQuery() {
    this.queryList.push({
      qid: this.formatDateTime(),
      method: "GET",
      path: "_cat/indices?format=json",
    });
  }

  deleteQuery(query: QueryModel) {
    this.queryList = this.queryList.filter(
      (_query) => _query.qid !== query.qid
    );
  }
}

export const queryStore = new QueryStore();
