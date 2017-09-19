import Dispatcher from '../dispatcher/Dispatcher';

export function getPreviousStatus(adopterAddress,AdoptersProfile){
    AdoptersProfile.getProfile(adopterAddress,function(error,result){
        if(error){
            console.log(error);
        }
        let newUser;
        if(result[0].length==0)
            newUser=true;
        else
            newUser=false;
        Dispatcher.dispatch({
            type:'PREVIOUS_RECORD',
            isNewUser:newUser,
            profileData:result
        });
    })
}

export function updateProfile(name,dob,github,twitter,linkedIn,slack,languages,AdoptersProfile){
    AdoptersProfile.updateProfile(name,dob,github,twitter,linkedIn,slack,languages,function(err,res){
        if(err){
            console.log(err);
        }
    });
}