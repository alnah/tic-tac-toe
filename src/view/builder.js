/** When using the builder, be sure to set an HTMLElement as a parent. If you
have created an element using buildElement() method, it does not return the 
HTMLElement but the builder itself to get a fluent interface. 
So be sure to use getElement() method to get the HTMLElement after building it.
*/

const NO_NODE_ERR_MSG =
  "Use 'makeHTMLElement' method before attempting to access the HTML element.";

const NO_TAG_ERR_MSG =
  "Use 'setTag' method before attempting to make the HTML element.";

const NO_PARENT_ERR_MSG =
  "Use 'setParent' method before attempting to make the HTML element.";

const validateParent = parent => {
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

const validateTag = validateString("Tag name must be a non-empty string.");

const validateClassName = validateString(
  "Class name must be a non-empty string.",
);

const validateId = validateString("ID name must be a non-empty string.");

const validateTextContent = validateString(
  "Text content must be a non-empty string.",
);

const validateDataAttribute = validateString(
  "Data attribute name must be a non-empty string.",
);

const validateFormAction = validateString(
  "Form action must be a non-empty string.",
);

const validateFormMethod = validateWith(
  "Form method must be one of the following: #, GET, POST, PUT, DELETE.",
  method =>
    ["#", "GET", "POST", "PUT", "DELETE"].includes(method.toUpperCase()),
);

const validateLabelFor = validateString(
  "Label for must be a non-empty string.",
);

const validateInputType = validateString(
  "Input type must be a non-empty string.",
);

const validateInputName = validateString(
  "Input name must be a non-empty string.",
);

const validateInputPlaceholder = validateString(
  "Input placeholder must be a non-empty string.",
);

const validateButtonType = validateString(
  "Button type must be a non-empty string.",
);

export const validateHref = validateString(
  "Href attribute must be a non-empty string.",
);

export const validateTarget = validateString(
  "Target must be a non-empty string.",
);

const buildHTMLElement = (elementProperties = {}) => {
  const updateProps = updates => ({
    ...elementProperties,
    ...updates,
    data: { ...elementProperties.data, ...updates.data },
  });

  const applyGenericProp = (element, key, value) => {
    if (!["tag", "parent", "element"].includes(key)) {
      if (value !== null) {
        // eslint-disable-next-line no-param-reassign
        element[key] = value;
      } else {
        // eslint-disable-next-line no-param-reassign
        delete element[key];
      }
    }
  };

  const updateClassList = (element, classList) => {
    if (Array.isArray(classList)) {
      classList.forEach(className => {
        if (!element.classList.contains(className)) {
          element.classList.add(className);
        }
      });
      Array.from(element.classList).forEach(className => {
        if (!classList.includes(className)) {
          element.classList.remove(className);
        }
      });
    }
  };

  const applyDataAttributes = (element, dataAttributes) => {
    if (typeof dataAttributes === "object") {
      Object.entries(dataAttributes).forEach(([dataKey, dataValue]) => {
        // eslint-disable-next-line no-param-reassign
        element.dataset[dataKey] = dataValue;
      });
    }
  };

  const applyProps = (element, properties) => {
    Object.entries(properties).forEach(([key, value]) => {
      switch (key) {
        case "data":
          applyDataAttributes(element, value);
          break;
        case "classList":
          updateClassList(element, value);
          break;
        default:
          applyGenericProp(element, key, value);
      }
    });
  };

  const elementMethods = {
    getInstance: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      return elementProperties.element;
    },

    makeInstance: () => {
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

      return buildHTMLElement(elementProperties);
    },

    removeInstance: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      elementProperties.element.remove();
      // eslint-disable-next-line no-param-reassign
      elementProperties.element = null;
      return buildHTMLElement(elementProperties);
    },

    getTag: () => elementProperties.tag,

    setTag: tag => {
      validateTag(tag);
      return buildHTMLElement(updateProps({ tag }));
    },

    getParent: () => elementProperties.parent,

    setParent: parent => {
      validateParent(parent);
      return buildHTMLElement(updateProps({ parent }));
    },

    getClasses: () => elementProperties.className,

    addClass: className => {
      validateClassName(className);
      const existingClasses =
        elementProperties.classList ? elementProperties.classList : [];
      const updatedClasses = existingClasses.concat(className).filter(Boolean);

      return buildHTMLElement(updateProps({ classList: updatedClasses }));
    },

    removeClass: className => {
      const existingClasses =
        elementProperties.classList ? elementProperties.classList : [];
      const updatedClasses = existingClasses.filter(c => c !== className && c);

      return buildHTMLElement(updateProps({ classList: updatedClasses }));
    },

    getId: () => elementProperties.id,

    setId: id => {
      validateId(id);
      return buildHTMLElement(updateProps({ id }));
    },

    removeId: () => buildHTMLElement(updateProps({ id: null })),

    getContent: () => elementProperties.textContent,

    setContent: textContent => {
      validateTextContent(textContent);
      return buildHTMLElement(updateProps({ textContent }));
    },

    removeContent: () => buildHTMLElement(updateProps({ textContent: "" })),

    getData: () => elementProperties.data,

    setData: (attribute, value) => {
      validateDataAttribute(attribute);
      return buildHTMLElement(updateProps({ data: { [attribute]: value } }));
    },

    removeData: attribute => {
      const newData = { ...elementProperties.data };
      delete newData[attribute];

      return buildHTMLElement(updateProps({ data: newData }));
    },

    getFormAction: () => elementProperties.action,

    setFormAction: action => {
      validateFormAction(action);
      return buildHTMLElement(updateProps({ action }));
    },

    removeFormAction: () => buildHTMLElement(updateProps({ action: null })),

    getFormMethod: () => elementProperties.method,

    setFormMethod: method => {
      validateFormMethod(method);
      return buildHTMLElement(updateProps({ method }));
    },

    removeFormMethod: () => buildHTMLElement(updateProps({ method: null })),

    getLabelFor: () => elementProperties.htmlFor,

    setLabelFor: htmlFor => {
      validateLabelFor(htmlFor);
      return buildHTMLElement(updateProps({ htmlFor }));
    },

    removeLabelFor: () => buildHTMLElement(updateProps({ htmlFor: null })),

    getInputType: () => elementProperties.type,

    setInputType: type => {
      validateInputType(type);
      return buildHTMLElement(updateProps({ type }));
    },

    removeInputType: () => buildHTMLElement(updateProps({ type: null })),

    getInputName: () => elementProperties.name,

    setInputName: name => {
      validateInputName(name);
      return buildHTMLElement(updateProps({ name }));
    },

    getInputPlaceholder: () => elementProperties.placeholder,

    setInputPlaceholder: placeholder => {
      validateInputPlaceholder(placeholder);
      return buildHTMLElement(updateProps({ placeholder }));
    },

    removeInputPlaceholder: () =>
      buildHTMLElement(updateProps({ placeholder: null })),

    getButtonType: () => elementProperties.type,

    setButtonType: type => {
      validateButtonType(type);
      return buildHTMLElement(updateProps({ type }));
    },

    removeButtonType: () => buildHTMLElement(updateProps({ type: null })),

    getHref: () => elementProperties.href,

    setHref: href => {
      validateHref(href);
      return buildHTMLElement(updateProps({ href }));
    },

    removeHref: () => buildHTMLElement(updateProps({ href: null })),

    getTarget: () => elementProperties.target,

    setTarget: target => {
      validateTarget(target);
      return buildHTMLElement(updateProps({ target }));
    },

    removeTarget: () => buildHTMLElement(updateProps({ target: null })),

    removeInnerHTML: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      // eslint-disable-next-line no-param-reassign
      elementProperties.element.innerHTML = "";

      return buildHTMLElement(elementProperties);
    },
  };
  return Object.freeze(elementMethods);
};

export default buildHTMLElement;
