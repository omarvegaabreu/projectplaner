import ProjectItem from "./ProjectItem";
import DOMHelper from "../util/DOMhelper";

export default class ProjectList {
  // projects = [];
  // /**manages list items in the DOM */
  constructor(type) {
    this.projects = [];
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
      list.parentElement.classList.add("droppable");
    });

    list.addEventListener("dragover", (event) => {
      // console.log(event.dataTransfer.types);
      if (event.dataTransfer.types[0] === "text/plain") {
        console.log(event.dataTransfer.types[0]);
        event.preventDefault();
      }
    });

    list.addEventListener("dragleave", (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });

    list.addEventListener("drop", (event) => {
      const projId = event.dataTransfer.getData("text/plain");

      if (this.projects.find((p) => p.id === projId)) {
        return;
      }

      document
        .getElementById(projId)
        .querySelector("button:last-of-type")
        .click();
      list.parentElement.classList.remove("droppable");
      event.preventDefault();
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    // /**take array of active projects to finished projects */
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId)); // /**passes id to addProjects */
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
