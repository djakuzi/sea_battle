import { JSX, useCallback, useState } from "react";

export type TypeListJsxElement<T extends string = string> = Record<T, JSX.Element | (() => JSX.Element)>;

export interface IntrUseListElement<T extends string> {
    jsxElement: JSX.Element | null;
    setJSXByName: (name: T) => void;
    resetJSX: () => void;
}

export function useListJSXElement<T extends string>(list: TypeListJsxElement<T>): IntrUseListElement<T> {
    const [jsxElement, setJsxElement] = useState<JSX.Element | null>(null);

    const setJSXByName = useCallback((name: T): void => {
        const jsx = list[name];

        if (!name || !jsx) {
            console.warn('Некорректный "name" интерфейса');
            setJsxElement(null);
            return;
        }

        setJsxElement(jsx);
    }, [list]);

    const resetJSX = useCallback((): void => {
        setJsxElement(null);
    }, []);

    return {
        jsxElement,
        setJSXByName,
        resetJSX,
    };
}