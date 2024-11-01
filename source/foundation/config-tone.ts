import type {ITone} from "../types";

export function lightToneKit(): ITone {
  return {
    id: 'light',
    scheme: 'light',
    text: '#000000',
    tint: '#f7f8fa',
    untint: '#e7ecfc',
    error: '#ff3333',
    warning: '#f9c74f',
    success: '#4BB543',
    black: '#000000',
    white: '#ffffff',
  }
}

export function darkToneKit(): ITone {
  return {
    id: 'dark',
    scheme: 'dark',
    text: '#ffffff',
    tint: '#1F1F1F',
    untint: '#111111',
    error: '#ea5050',
    warning: '#dfbe6d',
    success: '#50a34a',
    black: '#000000',
    white: '#ffffff',
  }
}
