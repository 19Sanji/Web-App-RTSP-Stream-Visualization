import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "../styles/Stream.css";
import video_icone from "../img/video.png";

function Stream(props) {
  const [imgUrl, setImgUrl] = useState("");
  const [iconeVisibity, setIconeVisibity] = useState(true);

  const [location, setLocation] = useState("");
  const [idCam, setIdCam] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAddres, setSelectedAddres] = useState("");
  const [cameras, setCameras] = useState([]);

  async function SendStreamData() {
    if (props.streamUrl!=="") {
    await axios.post("http://localhost:3001/work_room/stream", {
      url: props.streamUrl,
      connectStart: props.connectStart,
      connectStop: props.connectStop,
    });}
  }

  useEffect(() => {
    console.log("props.streamUrl : " + props.streamUrl);
    console.log("props.connectStart : " + props.connectStart);
    console.log("props.connectStop : " + props.connectStop);
    
      SendStreamData();
    

    let socket = io("ws://localhost:3001/", {
      autoConnect: false,
      query: {
        streamUrl: props.streamUrl,
      },
    });
    if (props.connectStart) {
      socket.connect();

      socket.on("data", function (data) {
        setImgUrl("data:image/jpeg;base64," + data);
        data = null;
      });
      socket.emit("start");
    }
    if (props.connectStop) {
      window.location.reload()
    }

    setImgUrl("");
  }, [props.connectStart, props.connectStop, props.streamUrl]);

  return (
    <div className="myStream">
      {/* <img className="myIcone" hidden={iconeVisibity} src={video_icone} /> */}
      <img className="video-img-player" src={imgUrl} />
    </div>
  );
}
export default Stream;
