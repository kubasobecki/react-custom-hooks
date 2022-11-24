import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useRequest from './hooks/use-request';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);

        const data = await useRequest();

        const loadedTasks = [];
        for (const taskKey in data)
            loadedTasks.push({ id: taskKey, text: data[taskKey].text });

        setTasks(loadedTasks);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskAddHandler = task => {
        setTasks(prevTasks => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
