import React from 'react';
import {FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {languages} from '../constants/Constants';

class ProfileForm extends React.Component{
    
    constructor(){
        super();

        this.formSubmit=this.formSubmit.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleTwitterChange=this.handleTwitterChange.bind(this);
        this.handleGithubChange=this.handleGithubChange.bind(this);
        this.handleLinkedInChange=this.handleLinkedInChange.bind(this);
        this.handleSlackChange=this.handleSlackChange.bind(this);
        this.handleLanguageSelect=this.handleLanguageSelect.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
        this.dobValidate=this.dobValidate.bind(this);
        this.githubValidate=this.githubValidate.bind(this);
        this.languagesValidate=this.languagesValidate.bind(this);
        this.linkedInValidate=this.linkedInValidate.bind(this);
        this.nameValidate=this.nameValidate.bind(this);
        this.slackValidate=this.slackValidate.bind(this);
        this.twitterValidate=this.twitterValidate.bind(this);
        this.twoDigitNumber=this.twoDigitNumber.bind(this);

        this.state={
            name:'',
            dob:'',
            github:'',
            twitter:'',
            linkedIn:'',
            slack:'',
            languages:'',
            isNameEntered:false,
            isDOBEntered:false,
            isGithubEntered:false,
            isTwitterEntered:false,
            isLinkedInEntered:false,
            isSlackEntered:false,
            isLanguagesEntered:false
        }
    }

    componentDidMount(){
        var lang=this.props.data[6];
        var str='';
        for(var i=0;i<lang.length;i++){
            str=str+lang[i]+',';
        }
        var n=  str.length;
        var lang_str=str.substr(0,n-1);

        const date_str=''+this.props.data[1];

        this.setState({
            name:this.props.data[0],
            dob:new Date(date_str.substr(0,4)+'-'+date_str.charAt(4)+date_str.charAt(5)+'-'+date_str.charAt(6)+date_str.charAt(7)).toISOString(),
            github:this.props.bytesToString(this.props.data[2]),
            twitter:this.props.bytesToString(this.props.data[3]),
            linkedIn:this.props.bytesToString(this.props.data[4]),
            slack:this.props.bytesToString(this.props.data[5]),
            languages:str
        });  
    }

    formSubmit(e){
        e.preventDefault();

        const isNameEntered=this.state.isNameEntered;
        const isDOBEntered=this.state.isDOBEntered;
        const isGithubEntered=this.state.isGithubEntered;
        const isLanguagesEntered=this.state.isLanguagesEntered;
        const isLinkedInEntered=this.state.isLinkedInEntered;
        const isSlackEntered=this.state.isSlackEntered;
        const isTwitterEntered=this.state.isTwitterEntered;

        if((!isDOBEntered) || (!isGithubEntered) || (!isLanguagesEntered) || (!isLinkedInEntered) || (!isNameEntered) || (!isSlackEntered) || (!isTwitterEntered)){
            this.setState({
                isDOBEntered:true,
                isGithubEntered:true,
                isLanguagesEntered:true,
                isLinkedInEntered:true,
                isNameEntered:true,
                isSlackEntered:true,
                isTwitterEntered:true
            });
        }else{
            let name,github,twitter,linkedIn,slack,languages;
            name=this.state.name;
            github=this.state.github;
            twitter=this.state.twitter;
            linkedIn=this.state.linkedIn;
            slack=this.state.slack;
            languages=this.state.languages;
            if((name.length>=3) && (github.length>=3) && (twitter.length>=3) && (linkedIn.length>=3) && (slack.length>=3) && (languages.length>0)){
                var languages=this.state.languages.split(',');
                for(var i=0;i<languages.length;i++){
                    languages[i]=parseInt(languages[i]);
                }
                const dob=new Date(this.state.dob);
                const dob_str=dob.getFullYear()+this.twoDigitNumber(dob.getMonth()+1)+this.twoDigitNumber(dob.getDate());
        
                this.props.onFormSubmit(
                    this.state.name,
                    parseInt(dob_str),
                    this.state.github,
                    this.state.twitter,
                    this.state.linkedIn,
                    this.state.slack,
                    languages
                );
            }
        }
    }

    twoDigitNumber(num){
        let number;
        if(num<=9)
            number='0'+num;
        else
            number=''+num;
        return number;
    }

    handleLanguageSelect(language){
        var str='';
        for(var i in language){
            str=str+language[i].value+',';
        }
        var n=str.length;
        str=str.substr(0,n-1);
        this.setState({
            languages:str,
            isLanguagesEntered:true
        });
    }

    handleGithubChange(e){
        this.setState({
            github:e.target.value,
            isGithubEntered:true
        });
    }

    handleLinkedInChange(e){
        this.setState({
            linkedIn:e.target.value,
            isLinkedInEntered:true
        });
    }

    handleNameChange(e){
        this.setState({
            name:e.target.value,
            isNameEntered:true
        });
    }

    handleSlackChange(e){
        this.setState({
            slack:e.target.value,
            isSlackEntered:true
        });
    }

    handleTwitterChange(e){
        this.setState({
            twitter:e.target.value,
            isTwitterEntered:true
        });
    }

    handleDateChange(value,formattedValue){
        this.setState({
            dob:value,
            isDOBEntered:true
        });
    }

    nameValidate(){
        if(!this.state.isNameEntered){
            return null;
        }
        if(this.state.name.length<3){
            return 'error';
        }else{
            return 'success';
        }
    }

    dobValidate(){
        if(!this.state.isDOBEntered){
            return null;
        }
        if(this.state.dob.length==0){
            return 'error';
        }else{
            return 'success';
        }
    }

    githubValidate(){
        if(!this.state.isGithubEntered){
            return null;
        }
        if(this.state.github.length<3){
            return 'error';
        }else{
            return 'success';
        }
    }

    twitterValidate(){
        if(!this.state.isTwitterEntered){
            return null;
        }
        if(this.state.twitter.length<3){
            return 'error';
        }else{
            return 'success';
        }
    }

    linkedInValidate(){
        if(!this.state.isLinkedInEntered){
            return null;
        }
        if(this.state.linkedIn.length<3){
            return 'error';
        }else{
            return 'success';
        }
    }

    slackValidate(){
        if(!this.state.isSlackEntered){
            return null;
        }
        if(this.state.slack.length<3){
            return 'error';
        }else{
            return 'success';
        }
    }

    languagesValidate(){
        if(!this.state.isLanguagesEntered){
            return null;
        }
        if(this.state.languages.length==0){
            return 'error';
        }else{
            return 'success';
        }
    }
    
    render(){
        return (
            <div>
                <div
                    className="centerDivWrapper">
                    <div
                        className="centerHorizontalDiv">
                        <h1>Enter Profile Details</h1>
                    </div>
                </div>
                <div
                    className="container">
                    <div
                        className="row">
                        <form
                            className="col-lg-6 col-lg-offset-3"
                            onSubmit={this.formSubmit}
                            id="profileForm">
                            <FormGroup
                                validationState={this.nameValidate()}>
                                <ControlLabel>
                                    Name
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleNameChange} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                validationState={this.dobValidate()}>
                                <ControlLabel>
                                    Date of birth
                                </ControlLabel>
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    cellPadding="5px"
                                    onChange={this.handleDateChange}
                                    value={this.state.dob} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                validationState={this.githubValidate()}>
                                <ControlLabel>
                                    Github ID
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.github}
                                    onChange={this.handleGithubChange} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                validationState={this.twitterValidate()}>
                                <ControlLabel>
                                    Twitter ID
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.twitter}
                                    onChange={this.handleTwitterChange} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                validationState={this.linkedInValidate()}>
                                <ControlLabel>
                                    LinkedIn ID
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.linkedIn}
                                    onChange={this.handleLinkedInChange} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                validationState={this.slackValidate()}>
                                <ControlLabel>
                                    Slack ID
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.slack}
                                    onChange={this.handleSlackChange} />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup
                                validationState={this.languagesValidate()}>
								<ControlLabel>
									Languages
								</ControlLabel>
								<Select
									options={languages}
									onChange={this.handleLanguageSelect}
                                    multi={true}
                                    value={this.state.languages}/>
                                
							</FormGroup>
                            <FormGroup>
                                <Button
								    bsStyle="primary"
								    bsSize="large"
								    type="submit"
                                    className="centerHorizontalDiv"
                                    id="submitButton">
                                    Submit Details
                                </Button>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileForm;