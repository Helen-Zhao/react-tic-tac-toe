import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>

                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>

                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>

                <button className="reset" onClick={this.props.reset}>
                    Reset
                </button>
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPlayer: 'X',
            history: [{squares: Array(9).fill(null)}],
            current: 0
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.current + 1)
        const latest = history[this.state.current].squares
        const winner = calculateWinner(latest)
        if (winner) return

        const squares = latest.slice()
        if (!squares[i]) {
            squares[i] = this.state.nextPlayer
            this.setState({
                history: history.concat([{squares: squares}]),
                nextPlayer: this.state.nextPlayer === 'O' ? 'X' : 'O', current: this.state.current + 1
            })
        }
    }


    reset() {
        this.setState({history: [{squares: Array(9).fill(null)}], nextPlayer: 'X', current: 0})
    }


    jumpTo(move) {
        this.setState({nextPlayer: (move % 2) === 0 ? 'X' : 'O', current: move})
    }


    render() {
        console.log(this.state.history)
        const winner = calculateWinner(this.state.history[this.state.current].squares)
        const status = !winner ? `Next player: ${this.state.nextPlayer}` : `Game over! Winner: ${winner}`;
        const moves = this.state.history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.history[this.state.current].squares} onClick={(i) => this.handleClick(i)}
                           reset={() => this.reset()}/>
                </div>

                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}


// ========================================


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }

    }
    return null;
}