import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser() {
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id,{ newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>

      <div class="page-graphic">
        <img src="${App.apiBase}/images/dark-van-bg.png" alt="White van parked." />
      </div>
        
      <div class="page-content calign">        
        <h3 class="brand-color-light">Welcome ${Auth.currentUser.firstName}!</h3>
        <p>This is a quick tour to teach you the basics of using AutoAlly ...</p>
        
        <div class="guide-step">
          <h4>Select a category</h4>
          <img src="${App.apiBase}/images/categories.png" alt="Mechanical icon, Electrical icon, Detailing icon, Windscreen icon, Paint & Panel icon, 4x4 icon, Restoration icon, Emergency icon." />
        </div>
        
        <div class="guide-step">
          <h4>Find a local service</h4>
          <img src="${App.apiBase}/images/more-info.png" alt="Dialog boxes of local business">
        </div>
        
        <div class="guide-step">
          <h4>Save to favourites</h4>
          <img src="${App.apiBase}/images/favourites.png" alt="Dialog boxes of saved favourites.">
        </div>
        
        <sl-button type="primary" @click=${() => gotoRoute('/')}>Okay got it!</sl-button>
        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()