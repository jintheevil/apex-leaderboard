'use client';

export default function AddEntryComponent ({loading, setLoading, loadtext, setLoadtext}) {
    // State management
    async function submit() {
        // Form validation
        if (!validateForm()) {
            return
        }

        const data = {
            name: document.querySelector('#name').value,
            score: document.querySelector('#score').value
        }

        try {
            // Set loading text accordingly and loading state to true
            setLoadtext('Adding new entry...')
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/leaders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                // Reload page and reset loading
                setLoading(false);
                setLoadtext('Updating leaderboards...')
                alert('Entry added. Reloading page to reflect changes.');
                location.reload();
            } else {
                // Log error and reset loading
                setLoading(false);
                setLoadtext('Updating leaderboards...')
                alert('An error has occurred. Please check the log for more information');
                console.log(response.message);
            }

        } catch (err) {
            // Log and throw the error back to the user
            // Resets loading
            console.log(err);
            setLoading(false);
            setLoadtext('Updating leaderboards...')
            throw(err);
        }
    }

    function validateForm() {
        // Get values from form and validate accordingly
        const name = document.querySelector('#name').value;
        const score = document.querySelector('#score').value;

        if (!name) {
            alert('Name can not be empty.');
            return false;
        }

        if (!score) {
            alert('Score can not be empty or 0.');
            return false;
        }

        if (score < 0) {
            alert('Positive values only!');
            return false;
        }

        return true;
    }

    return (
        <form className={ 'flex gap-2 items-center'}>
            <div className={ 'row' }>
                <label className={ 'mr-2' }>Name:</label>
                <input className={ 'rounded-xl w-[8rem] text-gray-800 px-2' } type={ 'text' } id={ 'name' }/>
            </div>
            <div>
                <label className={ 'mr-2' }>Score:</label>
                <input className={ 'rounded-xl w-[8rem] text-gray-800 px-2' } type={ 'number' } min={ 0 } id={ 'score' }/>
            </div>
            <button type={ 'button' } className={ 'rounded-2xl text-sm p-2 bg-green-400 ml-4' } onClick={ () => submit() }>Submit</button>
        </form>
    )
}