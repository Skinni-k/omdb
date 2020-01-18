import fetch from 'isomorphic-unfetch';

const layoutStyle = {
  textAlign: 'center'
};

const innerStyle = {
  display: 'block',
  fontSize: 20
};

const imgStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
};

const Post = props => {
  return (
    <div style={layoutStyle}>
      <h1 style={innerStyle}>{props.result.Title}</h1>
      {props.result.Poster == '/^http/' ? (
        <img src={props.result.Poster} style={imgStyle} />
      ) : (
        <img
          src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln"
          style={imgStyle}
        />
      )}
      <p style={innerStyle}> {props.result.Plot}</p>
    </div>
  );
};

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=953a036f`);
  const result = await res.json();
  return { result };
};

export default Post;
