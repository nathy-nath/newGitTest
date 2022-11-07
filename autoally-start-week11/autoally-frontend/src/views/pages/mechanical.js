import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import ServiceAPI from '../../ServiceAPI'

class MechanicalView {
  init(){
    document.title = 'Mechanical'
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
     
          
        // let countInvalidEntries = 0
          
        // function filterByCategory(obj) {
        //   if ( obj.categories !== 'mechanical') 
        //   {
        //     countInvalidEntries++
        //     return false
        //   } 
          
        //   return true;
        // }
          
        // let arrayByCategories = this.services.filter(filterByCategory);
          
        // console.log(countInvalidEntries);
          
    

  

  

  //${this.service.category == 'mechanical' ? html`` : html``}


  // getMechanic(){
  //   mechanics = this.services.filter(obj => {
  //     return obj.categories === 'mechanical';
  //   });
  //   console.log(results);
  // }
//   let bigCities = cities.filter(function (e) {
//     return e.population > 3000000;
//      });
//      console.log(bigCities);

  

  render(){
    const mechanical = html`
      <va-app-header title="Mechanical" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-classic-bg.png" alt="Circular parking structure." />
      </div>
      
      <div class="page-content">        
        <div class="services-grid">
          ${this.services == null ? html`
          <sl-spinner></sl-spinner>
          `: html`
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
    render(mechanical, App.rootEl)
  }
}


export default new MechanicalView()