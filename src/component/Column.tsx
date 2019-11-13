import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { InnerList } from './';

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
    background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'lightgrey' : 'inherit')}};
    flex-grow: 1;
    min-height: 100px;
`;

export const Column: FC<any> = memo(
    props => {
        return (
            <Draggable index={props.index} draggableId={props.column.id}>
                {provided => (
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
                                        <InnerList tasks={props.tasks} />
                                        {provided.placeholder}
                                    </TaskList>
                                );
                            }}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.tasks === nextProps.taskMap && prevProps.column.taskIds.length === nextProps.column.taskIds.length
        );
    },
);
