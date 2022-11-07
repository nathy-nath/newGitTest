import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class RestorationView {
  init(){
    document.title = 'Restoration'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const restoration = html`
      <va-app-header title="Restoration" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Restoration</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(restoration, App.rootEl)
  }
}


export default new RestorationView()