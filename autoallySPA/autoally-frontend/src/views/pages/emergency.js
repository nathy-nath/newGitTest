import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class EmergencyView {
  init(){
    document.title = 'Template'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const emergency = html`
      <va-app-header title="Emergency" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Emergency</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(emergency, App.rootEl)
  }
}


export default new EmergencyView()