/** When using the builder, be sure to set an HTMLElement as a parent. If you
have created an element using build, it does not return the HTMLElement but
the builder itself get a fluent interface. So be sure to use getHTMLElement 
method to get the HTMLElement when building.
*/

const NO_NODE_ERR_MSG =
  "Use 'makeHTMLElement' method before attempting to access the HTML element.";

const NO_TAG_ERR_MSG =
  "Use 'setTag' method before attempting to make the HTML element.";

const NO_PARENT_ERR_MSG =
  "Use 'setParent' method before attempting to make the HTML element.";

export const validateParent = parent => {
  if (!(parent instanceof HTMLElement)) {
    throw new Error("Parent must be an instance of HTMLElement.");
  }
};

const validateString = errorMessage => value => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(errorMessage);
  }
};

const validateWith = (errorMessage, validationFn) => value => {
  if (!validationFn(value)) {
    throw new Error(errorMessage);
  }
};

export const validateTag = validateString(
  "Tag name must be a non-empty string.",
);

export const validateClassName = validateString(
  "Class name must be a non-empty string.",
);

export const validateId = validateString(
  "Unique ID name must be a non-empty string.",
);

export const validateTextContent = validateString(
  "Text content must be a string.",
);

export const validateDataAttribute = validateString(
  "Data attribute name must be a non-empty string.",
);

export const validateFormAction = validateString(
  "Form action must be a non-empty string.",
);

export const validateFormMethod = validateWith(
  "Form method must be one of the following: #, GET, POST, PUT, DELETE.",
  method =>
    ["#", "GET", "POST", "PUT", "DELETE"].includes(method.toUpperCase()),
);

export const validateLabelFor = validateString(
  "Label for must be a non-empty string.",
);

export const validateInputType = validateString(
  "Input type must be a non-empty string.",
);

export const validateInputName = validateString(
  "Input name must be a non-empty string.",
);

export const validateInputPlaceholder = validateString(
  "Input placeholder must be a non-empty string.",
);

export const validateHref = validateString(
  "Href attribute must be a non-empty string.",
);

export const validateTarget = validateString(
  "Target must be a non-empty string.",
);

const makeHTMLBuilder = (elementProperties = {}) => {
  const updateProps = updates => ({
    ...elementProperties,
    ...updates,
    data: { ...elementProperties.data, ...updates.data },
  });

  const applyProps = (element, properties) => {
    Object.entries(properties).forEach(([key, value]) => {
      if (key === "data" && typeof value === "object") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          // eslint-disable-next-line no-param-reassign
          element.dataset[dataKey] = dataValue;
        });
      } else if (key === "classList" && Array.isArray(value)) {
        value.forEach(className => {
          if (!element.classList.contains(className)) {
            element.classList.add(className);
          }
        });
        // Optionally, remove classes not in the updated list
        Array.from(element.classList).forEach(className => {
          if (!value.includes(className)) {
            element.classList.remove(className);
          }
        });
      } else if (!["tag", "parent", "element"].includes(key)) {
        if (value !== null) {
          // eslint-disable-next-line no-param-reassign
          element[key] = value;
        } else {
          // eslint-disable-next-line no-param-reassign
          delete element[key];
        }
      }
    });
  };

  const elementMethods = {
    getTag: () => elementProperties.tag,

    setTag: tag => {
      validateTag(tag);
      return makeHTMLBuilder(updateProps({ tag }));
    },

    getParent: () => elementProperties.parent,

    setParent: parent => {
      validateParent(parent);
      return makeHTMLBuilder(updateProps({ parent }));
    },

    getClasses: () => elementProperties.className,

    addClass: className => {
      validateClassName(className);
      const existingClasses =
        elementProperties.classList ? elementProperties.classList : [];
      const updatedClasses = existingClasses.concat(className).filter(Boolean);

      return makeHTMLBuilder(updateProps({ classList: updatedClasses }));
    },

    removeClass: className => {
      const existingClasses =
        elementProperties.classList ? elementProperties.classList : [];
      const updatedClasses = existingClasses.filter(c => c !== className && c);

      return makeHTMLBuilder(updateProps({ classList: updatedClasses }));
    },

    getId: () => elementProperties.id,

    setId: id => {
      validateId(id);
      return makeHTMLBuilder(updateProps({ id }));
    },

    removeId: () => makeHTMLBuilder(updateProps({ id: null })),

    getContent: () => elementProperties.textContent,

    setContent: textContent => {
      validateTextContent(textContent);
      return makeHTMLBuilder(updateProps({ textContent }));
    },

    removeContent: () => makeHTMLBuilder(updateProps({ textContent: "" })),

    getData: () => elementProperties.data,

    setData: (attribute, value) => {
      validateDataAttribute(attribute);
      return makeHTMLBuilder(updateProps({ data: { [attribute]: value } }));
    },

    removeData: attribute => {
      const newData = { ...elementProperties.data };
      delete newData[attribute];

      return makeHTMLBuilder(updateProps({ data: newData }));
    },

    getFormAction: () => elementProperties.action,

    setFormAction: action => {
      validateFormAction(action);
      return makeHTMLBuilder(updateProps({ action }));
    },

    removeFormAction: () => makeHTMLBuilder(updateProps({ action: null })),

    getFormMethod: () => elementProperties.method,

    setFormMethod: method => {
      validateFormMethod(method);
      return makeHTMLBuilder(updateProps({ method }));
    },

    removeFormMethod: () => makeHTMLBuilder(updateProps({ method: null })),

    getLabelFor: () => elementProperties.htmlFor,

    setLabelFor: htmlFor => {
      validateLabelFor(htmlFor);
      return makeHTMLBuilder(updateProps({ htmlFor }));
    },

    removeLabelFor: () => makeHTMLBuilder(updateProps({ htmlFor: null })),

    getInputType: () => elementProperties.type,

    setInputType: type => {
      validateInputType(type);
      return makeHTMLBuilder(updateProps({ type }));
    },

    removeInputType: () => makeHTMLBuilder(updateProps({ type: null })),

    getInputName: () => elementProperties.name,

    setInputName: name => {
      validateInputName(name);
      return makeHTMLBuilder(updateProps({ name }));
    },

    removeInputName: () => makeHTMLBuilder(updateProps({ name: null })),

    getInputPlaceholder: () => elementProperties.placeholder,

    setInputPlaceholder: placeholder => {
      validateInputPlaceholder(placeholder);
      return makeHTMLBuilder(updateProps({ placeholder }));
    },

    removeInputPlaceholder: () =>
      makeHTMLBuilder(updateProps({ placeholder: null })),

    getHref: () => elementProperties.href,

    setHref: href => {
      validateHref(href);
      return makeHTMLBuilder(updateProps({ href }));
    },

    removeHref: () => makeHTMLBuilder(updateProps({ href: null })),

    getTarget: () => elementProperties.target,

    setTarget: target => {
      validateTarget(target);
      return makeHTMLBuilder(updateProps({ target }));
    },

    removeTarget: () => makeHTMLBuilder(updateProps({ target: null })),

    getHTMLElement: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      return elementProperties.element;
    },

    buildHTMLElement: () => {
      if (!elementProperties.tag) throw new Error(NO_TAG_ERR_MSG);
      if (!elementProperties.parent) throw new Error(NO_PARENT_ERR_MSG);

      const element =
        elementProperties.element ||
        document.createElement(elementProperties.tag);

      applyProps(element, elementProperties);

      if (!elementProperties.element) {
        elementProperties.parent.append(element);
        // eslint-disable-next-line no-param-reassign
        elementProperties.element = element;
      }
      // eslint-disable-next-line no-param-reassign
      elementProperties.element = element;

      return makeHTMLBuilder(elementProperties);
    },

    removeHTMLElement: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      elementProperties.element.remove();
      // eslint-disable-next-line no-param-reassign
      elementProperties.element = null;

      return makeHTMLBuilder(elementProperties);
    },

    removeInnerHTML: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      // eslint-disable-next-line no-param-reassign
      elementProperties.element.innerHTML = "";

      return makeHTMLBuilder(elementProperties);
    },
  };
  return Object.freeze(elementMethods);
};

export default makeHTMLBuilder;
