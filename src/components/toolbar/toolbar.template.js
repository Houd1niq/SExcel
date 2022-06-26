export function toolbarTemplate(state) {
  // * - use only one of this
  // ** - not necessarily
  // icon(string) - HTML content of button will be materialIcon name *
  // html(string) - HTML content of button *
  // type(string) - "button" or "dropdown"
  // value(object) - {"nameOfStyle": "style-value"}
  // active(boolean) - condition for the active state of the button **
  // dropdownButtons(array) - array of objects(buttons)
  const buttons = [
    {
      icon: "format_bold",
      type: "button",
      active: state["fontWeight"] === "bold",
      value: {fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold"},
    },
    {
      icon: "format_italic",
      type: "button",
      active: state["fontStyle"] === "italic",
      value: {fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic"},
    },
    {
      icon: "format_underlined",
      type: "button",
      active: state["textDecoration"] === "underline",
      value: {textDecoration: state["textDecoration"] === "underline" ? "none" : "underline"},
    },
    {
      icon: "format_color_text",
      type: "dropdown",
      value: "drop",
      dropdownButtons: [
        {
          // icon: "square",
          html: getCircleIcon("black", {color: "black"}),
          type: "button",
          value: {color: "black"},

        },
        {
          html: getCircleIcon("yellow", {color: "yellow"}),
          type: "button",
          value: {color: "yellow"},
        },
        {
          html: getCircleIcon("blue", {color: "blue"}),
          type: "button",
          value: {color: "blue"},
        },
        {
          html: getCircleIcon("violet", {color: "violet"}),
          type: "button",
          value: {color: "violet"},
        },
        {
          html: getCircleIcon("chocolate", {color: "chocolate"}),
          type: "button",
          value: {color: "chocolate"},
        },
        {
          html: getCircleIcon("skyblue", {color: "skyblue"}),
          type: "button",
          value: {color: "skyblue"},
        },
        {
          html: getCircleIcon("red", {color: "red"}),
          type: "button",
          value: {color: "red"},
        },
        {
          html: getCircleIcon("white", {color: "white"}),
          type: "button",
          value: {color: "white"},
        },
        {
          html: getCircleIcon("gray", {color: "gray"}),
          type: "button",
          value: {color: "gray"},
        },
        {
          html: getCircleIcon("lime", {color: "lime"}),
          type: "button",
          value: {color: "lime"},
        },
      ],
    },
    {
      icon: "format_color_fill",
      type: "dropdown",
      value: "drop",
      dropdownButtons: [
        {
          // icon: "square",
          html: getCircleIcon("black", {backgroundColor: "black"}),
          type: "button",
          value: {backgroundColor: "black"},

        },
        {
          html: getCircleIcon("yellow", {backgroundColor: "yellow"}),
          type: "button",
          value: {color: "yellow"},
        },
        {
          html: getCircleIcon("blue", {backgroundColor: "blue"}),
          type: "button",
          value: {color: "blue"},
        },
        {
          html: getCircleIcon("violet", {backgroundColor: "violet"}),
          type: "button",
          value: {color: "violet"},
        },
        {
          html: getCircleIcon("chocolate", {backgroundColor: "chocolate"}),
          type: "button",
          value: {color: "chocolate"},
        },
        {
          html: getCircleIcon("skyblue", {backgroundColor: "skyblue"}),
          type: "button",
          value: {color: "skyblue"},
        },
        {
          html: getCircleIcon("red", {backgroundColor: "red"}),
          type: "button",
          value: {color: "red"},
        },
        {
          html: getCircleIcon("white", {backgroundColor: "white"}),
          type: "button",
          value: {color: "white"},
        },
        {
          html: getCircleIcon("gray", {backgroundColor: "gray"}),
          type: "button",
          value: {color: "gray"},
        },
        {
          html: getCircleIcon("lime", {backgroundColor: "lime"}),
          type: "button",
          value: {color: "lime"},
        },
      ],
    },
    {
      icon: "format_align_left",
      type: "button",
      active: state["textAlign"] === "left",
      value: {textAlign: "left"},
    },
    {
      icon: "format_align_center",
      type: "button",
      active: state["textAlign"] === "center",
      value: {textAlign: "center"},
    },
    {
      icon: "format_align_right",
      type: "button",
      active: state["textAlign"] === "right",
      value: {textAlign: "right"},
    },
  ];
  return buttons.map(createButton).join("");
}

function getCircleIcon(color, value) {
  return `<div data-type="button" data-value='${JSON.stringify(value)}' style="background: ${color}" class="color-circle-selector"></div>`;
}

function getMaterialIcon() {

}

function createButton(button) {
  const meta = `data-type="${button.type}" data-value='${JSON.stringify(button.value)}'`;
  const style = button.style ? button.style : "";
  let dropdown = "";
  if (button.type === "dropdown") {
    dropdown = createDropdownHTML(button);
  }
  return `
  <div ${meta} class="button ${button.active ? "active" : ""}">
    ${button.icon ? `<span style='${style}' ${meta} class="material-icons ">${button.icon}</span>` : ``}
    ${button.html ? button.html : ""}
    ${dropdown}
  </div>
  `;
}

function createDropdownHTML(button) {
  let dropdownHTML = button.dropdownButtons.reduce((acc, item) => {
    const style = item.style ? item.style : "";
    const meta = `data-type="${item.type}" data-value='${JSON.stringify(item.value)}'`;
    acc += `
      <div ${meta} class="button ${item.active ? "active" : ""}">
        ${item.icon ? `<span style='${style}' ${meta} class="material-icons ">${item.icon}</span>` : ``}
        ${item.html ? item.html : ""}
      </div>
      `;
    return acc;
  }, "");

  return `
    <div data-type="dropdown-menu" class="dropdown-buttons">
      ${dropdownHTML}
    </div>
    `;
}
