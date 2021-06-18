import { List as MuiList } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import Card from './Card';

const List = () => {
    const news = useSelector(state => state.news);

    const [data, setData] = useState(undefined);

    const { fetchNews } = useActions();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        if (news.data) {
            setData(news.data);
            console.log(data);
        }
    }, [news]);

    return (
        <MuiList>
            {data !== undefined &&
                data.map(elem => (
                    <Card title={elem.title} currencies={elem.currencies} />
                ))}
        </MuiList>
    );
};

export default List;
