import Component from "./Component";

export class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction; // /**close info btn element */  this.create
    this.text = text;
    this.closeToolTip = () => {
      this.detach();
      this.closeNotifier();
    };
    this.create(); // /**function made to always run */
  }

  create() {
    // /**attach more info btn element to dom*/
    const toolTipElement = document.createElement("div");
    toolTipElement.className = "card";

    // /**adding more info to DOM */
    const toolTipTemplate = document.getElementById("tooltip");
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector("p").textContent = this.text;
    toolTipElement.append(toolTipBody);

    // /**getting host element dom position */
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    // /**Defining host element coordinate position */
    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    toolTipElement.style.position = "absolute";
    toolTipElement.style.left = x + "px";
    toolTipElement.style.top = y + "px";

    console.log(this.hostElement.getBoundingClientRect());

    toolTipElement.addEventListener("click", this.closeToolTip);
    this.element = toolTipElement;
  }
}
