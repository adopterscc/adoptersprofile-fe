import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher/Dispatcher';

class profileStore extends EventEmitter{
    constructor(){
        super();

        this.handleActions=this.handleActions.bind(this);

        this.isNewUser=false;
        this.profileData=null;
    }

    getProfileData(){
        return this.profileData;
    }

    handleActions(action){
        switch(action.type){
            case 'PREVIOUS_RECORD':{
                if(action.isNewUser){
                    this.emit('NEW_USER');
                }else{
                    this.profileData=action.profileData;
                    this.emit('EXISTING_USER');
                }
            }
        }
    }
}

const ProfileStore=new profileStore;
Dispatcher.register(ProfileStore.handleActions);
export default ProfileStore;