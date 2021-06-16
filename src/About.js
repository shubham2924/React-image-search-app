import React, {useState, useEffect} from 'react';
import { createApi } from "unsplash-js";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}


const api = createApi({
    accessKey: "5L6BJklghi9r7iQVApzAmKi2h7ie65L2LKwKoJweyUg",
  });

function About() {
    
    const [data, setPhotosResponse] = useState(null);
    
        useEffect(()=>{
            api.search
        .getPhotos({ query: 'wallpaper', perPage:30 })
    .then(result =>{
        setPhotosResponse(result);
        console.log(result);
    })
    .catch(()=>{
        console.log("something went wrong!");
    });
        },[]);
        
    //   };
    if (data === null) {
        return <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><h2>Loading...</h2></div>;
      } else if (data.errors) {
        return (
          <div>
            <div>{data.errors[0]}</div>
            <div>PS: Make sure to set your access token!</div>
          </div>
        );
      }
      else{
        return (
            <>
                {/* <h3 className="title">Results for "Wallpaper"</h3> */}
                <Toolbar id="back-to-top-anchor" />

                <div className="card-list container">
                    {data.response.results.map(pic => (
                      <div>
                        <div className="card content" key={pic.id}>
                          <div className="content-overlay"></div>
                            {/* <a href={'https://unsplash.com/photos/'+(pic.id) +'/download?force=true' }> */}
                        <img
                          className="card--image content-image"
                          alt={pic.alt_description}
                          src={pic.urls.small}
                          width="50%"
                          height="50%"
                        ></img>
                        <div className="content-details fadeIn-bottom">
                          <h2 style={{color:'white'}} className="content-title">Liked by {pic.likes}</h2>
                          <a href={'https://unsplash.com/photos/'+(pic.id) +'/download?force=true' }>
                          
                          </a>
                        </div>
                        {/* </a> */}
                      </div>
                   </div> 
                    ))}
                </div>
                <ScrollTop >
                  
        {/* <Fab style={{color:'primary'}} size="small" aria-label="scroll back to top"> */}
          <KeyboardArrowUpIcon style={{backgroundColor:'#47d7ff'  , fontSize:'50px'}} />
        {/* </Fab> */}
        
      </ScrollTop>
    
            </>
        );
      }

    
}

export default About;
