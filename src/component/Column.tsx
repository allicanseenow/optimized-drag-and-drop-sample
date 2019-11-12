import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { Task } from './Task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
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
    background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'skyblue' : 'white')}};
    flex-grow: 1;
    min-height: 100px;
    display: flex;
`;

export const Column = props => {
    return (
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable
                droppableId={props.column.id}
                // type={props.column.id === 'column-3' ? 'done' : 'active'}
                isDropDisabled={props.isDropDisabled}
                direction="horizontal"
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
    );
};
