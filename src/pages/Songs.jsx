import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import backgroundImage from '../assets/Screenshot 2024-05-22 at 12.18.48 AM.png'
const Songs = ({ token }) => {
    const [songs, setSongs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchVideo();
    }, [id]);

    const fetchVideo = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/musicx/song/${id}`, {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'f104bi07c490',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setSongs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        
        <div className="bg-black text-white pt-[70px] h-[100dvh] flex flex-col justify-center items-center ">
            {songs.data ? (
                <>
                    <div>
                        <img src={songs.data.thumbnail} alt={songs.data.thumbnail} className="h-[400px] w-[400px] m-20 mb-3 mt-[-30px]" />
                    </div>
                    <h1 className='font-[700] text-4xl mb-3'>{songs.data.title}</h1>
                    <div className='flex flex-row text-slate-400'><i className="fa-solid" /> {' '}{songs.data.featured}</div>
                    {songs.data.artist.map((data) => (
                        <span key={data.id} className='text-slate-300'>{data.name}, </span>
                    ))}
                    <br />
                    <audio src={songs.data.audio_url} controls className='mb-3 w-[500px]'></audio>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default Songs;
