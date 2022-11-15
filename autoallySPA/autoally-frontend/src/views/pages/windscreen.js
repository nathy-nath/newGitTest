import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class WindscreenView {
  init(){
    document.title = 'Windscreen'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const windscreen = html`
      <va-app-header title="Windscreen" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Windscreen</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(windscreen, App.rootEl)
  }
}


export default new WindscreenView()