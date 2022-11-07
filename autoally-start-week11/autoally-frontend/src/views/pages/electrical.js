import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class ElectricalView {
  init(){
    document.title = 'Electrical'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const electrical = html`
      <va-app-header title="Electrical" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Electrical</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(electrical, App.rootEl)
  }
}


export default new ElectricalView()