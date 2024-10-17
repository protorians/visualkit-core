export function $<T extends HTMLElement>(selector: string, doc: HTMLElement | undefined = undefined): T[] {
  return [...(doc || document).querySelectorAll<T>(selector)];
}