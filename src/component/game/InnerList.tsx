import React, { FC, memo } from 'react';
import { Row } from './Row';

export const InnerList: FC<any> = memo(({ rows }) => {
    return rows.map((row, index) => <Row key={row.id} row={row} index={index} />);
});
