import React, {useCallback, useState, getState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { createRoomAsync, getRoomsAsync } from '../../features/roomSlice';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

export default function Main(props) {

    console.log('main props', props)

    const dispatch = useDispatch();
    const [id, setId] = useState();
    const history = useHistory();
    const rooms = useSelector(state=>state?.room?.rooms)
    const currentUser = useSelector(state=>state?.login?.currentUser)

    useEffect(()=>{
        if (!rooms){
            dispatch(getRoomsAsync())
        }
    })
    return(
        <>
            <TextField
                type="email"
                label={'username'}
                onChange={(e)=>setId(e.target.value)}
            />
            <Button onClick={()=>{dispatch(createRoomAsync({invitedUser:id}));history.push('/room/'+currentUser+'.'+id)}}>
                CREATE ROOM
            </Button>
            {rooms && rooms.map((room)=>{
                console.log('room', room)
                return (
                    <p>
                    <Button
                        onClick={()=>{props.socket.emit('room', {access_token:localStorage.getItem('access_token'), event:'joinRoom', roomId:currentUser+'.'+room.invitedUser});history.push('/room/'+room.currentUser+'.'+room.invitedUser)}}
                    >
                        {room.currentUser}.{room.invitedUser}
                    </Button>
                    </p>
                )
            })}
        </>
    )
}