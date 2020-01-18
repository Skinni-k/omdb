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
          src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/9/6/0/9/239069-6-eng-GB/Appetite-Learning-SIC-Food-20162.jpg"
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
