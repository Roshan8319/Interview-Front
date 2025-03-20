import React from "react";
import { useParams, useLocation } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import {jwtDecode} from "jwt-decode";

function MeetingScreen() {
  const { meetingLink } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  if (token) {
    try {
        const decodedData = jwtDecode(token);
        console.log("Decoded Data:", decodedData);
        name = decodedData.name || "Guest";
    } catch (error) {
        console.error("Error decoding token:", error);
    }
}

  const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID, 10);
  const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      meetingLink,
      Date.now().toString(),
      name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      showPreJoinView: false,
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showTextChat: true,
      showUserList: true,
      showLeaveRoomConfirmDialog: true,
      showRoomTimer: true,
      videoResolution: "720p",
    });
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full" ref={myMeeting} />
    </div>
  );
}

export default MeetingScreen;
