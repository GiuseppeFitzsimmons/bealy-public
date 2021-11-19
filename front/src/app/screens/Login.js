import React, {useCallback, useState, getState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync, registerAsync } from '../../features/loginSlice';
import TextField from '@material-ui/core/TextField';

export default function Login(props) {

    const dispatch = useDispatch();
    const [password, setPassword] = useState();
    const [id, setId] = useState();

    return(
        <>
            <TextField
                type="email"
                label={'username'}
                onChange={(e)=>setId(e.target.value)}
            />
            <TextField
                type="password"
                label={'password'}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Button onClick={()=>{dispatch(loginAsync({password:password, id:id}))}}>
                LOGIN
            </Button>
            <Button onClick={()=>{dispatch(registerAsync({password:password, id:id}))}}>
                REGISTER
            </Button>
        </>
    )
}