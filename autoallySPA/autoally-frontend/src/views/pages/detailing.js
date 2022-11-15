import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class DetailingView {
  init(){
    document.title = 'Detailing'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const detailing = html`
      <va-app-header title="Detailing" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Detailing</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(detailing, App.rootEl)
  }
}


export default new DetailingView()