import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ServiceAPI from '../../ServiceAPI'
import Toast from '../../Toast'

class ServicesView {
  async init(){
    document.title = 'Services' 
    this.services = null   
    this.render()    
    Utils.pageIntroAnim()
    // await this.getServices()
  }

  async filteredServices(field, match) {
    // validate
    if (!field || !match) return

    // get fresh copy
    this.services = await ServiceAPI.getServices()

    let filteredServices

    // by category
    if(field == 'category') {
      filteredServices = this.services.filter(service => service.category == match)
    }


    // by location
    if(field == 'location') {
      // get price range
      const distanceRangeStart = match.split('-')[0]
      const distanceRangeEnd = match.split('-')[1]
      // console.log(distanceRangeStart, distanceRangeEnd)
      filteredServices = this.services.filter(service => service.location >= distanceRangeStart && service.location <= distanceRangeEnd)
    }
    // console.log(filteredServices)

    // render 
    this.services = filteredServices
    this.render()
  }

  clearFilters() {
    this.getServices()
    this.clearFilterBtns()
  }

  clearFilterBtns() {
    // clear all active states 
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("type"))
  }

  handleFilterBtn(e) {
    // clear all active states 
    this.clearFilterBtns()
    // get target
    e.target.setAttribute('type', 'primary')
    // extract attributes
    const field = e.target.getAttribute('data-field')
    const match = e.target.getAttribute('data-match')
    // filter haircuts
    this.filteredServices(field, match)
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
    <style>
      .filter-menu{
        display: flex;
        align-items: centre;
      }

      .filter-btn {
        margin-right: 1em;
        object-fit: contain;
      }
      .filter-clr {
        margin-left: 10em;
      }
      </style>
      <va-app-header title="Services" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-ferrari-bg.png" alt="Classic Ferrari parked in shadow." />
      </div>

      <div class="page-content">  
      
        <div class="filter-menu categories-grid">
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='mechanical' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/mechanical.svg" alt="Mechanical icon"/>
              Mechanical
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='electrical' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/electrical.svg" alt="Electrical icon"/>
              Electrical
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='detailing' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/detailing.svg" alt="Detailing icon"/>
              Detailing
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='windscreen' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/windscreen.jpg" alt="Windscreen icon"/>
              Windscreens
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='paint&panel' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/paintnpanel.svg" alt="Spray painting icon"/>
              Paint & Panel
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='4x4' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/4x4.png" alt="4x4 icon"/>
              4X4
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='restoration' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/restoration.png" alt="Restoration icon"/>
              Restoration
            </div>
          </div>
          <div class="categories-card">
            <div class="filter-btn">
              <img type="button" data-field='category' data-match='emergency' @click=${this.handleFilterBtn.bind(this)} src="${App.apiBase}/images/emergency.jpg" alt="Emergency icon"/>
              Emergency
            </div>
          </div>
          
          
        </div>
        <div>
            <sl-button class='filter-btn' size='small' data-field= 'location' data-match='0-5' @click=${this.handleFilterBtn.bind(this)}>Under 5km</sl-button>
            <sl-button class='filter-btn' size='small' data-field= 'location' data-match='0-10' @click=${this.handleFilterBtn.bind(this)}>Under 10km</sl-button>
            <sl-button class='filter-btn' size='small' data-field= 'location' data-match='0-25' @click=${this.handleFilterBtn.bind(this)}>Under 25km</sl-button>
            <sl-button class='filter-btn' size='small' data-field= 'location' data-match='0-5000' @click=${this.handleFilterBtn.bind(this)}>Over 25km</sl-button>
                
            <sl-button class='filter-clr' size='small' @click=${this.clearFilters.bind(this)}>All Services</sl-button>
          </div>
         

        <div class="services-grid" id="services-grid">
          ${this.services == null ? html`
          
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