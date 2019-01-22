export default class UserModel {
    constructor(data){        
        this.collectionType = 'users';
        this.events = window.events;
        this.db     = window.db;
        this.data   = {};
        this.data.createdDate = new Date().toDateString();
        this.setData(data);
        this.getUserFromDB();
        console.log('userModel',this.data);
    }

    setData(data){
        console.log('setData',data);
        if (data && data.user){ 
            this.authData = data;
            data = data.user;
            this.uid = data.uid;
        }
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
        this.db.collection('users').doc(this.uid).set(this.data)
            .then( res => {
                console.log('user data saved',res);
                this.events.pub(event,this);
        });
    }

    update(data){ this.data = { ...this.data, ...data }; }
}
