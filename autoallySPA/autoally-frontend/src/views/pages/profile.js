import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      ${Auth.currentUser.accessLevel == 1 ? html`
      <div class="page-graphic">
      <img src="${App.apiBase}/images/dark-challenger-bg.png" alt="" />
      </div>
      ` : ``}

      ${Auth.currentUser.accessLevel == 2 ? html`
      <div class="page-graphic">
        <img src="${App.apiBase}/images/dark-classic-bg.png" alt="" />
      </div>
      ` : ``}
      
      <div class="page-content calign box guide-step">   
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p>${Auth.currentUser.email}</p>
        
        <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
        
        ${Auth.currentUser.bio ? html`
          <h3>Bio</h3>
          <p>${Auth.currentUser.bio}</p>
        ` : html``}

        ${Auth.currentUser.vehicle ? html`
          <h3>Vehicle</h3>
          <p>${Auth.currentUser.vehicle}</p>
        ` : html``}
        

        <sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()