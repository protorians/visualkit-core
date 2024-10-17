function debounce(func: Function, wait: number = 200) {
    let timeout: number | undefined = undefined;
    return function (...args: any[]) {
        clearTimeout(timeout);
        // @ts-ignore
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export {
    debounce
}
