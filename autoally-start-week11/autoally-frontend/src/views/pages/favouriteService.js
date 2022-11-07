import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class FavouriteServicesView {
  init(){
    document.title = 'Favourite Services'  
    this.favServices = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getFavServices()
  }

  async getFavServices(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favServices = currentUser.favouriteServices
      console.log(this.favServices)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Favourite Services" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-graphic">
        <img src="${App.apiBase}/images/dark-van-bg.png" alt="White van parked." />
      </div>
      <div class="page-content">        
        <h1>Favourite Services</h1>
        <div class="services-grid">
        ${this.favServices == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favServices.map(service => html`
            <na-service class="service-card"
              id="${service._id}"
              name="${service.name}"
              category="${service.category}"
              description="${service.description}"
              user="${JSON.stringify(service.user)}"
              image="${service.image}">        
            </na-service>

          `)}
        `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new FavouriteServicesView()