import ProjectList from "./app/ProjectList.js";
import DOMhelper from "./util/DOMhelper.js";

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
    activeProjectList.setSwitchHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "/assets/scripts/util/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}
App.init();
