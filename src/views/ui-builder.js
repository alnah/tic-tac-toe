/**
 * @module HTMLBuilder
 * Provides functionality for creating and managing HTML elements with a fluent
 * interface for easily setting properties. This module simplifies the process
 * of building and customizing HTML elements by offering a comprehensive set of
 * methods for defining element properties, including tag, parent, classList,
 * id, textContent, data attributes, form action and method, input attributes,
 * href, and target. It supports creating the HTML element, updating its
 * properties, and appending it to its parent, facilitating a more streamlined
 * approach to DOM manipulation.
 *
 * @example
 * Creating a new paragraph element with text content and appending it to body
 * makeHTMLBuilder()
 *   .setTag('p')
 *   .setContent('Hello, world!')
 *   .setParent(document.body)
 *   .makeHTMLElement();
 */

/**
 * Error message indicating the 'makeHTMLElement' method must be called before
 * the current operation.
 */
const NO_NODE_ERR_MSG =
  "Use 'makeHTMLElement' method before attempting to access the HTML element.";

/**
 * Error message indicating the 'setTag' method must be called before the
 * current operation.
 */
const NO_TAG_ERR_MSG =
  "Use 'setTag' method before attempting to make the HTML element.";

/**
 * Error message indicating the 'setParent' method must be called before the
 * current operation.
 */
const NO_PARENT_ERR_MSG =
  "Use 'setParent' method before attempting to make the HTML element.";

/**
 * Validates if the provided parent is an instance of HTMLElement.
 * @param {HTMLElement} parent The parent element to validate.
 * @throws {Error} If the parent is not an instance of HTMLElement.
 */
export const validateParent = parent => {
  if (!(parent instanceof HTMLElement)) {
    throw new Error("Parent must be an instance of HTMLElement.");
  }
};

/**
 * Creates a validator function that checks if a value is a non-empty string.
 * @param {string} errorMessage The error message to throw if validation fails.
 * @returns {Function} A function that takes a value to validate.
 */
const validateString = errorMessage => value => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(errorMessage);
  }
};

/**
 * Creates a validator function that applies a custom validation function to a
 * value.
 * @param {string} errorMessage The error message to throw if validation fails.
 * @param {Function} validationFn The custom validation function to apply.
 * @returns {Function} A function that takes a value to validate.
 */
const validateWith = (errorMessage, validationFn) => value => {
  if (!validationFn(value)) {
    throw new Error(errorMessage);
  }
};

/**
 * Validates that the tag is a non-empty string.
 */
export const validateTag = validateString(
  "Tag name must be a non-empty string.",
);

/**
 * Validates that a class name is a non-empty string.
 */
export const validateClassName = validateString(
  "Class name must be a non-empty string.",
);

/**
 * Validates that the ID is a non-empty string.
 */
export const validateId = validateString(
  "Unique ID name must be a non-empty string.",
);

/**
 * Validates that the text content is a string.
 */
export const validateTextContent = validateString(
  "Text content must be a string.",
);

/**
 * Validates that the data attribute name is a non-empty string.
 */
export const validateDataAttribute = validateString(
  "Data attribute name must be a non-empty string.",
);

/**
 * Validates that the action is a non-empty string.
 */
export const validateFormAction = validateString(
  "Form action must be a non-empty string.",
);

/**
 * Validates that the method is one of the specified HTTP methods.
 */
export const validateFormMethod = validateWith(
  "Form method must be one of the following: #, GET, POST, PUT, DELETE.",
  method =>
    ["#", "GET", "POST", "PUT", "DELETE"].includes(method.toUpperCase()),
);

/**
 * Validates that the for attribute is a non-empty string.
 */
export const validateLabelFor = validateString(
  "Label for must be a non-empty string.",
);

/**
 *  Validates that the type is a non-empty string.
 */
export const validateInputType = validateString(
  "Input type must be a non-empty string.",
);

/**
 * Validates that the name is a non-empty string.
 */
export const validateInputName = validateString(
  "Input name must be a non-empty string.",
);

/**
 * Validates that the placeholder is a non-empty string.
 */
export const validateInputPlaceholder = validateString(
  "Input placeholder must be a non-empty string.",
);

/**
 * Validates that the href is a non-empty string.
 */
export const validateHref = validateString(
  "Href attribute must be a non-empty string.",
);

/**
 * Validates that the target is a non-empty string.
 */
export const validateTarget = validateString(
  "Target must be a non-empty string.",
);

/**
 * Creates an HTML builder for managing element properties and generating HTML
 * elements.
 *
 * The HTML builder provides a fluent interface for setting and updating
 * properties of an HTML element, including its tag, parent, classList, id,
 * textContent, data attributes, form action and method, input attributes, href,
 * and target. It also supports creating the HTML element, updating its
 * properties, and appending it to its parent.
 *
 * @param {Object} elementProperties - Initial properties of the element.
 * Defaults to an empty object.
 * @returns {Object} An object containing methods for managing the element's
 * properties and generating the HTML element, including methods for setting and
 * getting the tag, parent, classList, id, textContent, data attributes, form
 * action and method, input attributes, href, and target:
 * - `getTag()`: returns the tag of the element
 * - `setTag(tag) {string}`: sets the tag of the element after validation
 * - `getParent()`: returns the parent of the element
 * - `setParent(parent) {HTMLElement}`: sets the parent of the element after
 * validation
 * - `getClasses()`: returns the classes of the element
 * - `addClass(className) {string}`: adds a class to the element after validation
 * - `removeClass(className) {string}`: removes a class from the element
 * - `getId()`: returns the ID of the element
 * - `setId(id) {string}`: sets the ID of the element after validation
 * - `removeId()`: removes the ID from the element
 * - `getContent()`: returns the text content of the element
 * - `setContent(textContent) {string}`: sets the text content of the element
 * after validation
 * - `removeContent()`: removes the text content of the element
 * - `getData()`: returns the data attributes of the element
 * - `setData(data) {Object}`: sets a data attribute of the element
 * - `removeData(dataKey) {string}`: removes a data attribute of the element
 * - `getFormAction()`: returns the form action of the element
 * - `setFormAction(formAction) {string}`: sets the form action of the element
 * after validation
 * - `removeFormAction()`: removes the form action of the element
 * - `getFormMethod()`: returns the form method of the element
 * - `setFormMethod(formMethod) {string}`: sets the form method of the element
 * after validation
 * - `removeFormMethod()`: removes the form method of the element
 * - `getLabelFor()`: returns the htmlFor attribute of the element
 * - `setLabelFor(labelFor) {string}`: sets the htmlFor attribute of the element
 * after validation
 * - `removeLabelFor()`: removes the htmlFor attribute of the element
 * - `getInputType()`: returns the type attribute of the input element
 * - `setInputType(inputType) {string}`: sets the type attribute of the input
 * element after validation
 * - `getInputName()`: returns the name attribute of the input element
 * - `setInputName(inputName) {string}`: sets the name attribute of the input
 * element after validation
 * - `removeInputName()`: removes the name attribute of the input element
 * - `getInputPlaceholder()`: returns the placeholder attribute of the input
 * element
 * - `setInputPlaceholder(inputPlaceholder) {string}`: sets the placeholder
 * attribute of the input element after validation
 * - `removeInputPlaceholder()`: removes the placeholder attribute of the input
 * element
 * - `getHref()`: returns the href attribute of the element
 * - `setHref(href) {string}`: sets the href attribute of the element after
 * validation
 * - `removeHref()`: removes the href attribute of the element
 * - `getTarget()`: returns the target attribute of the element
 * - `setTarget(target) {string}`: sets the target attribute of the element
 * after validation
 * - `removeTarget()`: removes the target attribute of the element
 * - `getHTMLElement()`: returns the HTML element
 * - `makeHTMLElement()`: creates the HTML element
 * - `removeHTMLElement()`: removes the HTML element
 * - `removeInnerHTML()`: removes the inner HTML of the element
 */
const makeHTMLBuilder = (elementProperties = {}) => {
  /**
   * Updates the element properties with the provided updates.
   *
   * @param {Object} updates - The updates to apply to the element properties.
   * @returns {Object} The updated element properties.
   */
  const updateProps = updates => ({
    ...elementProperties,
    ...updates,
    data: { ...elementProperties.data, ...updates.data },
  });

  /**
   * Applies the provided properties to the given element.
   *
   * @param {HTMLElement} element - The HTML element to apply properties to.
   * @param {Object} properties - The properties to apply to the element.
   */
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
    /**
     * Gets the tag of the element.
     *
     * @returns {string} The tag of the element.
     */
    getTag: () => elementProperties.tag,

    /**
     * Sets the tag of the element after validation.
     *
     * @param {string} tag - The tag to set for the element.
     * @returns {Object} A new HTML builder with the updated tag.
     */
    setTag: tag => {
      validateTag(tag);
      return makeHTMLBuilder(updateProps({ tag }));
    },

    /**
     * Gets the parent of the element.
     *
     * @returns {Object} The parent element.
     */
    getParent: () => elementProperties.parent,

    /**
     * Sets the parent of the element after validation.
     *
     * @param {Object} parent - The parent element to set.
     * @returns {Object} A new HTML builder with the updated parent.
     */
    setParent: parent => {
      validateParent(parent);
      return makeHTMLBuilder(updateProps({ parent }));
    },

    /**
     * Gets the classes of the element.
     *
     * @returns {Array} The array of classes.
     */
    getClasses: () => elementProperties.className,

    /**
     * Adds a class to the element after validation.
     *
     * @param {string} className - The class to add.
     * @returns {Object} A new HTML builder with the updated classes.
     */
    addClass: className => {
      validateClassName(className);
      const existingClasses =
        elementProperties.classList ? elementProperties.classList : [];
      const updatedClasses = existingClasses.concat(className).filter(Boolean);

      return makeHTMLBuilder(updateProps({ classList: updatedClasses }));
    },

    /**
     * Removes a class from the element.
     *
     * @param {string} className - The class to remove.
     * @returns {Object} A new HTML builder with the updated classes.
     */
    removeClass: className => {
      const existingClasses =
        elementProperties.classList ? elementProperties.classList : [];
      const updatedClasses = existingClasses.filter(c => c !== className && c);

      return makeHTMLBuilder(updateProps({ classList: updatedClasses }));
    },

    /**
     * Gets the ID of the element.
     *
     * @returns {string} The ID of the element.
     */
    getId: () => elementProperties.id,

    /**
     * Sets the ID of the element after validation.
     *
     * @param {string} id - The ID to set for the element.
     * @returns {Object} A new HTML builder with the updated ID.
     */
    setId: id => {
      validateId(id);
      return makeHTMLBuilder(updateProps({ id }));
    },

    /**
     * Removes the ID from the element.
     *
     * @returns {Object} A new HTML builder with the ID removed.
     */
    removeId: () => makeHTMLBuilder(updateProps({ id: null })),

    /**
     * Gets the text content of the element.
     *
     * @returns {string} The text content of the element.
     */
    getContent: () => elementProperties.textContent,

    /**
     * Sets the text content of the element after validation.
     *
     * @param {string} textContent - The text content to set.
     * @returns {Object} A new HTML builder with the updated text content.
     */
    setContent: textContent => {
      validateTextContent(textContent);
      return makeHTMLBuilder(updateProps({ textContent }));
    },

    /**
     * Removes the text content from the element.
     *
     * @returns {Object} A new HTML builder with the text content removed.
     */
    removeContent: () => makeHTMLBuilder(updateProps({ textContent: "" })),

    /**
     * Gets the data attributes of the element.
     *
     * @returns {Object} The data attributes of the element.
     */
    getData: () => elementProperties.data,

    /**
     * Sets a data attribute for the element after validation.
     *
     * @param {string} attribute - The attribute to set.
     * @param {any} value - The value of the attribute.
     * @returns {Object} A new HTML builder with the updated data attribute.
     */
    setData: (attribute, value) => {
      validateDataAttribute(attribute);
      return makeHTMLBuilder(updateProps({ data: { [attribute]: value } }));
    },

    /**
     * Removes a data attribute from the element.
     *
     * @param {string} attribute - The attribute to remove.
     * @returns {Object} A new HTML builder with the data attribute removed.
     */
    removeData: attribute => {
      const newData = { ...elementProperties.data };
      delete newData[attribute];

      return makeHTMLBuilder(updateProps({ data: newData }));
    },

    /**
     * Gets the form action of the element.
     *
     * @returns {string} The form action of the element.
     */
    getFormAction: () => elementProperties.action,

    /**
     * Sets the form action of the element after validation.
     *
     * @param {string} action - The form action to set.
     * @returns {Object} A new HTML builder with the updated form action.
     */
    setFormAction: action => {
      validateFormAction(action);
      return makeHTMLBuilder(updateProps({ action }));
    },

    /**
     * Removes the form action from the element.
     *
     * @returns {Object} A new HTML builder with the form action removed.
     */
    removeFormAction: () => makeHTMLBuilder(updateProps({ action: null })),

    /**
     * Gets the form method of the element.
     *
     * @returns {string} The form method of the element.
     */
    getFormMethod: () => elementProperties.method,

    /**
     * Sets the form method of the element after validation.
     *
     * @param {string} method - The form method to set.
     * @returns {Object} A new HTML builder with the updated form method.
     */
    setFormMethod: method => {
      validateFormMethod(method);
      return makeHTMLBuilder(updateProps({ method }));
    },

    /**
     * Removes the form method from the element.
     *
     * @returns {Object} A new HTML builder with the form method removed.
     */
    removeFormMethod: () => makeHTMLBuilder(updateProps({ method: null })),

    /**
     * Gets the htmlFor attribute of the element.
     *
     * @returns {string} The htmlFor attribute of the element.
     */
    getLabelFor: () => elementProperties.htmlFor,

    /**
     * Sets the htmlFor attribute of the element after validation.
     *
     * @param {string} htmlFor - The htmlFor attribute to set.
     * @returns {Object} A new HTML builder with the updated htmlFor attribute.
     */
    setLabelFor: htmlFor => {
      validateLabelFor(htmlFor);
      return makeHTMLBuilder(updateProps({ htmlFor }));
    },

    /**
     * Removes the htmlFor attribute from the element.
     *
     * @returns {Object} A new HTML builder with the htmlFor attribute removed.
     */
    removeLabelFor: () => makeHTMLBuilder(updateProps({ htmlFor: null })),

    /**
     * Gets the type attribute of the input element.
     *
     * @returns {string} The type attribute of the input element.
     */
    getInputType: () => elementProperties.type,

    /**
     * Sets the type attribute of the input element after validation.
     *
     * @param {string} type - The type attribute to set.
     * @returns {Object} A new HTML builder with the updated type attribute.
     */
    setInputType: type => {
      validateInputType(type);
      return makeHTMLBuilder(updateProps({ type }));
    },

    /**
     * Removes the type attribute from the input element.
     *
     * @returns {Object} A new HTML builder with the type attribute removed.
     */
    removeInputType: () => makeHTMLBuilder(updateProps({ type: null })),

    /**
     * Gets the name attribute of the input element.
     *
     * @returns {string} The name attribute of the input element.
     */
    getInputName: () => elementProperties.name,

    /**
     * Sets the name attribute of the input element after validation.
     *
     * @param {string} name - The name attribute to set.
     * @returns {Object} A new HTML builder with the updated name attribute.
     */
    setInputName: name => {
      validateInputName(name);
      return makeHTMLBuilder(updateProps({ name }));
    },

    /**
     * Removes the name attribute from the input element.
     *
     * @returns {Object} A new HTML builder with the name attribute removed.
     */
    removeInputName: () => makeHTMLBuilder(updateProps({ name: null })),

    /**
     * Gets the placeholder attribute of the input element.
     *
     * @returns {string} The placeholder attribute of the input element.
     */
    getInputPlaceholder: () => elementProperties.placeholder,

    /**
     * Sets the placeholder attribute of the input element after validation.
     *
     * @param {string} placeholder - The placeholder attribute to set.
     * @returns {Object} A new HTML builder with the updated placeholder
     * attribute.
     */
    setInputPlaceholder: placeholder => {
      validateInputPlaceholder(placeholder);
      return makeHTMLBuilder(updateProps({ placeholder }));
    },

    /**
     * Removes the placeholder attribute from the input element.
     *
     * @returns {Object} A new HTML builder with the placeholder attribute
     * removed.
     */
    removeInputPlaceholder: () =>
      makeHTMLBuilder(updateProps({ placeholder: null })),

    /**
     * Gets the href attribute of the element.
     *
     * @returns {string} The href attribute of the element.
     */
    getHref: () => elementProperties.href,

    /**
     * Sets the href attribute of the element after validation.
     *
     * @param {string} href - The href attribute to set.
     * @returns {Object} A new HTML builder with the updated href attribute.
     */
    setHref: href => {
      validateHref(href);
      return makeHTMLBuilder(updateProps({ href }));
    },

    /**
     * Removes the href attribute from the element.
     *
     * @returns {Object} A new HTML builder with the href attribute removed.
     */
    removeHref: () => makeHTMLBuilder(updateProps({ href: null })),

    /**
     * Gets the target attribute of the element.
     *
     * @returns {string} The target attribute of the element.
     */
    getTarget: () => elementProperties.target,

    /**
     * Sets the target attribute of the element after validation.
     *
     * @param {string} target - The target attribute to set.
     * @returns {Object} A new HTML builder with the updated target attribute.
     */
    setTarget: target => {
      validateTarget(target);
      return makeHTMLBuilder(updateProps({ target }));
    },

    /**
     * Removes the target attribute from the element.
     *
     * @returns {Object} A new HTML builder with the target attribute removed.
     */
    removeTarget: () => makeHTMLBuilder(updateProps({ target: null })),

    /**
     * Gets the HTML element.
     *
     * @returns {HTMLElement} The HTML element.
     */
    getHTMLElement: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      return elementProperties.element;
    },

    /**
     * Creates and returns the HTML element based on the current properties.
     *
     * @returns {Object} A new HTML builder with the created HTML element.
     */
    makeHTMLElement: () => {
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

    /**
     * Removes the HTML element from the DOM.
     *
     * @returns {Object} A new HTML builder with the HTML element removed.
     */
    removeHTMLElement: () => {
      if (!elementProperties.element) throw new Error(NO_NODE_ERR_MSG);
      elementProperties.element.remove();
      // eslint-disable-next-line no-param-reassign
      elementProperties.element = null;

      return makeHTMLBuilder(elementProperties);
    },

    /**
     * Clears the innerHTML of the element.
     *
     * @returns {Object} A new HTML builder with the innerHTML cleared.
     */
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
