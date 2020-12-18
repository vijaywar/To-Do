import React, { Component } from 'react'
import './tasks.css'
export default class Tasks extends Component {
    state = {
        tasks: [], task: '', sta: {}, a: 0, b: 0, c: 0
    }

    componentDidMount = () => {
        if (localStorage.getItem('tasks') !== undefined && localStorage.getItem('tasks') !== null) {
            var data = JSON.parse(localStorage.getItem('tasks'));
            this.setState({ tasks: data });

            if (localStorage.getItem('sta') !== undefined && localStorage.getItem('sta') !== null) {
                try { var datak = JSON.parse(localStorage.getItem('sta')); }
                catch { console.log('error'); datak = {} }
                this.setState({ sta: datak });
                var a1 = 0, b1 = 0, c1 = 0;
                for (var i = 0; i < data.length; i++) {
                    if (datak[data[i]] === 'true') a1 += 1;
                }
                c1 = data.length;
                b1 = c1 - a1;
                this.setState({ a: a1, b: b1, c: c1 })
            }
        }
    }
    add = () => {
        var data = [this.state.task, ...this.state.tasks];

        if (this.state.task !== '') {
            localStorage.setItem('tasks', JSON.stringify(data));
            this.setState({
                tasks: [[this.state.task], ...this.state.tasks]
            });
            // console.log(this.state.a, this.state.a + 1, this.state.a - 1);
            this.setState({ c: this.state.c + 1, b: this.state.b + 1 });
        }
        this.setState({ task: '' })

        //   console.log(data)
    }
    delete = (i, e) => {

        this.setState({ tasks: this.state.tasks.filter(x => x !== i) });
        var data = this.state.tasks.filter(x => x !== i);
        localStorage.setItem('tasks', JSON.stringify(data));
        var checker = this.state.sta;
        if (checker[i] === 'false') { this.setState({ c: this.state.c - 1, b: this.state.b - 1 }); }
        else if (checker[i] === 'true') { this.setState({ c: this.state.c - 1, a: this.state.a - 1 }); }
        else { this.setState({ c: this.state.c - 1, b: this.state.b - 1 }); }
        delete checker[i];
        this.setState({ sta: checker });
        localStorage.setItem('sta', JSON.stringify(checker));
        var delvar;
        if (localStorage.getItem('deleted') !== null)
            delvar = [i, ...JSON.parse(localStorage.getItem('deleted'))];
        else
            delvar = [i];
        localStorage.setItem('deleted', JSON.stringify(delvar));
    }
    change = (e) => { this.setState({ [e.target.name]: e.target.value }) }


    strike = (e, i) => {

        var stad = this.state.sta;
        var lion = e;
        if (this.state.sta[lion] === 'false') {
            this.setState({ [this.state.sta[lion]]: 'true' });
            stad[lion] = 'true';
            localStorage.setItem('sta', JSON.stringify(stad));
            this.setState({ a: this.state.a + 1, b: this.state.b - 1 });
        }
        else if (this.state.sta[lion] === 'true') {
            this.setState({ [this.state.sta[lion]]: 'false' });
            stad[lion] = 'false';
            localStorage.setItem('sta', JSON.stringify(stad));
            this.setState({ a: this.state.a - 1, b: this.state.b + 1 });
        }
        else {
            stad = this.state.sta;
            stad[lion] = 'true';
            this.setState({ sta: { [lion]: 'true', ...this.state.sta } });
            localStorage.setItem('sta', JSON.stringify(stad));
            this.setState({ a: this.state.a + 1, b: this.state.b - 1 });
        }
    }
    render() {
        if (document.getElementById("add")) {
            var input = document.getElementById("taskinput");
            input.addEventListener("keyup", function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById("add").click();
                }
            });
        }

        var value = 0;
        return (
            <div className="App">
                <header className="App-header">
                    <h1>To do Check List</h1>
                </header>

                <div className="card text-white bg-secondary"  >
                    <div className="card-body ">
                        <div className="row">
                            <div className="col-3">
                                <button className='btn' type="button" name="" id="" >
                                    <i className="fa fa-tasks" aria-hidden="true"></i> Tasks</button>
                            </div>
                            <div className="col-6" id='mview6'>
                                <div className="form-group">
                                    <input className='input' id='taskinput' type="text" onChange={this.change} value={this.state.task} name="task" placeholder="Enter your tasks !" />
                                </div>
                            </div>
                            <div className="col-3" id='mview3'>
                                <button className='btn' onClick={this.add} type="button" name="" id="add" >
                                    <i className="fa fa-plus" aria-hidden="true"></i>Add</button>
                            </div>
                        </div>
                        <button className='btn' style={{ backgroundColor: 'rgb(50, 88, 255,0.8)' }}>All <span className='nodisplay'>{this.state.c}</span></button>
                        <button className='btn' style={{ backgroundColor: 'rgb(57, 255, 50,0.8)' }}>Done <span className='nodisplay'>{this.state.a}</span></button>
                        <button className='btn' style={{ backgroundColor: 'rgb(255, 166, 50,0.8)' }}>Pending <span className='nodisplay'>{this.state.b}</span></button>
                        {this.state.tasks.map(i =>
                            <div key={value} className="row">
                                <span className='hide'>{value += 1}</span>
                                <div className="col-6">
                                    {this.state.sta[i] === 'true' ?
                                        <div>
                                            <div className="alerts" onClick={this.strike.bind(this, i)}>
                                                {i}
                                            </div><span className='close' onClick={this.delete.bind(this, i)}>X</span></div>
                                        : <div>
                                            <div className="alert" role="alert" onClick={this.strike.bind(this, i)}>
                                                {i}
                                            </div><span className='close' onClick={this.delete.bind(this, i)}>X</span></div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )

    }
}
