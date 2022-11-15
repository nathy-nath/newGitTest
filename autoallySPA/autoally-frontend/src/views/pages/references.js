import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
// import CategoryAPI from '../../CategoryAPI'
import Toast from '../../Toast'

class ReferencesView {
  init(){
    document.title = 'References'   
    // this.categories = null    
    this.render()    
    Utils.pageIntroAnim()
    // this.getCategories()
  }

  // async getCategories(){
  //   try{
  //     this.categories = await CategoryAPI.getCategories()
  //     console.log(this.categories)
  //     this.render()
  //   }catch(err){
  //     Toast.show(err,'error')
  //   }
  // }

  render(){
    const template = html`
      
      <va-app-header title="References" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-carpark-bg.png" alt="Circular parking structure." />
      </div>
      <div class="page-content">        
        
        
        <div class="categories-grid references">
          <p>Auto Glass Warehouse. https://www.autoglasswarehouse.com.au/. Accessed 11 November 2022.</p>

          <p>Darra Towing and Transpport. https://darratowingtransport.com.au/ . Accessed 11 
          November 2022.</p>
          
          <p>Detail Evoluton. https://www.detailevolution.com/ Accessed 11 November 2022.</p>
          
          <p>Impact Panel Works. https://impactpanelworks.com.au/. Accessed 11 
          November 2022.</p>
          
          <p>Neil’s Auto Electrics. https://www.neilsautoelectrics.com.au/. Accessed 11 November 2022</p>
          
          <p>Pinnacle 4x4. https://www.pinnacle4x4.com.au/. Accessed 11 November 2022.
          </p>
        
        </div>  
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ReferencesView()