declare module 'predictionary' {
    export interface PredictionaryOptions {
      elementSeparator?: string;
      rankSeparator?: string;
      wordPosition?: number;
      rankPosition?: number;
    }
  
    export interface PredictionaryResult {
      [word: string]: number;
    }

    export interface PredictionaryInstance {
        parseWords: (words: string, options: ParseOptions) => void;
        predict: (input: string, options: PredictionOptions) => string[];
      }
      
      export interface ParseOptions {
        elementSeparator: string;
        rankSeparator: string;
        wordPosition: number;
        rankPosition: number;
      }
      
      export interface PredictionOptions {
        maxPredictions: number;
        applyToInput: boolean;
      }

      
    export function instance(): PredictionaryInstance;
  
    export function parseWords(input: string, options?: PredictionaryOptions): void;
    export function predict(input: string, options?: { maxPredictions?: number; applyToInput?: boolean }): string[];
  }
  