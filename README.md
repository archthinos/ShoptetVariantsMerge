# JavaScript Refactoring Project

This project includes a refactored JavaScript script designed to enhance the functionality and efficiency of a web application that deals with product variants. Below, each function within the script is explained in detail.

## Functions Description

### `extractSelectData()`
This function extracts data from select elements within a table with the class 'detail-parameters'. It creates an object containing details about each select element, including the parameter ID, parameter name, and variants. This data is used to manage and display product variants effectively.

#### Key Features:
- Extracts data attributes (`parameterId`, `parameterName`) from each select element.
- Collects options with a specific `data-index` attribute and maps them into an array of variant objects.

### `getElementText(baseClass, childClass)`
A utility function designed to fetch and return text content from a specified DOM element. It enhances code reusability by combining the functionality of what were previously separate functions for fetching availability and price texts.

#### Key Features:
- Accepts two arguments: `baseClass` (class of the parent element) and `childClass` (class of the target child element).
- Iterates over elements with `baseClass`, fetching the text content of the first found child element with `childClass`.

### `convertToVariantCombination(input)`
This function processes a string input (usually representing a variant combination) and formats it into a specific pattern. It's used to handle variant combinations represented in the URL or other string formats.

#### Key Features:
- Splits the input string into key-value pairs and transforms them into a standardized variant combination format.

### `updateOriginalSelects(selectedVariantCombination)`
Updates the CSS classes of various elements based on the selected variant combination. This function is crucial for dynamically updating the display of variant-dependent information on the webpage.

#### Key Features:
- Adds or removes CSS classes to/from elements based on whether their class list contains the `selectedVariantCombination`.

### `generateNewSelect(variantsData, availableVariants)`
Generates a new select element based on the available variants and their data. This function is key to dynamically creating user-selectable variant options on the page.

#### Key Features:
- Dynamically creates option elements for each available variant.
- Attaches event listeners to handle changes in selection.

### `updatePage()`
The main function that orchestrates the updating of the webpage when the script is loaded. It calls other functions to extract variant data, generate a new select element, and update the page's DOM elements accordingly.

#### Key Features:
- Retrieves variant data and available variants.
- Calls `generateNewSelect` to create a new select element.
- Hides original select elements and updates the DOM with new elements.

### Screenshots
Before :
![image](https://github.com/archthinos/ShoptetVariantsMerge/assets/27582579/b0c18597-0f24-438e-9d6a-d8f7ac6df4bc)

After : 
![image](https://github.com/archthinos/ShoptetVariantsMerge/assets/27582579/abc6ccf2-e051-46b1-a511-917014303388)


## Conclusion
This script is a comprehensive solution for managing product variants in a web application. Each function is designed to perform specific tasks efficiently, ensuring a smooth user experience while interacting with product variants. The script is an example of how complex functionalities can be managed through well-structured and clean JavaScript code.
