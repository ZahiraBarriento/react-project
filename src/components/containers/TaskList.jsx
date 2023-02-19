import React, { useState, useEffect } from 'react';
import { Task } from '../../models/classes/Task';
import { LEVELS } from '../../models/Levels';
import TaskCard from '../pure/TaskCard';
//import PropTypes from 'prop-types';

// Importamos la hoja de estilos de task.scss
import '../../styles/taskCard.scss'
import TaskForm from '../pure/forms/TaskForm';


const TaskList = () => {

    const defaultTask1 = new Task('Example1', 'Description1', true, LEVELS.Normal);
    const defaultTask2 = new Task('Example2', 'Description2', false, LEVELS.Urgent);
    const defaultTask3 = new Task('Example3', 'Description3', true, LEVELS.Blocking);
    const loadingStyle = {
        color: 'grey',
        fontSize: '30px',
        fontWeight: 'bold'
    };

    // Estado del componente
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);

    // Control del ciclo de vida del componente
    useEffect(() => {
        console.log('Task state has been modified');

        setTimeout(() => {
            setLoading(false);
        }, 2000)

        return () => {
            console.log('TaskList component is going to unmount...')
        };
    }, [tasks]);


    function completeTask(task) {
        console.log('Complete this Task:', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;

        /**
         * We update the state of the componente with the new of tasks and it will update the
         * iteraction of the tasks in order to show the task dated
         */
        setTasks(tempTasks);
    }

    function deleteTask(task){
        console.log('Delete this Task:', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index,1);
        setTasks(tempTasks);
    }

    function addTask(task){
        console.log('Add this Task:', task);
        const tempTasks = [...tasks];
        tempTasks.push(task)
        setTasks(tempTasks);
    }

    const Table = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map((task, index) => {
                        return (
                            <TaskCard 
                                key={ index } 
                                task={ task } 
                                complete={ completeTask }
                                remove={ deleteTask }
                            />
                        )
                    })}
                </tbody>
            </table>
        )
    }

    let tasksTable;

    if(tasks.length > 0){
        tasksTable = <Table />;
    }else{
        tasksTable = (
            <div>
                <h3>There are no tasks to show</h3>
                <h4>Please, create one</h4>
            </div>
        )
    }

    return (
        <div>
            <div className='col-12'>
            <div className='card'>
                <div className='card-header p-3'>
                    <h5>Your tasks:</h5>
                </div>
                <div className='card-body' data-mdb-perfect-scrolbar='true' style={ {position: 'relative', height: '400px'} }>
                    { /* TODO: Add loanding spinner */ }
                    { loading ? <p style={ loadingStyle }>Loading tasks...</p> : tasksTable }
                </div>
            </div>
            </div>
            <TaskForm add={ addTask } length= { tasks.length } />
        </div>
    );
};

/*
TaskList.propTypes = {

};*/


export default TaskList;
