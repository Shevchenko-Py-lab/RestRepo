import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project_name: '', user_responsible: props.users[0].id}
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
        this.props.createProject(this.state.project_name, this.state.user_responsible)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="login">project_name</label>
                    <input type="text" className="form-control" project_name="project_name"
                    value={this.state.project_name} onChange={(event)=>this.handleChange(event)} />
                </div>

            <div className="form-group">
                <label for="user_responsible">user_responsible</label>
                        <select user_responsible="user_responsible" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                            {this.props.users.map((item)=><option
                            value={item.id}>{item.user_responsible}</option>)}
                        </select>

                    </div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                </form>
            );
        }
    }

export default ProjectForm