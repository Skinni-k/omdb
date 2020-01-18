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
      {props.result.Poster !== 'N/A' ? (
        <img src={props.result.Poster} style={imgStyle} />
      ) : (
        <img
          src="https://treefurniturerental.ca/wp-content/uploads/2017/05/sorry-image-not-available.jpg"
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
