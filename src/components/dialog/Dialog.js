import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import { DialogContentText } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogText: {
      color: theme.palette.blue
    }
  });

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });


  class DialogResult extends React.Component {
    constructor(props) {
      super(props);
	  this.handleChange = this.handleChange.bind(this);
	  this.handleDialogClose = this.handleDialogClose.bind(this);
	  this.handleDialogOK = this.handleDialogOK.bind(this);
	  this.state = {
		dialogText: 'hello',
        isDialogOpen: false,
		isChecked: false
	  }
	}
	
	handleDialogOK() {
      console.log('Clicked OK!');
      this.setState({
        isDialogOpen: false
      });
    }
	
	handleDialogClose() {
      this.setState({
        isDialogOpen: false
      });
    }
	
	handleChange(e) {
      const target = e.target;
	  const value = target.checked;
	  
	  this.setState({
		isChecked: value,
		isDialogOpen: true
	  }, ()=> {console.log('Open Dialog')});
	}
	
	render() {
      const { classes } = this.props;
      return (
		<div>
			<Checkbox id="chkOpenDialog" 
            onChange={this.handleChange}
            checked={this.state.isChecked}></Checkbox>
			<Dialog
                open={this.state.isDialogOpen}
                onClose={this.handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="customized-dialog-title" onClose={this.handleDialogClose}>
                  {"Message from Application"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
                  {/* {this.state.dialogText} */}<img src='https://images.unsplash.com/photo-1551801319-ca06060f3fcc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' width='250px' height='200px'></img>
                </DialogContentText>
                <DialogActions>
                  <Button color="primary" onClick={this.handleDialogOK}>
                      OK
                  </Button>
                  <Button color="primary" onClick={this.handleDialogClose}>
                      Cancel
                  </Button>
                </DialogActions>
              </DialogContent>  
          </Dialog>
		</div>
	  );
    }
}

export default withStyles(styles, { withTheme: true })(DialogResult);