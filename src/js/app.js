import Utils from './utils/_utils';
import AppView from './views/app';

export default class MyApp {
    constructor(){
        console.log('New App',Utils);
        window.db       = firebase.firestore();
        window.events   = new Utils.Events(document.querySelector('#app'));
        new AppView();
    }
}