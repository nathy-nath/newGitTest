import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import HaircutAPI from '../../HaircutAPI'
import Toast from '../../Toast'

class newHaircutView {
  init(){
    document.title = 'newHaircut'    
    this.render()    
    Utils.pageIntroAnim()
  }

// Grab the form data
    async newHaircutSubmitHandler(e){
      // e.preventDefault()
      // const submitBtn = document.querySelectorAll('.submit-btn')
      // submitBtn.setAttribute('loading', '')    
      // const formData = e.detail.formData
      e.preventDefault()    
      const submitBtn = document.querySelector('.submit-btn')
      submitBtn.setAttribute('loading', '')    
      const formData = e.detail.formData

      try{
        await HaircutAPI.newHaircut(formData)
        Toast.show('Haircut added!')
        submitBtn.removeAttribute('loading')
        // reset form
        //text and text area fields reset
        const textInputs = document.querySelectorAll('.sl-input, sl-text-area')
        if(textInputs) textInputs.forEach(textInput => textInput.value == null)
        //radio inputs reset
        const radioInputs = document.querySelectorAll('.sl-radio')
        if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
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
      <va-app-header title="New Haircut" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>New Haircut</h1>
        <sl-form class="page-form" @sl-submit=${this.newHaircutSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Haircut Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Gender</label><br>
            <sl-radio-group label="Select gender" no-fieldset>
              <sl-radio name="gender" value="m">Male</sl-radio>
              <sl-radio name="gender" value="f">Female</sl-radio>
              <sl-radio name="gender" value="u">Unisex</sl-radio>
            </sl-radio-group>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Length</label><br>
            <sl-radio-group label="Select length" no-fieldset>
              <sl-radio name="length" value="s">Short</sl-radio>
              <sl-radio name="length" value="m">Medium</sl-radio>
              <sl-radio name="length" value="l">Long</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="primary" class="submit-btn" submit>Add Haircut</sl-button>
        </sl-form>  
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newHaircutView()