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