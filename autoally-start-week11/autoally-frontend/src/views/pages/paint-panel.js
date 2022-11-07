import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class PaintPanelView {
  init(){
    document.title = 'Paint&Panel'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const paintPanel = html`
      <va-app-header title="Paint & Panel" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Paint & Panel</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(paintPanel, App.rootEl)
  }
}


export default new PaintPanelView()