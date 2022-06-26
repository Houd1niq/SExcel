import "./scss/index.scss";
import {Router} from "./core/router/Router";
import {DashboardPage} from "./core/pages/DashboardPage";
import {ExcelPage} from "./core/pages/ExcelPage";

const router = new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage,
});


