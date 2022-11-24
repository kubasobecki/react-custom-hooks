import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';
import { FIREBASE_URL } from '../../env';

const NewTask = props => {
    const { isLoading, error, sendRequest } = useHttp();

    const enterTaskHandler = async taskText => {
        const applyData = taskObj => {
            const generatedId = taskObj.name; // firebase-specific => "name" contains generated id
            const createdTask = { id: generatedId, text: taskText };

            props.onAddTask(createdTask);
        };

        await sendRequest(
            {
                url: FIREBASE_URL,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { text: taskText }
            },
            applyData
        );
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
