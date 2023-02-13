import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = React.createContext();

class MyProvider extends React.Component {


    state = {
        stages: 1,
        players: [],
        loser: ''
    }

    addPlayer = (player, id) => {
        this.setState((prevState) => {
            return { players: [...prevState.players, { id: id, name: player }] }
        })

    }

    removePlayer = (id) => {
        this.setState((prevState) => {
            return {
                players: prevState.players.filter((player) => {
                    return player.id !== id;
                })
            }
        })
    }

    next = () => {
        const { players } = this.state;
        if (players.length < 2) {
            toast.error('More than one player is required', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000
            });
        } else {
            this.setState({ stages: 2 });
            this.generateLoser();
        }


    }

    generateLoser = () => {
        this.setState({ loser: '' });
        setTimeout(() => {
            const playersLen = this.state.players.length;
            const randNum = Math.floor(Math.random() * playersLen);
            this.setState({ loser: this.state.players[randNum].name });
        }, 2000);

    }

    resetGame = () => {
        this.setState({
            stages: 1,
            players: [],
            loser: ''
        });
    }

    render() {
        return (
            <>
                <MyContext.Provider value={{ state: this.state, addPlayer: this.addPlayer, removePlayer: this.removePlayer, next: this.next, generateLoser: this.generateLoser, resetGame: this.resetGame }}>{this.props.children}</MyContext.Provider>
                <ToastContainer></ToastContainer>
            </>
        )
    }


}

export { MyContext, MyProvider }