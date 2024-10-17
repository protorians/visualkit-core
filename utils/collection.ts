export class Collection {

    static next<T>(array: T[], from?: T, loop: boolean = false): T | null {
        return (from)
            ? array[array.indexOf(from) + 1] || (loop ? array[0] || null : null)
            : array[0] || null;
    }

    static refactor<T>(array: T[], from: number, to?: number) {
        const refactor: T[] = [];
        to = to || array.length;

        for (let i = 0; i < array.length; i++) {
            if (from <= i && to >= i) {
                refactor.push(array[i])
            }
        }

        return refactor;
    }

}