module.exports = class UserModel {
    constructor(config){        
        this.collectionType = 'users';
        if (!config){ 
            this.data = {
                name : '',
                date : '',
                notes : '',
                createDate : new Date().toTimeString()
            }
        }
        console.log('userModel',this.data);
    }
}
