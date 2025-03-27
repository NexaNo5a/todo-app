
import {useDispatch, useSelector} from "react-redux";

import {updateTodo} from "../api/todoApi";
import {revertCompleteStatus, toggleCompleteStatus, updateTodo as updateTodoAction} from "../store/todoSlice";
import {openItem} from "../store/modalSlice";
export function useToggleTodo() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    return async (todo) => {
        const updatedCompleted = !todo.completed;
        dispatch(toggleCompleteStatus(todo._id));

        try {
            const response = await updateTodo(todo._id, token, { completed: updatedCompleted });
            dispatch(updateTodoAction(response));
            console.log('update completed status success!')
            //dispatch(openItem(response));
        } catch (err) {
            dispatch(revertCompleteStatus(todo._id));
        }
    };
}