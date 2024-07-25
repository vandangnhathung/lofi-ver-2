export const isChildOfElement = (
    child: HTMLElement | null,
    parentClass: string
): boolean => {
    while (child) {
        if (child.classList.contains(parentClass)) {
            return true;
        }
        child = child.parentElement;
    }
    return false;
};