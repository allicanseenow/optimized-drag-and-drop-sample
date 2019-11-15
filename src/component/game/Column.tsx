import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { InnerList } from './InnerList';

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
const RowList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'lightgrey' : 'inherit')}};
    flex-grow: 1;
    min-height: 100px;
`;

export const Column: FC<any> = memo(
    props => {
        console.log('props inside is ', props)
        return (
            <Container>
                <Title>{props.column.title}</Title>
                <Droppable
                    droppableId={props.column.id}
                    // type={props.column.id === 'column-3' ? 'done' : 'active'}
                    isDropDisabled={props.isDropDisabled}
                >
                    {(provided, snapshot) => {
                        return (
                            <RowList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <InnerList rows={props.rows} />
                                {provided.placeholder}
                            </RowList>
                        );
                    }}
                </Droppable>
            </Container>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.rows === nextProps.rows && prevProps.column.rowIds.length === nextProps.column.rowIds.length;
    },
);
