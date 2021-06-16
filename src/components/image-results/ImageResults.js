import React, { Component } from 'react'
import propTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import UseAnimations from "react-useanimations";
import withWidth from '@material-ui/core/withWidth';

import { MDBView, MDBMask } from "mdbreact";

import BookmarkIcon from '@material-ui/icons/Bookmark';

import ShareIcon from '@material-ui/icons/Share';

//here is for dialog stuff

// import Dialog from "@material-ui/core/Dialog";
import Dialog from "material-ui/Dialog";

import {FacebookShareButton, PinterestShareButton,RedditShareButton,TelegramShareButton, LinkedinShareButton,TwitterShareButton,WhatsappShareButton,
  FacebookIcon,TwitterIcon,LinkedinIcon,PinterestIcon,WhatsappIcon, RedditIcon , TelegramIcon } from "react-share";
 
import './imgcss.css'
import GridList from '@material-ui/core/GridList';
// import IconButton from '@material-ui/core/IconButton';
import IconButton from "material-ui/IconButton";

//import Dialog from '@material-ui/core/Dialog';
//import FlatButton from '@material-ui/core/FlatButton';
import { GridListTile } from '@material-ui/core';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';

import Tooltip from '@material-ui/core/Tooltip';

import Fade from '@material-ui/core/Fade';

import swal from '@sweetalert/with-react';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import { FlatButton } from 'material-ui';

import FlatButton from "material-ui/FlatButton";



toast.configure()

class ImageResults extends Component {


    //here is for dialog stuff
    state = {
        open: false,
        currentImg: ""
    };

  
 
    
    

  handleOpen = (img) => {
    console.log(img);
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false, currentImg: "" });
  };



    
    render() {
      const {width} = this.props;
      let columns = width === 'xs' || width === 'sm'  ? 2 : 3;

        
      const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

        //here is for dialog stuff
        const { classes } = this.props;

        

        const mystylecss = {
            padding: "0px",
            borderRadius: "10px"

        };

        const toaster = () =>{
            toast.success('🏷  Bookmark Added',{
                position: "bottom-center",
                autoClose: 2100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }


        const openModal = () =>{
            swal( 
                <div>
                  
                  
                  
                </div>,
                {buttons:["Add to Favourite", "Close"]},
              )
        }

        let imageListContent;
        const {images}= this.props;
        
        if(images){
            imageListContent = (
                <GridList cols={columns}>
                    
                    {images.map(img =>(
                     

                        <GridListTile
                        style={{height:'250px'}}
                        
                        >
                           
                            <img onClick={() => openInNewTab(img.urls.full)} src={img.urls.small} alt="" />
                            
                            <GridListTileBar 
                            style={{backgroundColor:'rgba(0,0,0,0.2)'}}
                            actionIcon={<div style={{display:'flex'}}>
                                <h6 style={{color:'#fff'}}>❤&nbsp; by {img.likes}</h6>
                                <IconButton onClick={() => this.handleOpen(img.urls.small)} style={{cursor:'pointer', color:'#fff', paddingBottom:'2px'}}  >
                                
                                <VisibilityIcon/>
                            </IconButton>
                            </div>
                            }
                            title={ 
                                <a href={'https://unsplash.com/photos/'+ (img.id) + '/download?force=true'} >
                                    <Tooltip TransitionComponent={Fade}  TransitionProps={{ timeout: 350 }} leaveDelay={250} title={<h3>Download</h3>} placement="top-start" arrow>
                                {/* <IconButton  onClick={toaster} style={{cursor:'pointer', color:'#fff'}}> */}
                                {/* <IconButton style={{cursor:'pointer', color:'#fff'}}>
                                <BookmarkIcon/>
                            </IconButton> */}
                             <UseAnimations
        animationKey="download"
        size={26}
        style={{ cursor:'pointer', color:'#fff' }}
      />
                            </Tooltip>
                            
                            </a>
                            }
                            
                            
                            />
                        </GridListTile>
                    ))}
                </GridList>
            )
        } else{
            imageListContent = null;
        }

        const actions = [<div>
            {/* <FlatButton onClick={toaster} style={{float:'left'}} label="Bookmark" primary={true} /> */}
            {/* <Button variant="outlined" color="primary" style={{ float:'left'}}  label="Download" primary={true}>Download</Button> */}
            <a onClick={toaster} >
            <UseAnimations
            
        animationKey="bookmark"
        size={26}
        style={{ cursor:'pointer', color:'#000', float:'left', paddingLeft:'20px', paddingTop:'5px' }}
      />
      </a>
            <FlatButton  label="Close" primary={true} onClick={this.handleClose}/>
            
            </div>
        ]

        return (
            <div>
                {imageListContent}


                <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        ><div><IconButton edge="start"  color="inherit" aria-label="menu">
        <ShareIcon />
      </IconButton>&nbsp;&nbsp; <FacebookShareButton url={this.state.currentImg}>
        <FacebookIcon
          size={"2rem"} // You can use rem value instead of numbers
          round
        />
      </FacebookShareButton>
      &nbsp;&nbsp;&nbsp;
      <RedditShareButton url={this.state.currentImg}>
        <RedditIcon size={"2rem"} round/>
      </RedditShareButton>
      &nbsp;&nbsp;&nbsp;
      <PinterestShareButton url={this.state.currentImg}>
        <PinterestIcon size={"2rem"} round/>
      </PinterestShareButton>
      &nbsp;&nbsp;&nbsp;
      <TwitterShareButton url={this.state.currentImg}>
        <TwitterIcon size={"2rem"} round />
      </TwitterShareButton>
      &nbsp;&nbsp;&nbsp;
      <WhatsappShareButton url={this.state.currentImg} >
        <WhatsappIcon size={"2rem"} round />
      </WhatsappShareButton>
      &nbsp;&nbsp;&nbsp;
      <TelegramShareButton url={this.state.currentImg} >
        <TelegramIcon size={"2rem"} round />
      </TelegramShareButton>
      &nbsp;&nbsp;&nbsp;
      <LinkedinShareButton url={this.state.currentImg} >
        <LinkedinIcon size={"2rem"} round />
      </LinkedinShareButton>
      </div>
          <img
            alt=""
            src={this.state.currentImg}
            style={{ width: "100%", height: "100%" }}
          />
          
        </Dialog>

            </div>
        )
    }
}

// ImageResults.propTypes = {
//     images: propTypes.array.isRequired
// }
export default withWidth()(ImageResults);