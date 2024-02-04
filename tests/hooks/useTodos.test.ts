// import { renderHook, waitFor } from "@testing-library/react";
// import { TodoService } from "../../src/common/services/TodoService";
// import useTodos from "../../src/hooks/useTodos";
// import { HttpClientMock } from "../__mocks__/httpClient.mock";
// import { act } from "react-dom/test-utils";

// describe("useTodos", () => {

//     const httpClient = new HttpClientMock();
//     const mockTodo1 = { text: "mockText1", completed: false, id: "mockId1", userId: "mockUserId1", createdAt: "testData", updatedAt: "testData" }
//     const mockTodo2 = { text: "mockText2", completed: false, id: "mockId2", userId: "mockUserId1", createdAt: "testData", updatedAt: "testData" }

//     describe("getTodos()", () => {
//         it("Should update the state filling the todos array", async () => {
//             jest.spyOn(TodoService.prototype, "getTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1, mockTodo2]));
//             const { result } = renderHook(() => useTodos(httpClient));

//             await waitFor(() => {
//                 expect(result.current.todos).toEqual([mockTodo1, mockTodo2]);
//             });
//         });
//     });

//     describe("addTodo()",() => {
//         it("Should update the state adding a new todo into the todos array", async () => {
//             const { result } = renderHook(() => useTodos(httpClient));

//             const mockTodo3 = { text: "mockText3", completed: false, id: "mockId3", userId: "mockUserId1", createdAt: "testData", updatedAt: "testData" };
//             const spy = jest.spyOn(TodoService.prototype, "createTodo").mockImplementationOnce(() => Promise.resolve(mockTodo3));

//             await act(() => result.current.addTodo({text: "mockText3"}))

//             await waitFor(() => {
//                 expect(result.current.todos).toEqual([mockTodo3]);
//             });
//             expect(spy).toHaveBeenCalledTimes(1);
//         });
//     });

//     describe("deleteTodo()", () => {
//         it("Should update the state removing the todo with the given id from the todos array", async () => {
//             jest.spyOn(TodoService.prototype, "getTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1, mockTodo2]));

//             const { result } = renderHook(() => useTodos(httpClient));

//             const spy = jest.spyOn(TodoService.prototype, "deleteTodo").mockImplementationOnce(() => Promise.resolve(mockTodo1));

//             await act(() => result.current.deleteTodo(mockTodo2.id));

//             await waitFor(() => {
//                 expect(result.current.todos).toEqual([mockTodo1]);
//             });
//             expect(spy).toHaveBeenCalledTimes(1);
//         });
//     });

//     describe("deleteAllTodos()", () => {
//         it("Should update the state removing all todos from the array", async () => {
//             jest.spyOn(TodoService.prototype, "getTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1, mockTodo2]));

//             const { result } = renderHook(() => useTodos(httpClient));

//             const spy = jest.spyOn(TodoService.prototype, "deleteTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1, mockTodo2]));

//             await act(() => result.current.deleteAllTodos());

//             await waitFor(() => {
//                 expect(result.current.todos).toEqual([]);
//             });
//             expect(spy).toHaveBeenCalledTimes(1);
//         });
//     });

//     describe("checkTodo()", () => {
//         it("Should update the state updating the completed key of given todo",async () => {
//             jest.spyOn(TodoService.prototype, "getTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1]));

//             const { result } = renderHook(() => useTodos(httpClient));

//             const spy = jest.spyOn(TodoService.prototype, "updateTodo").mockImplementationOnce(() => Promise.resolve({ ...mockTodo1, completed: true }));

//             await act(() => result.current.checkTodo(mockTodo1));

//             await waitFor(() => {
//                 expect(result.current.todos).toEqual([{...mockTodo1, completed: true}]);
//             });
//             expect(spy).toHaveBeenCalledTimes(1);
//         });
//     });

//     describe("udpateTodo()", () => {
//         it("Should update the state updating the text and description keys of the todo with the given id", async () => {
//             jest.spyOn(TodoService.prototype, "getTodos").mockImplementationOnce(() => Promise.resolve([mockTodo1]));

//             const { result } = renderHook(() => useTodos(httpClient));

//             const spy = jest.spyOn(TodoService.prototype, "updateTodo").mockImplementationOnce(() => Promise.resolve({ ...mockTodo1, text: "newText", description: "newDescription" }));

//             await act(() => result.current.changeTodo(mockTodo1.id, { text: "newText", description: "newDescription" }));

//             await waitFor(() => {
//                 expect(result.current.todos).toEqual([{...mockTodo1, text: "newText", description: "newDescription" }]);
//             });
//             expect(spy).toHaveBeenCalledTimes(1);
//         });
//     });
// })

describe("", () => {
    it("", () => {})
})