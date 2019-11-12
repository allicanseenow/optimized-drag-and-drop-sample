import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { Task } from './Task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    min-width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'skyblue' : 'inherit')}};
    flex-grow: 1;
    min-height: 100px;
`;

export const Column = props => {
    return (
        <Draggable index={props.index} draggableId={props.column.id}>
            {(provided) => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    <Droppable
                        droppableId={props.column.id}
                        // type={props.column.id === 'column-3' ? 'done' : 'active'}
                        isDropDisabled={props.isDropDisabled}
                    >
                        {(provided, snapshot) => {
                            return (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {props.tasks.map((task, index) => (
                                        <Task key={task.id} task={task} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </TaskList>
                            );
                        }}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    );
};
