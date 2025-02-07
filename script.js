document.addEventListener("DOMContentLoaded", function () {
  let formContainer = document.getElementById("form-container");

  let formData = [
    {
      id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
      type: "input",
      label: "Sample Label",
      placeholder: "Sample placeholder",
    },
    {
      id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
      type: "select",
      label: "Select",
      options: ["Sample Option 1", "Sample Option 2", "Sample Option 3"],
    },
    {
      id: "45002ecf-85cf-4852-bc46-529f94a758f5",
      type: "textarea",
      label: "Text Area",
      placeholder: "Sample Placeholder",
    },
  ];

  loadFormFromJSON(formData);
});

function loadFormFromJSON(formData) {
  formData.forEach((element) => addElement(element.type, element));
}

function addElement(type, data = {}) {
  let formContainer = document.getElementById("form-container");
  let elementId = data.id || Date.now();

  let element = document.createElement("div");
  element.classList.add("element");
  element.setAttribute("data-id", elementId);

  let label = document.createElement("label");
  label.innerText = data.label || `Sample ${capitalize(type)}`;

  let inputField;
  if (type === "input" || type === "textarea") {
    inputField = document.createElement(type);
    inputField.placeholder = data.placeholder || "Sample placeholder";
    inputField.oninput = updateJSON;
  } else if (type === "select") {
    inputField = document.createElement("select");
    (data.options || ["Sample Option"]).forEach((optionText) => {
      let option = document.createElement("option");
      option.textContent = optionText;
      inputField.appendChild(option);
    });
  }

  let deleteBtn = document.createElement("button");
 deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = function () {
    formContainer.removeChild(element);
    updateJSON();
  };

  element.appendChild(label);
  element.appendChild(inputField);
  element.appendChild(deleteBtn);
  formContainer.appendChild(element);

  updateJSON();
}

function saveForm() {
  let formJSON = getFormJSON();
  console.log("Saved Form JSON:", JSON.stringify(formJSON, null, 2));
}

function getFormJSON() {
  let formElements = document.querySelectorAll(".element");
  let formData = [];

  formElements.forEach((element) => {
    let id = element.getAttribute("data-id");
    let label = element.querySelector("label").innerText;
    let inputField = element.querySelector("input, textarea, select");

    let formItem = {
      id: id,
      type: inputField.tagName.toLowerCase(),
      label: label,
    };

    if (inputField.tagName.toLowerCase() === "select") {
      formItem.options = Array.from(inputField.options).map(
        (opt) => opt.textContent
      );
    } else if (inputField.tagName.toLowerCase() !== "checkbox") {
      formItem.placeholder = inputField.placeholder;
    }

    formData.push(formItem);
  });

  return formData;
}

function updateJSON() {
  console.log("Updated JSON:", JSON.stringify(getFormJSON(), null, 2));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
