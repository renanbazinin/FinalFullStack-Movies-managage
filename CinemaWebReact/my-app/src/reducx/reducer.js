
/*
    action - a obj with:
    -type (mandatory) - the type of the action
    -payload (optional) - the data send with the action
*/




function reducer(state = { username: "" , active:false,users:[],permissionsArr:[]}, action) {


    switch (action.type) {

        case "USERIN":
            return {...state, username:action.payload,active:true };

        case "USEROUT":
            return {...state, username:"",active:false };
        case "GETLIST":
            return {...state,users:action.payload}
        case "PERM":
            return {...state,permissionsArr:action.payload}
        default:
            return state
    }

}

export default reducer