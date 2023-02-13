import React, { useState, useContext, useRef } from 'react'
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../context';
import { nanoid } from 'nanoid'
import '../src/App.css'

function stage_1(props) {

    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, '']);

    const validateInput = (value) => {
        if (!value) {
            setError([true, 'Please add something!']);
            return false;
        }

        if (value.length <= 2) {
            setError([true, '3 Character at Least!'])
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        textInput.current.value = '';
        const validate = validateInput(value);
        if (validate) {
            setError([false, '']);
            context.addPlayer(value, nanoid());
        }

    }

    const renderPlayers = context.state.players.map((player, index) => {
        return (
            <li key={index} className='list-group-item d-flex justify-content-between align-items-center list-group-item-action' >
                {player.name}
                <span className='badge badge-danger' onClick={()=> context.removePlayer(player.id) }>X</span>
            </li>
        )
    })

    const renderNextButton = () => {
        return (
            <button className='action_button' onClick={()=> context.next()}>NEXT</button>
        )
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control type='text' placeholder='Add player name' name='player' ref={textInput} />
                </Form.Group>

                {error[0] ? <Alert>{error[1]}</Alert> : null}
                <Button variant='primary' type='submit' className='miami'>Add Player</Button>

            </Form>

            <hr />
            <div>
                <ul className='list-group'>
                    {renderPlayers}
                    

                </ul>

            </div>
            {context.state.players.length >= 1 && renderNextButton()}

        </div>
    )
}

export default stage_1