import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';
import Loader from "react-loader-spinner";
import Typography from '@material-ui/core/Typography';
import './SearchStyle.css';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "material-ui/IconButton";

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://api.unsplash.com/search/photos',
        client_id: '5L6BJklghi9r7iQVApzAmKi2h7ie65L2LKwKoJweyUg',
        images: [],

        loading:false, 

    };
    // `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=${cred.APP_ID}`

    onTextChange = e => {

        this.setState({loading:false})   //for loader

        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
                this.setState({ images: [] });
            } else {
                axios
                    .get(
                        // `${this.state.apiUrl}/?query=${this.state.searchText}&client_id=${this.state.client_id}`
                        `https://api.unsplash.com/search/photos/?query=${this.state.searchText}&per_page=${this.state.amount}&client_id=5L6BJklghi9r7iQVApzAmKi2h7ie65L2LKwKoJweyUg`
                    )
                    .then(res => this.setState({ images: res.data.results, loading:true }))
                    .catch(err => console.log(err));
            }
        });
    };

    onAmountChange = (e, index, value) => this.setState({ amount: value });
    onTextClear = e =>{ 
        this.setState({searchText: ''});
        this.setState({ images: [] })
                      };

    render() {

        const {loading} = this.state

        console.log(this.state.images);
        return (
            
            <MuiThemeProvider>
                <br></br>
                <div className="searchstuff" style={{zIndex:'10' ,paddingLeft:'2px'}}>
                    {/* <form> */}
                <input
                autocomplete="off"
                value={this.state.searchText}
                name="searchText"
                onChange={this.onTextChange}
                placeholder="🔎 Search"></input>
                <IconButton 
                className="clearbutton"
                onClick={this.onTextClear}>
                    <ClearIcon />
                </IconButton>
                {/* </form> */}
                </div>

                    <br />
                    <br></br>
                    <div className="searchstuff" style={{zIndex:'10' ,paddingLeft:'2px'}}>
                    <Typography variant="h6">
           Select Amount: 
          </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <SelectField style={{width:'95px' ,paddingLeft:'0px'}}
                        name="amount"
                        floatingLabelText="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    >
                        <MenuItem value={5} primaryText="5" />
                        <MenuItem value={10} primaryText="10" />
                        <MenuItem value={15} primaryText="15" />
                        <MenuItem value={30} primaryText="30" />
                    </SelectField></div>
                    <br /><br></br>


                        {!loading && <div style={{width:'100%', height:'100%', display:'flex' , justifyContent:'center', alignItems:'center', marginTop:'15%'}}>
                            <Loader type="ThreeDots" color="#3F51B5" height="50" width="100" />
                            <br></br>
                            <p>&nbsp; &nbsp;  Try Searching for images</p>
                            </div> ||

                    // {this.state.images.length > 0 ? (
                        <ImageResults images={this.state.images} />
                    // ) : null}

    }
                
            </MuiThemeProvider>
            
        );
    }
}

export default Search;