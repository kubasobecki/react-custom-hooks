import { useState } from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useRequest from '../../hooks/use-request';

const NewTask = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const enterTaskHandler = async taskText => {
        setIsLoading(true);
        setError(null);

        const data = await useRequest(taskText);

        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
        setIsLoading(false);
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
