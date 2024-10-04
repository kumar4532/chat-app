import React, { useState, useEffect, useRef } from 'react';
import { useSocketContext } from "../../context/SocketContext";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAuthContext } from "../../context/AuthContext";

const IncomingCallModal = () => {
  const [inCall, setInCall] = useState(false);
  const { socket, incomingCall, acceptCall, rejectCall, setIncomingCall } = useSocketContext();
  const { authUser } = useAuthContext();
  const zegoCloud = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("callAccepted", handleCallAccepted);
    socket.on("callEnded", handleCallEnded);
    socket.on("callCutByCaller", () => setIncomingCall(null));

    return () => {
      socket.off("callAccepted", handleCallAccepted);
      socket.off("callEnded", handleCallEnded);
    };
  }, [socket]);

  console.log(import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET);

  const initializeZegoCloud = async (roomID, callType) => {
    const appID = parseInt(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
    const serverSecret = String(import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET);
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomID,
      authUser._id,
      authUser.fullname
    );

    zegoCloud.current = ZegoUIKitPrebuilt.create(kitToken);

    await zegoCloud.current.joinRoom({
      container: document.getElementById("call-container"),
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      showScreenSharingButton: false,
      turnOnCameraWhenJoining: callType === 'video',
      showMyCameraToggleButton: callType === 'video',
      showAudioVideoSettingsButton: callType === 'video',
    });
  };

  const handleAccept = async () => {
    setInCall(true);
    await initializeZegoCloud(incomingCall.roomId, incomingCall.type);
    acceptCall(incomingCall.roomId);
  };

  const handleCallAccepted = async ({ roomID, callType }) => {
    setInCall(true);
    await initializeZegoCloud(roomID, callType);
  };

  const handleCallEnded = () => {
    setInCall(false);
    if (zegoCloud.current) {
      zegoCloud.current.destroy();
    }
  };

  const handleEndCall = () => {
    setInCall(false);
    if (zegoCloud.current) {
      zegoCloud.current.destroy();
    }
    socket.emit("endCall", { participantSocketId: incomingCall?.callerSocketId });
  };

  if (!incomingCall && !inCall) return null;

  return (
    <>
      <div className={`modal ${incomingCall && !inCall ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Incoming {incomingCall?.type === 'video' ? 'Video' : 'Voice'} Call</h3>
          <div className="py-4 flex items-center space-x-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={incomingCall?.caller.profilePic} alt={incomingCall?.caller.fullname} />
              </div>
            </div>
            <p>{incomingCall?.caller.fullname} is calling you</p>
          </div>
          <div className="modal-action">
            <button className="btn btn-error" onClick={rejectCall}>Reject</button>
            <button className="btn btn-success" onClick={handleAccept}>Accept</button>
          </div>
        </div>
      </div>
      {inCall && (
        <div className="fixed inset-0 z-50 bg-black">
          <div id="call-container" className="w-full h-full"></div>
          <button 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 btn btn-error"
            onClick={handleEndCall}
          >
            End Call
          </button>
        </div>
      )}
    </>
  );
};

export default IncomingCallModal;