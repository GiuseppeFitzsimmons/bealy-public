import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import { useFileUpload } from 'use-file-upload';
import { useDispatch } from 'react-redux';
import { getFileAsync, uploadFileAsync } from "../../features/roomSlice";

export default function Room(props) {

    const dispatch = useDispatch();
    const [fileToUpload, selectFile] = useFileUpload();
    const [response, setResponse] = useState('');
    let location = useLocation();
    const roomId = location.pathname.substr(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
    //var fileList = [];
    const [fileList, addToFileList] = useState([])

    useEffect(() => {
        props.socket.on('room', data => {
            fileList.push(data);
            setResponse(data);
        });
    }, [])
    useEffect(() => {
        console.log('fileToUploadAAA', typeof fileToUpload)
        if (fileToUpload) {
            console.log('dispatching uploadFileAsync')
            dispatch((uploadFileAsync({ name: fileToUpload.name, file: fileToUpload, roomId: roomId })));
            console.log('post uploadFileAsync')
        }
        console.log('fileToUpload end')
    }, [fileToUpload])

    return (
        <>
            ROOM
            <Button
                onClick={() => { props.socket.emit('room', { access_token: localStorage.getItem('access_token'), event: 'joinRoom', roomId: roomId }) }}
            >
                SEND MESSAGE
            </Button>
            <Button
                onClick={() => {
                    selectFile();
                }}
            >
                UPLOAD FILE
            </Button>
            {fileList && fileList.map((file) => {
                return (
                    <p>
                        <Button
                            onClick={() => { dispatch((getFileAsync({ roomId: roomId, fileId: file.fileId }))) }}
                        >
                            {file.fileId}
                        </Button>
                    </p>
                )
            })}
        </>
    )
}

/*

        {fileList && fileList.map((file)=>{
            console.log('mapping file', file);
            return(
                <p>
                    <Button>
                        {file.fileId}
                    </Button>
                </p>
            )
        })}
        {fileList.map((file)=>{
            console.log('mapping please');
        })}

*/