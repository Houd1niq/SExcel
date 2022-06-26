import {Page} from "../Page";
import {$} from "../dom";
import {insertAllRecords} from "./dashboard.functions";

export class DashboardPage extends Page {

  getRoot() {
    const now = Date.now()

    const $db = $.create("div", "db");
    $db.html(`
    <div class="db__header">
      <h1>Excel Dashboard</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${now}" class="db__create">
          Новая <br/>
          Таблица
        </a>
      </div>
    </div>

    <div class="db__table db__view">
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      ${insertAllRecords()}
    </div>
  
    `);
    return $db;
  }
}
