function debounce(func: Function, wait: number = 200) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeout);
        // @ts-ignore
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export {
    debounce
}
