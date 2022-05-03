import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {task_text: '', users_responsible: props.users[0].id}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.task_text, this.state.users_responsible)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="login">name</label>
                    <input type="text" className="form-control" name="task_text"
                    value={this.state.task_text} onChange={(event)=>this.handleChange(event)} />
                </div>

            <div className="form-group">
                <label for="users_responsible">users_responsible</label>
                        <select users_responsible="users_responsible" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                            {this.props.users.map((item)=><option
                            value={item.id}>{item.users_responsible}</option>)}
                        </select>

                    </div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
            );
        }
    }

export default ToDoForm