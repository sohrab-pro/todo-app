import "./App.css";
import { React, useState, useReducer } from "react";

const taskActions = {
	ADD: "ADD",
	COMPLETE: "COMPLETE",
	DELETE: "DELETE",
};

const noteReducer = (state, action) => {
	switch (action.type) {
		case taskActions.ADD:
			const newNote = { id: Date.now(), task: action.note, isCompleted: false };
			return [...state, newNote];
		case taskActions.COMPLETE:
			return state.map((todo) => {
				if (todo.id === action.note.id) {
					return { ...todo, isCompleted: !todo.isCompleted };
				}
				return todo;
			});
		case taskActions.DELETE:
			return state.filter((item) => item.id !== action.note.id);
		default:
			return state;
	}
};

function App() {
	const [note, setNote] = useState("");
	const [tasks, tasksDispatch] = useReducer(noteReducer, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		tasksDispatch({ type: taskActions.ADD, note: note });
		setNote("");
	};

	const noteAction = (type, item_id) => {
		const task = tasks.filter((item) => item.id === item_id)[0];
		switch (type) {
			case "toggle":
				tasksDispatch({ type: taskActions.COMPLETE, note: task });
				break;
			case "delete":
				tasksDispatch({ type: taskActions.DELETE, note: task });
				break;
			default:
				break;
		}
	};

	return (
		<div
			style={{ backgroundColor: "#3333" }}
			className="h-auto w-1/2 mx-auto mt-5 p-5 rounded-lg">
			<h3 className="mb-2">Note Taking App</h3>
			<form onSubmit={handleSubmit}>
				<input
					value={note}
					type="text"
					className="w-full p-3"
					onChange={(e) => setNote(e.target.value)}
				/>
			</form>

			<ol>
				{tasks.map((item) => (
					<li className="flex py-2" key={item.id}>
						{item.task}
						<button
							onClick={() => noteAction("toggle", item.id)}
							className="mx-3 py-1 px-2 bg-blue-500 rounded-lg">
							{item.isCompleted ? "Incompleted" : "Completed"}
						</button>
						<button
							onClick={() => noteAction("delete", item.id)}
							className="mx-3 py-1 px-2 bg-blue-500 rounded-lg">
							Delete
						</button>
					</li>
				))}
			</ol>
		</div>
	);
}

export default App;
