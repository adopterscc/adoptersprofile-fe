import React from 'react';
import ErrorDisplay from './ErrorDisplay';
import Loader from 'react-loader';
import ProfileForm from './ProfileForm';

import * as ProfileAction from '../actions/ProfileAction';
import ProfileStore from '../stores/ProfileStore';

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import adoptersProfileArtifacts from '../../../build/contracts/AdoptersProfile.json';

let adoptersProfileContract;
let account;

class Main extends React.Component{

    constructor(){
        super();

        this.loadWeb3=this.loadWeb3.bind(this);
        this.handleExistingUser=this.handleExistingUser.bind(this);
        this.handleNewUser=this.handleNewUser.bind(this);
        this.onFormSubmit=this.onFormSubmit.bind(this);
        this.getStringFromBytes=this.getStringFromBytes.bind(this);

        this.state={
            isLoading:true,
            isError:false,
            errorMessage:'',
            profileData:null
        }
    }

    componentWillMount(){
        ProfileStore.on('EXISTING_USER',this.handleExistingUser);
        ProfileStore.on('NEW_USER',this.handleNewUser);
    }

    componentWillUnmount(){
        ProfileStore.removeListener('EXISTING_USER',this.handleExistingUser);
        ProfileStore.removeListener('NEW_USER',this.handleNewUser);
    }

    componentDidMount(){
        this.loadWeb3();
    }

    loadWeb3(){
        const self=this;
        if(typeof web3==='undefined'){
            this.setState({
                isLoading:false,
                isError:true,
                errorMessage:"Meta Mask required"
            });
            setTimeout(function(){
                self.loadWeb3();
            },200);
        }else{
            web3 = new Web3(web3.currentProvider);
            adoptersProfileContract=web3.eth.contract(adoptersProfileArtifacts.abi).at('0x6e19e18e600bdf37345cb5b43dc29565593c9267');
            if(web3.eth.accounts.length>0){
                this.setState({
                    isLoading:true,
                    isError:false
                });
                account=web3.eth.accounts[0];
                web3.eth.defaultAccount=account;
                ProfileAction.getPreviousStatus(account,adoptersProfileContract);          
            }else{
                this.setState({
                    isLoading:false,
                    isError:true,
                    errorMessage:"No account on ethereum found. Please login to MetaMask/Mist"
                });
                setTimeout(function(){
                    self.loadWeb3();
                },200);
            }
        }
    }

    handleExistingUser(){
        this.setState({
            isLoading:false,
            isError:false,
            profileData:ProfileStore.getProfileData()
        });
    }

    handleNewUser(){
        const data=[
            '',
            0,
            '',
            '',
            '',
            '',
            [
                
            ]
        ]
        this.setState({
            isLoading:false,
            isError:false,
            profileData:data
        });
    }

    onFormSubmit(name,dob,github,twitter,linkedIn,slack,languages){
        ProfileAction.updateProfile(name,dob,github,twitter,linkedIn,slack,languages,adoptersProfileContract);
    }

    getStringFromBytes(str1){
        str1=str1.replace("0x","").replace(/^0+|0+$/g, "");
        var hex  = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    }

    render(){
        if(this.state.isLoading){
            return (
                <Loader />
            );
        }else if(this.state.isError){
            return (
                <ErrorDisplay
                    message={this.state.errorMessage} />
            );
        }else{
            return (
                <ProfileForm
                    data={this.state.profileData}
                    onFormSubmit={this.onFormSubmit}
                    bytesToString={this.getStringFromBytes} />
            );
        }
    }
}

export default Main;