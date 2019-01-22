export default class UserProfileView {
    constructor(el,model){
        this.$el = el;
        this.events = window.events;
        this.model = window.user;
        this.template();

        this.events.sub('user_model:update',this.template.bind(this));
    }

    template(){
        console.log('template',this);
        this.$el.innerHTML = `
            <section id="user-profile">
                <label for="display_name">Display Name</label>
                <input type="text" value="${this.model.data.displayName}" name="display_name" />

                <label for="email">Email</label>
                <input type="email" value="${this.model.data.email}" name="email" />

                <input type="submit" class="button" value="Update" name="update" />
            </section>
        `;

        this.$el.querySelector('input[type="submit"]').addEventListener('click',this.submitHandler.bind(this));
    }

    submitHandler(e){
        e.preventDefault();
        console.log('submitHandler',e);

        this.model.update({
            displayName : this.$el.querySelector('input[name="display_name"]').value,
            email: this.$el.querySelector('input[name="email"]').value
        });

        this.model.save();
    }
} 