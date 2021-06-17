import { List as MuiList } from '@material-ui/core';
import Card from './Card';

const List = () => {
    return (
        <MuiList>
            <Card />
            <Card />
            <Card />
            <Card />
        </MuiList>
    );
};

export default List;
