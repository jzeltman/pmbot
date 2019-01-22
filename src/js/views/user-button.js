import Utils        from '../utils/_utils';
import UserModel    from '../models/user';

export default class UserButtonView {
    constructor(el){
        this.$el = el;
        this.events = window.events;
        this.template();
        console.log('button Auth',el,Utils);


        this.events.sub('auth:success',this.updateViewWithModel.bind(this));
        this.events.sub('user_model:create',this.template.bind(this));
    }

    template(){
        let markup;
        if (this.model === undefined){
            markup = `<button id="login">Login</button>`;
        } else {
            markup = `
                <button id="profile">
                    <span>My Profile</span>
                    <img src="${this.model.data.photoURL}" />
                </button>`;
        }
        this.$el.innerHTML = markup; 
        this.$el.querySelector('button').addEventListener('click',this.buttonClickHandler.bind(this));
    }

    buttonClickHandler(e){
        if (e.target.getAttribute('id') === 'login'){ Utils.Auth(); } 
        else { window.events.pub('user_profile', null); }
    }

    updateViewWithModel(e){
        this.model = window.user;
        this.template();
    }
}