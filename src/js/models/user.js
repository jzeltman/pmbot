export default class UserModel {
    constructor(data){        
        this.collectionType = 'users';
        this.events = window.events;
        this.db     = window.db;
        this.data   = {};
        this.data.createdDate = new Date().toDateString();
        this.data.timezone = new Date().getTimezoneOffset() / 60;
        this.setData(data);
        this.getUserFromDB();
        console.log('userModel',this.data);
    }

    setData(data){
        console.log('setData',data);
        if (data && data.user){ 
            this.data.locale = data.additionalUserInfo.profile.locale;
            this.data.gender = data.additionalUserInfo.profile.gender;
            this.authData = data;
            data = data.user;
            this.uid = data.uid;
        }
        if (data.timezone){ this.data.timezone = data.timezone; }
        this.data.createdDate = data.createdDate || new Date().toDateString();
        this.data.displayName = data.displayName;
        this.data.email = data.email;
        this.data.photoURL = data.photoURL;
    }

    getUserFromDB(){
        this.docRef = this.db.collection('users').doc(this.uid);
        this.docRef.get().then( doc => {
            if (doc.exists){ 
                console.log('doc exists',doc.data());
                this.setData(doc.data());
                this.events.pub('user_model:update',this);
            } else { 
                console.log(`No Doc exists for uid: ${this.uid}, creating one now`);
                this.save('user_model:create');
            }
        }).catch( err => console.log(`Error retrieving doc uid: ${this.uid}`,err));
    }

    save(eventName){
        let event = eventName || 'user_model:save';
        console.log('save user model',this.data);
        this.db.collection('users').doc(this.uid).set(this.data)
            .then( res => {
                console.log('user data saved',res);
                this.events.pub(event,this);
        });
    }

    update(data){ this.data = { ...this.data, ...data }; }
    delete(event){ 
        this.db.collection('users').doc(this.uid).delete()
            .then( res => {
                console.log('user data deleted',res);
                window.user = undefined;
                this.events.pub('user_model:delete',this);
        });
    }
}
