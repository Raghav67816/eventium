import React from "react";
import { useState } from "react";
import { Appbar } from "react-native-paper"

export default function AppBar(){
    const [title, setTitle] = useState("");

    return(
        <Appbar.Header>
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}
