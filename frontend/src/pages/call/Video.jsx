import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MdOutlineCallEnd } from "react-icons/md";
import { useSocketContext } from '../../context/SocketContext';

function Video() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {socket} = useSocketContext();

    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const pic = searchParams.get('pic');

    if (!id || !name || !pic) {
        return <div>Error: Missing conversation data</div>;
    }

    useEffect(() => {
        socket.on("callHasBeenRejected", handleEndCall);

        return () => {
            socket.off("callHasBeenRejected", handleEndCall);
        };
    }, [socket, navigate]);

    const handleEndCall = () => {
        navigate('/');
        socket.emit("callHasBeenCut", {
            receiver: id
        })
    };

    return (
        <div className='flex flex-col text-2xl justify-center items-center h-screen'>
            <div className="w-40 h-40 md:w-56 md:h-56 mb-4">
                <img 
                    src={pic} 
                    alt={`${name}'s profile`}
                    className="w-full h-full object-cover rounded-full ring-4 ring-blue-500 ring-offset-4"
                />
            </div>
            <div className='mb-6 font-semibold text-gray-800'>
                {name}
            </div>
            <button 
                onClick={handleEndCall}
                className='text-4xl p-4 bg-red-600 hover:bg-red-700 rounded-full text-white transition duration-300 ease-in-out transform hover:scale-110'
                aria-label="End call"
            >
                <MdOutlineCallEnd />
            </button>
        </div>
    );
}

export default Video;