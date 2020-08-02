import React, {useState} from "react";
import Webcam from "react-webcam";


import {Whiteboard, EventStream, EventStore} from '@ohtomi/react-whiteboard';


export default function Stream() {
    const [events] = useState(new EventStream());
    const [eventStore] = useState(new EventStore());
    return (
        <div style={{display: "flex", flexDirection: "row",justifyContent:"space-between"}}>
            <Webcam/>
            <Whiteboard
                height={450}
                width={450}
                style={
                    {
                        backgroundColor: 'lightyellow'
                    }
                }
                events={events}
                eventStore={eventStore}
            />
        </div>
    )
}
