export const isChildOfElement = (
    element: HTMLElement | null,
    parentClass: string
): boolean => {
    while (element) {
        if (element.classList.contains(parentClass)) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
};

export const shuffle = <T, >(a: T[]): T[] => {
    let j: number, x: T, i: number;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};
