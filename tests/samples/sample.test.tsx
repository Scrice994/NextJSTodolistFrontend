import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { HttpResponse, delay, http } from "msw";
import { setupServer } from "msw/node";
import Todolist from "../../src/components/todolist/Todolist";
import { renderWithProviders } from "../utils/test-utils";

export const handlers = [
    http.get("http://localhost:8080/todos", ({ request }) => {
        console.log('Handler', request.method, request.url)
        return HttpResponse.json([
            { id: "todoId1", text: "testTodo1", completed: false, userId: "testUserid" },
            { id: "todoId2", text: "testTodo2", completed: false, userId: "testUserid" },
            { id: "todoId3", text: "testTodo3", completed: false, userId: "testUserid" }
        ], { status: 200 })
    }),
    http.get("http://localhost:8080/users/me", async () => {
        return HttpResponse.json({
            id: "testUserId",
            username: "testUsername",
            email: "testEmail@gmail.com",
            userRole: "Admin",
            status: "Active",
        })
    })
]


const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("sampleTest", () => {

    it("Should render a list of todos", async () => {
        renderWithProviders(<Todolist />)

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        
        expect(await screen.findByText(/testTodo1/i)).toBeInTheDocument();
        expect(await screen.findByText(/testTodo2/i)).toBeInTheDocument();
    
    });
});

