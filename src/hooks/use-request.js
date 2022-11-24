import { FIREBASE_URL } from '../env';

const useRequest = async (taskText = false) => {
    try {
        const request = [FIREBASE_URL];
        if (taskText)
            request.push({
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ text: taskText })
            });

        const response = await fetch(...request);
        if (!response.ok) throw new Error('Request failed!');

        const data = await response.json();

        return data;
    } catch (err) {
        setError(err.message || 'Something went wrong!');
    }
};

export default useRequest;
