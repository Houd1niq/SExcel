import { Page } from "../Page";
import { debounce, getDateOfOpen, storage } from "../utils";
import { DefaultState } from "../../store/initialState";
import { rootReducer } from "../../store/rootReducer";
import { createStore } from "../createStore";
import { Excel } from "../../components/excel/Excel";
import { Header } from "../../components/header/Header";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { Formula } from "../../components/formula/Formula";
import { Table } from "../../components/table/Table";

export class ExcelPage extends Page {
  getRoot() {
    const defaultState = new DefaultState();
    const storageName = `excel:${this.param}`;
    const dateOfOpen = getDateOfOpen();
    const initialState = storage(storageName)
      ? storage(storageName)
      : defaultState;
    initialState["dateOfOpen"] = dateOfOpen;
    const store = createStore(rootReducer, initialState);

    store.subscribe(
      debounce((state) => {
        storage(storageName, state);
        console.log("Состояние приложения:", state);
      }, 350)
    );

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
