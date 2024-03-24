import Predictionary, { PredictionaryInstance } from 'predictionary';
import raw from "./words_en.txt";

export async function getPredictiveSuggestions(txt: string, nrOfSuggestions : number = 1) {
    const predictionary = Predictionary.instance() as PredictionaryInstance;
    const data = await fetch(raw)
    const response = await data.text()
    await predictionary.parseWords(response, {
        elementSeparator: '\n',
        rankSeparator: ' ',
        wordPosition: 2,
        rankPosition: 0,
    });
    const newSuggestions = predictionary.predict(txt, {
        maxPredictions: nrOfSuggestions,
        applyToInput: true,
      });
    return newSuggestions;
}

export const matchCase = (input: string, suggestion: string): string => {
    if (!input || !suggestion) return suggestion;
  
    const sug = suggestion.split('');
    for (let i = 0; i < input.length; i++) {
      if (i < suggestion.length) {
        const inputChar = input[i];
        const suggestionChar = sug[i];
        if (inputChar === inputChar.toLowerCase()) {
          sug[i] = suggestionChar.toLowerCase();
        } else {
          sug[i] = suggestionChar.toUpperCase();
        }
      }
    }
  
    return sug.join('');
  };

  export function getCustomSuggestion(input: string, wordList: string[]) {
    const inputLowerCase = input.toLowerCase();
    return wordList.filter(word => word.toLowerCase().startsWith(inputLowerCase));
  }