import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import backgroundImage from '../assets/Screenshot 2024-05-22 at 12.18.48 AM.png';

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
        <div className="bg-black text-white pt-[70px] h-screen flex flex-col justify-center items-center px-4">
            {songs.data ? (
                <>
                    <div className="w-full max-w-[500px] mx-auto mb-4">
                        <img src={songs.data.thumbnail} alt={songs.data.thumbnail} className="w-full h-auto rounded-lg" />
                    </div>
                    <h1 className="font-bold text-3xl sm:text-4xl mb-3 text-center">{songs.data.title}</h1>
                    <div className="flex flex-wrap justify-center items-center text-slate-400 mb-2">
                        <i className="fa-solid mr-2" /> {songs.data.featured}
                    </div>
                    <div className="flex flex-wrap justify-center mb-4">
                        {songs.data.artist.map((data) => (
                            <span key={data.id} className="text-slate-300 text-center">{data.name}, </span>
                        ))}
                    </div>
                    <audio src={songs.data.audio_url} controls className="w-full sm:w-[500px] mb-4 mx-auto"></audio>
                </>
            ) : (
                <h1 className="text-xl text-center">Loading...</h1>
            )}
        </div>
    );
};

export default Songs;
