import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import CategoryAPI from '../../CategoryAPI'
import Toast from '../../Toast'

class CategoriesView {
  init(){
    document.title = 'Categories'   
    this.categories = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getCategories()
  }

  async getCategories(){
    try{
      this.categories = await CategoryAPI.getCategories()
      console.log(this.categories)
      this.render()
    }catch(err){
      Toast.show(err,'error')
    }
  }

  render(){
    const template = html`
      
      <va-app-header title="Categories" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-carpark-bg.png" alt="Circular parking structure." />
      </div>
      <div class="page-content">        
        
        
        <div class="categories-grid">
          ${this.categories == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`
          ${this.categories.map(category => html`
          
          <na-category class= "categories-card"
            name=${category.name} 
            description=${category.description}
            user=${JSON.stringify(category.user)} 
            image=${category.image}
          </na-category>
          `)}
          `}
        
        </div>  
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CategoriesView()