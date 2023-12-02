let activecellid = null;
const activecell = document.getElementById("active-cell");
let inputcell = document.getElementById("cell-input");
const exportData = document.getElementById("exportData");

const form = document.querySelector(".form");

const state = {};

form.addEventListener("input", onChange);

const defaultastyle = {
  bgColor: "#ffffff",
  fontColor: "#000000",
  fontFaimly: "Arial",
  isBold: false,
  isUnderaline: false,
  isitalic: false,
  textAlign: "left",
  text: "",
};

function onchangetext(event) {
  const changeText = event.target.innerText;
  if (state[activecellid]) {
    state[activecellid].text = changeText;
  } else {
    state[activecellid] = defaultastyle;
  }
  console.log(changeText);
}

function onChange() {
  const options = {
    fontFaimly: form.fontfaimly.value,
    fontColor: form.fontColor.value,
    bgColor: form.bgcolor.value,
    isBold: form.isbold.checked,
    isitalic: form.isitalic.checked,
    isUnderaline: form.isunderline.checked,
    textAlign: form.textAlignment.value,
  };

  aplyStyle(options);
}

function aplyStyle(style) {
  if (!activecellid) {
    form.reset();
    return;
  }

  const activeCell = document.getElementById(activecellid);
  activeCell.style.fontFamily = style.fontFaimly;
  activeCell.style.color = style.fontColor;
  activeCell.style.backgroundColor = style.bgColor;
  activeCell.style.fontWeight = style.isBold ? "600" : "400";
  activeCell.style.fontStyle = style.isitalic ? "italic" : "normal";
  activeCell.style.textDecoration = style.isUnderaline ? "underline" : "none";
  activeCell.style.textAlign = style.textAlign;

  state[activecellid] = { ...style, text: activeCell.innerText };
}

function onfocuscell(e) {
  activecellid = e.target.id;
  activecell.innerText = activecellid;
  inputcell.value = activecellid;

  if (state[activecellid]) {
    form.reset(state[activecellid]);
  } else {
    form.reset();
  }
}

exportData.addEventListener("click", () => {
  const json = JSON.stringify(state);
  const blob = new Blob([json], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = json;
  link.href = url;
  link.click();
});

inputcell.addEventListener("change", searchCell);

function searchCell() {
  const input = inputcell.value.toUpperCase();
    const cell = document.getElementsByClassName("cell");
    
    cellArray = Array.from(cell);
    
    const filterdcell = cellArray.filter((index) => {
        return input === index.id.toUpperCase();
    });

     if (filterdcell.length > 0) {
        filterdcell[0].focus();
      }
}
