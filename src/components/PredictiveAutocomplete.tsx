import React, { useState, useEffect, useRef } from 'react';
import Predictionary, { PredictionaryInstance } from 'predictionary';
import raw from "./words_en.txt"
import { getCustomSuggestion, matchCase } from './PredictiveMethods';
interface PredictiveAutocompleteProps {
  inPlaceSuggest?: boolean;
  dropdownSuggest?: boolean;
  nrOfSuggestions?: number;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  suggestionListStyle?: React.CSSProperties;
  suggestionListItemStyle?: React.CSSProperties;
  suggestionListClassName?: string;
  suggestionListItemClassName?: string;
  customDictionaryWords?: string[];
}

const PredictiveAutocomplete: React.FC<PredictiveAutocompleteProps> = ({
  inPlaceSuggest = true,
  dropdownSuggest = false,
  nrOfSuggestions = 1,
  inputClassName = '',
  inputStyle = {},
  suggestionListStyle = {},
  suggestionListItemStyle = {},
  suggestionListClassName = '',
  suggestionListItemClassName = '',
  customDictionaryWords = [],
}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [predictionIndex, setPredictionIndex] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState<string>('');
  const predictionary = useRef(Predictionary.instance() as PredictionaryInstance);
  useEffect(() => {
    if(customDictionaryWords.length !== 0) {
      fetch(raw)
      .then((response) => response.text())
      .then((data) => {
        predictionary.current.parseWords(data, {
          elementSeparator: '\n',
          rankSeparator: ' ',
          wordPosition: 2,
          rankPosition: 0,
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateText = (txt: string) => {
    setInput(txt);
    if(customDictionaryWords.length) {
      const words: string[] = txt.split(" ");
      const triePrefix: string = words[words.length - 1].toLowerCase();
      const foundWords: string[] = getCustomSuggestion(txt, customDictionaryWords);
      const firstWord: string | undefined = foundWords[0];
      console.log(foundWords)
      setSuggestions(foundWords)
      setPredictionIndex(0)
      if (
        foundWords.length !== 0 &&
        txt.trim() !== ''
      ) {
        if (firstWord != null) {
          const remainder: string = firstWord.slice(triePrefix.length);
          setSuggestion(txt + remainder);
        }
      } else {
        setSuggestion(txt);
      }
    } else {
      setTimeout(() => {
        if(txt.length) {
          const newSuggestions = predictionary.current.predict(txt, {
            maxPredictions: nrOfSuggestions,
            applyToInput: true,
          });
          setSuggestions(newSuggestions.length === 1 ? [] : newSuggestions);
          setSuggestion(newSuggestions.length ? matchCase(txt,newSuggestions[0]) : '')
          setPredictionIndex(newSuggestions.length ? 0 : null);
        } else {
          setSuggestions([])
          setSuggestion(txt);
        }
      }, 300);
    }
  };



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowRight' && predictionIndex !== null) {
      setInput(suggestion ?? '');
      setSuggestions([])
    }
  };

  return (
    <div style={{ width: "20rem"}}>
      <input
        key={'search-bar'}
        type="text"
        value={input}
        name="search-bar"
        id="search-bar"
        className={inputClassName}
        style={inputStyle}
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete='off'
        placeholder={predictionIndex !== null ? suggestions[predictionIndex] : ''}
      />
      {inPlaceSuggest && <input
        type="text"
        readOnly
        key={'search-bar2'}
        name="search-bar"
        id="search-bar2"
        style={inputStyle}
        className={inputClassName}
        autoComplete='off'
        value={suggestion}
      />}
      {(dropdownSuggest && suggestions.length) ? <ul style={suggestionListStyle} className={suggestionListClassName}>
        {suggestions.map((suggest, index) => (
          <li key={suggest}
          style={suggestionListItemStyle}
          className={suggestionListItemClassName}
          onClick={() => {setPredictionIndex(index); setInput(suggestions[index]); setSuggestions([]); setSuggestion('')}}>
            {suggest}
          </li>
        ))}
      </ul> : ''}
    </div>
  );
};


export default PredictiveAutocomplete;
