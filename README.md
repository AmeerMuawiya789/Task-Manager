# React Task Manager — Beginner Project

## Flowday dashboard redesign

This version uses an original productivity-dashboard design with a dark
workspace sidebar, live focus score, overview statistics, task search, animated
progress, responsive mobile layout, and redesigned authentication screens.
It keeps separate local task data for every account.

## Dashboard and account features

- Animated, full-screen responsive dashboard
- Sign Up, Login, and Log Out controls
- A separate saved task list for every local account
- All, Active, and Completed task filters
- Dashboard totals and animated completion progress

This beginner project demonstrates authentication with browser localStorage. It
is suitable for learning and local testing, but not secure enough for a real
public website because account details are stored in the browser. Production
authentication requires a backend service such as Firebase or Supabase.

This full-screen animated project teaches components, JSX, props, state, events, forms, lists, keys, conditional rendering, `map()`, `filter()`, `useEffect`, browser `localStorage`, dynamic styles, responsive CSS, and CSS animation. The page starts empty for a new user, and created tasks remain after refresh or reopening the browser.

## Run the project

Open the project folder in VS Code. Then open **Terminal > New Terminal** and run:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, normally `http://localhost:5173`.

To stop the server, press `Ctrl + C` in the terminal.

## Study the files in this order

1. `src/main.jsx` starts React and displays `<App />`.
2. `src/App.jsx` stores the tasks and contains the main functions.
3. `src/components/TaskForm.jsx` adds a new task.
4. `src/components/TaskList.jsx` uses `map()` to display tasks.
5. `src/components/TaskItem.jsx` completes and deletes one task.
6. `src/index.css` controls the design.

## Important React lessons

### 1. Component

A component is a function that returns JSX:

```jsx
function Welcome() {
  return <h1>Hello!</h1>;
}
```

### 2. State

`useState` stores changing information:

```jsx
const [tasks, setTasks] = useState([]);
```

- `tasks` is the current value.
- `setTasks` changes it.
- `[]` is its starting value.

### 3. Props

The parent sends information to a child:

```jsx
<TaskList tasks={tasks} />
```

The child receives it:

```jsx
function TaskList({ tasks }) {
  // use tasks here
}
```

### 4. Events

React runs a function when an event happens:

```jsx
<button onClick={handleClick}>Click</button>
```

### 5. Lists

`map()` creates one component for every task:

```jsx
tasks.map((task) => <TaskItem key={task.id} task={task} />)
```

### 6. Conditional rendering

The app shows a message when the list is empty:

```jsx
if (tasks.length === 0) {
  return <p>No tasks yet.</p>;
}
```

## Practice exercises

Complete these one at a time:

1. Change the title and colors.
2. Add three different starting tasks.
3. Add a **Delete All** button.
4. Add an **Incomplete tasks** number.
5. Add filters: All, Active, and Completed.
6. Save tasks in `localStorage` so they remain after refreshing.

Do not add all features at once. Test the app after every small change.
