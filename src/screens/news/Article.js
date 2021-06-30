import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

const Article = () => {
    const match = useRouteMatch();
    const id = match.params.id;
    const news = useSelector(state => state.news.data);

    const article = news.find(article => article.id === id);
    console.log(match);
    return (
        <div>
            {article.title}
            {article.body}
        </div>
    );
};

export default Article;
