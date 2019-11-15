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

export const Row = props => {
    console.log('props.row.imageis ', props.row.image)
    return (
        <Draggable draggableId={props.row.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div dangerouslySetInnerHTML={{__html: props.row.image}}>
                        </div>
                    </Container>
                );
            }}
        </Draggable>
    );
};
