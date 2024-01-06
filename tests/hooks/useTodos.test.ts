import { renderHook, waitFor, act } from "@testing-library/react";
import { HttpClientMock } from "../__mocks__/httpClient.mock"
import useTodos from "../../src/hooks/useTodos";
import { TodoService } from "../../src/common/services/TodoService";

describe("useTodos", () => {

    const httpClient = new HttpClientMock();
    const mockTodo1 = { text: "mockText1", completed: false, id: "mockId1", userId: "mockUserId1", createdAt: "testData", updatedAt: "testData" }
    const mockTodo2 = { text: "mockText2", completed: false, id: "mockId2", userId: "mockUserId1", createdAt: "testData", updatedAt: "testData" }

    describe("getTodos()", () => {
        it("Should fill the todos state with his response", async () => {
            jest.spyOn(TodoService.prototype, "getTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1, mockTodo2]));

            const { result } = renderHook(() => useTodos(httpClient));

            await waitFor(() => {
                expect(result.current.todos).toEqual([mockTodo1, mockTodo2]);
            });
        });
    });

    describe("addTodo()",() => {
        it.only("Should add a new todo into the state array", async () => {
            const { result } = renderHook(() => useTodos(httpClient));

            const spy = jest.spyOn(TodoService.prototype, "createTodo").mockImplementationOnce(() => Promise.resolve(mockTodo1));

            act(() => result.current.addTodo({text: "mockTodo1"}));

            await waitFor(() => {
                console.log(result.current.todos);
                expect(result.current.todos).toEqual([mockTodo1]);
            });
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
})