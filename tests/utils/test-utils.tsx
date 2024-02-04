import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore, type RootState } from "@/lib/store";
import TodolistModalsProvider from "../../src/context/TodolistModalsProvider";
import AuthModalsProvider from "../../src/context/AuthModalsProvider";


interface ExtendedRenderOptions extends Omit<RenderOptions, "queries">{
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = makeStore(),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <AuthModalsProvider>
                <TodolistModalsProvider>
                    <Provider store={store}>{children}</Provider>
                </TodolistModalsProvider>
            </AuthModalsProvider>
        )
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}