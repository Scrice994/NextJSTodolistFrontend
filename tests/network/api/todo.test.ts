import { createTodo, deleteTodo, getTodos, updateTodo } from "../../../src/network/api/todo";
import * as testUtils from "../mongoTestUtils";

describe("unit", () => {
    describe("api", () => {
        describe("todo", () => {

            beforeAll(async () => {
                await testUtils.databaseConnection();
            });
     
             beforeEach(async () => {
                await testUtils.clearDB();
            });
     
             afterAll(async () => {
                await testUtils.clearDB();
                await testUtils.closeDatabaseConnection();
            });

            describe("createTodo()", () => {
                it("Should create a new todo", async () => {
                    const response = await createTodo({text: 'testText', userId: 'testUserId'});

                    expect(response).toEqual({...response, text: 'testText', completed: false, userId: 'testUserId'});
                });
            });

            describe("deleteTodo()", () => {
                it("Should delete the given todo",async () => {
                    const newTodo = await createTodo({text: 'testText', userId: 'testUserId'});

                    const deletedTodo = await deleteTodo(newTodo.id);

                    const findTodo = await getTodos();

                    expect(deletedTodo).toEqual(newTodo);
                    expect(findTodo).toEqual([]);
                });
            });

            describe("updateTodo()", () => {
                it("Should check or uncheck the given todo",async () => {
                    const newTodo = await createTodo({text: 'testText', userId: 'testUserId'});

                    const completedTodo = await updateTodo({id: newTodo.id, completed: true});

                    expect(completedTodo).toEqual({ ...newTodo, completed: true, updatedAt: completedTodo.updatedAt })
                })
            });
        });
    });
});