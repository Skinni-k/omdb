import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';

const Post = props => {
  return (
    <Layout>
      <h1>{props.result.Title}</h1>
      <img src={props.result.Poster} />
    </Layout>
  );
};

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=953a036f`);
  const result = await res.json();
  return { result };
};

export default Post;
