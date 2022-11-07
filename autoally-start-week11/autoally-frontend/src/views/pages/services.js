import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ServiceAPI from '../../ServiceAPI'
import Toast from '../../Toast'

class ServicesView {
  init(){
    document.title = 'Services' 
    this.services = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getServices()
  }

  async getServices(){
    try{
      this.services = await ServiceAPI.getServices()
      console.log(this.services)
      this.render()
    }catch(err){
      Toast.show(err,'error')
    }
  }

  
  

  render(){
    const services = html`
      <va-app-header title="Services" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-ferrari-bg.png" alt="Circular parking structure." />
      </div>

      <div class="page-content">        
        <div class="services-grid">
          ${this.services == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`
          ${this.services.map(service => html`
            <na-service class= "service-card"
            
              id=${service._id}

              name=${service.name} 
              category=${service.category} 
              description=${service.description} 
              user=${JSON.stringify(service.user)} 
              image=${service.image}
            </na-service>
            `)}
          `}
        </div>
        
      </div>      
    `
    render(services, App.rootEl)
  }
}


export default new ServicesView()