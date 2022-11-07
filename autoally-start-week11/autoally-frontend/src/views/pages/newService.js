import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ServiceAPI from '../../ServiceAPI'
import Toast from '../../Toast'

class newServiceView {
  init(){
    document.title = 'newService'    
    this.render()    
    Utils.pageIntroAnim()
  }

// Grab the form data
    async newServiceSubmitHandler(e){
      // e.preventDefault()
      // const submitBtn = document.querySelectorAll('.submit-btn')
      // submitBtn.setAttribute('loading', '')    
      // const formData = e.detail.formData
      e.preventDefault()    
      const submitBtn = document.querySelector('.submit-btn')
      submitBtn.setAttribute('loading', '')    
      const formData = e.detail.formData

      try{
        await ServiceAPI.newService(formData)
        Toast.show('Service added!')
        submitBtn.removeAttribute('loading')
        // reset form
        //text and text area fields reset
        const textInputs = document.querySelectorAll('.sl-input', 'sl-text-area')
        if(textInputs) textInputs.forEach(textInput => textInput.value = null)
        //reset file input
        const fileInput = document.querySelector('input[type=file]')
        if(fileInput) fileInput.value = null

      }catch(err){
        Toast.show(err, 'error')
        submitBtn.removeAttribute('loading')
      }
      

    }



  render(){
    const template = html`
      <va-app-header title="New Service" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-graphic">
          <img src="${App.apiBase}/images/dark-redcarmech-bg.png" alt="Circular parking structure." />
      </div>
      <div class="form-page">
        <h1>New Service</h1>
        <div class="form-centered">        
          <sl-form class="new-page-form" @sl-submit=${this.newServiceSubmitHandler}>
            <input type="hidden" name="user" value="${Auth.currentUser._id}" />
            <div class="input-group">
              <sl-input name="name" type="text" placeholder="Business Name" required></sl-input>
            </div>

            <sl-select name="category" placeholder="Select one">
              <sl-menu-item value="mechanical">Mechanical</sl-menu-item>
              <sl-menu-item value="electrical">Electrical</sl-menu-item>
              <sl-menu-item value="detailing">Detailing</sl-menu-item>
              <sl-menu-item value="windscreen">Windscreen</sl-menu-item>
              <sl-menu-item value="paint&panel">Paint & Panel</sl-menu-item>
              <sl-menu-item value="4X4">4X4</sl-menu-item>
              <sl-menu-item value="restoration">Restoration</sl-menu-item>
              <sl-menu-item value="emergency">Emergency</sl-menu-item>
            </sl-select>

            
            <div class="input-group">
              <sl-textarea name="description" rows="5" placeholder="Description"></sl-textarea>
            </div>
            <div class="input-group" style="margin-bottom: 2em;">
              <label>Image</label><br>
              <input type="file" name="image" />              
            </div>
            
            
            <sl-button type="primary" class="submit-btn" submit>Add Service</sl-button>
          </sl-form>  
          
        </div> 
      </div>     
    `
    render(template, App.rootEl)
  }
}


export default new newServiceView()