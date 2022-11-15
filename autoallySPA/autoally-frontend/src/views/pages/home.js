import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
//const path = require('path')
//app.use('/static', express.static(path.join(__dirname, 'public'))) 

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

   

  render(){
    const template = html`
      
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
        <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-van-bg.png" alt="White van parked." />
        </div>


        <div class="page-content calign welcome-box welcome-step">
          <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>
          <h3>What would you like to do today?</h3>
          <sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
          <p>&nbsp;</p>
          <sl-button class="anim-in" @click=${() => gotoRoute('/services')}>Explore...</sl-button>
          
        </div>
      
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()