function LeaderboardsComponent({ array, setLeaders }) {

    function sortLeaders(field, order) {
        // Copy Leaders array to avoid mutating
        const sortedLeaders = [...array];

        // Case-insensitive sorting according to field and order
        sortedLeaders.sort((a, b) => {
            let comparison = 0;

            if (field === 'name') {
                comparison = a[field].toLowerCase().localeCompare(b[field].toLowerCase());
            } else if (field === 'score') {
                comparison = a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
            }

            return order === 'asc' ? comparison : -comparison;
        });

        // Send back to parent component to update accordingly
        setLeaders(sortedLeaders);
    }

    return (
        <div className={ 'w-full grid grid-cols-1 place-items-center ' }>
            <div className={ 'flex'} >
                <div className={ 'w-[20rem] border-white border-2 flex px-4 justify-between' }>Name
                    <div>
                        <button className={ 'text-md text-white' } onClick={() => sortLeaders('name', 'asc')}>↑</button>
                        <button className={ 'text-md text-white' } onClick={() => sortLeaders('name', 'desc')}>↓</button>
                    </div>
                </div>
                <div className={ 'w-[10rem] border-white border-2 flex px-4 justify-between' }>Score
                    <div>
                        <button className={ 'text-md text-white' } onClick={() => sortLeaders('score', 'asc')}>↑</button>
                        <button className={ 'text-md text-white' } onClick={() => sortLeaders('score', 'desc')}>↓</button>
                    </div>
                </div>
            </div>
            { array.map((leader) => (
                <div key={leader.name} className={ 'flex'} >
                    <div className={ 'w-[20rem] border-white border-2 grid place-items-center' }>{ leader.name }</div>
                    <div className={ 'w-[10rem] border-white border-2 grid place-items-center' }>{ leader.score }</div>
                </div>
            ))}
        </div>
    )
}

export default LeaderboardsComponent;