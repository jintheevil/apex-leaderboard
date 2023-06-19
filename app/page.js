'use client';

import ModalComponent from "@/components/Modal";
import HeaderComponent from "@/components/Header";
import {useEffect, useState} from "react";
import LeaderboardsComponent from "@/components/Leaderboard";
import AddEntryComponent from "@/components/AddEntry";

// Get leaders function
async function getLeaders(mode) {
    try {
        // GET leaders data from backend (default mode = 'sum')
        const response = await fetch('http://localhost:3000/api/leaders?mode=' + (mode ? mode : 'sum'), {
            method: 'GET',
        });

        // Return response in JSON format
        return response.json();
    } catch (err) {
        // Log and throw error to user
        console.log(err);
        throw err;
    }
}
function HomePage() {
    // State management
    const [loading, setLoading] = useState(false);
    const [leaders, setLeaders] = useState([]);
    const [loadtext, setLoadtext] = useState('Updating leaderboards...');

    async function handleLoading(mode) {
        // Initiate Loading
        setLoading(true);
        try {
            // GET leaders
            const res = await getLeaders(mode ? mode : null);

            // Set leaders and cancel loading if response is good
            if (res.ok) {
                setLeaders(res.data)
                setLoading(false);
            }
        } catch (err) {
            // Log error and throw it back to the user
            // Cancel loading
            console.log(err);
            setLoading(false);
            throw(err);
        }
    }

    useEffect( () => {
        async function fetchData() {
            await handleLoading('sum');
        }

        fetchData().then();
    }, []);

    return (
        <div>
            {
                (loading) && <ModalComponent text={ loadtext }></ModalComponent>
            }
            <HeaderComponent></HeaderComponent>
            <div className={ 'px-[20rem] py-4' }>
                <div className={ 'w-full flex justify-between mb-4' }>
                    <AddEntryComponent loading={loading} setLoading={setLoading} loadtext={loadtext} setLoadtext={setLoadtext}></AddEntryComponent>
                    <div>
                        <span className={ 'mr-2' }>Leaderboard mode:</span>
                        <button className={ 'p-2 rounded-2xl bg-gray-600 mr-2' } onClick={() => handleLoading('sum')}>Sum</button>
                        <button className={ 'p-2 rounded-2xl bg-white text-gray-800' } onClick={() => handleLoading('max')}>Max</button>
                    </div>
                </div>
                <LeaderboardsComponent array={ leaders }></LeaderboardsComponent>
            </div>
        </div>
    )
}

export default HomePage;