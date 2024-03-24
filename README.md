# Smart Autocomplete for React

Smart Predictive Autocomplete is a React component that provides predictive text suggestions as the user types into an input field. It utilizes the Predictionary library to suggest words based on the input. You can also use your own custom list of words for prediction.

## Installation

You can install the Smart Autocomplete component via npm:

```bash
npm install react-smart-autocomplete
```

# Usage
```jsx
import React from 'react';
import SmartAutocomplete from 'react-smart-autocomplete';

const MyComponent = () => {
  return (
    <div>
      <SmartAutocomplete />
    </div>
  );
};

export default MyComponent;
```

## Props

- `inPlaceSuggest`: (Optional) Show suggested text in the input field. Default: `true`.
- `dropdownSuggest`: (Optional) Show suggested text in a dropdown below the input field. Default: `false`.
- `nrOfSuggestions`: (Optional) Number of suggestions to display. Default: `1`.
- `inputClassName`: (Optional) CSS class name for the input field.
- `inputStyle`: (Optional) Inline CSS styles for the input field.
- `suggestionListStyle`: (Optional) Inline CSS styles for the suggestion list.
- `suggestionListItemStyle`: (Optional) Inline CSS styles for suggestion list items.
- `suggestionListClassName`: (Optional) CSS class name for the suggestion list.
- `suggestionListItemClassName`: (Optional) CSS class name for suggestion list items.
- `customDictionaryWords`: (Optional) Array of custom words for autocomplete.

## Methods

### getPredictiveSuggestions

```typescript
import { getPredictiveSuggestions } from 'react-smart-autocomplete';

// Example usage:
const suggestions = await getPredictiveSuggestions('input', 5); // Retrieves 5 predictive suggestions based on input
```

### getCustomSuggestion

```typescript
import { getCustomSuggestion } from 'react-smart-autocomplete';
// Example usage:
const customSuggestions = getCustomSuggestion('input', ['suggestion1', 'suggestion2']); // Filters custom suggestions based on input
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to modify this code snippet to fit your project's specific details and preferences.