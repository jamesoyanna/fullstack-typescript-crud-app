import {Response, Request} from 'express';
import {ITodo} from '../../types/todos';
import Todo from '../../models/todos';

//  Get all todos
const getTodos = async(req: Request, res: Response): Promise<void> => {
 try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({todos})
 } catch (error) {
    throw error
 }
}

// Add Todo
const addTodo = async(req: Request, res: Response): Promise<void> => {
    try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>
    const todo: ITodo =  new  Todo({
        name: body.name,
        description: body.description,
        status: body.status
    })
    const newTodo: ITodo =  await todo.save()
    const allTodo: ITodo[] = await Todo.find();
    res.status(201).json({message:'Todo added', todo: newTodo, todos: allTodo});
    } catch (error) {
      res.status(500).json({message:'Error adding todo', error})
    }
}

// Update Todo
const updateTodo =  async(req: Request, res: Response): Promise<void> => {
    try {
       const {
        params: {id},
        body,
       }  = req;
       const updateTodo: ITodo | null = await Todo.findOneAndUpdate(
        {_id: id},
        body
       )
       const allTodos: ITodo[] = await Todo.find();
       res.status(200).json({message: 'Todo updated', todo: updateTodo, todos: allTodos })
    } catch (error) {
      throw error  
    }
}

// delete Todo
const deleteTodo  = async (req: Request, res: Response): Promise<void> => {
 try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
    const allTodos = await Todo.find();
    res.status(200).json({message: 'Todo deleted', todo: deletedTodo, todos: allTodos})
 } catch (error) {
    throw error
 }
}

export {getTodos, addTodo, updateTodo, deleteTodo}