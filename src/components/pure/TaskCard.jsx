import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/classes/Task';

// Importamos la hoja de estilos de task.scss
import '../../styles/taskCard.scss'
import { LEVELS } from '../../models/Levels';


const TaskCard = ({ task, complete, remove }) => {

    const taskCompleted = {
        color: 'gray',
        textDecoration: 'line-through'
    }

    const taskPending = {
        fontWeight: 'bold',
        color: 'tomato'
    }

    useEffect(() => {
        console.log('Created task')
        return () => {
            console.log(`Task: ${task.name} is going to unmount`)
        };
    }, [task]);

    /**
     * Function that return a Badge
     * depending on the level of task
     */
    function taskLevelBadge(){
        switch (task.level) {
            case LEVELS.Normal:
                return(
                <h6 className='mb-0'>
                    <span className='badge bg-primary'>
                        { task.level }
                    </span>
                </h6>);
            case LEVELS.Urgent:
                return(
                <h6 className='mb-0'>
                    <span className='badge bg-warning'>
                        { task.level }
                    </span>
                </h6>);
            case LEVELS.Blocking:
                return(
                <h6 className='mb-0'>
                    <span className='badge bg-danger'>
                        { task.level }
                    </span>
                </h6>);
        
            default:
                break;
        }
    }

    /**
     * Function that returns icon depending on completion of the task
     */
    function taskCompletedIcon() {
        if(task.completed){
            return <i onClick={ () => complete(task) } className='bi-toggle-on task-action' style={{color: 'green'} }></i>
        }else {
            return <i onClick={ () => complete(task) } className='bi-toggle-off task-action' style={{color: 'grey'} }></i>
        }
    }

    return (
        <tr className='fw-normal' style={ task.completed ? taskCompleted : taskPending }>
            <th>
                <span className='ms-2'>{ task.name }</span>
            </th>
            <td>
                <span className='aling-middle'>{ task.description }</span>
            </td>
            <td>
                {/* Execution of function to return badge element */}
                { taskLevelBadge() }
            </td>
            <td>
                {/* Execution of function to return icon depending on completion*/}
                { taskCompletedIcon() }
            </td>
            <td>
                <i onClick={ () => remove(task) } className='bi-trash task-action' style={{color: 'tomato'} }></i>
            </td>
        </tr>
    );
}; 


TaskCard.propTypes = {
    task: PropTypes.instanceOf(Task),
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};


export default TaskCard;
