import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
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
      
      <div class="page-content">        
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`



          <sl-form class="page-form guide-step box" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>
            <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
            <div class="input-group">
              <sl-input type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input type="text" name="email" value="${this.user.email}" placeholder="Email Address"></sl-input>
            </div> 
            <div class="input-group">
              <sl-textarea name="bio" rows='2' value="${this.user.bio || ""}" placeholder="About me..."></sl-textarea>
            </div> 
            

            ${this.user.accessLevel == 2 ? html`     
            <div class="input-group">
              <sl-input name="business" value="${this.user.business || ""}" placeholder="Business Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="phone" value="${this.user.phone || ""}" placeholder="Phone"></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="address" value="${this.user.address || ""}" placeholder="Address"></sl-input>
            </div>
            <div class="input-group">
              <sl-textarea name="about" rows='10' value="${this.user.about || ""}" placeholder="About us"></sl-textarea>
            </div>
            
            ` : ``}

            
            ${this.user.accessLevel == 1 ? html` 
            <div class="input-group">
              <sl-input name="vehicle" value="${this.user.vehicle || ""}" placeholder="Vehicle"></sl-input>
            </div> 

            ` : ``}
            
            <div class="input-group">
              <label>Avatar</label><br>          
              ${(this.user.avatar) ? html`
                <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>
                <input type="file" name="avatar" />
              `: html`
                <input type="file" name="avatar" />
              `}
            </div>
            <sl-button type="primary" class="submit-btn" submit>Update Profile</sl-button>
          </sl-form>
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()