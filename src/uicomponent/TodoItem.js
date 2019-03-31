import React, {useState, useEffect} from 'react';

function TodoItem(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `clicked ${count}`;
    })
    return (
        <div>
            <p>${count}</p>
            <button onClick={() => setCount(count+1)}>click me</button>
        </div>
    );
    
}

export default TodoItem