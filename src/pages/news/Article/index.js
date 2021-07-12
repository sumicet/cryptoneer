import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useData } from '../../../hooks/useData';
// import { useStyles } from './styles';

const Article = () => {
    const match = useRouteMatch();
    const id = match.params.id;
    const news = useData(state => state.news);

    const [article, setArticle] = useState(null);

    useEffect(() => {
        if (news.loading) {
            setArticle(news.data.find(article => article.id === id));
        }
    }, [id, news.data, news.loading]);

    return (
        <div>
            {article.title}
            {article.body}
        </div>
    );
};

export default Article;
