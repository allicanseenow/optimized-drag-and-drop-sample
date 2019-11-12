import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color: ${({ isDragging, isDragDisabled }) =>
        isDragDisabled ? 'lightgrey' : isDragging ? 'lightgreen' : 'white'};

    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
        outline: none;
        border-color: red;
    }
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

export const Task = props => {
    const isDragDisabled = false;

    return (
        <Draggable draggableId={props.task.id} index={props.index} isDragDisabled={isDragDisabled}>
            {(provided, snapshot) => {
                return (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {props.task.content}
                    </Container>
                );
            }}
        </Draggable>
    );
};
