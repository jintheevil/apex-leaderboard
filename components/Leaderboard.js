function LeaderboardsComponent({ array = [] }) {
    return (
        <div className={ 'w-full grid grid-cols-1 place-items-center ' }>
            <div className={ 'flex'} >
                <div className={ 'w-[20rem] border-white border-2 grid place-items-center' }>Name</div>
                <div className={ 'w-[10rem] border-white border-2 grid place-items-center' }>Score</div>
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